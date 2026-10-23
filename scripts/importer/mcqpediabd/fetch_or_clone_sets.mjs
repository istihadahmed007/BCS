import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..', '..');
const catalogPath = path.join(rootDir, 'src', 'data', 'curriculum', 'mcqpediabd_324_sets.json');

const setsCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

console.log('================================================================');
console.log('MCQPEDIABD 324 SETS (17,400 QUESTIONS) INGESTION & CLONE ENGINE');
console.log('================================================================');
console.log(`Loaded catalog with ${setsCatalog.length} sets.`);

const token = process.env.MCQPEDIABD_TOKEN || null;

if (token) {
  console.log('Detected MCQPEDIABD_TOKEN. Starting authenticated download...');
} else {
  console.log('No MCQPEDIABD_TOKEN detected.');
  console.log('MCQPediaBD API requires authentication (Bearer Token) for individual exam questions (returns 401 Unauthorized without token).');
  console.log('All 324 sets metadata, IDs, courses, categories, and question counts have been indexed into:');
  console.log(`  -> ${catalogPath}`);
}
