import { ExamTrackId, ProfessionalStreamId, UserRole } from './index';

export type PackageTier = 'free' | 'standard' | 'complete' | 'medical';

export type PackageStatus = 'draft' | 'active' | 'inactive';

export type QuestionAccessTier = 'free_preview' | 'premium' | 'package_restricted';

export interface PackagePlan {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  priceBDT: number;
  originalPriceBDT?: number;
  durationDays: number; // 0 for free/lifetime, 90, 180, 365
  status: PackageStatus;
  tier: PackageTier;
  eligibleTracks: ExamTrackId[];
  eligibleStreams: ProfessionalStreamId[];
  eligibleSubjects?: string[];
  includedPracticeModes: string[];
  includedMockTests: string[];
  features: string[];
  featuresBn: string[];
  freeDailyQuestionLimit?: number;
  isPopular?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionStatus = 'active' | 'expired' | 'cancelled';

export interface UserSubscription {
  id: string;
  userId: string;
  packageId: string;
  packageName: string;
  tier: PackageTier;
  status: SubscriptionStatus;
  startDate: string; // ISO
  expiresAt: string; // ISO
  orderId?: string;
  grantedBy: 'system' | 'payment' | string; // 'system' or 'admin:<userId>'
  grantReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export type PaymentGatewayType = 'sslcommerz' | 'aamarpay' | 'paymently' | 'sandbox';

export interface Order {
  id: string; // e.g. ORD-20261023-XXXX
  userId: string;
  packageId: string;
  packageName: string;
  tier: PackageTier;
  amountBDT: number;
  currency: 'BDT';
  status: OrderStatus;
  paymentGateway: PaymentGatewayType;
  gatewayTransactionId?: string;
  createdAt: string;
  paidAt?: string;
  metadata?: Record<string, any>;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  gateway: PaymentGatewayType;
  gatewayTransactionId: string;
  amountBDT: number;
  currency: 'BDT';
  status: 'initiated' | 'verified' | 'failed' | 'cancelled';
  gatewayResponseRaw?: Record<string, any>;
  verifiedAt?: string;
  ipAddress?: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  authProvider: 'google' | 'credentials' | 'anonymous';
  googleId?: string;
  passwordHash?: string;
  passwordSalt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionTokenPayload {
  sessionId: string;
  userId: string;
  email: string;
  role: UserRole;
  fullName: string;
  avatarUrl?: string;
  issuedAt: number;
  expiresAt: number;
}

export interface AdminAuditRecord {
  id: string;
  adminUserId: string;
  adminEmail: string;
  action: 'grant_subscription' | 'revoke_subscription' | 'extend_subscription' | 'create_package' | 'update_package' | 'toggle_question_access' | 'verify_payment';
  targetType: 'user' | 'subscription' | 'package' | 'question' | 'order';
  targetId: string;
  reason: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface FreeUsageStats {
  userId: string;
  date: string; // YYYY-MM-DD
  questionsAttempted: number;
  dailyLimit: number;
  remainingToday: number;
}
