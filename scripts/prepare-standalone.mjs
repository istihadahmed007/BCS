import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const standaloneDir = path.join(rootDir, '.next', 'standalone');
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(standaloneDir, 'public');
const ecosystemSrc = path.join(rootDir, 'ecosystem.config.cjs');
const ecosystemDest = path.join(standaloneDir, 'ecosystem.config.cjs');

if (!fs.existsSync(standaloneDir)) {
  console.error('Error: .next/standalone directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

// Helper to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Packaging standalone bundle for Hostinger deployment...');

// Copy static assets
console.log('Copying .next/static -> .next/standalone/.next/static');
copyDir(staticSrc, staticDest);

// Copy public assets
if (fs.existsSync(publicSrc)) {
  console.log('Copying public -> .next/standalone/public');
  copyDir(publicSrc, publicDest);
}

// Copy PM2 ecosystem file
if (fs.existsSync(ecosystemSrc)) {
  console.log('Copying ecosystem.config.cjs -> .next/standalone/ecosystem.config.cjs');
  fs.copyFileSync(ecosystemSrc, ecosystemDest);
}

// Copy question bank and dataset to standalone runtime environment
const dataSrc = path.join(rootDir, 'src', 'data');
const dataDestSrc = path.join(standaloneDir, 'src', 'data');
const dataDestRoot = path.join(standaloneDir, 'data');

if (fs.existsSync(dataSrc)) {
  console.log('Copying src/data -> .next/standalone/src/data & .next/standalone/data');
  copyDir(dataSrc, dataDestSrc);
  copyDir(dataSrc, dataDestRoot);
}

// Generate deploy-hostinger.zip
const zipDest = path.join(rootDir, 'deploy-hostinger.zip');
try {
  console.log('Compressing standalone package into deploy-hostinger.zip...');
  execSync(`tar -a -c -f "${zipDest}" -C "${standaloneDir}" .`, { stdio: 'inherit' });
  console.log('✅ Generated deploy-hostinger.zip ready to upload to Hostinger!');
} catch (err) {
  console.warn('⚠️ Could not automatically generate zip with tar, manual zip may be needed:', err.message);
}

console.log('✅ Standalone package prepared successfully in .next/standalone');
console.log('You can now upload deploy-hostinger.zip to your Hostinger server.');
