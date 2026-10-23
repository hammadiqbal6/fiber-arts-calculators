#!/usr/bin/env node
/**
 * Per-page OG PNGs (1200×630) with no heavy deps — pure zlib PNG + tiny bitmap font.
 * Writes public/og/<slug>.png for tools and guides listed in the registries.
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public/og');

const BRAND = [0x2f, 0x5d, 0x50];
const CREAM = [0xf3, 0xef, 0xe6];
const ACCENT = [0xc4, 0x5c, 0x26];
const INK = [0x1c, 0x24, 0x21];

const GLYPHS = {
  ' ': [0, 0, 0, 0, 0, 0, 0],
  '-': [0, 0, 0, 31, 0, 0, 0],
  '&': [12, 18, 12, 45, 18, 18, 13],
  '/': [1, 2, 4, 8, 16, 0, 0],
  ':': [0, 4, 0, 0, 4, 0, 0],
  "'": [4, 4, 0, 0, 0, 0, 0],
  A: [14, 17, 17, 31, 17, 17, 17],
  B: [30, 17, 17, 30, 17, 17, 30],
  C: [14, 17, 16, 16, 16, 17, 14],
  D: [30, 17, 17, 17, 17, 17, 30],
  E: [31, 16, 16, 30, 16, 16, 31],
  F: [31, 16, 16, 30, 16, 16, 16],
  G: [14, 17, 16, 19, 17, 17, 14],
  H: [17, 17, 17, 31, 17, 17, 17],
  I: [14, 4, 4, 4, 4, 4, 14],
  J: [1, 1, 1, 1, 17, 17, 14],
  K: [17, 18, 20, 24, 20, 18, 17],
  L: [16, 16, 16, 16, 16, 16, 31],
  M: [17, 27, 21, 21, 17, 17, 17],
  N: [17, 25, 21, 19, 17, 17, 17],
  O: [14, 17, 17, 17, 17, 17, 14],
  P: [30, 17, 17, 30, 16, 16, 16],
  Q: [14, 17, 17, 17, 21, 18, 13],
  R: [30, 17, 17, 30, 20, 18, 17],
  S: [14, 17, 16, 14, 1, 17, 14],
  T: [31, 4, 4, 4, 4, 4, 4],
  U: [17, 17, 17, 17, 17, 17, 14],
  V: [17, 17, 17, 17, 17, 10, 4],
  W: [17, 17, 17, 21, 21, 21, 10],
  X: [17, 17, 10, 4, 10, 17, 17],
  Y: [17, 17, 10, 4, 4, 4, 4],
  Z: [31, 1, 2, 4, 8, 16, 31],
  0: [14, 17, 19, 21, 25, 17, 14],
  1: [4, 12, 4, 4, 4, 4, 14],
  2: [14, 17, 1, 2, 4, 8, 31],
  3: [30, 1, 1, 14, 1, 1, 30],
  4: [2, 6, 10, 18, 31, 2, 2],
  5: [31, 16, 30, 1, 1, 17, 14],
  6: [14, 16, 16, 30, 17, 17, 14],
  7: [31, 1, 2, 4, 8, 8, 8],
  8: [14, 17, 17, 14, 17, 17, 14],
  9: [14, 17, 17, 15, 1, 1, 14],
};

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function pngRGBA(width, height, paint) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    for (let x = 0; x < width; x++) {
      const i = y * (width * 4 + 1) + 1 + x * 4;
      const [r, g, b, a = 255] = paint(x, y);
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 6 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function drawText(pixels, w, text, startX, startY, scale, color) {
  let x = startX;
  const up = text.toUpperCase();
  for (const ch of up) {
    const g = GLYPHS[ch] || GLYPHS['-'];
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (g[row] & (1 << (4 - col))) {
          for (let dy = 0; dy < scale; dy++) {
            for (let dx = 0; dx < scale; dx++) {
              const px = x + col * scale + dx;
              const py = startY + row * scale + dy;
              if (px >= 0 && py >= 0 && px < w) {
                pixels[py * w + px] = color;
              }
            }
          }
        }
      }
    }
    x += 6 * scale;
  }
}

function wrapLines(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

function makeOg(title, subtitle = 'FiberCalc') {
  const W = 1200;
  const H = 630;
  const pixels = new Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let c = CREAM;
      if (x < 24) c = BRAND;
      if (y > H - 18) c = BRAND;
      if (y < 12) c = ACCENT;
      if (x > W - 200 && y < 200) {
        const t = ((x - (W - 200)) / 200 + (200 - y) / 200) / 2;
        c = [
          Math.round(CREAM[0] * (1 - t) + BRAND[0] * t * 0.35),
          Math.round(CREAM[1] * (1 - t) + BRAND[1] * t * 0.35),
          Math.round(CREAM[2] * (1 - t) + BRAND[2] * t * 0.35),
        ];
      }
      pixels[y * W + x] = c;
    }
  }
  drawText(pixels, W, subtitle, 56, 48, 4, BRAND);
  const lines = wrapLines(title, 28);
  let ty = 200;
  for (const line of lines) {
    drawText(pixels, W, line, 56, ty, 7, INK);
    ty += 7 * 7 + 18;
  }
  drawText(pixels, W, 'FREE IN-BROWSER CALCULATORS', 56, H - 80, 3, ACCENT);

  return pngRGBA(W, H, (x, y) => {
    const c = pixels[y * W + x] || CREAM;
    return [c[0], c[1], c[2], 255];
  });
}

function extractExports(filePath) {
  const text = readFileSync(filePath, 'utf8');
  const items = [];
  const objRe =
    /\{\s*slug:\s*['"]([^'"]+)['"][\s\S]*?title:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = objRe.exec(text))) {
    items.push({ slug: m[1], title: m[2] });
  }
  return items;
}

mkdirSync(outDir, { recursive: true });

const tools = extractExports(join(root, 'src/lib/tools.ts'));
const guides = [];
const guidesDir = join(root, 'src/data/guides');
const guidesIndex = join(root, 'src/data/guides.ts');

if (existsSync(guidesDir)) {
  for (const name of readdirSync(guidesDir)) {
    if (!name.endsWith('.ts') || name === 'index.ts' || name === 'types.ts') continue;
    for (const it of extractExports(join(guidesDir, name))) {
      if (!guides.some((g) => g.slug === it.slug)) guides.push(it);
    }
  }
}
if (existsSync(guidesIndex)) {
  for (const it of extractExports(guidesIndex)) {
    if (!guides.some((g) => g.slug === it.slug)) guides.push(it);
  }
}

const all = [
  ...tools.map((t) => ({ ...t, kind: 'tool' })),
  ...guides.map((g) => ({ ...g, kind: 'guide' })),
];

for (const item of all) {
  const buf = makeOg(item.title, item.kind === 'guide' ? 'FiberCalc Guide' : 'FiberCalc');
  writeFileSync(join(outDir, `${item.slug}.png`), buf);
  console.log('OG', item.slug);
}

console.log(`Wrote ${all.length} OG images to public/og/`);
