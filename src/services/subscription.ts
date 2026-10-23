import crypto from 'crypto';
import {
  AdminAuditRecord,
  FreeUsageStats,
  Order,
  OrderStatus,
  PackagePlan,
  PaymentGatewayType,
  PaymentTransaction,
  UserSubscription,
} from '@/types';

// In-memory persistent stores with globalThis preservation
const globalSub = globalThis as unknown as {
  __bcs_packages__?: Map<string, PackagePlan>;
  __bcs_user_subscriptions__?: Map<string, UserSubscription>;
  __bcs_orders__?: Map<string, Order>;
  __bcs_payment_txs__?: Map<string, PaymentTransaction>;
  __bcs_free_usage__?: Map<string, FreeUsageStats>; // key: `${userId}_${date}`
  __bcs_audit_logs__?: AdminAuditRecord[];
};

// Initialize Default Packages
const DEFAULT_PACKAGES: PackagePlan[] = [
  {
    id: 'pkg_free_preview',
    name: 'Free Preview',
    nameBn: 'ফ্রি ট্রায়াল প্ল্যান',
    description: 'Access designated free questions, diagnostic test, and experience BCSCrack precision prep.',
    descriptionBn: 'বিনামূল্যে ফ্রি প্রশ্ন ব্যাংক ও ডায়াগনস্টিক পরীক্ষার সুবিধা।',
    priceBDT: 0,
    originalPriceBDT: undefined,
    durationDays: 0, // Lifetime free preview
    status: 'active',
    tier: 'free',
    eligibleTracks: ['general_bcs', 'special_bcs_health_51_2026'],
    eligibleStreams: ['general', 'assistant_surgeon', 'assistant_dental_surgeon'],
    includedPracticeModes: ['daily_mixed'],
    includedMockTests: ['diagnostic'],
    features: [
      'Access to verified free question preview',
      'Up to 20 daily practice questions',
      'Basic answer explanations & official citations',
      'Free diagnostic test evaluation',
    ],
    featuresBn: [
      'বাছাইকৃত ফ্রি প্রশ্ন অনুশীলনের সুযোগ',
      'দৈনিক সর্বোচ্চ ২০টি প্রশ্ন সমাধান',
      'মৌলিক ব্যাখ্যা ও নির্ভুল উত্তর',
      'ফ্রি ডায়াগনস্টিক টেস্ট ও প্রাথমিক মূল্যায়ন',
    ],
    freeDailyQuestionLimit: 20,
    isPopular: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pkg_bcs_standard',
    name: 'BCS Preparation',
    nameBn: 'সাধারণ বিসিএস প্রিপারেশন',
    description: 'Full access to all 10 general BCS preliminary subjects, daily practice, topic drills, and question bank.',
    descriptionBn: '১০টি সাধারণ বিসিএস প্রিলিমিনারি বিষয়ের পূর্ণাঙ্গ প্রশ্ন ব্যাংক ও বিষয়ভিত্তিক অনুশীলন।',
    priceBDT: 500,
    originalPriceBDT: 750,
    durationDays: 90,
    status: 'active',
    tier: 'standard',
    eligibleTracks: ['general_bcs'],
    eligibleStreams: ['general'],
    includedPracticeModes: ['daily_mixed', 'previous_exams', 'subject_wise', 'mistake_notebook'],
    includedMockTests: ['diagnostic', 'subject_test', 'full_mock'],
    features: [
      'Full access to 10 General BCS subjects (20,000+ MCQs)',
      'Unlimited daily mixed practice without daily limits',
      'Previous 10th to 46th BCS past question papers',
      'Subject-wise targeted drilling & chapter practice',
      'Mistake Notebook active revision tracker',
    ],
    featuresBn: [
      '১০টি সাধারণ বিসিএস বিষয়ের পূর্ণাঙ্গ প্রশ্ন ব্যাংক (২০,০০০+ প্রশ্ন)',
      'আনলিমিটেড দৈনিক সক্রিয় স্মরণ প্র্যাকটিস',
      '১০ম-৪৬তম বিসিএস বিগত প্রশ্ন সমাধান',
      'বিষয়ভিত্তিক অধ্যায়ভিত্তিক নিবিড় প্রস্তুতি',
      'ভুল খাতা ও দুর্বলতা ট্র্যাকার',
    ],
    isPopular: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pkg_bcs_complete',
    name: 'Complete BCS Preparation',
    nameBn: 'কমপ্লিট বিসিএস মাস্টার প্ল্যান',
    description: 'Everything in Standard plus AI explanations, full 200-mark mock exams with negative marking, and extended validity.',
    descriptionBn: 'সব সাধারণ বিসিএস বিষয়, ২০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট, এআই টিউটর ও দীর্ঘমেয়াদী মেয়াদ।',
    priceBDT: 990,
    originalPriceBDT: 1500,
    durationDays: 180,
    status: 'active',
    tier: 'complete',
    eligibleTracks: ['general_bcs'],
    eligibleStreams: ['general'],
    includedPracticeModes: ['daily_mixed', 'previous_exams', 'subject_wise', 'mistake_notebook'],
    includedMockTests: ['diagnostic', 'subject_test', 'full_mock'],
    features: [
      'All Standard package features included',
      'Unlimited 200-mark full mock exams with timer',
      'Official -0.50 negative marking precision analysis',
      'Deep AI conceptual explanations & weakness recovery',
      '180-Day extended validity with free circular updates',
    ],
    featuresBn: [
      'স্ট্যান্ডার্ড প্যাকেজের সব সুবিধা',
      '২০০ নম্বরের আনলিমিটেড পূর্ণাঙ্গ মডেল টেস্ট',
      'অফিসিয়াল -০.৫০ নেগেটিভ মার্কিং অ্যানালাইসিস',
      'বিস্তারিত এআই কনসেপ্ট ব্যাখ্যা',
      '১৮০ দিনের দীর্ঘমেয়াদী মেয়াদ ও নতুন আপডেটে অগ্রাধিকার',
    ],
    isPopular: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pkg_bcs_medical',
    name: 'Medical BCS Preparation (51st Special)',
    nameBn: '৫১তম বিশেষ বিসিএস (স্বাস্থ্য) স্পেশাল',
    description: 'Dedicated 100-mark professional medical syllabus for Assistant Surgeon (MBBS) & Assistant Dental Surgeon (BDS).',
    descriptionBn: 'সহকারী সার্জন ও ডেন্টাল সার্জন পদের ১০০ নম্বরের প্রফেশনাল পার্ট ও ১০০ নম্বরের সাধারণ পার্টের সম্পূর্ণ প্যাকেজ।',
    priceBDT: 1200,
    originalPriceBDT: 1800,
    durationDays: 180,
    status: 'active',
    tier: 'medical',
    eligibleTracks: ['special_bcs_health_51_2026', 'general_bcs'],
    eligibleStreams: ['assistant_surgeon', 'assistant_dental_surgeon', 'general'],
    includedPracticeModes: ['daily_mixed', 'previous_exams', 'subject_wise', 'mistake_notebook'],
    includedMockTests: ['diagnostic', 'subject_test', 'full_mock'],
    features: [
      '100-Mark Professional Medical Bank (Anatomy, Physio, Patho, Pharma, Med, Surg, Gynae)',
      'Dedicated stream separation for MBBS Assistant Surgeon & BDS Dental Surgeon',
      '100-Mark General BCS portion included (Bangla, English, BD & Int Affairs, Mental Ability)',
      'Full 200-Mark 51st Special BCS Health Simulation',
      'Clinical case MCQs with high-yield textbook references',
    ],
    featuresBn: [
      '১০০ নম্বরের প্রফেশনাল মেডিকেল প্রশ্ন ব্যাংক (অ্যানাটমি, ফিজিও, প্যাথো, সার্জারি ইত্যাদি)',
      'সহকারী সার্জন (MBBS) ও ডেন্টাল সার্জন (BDS) আলাদা ট্র্যাক',
      '১০০ নম্বরের সাধারণ বিষয়ের প্রস্তুতি অন্তর্ভুক্ত',
      '২০০ নম্বরের ৫১তম বিশেষ বিসিএস ফুল সিমুলেশন',
      'ক্লিনিক্যাল কেস ভিত্তিক এমসিকিউ ও ব্যাখ্যা',
    ],
    isPopular: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initialize global stores
if (!globalSub.__bcs_packages__) {
  globalSub.__bcs_packages__ = new Map();
  for (const pkg of DEFAULT_PACKAGES) {
    globalSub.__bcs_packages__.set(pkg.id, pkg);
  }
}

if (!globalSub.__bcs_user_subscriptions__) {
  globalSub.__bcs_user_subscriptions__ = new Map();
  // Grant student_current a Free Preview subscription by default
  const defaultSub: UserSubscription = {
    id: 'sub_default_student',
    userId: 'student_current',
    packageId: 'pkg_free_preview',
    packageName: 'Free Preview',
    tier: 'free',
    status: 'active',
    startDate: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    grantedBy: 'system',
    grantReason: 'Default student onboarding free preview',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  globalSub.__bcs_user_subscriptions__.set(defaultSub.id, defaultSub);
}

if (!globalSub.__bcs_orders__) {
  globalSub.__bcs_orders__ = new Map();
}

if (!globalSub.__bcs_payment_txs__) {
  globalSub.__bcs_payment_txs__ = new Map();
}

if (!globalSub.__bcs_free_usage__) {
  globalSub.__bcs_free_usage__ = new Map();
}

if (!globalSub.__bcs_audit_logs__) {
  globalSub.__bcs_audit_logs__ = [];
}

export class SubscriptionService {
  // ==========================================
  // PACKAGE CATALOG METHODS
  // ==========================================

  /**
   * Returns all active packages for public display
   */
  static getActivePackages(): PackagePlan[] {
    return Array.from(globalSub.__bcs_packages__!.values()).filter(
      (pkg) => pkg.status === 'active'
    );
  }

  /**
   * Returns all packages for admin management
   */
  static getAllPackages(): PackagePlan[] {
    return Array.from(globalSub.__bcs_packages__!.values());
  }

  /**
   * Gets a package by its ID
   */
  static getPackageById(packageId: string): PackagePlan | null {
    return globalSub.__bcs_packages__!.get(packageId) || null;
  }

  /**
   * Admin creates a new package
   */
  static createPackage(
    pkg: Omit<PackagePlan, 'id' | 'createdAt' | 'updatedAt'>,
    adminId: string,
    adminEmail: string
  ): PackagePlan {
    const id = 'pkg_' + crypto.randomBytes(6).toString('hex');
    const newPkg: PackagePlan = {
      ...pkg,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    globalSub.__bcs_packages__!.set(id, newPkg);

    this.logAudit({
      adminUserId: adminId,
      adminEmail,
      action: 'create_package',
      targetType: 'package',
      targetId: id,
      reason: 'Admin created package ' + newPkg.name,
      details: { priceBDT: newPkg.priceBDT, durationDays: newPkg.durationDays },
    });

    return newPkg;
  }

  /**
   * Admin updates an existing package
   */
  static updatePackage(
    id: string,
    updates: Partial<PackagePlan>,
    adminId: string,
    adminEmail: string
  ): PackagePlan {
    const existing = globalSub.__bcs_packages__!.get(id);
    if (!existing) throw new Error('Package not found: ' + id);

    const updated: PackagePlan = {
      ...existing,
      ...updates,
      id: existing.id, // Immutable
      updatedAt: new Date().toISOString(),
    };

    globalSub.__bcs_packages__!.set(id, updated);

    this.logAudit({
      adminUserId: adminId,
      adminEmail,
      action: 'update_package',
      targetType: 'package',
      targetId: id,
      reason: 'Admin updated package ' + updated.name,
      details: updates,
    });

    return updated;
  }

  /**
   * Admin deletes a package (or sets status to inactive if referenced)
   */
  static deletePackage(id: string, adminId: string, adminEmail: string): boolean {
    if (id === 'pkg_free_preview') {
      throw new Error('Default Free Preview package cannot be deleted.');
    }
    const existing = globalSub.__bcs_packages__!.get(id);
    if (!existing) return false;

    // Check if active subscriptions exist for this package
    const hasActiveSubs = Array.from(globalSub.__bcs_user_subscriptions__!.values()).some(
      (sub) => sub.packageId === id && sub.status === 'active'
    );

    if (hasActiveSubs) {
      // Soft-delete by setting status to inactive
      existing.status = 'inactive';
      existing.updatedAt = new Date().toISOString();
    } else {
      globalSub.__bcs_packages__!.delete(id);
    }

    this.logAudit({
      adminUserId: adminId,
      adminEmail,
      action: 'update_package',
      targetType: 'package',
      targetId: id,
      reason: 'Admin removed/deactivated package ' + existing.name,
    });

    return true;
  }

  // ==========================================
  // USER SUBSCRIPTION & ENTITLEMENT METHODS
  // ==========================================

  /**
   * Gets user's current active subscription.
   * If an active subscription has expired, marks it expired.
   * Falls back to Free Preview if no active subscription exists.
   */
  static getUserActiveSubscription(userId: string): UserSubscription {
    const subs = Array.from(globalSub.__bcs_user_subscriptions__!.values()).filter(
      (s) => s.userId === userId
    );

    const now = new Date();

    // Check paid subscriptions first, ordered by tier rank (medical > complete > standard > free)
    const tierRank = { medical: 4, complete: 3, standard: 2, free: 1 };
    subs.sort((a, b) => (tierRank[b.tier] || 0) - (tierRank[a.tier] || 0));

    for (const sub of subs) {
      if (sub.status === 'active') {
        const expires = new Date(sub.expiresAt);
        if (expires < now && sub.tier !== 'free') {
          // Mark expired
          sub.status = 'expired';
          sub.updatedAt = now.toISOString();
        } else {
          return sub;
        }
      }
    }

    // If no active subscription, auto-grant Free Preview
    return this.grantFreePreview(userId);
  }

  /**
   * Automatically grants Free Preview entitlement to a user
   */
  static grantFreePreview(userId: string): UserSubscription {
    // Check if user already has a free preview entry
    for (const sub of globalSub.__bcs_user_subscriptions__!.values()) {
      if (sub.userId === userId && sub.tier === 'free') {
        return sub;
      }
    }

    const freeSub: UserSubscription = {
      id: 'sub_free_' + crypto.randomBytes(6).toString('hex'),
      userId,
      packageId: 'pkg_free_preview',
      packageName: 'Free Preview',
      tier: 'free',
      status: 'active',
      startDate: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      grantedBy: 'system',
      grantReason: 'Automatic Free Preview entitlement',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    globalSub.__bcs_user_subscriptions__!.set(freeSub.id, freeSub);
    return freeSub;
  }

  /**
   * Idempotently activates a purchased package for a verified completed order.
   * If the order has already been activated, returns existing subscription without duplication.
   */
  static activatePurchasedPackage(orderId: string, gatewayTxId?: string): UserSubscription {
    const order = globalSub.__bcs_orders__!.get(orderId);
    if (!order) throw new Error('Order not found: ' + orderId);

    // Verify order is paid
    if (order.status !== 'paid') {
      throw new Error(`Cannot activate package for unpaid order (Status: ${order.status})`);
    }

    // Check if subscription already created for this order (Idempotency check)
    for (const sub of globalSub.__bcs_user_subscriptions__!.values()) {
      if (sub.orderId === orderId) {
        return sub;
      }
    }

    const pkg = this.getPackageById(order.packageId);
    if (!pkg) throw new Error('Package definition not found for ID: ' + order.packageId);

    const now = new Date();
    const durationDays = pkg.durationDays || 90;
    const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString();

    const newSub: UserSubscription = {
      id: 'sub_' + crypto.randomBytes(8).toString('hex'),
      userId: order.userId,
      packageId: pkg.id,
      packageName: pkg.name,
      tier: pkg.tier,
      status: 'active',
      startDate: now.toISOString(),
      expiresAt,
      orderId: order.id,
      grantedBy: 'payment',
      grantReason: `Purchased via ${order.paymentGateway} (Tx: ${gatewayTxId || order.gatewayTransactionId || 'N/A'})`,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    globalSub.__bcs_user_subscriptions__!.set(newSub.id, newSub);

    return newSub;
  }

  /**
   * Admin manually grants or extends access to a user
   */
  static grantManualSubscription(params: {
    userId: string;
    packageId: string;
    durationDays: number;
    reason: string;
    adminUserId: string;
    adminEmail: string;
  }): UserSubscription {
    const { userId, packageId, durationDays, reason, adminUserId, adminEmail } = params;
    if (!reason || reason.trim().length < 3) {
      throw new Error('A valid reason is required for administrative entitlement actions.');
    }

    const pkg = this.getPackageById(packageId);
    if (!pkg) throw new Error('Package not found: ' + packageId);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString();

    const sub: UserSubscription = {
      id: 'sub_admin_' + crypto.randomBytes(6).toString('hex'),
      userId,
      packageId: pkg.id,
      packageName: pkg.name,
      tier: pkg.tier,
      status: 'active',
      startDate: now.toISOString(),
      expiresAt,
      grantedBy: `admin:${adminUserId}`,
      grantReason: reason.trim(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    globalSub.__bcs_user_subscriptions__!.set(sub.id, sub);

    this.logAudit({
      adminUserId,
      adminEmail,
      action: 'grant_subscription',
      targetType: 'user',
      targetId: userId,
      reason,
      details: { packageId, packageName: pkg.name, durationDays, expiresAt },
    });

    return sub;
  }

  /**
   * Admin revokes an active subscription
   */
  static revokeSubscription(
    subscriptionId: string,
    reason: string,
    adminUserId: string,
    adminEmail: string
  ): boolean {
    if (!reason || reason.trim().length < 3) {
      throw new Error('A valid reason is required to revoke a subscription.');
    }

    const sub = globalSub.__bcs_user_subscriptions__!.get(subscriptionId);
    if (!sub) throw new Error('Subscription not found: ' + subscriptionId);

    sub.status = 'cancelled';
    sub.updatedAt = new Date().toISOString();

    this.logAudit({
      adminUserId,
      adminEmail,
      action: 'revoke_subscription',
      targetType: 'subscription',
      targetId: subscriptionId,
      reason,
      details: { userId: sub.userId, packageName: sub.packageName },
    });

    return true;
  }

  /**
   * Calculates remaining days between now and expiresAt
   */
  static calculateRemainingDays(expiresAt: string): number {
    const diffMs = new Date(expiresAt).getTime() - Date.now();
    if (diffMs <= 0) return 0;
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  // ==========================================
  // ORDER & PAYMENT LIFECYCLE
  // ==========================================

  /**
   * Creates a new purchase order
   */
  static createOrder(params: {
    userId: string;
    packageId: string;
    paymentGateway: PaymentGatewayType;
    metadata?: Record<string, any>;
  }): Order {
    const pkg = this.getPackageById(params.packageId);
    if (!pkg) throw new Error('Package not found: ' + params.packageId);

    if (pkg.priceBDT <= 0) {
      throw new Error('Cannot create purchase order for free package.');
    }

    const orderId = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${crypto
      .randomBytes(4)
      .toString('hex')
      .toUpperCase()}`;

    const order: Order = {
      id: orderId,
      userId: params.userId,
      packageId: pkg.id,
      packageName: pkg.name,
      tier: pkg.tier,
      amountBDT: pkg.priceBDT,
      currency: 'BDT',
      status: 'pending',
      paymentGateway: params.paymentGateway,
      createdAt: new Date().toISOString(),
      metadata: params.metadata,
    };

    globalSub.__bcs_orders__!.set(orderId, order);
    return order;
  }

  /**
   * Gets order by ID
   */
  static getOrder(orderId: string): Order | null {
    return globalSub.__bcs_orders__!.get(orderId) || null;
  }

  /**
   * List orders for a specific user
   */
  static getUserOrders(userId: string): Order[] {
    return Array.from(globalSub.__bcs_orders__!.values())
      .filter((o) => o.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * List all orders (Admin operation)
   */
  static listAllOrders(): Order[] {
    return Array.from(globalSub.__bcs_orders__!.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /**
   * Records payment transaction and updates order status.
   * If payment verified, activates package immediately.
   */
  static processPaymentVerification(params: {
    orderId: string;
    gateway: PaymentGatewayType;
    gatewayTransactionId: string;
    amountBDT: number;
    status: 'verified' | 'failed' | 'cancelled';
    gatewayResponseRaw?: Record<string, any>;
    ipAddress?: string;
  }): { order: Order; subscription?: UserSubscription } {
    const order = this.getOrder(params.orderId);
    if (!order) throw new Error('Order not found: ' + params.orderId);

    // Save payment transaction record
    const txId = 'tx_' + crypto.randomBytes(8).toString('hex');
    const tx: PaymentTransaction = {
      id: txId,
      orderId: order.id,
      gateway: params.gateway,
      gatewayTransactionId: params.gatewayTransactionId,
      amountBDT: params.amountBDT,
      currency: 'BDT',
      status: params.status,
      gatewayResponseRaw: params.gatewayResponseRaw,
      verifiedAt: params.status === 'verified' ? new Date().toISOString() : undefined,
      ipAddress: params.ipAddress,
      createdAt: new Date().toISOString(),
    };
    globalSub.__bcs_payment_txs__!.set(txId, tx);

    if (params.status === 'verified') {
      // Amount verification: Must match order amount
      if (Math.abs(order.amountBDT - params.amountBDT) > 0.01) {
        order.status = 'failed';
        throw new Error(
          `Payment amount mismatch! Expected: ${order.amountBDT} BDT, Received: ${params.amountBDT} BDT.`
        );
      }

      order.status = 'paid';
      order.paidAt = new Date().toISOString();
      order.gatewayTransactionId = params.gatewayTransactionId;

      // Activate package idempotently
      const sub = this.activatePurchasedPackage(order.id, params.gatewayTransactionId);
      return { order, subscription: sub };
    } else if (params.status === 'cancelled') {
      order.status = 'cancelled';
      return { order };
    } else {
      order.status = 'failed';
      return { order };
    }
  }

  // ==========================================
  // FREE USAGE TRACKING
  // ==========================================

  /**
   * Gets free plan daily usage statistics for a user
   */
  static getFreeUsageStats(userId: string): FreeUsageStats {
    const today = new Date().toISOString().slice(0, 10);
    const key = `${userId}_${today}`;
    const entry = globalSub.__bcs_free_usage__!.get(key);

    const dailyLimit = 20;
    const attempted = entry ? entry.questionsAttempted : 0;
    const remaining = Math.max(0, dailyLimit - attempted);

    return {
      userId,
      date: today,
      questionsAttempted: attempted,
      dailyLimit,
      remainingToday: remaining,
    };
  }

  /**
   * Records practice questions attempted under free plan
   */
  static recordFreeQuestionsAttempted(userId: string, count: number): FreeUsageStats {
    const today = new Date().toISOString().slice(0, 10);
    const key = `${userId}_${today}`;
    const entry = globalSub.__bcs_free_usage__!.get(key);

    const dailyLimit = 20;
    const currentCount = entry ? entry.questionsAttempted : 0;
    const newCount = currentCount + count;

    const stats: FreeUsageStats = {
      userId,
      date: today,
      questionsAttempted: newCount,
      dailyLimit,
      remainingToday: Math.max(0, dailyLimit - newCount),
    };

    globalSub.__bcs_free_usage__!.set(key, stats);
    return stats;
  }

  // ==========================================
  // AUDIT LOGGING
  // ==========================================

  static logAudit(record: Omit<AdminAuditRecord, 'id' | 'timestamp'>): void {
    const log: AdminAuditRecord = {
      ...record,
      id: 'audit_' + crypto.randomBytes(6).toString('hex'),
      timestamp: new Date().toISOString(),
    };
    globalSub.__bcs_audit_logs__!.push(log);
  }

  static getAuditLogs(): AdminAuditRecord[] {
    return [...(globalSub.__bcs_audit_logs__ || [])].reverse();
  }
}
