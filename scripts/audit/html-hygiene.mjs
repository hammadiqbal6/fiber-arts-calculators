#!/usr/bin/env node
/**
 * CI check: built HTML must not contain literal "\n" text nodes
 * or glued link text like "the<a href".
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../../dist/', import.meta.url).pathname;
const errors = [];

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

const pages = walk(dist);
if (!pages.length) {
  console.error('html-hygiene: no HTML in dist/ — run build first');
  process.exit(1);
}

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(dist, '');
  if (html.includes('\\n')) {
    errors.push(`${rel}: contains literal \\n sequence`);
  }
  // glued lowercase/comma letter immediately before <a href
  const glued = html.match(/[a-z,]<a\s+href=/gi);
  if (glued?.length) {
    errors.push(`${rel}: ${glued.length} missing space(s) before <a href`);
  }
}

if (errors.length) {
  console.error('html-hygiene failed:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}
console.log(`html-hygiene: ok (${pages.length} HTML files)`);
