import {
  CandidateResponse,
  ExamTrackId,
  ProfessionalStreamId,
  TestSession,
  TestSessionQuestion,
  TestStatus,
  TestType,
} from '@/types';
import { ExamConfigService } from './exam-config';
import { SourceIngestionService } from './source-ingestion';
import { MistakeNotebookService } from './mistake-notebook';

// In-memory session store (acts as local session cache before or alongside database writes)
const SESSIONS_STORE = new Map<string, TestSession>();

export class AssessmentEngine {
  /**
   * Initializes a new test session with frozen question snapshots and strict duration.
   */
  static createSession(params: {
    userId: string;
    examTrackId: ExamTrackId;
    professionalStream: ProfessionalStreamId;
    testType: TestType;
    durationMinutes?: number;
    title?: string;
  }): TestSession {
    const config = ExamConfigService.getPublishedConfig(params.examTrackId);
    const stream = params.professionalStream;

    // Filter verified questions strictly for track and stream from all approved sources
    const allApproved = SourceIngestionService.getApprovedQuestions();
    const candidateQuestions = allApproved.filter((q) => {
      if (q.reviewStatus !== 'approved') return false;
      if (params.examTrackId === 'general_bcs') {
        return q.examTrackId === 'general_bcs' || q.professionalStream === 'all';
      }
      if (params.examTrackId === 'special_bcs_health_51_2026') {
        if (q.examTrackId === 'special_bcs_health_51_2026') {
          return q.professionalStream === 'all' || q.professionalStream === stream;
        }
        // Include shared general subjects from question bank
        const sharedSubjects = ['BANGLA', 'ENGLISH', 'BD_AFFAIRS', 'INT_AFFAIRS', 'MATH', 'MENTAL_ABILITY'];
        return sharedSubjects.includes(q.subjectCode);
      }
      return false;
    });

    if (candidateQuestions.length === 0) {
      throw new Error(`No approved questions found for track ${params.examTrackId} and stream ${stream}`);
    }

    // Determine test length and duration
    let questionLimit = candidateQuestions.length;
    let durationSec = config.durationSeconds;

    if (params.testType === 'diagnostic') {
      questionLimit = Math.min(candidateQuestions.length, 10);
      durationSec = 600; // 10 minutes
    } else if (params.testType === 'topic_quiz') {
      questionLimit = Math.min(candidateQuestions.length, 5);
      durationSec = 300; // 5 minutes
    } else if (params.testType === 'full_mock') {
      questionLimit = Math.min(candidateQuestions.length, config.totalQuestions);
    } else if (params.durationMinutes) {
      durationSec = params.durationMinutes * 60;
    }

    // Randomize order for an authentic test experience
    const shuffled = [...candidateQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, questionLimit);

    // Freeze questions into immutable session snapshot
    const sessionQuestions: TestSessionQuestion[] = selectedQuestions.map((q, idx) => ({
      questionId: q.id,
      sequenceOrder: idx + 1,
      stemEn: q.stemEn,
      stemBn: q.stemBn,
      options: q.options,
      correctAnswerId: q.correctAnswerId,
      marks: config.correctMark,
      negativePenalty: config.wrongPenalty,
      subjectCode: q.subjectCode,
      topicId: q.topicId,
      explanationEn: q.explanationEn,
      explanationBn: q.explanationBn,
    }));

    const now = new Date();
    // Add 15-second grace period for network latency tolerance
    const expiresAt = new Date(now.getTime() + durationSec * 1000 + 15000);

    const sessionId = `test-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const session: TestSession = {
      id: sessionId,
      userId: params.userId,
      examTrackId: params.examTrackId,
      professionalStream: stream,
      testType: params.testType,
      title:
        params.title ||
        (params.testType === 'diagnostic'
          ? 'Diagnostic Readiness Assessment'
          : params.testType === 'full_mock'
          ? '51st Special BCS Health Full Mock Test'
          : 'Custom Topic Assessment'),
      status: 'in_progress',
      startTime: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      durationSeconds: durationSec,
      totalQuestions: sessionQuestions.length,
      correctCount: 0,
      wrongCount: 0,
      unansweredCount: sessionQuestions.length,
      finalScore: 0,
      percentage: 0,
      questions: sessionQuestions,
      responses: {},
    };

    SESSIONS_STORE.set(sessionId, session);
    return session;
  }

  /**
   * Retrieves an ongoing or completed test session by ID.
   */
  static getSession(sessionId: string): TestSession | undefined {
    return SESSIONS_STORE.get(sessionId);
  }

  /**
   * Records candidate answer or marked-for-review status during a session.
   */
  static saveResponse(
    sessionId: string,
    questionId: string,
    selectedOptionId?: 'A' | 'B' | 'C' | 'D' | null,
    isMarkedForReview = false,
    timeSpentSeconds = 0
  ): TestSession {
    const session = SESSIONS_STORE.get(sessionId);
    if (!session) throw new Error('Test session not found');

    if (session.status !== 'in_progress') {
      throw new Error(`Cannot record responses for session with status: ${session.status}`);
    }

    session.responses[questionId] = {
      questionId,
      selectedOptionId: selectedOptionId || null,
      isMarkedForReview,
      timeSpentSeconds,
    };

    return session;
  }

  /**
   * Submits a test session and performs deterministic server-side scoring.
   * Special Health Circular Rule:
   * - Correct: +1.00 mark
   * - Incorrect: -0.50 mark penalty
   * - Unanswered: 0.00 mark
   * Supports idempotent submission via idempotencyKey.
   */
  static evaluateSubmission(
    sessionId: string,
    submittedResponses?: Record<string, { selectedOptionId?: 'A' | 'B' | 'C' | 'D' | null; timeSpentSeconds?: number; isMarkedForReview?: boolean }>,
    idempotencyKey?: string
  ): TestSession {
    const session = SESSIONS_STORE.get(sessionId);
    if (!session) throw new Error('Test session not found');

    // Idempotent return if already completed
    if (session.status === 'completed' && session.idempotencyKey === idempotencyKey) {
      return session;
    }

    const now = new Date();
    const expiryDate = new Date(session.expiresAt);
    const isLate = now.getTime() > expiryDate.getTime() + 15000; // 15s grace expired

    // Merge any last-second batch of responses
    if (submittedResponses) {
      for (const [qid, r] of Object.entries(submittedResponses)) {
        session.responses[qid] = {
          questionId: qid,
          selectedOptionId: r.selectedOptionId || null,
          isMarkedForReview: r.isMarkedForReview ?? false,
          timeSpentSeconds: r.timeSpentSeconds ?? 0,
        };
      }
    }

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    let totalMarks = 0;

    const subjectBreakdown: Record<string, { total: number; correct: number; wrong: number; marks: number }> = {};

    for (const q of session.questions) {
      const resp = session.responses[q.questionId];
      const selected = resp?.selectedOptionId;

      if (!subjectBreakdown[q.subjectCode]) {
        subjectBreakdown[q.subjectCode] = { total: 0, correct: 0, wrong: 0, marks: 0 };
      }
      subjectBreakdown[q.subjectCode].total += 1;

      if (!selected) {
        unansweredCount += 1;
        if (resp) {
          resp.isCorrect = false;
          resp.marksAwarded = 0;
        }
      } else if (selected === q.correctAnswerId) {
        correctCount += 1;
        const awarded = q.marks;
        totalMarks += awarded;
        subjectBreakdown[q.subjectCode].correct += 1;
        subjectBreakdown[q.subjectCode].marks += awarded;
        if (resp) {
          resp.isCorrect = true;
          resp.marksAwarded = awarded;
        }
      } else {
        wrongCount += 1;
        const penalty = q.negativePenalty;
        totalMarks -= penalty;
        subjectBreakdown[q.subjectCode].wrong += 1;
        subjectBreakdown[q.subjectCode].marks -= penalty;
        if (resp) {
          resp.isCorrect = false;
          resp.marksAwarded = -penalty;
        }
        try {
          MistakeNotebookService.recordMistake({
            userId: session.userId,
            questionId: q.questionId,
            userSelectedOption: selected,
            testSessionId: session.id,
          });
        } catch (err) {
          console.error('Failed to auto-save test mistake to notebook', err);
        }
      }
    }

    // Clamp score to 0 floor if negative
    const finalScore = Math.max(0, Number(totalMarks.toFixed(2)));
    const maxPossibleScore = session.questions.reduce((sum, q) => sum + q.marks, 0);
    const percentage = maxPossibleScore > 0 ? Number(((finalScore / maxPossibleScore) * 100).toFixed(2)) : 0;

    session.status = isLate ? 'expired' : 'completed';
    session.submittedAt = now.toISOString();
    session.correctCount = correctCount;
    session.wrongCount = wrongCount;
    session.unansweredCount = unansweredCount;
    session.finalScore = finalScore;
    session.percentage = percentage;
    session.subjectBreakdown = subjectBreakdown;
    session.idempotencyKey = idempotencyKey;

    SESSIONS_STORE.set(sessionId, session);
    return session;
  }
}
