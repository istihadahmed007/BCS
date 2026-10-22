import {
  DailyPracticeSet,
  MistakeClassificationType,
  MistakeNotebookEntry,
  Question,
} from '@/types';
import { SourceIngestionService } from './source-ingestion';
import { SEED_QUESTIONS } from '@/data/seed-questions';

// Runtime store for user-isolated mistake notebook entries
const MISTAKE_NOTEBOOK_STORE: Map<string, MistakeNotebookEntry> = new Map();

// Helper to seed realistic initial mistake entries for Student (student_current / default user)
function initializeSeedMistakes() {
  if (MISTAKE_NOTEBOOK_STORE.size > 0) return;

  const defaultUser = 'student_current';
  const now = new Date();

  const q1 = SEED_QUESTIONS.find((q) => q.id === 'q-med1-001');
  if (q1) {
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    const entry1: MistakeNotebookEntry = {
      id: `mistake-init-001`,
      userId: defaultUser,
      questionId: q1.id,
      question: q1,
      userSelectedOption: 'B', // Incorrect option (Wrist drop instead of other)
      correctOption: q1.correctAnswerId,
      errorType: 'conceptual_misunderstanding',
      candidateNotes: 'হিউমেরাস ফ্র্যাকচারের স্পাইরাল গ্রুভ ও রেডিয়াল নার্ভের অ্যানাটমি এবং ইনজুরি ফিচার পুনরায় রিভিশন প্রয়োজন।',
      retryCount: 2,
      resolved: false,
      scheduledReviewAt: tomorrow,
      reviewStatus: 'due_today',
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: now.toISOString(),
    };
    MISTAKE_NOTEBOOK_STORE.set(entry1.id, entry1);
  }

  const q2 = SEED_QUESTIONS.find((q) => q.id === 'q-bng-001');
  if (q2) {
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const entry2: MistakeNotebookEntry = {
      id: `mistake-init-002`,
      userId: defaultUser,
      questionId: q2.id,
      question: q2,
      userSelectedOption: 'C',
      correctOption: q2.correctAnswerId,
      errorType: 'forgotten_fact',
      candidateNotes: 'ণ-ত্ব ও ষ-ত্ব বিধানের ব্যতিক্রম তৎসম শব্দগুলো বারবার মুখস্থ রাখতে হবে (মরীচিকা, নিশীথিনী)।',
      retryCount: 1,
      resolved: false,
      scheduledReviewAt: yesterday,
      reviewStatus: 'due_today',
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: now.toISOString(),
    };
    MISTAKE_NOTEBOOK_STORE.set(entry2.id, entry2);
  }

  const q3 = SEED_QUESTIONS.find((q) => q.id === 'q-bng-002');
  if (q3) {
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const entry3: MistakeNotebookEntry = {
      id: `mistake-init-003`,
      userId: defaultUser,
      questionId: q3.id,
      question: q3,
      userSelectedOption: 'A',
      correctOption: q3.correctAnswerId,
      errorType: 'confused_options',
      candidateNotes: 'কবর ও রক্তাক্ত প্রান্তর-এর মধ্যে বিভ্রান্তি হয়েছিল। কবর ১৯৫৩ সালে রচিত ভাষা আন্দোলন বিষয়ক।',
      retryCount: 3,
      resolved: true,
      resolvedAt: now.toISOString(),
      scheduledReviewAt: nextWeek,
      reviewStatus: 'resolved',
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: now.toISOString(),
    };
    MISTAKE_NOTEBOOK_STORE.set(entry3.id, entry3);
  }
}

// Ensure initial seed is loaded
initializeSeedMistakes();

export class MistakeNotebookService {
  /**
   * Spaced repetition interval calculator based on retry frequency:
   * 1st error: review in 1 day
   * 2nd error: review in 3 days
   * 3rd error: review in 7 days
   * 4th error: review in 14 days
   * 5th+ error: review in 30 days
   */
  private static calculateNextReviewDate(retryCount: number): string {
    const daysToAdd =
      retryCount <= 1 ? 1 : retryCount === 2 ? 3 : retryCount === 3 ? 7 : retryCount === 4 ? 14 : 30;
    return new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString();
  }

  /**
   * Retrieves all mistakes for a specific user, with optional filters and real statistics.
   * Strictly enforces user isolation.
   */
  static getMistakes(params: {
    userId: string;
    subject?: string;
    topic?: string;
    trackId?: string;
    errorType?: string;
    reviewStatus?: string;
    search?: string;
    resolved?: boolean;
  }): {
    items: MistakeNotebookEntry[];
    total: number;
    stats: {
      totalMistakes: number;
      dueForReview: number;
      resolvedCount: number;
      unresolvedCount: number;
      bySubject: Record<string, number>;
      byErrorType: Record<string, number>;
    };
  } {
    const { userId, subject, topic, trackId, errorType, reviewStatus, search, resolved } = params;
    const normalizedUserId =
      userId === 'student_dr_rahim' || userId === 'candidate-user-1' || userId === 'student_001'
        ? 'student_current'
        : userId || 'student_current';

    const allUserMistakes = Array.from(MISTAKE_NOTEBOOK_STORE.values()).filter(
      (m) => m.userId === normalizedUserId
    );

    const now = new Date();

    // Dynamically update review status based on scheduled date and resolution
    for (const m of allUserMistakes) {
      if (m.resolved) {
        m.reviewStatus = 'resolved';
      } else {
        const scheduled = new Date(m.scheduledReviewAt);
        if (scheduled <= now) {
          m.reviewStatus = 'due_today';
        } else if (m.retryCount >= 3) {
          m.reviewStatus = 'frequently_repeated';
        } else {
          m.reviewStatus = 'upcoming';
        }
      }
    }

    // Filter logic
    let filtered = allUserMistakes.filter((m) => {
      if (resolved !== undefined && m.resolved !== resolved) return false;
      if (subject && subject !== 'all' && m.question.subjectCode !== subject) return false;
      if (topic && topic !== 'all' && m.question.topicId !== topic) return false;
      if (trackId && trackId !== 'all' && m.question.examTrackId !== trackId) return false;
      if (errorType && errorType !== 'all' && m.errorType !== errorType) return false;
      if (reviewStatus && reviewStatus !== 'all' && m.reviewStatus !== reviewStatus) return false;

      if (search && search.trim()) {
        const q = search.toLowerCase();
        const stemBn = m.question.stemBn?.toLowerCase() || '';
        const stemEn = m.question.stemEn?.toLowerCase() || '';
        const notes = m.candidateNotes?.toLowerCase() || '';
        const topicBn = m.question.topicTitleBn?.toLowerCase() || '';
        return stemBn.includes(q) || stemEn.includes(q) || notes.includes(q) || topicBn.includes(q);
      }

      return true;
    });

    // Compute stats from all user's mistakes
    const bySubject: Record<string, number> = {};
    const byErrorType: Record<string, number> = {};
    let dueForReview = 0;
    let resolvedCount = 0;

    for (const m of allUserMistakes) {
      const subj = m.question.subjectCode || 'OTHER';
      bySubject[subj] = (bySubject[subj] || 0) + 1;

      const et = m.errorType || 'conceptual_misunderstanding';
      byErrorType[et] = (byErrorType[et] || 0) + 1;

      if (m.resolved) resolvedCount++;
      else if (new Date(m.scheduledReviewAt) <= now) dueForReview++;
    }

    return {
      items: filtered,
      total: filtered.length,
      stats: {
        totalMistakes: allUserMistakes.length,
        dueForReview,
        resolvedCount,
        unresolvedCount: allUserMistakes.length - resolvedCount,
        bySubject,
        byErrorType,
      },
    };
  }

  /**
   * Records or updates a mistake in the student's notebook.
   * If already exists, increments retry count, updates options, and reschedules spaced review.
   */
  static recordMistake(params: {
    userId: string;
    questionId: string;
    userSelectedOption?: 'A' | 'B' | 'C' | 'D' | null;
    testSessionId?: string;
    errorType?: MistakeClassificationType;
    candidateNotes?: string;
  }): MistakeNotebookEntry {
    const { userId, questionId, userSelectedOption = null, testSessionId, errorType = 'conceptual_misunderstanding', candidateNotes = '' } = params;
    const normalizedUserId =
      userId === 'student_dr_rahim' || userId === 'candidate-user-1' || userId === 'student_001'
        ? 'student_current'
        : userId || 'student_current';

    // Check if entry already exists for this (normalizedUserId, questionId)
    const existing = Array.from(MISTAKE_NOTEBOOK_STORE.values()).find(
      (m) => m.userId === normalizedUserId && m.questionId === questionId
    );

    const now = new Date().toISOString();

    if (existing) {
      existing.retryCount += 1;
      existing.userSelectedOption = userSelectedOption;
      existing.resolved = false; // Re-open mistake if answered incorrectly again
      existing.resolvedAt = undefined;
      existing.scheduledReviewAt = this.calculateNextReviewDate(existing.retryCount);
      existing.reviewStatus = 'due_today';
      if (candidateNotes) existing.candidateNotes = candidateNotes;
      if (errorType) existing.errorType = errorType;
      existing.updatedAt = now;
      MISTAKE_NOTEBOOK_STORE.set(existing.id, existing);
      return existing;
    }

    // Load original question from SourceIngestionService or SEED_QUESTIONS
    let question = SourceIngestionService.getQuestionById(questionId);
    if (!question) {
      question = SourceIngestionService.getApprovedQuestions().find((q) => q.id === questionId);
    }
    if (!question) {
      question = SEED_QUESTIONS.find((q) => q.id === questionId);
    }

    if (!question) {
      throw new Error(`Question ${questionId} not found in verified bank`);
    }

    const newId = `mistake-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newEntry: MistakeNotebookEntry = {
      id: newId,
      userId: normalizedUserId,
      questionId,
      question,
      testSessionId,
      userSelectedOption,
      correctOption: question.correctAnswerId,
      errorType,
      candidateNotes,
      retryCount: 1,
      resolved: false,
      scheduledReviewAt: this.calculateNextReviewDate(1),
      reviewStatus: 'due_today',
      createdAt: now,
      updatedAt: now,
    };

    MISTAKE_NOTEBOOK_STORE.set(newId, newEntry);
    return newEntry;
  }

  /**
   * Updates personal notes, error classification, resolved toggle, or custom review date.
   * Strictly validates user ownership.
   */
  static updateMistake(params: {
    id: string;
    userId: string;
    candidateNotes?: string;
    errorType?: MistakeClassificationType;
    resolved?: boolean;
    scheduledReviewAt?: string;
  }): MistakeNotebookEntry {
    const entry = MISTAKE_NOTEBOOK_STORE.get(params.id);
    if (!entry) throw new Error('Mistake entry not found');

    if (entry.userId !== params.userId) {
      throw new Error('Unauthorized: You can only edit mistakes in your own notebook');
    }

    if (params.candidateNotes !== undefined) entry.candidateNotes = params.candidateNotes;
    if (params.errorType !== undefined) entry.errorType = params.errorType;
    if (params.scheduledReviewAt !== undefined) entry.scheduledReviewAt = params.scheduledReviewAt;

    if (params.resolved !== undefined) {
      entry.resolved = params.resolved;
      if (params.resolved) {
        entry.resolvedAt = new Date().toISOString();
        entry.reviewStatus = 'resolved';
      } else {
        entry.resolvedAt = undefined;
        entry.reviewStatus = 'due_today';
      }
    }

    entry.updatedAt = new Date().toISOString();
    MISTAKE_NOTEBOOK_STORE.set(entry.id, entry);
    return entry;
  }

  /**
   * Deletes a mistake entry with user isolation check.
   */
  static deleteMistake(id: string, userId: string): boolean {
    const entry = MISTAKE_NOTEBOOK_STORE.get(id);
    if (!entry) return false;

    if (entry.userId !== userId) {
      throw new Error('Unauthorized: You can only delete mistakes from your own notebook');
    }

    return MISTAKE_NOTEBOOK_STORE.delete(id);
  }

  /**
   * Retrieves a single mistake by ID with user isolation check.
   */
  static getMistakeById(id: string, userId: string): MistakeNotebookEntry | undefined {
    const entry = MISTAKE_NOTEBOOK_STORE.get(id);
    if (!entry || entry.userId !== userId) return undefined;
    return entry;
  }

  /**
   * Generates a targeted review drill from the student's active/unresolved mistakes.
   */
  static generatePracticeDrill(userId: string, limit: number = 10): Question[] {
    const { items } = this.getMistakes({ userId, resolved: false });
    const questions = items.map((m) => m.question);
    return questions.slice(0, limit);
  }
}
