#!/usr/bin/env node
/**
 * Generate favicon/PNG/OG assets from the brand mark (no external deps).
 * Pure zlib PNG writer for solid + simple shapes.
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '../public');

const BRAND = [0x2f, 0x5d, 0x50];
const CREAM = [0xf3, 0xef, 0xe6];
const ACCENT = [0xc4, 0x5c, 0x26];
const SOFT = [0xe8, 0xc4, 0xa8];
const INK = [0x1c, 0x24, 0x21];

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
      const [r, g, b, a = 255] = paint(x, y, width, height);
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
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function drawMark(x, y, w, h, { pad = 0.1, opaque = true, maskable = false } = {}) {
  const bg = opaque || maskable ? BRAND : null;
  const cx = w / 2;
  const cy = h / 2;
  const scale = Math.min(w, h) * (maskable ? 0.55 : 1 - pad * 2);
  const left = cx - scale / 2;
  const top = cy - scale / 2;
  // relative coords in mark space 0..64
  const toLocal = (px, py) => [(px - left) / scale * 64, (py - top) / scale * 64];
  return (px, py) => {
    if (px < 0 || py < 0 || px >= w || py >= h) return [0, 0, 0, 0];
    if (bg) {
      // outside rounded rect → brand fill for opaque/maskable
    }
    const [lx, ly] = toLocal(px, py);
    const inMark = lx >= 0 && ly >= 0 && lx <= 64 && ly <= 64;
    if (!inMark) {
      if (bg) return [...bg, 255];
      return [0, 0, 0, 0];
    }
    // rounded rect background of mark
    const rr = 12;
    const inCorner = (ox, oy) => ox * ox + oy * oy > rr * rr;
    let inside = true;
    if (lx < rr && ly < rr && inCorner(rr - lx, rr - ly)) inside = false;
    if (lx > 64 - rr && ly < rr && inCorner(lx - (64 - rr), rr - ly)) inside = false;
    if (lx < rr && ly > 64 - rr && inCorner(rr - lx, ly - (64 - rr))) inside = false;
    if (lx > 64 - rr && ly > 64 - rr && inCorner(lx - (64 - rr), ly - (64 - rr))) inside = false;
    if (!inside) {
      if (bg) return [...bg, 255];
      return [0, 0, 0, 0];
    }
    // yarn arc stroke approx
    const arcY = 40 + 18 * Math.sin(((lx - 18) / 28) * Math.PI);
    const onArc = Math.abs(ly - (40 - 18 * Math.sin(((lx - 18) / 28) * Math.PI))) < 2.2 && lx >= 18 && lx <= 46;
    // simpler: distance to quadratic
    const t = (lx - 18) / 28;
    const expectedY = 40 - 18 * Math.sin(Math.max(0, Math.min(1, t)) * Math.PI);
    const nearArc = lx >= 16 && lx <= 48 && Math.abs(ly - expectedY) < 2.4;
    const d1 = (lx - 24) ** 2 + (ly - 24) ** 2;
    const d2 = (lx - 40) ** 2 + (ly - 22) ** 2;
    if (d1 < 16) return [...ACCENT, 255];
    if (d2 < 9) return [...SOFT, 255];
    if (nearArc) return [...CREAM, 255];
    return [...BRAND, 255];
  };
}

function writePng(name, size, opts) {
  const paint = drawMark(0, 0, size, size, opts);
  const buf = pngRGBA(size, size, (x, y) => paint(x, y));
  writeFileSync(join(out, name), buf);
  console.log('wrote', name, size);
}

// Icon set per playbook
writePng('favicon-96x96.png', 96, { opaque: true });
writePng('apple-touch-icon.png', 180, { opaque: true, pad: 0.1 });
writePng('web-app-manifest-192x192.png', 192, { opaque: true });
writePng('web-app-manifest-512x512.png', 512, { opaque: true });
writePng('maskable-icon-512x512.png', 512, { maskable: true, opaque: true });
writePng('logo-512.png', 512, { opaque: true });
writePng('favicon-16x16.png', 16, { opaque: true });
writePng('favicon-32x32.png', 32, { opaque: true });

// OG 1200x630
const og = pngRGBA(1200, 630, (x, y) => {
  // cream gradient background
  const t = y / 630;
  const r = Math.round(0xf3 + (0xeb - 0xf3) * t);
  const g = Math.round(0xef + (0xe4 - 0xef) * t);
  const b = Math.round(0xe6 + (0xd8 - 0xe6) * t);
  // left brand panel
  if (x < 420) {
    const mark = drawMark(0, 0, 280, 280, { opaque: true });
    const mx = x - 70;
    const my = y - 175;
    if (mx >= 0 && my >= 0 && mx < 280 && my < 280) {
      return mark(mx, my);
    }
    return [...BRAND, 255];
  }
  // title area — soft dots for texture
  if ((x + y) % 47 === 0) return [0xe4, 0xdd, 0xd0, 255];
  return [r, g, b, 255];
});
writeFileSync(join(out, 'og-default.png'), og);
console.log('wrote og-default.png');

// Minimal ICO with 16+32+48 embedded PNGs (PNG-in-ICO)
function icoFromPngs(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const entries = [];
  let offset = 6 + count * 16;
  const bodies = [];
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry[0] = size >= 256 ? 0 : size;
    entry[1] = size >= 256 ? 0 : size;
    entry[2] = 0;
    entry[3] = 0;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    bodies.push(data);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...bodies]);
}

const ico = icoFromPngs([
  { size: 16, data: pngRGBA(16, 16, drawMark(0, 0, 16, 16, { opaque: true })) },
  { size: 32, data: pngRGBA(32, 32, drawMark(0, 0, 32, 32, { opaque: true })) },
  { size: 48, data: pngRGBA(48, 48, drawMark(0, 0, 48, 48, { opaque: true })) },
]);
writeFileSync(join(out, 'favicon.ico'), ico);
console.log('wrote favicon.ico');
