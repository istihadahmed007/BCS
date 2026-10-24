import {
  ExamTrackId,
  PackageTier,
  ProfessionalStreamId,
  Question,
  QuestionAccessTier,
  TestType,
  UserSubscription,
} from '@/types';
import { SubscriptionService } from './subscription';

export interface EntitlementAccessCheck {
  allowed: boolean;
  reason?: string;
  requiredTier?: PackageTier;
  currentTier: PackageTier;
  isFreePreview: boolean;
  remainingDailyFreeQuestions?: number;
}

// In-memory map for admin overrides on specific question IDs (free vs premium)
const globalEntitlement = globalThis as unknown as {
  __bcs_question_access_overrides__?: Map<string, QuestionAccessTier>;
};

if (!globalEntitlement.__bcs_question_access_overrides__) {
  globalEntitlement.__bcs_question_access_overrides__ = new Map();
}

export class EntitlementService {
  /**
   * Evaluates if a given question is inherently designated for Free Preview or Premium
   */
  static getQuestionAccessTier(question: Partial<Question>): QuestionAccessTier {
    // 1. Check if explicitly overridden by admin
    if (question.id && globalEntitlement.__bcs_question_access_overrides__?.has(question.id)) {
      return globalEntitlement.__bcs_question_access_overrides__.get(question.id)!;
    }

    // 2. Check if question object itself specifies accessTier
    if (question.accessTier) {
      return question.accessTier;
    }

    // 3. Sensible default: 20% of questions in each topic/set or IDs ending in 0 or 5 are designated Free Preview
    // (This ensures thousands of verified free practice questions are available for free preview)
    if (question.id) {
      const charCodeSum = question.id
        .split('')
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
      if (charCodeSum % 5 === 0) {
        return 'free_preview';
      }
    }

    return 'premium';
  }

  /**
   * Sets question access tier (Admin action)
   */
  static setQuestionAccessTier(questionId: string, tier: QuestionAccessTier): void {
    globalEntitlement.__bcs_question_access_overrides__!.set(questionId, tier);
  }

  /**
   * Bulk updates question access tiers (Admin action)
   */
  static bulkSetQuestionAccessTier(questionIds: string[], tier: QuestionAccessTier): number {
    let count = 0;
    for (const qId of questionIds) {
      globalEntitlement.__bcs_question_access_overrides__!.set(qId, tier);
      count++;
    }
    return count;
  }

  /**
   * Checks whether a user can access a specific question
   */
  static canAccessQuestion(userId: string, question: Partial<Question>): EntitlementAccessCheck {
    const sub = SubscriptionService.getUserActiveSubscription(userId);
    const tier = this.getQuestionAccessTier(question);

    // Free Preview questions are accessible to everyone
    if (tier === 'free_preview') {
      return {
        allowed: true,
        currentTier: sub.tier,
        isFreePreview: true,
      };
    }

    // If user has a paid active subscription
    if (sub.status === 'active' && sub.tier !== 'free') {
      // Check medical stream isolation:
      // If the question is for special BCS health assistant surgeon or dental surgeon:
      const isMedicalQuestion =
        question.examTrackId === 'special_bcs_health_51_2026' ||
        question.professionalStream === 'assistant_surgeon' ||
        question.professionalStream === 'assistant_dental_surgeon' ||
        (question.subjectCode && ['MED_SCI_1', 'MED_SCI_2', 'DENT_SCI_1', 'DENT_SCI_2'].includes(question.subjectCode));

      if (isMedicalQuestion) {
        if (sub.tier === 'medical' || sub.tier === 'complete') {
          return { allowed: true, currentTier: sub.tier, isFreePreview: false };
        } else {
          return {
            allowed: false,
            reason: 'এই প্রশ্নটি ৫১তম বিশেষ বিসিএস (স্বাস্থ্য) মেডিক্যাল প্যাকেজের অন্তর্ভুক্ত।',
            requiredTier: 'medical',
            currentTier: sub.tier,
            isFreePreview: false,
          };
        }
      }

      // Standard and Complete plans have full access to general questions
      return { allowed: true, currentTier: sub.tier, isFreePreview: false };
    }

    // User is on Free Preview plan attempting to access a premium question:
    // Check if within daily free quota
    const usage = SubscriptionService.getFreeUsageStats(userId);
    if (usage.remainingToday > 0) {
      return {
        allowed: true,
        currentTier: 'free',
        isFreePreview: true,
        remainingDailyFreeQuestions: usage.remainingToday,
      };
    }

    return {
      allowed: false,
      reason: 'এই কনটেন্টটি প্রিমিয়াম প্যাকেজের অন্তর্ভুক্ত। আজকের ফ্রি কোটা শেষ হয়েছে। সম্পূর্ণ অ্যাক্সেসের জন্য প্যাকেজটি আনলক করুন।',
      requiredTier: 'standard',
      currentTier: 'free',
      isFreePreview: false,
      remainingDailyFreeQuestions: 0,
    };
  }

  /**
   * Checks if user can access Daily Practice configuration
   */
  static canAccessDailyPractice(
    userId: string,
    params: {
      examTrackId: ExamTrackId;
      professionalStream: ProfessionalStreamId;
      practiceMode: string;
      questionCount: number;
    }
  ): EntitlementAccessCheck {
    const sub = SubscriptionService.getUserActiveSubscription(userId);

    // If user has active paid subscription
    if (sub.status === 'active' && sub.tier !== 'free') {
      if (params.examTrackId === 'special_bcs_health_51_2026' || params.professionalStream !== 'general') {
        if (sub.tier === 'medical' || sub.tier === 'complete') {
          return { allowed: true, currentTier: sub.tier, isFreePreview: false };
        } else {
          return {
            allowed: false,
            reason: 'বিশেষ বিসিএস (স্বাস্থ্য) প্রফেশনাল পার্ট অনুশীলনের জন্য মেডিক্যাল প্যাকেজ প্রয়োজন।',
            requiredTier: 'medical',
            currentTier: sub.tier,
            isFreePreview: false,
          };
        }
      }
      return { allowed: true, currentTier: sub.tier, isFreePreview: false };
    }

    // Free Preview users:
    // 1. Can access up to 20 questions
    const usage = SubscriptionService.getFreeUsageStats(userId);
    if (usage.remainingToday <= 0) {
      return {
        allowed: false,
        reason: 'আজকের ফ্রি অনুশীলনের কোটা শেষ হয়েছে (সর্বোচ্চ ২০টি প্রশ্ন)। সীমাহীন অনুশীলনের জন্য প্যাকেজ আনলক করুন।',
        requiredTier: 'standard',
        currentTier: 'free',
        isFreePreview: true,
        remainingDailyFreeQuestions: 0,
      };
    }

    return {
      allowed: true,
      currentTier: 'free',
      isFreePreview: true,
      remainingDailyFreeQuestions: usage.remainingToday,
    };
  }

  /**
   * Checks if user can take a mock test
   */
  static canAccessMockTest(
    userId: string,
    testType: TestType,
    examTrackId: ExamTrackId
  ): EntitlementAccessCheck {
    // Diagnostic tests are free for everyone
    if (testType === 'diagnostic') {
      return { allowed: true, currentTier: 'free', isFreePreview: true };
    }

    const sub = SubscriptionService.getUserActiveSubscription(userId);

    if (sub.status === 'active' && sub.tier !== 'free') {
      if (examTrackId === 'special_bcs_health_51_2026' && sub.tier !== 'medical' && sub.tier !== 'complete') {
        return {
          allowed: false,
          reason: '৫১তম বিশেষ বিসিএস স্বাস্থ্য ক্যাডারের পূর্ণাঙ্গ মডেল টেস্টে অংশ নিতে মেডিক্যাল প্যাকেজ প্রয়োজন।',
          requiredTier: 'medical',
          currentTier: sub.tier,
          isFreePreview: false,
        };
      }
      return { allowed: true, currentTier: sub.tier, isFreePreview: false };
    }

    return {
      allowed: false,
      reason: 'এই কনটেন্টটি প্রিমিয়াম প্যাকেজের অন্তর্ভুক্ত। পূর্ণাঙ্গ ও বিষয়ভিত্তিক মডেল টেস্ট দিতে প্রিমিয়াম প্যাকেজ বেছে নিন।',
      requiredTier: 'standard',
      currentTier: 'free',
      isFreePreview: false,
    };
  }

  /**
   * Sanitizes question object for free users if locked
   */
  static filterOrRedactQuestion<T extends Partial<Question>>(userId: string, question: T): T & { isLocked?: boolean } {
    const access = this.canAccessQuestion(userId, question);

    if (access.allowed) {
      return {
        ...question,
        accessTier: this.getQuestionAccessTier(question),
        isLocked: false,
      };
    }

    // Redact sensitive answer details for locked content
    return {
      ...question,
      accessTier: 'premium',
      isLocked: true,
      // Keep stem for preview, but mask options and explanations
      stemEn: question.stemEn ? question.stemEn.slice(0, 80) + '... (প্রিমিয়াম প্যাকেজ আনলক করুন)' : '',
      stemBn: question.stemBn ? question.stemBn.slice(0, 80) + '... (প্রিমিয়াম প্যাকেজ আনলক করুন)' : '',
      options: [
        { id: 'A', textEn: 'Locked Option', textBn: 'প্রিমিয়াম অপশন' },
        { id: 'B', textEn: 'Locked Option', textBn: 'প্রিমিয়াম অপশন' },
        { id: 'C', textEn: 'Locked Option', textBn: 'প্রিমিয়াম অপশন' },
        { id: 'D', textEn: 'Locked Option', textBn: 'প্রিমিয়াম অপশন' },
      ],
      correctAnswerId: 'A', // Masked dummy
      explanationEn: 'সঠিক উত্তর এবং বিস্তারিত ব্যাখ্যা দেখতে প্রিমিয়াম প্যাকেজটি অ্যাক্টিভ করুন।',
      explanationBn: 'সঠিক উত্তর এবং বিস্তারিত ব্যাখ্যা দেখতে প্রিমিয়াম প্যাকেজটি অ্যাক্টিভ করুন।',
    };
  }
}
