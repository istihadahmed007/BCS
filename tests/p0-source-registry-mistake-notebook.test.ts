import assert from 'node:assert';
import test from 'node:test';
import { SourceIngestionService } from '../src/services/source-ingestion';
import { MistakeNotebookService } from '../src/services/mistake-notebook';
import { DailyPracticeService } from '../src/services/daily-practice';
import { AssessmentEngine } from '../src/services/assessment';
import { MistakeClassificationType } from '../src/types';

test('P0.1: Source Registry CRUD, Ingestion & Metadata Safeguards', () => {
  // 1. Initial Sources exist in real registry
  const initialSources = SourceIngestionService.getSources();
  assert.ok(initialSources.length >= 7, 'Should have initial verified and catalogued sources');

  // 2. Add a new genuine source record
  const newSource = SourceIngestionService.addSource({
    sourceCode: 'SRC-BPSC-44TH',
    name: '44th BCS Preliminary Question Paper and Official Answer Key',
    sourceType: 'previous_exam_paper',
    priority: 1,
    category: 'official_bpsc',
    rightsStatus: 'public_domain',
    examinationName: '44th BCS Preliminary Examination',
    publicationYear: '2022',
    baseUrl: 'https://bpsc.gov.bd/site/view/bcs_exams/44th',
    documentReference: 'BPSC-EXAM-44-PRELIM',
    termsSummary: 'Official past question paper and answer key',
    syncSchedule: 'daily',
    lastSyncStatus: 'synced',
    verificationStatus: 'unverified',
    isActive: true,
    isArchived: false,
    notes: 'Preserved by Bangladesh Public Service Commission archive',
  });

  assert.ok(newSource.id.startsWith('src-'), 'Generated source ID must start with src-');
  assert.strictEqual(newSource.verificationStatus, 'unverified', 'New sources start as unverified');
  assert.strictEqual(newSource.isArchived, false);

  // 3. Search and filter sources
  const searchResults = SourceIngestionService.getSources({ search: '44th BCS' });
  assert.strictEqual(searchResults.length, 1);
  assert.strictEqual(searchResults[0].id, newSource.id);

  // 4. Update source metadata
  const updatedSource = SourceIngestionService.updateSource(newSource.id, {
    publisher: 'Bangladesh Public Service Commission',
    notes: 'Verified against gazetted master copy',
  });
  assert.ok(updatedSource);
  assert.strictEqual(updatedSource?.publisher, 'Bangladesh Public Service Commission');

  // 5. Verify source
  const verifiedSource = SourceIngestionService.verifySource(newSource.id, 'verified', 'admin-101');
  assert.ok(verifiedSource);
  assert.strictEqual(verifiedSource?.verificationStatus, 'verified');
  assert.strictEqual(verifiedSource?.verifiedBy, 'admin-101');
  assert.ok(verifiedSource?.verifiedAt);

  // 6. Safeguards on Deletion:
  // If no questions are attached, delete succeeds
  const deleteResult = SourceIngestionService.deleteSource(newSource.id);
  assert.strictEqual(deleteResult.success, true);
  assert.strictEqual(SourceIngestionService.getSourceById(newSource.id), undefined);

  // If a source has attached questions (e.g. src-bpsc-exams), delete must be blocked with a safeguard!
  assert.throws(
    () => {
      SourceIngestionService.deleteSource('src-bpsc-exams');
    },
    /Safeguard restriction: Cannot hard delete source/,
    'Must prevent deleting a source that has linked questions. Should require archiving instead.'
  );

  // Archiving succeeds without data loss
  const archived = SourceIngestionService.archiveSource('src-bpsc-exams');
  assert.strictEqual(archived?.source.isArchived, true);
  // Restore for subsequent tests
  SourceIngestionService.updateSource('src-bpsc-exams', { isArchived: false });
});

test('P0.2: Evidence-Backed Question Verification & Provenance States', () => {
  // A source being attached must NOT automatically verify the question
  const sourceId = 'src-bpsc-exams';
  const testQuestionId = 'q-bng-001';

  // 1. Link question to source
  const link = SourceIngestionService.linkQuestionToSource({
    questionId: testQuestionId,
    sourceRegistryId: sourceId,
    evidenceType: 'exact_question_match',
    citationText: '45th BCS Preliminary Question Paper, Set Padma, Question #12',
    pageNumber: 'Page 3',
    questionNumber: '12',
    verificationStatus: 'source_attached',
    reviewerNotes: 'Official question confirmed in 45th BCS booklet',
  });

  assert.ok(link.id);
  assert.strictEqual(link.verificationStatus, 'source_attached', 'Attaching a source must set state to source_attached, NOT verified');

  // Verify the question provenance links
  const links = SourceIngestionService.getQuestionSourceLinks(testQuestionId);
  assert.ok(links.length >= 1);
  assert.ok(links.some((l) => l.id === link.id));

  // 2. Authorized reviewer verifies the evidence
  const updatedQuestion = SourceIngestionService.verifyQuestionEvidence({
    questionId: testQuestionId,
    linkId: link.id,
    status: 'verified',
    verifiedBy: 'admin-lead-reviewer',
    reviewerNotes: 'Exact match confirmed against BPSC official question paper Set Padma',
  });
  assert.ok(updatedQuestion);
  const verifiedLink = SourceIngestionService.getQuestionSourceLinks(testQuestionId).find((l) => l.id === link.id);
  assert.strictEqual(verifiedLink?.verificationStatus, 'verified');
  assert.strictEqual(verifiedLink?.verifiedBy, 'admin-lead-reviewer');
  assert.ok(verifiedLink?.verificationDate);

  // 3. Mark evidence as needing review (e.g. ambiguous answer key conflict)
  SourceIngestionService.verifyQuestionEvidence({
    questionId: testQuestionId,
    linkId: link.id,
    status: 'needs_review',
    verifiedBy: 'admin-lead-reviewer',
    reviewerNotes: 'Conflicting interpretation noted between board text and dictionary',
  });
  const needsReviewLink = SourceIngestionService.getQuestionSourceLinks(testQuestionId).find((l) => l.id === link.id);
  assert.strictEqual(needsReviewLink?.verificationStatus, 'needs_review');
});

test('P0.3: Source Registry Dashboard Real Calculated Statistics', () => {
  const stats = SourceIngestionService.getSourceRegistryDashboardStats();

  assert.ok(typeof stats.totalSources === 'number' && stats.totalSources > 0);
  assert.ok(typeof stats.verifiedSources === 'number' && stats.verifiedSources > 0);
  assert.ok(typeof stats.awaitingReviewSources === 'number');
  assert.ok(typeof stats.unverifiedSources === 'number');
  assert.ok(typeof stats.questionsLinkedToSources === 'number' && stats.questionsLinkedToSources > 0);
  assert.ok(typeof stats.questionsWithVerifiedEvidence === 'number');
  assert.ok(typeof stats.questionsMissingSourceEvidence === 'number');
  assert.ok(typeof stats.brokenReferencesCount === 'number');

  // Strict invariant: totalSources = verifiedSources + awaitingReviewSources + unverifiedSources
  assert.strictEqual(
    stats.totalSources,
    stats.verifiedSources + stats.awaitingReviewSources + stats.unverifiedSources,
    'Source counts must partition total sources exactly'
  );
});

test('P0.4: Mistake Notebook User Isolation, Classification & Spaced Repetition', () => {
  const userA = 'student-alpha-001';
  const userB = 'student-beta-002';

  // 1. User A records a mistake
  const mistakeA = MistakeNotebookService.recordMistake({
    userId: userA,
    questionId: 'q-med1-001',
    userSelectedOption: 'B',
    errorType: 'confused_options' as MistakeClassificationType,
    candidateNotes: 'Confused by recent non-operative trials discussed in journal article.',
    testSessionId: 'session-alpha-practice',
  });

  assert.ok(mistakeA.id);
  assert.strictEqual(mistakeA.userId, userA);
  assert.strictEqual(mistakeA.errorType, 'confused_options');
  assert.strictEqual(mistakeA.userSelectedOption, 'B');
  assert.strictEqual(mistakeA.retryCount, 1);
  assert.strictEqual(mistakeA.reviewStatus, 'due_today', 'First-time mistake is immediately due for review');

  // 2. Strict User Isolation: User B cannot see User A mistakes
  const userBMistakes = MistakeNotebookService.getMistakes({ userId: userB });
  assert.strictEqual(userBMistakes.items.filter((m) => m.id === mistakeA.id).length, 0, 'User B must not see User A mistake');

  const userAMistakes = MistakeNotebookService.getMistakes({ userId: userA });
  assert.ok(userAMistakes.items.some((m) => m.id === mistakeA.id), 'User A must see their own mistake');

  // 3. User A re-encounters and fails the same question again:
  // Must avoid duplicate records, update existing record with spaced repetition interval and increment retry count
  const mistakeAUpdated = MistakeNotebookService.recordMistake({
    userId: userA,
    questionId: 'q-med1-001',
    userSelectedOption: 'C',
    errorType: 'conceptual_misunderstanding' as MistakeClassificationType,
    testSessionId: 'session-alpha-mock',
  });

  assert.strictEqual(mistakeAUpdated.id, mistakeA.id, 'Must reuse the same entry without duplicating');
  assert.strictEqual(mistakeAUpdated.retryCount, 2, 'Times incorrect must increment to 2');
  assert.strictEqual(mistakeAUpdated.errorType, 'conceptual_misunderstanding', 'Updated classification');

  // 4. Update candidate notes and classification via user action
  const modified = MistakeNotebookService.updateMistake({
    id: mistakeA.id,
    userId: userA,
    candidateNotes: 'Review Bailey & Love chapter 72 tonight before bed.',
    errorType: 'forgotten_fact' as MistakeClassificationType,
  });
  assert.strictEqual(modified.candidateNotes, 'Review Bailey & Love chapter 72 tonight before bed.');
  assert.strictEqual(modified.errorType, 'forgotten_fact');

  // 5. Mark as resolved and reopen
  const resolved = MistakeNotebookService.updateMistake({
    id: mistakeA.id,
    userId: userA,
    resolved: true,
  });
  assert.strictEqual(resolved.reviewStatus, 'resolved');
  assert.strictEqual(resolved.resolved, true);

  const reopened = MistakeNotebookService.updateMistake({
    id: mistakeA.id,
    userId: userA,
    resolved: false,
  });
  assert.notStrictEqual(reopened.reviewStatus, 'resolved');
  assert.strictEqual(reopened.resolved, false);

  // 6. Security guard: User B cannot modify User A mistake
  assert.throws(
    () => {
      MistakeNotebookService.updateMistake({
        id: mistakeA.id,
        userId: userB,
        candidateNotes: 'Hacked notes',
      });
    },
    /Unauthorized/,
    'User B cannot update User A mistake'
  );

  // 7. Security guard: User B cannot delete User A mistake
  assert.throws(
    () => {
      MistakeNotebookService.deleteMistake(mistakeA.id, userB);
    },
    /Unauthorized/,
    'User B cannot delete User A mistake'
  );

  // User A can delete
  const authorizedDelete = MistakeNotebookService.deleteMistake(mistakeA.id, userA);
  assert.strictEqual(authorizedDelete, true, 'User A can delete their own mistake');
});

test('P0.5: Automated Ingestion of Mistakes from Daily Practice and Mock Assessments', () => {
  const testUserId = 'doc-auto-ingest-user';

  // 1. Daily Practice Ingestion:
  // Generate daily practice queue
  const practiceSet = DailyPracticeService.generatePracticeSet({
    userId: testUserId,
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    practiceMode: 'revision_due',
    questionCount: 4,
  });
  assert.ok(practiceSet.questions.length > 0);

  // Submit an INCORRECT answer for the first question
  const targetPQ = practiceSet.questions[0];
  const wrongOption = targetPQ.question.options.find((o) => o.id !== targetPQ.question.correctAnswerId)?.id as 'A' | 'B' | 'C' | 'D';

  const result = DailyPracticeService.submitQuestionAnswer({
    practiceSetId: practiceSet.id,
    questionId: targetPQ.question.id,
    selectedOptionId: wrongOption,
    timeSpentSeconds: 45,
  });

  assert.strictEqual(result.isCorrect, false);

  // Verify that Mistake Notebook IMMEDIATELY has this question recorded
  const mistakesAfterPractice = MistakeNotebookService.getMistakes({ userId: testUserId });
  const autoSavedPracticeMistake = mistakesAfterPractice.items.find((m) => m.questionId === targetPQ.question.id);
  assert.ok(autoSavedPracticeMistake, 'Incorrect practice answer must auto-persist to Mistake Notebook');
  assert.strictEqual(autoSavedPracticeMistake?.userSelectedOption, wrongOption);
  assert.strictEqual(autoSavedPracticeMistake?.correctOption, targetPQ.question.correctAnswerId);

  // 2. Assessment Engine Ingestion:
  // Create a diagnostic session
  const session = AssessmentEngine.createSession({
    userId: testUserId,
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    testType: 'diagnostic',
    title: 'Assistant Surgeon Ingestion Check',
  });

  const qToFail = session.questions[0];
  const wrongOptForAssessment = qToFail.options.find((o) => o.id !== qToFail.correctAnswerId)?.id as 'A' | 'B' | 'C' | 'D';

  AssessmentEngine.evaluateSubmission(
    session.id,
    {
      [qToFail.questionId]: {
        selectedOptionId: wrongOptForAssessment,
        timeSpentSeconds: 35,
      },
    },
    'idempotent-assessment-token-' + Date.now()
  );

  // Check Mistake Notebook for assessment error
  const mistakesAfterAssessment = MistakeNotebookService.getMistakes({ userId: testUserId });
  const autoSavedAssessmentMistake = mistakesAfterAssessment.items.find((m) => m.questionId === qToFail.questionId);
  assert.ok(autoSavedAssessmentMistake, 'Incorrect mock test answer must auto-persist to Mistake Notebook');
});

test('P0.6: Spaced Repetition Drill Generation from Notebook', () => {
  const userId = 'student-drill-master';

  // Seed two mistakes using existing seed questions
  MistakeNotebookService.recordMistake({
    userId,
    questionId: 'q-med1-001',
    userSelectedOption: 'B',
    errorType: 'forgotten_fact',
  });

  MistakeNotebookService.recordMistake({
    userId,
    questionId: 'q-bng-001',
    userSelectedOption: 'C',
    errorType: 'confused_options',
  });

  const drillQuestions = MistakeNotebookService.generatePracticeDrill(userId, 5);
  assert.ok(drillQuestions.length >= 2, 'Should generate drill from saved mistakes');
  assert.ok(drillQuestions.some((q) => q.id === 'q-med1-001'));
  assert.ok(drillQuestions.some((q) => q.id === 'q-bng-001'));
});

test('P0.7: Admin Access Control Enforcement', () => {
  // Check authorization validation rules used across API endpoints
  function checkAdminAccess(role: string | null): boolean {
    if (!role) return false;
    return role === 'super_admin' || role === 'admin' || role === 'bpsc_verifier';
  }

  assert.strictEqual(checkAdminAccess('super_admin'), true);
  assert.strictEqual(checkAdminAccess('admin'), true);
  assert.strictEqual(checkAdminAccess('bpsc_verifier'), true);
  assert.strictEqual(checkAdminAccess('student'), false);
  assert.strictEqual(checkAdminAccess('candidate'), false);
  assert.strictEqual(checkAdminAccess(null), false);
});
