#!/usr/bin/env node
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const dist = new URL('../../dist/', import.meta.url).pathname;
const budgetGzip = 50 * 1024; // 50 KB
const errors = [];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.js')) out.push(p);
  }
  return out;
}

const jsFiles = exists(join(dist, '_astro')) ? walk(join(dist, '_astro')) : [];
function exists(p) {
  try { return statSync(p).isDirectory() || statSync(p).isFile(); } catch { return false; }
}

let totalGzip = 0;
for (const file of jsFiles) {
  const buf = readFileSync(file);
  const gz = gzipSync(buf).length;
  totalGzip += gz;
  console.log(`${(gz / 1024).toFixed(2)} KB gz\t${file.split('/_astro/')[1] || file}`);
  if (gz > budgetGzip) errors.push(`${file} exceeds ${budgetGzip} bytes gzip (${gz})`);
}

console.log(`Total JS gzip across chunks: ${(totalGzip / 1024).toFixed(2)} KB`);
// Per-page entry should be small; enforce each file under budget (already) and largest under 50KB
if (errors.length) {
  errors.forEach((e) => console.error('✗', e));
  process.exit(1);
}
console.log('JS budget audit passed');
