import test from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { AuthService, DEFAULT_SUPER_ADMIN_PASSWORD } from '../src/services/auth';
import { proxy } from '../src/proxy';

test('1. Unauthenticated Visitor Protection & Redirection to Login', async () => {
  // 1a. Unauthenticated visitor visits /dashboard
  const reqDashboard = new NextRequest('http://localhost:3000/dashboard');
  const resDashboard = proxy(reqDashboard);

  assert.equal(resDashboard.status, 307, 'Must redirect unauthenticated visitor from /dashboard');
  const locationHeader = resDashboard.headers.get('location');
  assert.ok(locationHeader, 'Must contain Location header');
  assert.ok(
    locationHeader.includes('/login?redirect=%2Fdashboard'),
    `Redirect must return intended page in redirect param: ${locationHeader}`
  );

  // 1b. Unauthenticated visitor visits deep protected page /dashboard/planner
  const reqDeep = new NextRequest('http://localhost:3000/dashboard/planner?tab=weekly');
  const resDeep = proxy(reqDeep);
  assert.equal(resDeep.status, 307);
  const deepLocation = resDeep.headers.get('location');
  assert.ok(
    deepLocation?.includes('/login?redirect=%2Fdashboard%2Fplanner%3Ftab%3Dweekly'),
    `Deep redirect must preserve path and query: ${deepLocation}`
  );

  // 1c. Unauthenticated call to protected dashboard API /api/planner/generate
  const reqApi = new NextRequest('http://localhost:3000/api/planner/generate', {
    method: 'POST',
  });
  const resApi = proxy(reqApi);
  assert.equal(resApi.status, 401, 'Protected dashboard API must return HTTP 401 Unauthorized');
  const apiBody = await resApi.json();
  assert.equal(apiBody.code, 'UNAUTHORIZED');
  assert.equal(apiBody.authenticated, false);
});

test('2. Server-Enforced RBAC & Super Admin Authentication for istihadahmed1163@gmail.com', async () => {
  const superAdminEmail = 'istihadahmed1163@gmail.com';

  // 2a. Attempting admin login with invalid password must fail
  const failedAdminAuth = AuthService.authenticateWithPassword(superAdminEmail, 'WrongPassword123');
  assert.equal(failedAdminAuth.success, false);
  assert.equal((failedAdminAuth as any).code, 'UNAUTHORIZED_ADMIN');

  // 2b. Authoritative server verification with valid admin credentials
  const adminAuth = AuthService.authenticateWithPassword(
    superAdminEmail,
    DEFAULT_SUPER_ADMIN_PASSWORD
  );
  assert.equal(adminAuth.success, true);
  if (adminAuth.success) {
    assert.equal(adminAuth.user.email, superAdminEmail);
    assert.equal(
      adminAuth.user.role,
      'super_admin',
      'istihadahmed1163@gmail.com must authoritatively receive super_admin role'
    );
  }

  // 2c. Session created for super admin must have super_admin role cryptographically verified
  const adminToken = AuthService.createSession(adminAuth.user);
  const adminValidation = AuthService.validateActiveSession(adminToken);
  assert.equal(adminValidation.status, 'valid');
  assert.equal(adminValidation.session?.role, 'super_admin');
  assert.equal(AuthService.isSuperAdmin(adminValidation.session), true);

  // 2d. Regular student user registration receives student role
  const studentEmail = 'candidate_bcs_aspirant@gmail.com';
  const studentAuth = AuthService.authenticateWithPassword(studentEmail, 'StudentPassword2026!');
  assert.equal(studentAuth.success, true);
  if (studentAuth.success) {
    assert.equal(studentAuth.user.role, 'student', 'Regular applicant must receive student role');
  }

  // Verify non-admin cannot elevate own role in session payload
  const studentToken = AuthService.createSession(studentAuth.user);
  const studentValidation = AuthService.validateActiveSession(studentToken);
  assert.equal(studentValidation.session?.role, 'student');
  assert.equal(AuthService.isSuperAdmin(studentValidation.session), false);
});

test('3. Deny By Default: Non-Admin Access to /admin and /api/admin is Blocked', async () => {
  // Create student session
  const student = AuthService.findOrCreateEmailUser('student_denied_test@gmail.com');
  student.role = 'student';
  const studentToken = AuthService.createSession(student);

  // 3a. Student visits /admin -> must redirect to /access-denied
  const reqAdminPage = new NextRequest('http://localhost:3000/admin/users', {
    headers: {
      cookie: `bcs_session=${studentToken}`,
    },
  });
  const resAdminPage = proxy(reqAdminPage);
  assert.equal(resAdminPage.status, 307);
  const deniedLocation = resAdminPage.headers.get('location');
  assert.ok(
    deniedLocation?.includes('/access-denied'),
    `Non-admin must be redirected to /access-denied: ${deniedLocation}`
  );

  // 3b. Student calls /api/admin/subscriptions -> must return 403 Forbidden
  const reqAdminApi = new NextRequest('http://localhost:3000/api/admin/subscriptions', {
    headers: {
      cookie: `bcs_session=${studentToken}`,
    },
  });
  const resAdminApi = proxy(reqAdminApi);
  assert.equal(resAdminApi.status, 403, 'Must return HTTP 403 Forbidden for non-admin');
  const forbiddenBody = await resAdminApi.json();
  assert.equal(forbiddenBody.code, 'FORBIDDEN');
  assert.ok(forbiddenBody.error.includes('Super Admin permissions required'));

  // 3c. Super Admin accesses /admin/users -> allowed through
  const superAdmin = AuthService.getUserByEmail('istihadahmed1163@gmail.com')!;
  const superToken = AuthService.createSession(superAdmin);

  const reqSuperAdminPage = new NextRequest('http://localhost:3000/admin/users', {
    headers: {
      cookie: `bcs_session=${superToken}`,
    },
  });
  const resSuperAdminPage = proxy(reqSuperAdminPage);
  assert.equal(resSuperAdminPage.status, 200, 'Super admin must be granted access');
  assert.equal(resSuperAdminPage.headers.get('x-user-role'), 'super_admin');
});

test('4. One Active Device Per Account: Invalidation and Message on Previous Device', async () => {
  const accountEmail = 'single_device_student@gmail.com';
  const studentUser = AuthService.findOrCreateEmailUser(accountEmail);

  // Device 1 signs in
  const device1Token = AuthService.createSession(studentUser);
  const d1ValidationBefore = AuthService.validateActiveSession(device1Token);
  assert.equal(d1ValidationBefore.status, 'valid');

  // Device 1 accesses dashboard successfully
  const d1ReqBefore = new NextRequest('http://localhost:3000/dashboard', {
    headers: { cookie: `bcs_session=${device1Token}` },
  });
  const d1ResBefore = proxy(d1ReqBefore);
  assert.equal(d1ResBefore.status, 200, 'Device 1 must access dashboard when active');

  // Device 2 signs in with the same account
  const device2Token = AuthService.createSession(studentUser);
  assert.notEqual(device1Token, device2Token, 'New session token must be distinct');

  // Check server state: Device 2 is the ONLY active session
  const activeSessionId = AuthService.getActiveSessionForUser(studentUser.id);
  const d2Validation = AuthService.validateActiveSession(device2Token);
  assert.equal(d2Validation.status, 'valid');
  assert.equal(d2Validation.session?.sessionId, activeSessionId);

  // Device 1 now attempts to access dashboard with previous session
  const d1ValidationAfter = AuthService.validateActiveSession(device1Token);
  assert.equal(
    d1ValidationAfter.status,
    'superseded',
    'Previous session on Device 1 must be flagged as superseded server-side'
  );
  assert.ok(
    d1ValidationAfter.message.includes('signed in on another device'),
    'Message must explain session ended due to sign-in elsewhere'
  );

  // Proxy intercepts Device 1 request to /dashboard
  const d1ReqAfter = new NextRequest('http://localhost:3000/dashboard', {
    headers: { cookie: `bcs_session=${device1Token}` },
  });
  const d1ResAfter = proxy(d1ReqAfter);

  assert.equal(d1ResAfter.status, 307, 'Device 1 must be redirected');
  const d1Location = d1ResAfter.headers.get('location');
  assert.ok(
    d1Location?.includes('reason=session_superseded'),
    `Redirect must include reason=session_superseded: ${d1Location}`
  );
  assert.ok(
    d1Location?.includes('redirect=%2Fdashboard'),
    `Redirect must preserve intended destination: ${d1Location}`
  );

  // Proxy intercepts Device 1 request to API
  const d1ApiReq = new NextRequest('http://localhost:3000/api/planner/generate', {
    method: 'POST',
    headers: { cookie: `bcs_session=${device1Token}` },
  });
  const d1ApiRes = proxy(d1ApiReq);
  assert.equal(d1ApiRes.status, 401, 'Device 1 API call must return 401');
  const d1ApiBody = await d1ApiRes.json();
  assert.equal(d1ApiBody.code, 'SESSION_SUPERSEDED');
  assert.ok(d1ApiBody.error.includes('signed in on another device'));

  // Device 2 continues to access dashboard without interruption
  const d2Req = new NextRequest('http://localhost:3000/dashboard', {
    headers: { cookie: `bcs_session=${device2Token}` },
  });
  const d2Res = proxy(d2Req);
  assert.equal(d2Res.status, 200, 'Device 2 must remain active and permitted');
});

test('5. Single Active Device Rule Strictly Applies to Super Admin (istihadahmed1163@gmail.com)', async () => {
  const superAdmin = AuthService.getUserByEmail('istihadahmed1163@gmail.com')!;

  // Device A signs in as Super Admin
  const tokenDeviceA = AuthService.createSession(superAdmin);
  const valA1 = AuthService.validateActiveSession(tokenDeviceA);
  assert.equal(valA1.status, 'valid');

  // Device B signs in as Super Admin on another computer/phone
  const tokenDeviceB = AuthService.createSession(superAdmin);
  const valB = AuthService.validateActiveSession(tokenDeviceB);
  assert.equal(valB.status, 'valid');

  // Device A is immediately superseded
  const valA2 = AuthService.validateActiveSession(tokenDeviceA);
  assert.equal(
    valA2.status,
    'superseded',
    'Super Admin session on Device A must be superseded when Device B signs in'
  );

  // Device A attempting to access /admin/users gets redirected with session_superseded
  const reqSuperA = new NextRequest('http://localhost:3000/admin/users', {
    headers: { cookie: `bcs_session=${tokenDeviceA}` },
  });
  const resSuperA = proxy(reqSuperA);
  assert.equal(resSuperA.status, 307);
  assert.ok(resSuperA.headers.get('location')?.includes('reason=session_superseded'));

  // Device B has full authority
  const reqSuperB = new NextRequest('http://localhost:3000/admin/users', {
    headers: { cookie: `bcs_session=${tokenDeviceB}` },
  });
  const resSuperB = proxy(reqSuperB);
  assert.equal(resSuperB.status, 200);
  assert.equal(resSuperB.headers.get('x-user-role'), 'super_admin');
});

test('6. Session Revocation (Logout) Cleanly Clears Active Session', async () => {
  const user = AuthService.findOrCreateEmailUser('logout_tester@gmail.com');
  const token = AuthService.createSession(user);

  const validationBefore = AuthService.validateActiveSession(token);
  assert.equal(validationBefore.status, 'valid');

  // Revoke session
  AuthService.revokeSession(validationBefore.session!.sessionId);

  const validationAfter = AuthService.validateActiveSession(token);
  assert.notEqual(validationAfter.status, 'valid');
  assert.equal(validationAfter.code, 'SESSION_REVOKED');
});
