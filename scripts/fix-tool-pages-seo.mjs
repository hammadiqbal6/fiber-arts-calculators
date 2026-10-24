#!/usr/bin/env node
/**
 * One-shot transform for tool-pages.ts SEO fixes:
 * - shorten Limits boilerplate
 * - reconcile blanket yardage with calculator (0.55 × area × 1.10)
 * - add worked numbers to definitional answers
 * - expand thin FAQs
 * - page-specific sourceUsedFor
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = join(root, 'src/data/tool-pages.ts');
let src = readFileSync(file, 'utf8');

const SHORT_LIMITS =
  'Estimates run only in your browser. Prefer a published pattern’s tested yardage when it conflicts with this planner. Density factors and assumptions are documented on the methodology page; legal terms cover planning-use limits.';

// Replace every Limits section body (quoted string after the heading)
src = src.replace(
  /\["Limits, privacy, and how to use the results",\s*"[^"]*"\]/g,
  `["Limits and how to use the results", "${SHORT_LIMITS}"]`,
);

// Interface: add optional sourceUsedFor
if (!src.includes('sourceUsedFor')) {
  src = src.replace(
    'export interface ToolPageContent {\nslug: string; calc: string; h1: string; title: string; description: string; answer: string; form: string;\nsections: [string, string][]; faqs: [string, string][]; sources: [string, string][];\n}',
    `export interface ToolPageContent {
slug: string; calc: string; h1: string; title: string; description: string; answer: string; form: string;
sections: [string, string][]; faqs: [string, string][]; sources: [string, string][];
/** One-line “Used for” note applied to every source on this page */
sourceUsedFor?: string;
}`,
  );
}

// --- Blanket reconciliation (canonical: 50×60 worsted knit, dens 0.55, 10% waste = 1,815 yd / 10×200) ---
src = src.replace(
  /slug: "yarn-blanket-calculator",[\s\S]*?sources: \[\[/,
  (block) => {
    let b = block;
    b = b.replace(
      /h1: "Yarn Blanket Calculator: How Much Yarn for a Blanket\?"/,
      'h1: "Blanket Yarn Calculator: Yards & Skeins by Size"',
    );
    b = b.replace(
      /title: "Yarn Blanket Calculator"/,
      'title: "Blanket Yarn Calculator: Yards & Skeins"',
    );
    b = b.replace(
      /answer: "[^"]*",/,
      'answer: "A 50×60 inch worsted (category 4) knit throw needs about 1,815 yards with this tool’s default 10% waste (area 3,000 in² × density 0.55 × 1.10)—about 10 skeins at 200 yards. Crochet uses the same model ×1.28. Enter your size below.",',
    );
    b = b.replace(
      /\["Planning table and unit notes", "[^"]*"\]/,
      '["Planning table and unit notes", "Figures below match this calculator’s knit density table with 10% waste (worsted = 0.55 yd/in²). Lovey 12×12\\" ≈ 87 yd; baby 30×36\\" ≈ 653 yd; throw 50×60\\" ≈ 1,815 yd; twin 66×90\\" ≈ 3,594 yd. Crochet: multiply by 1.28. Convert yards to meters ×0.9144. Dense cables need more than the average—weigh a swatch when texture is heavy. Re-run after needle-size changes."]',
    );
    b = b.replace(
      /\["How much yarn for a throw blanket\?", "[^"]*"\]/,
      '["How much yarn for a throw blanket?", "This calculator’s default for a 50×60\\" worsted knit throw is about 1,815 yards (10 skeins at 200 yards with 10% waste). Without waste the same model is 1,650 yards (9 skeins). Dense stitches need more—run your skein length through the form."]',
    );
    b = b.replace(
      /\["Does crochet use more yarn than knitting\?", "[^"]*"\]/,
      '["Does crochet use more yarn than knitting?", "Yes. This tool multiplies knit density by 1.28 for crochet (about 25–30% more). A 50×60\\" worsted crochet throw is about 2,323 yards with 10% waste."]',
    );
    b = b.replace(
      /\["Should I buy an extra skein\?", "[^"]*"\]/,
      '["Should I buy an extra skein?", "Yes for large solids when dye lots matter. For the default throw estimate, 10 skeins of 200 yd already includes 10% waste; an 11th skein is insurance for borders or lot changes."]',
    );
    // Expand FAQs
    if (!b.includes('How many skeins for a queen blanket?')) {
      b = b.replace(
        /faqs: \[[\s\S]*?\],\n    sources:/,
        `faqs: [
      ["How much yarn for a throw blanket?", "This calculator’s default for a 50×60\\" worsted knit throw is about 1,815 yards (10 skeins at 200 yards with 10% waste). Without waste the same model is 1,650 yards (9 skeins). Dense stitches need more—run your skein length through the form."],
      ["Does crochet use more yarn than knitting?", "Yes. This tool multiplies knit density by 1.28 for crochet (about 25–30% more). A 50×60\\" worsted crochet throw is about 2,323 yards with 10% waste."],
      ["Should I buy an extra skein?", "Yes for large solids when dye lots matter. For the default throw estimate, 10 skeins of 200 yd already includes 10% waste; an 11th skein is insurance for borders or lot changes."],
      ["How many skeins for a baby blanket?", "A 30×36\\" worsted knit baby blanket is about 653 yards with 10% waste—round up to 4 skeins at 200 yards."],
      ["How many skeins for a twin-size cover?", "A 66×90\\" worsted knit cover is about 3,594 yards with 10% waste—about 18 skeins at 200 yards before borders."],
      ["Where do density factors come from?", "They are FiberCalc planning heuristics (not a CYC publication). Worsted knit uses 0.55 yards per square inch; see Methodology for the full table and honesty notes."],
    ],
    sourceUsedFor: "CYC weight categories for the density table; planning yardages are FiberCalc heuristics documented on Methodology.",
    sources:`,
      );
    }
    return b;
  },
);

// Definitional answers → add worked numbers
const answerFixes = [
  [
    'slug: "fabric-yardage-calculator"',
    'answer: "Fabric needed depends on project type, finished dimensions, fabric width, fullness (curtains), and pattern repeat. Enter those values below to estimate yards and meters\\u2014always confirm against pattern envelopes for garments."',
    'answer: "Fabric needed depends on project type, finished dimensions, fabric width, fullness (curtains), and pattern repeat. Example: a 48\\u00d784\\" curtain panel at 2\\u00d7 fullness on 54\\" fabric with 10% waste is about 5.9 yards\\u2014run your numbers below."',
  ],
  [
    'slug: "increase-decrease-calculator"',
    'answer: "To shape evenly, place the same number of increases or decreases at nearly equal stitch intervals. Enter current stitches and how many changes you need\\u2014the tool targets the new stitch count and drafts a spacing instruction for flat or in-the-round work."',
    'answer: "To shape evenly, place the same number of increases or decreases at nearly equal stitch intervals. Example: 100 stitches to 110 (10 increases) spaces changes about every 10 stitches\\u2014enter your counts below for a ready-to-knit instruction."',
  ],
  [
    'slug: "needle-hook-converter"',
    'answer: "Knitting needles and crochet hooks are labeled differently in the US, UK, and metric systems. Enter a size in any system to see the Craft Yarn Council\\u2013aligned equivalents in millimeters, US, and UK."',
    'answer: "Knitting needles and crochet hooks are labeled differently in the US, UK, and metric systems. Example: a US 8 knitting needle is 5.0 mm (UK 6). Enter any size below for CYC-aligned mm, US, and UK equivalents."',
  ],
  [
    'slug: "quilt-size-calculator"',
    'answer: "Finished quilt width = blocks across \\u00d7 block size + sashing between blocks + borders on both sides. Use \\u201cfrom blocks\\u201d to size a top, or \\u201cfit to target\\u201d to see how many blocks fit a twin, queen, or custom quilt."',
    'answer: "Finished quilt width = blocks across \\u00d7 block size + sashing between blocks + borders on both sides. Example: 12 blocks of 12\\" with 1\\" sashing and 3\\" borders finishes about 157\\" before you choose a mattress target\\u2014try the form below."',
  ],
  [
    'slug: "seam-allowance-calculator"',
    'answer: "Cut size = finished measurement + seam allowance \\u00d7 number of seam edges counted. Use the grading mode to step a measurement up or down by a constant grade between sizes, and ease mode to add wearing ease to a body measurement."',
    'answer: "Cut size = finished measurement + seam allowance \\u00d7 number of seam edges counted. Example: a 15\\" finished edge with 5/8\\" seams on both sides cuts at 16.25\\". Use grading or ease modes below for size steps."',
  ],
  [
    'slug: "yarn-substitution-calculator"',
    'answer: "To substitute yarn, keep fabric weight similar: convert original yards into grams using the old weight\\u2019s yards-per-100 g average, then back into yards for the new weight. Use the converter below for CYC categories 0\\u20137 and unit changes."',
    'answer: "To substitute yarn, keep fabric weight similar: convert original yards into grams using the old weight\\u2019s yards-per-100 g average, then back into yards for the new weight. Example: 400 yd of worsted (#4) usually needs more yards in DK (#3) for the same grams\\u2014try the converter below."',
  ],
];

for (const [, from, to] of answerFixes) {
  if (src.includes(from)) src = src.replace(from, to);
}

// Remove irrelevant sister-link motivation by emptying sister-links (handled in sister-links.ts)

// Per-tool sourceUsedFor for remaining tools (append before sources if missing)
const usedForBySlug = {
  'yarn-sweater-calculator': 'CYC yarn-weight and body-sizing charts for adult sweater planning ranges.',
  'yarn-hat-calculator': 'CYC yarn-weight and head-circumference charts for hat yardage planning.',
  'yarn-scarf-calculator': 'CYC yarn-weight categories for scarf and wrap yardage planning.',
  'yarn-amigurumi-calculator': 'CYC yarn-weight categories for small crochet toy yardage planning.',
  'yarn-substitution-calculator': 'CYC yarn-weight midpoints for grams↔yards substitution planning.',
  'knitting-gauge-calculator': 'CYC gauge conventions (stitches/rows per 4 inches) for swatch math.',
  'crochet-blanket-calculator': 'CYC yarn-weight and hook conventions for starting-chain estimates.',
  'increase-decrease-calculator': 'Even-shaping spacing arithmetic for knit/crochet rows and rounds.',
  'cast-on-calculator': 'CYC gauge and ease conventions for cast-on stitch counts.',
  'fabric-yardage-calculator': 'Standard fabric-width and fullness planning arithmetic for cut lists.',
  'quilt-size-calculator': 'Block/sashing/border arithmetic; mattress sizes via ISPA-linked reference.',
  'quilt-backing-calculator': 'Panel and overhang arithmetic for quilt backing yardage.',
  'quilt-binding-calculator': 'Perimeter and strip arithmetic; see also university extension binding guides.',
  'hst-calculator': 'Standard HST cut formulas (including 2/4/8-at-a-time methods).',
  'cross-stitch-fabric-calculator': 'Aida count ÷ stitch count fabric sizing with margin.',
  'needle-hook-converter': 'CYC Hooks & Needles size equivalents (mm / US / UK).',
  'seam-allowance-calculator': 'Seam-allowance, grade, and ease arithmetic for pattern pieces.',
};

for (const [slug, used] of Object.entries(usedForBySlug)) {
  const re = new RegExp(`(slug: "${slug}",[\\s\\S]*?)(\\n    sources:)`);
  if (re.test(src) && !src.includes(`slug: "${slug}"`) === false) {
    src = src.replace(re, (m, a, b) => {
      if (a.includes('sourceUsedFor')) return m;
      return `${a}\n    sourceUsedFor: ${JSON.stringify(used)},${b}`;
    });
  }
}

writeFileSync(file, src);
console.log('Updated', file);
