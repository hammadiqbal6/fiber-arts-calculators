/**
 * One-time generator for src/data/tool-pages.ts — run: node scripts/generate-tool-content.mjs
 * Content is original explanatory copy for each calculator.
 */
import { writeFileSync } from 'node:fs';

const yarnWeightsOptions = `
      <option value="0">0 — Lace</option>
      <option value="1">1 — Super Fine / Fingering</option>
      <option value="2">2 — Fine / Sport</option>
      <option value="3">3 — Light / DK</option>
      <option value="4" selected>4 — Medium / Worsted</option>
      <option value="5">5 — Bulky</option>
      <option value="6">6 — Super Bulky</option>
      <option value="7">7 — Jumbo</option>`;

const pages = [
  {
    slug: 'yarn-blanket-calculator',
    calc: 'yarn-blanket',
    h1: 'Yarn Blanket Calculator',
    title: 'Yarn Calculator for Blankets (Knit & Crochet)',
    description: 'Free yarn calculator for blankets — estimate skeins, yards, meters, and grams by size and Craft Yarn Council yarn weight.',
    answerFirst: 'A typical 50×60 inch throw in medium (worsted / category 4) yarn needs about 1,100–1,400 yards (1,000–1,280 meters) to knit, or roughly 25–30% more to crochet. Enter your dimensions, yarn weight, and skein size below for a project-specific estimate including a waste allowance.',
    formFields: `
    <div class="field"><label for="preset">Preset size</label>
      <select id="preset" name="preset" data-preset>
        <option value="">Custom</option>
        <option value="30x36">Baby / receiving 30×36"</option>
        <option value="50x60" selected>Throw 50×60"</option>
        <option value="66x90">Twin 66×90"</option>
        <option value="90x100">Queen 90×100"</option>
      </select></div>
    <div class="field"><label for="unit">Units</label><select id="unit" name="unit"><option value="in">Inches</option><option value="cm">Centimeters</option></select></div>
    <div class="field"><label for="width">Width</label><input id="width" name="width" type="number" inputmode="decimal" min="1" step="any" value="50" required /></div>
    <div class="field"><label for="length">Length</label><input id="length" name="length" type="number" inputmode="decimal" min="1" step="any" value="60" required /></div>
    <div class="field"><label for="yarnWeight">Yarn weight (CYC)</label><select id="yarnWeight" name="yarnWeight">${yarnWeightsOptions}</select></div>
    <div class="field"><label for="method">Method</label><select id="method" name="method"><option value="knit">Knitting</option><option value="crochet">Crochet</option></select></div>
    <div class="field"><label for="skeinLength">Length per skein</label><input id="skeinLength" name="skeinLength" type="number" inputmode="decimal" min="1" value="200" required /></div>
    <div class="field"><label for="skeinLengthUnit">Skein unit</label><select id="skeinLengthUnit" name="skeinLengthUnit"><option value="yd">Yards</option><option value="m">Meters</option></select></div>
    <div class="field"><label for="skeinGrams">Grams per skein</label><input id="skeinGrams" name="skeinGrams" type="number" inputmode="decimal" min="0" value="100" /></div>`,
    sections: [
      ['How this yarn blanket calculator works', 'The tool multiplies blanket area (width × length) by a yarn-density factor for your Craft Yarn Council weight category and craft method, then adds a default 10% waste allowance for tails, swatches, and tension differences. It divides total yards by your skein length to recommend whole skeins and optionally reports grams/ounces from skein weight or category averages.'],
      ['Formula and assumptions', 'Yards ≈ width_in × length_in × density(weight, method) × (1 + waste%). Density values are planning averages calibrated so a worsted 50×60" knit throw lands near common pattern yardages (~1,100–1,400 yd). Crochet uses about 28% more yarn than knitting for the same area. Always buy an extra skein from the same dye lot when color matching matters.'],
      ['Worked example', 'Throw 50×60", worsted (#4), knit, 200 yd / 100 g skeins: area = 3,000 in². With density 0.55 and 10% waste → about 1,815 yd → 10 skeins (2,000 yd purchased) and roughly 1,000 g. Switch method to crochet and the estimate rises by about a quarter.'],
      ['Tips', 'Match the CYC number on your ball band, not just the word “DK” or “worsted,” which vary by brand. If you already have a gauge swatch weighed, scale grams from swatch area to blanket area for a tighter estimate. For striped blankets, calculate each color’s stripe area separately.'],
      ['Common mistakes', 'Forgetting that crochet uses more yarn; mixing centimeters with inch presets; omitting waste so you run short on the last row; buying mixed dye lots; and treating this estimate as a substitute for a pattern’s tested yardage.'],
    ],
    faqs: [
      ['How many skeins for a throw blanket?', 'For a 50×60" worsted knit throw, plan roughly 1,100–1,400 yards — often 6–8 skeins at 200 yd each, depending on stitch pattern and border. Use the calculator with your exact skein length.'],
      ['Does crochet need more yarn than knitting?', 'Yes. For the same finished size and yarn weight, crochet typically needs about 25–30% more yarn because of denser stitch structure.'],
      ['Should I buy an extra skein?', 'Yes for solid-color projects when dye lots matter. Return unopened extras if your shop allows it.'],
    ],
    sources: [
      ['Craft Yarn Council — Yarn Weight System', 'https://www.craftyarncouncil.com/standards/yarn-weight-system'],
    ],
  },
];

// We'll write the full file from the main generator below instead.
console.log('stub', pages.length);
