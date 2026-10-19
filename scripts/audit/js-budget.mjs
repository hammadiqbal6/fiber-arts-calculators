import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dist');
const budgetGzip = 50 * 1024; // 50 KB gz initial JS per page target
const errors = [];

function walkHtml(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (!p.includes(`${path.sep}embed${path.sep}`)) walkHtml(p, out);
    } else if (ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function gzipSize(buf) {
  return zlib.gzipSync(buf).length;
}

const pages = walkHtml(dist);
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+_astro\/[^"]+\.js)"/g)].map((m) => m[1]);
  let total = 0;
  for (const src of scripts) {
    const local = path.join(dist, src.replace(/^\//, ''));
    if (!fs.existsSync(local)) continue;
    total += gzipSize(fs.readFileSync(local));
  }
  const rel = path.relative(dist, file);
  if (total > budgetGzip) {
    errors.push(`${rel}: JS gzip ${total} bytes > ${budgetGzip}`);
  }
}

// Also ensure no single chunk absurdly large
const astroDir = path.join(dist, '_astro');
if (fs.existsSync(astroDir)) {
  for (const f of fs.readdirSync(astroDir)) {
    if (!f.endsWith('.js')) continue;
    const gz = gzipSize(fs.readFileSync(path.join(astroDir, f)));
    if (gz > 40 * 1024) errors.push(`chunk ${f} gzip ${gz} too large`);
  }
}

console.log(`JS budget audit: ${pages.length} pages, ${errors.length} errors`);
if (errors.length) {
  for (const e of errors) console.error('ERR', e);
  process.exit(1);
}
console.log('JS budget audit passed');
