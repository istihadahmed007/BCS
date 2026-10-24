import {
  ExamTrackId,
  ProfessionalStreamId,
  Question,
  TestSession,
  TestSessionQuestion,
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
        const generalSubjects = ['BANGLA', 'ENGLISH', 'BD_AFFAIRS', 'INT_AFFAIRS', 'MATH', 'MENTAL_ABILITY', 'G_SCIENCE', 'G_COMPUTER', 'G_GEOGRAPHY', 'G_ETHICS'];
        return generalSubjects.includes(q.subjectCode);
      }
      if (params.examTrackId === 'special_bcs_health_51_2026') {
        const sharedSubjects = ['BANGLA', 'ENGLISH', 'BD_AFFAIRS', 'INT_AFFAIRS', 'MATH', 'MENTAL_ABILITY'];
        if (sharedSubjects.includes(q.subjectCode)) return true;
        if (stream === 'assistant_surgeon') {
          return q.subjectCode === 'MED_SCI_1' || q.subjectCode === 'MED_SCI_2';
        }
        if (stream === 'assistant_dental_surgeon') {
          return q.subjectCode === 'DENTAL_SCI_1' || q.subjectCode === 'DENTAL_SCI_2';
        }
        return false;
      }
      return false;
    });

    if (candidateQuestions.length === 0) {
      throw new Error(`No approved questions found for track ${params.examTrackId} and stream ${stream}`);
    }

    let selectedQuestions: Question[] = [];
    let durationSec = config.durationSeconds;

    if (params.testType === 'full_mock' && params.examTrackId === 'special_bcs_health_51_2026') {
      durationSec = 7200; // 120 minutes per official BPSC circular

      // Exactly 100 General Questions by official syllabus quotas
      const generalQuotas: Record<string, number> = {
        BANGLA: 20,
        ENGLISH: 20,
        BD_AFFAIRS: 20,
        INT_AFFAIRS: 20,
        MATH: 10,
        MENTAL_ABILITY: 10,
      };

      const selectedGeneral: Question[] = [];
      for (const [code, count] of Object.entries(generalQuotas)) {
        const pool = candidateQuestions.filter((q) => q.subjectCode === code);
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        selectedGeneral.push(...shuffled.slice(0, count));
      }

      // Exactly 100 Professional Questions from candidate's stream
      const selectedProfessional: Question[] = [];
      if (stream === 'assistant_surgeon') {
        const p1Pool = candidateQuestions
          .filter((q) => q.subjectCode === 'MED_SCI_1')
          .sort(() => Math.random() - 0.5);
        const p2Pool = candidateQuestions
          .filter((q) => q.subjectCode === 'MED_SCI_2')
          .sort(() => Math.random() - 0.5);
        selectedProfessional.push(...p1Pool.slice(0, 50));
        selectedProfessional.push(...p2Pool.slice(0, 50));
      } else if (stream === 'assistant_dental_surgeon') {
        const d1Pool = candidateQuestions
          .filter((q) => q.subjectCode === 'DENTAL_SCI_1')
          .sort(() => Math.random() - 0.5);
        const d2Pool = candidateQuestions
          .filter((q) => q.subjectCode === 'DENTAL_SCI_2')
          .sort(() => Math.random() - 0.5);
        selectedProfessional.push(...d1Pool.slice(0, 50));
        selectedProfessional.push(...d2Pool.slice(0, 50));
      }

      selectedQuestions = [...selectedGeneral, ...selectedProfessional];
    } else if (params.testType === 'full_mock' && params.examTrackId === 'general_bcs') {
      durationSec = 7200; // 120 minutes (200 marks)

      // Official BPSC 200-mark Preliminary Subject Breakdown
      const generalBCSQuotas: Record<string, number> = {
        BANGLA: 35,
        ENGLISH: 35,
        BD_AFFAIRS: 30,
        INT_AFFAIRS: 20,
        G_GEOGRAPHY: 10,
        G_SCIENCE: 15,
        G_COMPUTER: 15,
        MATH: 15,
        MENTAL_ABILITY: 15,
        G_ETHICS: 10,
      };

      for (const [code, count] of Object.entries(generalBCSQuotas)) {
        const pool = candidateQuestions.filter((q) => q.subjectCode === code);
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        selectedQuestions.push(...shuffled.slice(0, count));
      }

      // Fallback if some pools are smaller than quota
      if (selectedQuestions.length < 200) {
        const remaining = candidateQuestions.filter((q) => !selectedQuestions.some((s) => s.id === q.id));
        const shuffledRem = [...remaining].sort(() => Math.random() - 0.5);
        selectedQuestions.push(...shuffledRem.slice(0, 200 - selectedQuestions.length));
      }
    } else if (params.testType === 'subject_test') {
      durationSec = params.durationMinutes ? params.durationMinutes * 60 : 3600;
      const titleLower = (params.title || '').toLowerCase();
      const isGeneralPart = titleLower.includes('general part') || (titleLower.includes('general') && titleLower.includes('100'));
      const isProPart =
        titleLower.includes('professional') ||
        (titleLower.includes('medical science') && !titleLower.includes('part i') && !titleLower.includes('part ii') && !titleLower.includes('১ম') && !titleLower.includes('২য়')) ||
        (titleLower.includes('dental science') && !titleLower.includes('part i') && !titleLower.includes('part ii') && !titleLower.includes('১ম') && !titleLower.includes('২য়'));

      if (isGeneralPart) {
        const generalQuotas: Record<string, number> = {
          BANGLA: 20,
          ENGLISH: 20,
          BD_AFFAIRS: 20,
          INT_AFFAIRS: 20,
          MATH: 10,
          MENTAL_ABILITY: 10,
        };
        for (const [code, count] of Object.entries(generalQuotas)) {
          const pool = candidateQuestions.filter((q) => q.subjectCode === code);
          const shuffled = [...pool].sort(() => Math.random() - 0.5);
          selectedQuestions.push(...shuffled.slice(0, count));
        }
      } else if (isProPart) {
        if (stream === 'assistant_surgeon') {
          const p1 = candidateQuestions.filter((q) => q.subjectCode === 'MED_SCI_1').sort(() => Math.random() - 0.5);
          const p2 = candidateQuestions.filter((q) => q.subjectCode === 'MED_SCI_2').sort(() => Math.random() - 0.5);
          selectedQuestions.push(...p1.slice(0, 50), ...p2.slice(0, 50));
        } else if (stream === 'assistant_dental_surgeon') {
          const d1 = candidateQuestions.filter((q) => q.subjectCode === 'DENTAL_SCI_1').sort(() => Math.random() - 0.5);
          const d2 = candidateQuestions.filter((q) => q.subjectCode === 'DENTAL_SCI_2').sort(() => Math.random() - 0.5);
          selectedQuestions.push(...d1.slice(0, 50), ...d2.slice(0, 50));
        }
      } else {
        // Subject detection from title or code
        const subjectKeywords: Record<string, string> = {
          'medical science part i': 'MED_SCI_1',
          'মেডিকেল সায়েন্স ১ম': 'MED_SCI_1',
          'medical science part ii': 'MED_SCI_2',
          'মেডিকেল সায়েন্স ২য়': 'MED_SCI_2',
          'dental science part i': 'DENTAL_SCI_1',
          'ডেন্টাল সায়েন্স ১ম': 'DENTAL_SCI_1',
          'dental science part ii': 'DENTAL_SCI_2',
          'ডেন্টাল সায়েন্স ২য়': 'DENTAL_SCI_2',
          bangla: 'BANGLA',
          বাংলা: 'BANGLA',
          english: 'ENGLISH',
          ইংরেজি: 'ENGLISH',
          'bd affairs': 'BD_AFFAIRS',
          'bangladesh affairs': 'BD_AFFAIRS',
          বাংলাদেশ: 'BD_AFFAIRS',
          'international affairs': 'INT_AFFAIRS',
          আন্তর্জাতিক: 'INT_AFFAIRS',
          mathematics: 'MATH',
          math: 'MATH',
          গণিত: 'MATH',
          'mental ability': 'MENTAL_ABILITY',
          মানসিক: 'MENTAL_ABILITY',
          science: 'G_SCIENCE',
          বিজ্ঞান: 'G_SCIENCE',
          computer: 'G_COMPUTER',
          কম্পিউটার: 'G_COMPUTER',
          geography: 'G_GEOGRAPHY',
          ভূগোল: 'G_GEOGRAPHY',
          ethics: 'G_ETHICS',
          নৈতিকতা: 'G_ETHICS',
        };

        let detectedCode: string | null = null;
        for (const [kw, code] of Object.entries(subjectKeywords)) {
          if (titleLower.includes(kw)) {
            detectedCode = code;
            break;
          }
        }

        if (detectedCode) {
          const pool = candidateQuestions.filter((q) => q.subjectCode === detectedCode);
          const shuffled = [...pool].sort(() => Math.random() - 0.5);
          const targetCount = params.durationMinutes ? Math.min(pool.length, params.durationMinutes) : Math.min(pool.length, 35);
          selectedQuestions = shuffled.slice(0, targetCount);
        } else {
          const shuffled = [...candidateQuestions].sort(() => Math.random() - 0.5);
          selectedQuestions = shuffled.slice(0, Math.min(candidateQuestions.length, 35));
        }
      }
    } else if (params.testType === 'diagnostic') {
      durationSec = 600; // 10 minutes
      const shuffled = [...candidateQuestions].sort(() => Math.random() - 0.5);
      selectedQuestions = shuffled.slice(0, Math.min(candidateQuestions.length, 10));
    } else if (params.testType === 'topic_quiz') {
      durationSec = params.durationMinutes ? params.durationMinutes * 60 : 1200; // 20 minutes
      const shuffled = [...candidateQuestions].sort(() => Math.random() - 0.5);
      selectedQuestions = shuffled.slice(0, Math.min(candidateQuestions.length, 20));
    } else if (params.testType === 'mixed_practice') {
      durationSec = params.durationMinutes ? params.durationMinutes * 60 : 1800; // 30 minutes
      const qCount = params.durationMinutes === 25 ? 30 : params.durationMinutes === 45 ? 50 : 100;
      const shuffled = [...candidateQuestions].sort(() => Math.random() - 0.5);
      selectedQuestions = shuffled.slice(0, Math.min(candidateQuestions.length, qCount));
    } else if (params.testType === 'previous_year') {
      durationSec = params.durationMinutes ? params.durationMinutes * 60 : 7200; // 120 minutes
      const shuffled = [...candidateQuestions].sort(() => Math.random() - 0.5);
      selectedQuestions = shuffled.slice(0, Math.min(candidateQuestions.length, 200));
    } else {
      if (params.durationMinutes) durationSec = params.durationMinutes * 60;
      const shuffled = [...candidateQuestions].sort(() => Math.random() - 0.5);
      selectedQuestions = shuffled.slice(0, Math.min(candidateQuestions.length, config.totalQuestions));
    }

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

    // Compute Section-Wise Breakdown (General vs Professional)
    const proCodes = ['MED_SCI_1', 'MED_SCI_2', 'DENTAL_SCI_1', 'DENTAL_SCI_2'];
    const sectionBreakdown = {
      general: { total: 0, correct: 0, wrong: 0, unanswered: 0, marks: 0 },
      professional: { total: 0, correct: 0, wrong: 0, unanswered: 0, marks: 0 },
    };

    for (const [code, data] of Object.entries(subjectBreakdown)) {
      if (proCodes.includes(code)) {
        sectionBreakdown.professional.total += data.total;
        sectionBreakdown.professional.correct += data.correct;
        sectionBreakdown.professional.wrong += data.wrong;
        sectionBreakdown.professional.marks += data.marks;
      } else {
        sectionBreakdown.general.total += data.total;
        sectionBreakdown.general.correct += data.correct;
        sectionBreakdown.general.wrong += data.wrong;
        sectionBreakdown.general.marks += data.marks;
      }
    }
    sectionBreakdown.general.unanswered =
      sectionBreakdown.general.total - (sectionBreakdown.general.correct + sectionBreakdown.general.wrong);
    sectionBreakdown.professional.unanswered =
      sectionBreakdown.professional.total -
      (sectionBreakdown.professional.correct + sectionBreakdown.professional.wrong);
    sectionBreakdown.general.marks = Number(sectionBreakdown.general.marks.toFixed(2));
    sectionBreakdown.professional.marks = Number(sectionBreakdown.professional.marks.toFixed(2));

    session.status = isLate ? 'expired' : 'completed';
    session.submittedAt = now.toISOString();
    session.correctCount = correctCount;
    session.wrongCount = wrongCount;
    session.unansweredCount = unansweredCount;
    session.finalScore = finalScore;
    session.percentage = percentage;
    session.subjectBreakdown = subjectBreakdown;
    session.sectionBreakdown = sectionBreakdown;
    session.idempotencyKey = idempotencyKey;

    SESSIONS_STORE.set(sessionId, session);
    return session;
  }
}
