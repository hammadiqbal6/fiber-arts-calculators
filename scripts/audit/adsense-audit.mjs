import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../dist');
const errors = [];

function mustExist(urlPath) {
  const file =
    urlPath === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, urlPath.replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(file)) errors.push(`Missing required page: ${urlPath}`);
  return file;
}

for (const p of ['/', '/about/', '/contact/', '/privacy/', '/terms/', '/methodology/', '/authors/']) {
  mustExist(p);
}

const privacy = fs.readFileSync(path.join(dist, 'privacy/index.html'), 'utf8');
for (const needle of ['AdSense', 'cookie', 'aboutads.info', 'Google']) {
  if (!privacy.toLowerCase().includes(needle.toLowerCase())) {
    errors.push(`Privacy policy missing mention: ${needle}`);
  }
}

if (!fs.existsSync(path.join(dist, 'ads.txt'))) errors.push('missing ads.txt');

// Thin page check: about/contact should have substance
for (const p of ['about', 'contact', 'privacy', 'terms']) {
  const html = fs.readFileSync(path.join(dist, p, 'index.html'), 'utf8');
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  if (text.split(' ').length < 80) errors.push(`${p} page appears thin`);
}

// Ad slots reserved
const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!/ad-slot/.test(home)) errors.push('homepage missing reserved ad-slot markup');

console.log(`AdSense audit: ${errors.length} errors`);
if (errors.length) {
  for (const e of errors) console.error('ERR', e);
  process.exit(1);
}
console.log('AdSense audit passed');
