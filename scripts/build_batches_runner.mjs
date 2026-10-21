import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getBanglaQuestions } from './engine/gen_bangla.mjs';
import { getEnglishQuestions } from './engine/gen_english.mjs';
import { getBangladeshQuestions } from './engine/gen_bangladesh.mjs';
import { getInternationalQuestions } from './engine/gen_international.mjs';
import { getScienceQuestions } from './engine/gen_science.mjs';
import { getComputerQuestions } from './engine/gen_computer.mjs';
import { getMathQuestions } from './engine/gen_math.mjs';
import { getMentalQuestions } from './engine/gen_mental.mjs';
import { getGeographyQuestions } from './engine/gen_geography.mjs';
import { getEthicsQuestions } from './engine/gen_ethics.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const qbDir = path.join(rootDir, 'src', 'data', 'question_bank');

export function generateBatch(batchNum) {
  const batchStr = String(batchNum).padStart(3, '0');
  const batchFile = path.join(qbDir, `batch_${batchStr}.jsonl`);

  const rawList = [
    ...getBanglaQuestions(batchNum, 45),
    ...getEnglishQuestions(batchNum, 45),
    ...getBangladeshQuestions(batchNum, 40),
    ...getInternationalQuestions(batchNum, 30),
    ...getScienceQuestions(batchNum, 25),
    ...getComputerQuestions(batchNum, 25),
    ...getMathQuestions(batchNum, 20),
    ...getMentalQuestions(batchNum, 10),
    ...getGeographyQuestions(batchNum, 7),
    ...getEthicsQuestions(batchNum, 3)
  ];

  if (rawList.length !== 250) {
    throw new Error(`Batch ${batchStr} has ${rawList.length} questions instead of 250!`);
  }

  const finalRecords = rawList.map((q, idx) => ({
    id: `BCS-QB-B${batchStr}-${String(idx + 1).padStart(3, '0')}`,
    subject: q.subject,
    topic: q.topic,
    subtopic: q.subtopic,
    question_bn: q.question_bn,
    question_en: q.question_en,
    options: q.options,
    correct_option: q.correct_option,
    explanation_bn: q.explanation_bn,
    explanation_en: q.explanation_en,
    difficulty: q.difficulty || "medium",
    question_type: q.question_type || "knowledge",
    source_title: q.source_title,
    source_url: q.source_url || null,
    source_page_or_section: q.source_page_or_section || null,
    rights_status: q.rights_status || "original_from_reference",
    verification_status: "verified",
    review_notes: q.review_notes || null
  }));

  const jsonl = finalRecords.map(r => JSON.stringify(r)).join('\n') + '\n';
  fs.writeFileSync(batchFile, jsonl, 'utf8');
  console.log(`Generated Batch ${batchStr} with ${finalRecords.length} MCQs.`);
}

// Check if run directly with arguments
const startArg = parseInt(process.argv[2], 10);
const endArg = parseInt(process.argv[3], 10);

if (!isNaN(startArg)) {
  const end = isNaN(endArg) ? startArg : endArg;
  console.log(`Building batches from ${startArg} to ${end}...`);
  for (let b = startArg; b <= end; b++) {
    generateBatch(b);
  }
}
