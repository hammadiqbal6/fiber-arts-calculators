import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dist');
const errors = [];

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function resolveInternal(href) {
  if (!href.startsWith('/')) return null;
  if (href.startsWith('/#')) return null;
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '/') return path.join(dist, 'index.html');
  const asDir = path.join(dist, clean.replace(/^\//, ''), 'index.html');
  if (fs.existsSync(asDir)) return asDir;
  const asFile = path.join(dist, clean.replace(/^\//, ''));
  if (fs.existsSync(asFile)) return asFile;
  return null;
}

for (const file of walk(dist)) {
  if (file.includes(`${path.sep}embed${path.sep}`)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file);
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('#')) continue;
    if (href.endsWith('.xml') || href.endsWith('.txt') || href.endsWith('.svg') || href.endsWith('.webmanifest')) {
      const f = path.join(dist, href.replace(/^\//, ''));
      if (!fs.existsSync(f)) errors.push(`${rel} -> missing asset ${href}`);
      continue;
    }
    if (href.startsWith('/')) {
      const resolved = resolveInternal(href);
      if (!resolved) errors.push(`${rel} -> broken ${href}`);
    }
  }
}

console.log(`Link check: ${errors.length} errors`);
if (errors.length) {
  for (const e of errors.slice(0, 50)) console.error('ERR', e);
  if (errors.length > 50) console.error(`...and ${errors.length - 50} more`);
  process.exit(1);
}
console.log('Link check passed');
