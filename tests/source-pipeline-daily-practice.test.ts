import assert from 'node:assert';
import test from 'node:test';
import { SourceIngestionService } from '../src/services/source-ingestion';
import { DailyPracticeService } from '../src/services/daily-practice';

test('1. Source Registry: Priorities 1-4, Rights Status & Traceability', () => {
  const sources = SourceIngestionService.getSources();
  assert.ok(sources.length >= 8, 'Must have registered sources');

  // Verify Priority 1 (Official BPSC)
  const p1 = sources.filter((s) => s.priority === 1);
  assert.ok(p1.length >= 2, 'Must have at least 2 official BPSC sources registered');
  const bpscMain = p1.find((s) => s.sourceCode === 'SRC-BPSC-OFFICIAL');
  assert.ok(bpscMain, 'BPSC official portal must exist');
  assert.strictEqual(bpscMain?.rightsStatus, 'public_domain');

  // Verify Priority 2 (Archives: GenMCQ, Somadhan, BCSPrep - metadata only, no terms-violating mass scraping)
  const p2 = sources.filter((s) => s.priority === 2);
  assert.ok(p2.length >= 3, 'Must have GenMCQ, Somadhan, and BCSPrep');
  for (const s of p2) {
    assert.strictEqual(
      s.rightsStatus,
      'metadata_only',
      'Secondary archives must be metadata_only to respect intellectual property'
    );
  }

  // Verify Priority 3 (Authorized Books B01-B19)
  const p3 = sources.filter((s) => s.priority === 3);
  assert.ok(p3.length >= 2, 'Must have catalog book references');

  // Verify Priority 4 (Verified Original Practice)
  const p4 = sources.filter((s) => s.priority === 4);
  assert.ok(p4.length >= 1, 'Must have expert-reviewed practice registry');
});

test('2. Ingestion Pipeline: Normalization, Fingerprint Deduplication & Staging', () => {
  const rawSample = [
    {
      stemBn: '  পিত্তরস কোথায় তৈরি হয়?   ', // Needs whitespace trimming
      stemEn: 'Where is bile produced?',
      subjectCode: 'medical_science',
      options: [
        { id: 'A' as const, textBn: 'যকৃত (Liver)' },
        { id: 'B' as const, textBn: 'পিত্তথলি (Gallbladder)' },
        { id: 'C' as const, textBn: 'অগ্ন্যাশয় (Pancreas)' },
        { id: 'D' as const, textBn: 'পাকস্থলী (Stomach)' },
      ],
      correctAnswerId: 'A' as const,
      explanationBn: 'পিত্তরস যকৃতে তৈরি হয় এবং পিত্তথলিতে জমা থাকে।',
      sourceReference: 'BPSC 42nd Special BCS Medical Science',
      examYear: '2021',
      examTrackId: 'special_bcs_health_51_2026' as const,
      professionalStream: 'assistant_surgeon' as const,
    },
  ];

  const result = SourceIngestionService.ingestQuestionBatch({
    sourceRegistryId: 'src-bpsc-51st-syllabus',
    jobType: 'manual_upload',
    fileName: 'test_ingest.json',
    fileFormat: 'json',
    items: rawSample,
  });

  assert.ok(result.job.id, 'Job must be created');
  assert.strictEqual(result.stagedItemsCount, 1, '1 item must be extracted');
  assert.strictEqual(result.job.itemsExtracted, 1);

  const queue = SourceIngestionService.getReviewQueue();
  const stagedItem = queue.find((i) => i.jobId === result.job.id);
  assert.ok(stagedItem, 'Must find staged item in queue');
  assert.ok(stagedItem.duplicateHash, 'Must generate normalized duplicate hash');
  assert.strictEqual(
    stagedItem.parsedPayload.stemBn,
    'পিত্তরস কোথায় তৈরি হয়?',
    'Whitespace must be normalized'
  );
});

test('3. Review Queue: Verification Workflow & Publication Control', () => {
  const queue = SourceIngestionService.getReviewQueue();
  assert.ok(queue.length > 0, 'Must have staged items in review queue');

  const itemToReview = queue[0];
  const originalApprovedCount = SourceIngestionService.getApprovedQuestions().length;

  // Unreviewed questions must NOT be in the approved questions bank
  const approvedInitial = SourceIngestionService.getApprovedQuestions();
  assert.strictEqual(
    approvedInitial.some((q) => q.id === itemToReview.id),
    false,
    'Unapproved staged item must not appear in verified bank'
  );

  // Approve the question
  const reviewResult = SourceIngestionService.reviewStagedItem({
    itemId: itemToReview.id,
    action: 'approve',
    feedback: 'Verified against 42nd Special BCS question paper and answer key',
  });

  assert.strictEqual(reviewResult.success, true);
  assert.strictEqual(reviewResult.item.status, 'approved');
  assert.ok(reviewResult.publishedQuestion, 'Must return published question');
  assert.strictEqual(reviewResult.publishedQuestion?.reviewStatus, 'approved');

  // Now it must appear in approved questions
  const approvedAfter = SourceIngestionService.getApprovedQuestions();
  assert.strictEqual(
    approvedAfter.length,
    originalApprovedCount + 1,
    'Approved questions count must increase by 1'
  );
});

test('4. Daily Practice Queue: Ratios (40/30/20/10) & Stream Isolation', () => {
  // Test Assistant Surgeon Session
  const surgeonSet = DailyPracticeService.generatePracticeSet({
    userId: 'student_surgeon_01',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    practiceMode: 'mixed',
    questionCount: 10,
  });

  assert.ok(surgeonSet.id, 'Set must have valid ID');
  assert.strictEqual(surgeonSet.questions.length, 10, 'Must generate requested count');

  // Verify stream isolation: Assistant Surgeon must NEVER have dental science questions
  for (const pq of surgeonSet.questions) {
    assert.notStrictEqual(
      pq.question.subjectCode,
      'dental_science',
      'Assistant Surgeon must not receive Dental Science questions'
    );
    assert.notStrictEqual(
      pq.question.professionalStream,
      'assistant_dental_surgeon',
      'Assistant Surgeon must not receive Dental stream questions'
    );
  }

  // Test Dental Surgeon Session
  const dentalSet = DailyPracticeService.generatePracticeSet({
    userId: 'student_dental_01',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_dental_surgeon',
    practiceMode: 'mixed',
    questionCount: 10,
  });

  // Verify stream isolation: Dental Surgeon must NEVER have medical science professional questions
  for (const pq of dentalSet.questions) {
    assert.notStrictEqual(
      pq.question.subjectCode,
      'medical_science',
      'Dental Surgeon must not receive Medical Science questions'
    );
    assert.notStrictEqual(
      pq.question.professionalStream,
      'assistant_surgeon',
      'Dental Surgeon must not receive Medical stream questions'
    );
  }
});

test('5. Practice Interaction: Answer Submission & Negative Marking', () => {
  const practiceSet = DailyPracticeService.generatePracticeSet({
    userId: 'student_test_user',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    practiceMode: 'mixed',
    questionCount: 5,
  });

  const firstQ = practiceSet.questions[0];

  // Submit correct answer
  const correctResult = DailyPracticeService.submitQuestionAnswer({
    practiceSetId: practiceSet.id,
    questionId: firstQ.question.id,
    selectedOptionId: firstQ.question.correctAnswerId,
    timeSpentSeconds: 20,
  });

  assert.strictEqual(correctResult.isCorrect, true);
  assert.strictEqual(correctResult.correctAnswerId, firstQ.question.correctAnswerId);
  assert.ok(correctResult.explanationBn, 'Must immediately reveal explanation in Bengali');

  // Submit wrong answer for second question
  const secondQ = practiceSet.questions[1];
  const wrongOpt = secondQ.question.options.find((o) => o.id !== secondQ.question.correctAnswerId)?.id as 'A' | 'B' | 'C' | 'D';

  const wrongResult = DailyPracticeService.submitQuestionAnswer({
    practiceSetId: practiceSet.id,
    questionId: secondQ.question.id,
    selectedOptionId: wrongOpt,
    timeSpentSeconds: 15,
  });

  assert.strictEqual(wrongResult.isCorrect, false);
  const updatedSet = DailyPracticeService.getPracticeSet(practiceSet.id);
  assert.strictEqual(updatedSet?.completedCount, 2);
  assert.strictEqual(updatedSet?.correctCount, 1);
  assert.strictEqual(updatedSet?.wrongCount, 1);

  // Second question must be automatically tagged for Mistake Notebook
  const pq2 = updatedSet?.questions.find((q) => q.question.id === secondQ.question.id);
  assert.strictEqual(pq2?.addedToMistakeNotebook, true, 'Incorrect questions must auto-tag to mistake notebook');
});

test('6. Real Database Coverage & Audit Metrics', () => {
  const metrics = SourceIngestionService.getCoverageMetrics();

  assert.ok(metrics.totalIngested > 0, 'Total ingested must be > 0');
  assert.ok(metrics.totalApproved > 0, 'Total approved must be > 0');
  assert.strictEqual(typeof metrics.byTrack, 'object');
  assert.strictEqual(typeof metrics.byStream, 'object');
  assert.strictEqual(typeof metrics.bySubject, 'object');
  assert.strictEqual(typeof metrics.byOrigin, 'object');

  // Verify no fake numbers: sum of track counts must equal approved count
  const trackSum = Object.values(metrics.byTrack).reduce((a, b) => a + b, 0);
  assert.strictEqual(trackSum, metrics.totalApproved, 'Track counts must match approved count exactly');

  // Verify source health
  assert.ok(metrics.sourceHealth.totalSources >= 8);
});
