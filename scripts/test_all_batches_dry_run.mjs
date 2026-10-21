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

function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[\s\p{P}]+/gu, '')
    .trim();
}

console.log("Loading existing stems from Batches 001 to 004...");
const seenStems = new Map();

for (let b = 1; b <= 4; b++) {
  const batchFile = path.join(qbDir, `batch_${String(b).padStart(3, '0')}.jsonl`);
  if (!fs.existsSync(batchFile)) continue;
  const lines = fs.readFileSync(batchFile, 'utf8').split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const q = JSON.parse(line);
    const norm = normalizeText(q.question_bn);
    seenStems.set(norm, q.id);
  }
}
console.log(`Loaded ${seenStems.size} stems from Batches 001-004.`);

let totalCollisions = 0;
let totalOptionErrors = 0;

for (let b = 5; b <= 81; b++) {
  try {
    const list = [
      ...getBanglaQuestions(b, 45),
      ...getEnglishQuestions(b, 45),
      ...getBangladeshQuestions(b, 40),
      ...getInternationalQuestions(b, 30),
      ...getScienceQuestions(b, 25),
      ...getComputerQuestions(b, 25),
      ...getMathQuestions(b, 20),
      ...getMentalQuestions(b, 10),
      ...getGeographyQuestions(b, 7),
      ...getEthicsQuestions(b, 3)
    ];

    if (list.length !== 250) {
      console.error(`Batch ${b}: list length is ${list.length} instead of 250`);
    }

    list.forEach((q, idx) => {
      // Check options
      const optVals = Object.values(q.options);
      if (new Set(optVals).size !== 4) {
        console.error(`Batch ${b} Q${idx+1}: Duplicate options in ${q.question_bn}:`, q.options);
        totalOptionErrors++;
      }
      const norm = normalizeText(q.question_bn);
      if (seenStems.has(norm)) {
        console.error(`Batch ${b} Q${idx+1}: Stem collision with ${seenStems.get(norm)}: ${q.question_bn}`);
        totalCollisions++;
      } else {
        seenStems.set(norm, `Batch_${b}_Q${idx+1}`);
      }
    });
  } catch (err) {
    console.error(`Error in Batch ${b}:`, err.message);
    totalOptionErrors++;
  }
}

console.log("==========================================");
console.log(`Dry run complete across Batches 5 to 81.`);
console.log(`Total Stems Tracked: ${seenStems.size}`);
console.log(`Option Errors      : ${totalOptionErrors}`);
console.log(`Stem Collisions    : ${totalCollisions}`);
console.log("==========================================");

if (totalOptionErrors === 0 && totalCollisions === 0) {
  console.log("SUCCESS: All 20,000 question stems and options are 100% UNIQUE and VALID!");
}
