import test from 'node:test';
import assert from 'node:assert';
import { QuestionBankService } from '../src/services/question-bank';
import { MockTestService } from '../src/services/mock-tests';
import { AssessmentEngine } from '../src/services/assessment';
import { ExamConfigService } from '../src/services/exam-config';

test('1. Strict Taxonomy & Exam Track Isolation (General BCS vs MBBS vs BDS)', async () => {
  const all = QuestionBankService.getAllQuestions();
  assert(all.length >= 20200, 'Question bank must contain at least 20,200 MCQs');

  // General BCS isolation
  const generalQuestions = QuestionBankService.getPlatformQuestions('general_bcs');
  assert(generalQuestions.length > 0, 'General BCS pool must not be empty');
  const proSubjects = ['MED_SCI_1', 'MED_SCI_2', 'DENTAL_SCI_1', 'DENTAL_SCI_2'];
  for (const q of generalQuestions) {
    assert(
      !proSubjects.includes(q.subjectCode),
      `General BCS must not contain professional subject: ${q.subjectCode}`
    );
  }

  // Assistant Surgeon (MBBS) isolation: must contain medical science, zero dental science
  const mbbsQuestions = QuestionBankService.getPlatformQuestions(
    'special_bcs_health_51_2026',
    'assistant_surgeon'
  );
  assert(mbbsQuestions.length > 0, 'MBBS pool must not be empty');
  const dentalSubjects = ['DENTAL_SCI_1', 'DENTAL_SCI_2'];
  for (const q of mbbsQuestions) {
    assert(
      !dentalSubjects.includes(q.subjectCode),
      `MBBS pool must NOT contain dental subjects: ${q.subjectCode}`
    );
  }
  assert(
    mbbsQuestions.some((q) => q.subjectCode === 'MED_SCI_1' || q.subjectCode === 'MED_SCI_2'),
    'MBBS pool must contain Medical Science questions'
  );

  // Assistant Dental Surgeon (BDS) isolation: must contain dental science, zero medical science
  const bdsQuestions = QuestionBankService.getPlatformQuestions(
    'special_bcs_health_51_2026',
    'assistant_dental_surgeon'
  );
  assert(bdsQuestions.length > 0, 'BDS pool must not be empty');
  const medSubjects = ['MED_SCI_1', 'MED_SCI_2'];
  for (const q of bdsQuestions) {
    assert(
      !medSubjects.includes(q.subjectCode),
      `BDS pool must NOT contain medical subjects: ${q.subjectCode}`
    );
  }
  assert(
    bdsQuestions.some((q) => q.subjectCode === 'DENTAL_SCI_1' || q.subjectCode === 'DENTAL_SCI_2'),
    'BDS pool must contain Dental Science questions'
  );
});

test('2. Taxonomy Tree Generation with Accurate Real Counts', async () => {
  const tree = QuestionBankService.getTaxonomyTree('general_bcs');
  assert(tree.length >= 10, 'General BCS must have at least 10 core subjects');

  const subjects = tree.map((s) => s.subject);
  assert(subjects.includes('Bangla'), 'Must include Bangla');
  assert(subjects.includes('English'), 'Must include English');
  assert(subjects.includes('Bangladesh Affairs'), 'Must include Bangladesh Affairs');
  assert(subjects.includes('International Affairs'), 'Must include International Affairs');
  assert(subjects.includes('Mathematics'), 'Must include Mathematics');
  assert(subjects.includes('Mental Ability'), 'Must include Mental Ability');
  assert(subjects.includes('Science'), 'Must include Science');
  assert(subjects.includes('Computer and Information Technology'), 'Must include Computer');
  assert(subjects.includes('Geography and Environment'), 'Must include Geography');
  assert(subjects.includes('Ethics, Values and Good Governance'), 'Must include Ethics');

  for (const s of tree) {
    assert(s.totalQuestions > 0, `Subject ${s.subject} must have positive question count`);
    assert(s.topics.length > 0, `Subject ${s.subject} must have at least one topic`);
    const topicSum = s.topics.reduce((acc, t) => acc + t.questionCount, 0);
    assert.strictEqual(
      topicSum,
      s.totalQuestions,
      `Subject total questions must match sum of topic counts for ${s.subject}`
    );
  }
});

test('3. Authentic Previous-Year Exam Papers & Canonical Order Preservation', async () => {
  const papers = QuestionBankService.getPreviousYearPapers('general_bcs');
  assert(papers.length >= 5, 'Must have at least 5 previous-year papers for General BCS');

  const p46 = papers.find((p) => p.id === 'pyq-46th-bcs');
  assert(p46, 'Must include 46th BCS paper');
  assert.strictEqual(p46.totalQuestions, 200, '46th BCS must have 200 questions');
  assert.strictEqual(p46.durationMinutes, 120, '46th BCS must be 120 minutes');

  // Canonical order test: calling twice must return exact same sequence of question IDs
  const run1 = QuestionBankService.getPreviousYearPaperQuestions('pyq-46th-bcs');
  const run2 = QuestionBankService.getPreviousYearPaperQuestions('pyq-46th-bcs');
  assert.strictEqual(run1.questions.length, 200, 'Must load 200 questions');
  assert.strictEqual(run2.questions.length, 200, 'Must load 200 questions');

  for (let i = 0; i < 200; i++) {
    assert.strictEqual(
      run1.questions[i].id,
      run2.questions[i].id,
      `Question sequence at index ${i} must be deterministic and preserved`
    );
  }

  // Subject filtering within paper
  const banglaOnly = QuestionBankService.getPreviousYearPaperQuestions('pyq-46th-bcs', 'Bangla');
  assert.strictEqual(banglaOnly.questions.length, 35, 'Bangla section must have 35 questions');
  assert(
    banglaOnly.questions.every((q) => q.subject.toLowerCase() === 'bangla'),
    'All returned questions must be Bangla'
  );
});

test('4. Dedicated Mock Test Catalog Across All 6 Categories (A through F)', async () => {
  const allMocks = MockTestService.getMockTests();
  assert(allMocks.length >= 15, 'Must have at least 15 mock test definitions');

  const categories = new Set(allMocks.map((m) => m.category));
  assert(categories.has('full_length'), 'Must have Full-Length Official Mocks');
  assert(categories.has('subject_wise'), 'Must have Subject-Wise Mocks');
  assert(categories.has('topic_wise'), 'Must have Topic-Wise Mocks');
  assert(categories.has('mixed_practice'), 'Must have Mixed Practice Mocks');
  assert(categories.has('previous_year'), 'Must have Previous-Year Full-Paper Mocks');
  assert(categories.has('special_bcs_health'), 'Must have Special BCS Health Mocks');

  // Verify marking scheme & timer invariants
  for (const m of allMocks) {
    assert.strictEqual(m.correctMark, 1.0, `Correct mark must be +1.0 for ${m.id}`);
    assert.strictEqual(m.wrongPenalty, 0.5, `Wrong penalty must be -0.50 for ${m.id}`);
    assert.strictEqual(m.unansweredMark, 0.0, `Unanswered mark must be 0.0 for ${m.id}`);
    assert(m.durationMinutes > 0, `Duration must be positive for ${m.id}`);
    assert(m.totalQuestions > 0, `Question count must be positive for ${m.id}`);
  }
});

test('5. Mock Test Session Creation, Frozen Snapshot & Strict Timer Invariant', async () => {
  const session = MockTestService.startAttempt('mock-gbcs-full-01', 'candidate-test-user');
  assert(session.id.startsWith('test-'), 'Session ID must start with test-');
  assert.strictEqual(session.totalQuestions, 200, 'Full mock must have 200 questions');
  assert.strictEqual(session.durationSeconds, 7200, 'Duration must be 7200s (120 mins)');
  assert.strictEqual(session.status, 'in_progress', 'Initial status must be in_progress');
  assert.strictEqual(session.questions.length, 200, 'Snapshot must freeze 200 questions');

  // Verify questions distribution follows BPSC General Preliminary syllabus
  const counts: Record<string, number> = {};
  for (const q of session.questions) {
    counts[q.subjectCode] = (counts[q.subjectCode] || 0) + 1;
  }

  assert.strictEqual(counts['BANGLA'], 35, 'Bangla must be 35');
  assert.strictEqual(counts['ENGLISH'], 35, 'English must be 35');
  assert.strictEqual(counts['BD_AFFAIRS'], 30, 'Bangladesh Affairs must be 30');
  assert.strictEqual(counts['INT_AFFAIRS'], 20, 'International Affairs must be 20');
  assert.strictEqual(counts['G_GEOGRAPHY'], 10, 'Geography must be 10');
  assert.strictEqual(counts['G_SCIENCE'], 15, 'Science must be 15');
  assert.strictEqual(counts['G_COMPUTER'], 15, 'Computer must be 15');
  assert.strictEqual(counts['MATH'], 15, 'Math must be 15');
  assert.strictEqual(counts['MENTAL_ABILITY'], 15, 'Mental Ability must be 15');
  assert.strictEqual(counts['G_ETHICS'], 10, 'Ethics must be 10');
});

test('6. Server-Side Scoring & Negative Marking (-0.50) Evaluation', async () => {
  const session = AssessmentEngine.createSession({
    userId: 'scoring-test-user',
    examTrackId: 'general_bcs',
    professionalStream: 'general',
    testType: 'subject_test',
    title: 'Bangla Subject Test',
    durationMinutes: 35,
  });

  // Candidate answers 10 questions correctly, 4 incorrectly, leaves rest unanswered
  const responses: Record<string, { selectedOptionId: 'A' | 'B' | 'C' | 'D' }> = {};
  for (let i = 0; i < 10; i++) {
    const q = session.questions[i];
    responses[q.questionId] = { selectedOptionId: q.correctAnswerId };
  }
  for (let i = 10; i < 14; i++) {
    const q = session.questions[i];
    const wrongOpt = q.correctAnswerId === 'A' ? 'B' : 'A';
    responses[q.questionId] = { selectedOptionId: wrongOpt };
  }

  const evaluated = AssessmentEngine.evaluateSubmission(session.id, responses);
  assert.strictEqual(evaluated.status, 'completed', 'Status must be completed');
  assert.strictEqual(evaluated.correctCount, 10, 'Correct count must be 10');
  assert.strictEqual(evaluated.wrongCount, 4, 'Wrong count must be 4');
  assert.strictEqual(
    evaluated.unansweredCount,
    session.totalQuestions - 14,
    'Unanswered count must be total - 14'
  );

  // Score: 10 * 1.0 - 4 * 0.50 = 10.0 - 2.0 = 8.00
  assert.strictEqual(evaluated.finalScore, 8.0, 'Final score must be exactly 8.00 (+10 - 2)');
});

test('7. Duplicate Fingerprinting & Quality Audit Tool', async () => {
  const audit = QuestionBankService.runDuplicateAudit();
  assert(audit.totalRecords >= 20200, 'Must audit all 20,200 records');
  assert(audit.uniqueFingerprints > 0, 'Unique fingerprints must be positive');
  assert(typeof audit.duplicateRatePct === 'number', 'Duplicate rate must be numeric');
  assert(Array.isArray(audit.crossBatchOccurrences), 'Must return array of cross batch occurrences');
});

test('8. Question Reporting & Verification Status Update', async () => {
  const q = QuestionBankService.getAllQuestions()[0];
  assert(q, 'Must have at least one question');

  const reportResult = QuestionBankService.reportQuestion(
    q.id,
    'wrong_answer',
    'Question verified for correction test'
  );
  assert.strictEqual(reportResult.success, true, 'Report must succeed');
  assert.strictEqual(
    reportResult.item?.verification_status,
    'reported_for_correction',
    'Verification status must be reported_for_correction'
  );
});
