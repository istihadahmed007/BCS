import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { banglaQuestions } from './batch04_data/bangla.mjs';
import { englishQuestions } from './batch04_data/english.mjs';
import { bdAffairsQuestions } from './batch04_data/bangladesh.mjs';
import { intlAffairsQuestions } from './batch04_data/international.mjs';
import { scienceQuestions } from './batch04_data/science.mjs';
import { computerQuestions } from './batch04_data/computer.mjs';
import { mathQuestions } from './batch04_data/math.mjs';
import { mentalAbilityQuestions } from './batch04_data/mental.mjs';
import { geographyQuestions } from './batch04_data/geography.mjs';
import { ethicsQuestions } from './batch04_data/ethics.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const batchFile = path.join(rootDir, 'src', 'data', 'question_bank', 'batch_004.jsonl');

const questions = [];

function addQ(data) {
  questions.push({
    id: `BCS-QB-B04-${String(questions.length + 1).padStart(3, '0')}`,
    subject: data.subject,
    topic: data.topic,
    subtopic: data.subtopic,
    question_bn: data.question_bn,
    question_en: data.question_en,
    options: data.options,
    correct_option: data.correct_option,
    explanation_bn: data.explanation_bn,
    explanation_en: data.explanation_en,
    difficulty: data.difficulty,
    question_type: data.question_type,
    source_title: data.source_title,
    source_url: data.source_url || null,
    source_page_or_section: data.source_page_or_section || null,
    rights_status: data.rights_status || "original_from_reference",
    verification_status: "verified",
    review_notes: data.review_notes || null
  });
}

// 1. Bangla (45 Qs)
banglaQuestions.forEach(q => addQ(q));

// 2. English (45 Qs)
englishQuestions.forEach(q => addQ(q));

// 3. Bangladesh Affairs (40 Qs)
bdAffairsQuestions.forEach(q => addQ(q));

// 4. International Affairs (30 Qs)
intlAffairsQuestions.forEach(q => addQ(q));

// 5. Science (25 Qs)
scienceQuestions.forEach(q => addQ(q));

// 6. Computer & IT (25 Qs)
computerQuestions.forEach(q => addQ(q));

// 7. Mathematics (20 Qs)
mathQuestions.forEach(q => addQ(q));

// 8. Mental Ability (10 Qs)
mentalAbilityQuestions.forEach(q => addQ(q));

// 9. Geography & Environment (7 Qs)
geographyQuestions.forEach(q => addQ(q));

// 10. Ethics, Values & Good Governance (3 Qs)
ethicsQuestions.forEach(q => addQ(q));

console.log(`Assembled ${questions.length} questions for Batch 004.`);

const dir = path.dirname(batchFile);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const jsonlContent = questions.map(q => JSON.stringify(q)).join('\n') + '\n';
fs.writeFileSync(batchFile, jsonlContent, 'utf8');

console.log(`Successfully wrote ${questions.length} questions to ${batchFile}`);
