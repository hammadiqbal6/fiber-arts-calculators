#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../../dist/', import.meta.url).pathname;
const errors = [];

const required = ['about', 'contact', 'privacy', 'terms', 'methodology'];
for (const p of required) {
  const file = join(dist, p, 'index.html');
  if (!existsSync(file)) errors.push(`Missing required page: /${p}/`);
}

const privacy = join(dist, 'privacy', 'index.html');
if (existsSync(privacy)) {
  const html = readFileSync(privacy, 'utf8').toLowerCase();
  for (const phrase of ['adsense', 'cookie', 'doubleclick', 'opt out', 'analytics']) {
    if (!html.includes(phrase) && !(phrase === 'opt out' && html.includes('opt-out'))) {
      if (phrase === 'opt out' && html.includes('opt out')) continue;
      if (!html.includes(phrase.replace(' ', '-'))) errors.push(`Privacy policy missing mention: ${phrase}`);
    }
  }
}

const ads = join(dist, 'ads.txt');
if (!existsSync(ads)) errors.push('Missing ads.txt');

// thin page check on tools
import { readdirSync, statSync } from 'node:fs';
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name === 'index.html' && p.includes(`${join('tools')}`)) out.push(p);
  }
  return out;
}
const toolsDir = join(dist, 'tools');
if (existsSync(toolsDir)) {
  for (const file of walk(toolsDir)) {
    if (file.endsWith(`${join('tools', 'index.html')}`)) continue;
    const html = readFileSync(file, 'utf8');
    const text = html.replace(/<[^>]+>/g, ' ');
    const words = text.trim().split(/\s+/).length;
    if (words < 400) errors.push(`Thin tool page: ${file} (${words} words)`);
  }
}

if (errors.length) {
  errors.forEach((e) => console.error('✗', e));
  process.exit(1);
}
console.log('AdSense readiness audit passed');
