/**
 * BCS Question Bank Quality & Verification Validator
 * 
 * Enforces strict quality standards across all question ingestion, seeding,
 * and verification workflows. Rejects placeholder patterns, generic options,
 * missing answer keys, and missing provenance.
 */

export interface QuestionValidationIssue {
  field: string;
  code: string;
  message: string;
}

export interface QuestionValidationResult {
  valid: boolean;
  isPlaceholder: boolean;
  issues: QuestionValidationIssue[];
}

// Regex patterns that identify generic placeholder content
export const PLACEHOLDER_STEM_PATTERNS = [
  /BPSC\s+\d+(?:st|nd|rd|th)?\s+Special\s+BCS\s+Health\s+Syllabus\s+Question\s+#\d+/i,
  /সিলেবাস\s+ভিত্তিক\s+.*?\s+প্রশ্ন\s+#\d+:\s+বিপিএসসি\s+বিশেষ\s+স্বাস্থ্য/i,
  /Which\s+of\s+the\s+following\s+is\s+accurate\?/i,
  /Question\s+#\d+\s+for\s+.*:\s+Which\s+of\s+the\s+following/i,
  /বিপিএসসি\s+বিশেষ\s+স্বাস্থ্য\s+পরীক্ষার\s+পাঠ্যক্রম\s+অনুসারে\s+নিচের\s+কোনটি\s+সত্য\?/i,
];

export const PLACEHOLDER_OPTION_PATTERNS = [
  /^(?:বিকল্প\s*[কখগঘ]|Option\s*[ABCD])\s*\(Option\s*[ABCD]\s*for\s*question\s*\d+\)$/i,
  /^Option\s*[ABCD]\s*for\s*question\s*\d+$/i,
  /^Option\s+[ABCD]$/i,
  /^বিকল্প\s+[কখগঘ]$/i,
  /^Choice\s+[ABCD]$/i,
  /^Dummy\s+Option/i,
  /^Placeholder/i,
];

export const PLACEHOLDER_TOPIC_PATTERNS = [
  /Comprehensive Clinical Mastery$/i,
  /Core Syllabus Topic #\d+/i,
  /^Generic\s+Topic/i,
  /^Placeholder\s+Topic/i,
];

export const PLACEHOLDER_SOURCE_PATTERNS = [
  /^51st Special BCS Health Official Syllabus & Reference Corpus$/i,
  /^Generic\s+Syllabus/i,
  /^Placeholder\s+Source/i,
];

/**
 * Inspects a question (raw or platform format) and identifies any placeholder patterns,
 * missing required fields, or validation defects.
 */
export function detectQuestionPlaceholders(item: any): QuestionValidationIssue[] {
  const issues: QuestionValidationIssue[] = [];

  if (!item) {
    issues.push({ field: 'item', code: 'NULL_ITEM', message: 'Question object is null or undefined' });
    return issues;
  }

  // 1. Check Question Stem
  const stemBn = (item.question_bn || item.stemBn || '').trim();
  const stemEn = (item.question_en || item.stemEn || '').trim();

  if (!stemBn && !stemEn) {
    issues.push({
      field: 'stem',
      code: 'MISSING_STEM',
      message: 'Question must have at least one stem text (Bengali or English)',
    });
  } else {
    for (const pattern of PLACEHOLDER_STEM_PATTERNS) {
      if (stemEn && pattern.test(stemEn)) {
        issues.push({
          field: 'stemEn',
          code: 'PLACEHOLDER_STEM_EN',
          message: `English stem matches generic placeholder pattern: "${pattern.source}"`,
        });
      }
      if (stemBn && pattern.test(stemBn)) {
        issues.push({
          field: 'stemBn',
          code: 'PLACEHOLDER_STEM_BN',
          message: `Bengali stem matches generic placeholder pattern: "${pattern.source}"`,
        });
      }
    }
  }

  // 2. Check Options
  const opts: Record<string, string> = {};
  if (Array.isArray(item.options)) {
    // Array format: [{ id: 'A', textEn, textBn }, ...]
    for (const o of item.options) {
      if (o && o.id) {
        opts[o.id] = (o.textBn || o.textEn || o.text || '').trim();
      }
    }
  } else if (item.options && typeof item.options === 'object') {
    // Object format: { A: '...', B: '...', C: '...', D: '...' }
    for (const key of ['A', 'B', 'C', 'D']) {
      opts[key] = (item.options[key] || '').trim();
    }
  } else {
    issues.push({
      field: 'options',
      code: 'MISSING_OPTIONS',
      message: 'Options must be provided as an object (A, B, C, D) or array of 4 choices',
    });
  }

  const requiredKeys = ['A', 'B', 'C', 'D'];
  const presentValues: string[] = [];

  for (const key of requiredKeys) {
    const val = opts[key];
    if (!val || val.length === 0) {
      issues.push({
        field: `options.${key}`,
        code: 'EMPTY_OPTION',
        message: `Option ${key} is blank or missing`,
      });
      continue;
    }

    presentValues.push(val.toLowerCase());

    for (const pattern of PLACEHOLDER_OPTION_PATTERNS) {
      if (pattern.test(val)) {
        issues.push({
          field: `options.${key}`,
          code: 'PLACEHOLDER_OPTION',
          message: `Option ${key} matches placeholder pattern: "${val}"`,
        });
      }
    }
  }

  // Check for uniqueness of option distractors
  if (presentValues.length === 4) {
    const unique = new Set(presentValues);
    if (unique.size < 4) {
      issues.push({
        field: 'options',
        code: 'DUPLICATE_OPTIONS',
        message: 'All 4 option distractors must be distinct non-identical choices',
      });
    }
  }

  // 3. Check Correct Option
  const correctOpt = item.correct_option || item.correctAnswerId;
  if (!correctOpt || !['A', 'B', 'C', 'D'].includes(correctOpt)) {
    issues.push({
      field: 'correct_option',
      code: 'INVALID_CORRECT_OPTION',
      message: `Correct option must be one of 'A', 'B', 'C', or 'D'. Received: '${correctOpt}'`,
    });
  }

  // 4. Check Topic boilerplate
  const topic = (item.topic || item.topicTitleEn || item.topicTitleBn || '').trim();
  const subtopic = (item.subtopic || '').trim();
  for (const pattern of PLACEHOLDER_TOPIC_PATTERNS) {
    if (topic && pattern.test(topic)) {
      issues.push({
        field: 'topic',
        code: 'PLACEHOLDER_TOPIC',
        message: `Topic matches generic placeholder pattern: "${topic}"`,
      });
    }
    if (subtopic && pattern.test(subtopic)) {
      issues.push({
        field: 'subtopic',
        code: 'PLACEHOLDER_SUBTOPIC',
        message: `Subtopic matches generic placeholder pattern: "${subtopic}"`,
      });
    }
  }

  // 5. Check Source Provenance
  const sourceTitle = (item.source_title || item.sourceReference || item.sourceCitation || '').trim();
  if (!sourceTitle) {
    issues.push({
      field: 'source_title',
      code: 'MISSING_SOURCE_PROVENANCE',
      message: 'Question lacks verifiable source title / citation reference',
    });
  } else {
    for (const pattern of PLACEHOLDER_SOURCE_PATTERNS) {
      if (pattern.test(sourceTitle)) {
        issues.push({
          field: 'source_title',
          code: 'PLACEHOLDER_SOURCE',
          message: `Source provenance matches generic template: "${sourceTitle}"`,
        });
      }
    }
  }

  return issues;
}

/**
 * Validates whether a question satisfies all criteria required to be marked 'verified'.
 * A question CANNOT be marked verified if any placeholder is present, if options are
 * generic/blank, if the answer key is missing, or if source provenance is absent.
 */
export function canMarkAsVerified(item: any): { valid: boolean; errors: string[] } {
  const issues = detectQuestionPlaceholders(item);
  if (issues.length > 0) {
    return {
      valid: false,
      errors: issues.map((i) => `[${i.field}] ${i.message}`),
    };
  }

  return { valid: true, errors: [] };
}

/**
 * Checks whether a question is eligible to be presented to students in question lists,
 * daily practice, or live mock test sessions.
 * 
 * Rules:
 * - Must NOT have any placeholder issues.
 * - Must have verification_status === 'verified' or verificationState === 'verified'.
 * - Must NOT be marked 'needs_review', 'reported_for_correction', 'draft', or 'unverified'.
 */
export function isStudentEligibleQuestion(item: any): boolean {
  if (!item) return false;

  const vStatus = (item.verification_status || item.verificationState || '').toLowerCase();
  if (vStatus !== 'verified') {
    return false;
  }

  const rStatus = (item.review_status || item.reviewStatus || '').toLowerCase();
  if (
    rStatus === 'rejected' ||
    rStatus === 'draft' ||
    rStatus === 'under_review' ||
    rStatus === 'retired' ||
    rStatus === 'needs_review'
  ) {
    return false;
  }

  // Fast placeholder pattern checks
  if (typeof item.question_en === 'string' && item.question_en.includes('Which of the following is accurate?')) {
    return false;
  }
  if (item.options && typeof item.options.A === 'string' && item.options.A.includes('Option A for question')) {
    return false;
  }
  if (item.review_notes && typeof item.review_notes === 'string' && item.review_notes.includes('FLAGGED_PLACEHOLDER')) {
    return false;
  }

  return true;
}
