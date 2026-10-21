import { TopicMastery, WeaknessLabel } from '@/types';
import { SYLLABUS_TOPICS } from '@/data/syllabus';

export interface ReadinessIndicator {
  overallScore: number; // 0 - 100
  accuracyComponent: number; // 0 - 100
  coverageComponent: number; // 0 - 100
  retentionComponent: number; // 0 - 100
  timeComponent: number; // 0 - 100
  assessedTopicsCount: number;
  totalTopicsCount: number;
  disclaimer: string;
}

export class WeaknessAnalysisEngine {
  /**
   * Evaluates candidate attempt evidence and assigns a transparent weakness label.
   */
  static classifyTopicPerformance(params: {
    totalAttempts: number;
    correctAttempts: number;
    avgTimeSeconds: number;
    hasDelayedFailure?: boolean;
    isSpeedMistake?: boolean;
  }): WeaknessLabel {
    const { totalAttempts, correctAttempts, avgTimeSeconds, hasDelayedFailure, isSpeedMistake } = params;

    if (totalAttempts < 2) {
      return 'unassessed';
    }

    const accuracy = (correctAttempts / totalAttempts) * 100;

    // 1. Careless error: high mastery topic missed during rapid response (<18s)
    if (isSpeedMistake && accuracy >= 70) {
      return 'careless_error';
    }

    // 2. Retention problem: candidate previously got it right, but failed after a delayed gap
    if (hasDelayedFailure && accuracy >= 50) {
      return 'retention_problem';
    }

    // 3. Time pressure: high average time taken (>80s per MCQ) or timed drop
    if (avgTimeSeconds > 80 && accuracy < 60) {
      return 'time_pressure';
    }

    // 4. Knowledge gap: persistent low accuracy (<50%)
    if (accuracy < 50) {
      return 'knowledge_gap';
    }

    // 5. Guessing risk: borderline accuracy (50%-65%) with uneven timing
    if (accuracy >= 50 && accuracy < 65) {
      return 'guessing_risk';
    }

    // 6. Mastered
    if (accuracy >= 80) {
      return 'mastered';
    }

    return 'unassessed';
  }

  /**
   * Generates a descriptive reason and recommendation for each weakness label.
   */
  static getWeaknessInsight(label: WeaknessLabel): {
    titleEn: string;
    titleBn: string;
    evidenceEn: string;
    evidenceBn: string;
    actionEn: string;
    actionBn: string;
    badgeColor: string;
  } {
    switch (label) {
      case 'knowledge_gap':
        return {
          titleEn: 'Knowledge Gap',
          titleBn: 'মৌলিক ধারণার ঘাটতি',
          evidenceEn: 'Repeated incorrect responses across multiple attempts in this topic.',
          evidenceBn: 'এই টপিকে বারবার ভুল উত্তর প্রদান করা হয়েছে।',
          actionEn: 'Review core textbook concepts and solve 10 focused foundational MCQs before retesting.',
          actionBn: 'মূল পাঠ্যবই বা লেকচার শিট থেকে বেসিক কনসেপ্ট পুনরায় পড়ুন এবং ১০টি রিভিশন প্রশ্ন সমাধান করুন।',
          badgeColor: 'bg-red-500/10 text-red-600 border-red-500/20',
        };
      case 'retention_problem':
        return {
          titleEn: 'Retention Problem',
          titleBn: 'তথ্য মনে রাখার দুর্বলতা',
          evidenceEn: 'Topic was previously answered correctly, but delayed revision attempts failed.',
          evidenceBn: 'পূর্বে সঠিক উত্তর দেওয়া হলেও সময়ের ব্যবধানে রিভিশনে ভুলে যাওয়ার প্রবণতা দেখা গেছে।',
          actionEn: 'Schedule 3 spaced repetition flashcard drills at intervals of 1, 3, and 7 days.',
          actionBn: 'স্পেসড রিপিটেশন পদ্ধতিতে ১, ৩ ও ৭ দিন ব্যবধানে ফ্ল্যাশকার্ড ও শর্ট কুইজ সম্পন্ন করুন।',
          badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
        };
      case 'careless_error':
        return {
          titleEn: 'Careless Error / Misreading',
          titleBn: 'অমনোযোগিতা বা দ্রুততার ভুল',
          evidenceEn: 'Questions in familiar topics answered incorrectly in under 20 seconds.',
          evidenceBn: 'পরিচিত টপিকের প্রশ্নে প্রশ্ন ভালোভাবে না পড়ে তাড়াহুড়ো করে ভুল অপশন নির্বাচন করা হয়েছে।',
          actionEn: 'Practice slow-reading drills. Highlight keywords like "NOT", "EXCEPT", and "ALL".',
          actionBn: 'প্রশ্ন পড়ার গতি নিয়ন্ত্রণ করুন। "NOT", "EXCEPT", "কোনটি নয়" শব্দগুলো সতর্কতার সাথে লক্ষ্য করুন।',
          badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
        };
      case 'time_pressure':
        return {
          titleEn: 'Time Pressure / Pacing Issue',
          titleBn: 'সময় ব্যবস্থাপনা ও শ্লথ গতি',
          evidenceEn: 'Average time per question exceeds 80 seconds or accuracy plummets in the final minutes.',
          evidenceBn: 'প্রতি প্রশ্নে গড় সময় ৮০ সেকেন্ডের বেশি অথবা পরীক্ষার শেষ মুহূর্তে ভুলের হার বৃদ্ধি পায়।',
          actionEn: 'Conduct 20-minute rapid-fire timed sets (30 MCQs in 18 minutes) to build pacing stamina.',
          actionBn: '১৮ মিনিটে ৩০টি প্রশ্নের দ্রুত সমাধানের টাইমড ড্রিল অনুশীলন করুন।',
          badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
        };
      case 'guessing_risk':
        return {
          titleEn: 'Guessing Risk',
          titleBn: 'অনুমানভিত্তিক উত্তরের ঝুঁকি',
          evidenceEn: 'Uncertain response pattern risking negative marking penalty (-0.50).',
          evidenceBn: 'সংশয়পূর্ণ অনুমান করায় নেগেটিভ মার্কিং (-০.৫০) হয়ে নম্বর কমে যাওয়ার ঝুঁকি রয়েছে।',
          actionEn: 'Use systematic 2-option elimination methods. Leave completely unknown items blank.',
          actionBn: 'অপশন এলিমিনেশন পদ্ধতি ব্যবহার করুন। নিশ্চিত না হলে অহেতুক অনুমান পরিহার করুন।',
          badgeColor: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
        };
      case 'mastered':
        return {
          titleEn: 'Mastered Topic',
          titleBn: 'আয়ত্তকৃত টপিক',
          evidenceEn: 'Consistent accuracy above 80% with steady pacing.',
          evidenceBn: '৮০% এর বেশি নির্ভুলতা এবং সন্তোষজনক গতিতে উত্তর দেওয়া হয়েছে।',
          actionEn: 'Maintain retention with light weekly refreshers and full mock tests.',
          actionBn: 'সাপ্তাহিক রুটিনে হালকা রিভিশন বজায় রাখুন এবং ফুল মক টেস্টে দক্ষতা ধরে রাখুন।',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
        };
      default:
        return {
          titleEn: 'Unassessed',
          titleBn: 'মূল্যায়ন বাকি',
          evidenceEn: 'Insufficient response data recorded for this topic.',
          evidenceBn: 'এই টপিকে এখনও পর্যাপ্ত সংখ্যক প্রশ্ন সমাধান করা হয়নি।',
          actionEn: 'Take a diagnostic or topic practice test to establish your baseline.',
          actionBn: 'আপনার ভিত্তি নির্ণয়ের জন্য একটি ডায়াগনস্টিক কুইজ সম্পন্ন করুন।',
          badgeColor: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
        };
    }
  }

  /**
   * Computes the transparent BCS Preparation Readiness Indicator.
   * Internal learning heuristic combining:
   * - 40% Recent Accuracy
   * - 30% Syllabus Topic Coverage
   * - 20% Retention Consistency
   * - 10% Time Management Efficiency
   */
  static calculateReadiness(masteryList: TopicMastery[]): ReadinessIndicator {
    const totalTopicsCount = SYLLABUS_TOPICS.length;
    const assessedTopics = masteryList.filter((m) => m.totalAttempts > 0);
    const assessedCount = assessedTopics.length;

    if (assessedCount === 0) {
      return {
        overallScore: 0,
        accuracyComponent: 0,
        coverageComponent: 0,
        retentionComponent: 0,
        timeComponent: 0,
        assessedTopicsCount: 0,
        totalTopicsCount,
        disclaimer: 'This indicator is an internal study heuristic based on syllabus coverage and practice accuracy. It is not an official BPSC score and does not represent probability of cadre selection.',
      };
    }

    // 1. Accuracy Component (average accuracy of assessed topics)
    const avgAccuracy = assessedTopics.reduce((sum, m) => sum + m.accuracyPct, 0) / assessedCount;

    // 2. Coverage Component (assessed topics / total syllabus topics)
    const coveragePct = Math.min(100, (assessedCount / totalTopicsCount) * 100);

    // 3. Retention Component (% of topics not flagged as retention problems or knowledge gaps)
    const healthyTopics = assessedTopics.filter((m) => m.weaknessLabel === 'mastered' || m.accuracyPct >= 65).length;
    const retentionPct = (healthyTopics / assessedCount) * 100;

    // 4. Time Component (% of topics solved in <= 60 seconds average)
    const pacedTopics = assessedTopics.filter((m) => m.avgTimeSeconds <= 60).length;
    const timePct = (pacedTopics / assessedCount) * 100;

    // Weighted Overall Score
    const overallScore = Math.round(
      avgAccuracy * 0.40 +
      coveragePct * 0.30 +
      retentionPct * 0.20 +
      timePct * 0.10
    );

    return {
      overallScore: Math.min(100, Math.max(0, overallScore)),
      accuracyComponent: Math.round(avgAccuracy),
      coverageComponent: Math.round(coveragePct),
      retentionComponent: Math.round(retentionPct),
      timeComponent: Math.round(timePct),
      assessedTopicsCount: assessedCount,
      totalTopicsCount,
      disclaimer: 'This indicator is an internal study heuristic based on syllabus coverage and practice accuracy. It is not an official BPSC score and does not represent probability of cadre selection.',
    };
  }
}
