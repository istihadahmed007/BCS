import {
  DailyPracticeMode,
  DailyPracticeQuestion,
  DailyPracticeSet,
  ExamTrackId,
  ProfessionalStreamId,
  Question,
  TopicMastery,
} from '@/types';
import { SourceIngestionService } from './source-ingestion';
import { MistakeNotebookService } from './mistake-notebook';

// Runtime store for active and completed daily practice sessions
const DAILY_PRACTICE_SETS = new Map<string, DailyPracticeSet>();

export class DailyPracticeService {
  /**
   * Generates a personalized daily practice queue using the configurable initial mix:
   * - 40% Spaced revision due
   * - 30% Weakness-diagnosed topics
   * - 20% Verified previous-year questions
   * - 10% New / unassessed topics
   */
  static generatePracticeSet(params: {
    userId: string;
    examTrackId: ExamTrackId;
    professionalStream: ProfessionalStreamId;
    practiceMode: DailyPracticeMode;
    questionCount?: number;
    subjectCode?: string;
    topicId?: string;
    mistakeQuestionIds?: string[];
    topicMasteries?: TopicMastery[];
  }): DailyPracticeSet {
    const {
      userId,
      examTrackId,
      professionalStream,
      practiceMode,
      questionCount = 10,
      subjectCode,
      topicId,
      mistakeQuestionIds = [],
      topicMasteries = [],
    } = params;

    // Get verified approved questions
    const allApproved = SourceIngestionService.getApprovedQuestions();

    // 1. Strict Track & Stream Isolation
    const eligibleQuestions = allApproved.filter((q) => {
      if (q.reviewStatus !== 'approved') return false;

      // Special BCS Health vs General BCS
      if (examTrackId === 'general_bcs') {
        if (q.examTrackId !== 'general_bcs' && q.professionalStream !== 'all') return false;
      } else if (examTrackId === 'special_bcs_health_51_2026') {
        const sharedSubjects = ['BANGLA', 'ENGLISH', 'BD_AFFAIRS', 'INT_AFFAIRS', 'MATH', 'MENTAL_ABILITY'];
        const isSharedGeneral = sharedSubjects.includes(q.subjectCode);
        if (!isSharedGeneral && q.examTrackId !== 'special_bcs_health_51_2026') return false;

        // Stream isolation for professional subjects
        if (professionalStream === 'assistant_surgeon') {
          if (q.professionalStream !== 'all' && q.professionalStream !== 'assistant_surgeon') return false;
        } else if (professionalStream === 'assistant_dental_surgeon') {
          if (q.professionalStream !== 'all' && q.professionalStream !== 'assistant_dental_surgeon') return false;
        }
      }

      // Mode-specific filters
      if (practiceMode === 'subject_wise' && subjectCode && q.subjectCode !== subjectCode) {
        return false;
      }

      if (practiceMode === 'topic_wise' && topicId && q.topicId !== topicId) {
        return false;
      }

      if (practiceMode === 'special_health_common') {
        // Shared subjects only
        if (q.professionalStream !== 'all') return false;
      }

      if (practiceMode === 'assistant_surgeon_prof') {
        if (q.professionalStream !== 'assistant_surgeon') return false;
      }

      if (practiceMode === 'assistant_dental_surgeon_prof') {
        if (q.professionalStream !== 'assistant_dental_surgeon') return false;
      }

      if (practiceMode === 'mistake_notebook') {
        if (!mistakeQuestionIds.includes(q.id)) return false;
      }

      if (practiceMode === 'past_papers') {
        if (q.contentOrigin !== 'official_bpsc') return false;
      }

      return true;
    });

    if (eligibleQuestions.length === 0) {
      throw new Error(
        `No approved questions available for mode "${practiceMode}" in track "${examTrackId}". Please check the question review queue.`
      );
    }

    // Determine target count
    const targetCount = Math.min(questionCount, eligibleQuestions.length);

    // If Mixed Mode, apply the 40/30/20/10 proportional algorithm
    let selectedQuestions: Question[] = [];

    if (practiceMode === 'mixed') {
      const weakTopicIds = new Set(
        topicMasteries
          .filter((m) => m.weaknessLabel === 'knowledge_gap' || m.weaknessLabel === 'retention_problem')
          .map((m) => m.topicId)
      );

      // Bucket A: Mistake / Due revision (up to 40%)
      const revisionBucket = eligibleQuestions.filter((q) => mistakeQuestionIds.includes(q.id));
      const countA = Math.round(targetCount * 0.4);

      // Bucket B: Weak topics (up to 30%)
      const weakBucket = eligibleQuestions.filter((q) => weakTopicIds.has(q.topicId));
      const countB = Math.round(targetCount * 0.3);

      // Bucket C: Verified Past Questions (up to 20%)
      const pastBucket = eligibleQuestions.filter((q) => q.contentOrigin === 'official_bpsc');
      const countC = Math.round(targetCount * 0.2);

      // Bucket D: Remainder / New topics (10%)
      const remainderBucket = eligibleQuestions;

      const chosenSet = new Set<string>();

      const addFrom = (list: Question[], max: number) => {
        for (const item of list) {
          if (chosenSet.size >= targetCount) break;
          if (selectedQuestions.length >= max) break;
          if (!chosenSet.has(item.id)) {
            chosenSet.add(item.id);
            selectedQuestions.push(item);
          }
        }
      };

      addFrom(revisionBucket, countA);
      addFrom(weakBucket, countA + countB);
      addFrom(pastBucket, countA + countB + countC);
      addFrom(remainderBucket, targetCount);
    } else {
      // In specific mode, take items up to targetCount
      selectedQuestions = eligibleQuestions.slice(0, targetCount);
    }

    // Assemble daily practice questions
    const practiceQuestions: DailyPracticeQuestion[] = selectedQuestions.map((q, idx) => ({
      id: `dpq-${Date.now()}-${idx}`,
      practiceSetId: '', // populated below
      question: q,
      sequenceOrder: idx + 1,
      userSelectedOption: null,
      isCorrect: undefined,
      timeSpentSeconds: 0,
      isBookmarked: false,
      flaggedForReview: false,
      addedToMistakeNotebook: mistakeQuestionIds.includes(q.id),
    }));

    const setId = `practice-set-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    practiceQuestions.forEach((pq) => (pq.practiceSetId = setId));

    const practiceSet: DailyPracticeSet = {
      id: setId,
      userId,
      examTrackId,
      professionalStream,
      practiceMode,
      questionCount: practiceQuestions.length,
      completedCount: 0,
      correctCount: 0,
      wrongCount: 0,
      accuracyPct: 0,
      timeSpentSeconds: 0,
      status: 'in_progress',
      questions: practiceQuestions,
      createdAt: new Date().toISOString(),
    };

    DAILY_PRACTICE_SETS.set(setId, practiceSet);
    return practiceSet;
  }

  static getPracticeSet(setId: string): DailyPracticeSet | undefined {
    return DAILY_PRACTICE_SETS.get(setId);
  }

  /**
   * Submits an answer for an individual question during daily practice.
   * Immediately evaluates correctness and reveals verified explanation.
   */
  static submitQuestionAnswer(params: {
    practiceSetId: string;
    questionId: string;
    selectedOptionId: 'A' | 'B' | 'C' | 'D';
    timeSpentSeconds?: number;
  }): {
    isCorrect: boolean;
    correctAnswerId: 'A' | 'B' | 'C' | 'D';
    explanationBn: string;
    explanationEn: string;
    practiceSet: DailyPracticeSet;
  } {
    const set = DAILY_PRACTICE_SETS.get(params.practiceSetId);
    if (!set) throw new Error('Practice set not found');

    const pq = set.questions.find((q) => q.question.id === params.questionId);
    if (!pq) throw new Error('Question not found in practice set');

    const isCorrect = params.selectedOptionId === pq.question.correctAnswerId;
    pq.userSelectedOption = params.selectedOptionId;
    pq.isCorrect = isCorrect;
    if (params.timeSpentSeconds) pq.timeSpentSeconds = params.timeSpentSeconds;

    // If incorrect, automatically flag and persist to student's mistake notebook
    if (!isCorrect) {
      pq.addedToMistakeNotebook = true;
      try {
        MistakeNotebookService.recordMistake({
          userId: set.userId,
          questionId: pq.question.id,
          userSelectedOption: params.selectedOptionId,
          testSessionId: set.id,
        });
      } catch (err) {
        console.error('Error auto-saving mistake to notebook:', err);
      }
    }

    // Recompute set statistics
    const completed = set.questions.filter((q) => q.userSelectedOption !== null && q.userSelectedOption !== undefined);
    const correct = set.questions.filter((q) => q.isCorrect === true).length;
    const wrong = set.questions.filter((q) => q.isCorrect === false).length;

    set.completedCount = completed.length;
    set.correctCount = correct;
    set.wrongCount = wrong;
    set.accuracyPct = completed.length > 0 ? Number(((correct / completed.length) * 100).toFixed(1)) : 0;

    if (completed.length === set.questionCount) {
      set.status = 'completed';
    }

    DAILY_PRACTICE_SETS.set(params.practiceSetId, set);

    return {
      isCorrect,
      correctAnswerId: pq.question.correctAnswerId,
      explanationBn: pq.question.explanationBn,
      explanationEn: pq.question.explanationEn,
      practiceSet: set,
    };
  }

  /**
   * Toggles bookmark state for a question.
   */
  static toggleBookmark(practiceSetId: string, questionId: string): boolean {
    const set = DAILY_PRACTICE_SETS.get(practiceSetId);
    if (!set) return false;

    const pq = set.questions.find((q) => q.question.id === questionId);
    if (!pq) return false;

    pq.isBookmarked = !pq.isBookmarked;
    return pq.isBookmarked;
  }
}
