import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const qbDir = path.join(rootDir, 'src', 'data', 'question_bank');

const VALID_SUBJECTS = [
  'Bangla',
  'English',
  'Mathematics',
  'Bangladesh Affairs',
  'International Affairs',
  'Science',
  'Computer and Information Technology',
  'Mental Ability',
  'Geography and Environment',
  'Ethics, Values and Good Governance',
  'Medical Science Part I',
  'Medical Science Part II',
  'Dental Science Part I',
  'Dental Science Part II',
  'Previous BCS Questions',
  'Model Questions'
];

const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];
const VALID_QUESTION_TYPES = [
  'knowledge',
  'comprehension',
  'application',
  'calculation',
  'reasoning',
  'grammar',
  'vocabulary',
  'scenario'
];
const VALID_RIGHTS = ['licensed', 'public_domain', 'original_from_reference', 'public_official', 'original', 'unknown'];
const VALID_VERIFICATION = ['verified', 'needs_review'];

const PLACEHOLDER_STEM_PATTERNS = [
  /BPSC\s+\d+(?:st|nd|rd|th)?\s+Special\s+BCS\s+Health\s+Syllabus\s+Question\s+#\d+/i,
  /সিলেবাস\s+ভিত্তিক\s+.*?\s+প্রশ্ন\s+#\d+:\s+বিপিএসসি\s+বিশেষ\s+স্বাস্থ্য/i,
  /Which\s+of\s+the\s+following\s+is\s+accurate\?/i,
  /Question\s+#\d+\s+for\s+.*:\s+Which\s+of\s+the\s+following/i,
  /বিপিএসসি\s+বিশেষ\s+স্বাস্থ্য\s+পরীক্ষার\s+পাঠ্যক্রম\s+অনুসারে\s+নিচের\s+কোনটি\s+সত্য\?/i,
];

const PLACEHOLDER_OPTION_PATTERNS = [
  /^(?:বিকল্প\s*[কখগঘ]|Option\s*[ABCD])\s*\(Option\s*[ABCD]\s*for\s*question\s*\d+\)$/i,
  /^Option\s*[ABCD]\s*for\s*question\s*\d+$/i,
  /^Option\s+[ABCD]$/i,
  /^বিকল্প\s+[কখগঘ]$/i,
  /^Choice\s+[ABCD]$/i,
  /^Dummy\s+Option/i,
  /^Placeholder/i,
];

const PLACEHOLDER_SOURCE_PATTERNS = [
  /^51st Special BCS Health Official Syllabus & Reference Corpus$/i,
  /^Generic\s+Syllabus/i,
  /^Placeholder\s+Source/i,
];

function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[\s\p{P}]+/gu, '')
    .trim();
}

function runValidation() {
  if (!fs.existsSync(qbDir)) {
    console.error('Question bank directory does not exist:', qbDir);
    process.exit(1);
  }

  const files = fs.readdirSync(qbDir).filter(f => f.endsWith('.jsonl')).sort();
  if (files.length === 0) {
    console.log('No .jsonl batch files found in', qbDir);
    return;
  }

  const seenIds = new Set();
  const seenQuestionTexts = new Map();
  const stats = {
    totalRecords: 0,
    validRecords: 0,
    errors: [],
    duplicates: 0,
    bySubject: {},
    byDifficulty: {},
    byQuestionType: {},
    byVerification: {}
  };

  for (const sub of VALID_SUBJECTS) stats.bySubject[sub] = 0;
  for (const diff of VALID_DIFFICULTIES) stats.byDifficulty[diff] = 0;
  for (const qt of VALID_QUESTION_TYPES) stats.byQuestionType[qt] = 0;
  for (const ver of VALID_VERIFICATION) stats.byVerification[ver] = 0;

  for (const file of files) {
    const filePath = path.join(qbDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      stats.totalRecords++;
      const lineRef = `${file}:${lineIdx + 1}`;

      let record;
      try {
        record = JSON.parse(trimmed);
      } catch (err) {
        stats.errors.push(`${lineRef}: Invalid JSON - ${err.message}`);
        return;
      }

      // Check ID
      if (!record.id || typeof record.id !== 'string') {
        stats.errors.push(`${lineRef}: Missing or invalid 'id'`);
        return;
      }
      if (seenIds.has(record.id)) {
        stats.errors.push(`${lineRef}: Duplicate id '${record.id}'`);
        stats.duplicates++;
        return;
      }
      seenIds.add(record.id);

      // Check Subject
      if (!VALID_SUBJECTS.includes(record.subject)) {
        stats.errors.push(`${lineRef}: Invalid subject '${record.subject}'`);
        return;
      }

      // Check options
      if (!record.options || typeof record.options !== 'object') {
        stats.errors.push(`${lineRef}: Missing options object`);
        return;
      }
      const opts = record.options;
      for (const key of ['A', 'B', 'C', 'D']) {
        if (!opts[key] || typeof opts[key] !== 'string') {
          stats.errors.push(`${lineRef}: Option ${key} is missing or not a string`);
          return;
        }
      }

      // Check distractor uniqueness
      const optValues = [opts.A.trim(), opts.B.trim(), opts.C.trim(), opts.D.trim()];
      const uniqueOpts = new Set(optValues);
      if (uniqueOpts.size < 4) {
        stats.errors.push(`${lineRef}: Duplicate options found among choices: ${JSON.stringify(opts)}`);
        return;
      }

      // Check correct option
      if (!['A', 'B', 'C', 'D'].includes(record.correct_option)) {
        stats.errors.push(`${lineRef}: Invalid correct_option '${record.correct_option}'`);
        return;
      }

      // Check question text
      if (!record.question_bn && !record.question_en) {
        stats.errors.push(`${lineRef}: Both question_bn and question_en are null or empty`);
        return;
      }

      // Check question deduplication
      const normBn = normalizeText(record.question_bn);
      const normEn = normalizeText(record.question_en);
      const key = `${record.subject}::${normBn || normEn}`;
      if (seenQuestionTexts.has(key)) {
        stats.errors.push(`${lineRef}: Duplicate question text with ${seenQuestionTexts.get(key)}`);
        stats.duplicates++;
        return;
      }
      seenQuestionTexts.set(key, lineRef);

      // Check enums
      if (!VALID_DIFFICULTIES.includes(record.difficulty)) {
        stats.errors.push(`${lineRef}: Invalid difficulty '${record.difficulty}'`);
        return;
      }
      if (!VALID_QUESTION_TYPES.includes(record.question_type)) {
        stats.errors.push(`${lineRef}: Invalid question_type '${record.question_type}'`);
        return;
      }
      if (!VALID_RIGHTS.includes(record.rights_status)) {
        stats.errors.push(`${lineRef}: Invalid rights_status '${record.rights_status}'`);
        return;
      }
      if (!VALID_VERIFICATION.includes(record.verification_status)) {
        stats.errors.push(`${lineRef}: Invalid verification_status '${record.verification_status}'`);
        return;
      }

      // Check for placeholder patterns and required provenance
      const placeholderIssues = [];
      const stemBn = (record.question_bn || '').trim();
      const stemEn = (record.question_en || '').trim();

      for (const pat of PLACEHOLDER_STEM_PATTERNS) {
        if (stemEn && pat.test(stemEn)) placeholderIssues.push(`stemEn matches placeholder "${pat.source}"`);
        if (stemBn && pat.test(stemBn)) placeholderIssues.push(`stemBn matches placeholder "${pat.source}"`);
      }

      for (const key of ['A', 'B', 'C', 'D']) {
        const val = opts[key].trim();
        for (const pat of PLACEHOLDER_OPTION_PATTERNS) {
          if (pat.test(val)) placeholderIssues.push(`option ${key} matches placeholder "${val}"`);
        }
      }

      const srcTitle = (record.source_title || '').trim();
      if (!srcTitle) {
        placeholderIssues.push('missing source_title');
      } else {
        for (const pat of PLACEHOLDER_SOURCE_PATTERNS) {
          if (pat.test(srcTitle)) placeholderIssues.push(`source_title matches placeholder "${srcTitle}"`);
        }
      }

      if (record.verification_status === 'verified') {
        if (placeholderIssues.length > 0) {
          stats.errors.push(`${lineRef}: Question '${record.id}' marked 'verified' contains placeholder defects or missing provenance: ${placeholderIssues.join('; ')}`);
          return;
        }
      } else if (record.verification_status === 'needs_review') {
        stats.placeholderFlagged = (stats.placeholderFlagged || 0) + (placeholderIssues.length > 0 ? 1 : 0);
      }

      // Tally stats
      stats.validRecords++;
      stats.bySubject[record.subject]++;
      stats.byDifficulty[record.difficulty]++;
      stats.byQuestionType[record.question_type]++;
      stats.byVerification[record.verification_status]++;
    });
  }

  console.log('====================================================');
  console.log('       BCS QUESTION BANK VALIDATION REPORT          ');
  console.log('====================================================');
  console.log(`Total Records Processed : ${stats.totalRecords}`);
  console.log(`Valid Records Audited   : ${stats.validRecords}`);
  console.log(`Flagged Placeholder QA : ${stats.placeholderFlagged || 0} (Held in needs_review)`);
  console.log(`Duplicate Errors        : ${stats.duplicates}`);
  console.log(`Validation Errors       : ${stats.errors.length}`);
  console.log('----------------------------------------------------');
  console.log('Subject Breakdown:');
  for (const [sub, count] of Object.entries(stats.bySubject)) {
    if (count > 0) console.log(`  - ${sub.padEnd(38)}: ${count}`);
  }
  console.log('----------------------------------------------------');
  console.log('Difficulty Breakdown:');
  for (const [diff, count] of Object.entries(stats.byDifficulty)) {
    console.log(`  - ${diff.padEnd(10)}: ${count} (${((count / (stats.validRecords || 1)) * 100).toFixed(1)}%)`);
  }
  console.log('----------------------------------------------------');
  console.log('Question Type Breakdown:');
  for (const [qt, count] of Object.entries(stats.byQuestionType)) {
    if (count > 0) console.log(`  - ${qt.padEnd(15)}: ${count}`);
  }
  console.log('----------------------------------------------------');
  console.log('Verification Status:');
  for (const [ver, count] of Object.entries(stats.byVerification)) {
    console.log(`  - ${ver.padEnd(15)}: ${count}`);
  }
  console.log('====================================================');

  if (stats.errors.length > 0) {
    console.error('\nErrors encountered (first 10):');
    stats.errors.slice(0, 10).forEach(e => console.error('  ⚠️', e));
    process.exit(1);
  } else {
    console.log('\n✅ ALL RECORDS PASSED 100% SCHEMA VALIDATION AND DEDUPLICATION CHECKS!');
  }
}

runValidation();
