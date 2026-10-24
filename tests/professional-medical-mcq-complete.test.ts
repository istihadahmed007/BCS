import test from 'node:test';
import assert from 'node:assert';
import { QuestionBankService } from '../src/services/question-bank';
import { AssessmentEngine } from '../src/services/assessment';
import { SourceIngestionService } from '../src/services/source-ingestion';
import { SYLLABUS_TOPICS } from '../src/data/syllabus';

test('1. Stream & Track Isolation: MBBS vs BDS vs General BCS', async () => {
  // Query for Assistant Surgeon (MBBS)
  const surgeonResult = QuestionBankService.queryQuestions({
    page: 1,
    limit: 500,
    stream: 'assistant_surgeon',
  });
  assert(surgeonResult.total > 0, 'Surgeon stream should return questions');
  assert(
    surgeonResult.questions.every((q) => !q.subject.toLowerCase().includes('dental')),
    'Assistant Surgeon stream must never contain Dental Science questions'
  );

  // Query for Assistant Dental Surgeon (BDS)
  const dentalResult = QuestionBankService.queryQuestions({
    page: 1,
    limit: 500,
    stream: 'assistant_dental_surgeon',
  });
  assert(dentalResult.total > 0, 'Dental stream should return questions');
  assert(
    dentalResult.questions.every((q) => !q.subject.toLowerCase().includes('medical')),
    'Assistant Dental Surgeon stream must never contain Medical Science questions'
  );

  // Query for General BCS
  const generalResult = QuestionBankService.queryQuestions({
    page: 1,
    limit: 500,
    track: 'general_bcs',
  });
  assert(generalResult.total > 0, 'General BCS track should return questions');
  assert(
    generalResult.questions.every(
      (q) => !q.subject.toLowerCase().includes('medical') && !q.subject.toLowerCase().includes('dental')
    ),
    'General BCS track must never contain Professional Medical or Dental questions'
  );
});

test('2. Question Bank Quality & Schema Integrity: Complete Metadata', async () => {
  // Query specifically for Medical Science Part I
  const medResult = QuestionBankService.queryQuestions({
    page: 1,
    limit: 100,
    subject: 'Medical Science Part I',
    stream: 'assistant_surgeon',
  });

  // Query specifically for Dental Science Part I
  const denResult = QuestionBankService.queryQuestions({
    page: 1,
    limit: 100,
    subject: 'Dental Science Part I',
    stream: 'assistant_dental_surgeon',
  });

  const professionalQuestions = [...medResult.questions, ...denResult.questions];
  assert(professionalQuestions.length >= 100, 'Should find at least 100 professional questions across MBBS & BDS');

  for (const q of professionalQuestions) {
    // 1. Stem completeness
    assert(q.question_bn && q.question_bn.trim().length > 5, `Question ${q.id} missing Bengali stem`);
    assert(q.question_en && q.question_en.trim().length > 5, `Question ${q.id} missing English stem`);

    // 2. 4 Answer Options
    assert(q.options && typeof q.options === 'object', `Question ${q.id} options must be an object`);
    assert(q.options.A && q.options.A.trim().length > 0, `Question ${q.id} missing Option A`);
    assert(q.options.B && q.options.B.trim().length > 0, `Question ${q.id} missing Option B`);
    assert(q.options.C && q.options.C.trim().length > 0, `Question ${q.id} missing Option C`);
    assert(q.options.D && q.options.D.trim().length > 0, `Question ${q.id} missing Option D`);

    // 3. Valid Correct Option
    assert(['A', 'B', 'C', 'D'].includes(q.correct_option), `Question ${q.id} invalid correct_option: ${q.correct_option}`);

    // 4. Concise Explanations
    assert(q.explanation_bn && q.explanation_bn.trim().length > 5, `Question ${q.id} missing Bengali explanation`);
    assert(q.explanation_en && q.explanation_en.trim().length > 5, `Question ${q.id} missing English explanation`);

    // 5. Difficulty and Review Status
    assert(['easy', 'medium', 'hard'].includes(q.difficulty), `Question ${q.id} invalid difficulty: ${q.difficulty}`);
    assert(
      ['verified', 'approved', 'under_review', 'draft', 'needs_review'].includes(q.verification_status),
      `Question ${q.id} invalid status: ${q.verification_status}`
    );

    // 6. Source and Provenance
    assert(q.source_title && q.source_title.trim().length > 0, `Question ${q.id} missing source_title`);
  }
});

test('3. Topic & Review Status Filtering in Question Bank Service', async () => {
  // Test topic filter
  const anatomyResult = QuestionBankService.queryQuestions({
    page: 1,
    limit: 100,
    stream: 'assistant_surgeon',
    topic: 'Anatomy',
  });
  assert(anatomyResult.total > 0, 'Anatomy query should return questions');
  assert(
    anatomyResult.questions.every((q) => q.topic.toLowerCase().includes('anatomy')),
    'Every returned question must have topic Anatomy'
  );

  // Test review status filter: verified/approved
  const approvedResult = QuestionBankService.queryQuestions({
    page: 1,
    limit: 100,
    reviewStatus: 'approved',
  });
  assert(approvedResult.total > 0, 'Approved status query should return questions');
  assert(
    approvedResult.questions.every(
      (q) => q.verification_status === 'verified' || q.verification_status === 'approved'
    ),
    'Every returned question must have verified or approved status'
  );
});

test('4. Syllabus Mapping: Assistant Surgeon (MBBS) & Assistant Dental Surgeon (BDS)', async () => {
  // Verify MBBS topics in syllabus (Medical Science Part I & Part II)
  const mbbsTopics = SYLLABUS_TOPICS.filter((t) =>
    t.subjectId === 'sub-sbcs-med-sci-1' || t.subjectId === 'sub-sbcs-med-sci-2'
  );
  assert.strictEqual(mbbsTopics.length, 8, 'MBBS syllabus should have 8 core topics');
  const mbbsCodes = mbbsTopics.map((t) => t.topicCode);
  assert(mbbsCodes.includes('MED1-01'), 'Must include MED1-01 Anatomy');
  assert(mbbsCodes.includes('MED1-02'), 'Must include MED1-02 Physiology & Biochem');
  assert(mbbsCodes.includes('MED2-01'), 'Must include MED2-01 Internal Medicine');
  assert(mbbsCodes.includes('MED2-02'), 'Must include MED2-02 General Surgery');

  // Verify BDS topics in syllabus (Dental Science Part I & Part II)
  const bdsTopics = SYLLABUS_TOPICS.filter((t) =>
    t.subjectId === 'sub-sbcs-den-sci-1' || t.subjectId === 'sub-sbcs-den-sci-2'
  );
  assert.strictEqual(bdsTopics.length, 4, 'BDS syllabus should have 4 core topics');
  const bdsCodes = bdsTopics.map((t) => t.topicCode);
  assert(bdsCodes.includes('DEN1-01'), 'Must include DEN1-01 Dental Anatomy');
  assert(bdsCodes.includes('DEN2-01'), 'Must include DEN2-01 OMFS');
});

test('5. 100-Mark Professional Part Mock Test for MBBS & BDS (60 Mins)', async () => {
  // MBBS Professional Test
  const mbbsProSession = AssessmentEngine.createSession({
    userId: 'candidate-mbbs-01',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    testType: 'subject_test',
    title: '51st Special BCS Health — Professional Part (Medical Science)',
    durationMinutes: 60,
  });

  assert.strictEqual(mbbsProSession.totalQuestions, 100, 'MBBS professional mock must have 100 questions');
  assert.strictEqual(mbbsProSession.durationSeconds, 3600, 'Mock duration must be 3,600s (60 min)');
  assert(
    mbbsProSession.questions.every((q) => q.subjectCode === 'MED_SCI_1' || q.subjectCode === 'MED_SCI_2'),
    'All questions in MBBS test must be MED_SCI_1 or MED_SCI_2'
  );

  // BDS Professional Test
  const bdsProSession = AssessmentEngine.createSession({
    userId: 'candidate-bds-01',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_dental_surgeon',
    testType: 'subject_test',
    title: '51st Special BCS Health — Professional Part (Dental Science)',
    durationMinutes: 60,
  });

  assert.strictEqual(bdsProSession.totalQuestions, 100, 'BDS professional mock must have 100 questions');
  assert.strictEqual(bdsProSession.durationSeconds, 3600, 'Mock duration must be 3,600s (60 min)');
  assert(
    bdsProSession.questions.every((q) => q.subjectCode === 'DENTAL_SCI_1' || q.subjectCode === 'DENTAL_SCI_2'),
    'All questions in BDS test must be DENTAL_SCI_1 or DENTAL_SCI_2'
  );
});

test('6. Combined 200-Mark Full Mock Simulation: 100 General + 100 Professional', async () => {
  const combinedSession = AssessmentEngine.createSession({
    userId: 'candidate-full-01',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    testType: 'full_mock',
    title: '51st Special BCS Health Combined Full Mock Simulation (200 Marks)',
  });

  assert.strictEqual(combinedSession.totalQuestions, 200, 'Combined mock must have 200 questions');
  assert.strictEqual(combinedSession.durationSeconds, 7200, 'Combined mock must have 7200s (120 mins)');

  const generalCount = combinedSession.questions.filter((q) =>
    ['BANGLA', 'ENGLISH', 'BD_AFFAIRS', 'INT_AFFAIRS', 'MATH', 'MENTAL_ABILITY'].includes(q.subjectCode)
  ).length;
  const proCount = combinedSession.questions.filter((q) =>
    ['MED_SCI_1', 'MED_SCI_2'].includes(q.subjectCode)
  ).length;

  assert.strictEqual(generalCount, 100, 'General Part must be exactly 100 questions');
  assert.strictEqual(proCount, 100, 'Professional Part must be exactly 100 questions');
});

test('7. Deterministic Scoring (+1.0 / -0.50) & Section Breakdown', async () => {
  const session = AssessmentEngine.createSession({
    userId: 'candidate-scoring-01',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    testType: 'full_mock',
  });

  // Candidate answers 10 questions:
  // 5 General: 4 correct, 1 wrong -> General Score: 4*1.0 - 1*0.50 = 3.50
  // 5 Professional: 3 correct, 2 wrong -> Professional Score: 3*1.0 - 2*0.50 = 2.00
  const generalQuestions = session.questions.filter((q) =>
    ['BANGLA', 'ENGLISH', 'BD_AFFAIRS', 'INT_AFFAIRS', 'MATH', 'MENTAL_ABILITY'].includes(q.subjectCode)
  );
  const proQuestions = session.questions.filter((q) =>
    ['MED_SCI_1', 'MED_SCI_2'].includes(q.subjectCode)
  );

  // 4 correct, 1 wrong for general
  AssessmentEngine.saveResponse(session.id, generalQuestions[0].questionId, generalQuestions[0].correctAnswerId);
  AssessmentEngine.saveResponse(session.id, generalQuestions[1].questionId, generalQuestions[1].correctAnswerId);
  AssessmentEngine.saveResponse(session.id, generalQuestions[2].questionId, generalQuestions[2].correctAnswerId);
  AssessmentEngine.saveResponse(session.id, generalQuestions[3].questionId, generalQuestions[3].correctAnswerId);
  const wrongOptGen = generalQuestions[4].correctAnswerId === 'A' ? 'B' : 'A';
  AssessmentEngine.saveResponse(session.id, generalQuestions[4].questionId, wrongOptGen);

  // 3 correct, 2 wrong for professional
  AssessmentEngine.saveResponse(session.id, proQuestions[0].questionId, proQuestions[0].correctAnswerId);
  AssessmentEngine.saveResponse(session.id, proQuestions[1].questionId, proQuestions[1].correctAnswerId);
  AssessmentEngine.saveResponse(session.id, proQuestions[2].questionId, proQuestions[2].correctAnswerId);
  const wrongOptPro1 = proQuestions[3].correctAnswerId === 'A' ? 'B' : 'A';
  const wrongOptPro2 = proQuestions[4].correctAnswerId === 'A' ? 'B' : 'A';
  AssessmentEngine.saveResponse(session.id, proQuestions[3].questionId, wrongOptPro1);
  AssessmentEngine.saveResponse(session.id, proQuestions[4].questionId, wrongOptPro2);

  const completed = AssessmentEngine.evaluateSubmission(session.id);
  assert.strictEqual(completed.status, 'completed');
  assert.strictEqual(completed.correctCount, 7);
  assert.strictEqual(completed.wrongCount, 3);
  // Total Score: 7 * 1.0 - 3 * 0.50 = 5.50
  assert.strictEqual(completed.finalScore, 5.5);

  // Verify section breakdown
  assert(completed.sectionBreakdown, 'Section breakdown should be populated');
  assert.strictEqual(completed.sectionBreakdown.general.marks, 3.5);
  assert.strictEqual(completed.sectionBreakdown.professional.marks, 2.0);
});

test('8. Regression: 20,000 General BCS Questions Intact & Unchanged', async () => {
  const manifest = QuestionBankService.getManifest();
  assert(manifest.totalQuestions >= 20200, `Total question count should be at least 20,200 (was ${manifest.totalQuestions})`);

  // General subjects counts
  const banglaCount = manifest.subjectStats['Bangla'] || 0;
  const englishCount = manifest.subjectStats['English'] || 0;
  const bdAffairsCount = manifest.subjectStats['Bangladesh Affairs'] || 0;
  const intAffairsCount = manifest.subjectStats['International Affairs'] || 0;

  assert(banglaCount >= 3000, `Bangla count should be >= 3000 (was ${banglaCount})`);
  assert(englishCount >= 3000, `English count should be >= 3000 (was ${englishCount})`);
  assert(bdAffairsCount >= 3000, `BD Affairs count should be >= 3000 (was ${bdAffairsCount})`);
  assert(intAffairsCount >= 2000, `Int Affairs count should be >= 2000 (was ${intAffairsCount})`);

  // Professional subjects counts
  const med1Count = manifest.subjectStats['Medical Science Part I'] || 0;
  const med2Count = manifest.subjectStats['Medical Science Part II'] || 0;
  const den1Count = manifest.subjectStats['Dental Science Part I'] || 0;
  const den2Count = manifest.subjectStats['Dental Science Part II'] || 0;

  assert.strictEqual(med1Count, 50, 'Medical Science Part I should have 50 questions');
  assert.strictEqual(med2Count, 50, 'Medical Science Part II should have 50 questions');
  assert.strictEqual(den1Count, 50, 'Dental Science Part I should have 50 questions');
  assert.strictEqual(den2Count, 50, 'Dental Science Part II should have 50 questions');
});
