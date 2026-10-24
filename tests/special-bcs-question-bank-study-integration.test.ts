import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { QuestionBankService } from '../src/services/question-bank';
import { DailyPracticeService } from '../src/services/daily-practice';
import { AssessmentEngine } from '../src/services/assessment';

test('1. Special BCS Question Bank Integration & 200-MCQ Limit Elimination', async () => {
  // Query Assistant Surgeon with subject: all (or undefined)
  const surgeonResult = QuestionBankService.queryQuestions({
    track: 'special_bcs_health_51_2026',
    stream: 'assistant_surgeon',
    page: 1,
    limit: 20,
  });

  // Must exceed the previous 200-question hardcoded/filter limit
  assert(
    surgeonResult.total > 200,
    `Assistant Surgeon total must exceed 200 MCQs (actual: ${surgeonResult.total})`
  );
  assert.strictEqual(
    surgeonResult.total,
    15299,
    'Assistant Surgeon total eligible dataset must be exactly 15,299 (100 Medical + 15,199 Shared General)'
  );
  assert(
    surgeonResult.totalPages > 10,
    `Total pages must reflect full dataset (actual: ${surgeonResult.totalPages})`
  );

  // First page questions must prioritize Medical Science
  const first5 = surgeonResult.questions.slice(0, 5);
  for (const q of first5) {
    assert(
      q.subject.toLowerCase().includes('medical'),
      `First page of Assistant Surgeon must prioritize Medical Science (got: ${q.subject})`
    );
  }
});

test('2. Multi-Page Pagination Across First, Middle, and Final Pages Without Gaps', async () => {
  const limit = 20;
  const surgeonPool = QuestionBankService.queryQuestions({
    track: 'special_bcs_health_51_2026',
    stream: 'assistant_surgeon',
    page: 1,
    limit,
  });

  const totalPages = surgeonPool.totalPages;
  const middlePage = Math.floor(totalPages / 2);
  const finalPage = totalPages;

  // First Page
  const p1 = QuestionBankService.queryQuestions({
    track: 'special_bcs_health_51_2026',
    stream: 'assistant_surgeon',
    page: 1,
    limit,
  });
  assert.strictEqual(p1.questions.length, limit, 'First page must have full limit items');
  assert.strictEqual(p1.page, 1);

  // Middle Page
  const pMid = QuestionBankService.queryQuestions({
    track: 'special_bcs_health_51_2026',
    stream: 'assistant_surgeon',
    page: middlePage,
    limit,
  });
  assert.strictEqual(pMid.questions.length, limit, 'Middle page must have full limit items');
  assert.strictEqual(pMid.page, middlePage);

  // Final Page
  const pFinal = QuestionBankService.queryQuestions({
    track: 'special_bcs_health_51_2026',
    stream: 'assistant_surgeon',
    page: finalPage,
    limit,
  });
  assert(pFinal.questions.length > 0 && pFinal.questions.length <= limit, 'Final page must have remaining items');
  assert.strictEqual(pFinal.page, finalPage);

  // Ensure no overlapping IDs between distinct pages
  const p1Ids = new Set(p1.questions.map((q) => q.id));
  const pMidIds = new Set(pMid.questions.map((q) => q.id));
  for (const id of pMidIds) {
    assert(!p1Ids.has(id), `Page ${middlePage} must not duplicate item from page 1: ${id}`);
  }
});

test('3. Stream Separation: MBBS vs BDS vs General BCS', async () => {
  // Assistant Surgeon pool
  const asPool = QuestionBankService.queryQuestions({
    track: 'special_bcs_health_51_2026',
    stream: 'assistant_surgeon',
    page: 1,
    limit: 1000,
  });
  for (const q of asPool.questions) {
    assert(
      !q.subject.toLowerCase().includes('dental') && !q.id.startsWith('BCS-DEN'),
      `MBBS candidate must never receive Dental questions: ${q.subject} (${q.id})`
    );
  }

  // Assistant Dental Surgeon pool
  const bdsPool = QuestionBankService.queryQuestions({
    track: 'special_bcs_health_51_2026',
    stream: 'assistant_dental_surgeon',
    page: 1,
    limit: 1000,
  });
  for (const q of bdsPool.questions) {
    assert(
      !q.subject.toLowerCase().includes('medical') && !q.id.startsWith('BCS-MED'),
      `BDS candidate must never receive Medical questions: ${q.subject} (${q.id})`
    );
  }

  // General BCS pool
  const genPool = QuestionBankService.queryQuestions({
    track: 'general_bcs',
    page: 1,
    limit: 1000,
  });
  for (const q of genPool.questions) {
    assert(
      !q.subject.toLowerCase().includes('medical') &&
      !q.subject.toLowerCase().includes('dental') &&
      !q.id.startsWith('BCS-MED') &&
      !q.id.startsWith('BCS-DEN'),
      `General BCS must never receive Medical or Dental questions: ${q.subject} (${q.id})`
    );
  }
});

test('4. Dedicated Professional Filter (100 MBBS vs 100 BDS)', async () => {
  const asProf = QuestionBankService.queryQuestions({
    track: 'special_bcs_health_51_2026',
    stream: 'assistant_surgeon',
    subject: 'professional',
    page: 1,
    limit: 100,
  });
  assert.strictEqual(asProf.total, 100, 'MBBS professional part must have exactly 100 questions');
  assert.strictEqual(asProf.questions.length, 100, 'MBBS professional part must return 100 questions');

  const bdsProf = QuestionBankService.queryQuestions({
    track: 'special_bcs_health_51_2026',
    stream: 'assistant_dental_surgeon',
    subject: 'professional',
    page: 1,
    limit: 100,
  });
  assert.strictEqual(bdsProf.total, 100, 'BDS professional part must have exactly 100 questions');
  assert.strictEqual(bdsProf.questions.length, 100, 'BDS professional part must return 100 questions');
});

test('5. Study Mode Daily Practice Generation from Question Bank', async () => {
  const practiceSet = DailyPracticeService.generatePracticeSet({
    userId: 'student_current',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    practiceMode: 'mixed',
    questionCount: 20,
  });

  assert.strictEqual(practiceSet.questions.length, 20, 'Generated set must have 20 items');
  for (const item of practiceSet.questions) {
    assert(
      item.question.professionalStream === 'all' || item.question.professionalStream === 'assistant_surgeon',
      `Practice item stream must be all or assistant_surgeon, got: ${item.question.professionalStream}`
    );
    assert(
      item.question.options.length >= 4,
      `Practice item ${item.question.id} must have 4 options`
    );
    assert(
      Boolean(item.question.correctAnswerId),
      `Practice item ${item.question.id} must have a correct answer key`
    );
  }
});

test('6. Question Bank Exact Navigation Label & Route Verification', async () => {
  // Check Sidebar.tsx contains exact name: 'Question Bank' and href: '/question-bank'
  const sidebarPath = path.join(process.cwd(), 'src', 'components', 'portal', 'Sidebar.tsx');
  const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
  assert(sidebarContent.includes("name: 'Question Bank'"), "Sidebar must contain name: 'Question Bank'");
  assert(sidebarContent.includes("href: '/question-bank'"), "Sidebar must link to '/question-bank'");

  // Check AppShell.tsx contains exact 'Question Bank'
  const appShellPath = path.join(process.cwd(), 'src', 'components', 'layout', 'AppShell.tsx');
  const appShellContent = fs.readFileSync(appShellPath, 'utf8');
  assert(appShellContent.includes('Question Bank'), "AppShell must contain 'Question Bank'");
  assert(appShellContent.includes("href=\"/question-bank\""), "AppShell must link to '/question-bank'");

  // Check Dashboard contains Question Bank shortcut
  const dashboardPath = path.join(process.cwd(), 'src', 'app', 'dashboard', 'page.tsx');
  const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
  assert(dashboardContent.includes("Question Bank"), "Dashboard must contain 'Question Bank' shortcut");
  assert(dashboardContent.includes("href=\"/question-bank\""), "Dashboard must link to '/question-bank'");
});
