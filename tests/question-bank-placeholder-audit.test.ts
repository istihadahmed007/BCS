import test from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import fs from 'node:fs';
import {
  detectQuestionPlaceholders,
  canMarkAsVerified,
  isStudentEligibleQuestion,
} from '@/services/question-validator';
import { QuestionBankService } from '@/services/question-bank';
import { SourceIngestionService } from '@/services/source-ingestion';
import { AssessmentEngine } from '@/services/assessment';
import { DailyPracticeService } from '@/services/daily-practice';

test('AUDIT 1: Placeholder Stem Patterns Are Detected and Rejected', () => {
  const sample1 = {
    question_bn: 'সিলেবাস ভিত্তিক Dental Science Part I প্রশ্ন #13: বিপিএসসি বিশেষ স্বাস্থ্য পরীক্ষার পাঠ্যক্রম অনুসারে নিচের কোনটি সত্য?',
    question_en: 'BPSC 51st Special BCS Health Syllabus Question #13 for Dental Science Part I: Which of the following is accurate?',
    options: {
      A: 'Real Option A',
      B: 'Real Option B',
      C: 'Real Option C',
      D: 'Real Option D',
    },
    correct_option: 'A',
    source_title: 'Guyton and Hall Textbook of Medical Physiology',
  };

  const issues = detectQuestionPlaceholders(sample1);
  assert.ok(issues.length > 0, 'Must detect placeholder stem issues');
  assert.ok(
    issues.some((i) => i.code === 'PLACEHOLDER_STEM_EN'),
    'Must flag English placeholder stem pattern'
  );
  assert.ok(
    issues.some((i) => i.code === 'PLACEHOLDER_STEM_BN'),
    'Must flag Bengali placeholder stem pattern'
  );

  const verifyCheck = canMarkAsVerified(sample1);
  assert.strictEqual(verifyCheck.valid, false, 'Placeholder stem must never be verified');
});

test('AUDIT 2: Generic Placeholder & Blank Options Are Detected and Rejected', () => {
  // Test Option format: "বিকল্প ক (Option A for question 13)"
  const samplePlaceholderOpts = {
    question_bn: 'মানবদেহের কোন অঙ্গে পিত্তরস তৈরি হয়?',
    question_en: 'Where is bile produced in the human body?',
    options: {
      A: 'বিকল্প ক (Option A for question 13)',
      B: 'বিকল্প খ (Option B for question 13)',
      C: 'বিকল্প গ (Option C for question 13)',
      D: 'বিকল্প ঘ (Option D for question 13)',
    },
    correct_option: 'A',
    source_title: 'Guyton Physiology',
  };

  const issues1 = detectQuestionPlaceholders(samplePlaceholderOpts);
  assert.ok(issues1.length >= 4, 'Must flag all 4 placeholder options');
  assert.strictEqual(canMarkAsVerified(samplePlaceholderOpts).valid, false);

  // Test blank/generic options
  const sampleGenericOpts = {
    question_bn: 'করোনারি ধমনী রক্ত সরবরাহ করে কোন অঙ্গে?',
    question_en: 'Which organ receives blood from coronary arteries?',
    options: {
      A: 'Option A',
      B: 'Option B',
      C: 'Option C',
      D: 'Option D',
    },
    correct_option: 'A',
    source_title: 'Gray Anatomy',
  };
  const issues2 = detectQuestionPlaceholders(sampleGenericOpts);
  assert.ok(issues2.length >= 4, 'Must flag generic options like Option A/B/C/D');
  assert.strictEqual(canMarkAsVerified(sampleGenericOpts).valid, false);

  // Test duplicate distractor options
  const sampleDuplicateOpts = {
    question_bn: 'করোনারি ধমনী রক্ত সরবরাহ করে কোন অঙ্গে?',
    question_en: 'Which organ receives blood from coronary arteries?',
    options: {
      A: 'হৃদপিণ্ড (Heart)',
      B: 'হৃদপিণ্ড (Heart)',
      C: 'ফুসফুস (Lungs)',
      D: 'যকৃৎ (Liver)',
    },
    correct_option: 'A',
    source_title: 'Gray Anatomy',
  };
  const issues3 = detectQuestionPlaceholders(sampleDuplicateOpts);
  assert.ok(
    issues3.some((i) => i.code === 'DUPLICATE_OPTIONS'),
    'Must flag duplicate options among choices'
  );
  assert.strictEqual(canMarkAsVerified(sampleDuplicateOpts).valid, false);
});

test('AUDIT 3: Missing Correct Answers & Missing Provenance Are Rejected', () => {
  // Missing correct answer
  const sampleNoAnswer = {
    question_bn: 'মানবদেহের বৃহত্তম গ্রন্থি কোনটি?',
    question_en: 'What is the largest gland in the human body?',
    options: {
      A: 'যকৃৎ (Liver)',
      B: 'অগ্ন্যাশয় (Pancreas)',
      C: 'থাইরয়েড (Thyroid)',
      D: 'পিটুইটারি (Pituitary)',
    },
    correct_option: null,
    source_title: 'Guyton Physiology',
  };
  assert.strictEqual(canMarkAsVerified(sampleNoAnswer).valid, false);

  // Missing source provenance
  const sampleNoSource = {
    question_bn: 'মানবদেহের বৃহত্তম গ্রন্থি কোনটি?',
    question_en: 'What is the largest gland in the human body?',
    options: {
      A: 'যকৃৎ (Liver)',
      B: 'অগ্ন্যাশয় (Pancreas)',
      C: 'থাইরয়েড (Thyroid)',
      D: 'পিটুইটারি (Pituitary)',
    },
    correct_option: 'A',
    source_title: '',
  };
  assert.strictEqual(canMarkAsVerified(sampleNoSource).valid, false);

  // Placeholder template source
  const samplePlaceholderSource = {
    question_bn: 'মানবদেহের বৃহত্তম গ্রন্থি কোনটি?',
    question_en: 'What is the largest gland in the human body?',
    options: {
      A: 'যকৃৎ (Liver)',
      B: 'অগ্ন্যাশয় (Pancreas)',
      C: 'থাইরয়েড (Thyroid)',
      D: 'পিটুইটারি (Pituitary)',
    },
    correct_option: 'A',
    source_title: '51st Special BCS Health Official Syllabus & Reference Corpus',
  };
  assert.strictEqual(canMarkAsVerified(samplePlaceholderSource).valid, false);
});

test('AUDIT 4: Valid Authentic Questions Pass Quality Validation', () => {
  const authenticQuestion = {
    id: 'BCS-MED1-001',
    subject: 'Medical Science Part I',
    topic: 'Anatomy, Embryology & Histology',
    subtopic: 'Cardiac Anatomy',
    question_bn: 'হৃদপিণ্ডের বাম নিলয় (Left Ventricle) থেকে রক্ত শরীরের প্রধান সংবহনতন্ত্রে প্রবেশ করে কোন প্রধান রক্তনালীর মাধ্যমে?',
    question_en: 'Oxygenated blood from the left ventricle is pumped directly into the systemic circulation via which major vessel?',
    options: {
      A: 'মহাধমনী বা অ্যাওর্টা (Ascending Aorta)',
      B: 'ফুসফুসীয় ধমনী (Pulmonary trunk)',
      C: 'উর্ধ্ব মহাশির (Superior Vena Cava)',
      D: 'ফুসফুসীয় শিরা (Pulmonary vein)',
    },
    correct_option: 'A',
    explanation_bn: 'বাম নিলয় সংকুচিত হয়ে অক্সিজেনযুক্ত রক্ত অ্যাওর্টিক ভালভের মধ্য দিয়ে অ্যাওর্টায় পাম্প করে।',
    explanation_en: 'The left ventricle pumps oxygen-rich blood into the ascending aorta across the aortic valve.',
    difficulty: 'easy',
    question_type: 'knowledge',
    source_title: 'Guyton and Hall Physiology & 42nd Special BCS Paper',
    source_url: null,
    source_page_or_section: 'Circulation Chapter 9',
    rights_status: 'public_official',
    verification_status: 'verified',
  };

  const issues = detectQuestionPlaceholders(authenticQuestion);
  assert.strictEqual(issues.length, 0, 'Authentic question should have 0 issues');
  assert.strictEqual(canMarkAsVerified(authenticQuestion).valid, true);
  assert.strictEqual(isStudentEligibleQuestion(authenticQuestion), true);
});

test('AUDIT 5: Verification Workflow Fails Closed', () => {
  // Test QuestionBankService.verifyQuestionRecord fails closed on placeholder question
  const placeholderId = 'BCS-MED1-031';
  const verifyAttempt = QuestionBankService.verifyQuestionRecord(
    placeholderId,
    'admin_reviewer_01',
    'Attempting to mark placeholder as verified'
  );

  assert.strictEqual(verifyAttempt.success, false, 'Must reject verifying placeholder question');
  assert.ok(
    verifyAttempt.errors && verifyAttempt.errors.length > 0,
    'Must provide specific validation error details'
  );

  // Test SourceIngestionService.reviewStagedItem fails closed on placeholder question
  const stagedBatch = SourceIngestionService.ingestQuestionBatch({
    sourceRegistryId: 'src-bpsc-51st-syllabus',
    jobType: 'manual_upload',
    fileName: 'placeholder_test.json',
    fileFormat: 'json',
    items: [
      {
        stemEn: 'BPSC 51st Special BCS Health Syllabus Question #99: Which of the following is accurate?',
        options: [
          { id: 'A', textEn: 'Option A for question 99' },
          { id: 'B', textEn: 'Option B for question 99' },
          { id: 'C', textEn: 'Option C for question 99' },
          { id: 'D', textEn: 'Option D for question 99' },
        ],
        correctAnswerId: 'A',
      },
    ],
  });

  const stagedItem = SourceIngestionService.getReviewQueue().find((i) => i.jobId === stagedBatch.job.id);
  assert.ok(stagedItem, 'Staged item must exist');

  assert.throws(
    () => {
      SourceIngestionService.reviewStagedItem({
        itemId: stagedItem.id,
        action: 'approve',
      });
    },
    /Cannot mark question as verified/,
    'Must throw error and reject approving placeholder question'
  );
});

test('AUDIT 6: Question Bank Audit — Exactly 128 Affected Records Preserved as needs_review', () => {
  const qbDir = path.join(process.cwd(), 'src', 'data', 'question_bank');
  const proFiles = [
    { file: 'medical_science_part1.jsonl', expectedTotal: 50, expectedVerified: 30, expectedNeedsReview: 20 },
    { file: 'medical_science_part2.jsonl', expectedTotal: 50, expectedVerified: 20, expectedNeedsReview: 30 },
    { file: 'dental_science_part1.jsonl', expectedTotal: 50, expectedVerified: 12, expectedNeedsReview: 38 },
    { file: 'dental_science_part2.jsonl', expectedTotal: 50, expectedVerified: 10, expectedNeedsReview: 40 },
  ];

  let totalVerified = 0;
  let totalNeedsReview = 0;

  for (const { file, expectedTotal, expectedVerified, expectedNeedsReview } of proFiles) {
    const fPath = path.join(qbDir, file);
    assert.ok(fs.existsSync(fPath), `File ${file} must exist`);

    const lines = fs.readFileSync(fPath, 'utf8').trim().split('\n');
    assert.strictEqual(lines.length, expectedTotal, `${file} must contain exactly ${expectedTotal} lines`);

    let ver = 0;
    let nr = 0;

    for (const line of lines) {
      const q = JSON.parse(line);
      if (q.verification_status === 'verified') {
        ver++;
        // Verified items MUST pass placeholder detection
        const issues = detectQuestionPlaceholders(q);
        assert.strictEqual(
          issues.length,
          0,
          `Question ${q.id} marked 'verified' must not have placeholder defects: ${JSON.stringify(issues)}`
        );
      } else if (q.verification_status === 'needs_review') {
        nr++;
        // Needs review items MUST preserve stable IDs and notes
        assert.ok(q.id.startsWith('BCS-'), `Question ${q.id} must preserve stable ID`);
        assert.ok(q.review_notes.includes('FLAGGED_PLACEHOLDER'), `Question ${q.id} must have FLAGGED_PLACEHOLDER notes`);
      }
    }

    assert.strictEqual(ver, expectedVerified, `${file} verified count must match authentic total`);
    assert.strictEqual(nr, expectedNeedsReview, `${file} needs_review count must match placeholder total`);
    totalVerified += ver;
    totalNeedsReview += nr;
  }

  assert.strictEqual(totalVerified, 72, 'Total authentic verified professional questions must be exactly 72');
  assert.strictEqual(totalNeedsReview, 128, 'Total affected placeholder questions must be exactly 128');
});

test('AUDIT 7: Student-Facing Isolation — Unverified Questions Are Never Served in Tests', () => {
  // 1. Platform questions pool
  const platformQuestions = QuestionBankService.getPlatformQuestions();
  const unverifiedInPlatform = platformQuestions.filter((q) => q.verificationState !== 'verified');
  assert.strictEqual(unverifiedInPlatform.length, 0, 'No unverified questions should ever be in platform questions');

  // Check that all 128 placeholder IDs are completely excluded from platform questions
  const placeholderIds = new Set<string>();
  for (let i = 31; i <= 50; i++) placeholderIds.add(`BCS-MED1-${String(i).padStart(3, '0')}`);
  for (let i = 21; i <= 50; i++) placeholderIds.add(`BCS-MED2-${String(i).padStart(3, '0')}`);
  for (let i = 13; i <= 50; i++) placeholderIds.add(`BCS-DEN1-${String(i).padStart(3, '0')}`);
  for (let i = 11; i <= 50; i++) placeholderIds.add(`BCS-DEN2-${String(i).padStart(3, '0')}`);
  assert.strictEqual(placeholderIds.size, 128, 'Must verify all 128 affected IDs');

  for (const q of platformQuestions) {
    assert.strictEqual(
      placeholderIds.has(q.id),
      false,
      `Placeholder question ${q.id} must NEVER appear in student platform questions pool`
    );
  }

  // 2. Mock Test Sessions
  const session = AssessmentEngine.createSession({
    userId: 'student_test_user',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    testType: 'full_mock',
  });

  for (const q of session.questions) {
    const rawId = q.questionId.split('-seq-')[0];
    assert.strictEqual(
      placeholderIds.has(rawId),
      false,
      `Mock test question ${q.questionId} must not be a placeholder question`
    );
  }

  // 3. Daily Practice Sessions
  const dailyPractice = DailyPracticeService.generatePracticeSet({
    userId: 'student_practice_user',
    examTrackId: 'special_bcs_health_51_2026',
    professionalStream: 'assistant_surgeon',
    practiceMode: 'mixed',
    questionCount: 20,
  });

  for (const q of dailyPractice.questions) {
    assert.strictEqual(
      placeholderIds.has(q.id),
      false,
      `Daily practice question ${q.id} must not be a placeholder question`
    );
  }
});
