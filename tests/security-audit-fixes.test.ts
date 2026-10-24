import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { NextRequest } from 'next/server';
import {
  AuthService,
  getEffectiveSessionSecret,
  seedTestFixtures,
  COMPROMISED_PASSWORDS,
} from '../src/services/auth';
import { AuthStore } from '../src/services/auth-store';
import { POST as generatePlanHandler } from '../src/app/api/planner/generate/route';

// ============================================================================
// FIX 1: Google ID-token verification must fail closed
// ============================================================================

test('FIX 1.1: Forged or malformed Google ID tokens are rejected (fail closed)', async () => {
  // Tampered / fabricated token with forged payload claiming admin identity
  const forgedHeader = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
  const forgedPayload = Buffer.from(
    JSON.stringify({
      email: 'istihadahmed1163@gmail.com',
      email_verified: true,
      sub: 'google_forged_9999',
    })
  ).toString('base64url');
  const forgedToken = `${forgedHeader}.${forgedPayload}.fake_signature`;

  // Original vulnerable implementation would parse payload[1] and trust it!
  // Patched implementation MUST fail closed and throw.
  await assert.rejects(
    async () => {
      await AuthService.verifyGoogleIdToken(forgedToken);
    },
    (err: any) => {
      assert.ok(
        err.message.includes('Google') || err.message.includes('verification rejected') || err.message.includes('unreachable'),
        `Error must reject unverified token: ${err.message}`
      );
      return true;
    }
  );
});

test('FIX 1.2: Expired, unverified-email, or wrong-audience tokens fail closed', async () => {
  // Mock global fetch to test Google tokeninfo response validation
  const originalFetch = globalThis.fetch;

  try {
    // A. Token with wrong audience (aud mismatch)
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          iss: 'accounts.google.com',
          aud: 'wrong-client-id.apps.googleusercontent.com',
          email: 'valid_user@gmail.com',
          email_verified: true,
          sub: '1234567890',
          exp: Math.floor(Date.now() / 1000) + 3600,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    const prevGoogleClientId = process.env.GOOGLE_CLIENT_ID;
    process.env.GOOGLE_CLIENT_ID = 'expected-client-id.apps.googleusercontent.com';

    await assert.rejects(
      async () => {
        await AuthService.verifyGoogleIdToken('some.fake.token');
      },
      /audience mismatch/i,
      'Must reject Google token when aud does not match expected client ID'
    );

    // B. Token with unverified email (email_verified: false)
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          iss: 'accounts.google.com',
          aud: 'expected-client-id.apps.googleusercontent.com',
          email: 'unverified_candidate@gmail.com',
          email_verified: false,
          sub: '1234567890',
          exp: Math.floor(Date.now() / 1000) + 3600,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    await assert.rejects(
      async () => {
        await AuthService.verifyGoogleIdToken('some.fake.token');
      },
      /unverified/i,
      'Must reject Google token when email_verified is false'
    );

    // C. Expired token (exp in past)
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          iss: 'accounts.google.com',
          aud: 'expected-client-id.apps.googleusercontent.com',
          email: 'expired_candidate@gmail.com',
          email_verified: true,
          sub: '1234567890',
          exp: Math.floor(Date.now() / 1000) - 600, // 10 minutes ago
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    await assert.rejects(
      async () => {
        await AuthService.verifyGoogleIdToken('some.fake.token');
      },
      /expired/i,
      'Must reject Google token when exp timestamp is in the past'
    );

    // D. Invalid token issuer (not accounts.google.com)
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          iss: 'malicious-issuer.com',
          aud: 'expected-client-id.apps.googleusercontent.com',
          email: 'candidate@gmail.com',
          email_verified: true,
          sub: '1234567890',
          exp: Math.floor(Date.now() / 1000) + 3600,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    await assert.rejects(
      async () => {
        await AuthService.verifyGoogleIdToken('some.fake.token');
      },
      /issuer/i,
      'Must reject token when issuer is not Google'
    );

    // Clean up
    process.env.GOOGLE_CLIENT_ID = prevGoogleClientId;
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('FIX 1.3: Google verification service failure or timeout fails closed', async () => {
  const originalFetch = globalThis.fetch;
  try {
    // Simulate network failure / unreachable endpoint
    globalThis.fetch = async () => {
      throw new Error('ECONNREFUSED: Connection failed to oauth2.googleapis.com');
    };

    // Original vulnerable code would catch this and decode JWT payload without verification!
    // Secure code MUST fail closed and reject.
    await assert.rejects(
      async () => {
        await AuthService.verifyGoogleIdToken('header.payload.signature');
      },
      /unreachable|ECONNREFUSED/i,
      'Network failure to Google verification service must fail closed'
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('FIX 1.4: Legitimate valid Google token verification succeeds', async () => {
  const originalFetch = globalThis.fetch;
  const prevClientId = process.env.GOOGLE_CLIENT_ID;
  process.env.GOOGLE_CLIENT_ID = 'test-client-id.apps.googleusercontent.com';

  try {
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          iss: 'https://accounts.google.com',
          aud: 'test-client-id.apps.googleusercontent.com',
          email: 'legit_candidate@gmail.com',
          email_verified: true,
          name: 'Legit Candidate',
          picture: 'https://lh3.googleusercontent.com/legit_avatar',
          sub: 'google_sub_123456',
          exp: Math.floor(Date.now() / 1000) + 3600,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );

    const verified = await AuthService.verifyGoogleIdToken('legit.signed.token');
    assert.equal(verified.email, 'legit_candidate@gmail.com');
    assert.equal(verified.name, 'Legit Candidate');
    assert.equal(verified.googleId, 'google_sub_123456');
  } finally {
    globalThis.fetch = originalFetch;
    process.env.GOOGLE_CLIENT_ID = prevClientId;
  }
});

// ============================================================================
// FIX 2: Remove default production administrator credentials
// ============================================================================

test('FIX 2.1: Missing production credentials cannot grant administrator access', async () => {
  const prevEnv = process.env.NODE_ENV;
  const prevAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

  try {
    // Simulate production environment with missing admin password
    (process.env as any).NODE_ENV = 'production';
    delete process.env.SUPER_ADMIN_PASSWORD;

    // Isolate test store
    const testStore = new AuthStore(null, true);
    AuthService.setStore(testStore);

    // Attempt admin login with any password
    const result = AuthService.authenticateWithPassword('istihadahmed1163@gmail.com', 'RandomAttempt2026!');
    assert.equal(result.success, false);
    assert.equal((result as any).code, 'ADMIN_CREDENTIALS_UNCONFIGURED');
    assert.ok(
      (result as any).error.includes('credentials are not configured'),
      'Must fail closed when credentials are not configured in production'
    );
  } finally {
    (process.env as any).NODE_ENV = prevEnv;
    process.env.SUPER_ADMIN_PASSWORD = prevAdminPassword;
    AuthService.setStore(new AuthStore(null, true));
  }
});

test('FIX 2.2: Previously exposed default passwords are blacklisted and rejected', async () => {
  // Compromised default password 'Istihad@Admin2026!'
  assert.ok(COMPROMISED_PASSWORDS.has('Istihad@Admin2026!'));
  assert.ok(COMPROMISED_PASSWORDS.has('student123456'));

  const resultAdmin = AuthService.authenticateWithPassword('istihadahmed1163@gmail.com', 'Istihad@Admin2026!');
  assert.equal(resultAdmin.success, false);
  assert.equal((resultAdmin as any).code, 'COMPROMISED_PASSWORD');

  const resultStudent = AuthService.authenticateWithPassword('student@test.com', 'student123456');
  assert.equal(resultStudent.success, false);
  assert.equal((resultStudent as any).code, 'COMPROMISED_PASSWORD');
});

test('FIX 2.3: Test fixtures are unavailable and throw in production mode', async () => {
  const prevEnv = process.env.NODE_ENV;
  try {
    (process.env as any).NODE_ENV = 'production';
    const store = new AuthStore(null, true);

    assert.throws(
      () => {
        seedTestFixtures(store);
      },
      /SECURITY VIOLATION: Test fixtures cannot be seeded/i,
      'Must throw security violation if attempting to seed test fixtures in production'
    );
  } finally {
    (process.env as any).NODE_ENV = prevEnv;
  }
});

// ============================================================================
// FIX 3: Require a strong session-signing secret
// ============================================================================

test('FIX 3.1: Missing or weak session secret throws error in production', () => {
  const prevEnv = process.env.NODE_ENV;
  const prevSecret = process.env.SESSION_SECRET;
  const prevNextAuthSecret = process.env.NEXTAUTH_SECRET;

  try {
    (process.env as any).NODE_ENV = 'production';
    delete process.env.SESSION_SECRET;
    delete process.env.NEXTAUTH_SECRET;

    // A. Missing secret in production
    assert.throws(
      () => {
        getEffectiveSessionSecret();
      },
      /SESSION_SECRET is not configured in production/i,
      'Must throw when SESSION_SECRET is missing in production'
    );

    // B. Weak secret (< 32 chars) in production
    process.env.SESSION_SECRET = 'short_weak_secret_123';
    assert.throws(
      () => {
        getEffectiveSessionSecret();
      },
      /SESSION_SECRET is too weak/i,
      'Must throw when SESSION_SECRET has fewer than 32 characters in production'
    );

    // C. Insecure known placeholder secret in production
    process.env.SESSION_SECRET = 'bcs_crack_prod_session_secret_change_in_production_2026';
    assert.throws(
      () => {
        getEffectiveSessionSecret();
      },
      /Insecure placeholder SESSION_SECRET detected/i,
      'Must throw when known placeholder secret is used'
    );
  } finally {
    (process.env as any).NODE_ENV = prevEnv;
    process.env.SESSION_SECRET = prevSecret;
    process.env.NEXTAUTH_SECRET = prevNextAuthSecret;
  }
});

test('FIX 3.2: Configured strong secret successfully creates and validates session', () => {
  const strongSecret = 'super_secret_cryptographically_secure_random_key_64_characters_long_2026!';
  const prevSecret = process.env.SESSION_SECRET;
  process.env.SESSION_SECRET = strongSecret;

  try {
    const store = new AuthStore(null, true);
    AuthService.setStore(store);

    const testUser = {
      id: 'usr_valid_secret_test',
      email: 'secret_test@gmail.com',
      fullName: 'Secret Tester',
      role: 'student' as const,
      authProvider: 'credentials' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.saveUser(testUser);

    const token = AuthService.createSession(testUser);
    assert.ok(token.includes('.'), 'Session token must have payload and signature');

    const validation = AuthService.validateActiveSession(token);
    assert.equal(validation.status, 'valid');
    assert.equal(validation.session?.userId, testUser.id);
  } finally {
    process.env.SESSION_SECRET = prevSecret;
  }
});

// ============================================================================
// FIX 4: Persist authentication and session state across instances & restarts
// ============================================================================

test('FIX 4.1: Session persistence and single-device enforcement across separate store instances', () => {
  const tempDir = path.resolve(process.cwd(), 'data', 'test-scratch');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
  const sharedFilePath = path.join(tempDir, `session_persistence_test_${Date.now()}.json`);

  try {
    // Instance 1 writes session
    const instance1 = new AuthStore(sharedFilePath);
    const testUser = {
      id: 'usr_multi_instance_test',
      email: 'multi_instance@bcs.test',
      fullName: 'Multi Instance User',
      role: 'student' as const,
      authProvider: 'credentials' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    instance1.saveUser(testUser);

    const now = Math.floor(Date.now() / 1000);
    const session1Payload = {
      sessionId: 'sess_instance_1_device_A',
      userId: testUser.id,
      email: testUser.email,
      role: testUser.role,
      fullName: testUser.fullName,
      issuedAt: now,
      expiresAt: now + 86400,
    };
    instance1.createSessionAtomic(testUser, session1Payload.sessionId, session1Payload);

    // Verify disk file was created
    assert.ok(fs.existsSync(sharedFilePath), 'Shared session store file must exist on disk');

    // Instance 2 (representing a second container / server restart) connects to same shared store
    const instance2 = new AuthStore(sharedFilePath);

    // Instance 2 must immediately read persisted user and session
    const retrievedSession = instance2.getSession('sess_instance_1_device_A');
    assert.ok(retrievedSession, 'Instance 2 must read session created by Instance 1');
    assert.equal(retrievedSession?.userId, testUser.id);
    assert.equal(instance2.getActiveSessionForUser(testUser.id), 'sess_instance_1_device_A');

    // Instance 2 signs in Device B for the same account
    const session2Payload = {
      sessionId: 'sess_instance_2_device_B',
      userId: testUser.id,
      email: testUser.email,
      role: testUser.role,
      fullName: testUser.fullName,
      issuedAt: now,
      expiresAt: now + 86400,
    };
    instance2.createSessionAtomic(testUser, session2Payload.sessionId, session2Payload);

    // Instance 1 checks session state: Device A must now be superseded!
    const deviceASuperseded = instance1.getSupersededSession('sess_instance_1_device_A');
    assert.ok(deviceASuperseded, 'Instance 1 must see Device A flagged as superseded');
    assert.equal(deviceASuperseded?.reason, 'signed_in_on_another_device');

    // Device B is the only active session
    assert.equal(instance1.getActiveSessionForUser(testUser.id), 'sess_instance_2_device_B');
    assert.equal(instance1.getSession('sess_instance_1_device_A'), null, 'Device A session must be deleted');
    assert.ok(instance1.getSession('sess_instance_2_device_B'), 'Device B session must be active');

    // Session revocation across instances
    instance1.revokeSession('sess_instance_2_device_B');
    assert.equal(instance2.getSession('sess_instance_2_device_B'), null, 'Revocation must sync to Instance 2');
    assert.equal(instance2.getActiveSessionForUser(testUser.id), null);
  } finally {
    if (fs.existsSync(sharedFilePath)) {
      try {
        fs.unlinkSync(sharedFilePath);
      } catch {}
    }
  }
});

test('FIX 4.2: Concurrent sign-ins safely resolve to a single active session', async () => {
  const store = new AuthStore(null, true);
  const user = {
    id: 'usr_concurrent_test',
    email: 'concurrent@bcs.test',
    fullName: 'Concurrent User',
    role: 'student' as const,
    authProvider: 'credentials' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.saveUser(user);

  const now = Math.floor(Date.now() / 1000);

  // Simulate 10 simultaneous login requests for the same account
  const attempts = Array.from({ length: 10 }, (_, i) => ({
    sessionId: `sess_concurrent_${i}`,
    userId: user.id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    issuedAt: now,
    expiresAt: now + 86400,
  }));

  // Execute concurrently
  await Promise.all(
    attempts.map(async (payload) => {
      store.createSessionAtomic(user, payload.sessionId, payload);
    })
  );

  // EXACTLY one session ID must remain in active session map for this user
  const activeSessionId = store.getActiveSessionForUser(user.id);
  assert.ok(activeSessionId, 'An active session ID must exist');

  // Verify only 1 active session payload exists in the store for this account
  const activePayload = store.getSession(activeSessionId);
  assert.ok(activePayload, 'Active session payload must be valid');

  let activeCount = 0;
  for (const attempt of attempts) {
    if (store.getSession(attempt.sessionId)) {
      activeCount++;
    }
  }
  assert.equal(activeCount, 1, 'Strict invariant: exactly 1 active session can exist simultaneously');
});

// ============================================================================
// FIX 5: Prevent cross-user planner access (BOLA / IDOR protection)
// ============================================================================

test('FIX 5.1: Attempting to generate a plan for another user is blocked (403 Forbidden)', async () => {
  const store = new AuthStore(null, true);
  AuthService.setStore(store);

  // Authenticated candidate: Alice
  const alice = {
    id: 'user_alice_111',
    email: 'alice@bcs.test',
    fullName: 'Alice Candidate',
    role: 'student' as const,
    authProvider: 'credentials' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.saveUser(alice);
  const aliceToken = AuthService.createSession(alice);

  // Alice tries to generate/modify study plan for Bob (Victim)
  const reqTampered = new NextRequest('http://localhost:3000/api/planner/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `bcs_session=${aliceToken}`,
    },
    body: JSON.stringify({
      userId: 'user_bob_victim_222', // Cross-user attack payload!
      examTrackId: 'special_bcs_health_51_2026',
      professionalStream: 'assistant_surgeon',
      dailyMinutesBudget: 120,
    }),
  });

  const resTampered = await generatePlanHandler(reqTampered);
  assert.equal(resTampered.status, 403, 'Must return HTTP 403 Forbidden on cross-user userId payload');

  const bodyTampered = await resTampered.json();
  assert.equal(bodyTampered.success, false);
  assert.equal(bodyTampered.code, 'FORBIDDEN_CROSS_USER');
  assert.ok(bodyTampered.error.includes('cannot generate or modify a study plan for another user'));
});

test('FIX 5.2: Input validation rejects invalid exam tracks, streams, and budgets', async () => {
  const store = new AuthStore(null, true);
  AuthService.setStore(store);

  const alice = {
    id: 'user_alice_valid',
    email: 'alice_valid@bcs.test',
    fullName: 'Alice Valid',
    role: 'student' as const,
    authProvider: 'credentials' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.saveUser(alice);
  const aliceToken = AuthService.createSession(alice);

  // A. Invalid exam track
  const reqInvalidTrack = new NextRequest('http://localhost:3000/api/planner/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie: `bcs_session=${aliceToken}` },
    body: JSON.stringify({ examTrackId: 'non_existent_track_99' }),
  });
  const resTrack = await generatePlanHandler(reqInvalidTrack);
  assert.equal(resTrack.status, 400);
  assert.equal((await resTrack.json()).code, 'INVALID_EXAM_TRACK');

  // B. Incompatible track and professional stream
  const reqIncompatible = new NextRequest('http://localhost:3000/api/planner/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie: `bcs_session=${aliceToken}` },
    body: JSON.stringify({
      examTrackId: 'general_bcs',
      professionalStream: 'assistant_surgeon', // Invalid for General BCS
    }),
  });
  const resIncompat = await generatePlanHandler(reqIncompatible);
  assert.equal(resIncompat.status, 400);
  assert.equal((await resIncompat.json()).code, 'INCOMPATIBLE_TRACK_STREAM');

  // C. Unreasonable daily minutes budget (< 15 or > 720)
  const reqInvalidBudget = new NextRequest('http://localhost:3000/api/planner/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie: `bcs_session=${aliceToken}` },
    body: JSON.stringify({ dailyMinutesBudget: 9999 }),
  });
  const resBudget = await generatePlanHandler(reqInvalidBudget);
  assert.equal(resBudget.status, 400);
  assert.equal((await resBudget.json()).code, 'INVALID_BUDGET');

  // D. Malformed target exam date
  const reqInvalidDate = new NextRequest('http://localhost:3000/api/planner/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie: `bcs_session=${aliceToken}` },
    body: JSON.stringify({ targetExamDate: 'not-a-valid-date-string' }),
  });
  const resDate = await generatePlanHandler(reqInvalidDate);
  assert.equal(resDate.status, 400);
  assert.equal((await resDate.json()).code, 'INVALID_TARGET_DATE');
});

test('FIX 5.3: Legitimate valid request generates plan bound strictly to authenticated user', async () => {
  const store = new AuthStore(null, true);
  AuthService.setStore(store);

  const candidate = {
    id: 'user_candidate_777',
    email: 'candidate_777@bcs.test',
    fullName: 'Genuine Candidate',
    role: 'student' as const,
    authProvider: 'credentials' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.saveUser(candidate);
  const token = AuthService.createSession(candidate);

  const reqValid = new NextRequest('http://localhost:3000/api/planner/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `bcs_session=${token}`,
    },
    body: JSON.stringify({
      examTrackId: 'special_bcs_health_51_2026',
      professionalStream: 'assistant_surgeon',
      dailyMinutesBudget: 150,
      targetExamDate: '2026-11-30T00:00:00.000Z',
    }),
  });

  const resValid = await generatePlanHandler(reqValid);
  assert.equal(resValid.status, 200, 'Valid plan request must succeed with 200');

  const jsonValid = await resValid.json();
  assert.equal(jsonValid.success, true);
  assert.ok(jsonValid.data, 'Study plan data must be present');
  assert.equal(
    jsonValid.data.userId,
    candidate.id,
    'Plan must be strictly owned by authenticated session userId'
  );
  assert.equal(jsonValid.data.dailyMinutesBudget, 150);
});
