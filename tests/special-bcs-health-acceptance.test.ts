import test from 'node:test';
import assert from 'node:assert';
import { QuestionBankService } from '../src/services/question-bank';
import { AssessmentEngine } from '../src/services/assessment';

test('Acceptance 1: Question Bank Stream & Track Isolation', async (t) => {
  // Query with stream: assistant_surgeon
  const surgeonResult = QuestionBankService.queryQuestions({
    page: 1,
    limit: 100,
    stream: 'assistant_surgeon',
  });
  assert(surgeonResult.total > 0, 'Surgeon query should return questions');
  const allSurgeon = QuestionBankService.queryQuestions({
    page: 1,
    limit: 1000,
    stream: 'assistant_surgeon',
  });
  // Check no dental questions
  const hasDental = allSurgeon.questions.some((q) =>
    q.subject.toLowerCase().includes('dental') || q.id.startsWith('BCS-DEN')
  );
  assert.strictEqual(hasDental, false, 'Surgeon query must NEVER return Dental questions');

  // Query with stream: assistant_dental_surgeon
  const dentalResult = QuestionBankService.queryQuestions({
    page: 1,
    limit: 1000,
    stream: 'assistant_dental_surgeon',
  });
  assert(dentalResult.total > 0, 'Dental query should return questions');
  // Check no medical questions
  const hasMedical = dentalResult.questions.some((q) =>
    q.subject.toLowerCase().includes('medical') || q.id.startsWith('BCS-MED')
  );
  assert.strictEqual(hasMedical, false, 'Dental query must NEVER return Medical questions');

  // Query with track: general_bcs
  const generalResult = QuestionBankService.queryQuestions({
    page: 1,
    limit: 1000,
    track: 'general_bcs',
  });
  const hasPro = generalResult.questions.some((q) =>
    q.subject.toLowerCase().includes('medical') ||
    q.subject.toLowerCase().includes('dental') ||
    q.id.startsWith('BCS-MED') ||
    q.id.startsWith('BCS-DEN')
  );
  assert.strictEqual(hasPro, false, 'General BCS query must NEVER return Medical or Dental questions');
});

test('Acceptance 2: 51st Special BCS Health Full Mock Test (200 MCQs, 120 Mins) for Assistant Surgeon (MBBS)', async (t) => {
  const session = AssessmentEngine.createSession({
    userId: 'test-mbbs-candidate',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    testType: 'full_mock',
    title: '51st Special BCS Health Full Mock Test (200 Marks)',
  });

  assert.strictEqual(session.totalQuestions, 200, 'Full mock must have exactly 200 questions');
  assert.strictEqual(session.durationSeconds, 7200, 'Full mock must have 7,200s (120 minutes) duration');

  // Count by subject code
  const counts: Record<string, number> = {};
  for (const q of session.questions) {
    counts[q.subjectCode] = (counts[q.subjectCode] || 0) + 1;
  }

  // Exactly 100 General
  assert.strictEqual(counts['BANGLA'], 20, 'Bangla must be 20');
  assert.strictEqual(counts['ENGLISH'], 20, 'English must be 20');
  assert.strictEqual(counts['BD_AFFAIRS'], 20, 'BD Affairs must be 20');
  assert.strictEqual(counts['INT_AFFAIRS'], 20, 'Int Affairs must be 20');
  assert.strictEqual(counts['MATH'], 10, 'Math must be 10');
  assert.strictEqual(counts['MENTAL_ABILITY'], 10, 'Mental Ability must be 10');

  const generalTotal =
    counts['BANGLA'] +
    counts['ENGLISH'] +
    counts['BD_AFFAIRS'] +
    counts['INT_AFFAIRS'] +
    counts['MATH'] +
    counts['MENTAL_ABILITY'];
  assert.strictEqual(generalTotal, 100, 'General Part must be exactly 100 questions');

  // Exactly 100 Professional for MBBS
  assert.strictEqual(counts['MED_SCI_1'], 50, 'Medical Science Part I must be exactly 50');
  assert.strictEqual(counts['MED_SCI_2'], 50, 'Medical Science Part II must be exactly 50');
  assert.strictEqual(counts['DENTAL_SCI_1'] || 0, 0, 'Dental Part 1 must be 0 for MBBS');
  assert.strictEqual(counts['DENTAL_SCI_2'] || 0, 0, 'Dental Part 2 must be 0 for MBBS');
});

test('Acceptance 3: 51st Special BCS Health Full Mock Test (200 MCQs, 120 Mins) for Assistant Dental Surgeon (BDS)', async (t) => {
  const session = AssessmentEngine.createSession({
    userId: 'test-bds-candidate',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_dental_surgeon',
    testType: 'full_mock',
    title: '51st Special BCS Health Full Mock Test (Dental)',
  });

  assert.strictEqual(session.totalQuestions, 200, 'Full mock must have exactly 200 questions');
  assert.strictEqual(session.durationSeconds, 7200, 'Full mock must have 7,200s (120 minutes) duration');

  const counts: Record<string, number> = {};
  for (const q of session.questions) {
    counts[q.subjectCode] = (counts[q.subjectCode] || 0) + 1;
  }

  // Exactly 100 General
  const generalTotal =
    (counts['BANGLA'] || 0) +
    (counts['ENGLISH'] || 0) +
    (counts['BD_AFFAIRS'] || 0) +
    (counts['INT_AFFAIRS'] || 0) +
    (counts['MATH'] || 0) +
    (counts['MENTAL_ABILITY'] || 0);
  assert.strictEqual(generalTotal, 100, 'General Part must be exactly 100 questions');

  // Exactly 100 Professional for BDS
  assert.strictEqual(counts['DENTAL_SCI_1'], 50, 'Dental Science Part I must be exactly 50');
  assert.strictEqual(counts['DENTAL_SCI_2'], 50, 'Dental Science Part II must be exactly 50');
  assert.strictEqual(counts['MED_SCI_1'] || 0, 0, 'Medical Part 1 must be 0 for BDS');
  assert.strictEqual(counts['MED_SCI_2'] || 0, 0, 'Medical Part 2 must be 0 for BDS');
});

test('Acceptance 4: General Part (100 Marks) Subject Test Creation', async (t) => {
  const session = AssessmentEngine.createSession({
    userId: 'candidate-gen',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    testType: 'subject_test',
    title: 'General Part (100 Marks) Official Model Test',
    durationMinutes: 60,
  });

  assert.strictEqual(session.totalQuestions, 100, 'General subject test must be 100 items');
  assert.strictEqual(session.durationSeconds, 3600, 'General subject test must be 3,600s (60 mins)');
});

test('Acceptance 5: Professional Part (100 Marks) Subject Test Creation for MBBS & BDS', async (t) => {
  // MBBS
  const medSession = AssessmentEngine.createSession({
    userId: 'candidate-med',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    testType: 'subject_test',
    title: 'Medical Science Professional Part (100 Marks)',
    durationMinutes: 60,
  });
  assert.strictEqual(medSession.totalQuestions, 100, 'Medical subject test must be 100 items');
  const med1Count = medSession.questions.filter((q) => q.subjectCode === 'MED_SCI_1').length;
  const med2Count = medSession.questions.filter((q) => q.subjectCode === 'MED_SCI_2').length;
  assert.strictEqual(med1Count, 50, 'Medical Part I must be 50');
  assert.strictEqual(med2Count, 50, 'Medical Part II must be 50');

  // BDS
  const denSession = AssessmentEngine.createSession({
    userId: 'candidate-den',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_dental_surgeon',
    testType: 'subject_test',
    title: 'Dental Science Professional Part (100 Marks)',
    durationMinutes: 60,
  });
  assert.strictEqual(denSession.totalQuestions, 100, 'Dental subject test must be 100 items');
  const den1Count = denSession.questions.filter((q) => q.subjectCode === 'DENTAL_SCI_1').length;
  const den2Count = denSession.questions.filter((q) => q.subjectCode === 'DENTAL_SCI_2').length;
  assert.strictEqual(den1Count, 50, 'Dental Part I must be 50');
  assert.strictEqual(den2Count, 50, 'Dental Part II must be 50');
});

test('Acceptance 6: Deterministic Scoring (+1.0 / -0.50) & Section Breakdown Calculation', async (t) => {
  const session = AssessmentEngine.createSession({
    userId: 'test-scorer',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    testType: 'full_mock',
    title: '51st Special BCS Health Full Mock Test',
  });

  // Answer first 10 general questions: 8 correct, 2 wrong
  // Answer first 10 professional questions: 6 correct, 4 wrong
  // Leave rest unanswered
  const generalQs = session.questions.filter((q) =>
    ['BANGLA', 'ENGLISH', 'BD_AFFAIRS', 'INT_AFFAIRS', 'MATH', 'MENTAL_ABILITY'].includes(q.subjectCode)
  );
  const proQs = session.questions.filter((q) => ['MED_SCI_1', 'MED_SCI_2'].includes(q.subjectCode));

  // 8 correct, 2 wrong in general
  generalQs.slice(0, 8).forEach((q) => {
    AssessmentEngine.saveResponse(session.id, q.questionId, q.correctAnswerId);
  });
  generalQs.slice(8, 10).forEach((q) => {
    const wrongOpt = (['A', 'B', 'C', 'D'] as const).find((o) => o !== q.correctAnswerId) || 'B';
    AssessmentEngine.saveResponse(session.id, q.questionId, wrongOpt);
  });

  // 6 correct, 4 wrong in professional
  proQs.slice(0, 6).forEach((q) => {
    AssessmentEngine.saveResponse(session.id, q.questionId, q.correctAnswerId);
  });
  proQs.slice(6, 10).forEach((q) => {
    const wrongOpt = (['A', 'B', 'C', 'D'] as const).find((o) => o !== q.correctAnswerId) || 'B';
    AssessmentEngine.saveResponse(session.id, q.questionId, wrongOpt);
  });

  const evaluated = AssessmentEngine.evaluateSubmission(session.id);
  assert.strictEqual(evaluated.status, 'completed');

  // Overall: Correct = 14, Wrong = 6, Unanswered = 180
  // Net score: 14 * 1.0 - 6 * 0.50 = 14 - 3 = 11.00
  assert.strictEqual(evaluated.correctCount, 14, 'Total correct must be 14');
  assert.strictEqual(evaluated.wrongCount, 6, 'Total wrong must be 6');
  assert.strictEqual(evaluated.unansweredCount, 180, 'Total unanswered must be 180');
  assert.strictEqual(evaluated.finalScore, 11, 'Net score must be 11.00');

  // Section Breakdown:
  // General: 8 correct, 2 wrong, 90 unanswered, net = 8 - 1 = 7.00
  // Pro: 6 correct, 4 wrong, 90 unanswered, net = 6 - 2 = 4.00
  assert(evaluated.sectionBreakdown, 'sectionBreakdown must exist');
  assert.strictEqual(evaluated.sectionBreakdown.general.correct, 8);
  assert.strictEqual(evaluated.sectionBreakdown.general.wrong, 2);
  assert.strictEqual(evaluated.sectionBreakdown.general.unanswered, 90);
  assert.strictEqual(evaluated.sectionBreakdown.general.marks, 7);

  assert.strictEqual(evaluated.sectionBreakdown.professional.correct, 6);
  assert.strictEqual(evaluated.sectionBreakdown.professional.wrong, 4);
  assert.strictEqual(evaluated.sectionBreakdown.professional.unanswered, 90);
  assert.strictEqual(evaluated.sectionBreakdown.professional.marks, 4);
});
