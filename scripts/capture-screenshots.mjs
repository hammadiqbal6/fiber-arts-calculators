#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';

const outDir = new URL('../docs/screenshots/', import.meta.url).pathname;
mkdirSync(outDir, { recursive: true });

const server = spawn('npx', ['serve', 'dist', '-l', '4173'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true,
});
await new Promise((r) => setTimeout(r, 1500));

const pages = [
  { name: 'home-360', path: '/' },
  { name: 'hub-knitting-360', path: '/knitting-crochet/' },
  { name: 'yarn-blanket-360', path: '/tools/yarn-blanket-calculator/' },
  { name: 'quilt-backing-360', path: '/tools/quilt-backing-calculator/' },
  { name: 'knitting-gauge-360', path: '/tools/knitting-gauge-calculator/' },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 360, height: 800 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();
for (const p of pages) {
  await page.goto(`http://localhost:4173${p.path}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${outDir}${p.name}.png`, fullPage: true });
  console.log('wrote', p.name);
}
await browser.close();
server.kill();
console.log('done', outDir);
