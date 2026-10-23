import test from 'node:test';
import assert from 'node:assert/strict';
import { AuthService } from '../src/services/auth';
import { SubscriptionService } from '../src/services/subscription';
import { EntitlementService } from '../src/services/entitlement';
import { PaymentGatewayService } from '../src/services/payment-gateway';

test('1. New User Registration & Default Free Preview Entitlement', async () => {
  // Simulate new Google user identity
  const googleProfile = {
    email: 'new_candidate_2026@gmail.com',
    name: 'Tanzil Ahmed',
    avatarUrl: 'https://lh3.googleusercontent.com/a/tanzil-avatar',
    googleId: 'gid_1092837465',
  };

  const { user, isNewUser } = AuthService.findOrCreateGoogleUser(googleProfile);
  assert.equal(isNewUser, true, 'User must be identified as newly registered');
  assert.equal(user.email, 'new_candidate_2026@gmail.com');
  assert.equal(user.role, 'student');
  assert.equal(user.authProvider, 'google');

  // Verify automatic Free Preview entitlement
  const sub = SubscriptionService.getUserActiveSubscription(user.id);
  assert.ok(sub, 'Newly registered user must have an active subscription');
  assert.equal(sub.tier, 'free', 'Default entitlement must be Free Preview');
  assert.equal(sub.packageName, 'Free Preview');
  assert.equal(sub.status, 'active');

  // Verify initial free daily quota (20 questions)
  const usage = SubscriptionService.getFreeUsageStats(user.id);
  assert.equal(usage.dailyLimit, 20);
  assert.equal(usage.questionsAttempted, 0);
  assert.equal(usage.remainingToday, 20);
});

test('2. Existing User Sign-In & Duplicate Account Prevention', async () => {
  const existingProfile = {
    email: 'new_candidate_2026@gmail.com', // Same email as above
    name: 'Tanzil Ahmed Updated',
    googleId: 'gid_1092837465',
  };

  const { user, isNewUser } = AuthService.findOrCreateGoogleUser(existingProfile);
  assert.equal(isNewUser, false, 'Existing user must not be duplicated');
  assert.equal(user.email, 'new_candidate_2026@gmail.com');

  // Verify signed session creation and verification
  const token = AuthService.createSession(user);
  assert.ok(token.includes('.'), 'Session token must be dot-delimited with signature');

  const session = AuthService.verifySessionToken(token);
  assert.ok(session, 'Session token must verify cryptographically');
  assert.equal(session?.userId, user.id);
  assert.equal(session?.email, user.email);
});

test('3. Question Access Rules: Free Preview vs Premium Classification', async () => {
  // Test Free Preview designation
  const freeQuestion = {
    id: 'q-med-free-10',
    accessTier: 'free_preview' as const,
    examTrackId: 'general_bcs' as const,
    professionalStream: 'all' as const,
    subjectCode: 'BANGLA',
    stemBn: 'চর্যাপদের সবচেয়ে বেশি পদ কে রচনা করেছেন?',
  };

  const tier = EntitlementService.getQuestionAccessTier(freeQuestion);
  assert.equal(tier, 'free_preview');

  // Also test admin dynamic override
  EntitlementService.setQuestionAccessTier('q-custom-free-override', 'free_preview');
  assert.equal(
    EntitlementService.getQuestionAccessTier({ id: 'q-custom-free-override' }),
    'free_preview'
  );

  // A free user can access free preview questions
  const freeUser = AuthService.getUserByEmail('new_candidate_2026@gmail.com')!;
  const checkFree = EntitlementService.canAccessQuestion(freeUser.id, freeQuestion);
  assert.equal(checkFree.allowed, true, 'Free user must be able to access free preview questions');

  // Test explicitly designated premium question
  const premiumQuestion = {
    id: 'q-med-premium-01',
    accessTier: 'premium' as const,
    examTrackId: 'general_bcs' as const,
    professionalStream: 'all' as const,
    subjectCode: 'BD_AFFAIRS',
    stemBn: 'বঙ্গভঙ্গ রদ কত সালে ঘোষিত হয়?',
  };

  assert.equal(EntitlementService.getQuestionAccessTier(premiumQuestion), 'premium');
});

test('4. Backend API Protection & Question Redaction for Free Users', async () => {
  const freeUser = AuthService.getUserByEmail('new_candidate_2026@gmail.com')!;

  // Exhaust daily quota for testing locked state
  SubscriptionService.recordFreeQuestionsAttempted(freeUser.id, 25);
  const usage = SubscriptionService.getFreeUsageStats(freeUser.id);
  assert.equal(usage.remainingToday, 0, 'Free quota should now be exhausted');

  const lockedQuestion = {
    id: 'q-premium-deep-99',
    accessTier: 'premium' as const,
    examTrackId: 'general_bcs' as const,
    professionalStream: 'all' as const,
    subjectCode: 'BANGLA',
    stemBn: 'বাংলা সাহিত্যের প্রাচীনতম নিদর্শন কোনটি?',
    stemEn: 'What is the oldest specimen of Bengali literature?',
    options: [
      { id: 'A' as const, textEn: 'Charyapada', textBn: 'চর্যাপদ' },
      { id: 'B' as const, textEn: 'Mangalkavya', textBn: 'মঙ্গলকাব্য' },
    ],
    correctAnswerId: 'A' as const,
    explanationBn: 'চর্যাপদ বাংলা ভাষার আদি নিদর্শন। হরপ্রসাদ শাস্ত্রী এটি আবিষ্কার করেন।',
    explanationEn: 'Charyapada is the oldest specimen discovered by Haraprasad Shastri.',
  };

  const filtered = EntitlementService.filterOrRedactQuestion(freeUser.id, lockedQuestion);
  assert.equal(filtered.isLocked, true, 'Question must be marked locked');
  assert.ok(filtered.stemBn!.includes('প্রিমিয়াম প্যাকেজ আনলক করুন'), 'Stem must indicate locked status');
  assert.equal(filtered.options![0].textBn, 'প্রিমিয়াম অপশন', 'Options must be redacted');
  assert.ok(filtered.explanationBn!.includes('প্রিমিয়াম প্যাকেজ'), 'Explanation must be masked');
});

test('5. Order Creation & Pricing Integrity Verification', async () => {
  const freeUser = AuthService.getUserByEmail('new_candidate_2026@gmail.com')!;

  // Attempting to order non-existent package must fail
  assert.throws(() => {
    SubscriptionService.createOrder({
      userId: freeUser.id,
      packageId: 'pkg_non_existent',
      paymentGateway: 'sslcommerz',
    });
  });

  // Attempting to order free preview package must fail (Free Preview cannot be bought)
  assert.throws(() => {
    SubscriptionService.createOrder({
      userId: freeUser.id,
      packageId: 'pkg_free_preview',
      paymentGateway: 'sslcommerz',
    });
  });

  // Order BCS Preparation (Standard) package
  const order = SubscriptionService.createOrder({
    userId: freeUser.id,
    packageId: 'pkg_bcs_standard',
    paymentGateway: 'sslcommerz',
  });

  assert.ok(order.id.startsWith('ORD-'));
  assert.equal(order.amountBDT, 500, 'Price must strictly match package catalog (500 BDT)');
  assert.equal(order.currency, 'BDT');
  assert.equal(order.status, 'pending');
  assert.equal(order.tier, 'standard');
});

test('6. Payment Gateway Verification & Server-Side Security', async () => {
  const freeUser = AuthService.getUserByEmail('new_candidate_2026@gmail.com')!;
  const order = SubscriptionService.getUserOrders(freeUser.id)[0];

  // 1. Amount mismatch verification: if gateway reports wrong amount, activation must fail
  assert.throws(() => {
    SubscriptionService.processPaymentVerification({
      orderId: order.id,
      gateway: 'sslcommerz',
      gatewayTransactionId: 'VAL_TEST_999',
      amountBDT: 300, // Expected 500 BDT, reported 300 BDT!
      status: 'verified',
    });
  }, /Payment amount mismatch/);

  // Status must remain unpaid or failed
  const orderAfterTamper = SubscriptionService.getOrder(order.id)!;
  assert.equal(orderAfterTamper.status, 'failed', 'Tampered order must be marked failed');

  // User must still NOT have premium access
  const subAfterTamper = SubscriptionService.getUserActiveSubscription(freeUser.id);
  assert.equal(subAfterTamper.tier, 'free', 'User must NOT receive premium access on amount mismatch');
});

test('7. Successful Payment & Idempotent Package Activation', async () => {
  const freeUser = AuthService.getUserByEmail('new_candidate_2026@gmail.com')!;

  // Create clean order
  const order = SubscriptionService.createOrder({
    userId: freeUser.id,
    packageId: 'pkg_bcs_medical', // 1200 BDT
    paymentGateway: 'sslcommerz',
  });

  // Server-side payment verification
  const result = SubscriptionService.processPaymentVerification({
    orderId: order.id,
    gateway: 'sslcommerz',
    gatewayTransactionId: 'SSL_BANK_TXN_777888',
    amountBDT: 1200,
    status: 'verified',
  });

  assert.equal(result.order.status, 'paid');
  assert.ok(result.subscription, 'Subscription must be activated');
  assert.equal(result.subscription?.tier, 'medical');
  assert.equal(result.subscription?.status, 'active');

  // Verify remaining validity
  const remainingDays = SubscriptionService.calculateRemainingDays(result.subscription!.expiresAt);
  assert.ok(remainingDays >= 179 && remainingDays <= 180, 'Validity must be 180 days');

  // Idempotency check: sending duplicate verification callback must return same subscription without creating duplicate
  const subCountBefore = Array.from((globalThis as any).__bcs_user_subscriptions__.values()).length;
  const duplicateSub = SubscriptionService.activatePurchasedPackage(order.id, 'SSL_BANK_TXN_777888');
  const subCountAfter = Array.from((globalThis as any).__bcs_user_subscriptions__.values()).length;

  assert.equal(subCountBefore, subCountAfter, 'Duplicate callback must NOT create duplicate subscriptions');
  assert.equal(duplicateSub.id, result.subscription!.id, 'Must return identical subscription ID');
});

test('8. Medical Stream Access Isolation with Active Package', async () => {
  const medicalUser = AuthService.getUserByEmail('new_candidate_2026@gmail.com')!;

  const medicalQuestion = {
    id: 'q-surg-001',
    accessTier: 'premium' as const,
    examTrackId: 'special_bcs_health_51_2026' as const,
    professionalStream: 'assistant_surgeon' as const,
    subjectCode: 'MED_SCI_1',
    stemBn: 'হিউমেরাস ফ্র্যাকচারের জটিলতায় কোন স্নায়ু সর্বাধিক ক্ষতিগ্রস্ত হয়?',
  };

  // With active Medical package, user must be granted access
  const accessCheck = EntitlementService.canAccessQuestion(medicalUser.id, medicalQuestion);
  assert.equal(accessCheck.allowed, true, 'Medical subscriber must have access to 51st Special BCS Health questions');

  // Daily Practice check for Special BCS Health
  const practiceCheck = EntitlementService.canAccessDailyPractice(medicalUser.id, {
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    practiceMode: 'daily_mixed',
    questionCount: 30,
  });
  assert.equal(practiceCheck.allowed, true, 'Medical subscriber must be allowed to start medical practice');
});

test('9. Admin Management, Manual Grants & Mandatory Audit Logging', async () => {
  const admin = AuthService.getUserById('user_admin_001')!;
  assert.equal(admin.role, 'super_admin');

  // Test user
  const targetUser: any = {
    id: 'student_manual_test',
    email: 'scholarship_student@gmail.com',
    fullName: 'Scholarship Candidate',
    role: 'student',
    authProvider: 'google',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  (globalThis as any).__bcs_users__.set(targetUser.id, targetUser);

  // Manual grant with audit reason
  const sub = SubscriptionService.grantManualSubscription({
    userId: targetUser.id,
    packageId: 'pkg_bcs_complete',
    durationDays: 30,
    reason: 'National Merit Scholarship Awardee full grant',
    adminUserId: admin.id,
    adminEmail: admin.email,
  });

  assert.equal(sub.tier, 'complete');
  assert.equal(sub.status, 'active');
  assert.ok(sub.grantedBy.startsWith('admin:'));

  // Verify audit log entry
  const logs = SubscriptionService.getAuditLogs();
  const lastLog = logs[0];
  assert.equal(lastLog.action, 'grant_subscription');
  assert.equal(lastLog.adminEmail, admin.email);
  assert.equal(lastLog.targetId, targetUser.id);
  assert.equal(lastLog.reason, 'National Merit Scholarship Awardee full grant');

  // Revoke subscription with reason
  SubscriptionService.revokeSubscription(
    sub.id,
    'Terms of service non-compliance',
    admin.id,
    admin.email
  );

  const revokedSub = SubscriptionService.getUserActiveSubscription(targetUser.id);
  // Fall back to Free Preview after revocation
  assert.equal(revokedSub.tier, 'free', 'Revoked user must fall back to Free Preview');
});
