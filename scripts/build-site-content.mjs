import fs from 'node:fs';
import path from 'node:path';

const calcDir = 'src/components/calculators';
const toolsDir = 'src/pages/tools';
fs.mkdirSync(calcDir, { recursive: true });
fs.mkdirSync(toolsDir, { recursive: true });

const calculators = {
  YarnSweaterCalc: `---
import { YARN_WEIGHTS } from '../../data/yarn-weights';
import { SWEATER_CHEST_IN } from '../../data/sizes';
---
<div class="tool-panel" id="yarn-sweater-tool">
  <h2>Calculate sweater yarn</h2>
  <form id="yarn-sweater-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="size">Size preset (chest)</label>
      <select name="size" id="size">
        \${Object.entries(SWEATER_CHEST_IN).map(([k,v]) => \`<option value="\${v}">\${k.toUpperCase()} (\${v}")</option>\`).join('') || ''}
        ${Object.entries({ xs: 32, s: 36, m: 40, l: 44, xl: 48, '2xl': 52, '3xl': 56 })
          .map(
            ([k, v]) =>
              `<option value="${v}" ${k === 'm' ? 'selected' : ''}>${k.toUpperCase()} (${v}")</option>`,
          )
          .join('\n')}
      </select>
    </div>
    <div class="field"><label for="chest">Chest circumference (in)</label>
      <input type="number" inputmode="decimal" name="chest" id="chest" value="40" min="20" step="any" required /></div>
    <div class="field"><label for="length">Body length (in)</label>
      <input type="number" inputmode="decimal" name="length" id="length" value="25" min="10" step="any" required /></div>
    <div class="field"><label for="sleeve">Sleeve length (in)</label>
      <input type="number" inputmode="decimal" name="sleeve" id="sleeve" value="18" min="0" step="any" required /></div>
    <div class="field"><label for="yarn">Yarn weight (CYC)</label>
      <select name="yarn" id="yarn">
        ${yarnOptions(4)}
      </select></div>
    <div class="field"><label for="waste">Waste %</label>
      <input type="number" inputmode="decimal" name="waste" id="waste" value="15" min="0" max="40" /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { estimateSweaterYarn, num, readQuery, writeQuery, setResults, round, fromGrams } from '../../lib/client-calc';
  const form = document.getElementById('yarn-sweater-form');
  const root = document.getElementById('yarn-sweater-tool');
  const size = form.elements.namedItem('size');
  size.addEventListener('change', () => { form.elements.namedItem('chest').value = size.value; });
  function run() {
    const r = estimateSweaterYarn({
      chestIn: num(form.elements.namedItem('chest')),
      lengthIn: num(form.elements.namedItem('length')),
      sleeveLengthIn: num(form.elements.namedItem('sleeve')),
      yarnCategory: form.elements.namedItem('yarn').value,
      wastePercent: num(form.elements.namedItem('waste')),
    });
    setResults(root, [
      ['Yarn', r.yarnName],
      ['Meters', r.metersNeeded + ' m'],
      ['Yards', round(r.metersNeeded / 0.9144, 1) + ' yd'],
      ['Grams', r.gramsNeeded + ' g'],
      ['Ounces', round(fromGrams(r.gramsNeeded, 'oz'), 1) + ' oz'],
      ['Typical balls', String(r.ballsNeeded)],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`,
};

function yarnOptions(selected = '4') {
  const weights = [
    ['0', 'Lace'],
    ['1', 'Super Fine'],
    ['2', 'Fine'],
    ['3', 'Light (DK)'],
    ['4', 'Medium (Worsted)'],
    ['5', 'Bulky'],
    ['6', 'Super Bulky'],
    ['7', 'Jumbo'],
  ];
  return weights
    .map(
      ([c, n]) =>
        `<option value="${c}" ${String(selected) === c ? 'selected' : ''}>${c} – ${n}</option>`,
    )
    .join('\n');
}

// Fix YarnSweaterCalc - remove broken template
calculators.YarnSweaterCalc = `---
import { YARN_WEIGHTS } from '../../data/yarn-weights';
---
<div class="tool-panel" id="yarn-sweater-tool">
  <h2>Calculate sweater yarn</h2>
  <form id="yarn-sweater-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="size">Size preset (chest inches)</label>
      <select name="size" id="size">
        <option value="32">XS (32")</option>
        <option value="36">S (36")</option>
        <option value="40" selected>M (40")</option>
        <option value="44">L (44")</option>
        <option value="48">XL (48")</option>
        <option value="52">2XL (52")</option>
        <option value="56">3XL (56")</option>
      </select>
    </div>
    <div class="field"><label for="chest">Chest circumference (in)</label>
      <input type="number" inputmode="decimal" name="chest" id="chest" value="40" min="20" step="any" required /></div>
    <div class="field"><label for="length">Body length (in)</label>
      <input type="number" inputmode="decimal" name="length" id="length" value="25" min="10" step="any" required /></div>
    <div class="field"><label for="sleeve">Sleeve length (in)</label>
      <input type="number" inputmode="decimal" name="sleeve" id="sleeve" value="18" min="0" step="any" required /></div>
    <div class="field"><label for="yarn">Yarn weight (CYC)</label>
      <select name="yarn" id="yarn">${yarnOptions(4)}</select></div>
    <div class="field"><label for="waste">Waste %</label>
      <input type="number" inputmode="decimal" name="waste" id="waste" value="15" min="0" max="40" /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { estimateSweaterYarn, num, readQuery, writeQuery, setResults, round, fromGrams } from '../../lib/client-calc';
  const form = document.getElementById('yarn-sweater-form');
  const root = document.getElementById('yarn-sweater-tool');
  const size = form.elements.namedItem('size');
  size.addEventListener('change', () => { form.elements.namedItem('chest').value = size.value; });
  function run() {
    const r = estimateSweaterYarn({
      chestIn: num(form.elements.namedItem('chest')),
      lengthIn: num(form.elements.namedItem('length')),
      sleeveLengthIn: num(form.elements.namedItem('sleeve')),
      yarnCategory: form.elements.namedItem('yarn').value,
      wastePercent: num(form.elements.namedItem('waste')),
    });
    setResults(root, [
      ['Yarn', r.yarnName],
      ['Meters', r.metersNeeded + ' m'],
      ['Yards', round(r.metersNeeded / 0.9144, 1) + ' yd'],
      ['Grams', r.gramsNeeded + ' g'],
      ['Ounces', round(fromGrams(r.gramsNeeded, 'oz'), 1) + ' oz'],
      ['Typical balls', String(r.ballsNeeded)],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.YarnHatCalc = simpleYarnProject({
  id: 'yarn-hat',
  title: 'Calculate hat yarn',
  fields: `
    <div class="field"><label for="circ">Head circumference (in)</label>
      <input type="number" inputmode="decimal" name="circ" id="circ" value="22" min="10" step="any" required /></div>
    <div class="field"><label for="depth">Hat depth (in)</label>
      <input type="number" inputmode="decimal" name="depth" id="depth" value="8" min="4" step="any" required /></div>
    <div class="field"><label for="yarn">Yarn weight (CYC)</label><select name="yarn" id="yarn">${yarnOptions(4)}</select></div>
    <div class="field"><label for="waste">Waste %</label>
      <input type="number" inputmode="decimal" name="waste" id="waste" value="12" min="0" max="40" /></div>`,
  importFn: 'estimateHatYarn',
  call: `estimateHatYarn({ circumferenceIn: num(form.elements.namedItem('circ')), depthIn: num(form.elements.namedItem('depth')), yarnCategory: form.elements.namedItem('yarn').value, wastePercent: num(form.elements.namedItem('waste')) })`,
});

calculators.YarnScarfCalc = simpleYarnProject({
  id: 'yarn-scarf',
  title: 'Calculate scarf yarn',
  fields: `
    <div class="field"><label for="width">Width (in)</label>
      <input type="number" inputmode="decimal" name="width" id="width" value="8" min="2" step="any" required /></div>
    <div class="field"><label for="length">Length (in)</label>
      <input type="number" inputmode="decimal" name="length" id="length" value="60" min="10" step="any" required /></div>
    <div class="field"><label for="yarn">Yarn weight (CYC)</label><select name="yarn" id="yarn">${yarnOptions(4)}</select></div>
    <div class="field"><label for="craft">Craft</label><select name="craft" id="craft"><option value="knit">Knit</option><option value="crochet">Crochet</option></select></div>
    <div class="field"><label for="waste">Waste %</label>
      <input type="number" inputmode="decimal" name="waste" id="waste" value="10" min="0" max="40" /></div>`,
  importFn: 'estimateScarfYarn',
  call: `estimateScarfYarn({ widthIn: num(form.elements.namedItem('width')), lengthIn: num(form.elements.namedItem('length')), yarnCategory: form.elements.namedItem('yarn').value, wastePercent: num(form.elements.namedItem('waste')), craft: form.elements.namedItem('craft').value })`,
});

calculators.AmigurumiCalc = simpleYarnProject({
  id: 'amigurumi',
  title: 'Calculate amigurumi yarn',
  fields: `
    <div class="field"><label for="height">Finished height (in)</label>
      <input type="number" inputmode="decimal" name="height" id="height" value="6" min="1" step="any" required /></div>
    <div class="field"><label for="yarn">Yarn weight (CYC)</label><select name="yarn" id="yarn">${yarnOptions(3)}</select></div>
    <div class="field"><label for="density">Density factor</label>
      <input type="number" inputmode="decimal" name="density" id="density" value="1" min="0.7" max="1.5" step="0.05" />
      <p class="field-hint">1.0 typical; raise for tightly stuffed toys</p></div>`,
  importFn: 'estimateAmigurumiYarn',
  call: `estimateAmigurumiYarn({ heightIn: num(form.elements.namedItem('height')), yarnCategory: form.elements.namedItem('yarn').value, density: num(form.elements.namedItem('density')) })`,
});

function simpleYarnProject({ id, title, fields, importFn, call }) {
  return `---
---
<div class="tool-panel" id="${id}-tool">
  <h2>${title}</h2>
  <form id="${id}-form" class="tool-grid tool-grid--2">
    ${fields}
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { ${importFn}, num, readQuery, writeQuery, setResults, round, fromGrams } from '../../lib/client-calc';
  const form = document.getElementById('${id}-form');
  const root = document.getElementById('${id}-tool');
  function run() {
    const r = ${call};
    setResults(root, [
      ['Yarn', r.yarnName],
      ['Meters', r.metersNeeded + ' m'],
      ['Yards', round(r.metersNeeded / 0.9144, 1) + ' yd'],
      ['Grams', r.gramsNeeded + ' g'],
      ['Ounces', round(fromGrams(r.gramsNeeded, 'oz'), 1) + ' oz'],
      ['Typical balls', String(r.ballsNeeded)],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;
}

calculators.YarnSubCalc = `---
---
<div class="tool-panel" id="yarn-sub-tool">
  <h2>Convert yarn amounts between weights</h2>
  <form id="yarn-sub-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="orig">Original CYC weight</label><select name="orig" id="orig">${yarnOptions(4)}</select></div>
    <div class="field"><label for="sub">Substitute CYC weight</label><select name="sub" id="sub">${yarnOptions(3)}</select></div>
    <div class="field"><label for="meters">Original meters</label>
      <input type="number" inputmode="decimal" name="meters" id="meters" value="1000" min="1" step="any" required /></div>
    <div class="field"><label for="grams">Original grams (optional)</label>
      <input type="number" inputmode="decimal" name="grams" id="grams" value="" min="0" step="any" /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Convert</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button></div>
  </div>
</div>
<script>
  import { substituteYarn, num, readQuery, writeQuery, setResults, round } from '../../lib/client-calc';
  const form = document.getElementById('yarn-sub-form');
  const root = document.getElementById('yarn-sub-tool');
  function run() {
    const g = form.elements.namedItem('grams').value;
    const r = substituteYarn({
      originalCategory: form.elements.namedItem('orig').value,
      substituteCategory: form.elements.namedItem('sub').value,
      originalMeters: num(form.elements.namedItem('meters')),
      originalGrams: g === '' ? undefined : num(form.elements.namedItem('grams')),
    });
    setResults(root, [
      ['Recommended meters', r.recommendedMeters + ' m'],
      ['Recommended yards', round(r.recommendedMeters / 0.9144, 1) + ' yd'],
      ['Recommended grams', r.recommendedGrams + ' g'],
      ['Density ratio', String(r.gaugeRatio)],
      ['Note', r.note],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.GaugeCalc = `---
---
<div class="tool-panel" id="gauge-tool">
  <h2>Gauge, size & pattern resize</h2>
  <form id="gauge-form">
    <h3 class="visually-hidden">Swatch</h3>
    <div class="tool-grid tool-grid--2">
      <div class="field"><label for="sts">Stitches in swatch</label>
        <input type="number" inputmode="decimal" name="sts" id="sts" value="20" min="1" required /></div>
      <div class="field"><label for="rows">Rows in swatch</label>
        <input type="number" inputmode="decimal" name="rows" id="rows" value="28" min="1" required /></div>
      <div class="field"><label for="sw">Swatch width</label>
        <input type="number" inputmode="decimal" name="sw" id="sw" value="4" min="0.5" step="any" required /></div>
      <div class="field"><label for="sh">Swatch height</label>
        <input type="number" inputmode="decimal" name="sh" id="sh" value="4" min="0.5" step="any" required /></div>
      <div class="field"><label for="unit">Unit</label>
        <select name="unit" id="unit"><option value="in">Inches</option><option value="cm">Centimeters</option></select></div>
    </div>
    <h3 style="font-size:1rem;margin:1rem 0 0.5rem">Stitches → finished size</h3>
    <div class="tool-grid tool-grid--2">
      <div class="field"><label for="pstitches">Pattern stitches</label>
        <input type="number" inputmode="decimal" name="pstitches" id="pstitches" value="100" min="1" /></div>
      <div class="field"><label for="prows">Pattern rows</label>
        <input type="number" inputmode="decimal" name="prows" id="prows" value="120" min="1" /></div>
    </div>
    <h3 style="font-size:1rem;margin:1rem 0 0.5rem">Resize to your gauge</h3>
    <div class="tool-grid tool-grid--2">
      <div class="field"><label for="psts4">Pattern sts / 4"</label>
        <input type="number" inputmode="decimal" name="psts4" id="psts4" value="20" min="1" step="any" /></div>
      <div class="field"><label for="prows4">Pattern rows / 4"</label>
        <input type="number" inputmode="decimal" name="prows4" id="prows4" value="28" min="1" step="any" /></div>
    </div>
    <button type="submit" class="btn btn--primary" style="margin-top:0.75rem">Calculate</button>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { calculateGauge, stitchesToSize, resizePattern, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('gauge-form');
  const root = document.getElementById('gauge-tool');
  function run() {
    const unit = form.elements.namedItem('unit').value;
    const g = calculateGauge({
      stitchesInSwatch: num(form.elements.namedItem('sts')),
      rowsInSwatch: num(form.elements.namedItem('rows')),
      swatchWidth: num(form.elements.namedItem('sw')),
      swatchHeight: num(form.elements.namedItem('sh')),
      unit,
    });
    const size = stitchesToSize({
      stitches: num(form.elements.namedItem('pstitches')),
      rows: num(form.elements.namedItem('prows')),
      stitchesPer4in: g.stitchesPer4in,
      rowsPer4in: g.rowsPer4in,
    });
    const resized = resizePattern({
      patternStitchesPer4in: num(form.elements.namedItem('psts4')),
      patternRowsPer4in: num(form.elements.namedItem('prows4')),
      yourStitchesPer4in: g.stitchesPer4in,
      yourRowsPer4in: g.rowsPer4in,
      patternStitchCount: num(form.elements.namedItem('pstitches')),
      patternRowCount: num(form.elements.namedItem('prows')),
    });
    setResults(root, [
      ['Your gauge (sts/4")', String(g.stitchesPer4in)],
      ['Your gauge (rows/4")', String(g.rowsPer4in)],
      ['Sts / 10 cm', String(g.stitchesPer10cm)],
      ['Finished width', size.widthIn + ' in / ' + size.widthCm + ' cm'],
      ['Finished height', size.heightIn + ' in / ' + size.heightCm + ' cm'],
      ['Resized stitch count', String(resized.newStitchCount)],
      ['Resized row count', String(resized.newRowCount)],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.CrochetBlanketCalc = `---
import { BLANKET_SIZES } from '../../data/sizes';
---
<div class="tool-panel" id="crochet-blanket-tool">
  <h2>Crochet blanket stitch count</h2>
  <form id="crochet-blanket-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="preset">Preset</label>
      <select name="preset" id="preset">
        <option value="custom">Custom</option>
        ${[
          ['throw', 50, 60],
          ['crib', 36, 54],
          ['afghan', 50, 65],
          ['twin', 66, 90],
        ]
          .map(([id, w, l]) => `<option value="${id}" data-w="${w}" data-l="${l}">${id} (${w}×${l} in)</option>`)
          .join('')}
      </select></div>
    <div class="field"><label for="unit">Unit</label>
      <select name="unit" id="unit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field"><label for="width">Width</label>
      <input type="number" inputmode="decimal" name="width" id="width" value="40" min="1" step="any" required /></div>
    <div class="field"><label for="length">Length</label>
      <input type="number" inputmode="decimal" name="length" id="length" value="48" min="1" step="any" required /></div>
    <div class="field"><label for="sts4">Stitches per 4"</label>
      <input type="number" inputmode="decimal" name="sts4" id="sts4" value="14" min="1" step="any" required /></div>
    <div class="field"><label for="rows4">Rows per 4"</label>
      <input type="number" inputmode="decimal" name="rows4" id="rows4" value="15" min="1" step="any" required /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { crochetBlanketStitches, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('crochet-blanket-form');
  const root = document.getElementById('crochet-blanket-tool');
  form.elements.namedItem('preset').addEventListener('change', () => {
    const opt = form.elements.namedItem('preset').selectedOptions[0];
    if (opt.dataset.w) {
      form.elements.namedItem('width').value = opt.dataset.w;
      form.elements.namedItem('length').value = opt.dataset.l;
      form.elements.namedItem('unit').value = 'in';
    }
  });
  function run() {
    const r = crochetBlanketStitches({
      width: num(form.elements.namedItem('width')),
      length: num(form.elements.namedItem('length')),
      unit: form.elements.namedItem('unit').value,
      stitchesPer4in: num(form.elements.namedItem('sts4')),
      rowsPer4in: num(form.elements.namedItem('rows4')),
    });
    setResults(root, [
      ['Stitches across', String(r.stitchesWide)],
      ['Starting chain (≈)', String(r.startingChain)],
      ['Rows', String(r.rowsTall)],
      ['Approx. total stitches', String(r.totalStitchesApprox)],
      ['Size', r.widthIn + ' × ' + r.lengthIn + ' in'],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.IncDecCalc = `---
---
<div class="tool-panel" id="incdec-tool">
  <h2>Increase or decrease evenly</h2>
  <form id="incdec-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="current">Current stitches</label>
      <input type="number" inputmode="numeric" name="current" id="current" value="100" min="2" required /></div>
    <div class="field"><label for="target">Target stitches (optional)</label>
      <input type="number" inputmode="numeric" name="target" id="target" value="110" min="1" /></div>
    <div class="field"><label for="mode">Mode</label>
      <select name="mode" id="mode"><option value="increase">Increase</option><option value="decrease">Decrease</option></select></div>
    <div class="field"><label for="change">Or change by (stitches)</label>
      <input type="number" inputmode="numeric" name="change" id="change" value="10" min="1" /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl><p data-detail style="margin-top:0.75rem"></p>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button></div>
  </div>
</div>
<script>
  import { evenIncreaseDecrease, targetStitchChange, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('incdec-form');
  const root = document.getElementById('incdec-tool');
  function run() {
    const current = num(form.elements.namedItem('current'));
    const targetVal = form.elements.namedItem('target').value;
    let mode = form.elements.namedItem('mode').value;
    let changeBy = num(form.elements.namedItem('change'));
    if (targetVal !== '') {
      const t = targetStitchChange(current, num(form.elements.namedItem('target')));
      if (t.mode === 'none') {
        setResults(root, [['Status', 'Already at target stitch count']]);
        root.querySelector('[data-detail]').textContent = '';
        writeQuery(form); return;
      }
      mode = t.mode; changeBy = t.changeBy;
      form.elements.namedItem('mode').value = mode;
      form.elements.namedItem('change').value = String(changeBy);
    }
    const r = evenIncreaseDecrease({ currentStitches: current, changeBy, mode });
    setResults(root, [
      ['Mode', mode],
      ['Change by', String(changeBy)],
      ['Plain between (approx)', String(r.plainBetween)],
      ['Instructions', r.instructions],
    ]);
    root.querySelector('[data-detail]').textContent = r.detailed.join(' ');
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.CastOnCalc = `---
---
<div class="tool-panel" id="caston-tool">
  <h2>Cast-on stitch calculator</h2>
  <form id="caston-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="width">Desired width</label>
      <input type="number" inputmode="decimal" name="width" id="width" value="20" min="1" step="any" required /></div>
    <div class="field"><label for="unit">Unit</label>
      <select name="unit" id="unit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field"><label for="sts4">Stitches per 4"</label>
      <input type="number" inputmode="decimal" name="sts4" id="sts4" value="20" min="1" step="any" required /></div>
    <div class="field"><label for="edge">Edge / seam stitches</label>
      <input type="number" inputmode="numeric" name="edge" id="edge" value="0" min="0" /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { castOnStitches, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('caston-form');
  const root = document.getElementById('caston-tool');
  function run() {
    const n = castOnStitches({
      desiredWidth: num(form.elements.namedItem('width')),
      unit: form.elements.namedItem('unit').value,
      stitchesPer4in: num(form.elements.namedItem('sts4')),
      edgeStitches: num(form.elements.namedItem('edge')),
    });
    setResults(root, [['Cast on', n + ' stitches']]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.FabricCalc = `---
---
<div class="tool-panel" id="fabric-tool">
  <h2>Fabric yardage calculator</h2>
  <form id="fabric-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="type">Project type</label>
      <select name="type" id="type">
        <option value="garment">Garment</option>
        <option value="curtains">Curtains</option>
        <option value="upholstery">Upholstery</option>
        <option value="tablecloth">Tablecloth</option>
      </select></div>
    <div class="field"><label for="unit">Length unit</label>
      <select name="unit" id="unit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field"><label for="width">Piece / panel width</label>
      <input type="number" inputmode="decimal" name="width" id="width" value="40" min="1" step="any" required /></div>
    <div class="field"><label for="length">Piece / drop length</label>
      <input type="number" inputmode="decimal" name="length" id="length" value="84" min="1" step="any" required /></div>
    <div class="field"><label for="fwidth">Fabric width</label>
      <input type="number" inputmode="decimal" name="fwidth" id="fwidth" value="54" min="1" step="any" required /></div>
    <div class="field"><label for="fwunit">Fabric width unit</label>
      <select name="fwunit" id="fwunit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field"><label for="pieces">Number of pieces</label>
      <input type="number" inputmode="numeric" name="pieces" id="pieces" value="2" min="1" /></div>
    <div class="field"><label for="waste">Waste %</label>
      <input type="number" inputmode="decimal" name="waste" id="waste" value="10" min="0" max="40" /></div>
    <div class="field"><label for="repeat">Pattern repeat (optional)</label>
      <input type="number" inputmode="decimal" name="repeat" id="repeat" value="0" min="0" step="any" /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl><p data-notes style="margin-top:0.75rem"></p>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { fabricYardage, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('fabric-form');
  const root = document.getElementById('fabric-tool');
  function run() {
    const rep = num(form.elements.namedItem('repeat'));
    const r = fabricYardage({
      type: form.elements.namedItem('type').value,
      width: num(form.elements.namedItem('width')),
      length: num(form.elements.namedItem('length')),
      unit: form.elements.namedItem('unit').value,
      fabricWidth: num(form.elements.namedItem('fwidth')),
      fabricWidthUnit: form.elements.namedItem('fwunit').value,
      pieces: num(form.elements.namedItem('pieces')),
      wastePercent: num(form.elements.namedItem('waste')),
      patternRepeat: rep > 0 ? rep : undefined,
      patternRepeatUnit: form.elements.namedItem('unit').value,
    });
    setResults(root, [
      ['Yards', r.yards + ' yd'],
      ['Meters', r.meters + ' m'],
      ['Panels along length', String(r.panelsNeeded)],
      ['Length per panel', r.lengthPerPanelCm + ' cm'],
    ]);
    root.querySelector('[data-notes]').textContent = r.notes.join(' ');
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.QuiltSizeCalc = `---
---
<div class="tool-panel" id="quiltsize-tool">
  <h2>Quilt size from mattress</h2>
  <form id="quiltsize-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="preset">Mattress preset</label>
      <select name="preset" id="preset">
        <option value="38,75">Twin 38×75</option>
        <option value="54,75">Full 54×75</option>
        <option value="60,80" selected>Queen 60×80</option>
        <option value="76,80">King 76×80</option>
        <option value="72,84">Cal King 72×84</option>
      </select></div>
    <div class="field"><label for="unit">Unit</label>
      <select name="unit" id="unit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field"><label for="mw">Mattress width</label>
      <input type="number" inputmode="decimal" name="mw" id="mw" value="60" min="1" step="any" required /></div>
    <div class="field"><label for="ml">Mattress length</label>
      <input type="number" inputmode="decimal" name="ml" id="ml" value="80" min="1" step="any" required /></div>
    <div class="field"><label for="drop">Side/foot drop</label>
      <input type="number" inputmode="decimal" name="drop" id="drop" value="12" min="0" step="any" required /></div>
    <div class="field"><label for="tuck">Pillow tuck</label>
      <input type="number" inputmode="decimal" name="tuck" id="tuck" value="10" min="0" step="any" /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { quiltSizeFromMattress, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('quiltsize-form');
  const root = document.getElementById('quiltsize-tool');
  form.elements.namedItem('preset').addEventListener('change', () => {
    const [w,l] = form.elements.namedItem('preset').value.split(',');
    form.elements.namedItem('mw').value = w; form.elements.namedItem('ml').value = l;
    form.elements.namedItem('unit').value = 'in';
  });
  function run() {
    const r = quiltSizeFromMattress({
      mattressWidth: num(form.elements.namedItem('mw')),
      mattressLength: num(form.elements.namedItem('ml')),
      drop: num(form.elements.namedItem('drop')),
      pillowTuck: num(form.elements.namedItem('tuck')),
      unit: form.elements.namedItem('unit').value,
    });
    setResults(root, [
      ['Quilt width', r.quiltWidth + ' ' + r.unit + ' (' + r.quiltWidthCm + ' cm)'],
      ['Quilt length', r.quiltLength + ' ' + r.unit + ' (' + r.quiltLengthCm + ' cm)'],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.QuiltBackingCalc = `---
---
<div class="tool-panel" id="backing-tool">
  <h2>Quilt backing yardage</h2>
  <form id="backing-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="qw">Quilt width</label>
      <input type="number" inputmode="decimal" name="qw" id="qw" value="90" min="1" step="any" required /></div>
    <div class="field"><label for="ql">Quilt length</label>
      <input type="number" inputmode="decimal" name="ql" id="ql" value="100" min="1" step="any" required /></div>
    <div class="field"><label for="unit">Quilt unit</label>
      <select name="unit" id="unit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field"><label for="fwidth">Fabric width</label>
      <input type="number" inputmode="decimal" name="fwidth" id="fwidth" value="42" min="1" step="any" required /></div>
    <div class="field"><label for="fwunit">Fabric width unit</label>
      <select name="fwunit" id="fwunit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field"><label for="overhang">Overhang each side</label>
      <input type="number" inputmode="decimal" name="overhang" id="overhang" value="4" min="0" step="any" /></div>
    <div class="field"><label for="waste">Waste %</label>
      <input type="number" inputmode="decimal" name="waste" id="waste" value="5" min="0" max="30" /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { quiltBacking, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('backing-form');
  const root = document.getElementById('backing-tool');
  function run() {
    const r = quiltBacking({
      quiltWidth: num(form.elements.namedItem('qw')),
      quiltLength: num(form.elements.namedItem('ql')),
      unit: form.elements.namedItem('unit').value,
      fabricWidth: num(form.elements.namedItem('fwidth')),
      fabricWidthUnit: form.elements.namedItem('fwunit').value,
      overhang: num(form.elements.namedItem('overhang')),
      wastePercent: num(form.elements.namedItem('waste')),
    });
    setResults(root, [
      ['Backing size (in)', r.backingWidth + ' × ' + r.backingLength],
      ['Panels', String(r.panels)],
      ['Seam orientation', r.seamOrientation],
      ['Yards', r.yards + ' yd'],
      ['Meters', r.meters + ' m'],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.QuiltBindingCalc = `---
---
<div class="tool-panel" id="binding-tool">
  <h2>Quilt binding calculator</h2>
  <form id="binding-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="qw">Quilt width</label>
      <input type="number" inputmode="decimal" name="qw" id="qw" value="60" min="1" step="any" required /></div>
    <div class="field"><label for="ql">Quilt length</label>
      <input type="number" inputmode="decimal" name="ql" id="ql" value="70" min="1" step="any" required /></div>
    <div class="field"><label for="unit">Unit</label>
      <select name="unit" id="unit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field"><label for="strip">Strip cut width</label>
      <input type="number" inputmode="decimal" name="strip" id="strip" value="2.5" min="1" step="any" /></div>
    <div class="field"><label for="fwidth">Fabric width</label>
      <input type="number" inputmode="decimal" name="fwidth" id="fwidth" value="42" min="1" step="any" /></div>
    <div class="field"><label for="fwunit">Fabric width unit</label>
      <select name="fwunit" id="fwunit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { quiltBinding, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('binding-form');
  const root = document.getElementById('binding-tool');
  function run() {
    const r = quiltBinding({
      quiltWidth: num(form.elements.namedItem('qw')),
      quiltLength: num(form.elements.namedItem('ql')),
      unit: form.elements.namedItem('unit').value,
      stripCutWidth: num(form.elements.namedItem('strip')),
      stripCutUnit: 'in',
      fabricWidth: num(form.elements.namedItem('fwidth')),
      fabricWidthUnit: form.elements.namedItem('fwunit').value,
    });
    setResults(root, [
      ['Perimeter', r.perimeterIn + ' in'],
      ['Strip length needed', r.totalStripLengthIn + ' in'],
      ['Strips to cut', String(r.stripsNeeded)],
      ['Fabric yards', r.fabricYards + ' yd'],
      ['Fabric meters', r.fabricMeters + ' m'],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.HstCalc = `---
---
<div class="tool-panel" id="hst-tool">
  <h2>Half-square triangle cutting</h2>
  <form id="hst-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="finished">Finished HST size</label>
      <input type="number" inputmode="decimal" name="finished" id="finished" value="3" min="0.5" step="any" required /></div>
    <div class="field"><label for="unit">Unit</label>
      <select name="unit" id="unit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field"><label for="method">Method</label>
      <select name="method" id="method">
        <option value="traditional">Traditional</option>
        <option value="two-at-a-time">Two-at-a-time</option>
        <option value="eight-at-a-time">Eight-at-a-time</option>
      </select></div>
    <div class="field"><label for="count">How many HSTs</label>
      <input type="number" inputmode="numeric" name="count" id="count" value="24" min="1" required /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl><p data-notes style="margin-top:0.75rem"></p>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { halfSquareTriangles, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('hst-form');
  const root = document.getElementById('hst-tool');
  function run() {
    const r = halfSquareTriangles({
      finishedSize: num(form.elements.namedItem('finished')),
      unit: form.elements.namedItem('unit').value,
      method: form.elements.namedItem('method').value,
      count: num(form.elements.namedItem('count')),
    });
    setResults(root, [
      ['Cut square size', r.cutSquareSize + ' ' + r.cutSquareUnit],
      ['Squares to cut', String(r.squaresToCut)],
      ['HSTs per pair of squares', String(r.hstsProducedPerSquarePair)],
      ['Fabric area (approx)', r.fabricAreaSqIn + ' in²'],
    ]);
    root.querySelector('[data-notes]').textContent = r.notes;
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.CrossStitchCalc = `---
---
<div class="tool-panel" id="aida-tool">
  <h2>Cross-stitch / Aida fabric size</h2>
  <form id="aida-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="wide">Design stitches wide</label>
      <input type="number" inputmode="numeric" name="wide" id="wide" value="140" min="1" required /></div>
    <div class="field"><label for="high">Design stitches high</label>
      <input type="number" inputmode="numeric" name="high" id="high" value="180" min="1" required /></div>
    <div class="field"><label for="count">Aida count</label>
      <select name="count" id="count">
        <option value="11">11-count</option>
        <option value="14" selected>14-count</option>
        <option value="16">16-count</option>
        <option value="18">18-count</option>
        <option value="20">20-count</option>
        <option value="22">22-count</option>
      </select></div>
    <div class="field"><label for="margin">Margin each side</label>
      <input type="number" inputmode="decimal" name="margin" id="margin" value="3" min="0" step="any" /></div>
    <div class="field"><label for="munit">Margin unit</label>
      <select name="munit" id="munit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
    <div class="field"><label for="extra">Finishing extra each side</label>
      <input type="number" inputmode="decimal" name="extra" id="extra" value="0" min="0" step="any" /></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Calculate</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { crossStitchFabric, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('aida-form');
  const root = document.getElementById('aida-tool');
  function run() {
    const r = crossStitchFabric({
      designStitchesWide: num(form.elements.namedItem('wide')),
      designStitchesHigh: num(form.elements.namedItem('high')),
      aidaCount: num(form.elements.namedItem('count')),
      margin: num(form.elements.namedItem('margin')),
      marginUnit: form.elements.namedItem('munit').value,
      finishingExtra: num(form.elements.namedItem('extra')),
    });
    setResults(root, [
      ['Design size', r.designWidthIn + ' × ' + r.designHeightIn + ' in (' + r.designWidthCm + ' × ' + r.designHeightCm + ' cm)'],
      ['Cut fabric', r.cutWidthIn + ' × ' + r.cutHeightIn + ' in (' + r.cutWidthCm + ' × ' + r.cutHeightCm + ' cm)'],
      ['Aida count', String(r.aidaCount)],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

calculators.NeedleHookCalc = `---
import { KNITTING_NEEDLES, CROCHET_HOOKS } from '../../data/needles-hooks';
---
<div class="tool-panel" id="needle-tool">
  <h2>Needle & hook size converter</h2>
  <form id="needle-form" class="tool-grid tool-grid--2">
    <div class="field"><label for="kind">Convert</label>
      <select name="kind" id="kind">
        <option value="needle">Knitting needle</option>
        <option value="hook">Crochet hook</option>
      </select></div>
    <div class="field"><label for="system">From system</label>
      <select name="system" id="system">
        <option value="metric">Metric (mm)</option>
        <option value="us">US</option>
        <option value="uk">UK</option>
      </select></div>
    <div class="field"><label for="value">Size value</label>
      <input type="text" name="value" id="value" value="5" required />
      <p class="field-hint">Examples: 5, 8, 10.5, H-8</p></div>
    <div class="field" style="display:flex;align-items:flex-end"><button type="submit" class="btn btn--primary" style="width:100%">Convert</button></div>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl></div>
  <h3 style="margin-top:1.5rem;font-size:1.05rem">Knitting needle chart (sample)</h3>
  <div style="overflow-x:auto">
    <table>
      <thead><tr><th>Metric mm</th><th>US</th><th>UK</th></tr></thead>
      <tbody>
        {KNITTING_NEEDLES.slice(0, 12).map((n) => (
          <tr><td>{n.metricMm}</td><td>{n.us}</td><td>{n.uk}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
<script>
  import { KNITTING_NEEDLES, CROCHET_HOOKS, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('needle-form');
  const root = document.getElementById('needle-tool');
  function matchRow(list, system, value) {
    const v = value.trim().toLowerCase();
    return list.find((row) => {
      if (system === 'metric') return Math.abs(row.metricMm - parseFloat(v)) < 0.01;
      if (system === 'us') return String(row.us).toLowerCase() === v;
      return String(row.uk).toLowerCase() === v;
    });
  }
  function run() {
    const kind = form.elements.namedItem('kind').value;
    const system = form.elements.namedItem('system').value;
    const value = form.elements.namedItem('value').value;
    const list = kind === 'needle' ? KNITTING_NEEDLES : CROCHET_HOOKS;
    const row = matchRow(list, system, value);
    if (!row) {
      setResults(root, [['Status', 'No exact match — check the chart or try metric mm']]);
    } else {
      setResults(root, [
        ['Metric', row.metricMm + ' mm'],
        ['US', String(row.us)],
        ['UK', String(row.uk)],
      ]);
    }
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  readQuery(form); run();
</script>
`;

calculators.SeamCalc = `---
---
<div class="tool-panel" id="seam-tool">
  <h2>Seam allowance & pattern grading</h2>
  <form id="seam-form">
    <h3 style="font-size:1rem;margin-top:0">Cut size from finished measurement</h3>
    <div class="tool-grid tool-grid--2">
      <div class="field"><label for="finished">Finished measurement</label>
        <input type="number" inputmode="decimal" name="finished" id="finished" value="20" min="0" step="any" required /></div>
      <div class="field"><label for="unit">Unit</label>
        <select name="unit" id="unit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
      <div class="field"><label for="sa">Seam allowance (each edge)</label>
        <input type="number" inputmode="decimal" name="sa" id="sa" value="0.625" min="0" step="any" /></div>
      <div class="field"><label for="saunit">SA unit</label>
        <select name="saunit" id="saunit"><option value="in">Inches</option><option value="cm">cm</option></select></div>
      <div class="field"><label for="edges">Seam edges</label>
        <input type="number" inputmode="numeric" name="edges" id="edges" value="2" min="0" /></div>
      <div class="field"><label for="ease">Ease to add</label>
        <input type="number" inputmode="decimal" name="ease" id="ease" value="0" min="0" step="any" /></div>
    </div>
    <h3 style="font-size:1rem;margin:1rem 0 0.5rem">Grade to another size</h3>
    <div class="tool-grid tool-grid--2">
      <div class="field"><label for="base">Base measurement</label>
        <input type="number" inputmode="decimal" name="base" id="base" value="36" min="0" step="any" /></div>
      <div class="field"><label for="grade">Grade per size step</label>
        <input type="number" inputmode="decimal" name="grade" id="grade" value="1" step="any" /></div>
      <div class="field"><label for="away">Sizes away (+/−)</label>
        <input type="number" inputmode="numeric" name="away" id="away" value="2" step="1" /></div>
    </div>
    <button type="submit" class="btn btn--primary" style="margin-top:0.75rem">Calculate</button>
  </form>
  <div class="results" aria-live="polite"><h3>Results</h3><dl data-results></dl>
    <div class="share-row"><button type="button" class="btn btn--ghost" data-share>Copy result link</button>
    <button type="button" class="btn btn--ghost" onclick="window.print()">Print</button></div>
  </div>
</div>
<script>
  import { cutFromFinished, gradeMeasurement, num, readQuery, writeQuery, setResults } from '../../lib/client-calc';
  const form = document.getElementById('seam-form');
  const root = document.getElementById('seam-tool');
  function run() {
    const cut = cutFromFinished({
      finished: num(form.elements.namedItem('finished')),
      unit: form.elements.namedItem('unit').value,
      seamAllowance: num(form.elements.namedItem('sa')),
      seamUnit: form.elements.namedItem('saunit').value,
      seamEdges: num(form.elements.namedItem('edges')),
      ease: num(form.elements.namedItem('ease')),
      easeUnit: form.elements.namedItem('unit').value,
    });
    const g = gradeMeasurement({
      baseSizeMeasurement: num(form.elements.namedItem('base')),
      unit: form.elements.namedItem('unit').value,
      gradePerSize: num(form.elements.namedItem('grade')),
      gradeUnit: form.elements.namedItem('unit').value,
      sizesAway: num(form.elements.namedItem('away')),
    });
    setResults(root, [
      ['Cut measurement', cut.cutMeasurement + ' ' + cut.cutUnit],
      ['Cut (in / cm)', cut.cutIn + ' in / ' + cut.cutCm + ' cm'],
      ['Seam added', String(cut.totalSeamAdded)],
      ['Graded measurement', g.newMeasurement + ' ' + g.unit],
      ['Grade delta', String(g.delta)],
    ]);
    writeQuery(form);
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  root.querySelector('[data-share]')?.addEventListener('click', async () => { writeQuery(form); await navigator.clipboard.writeText(location.href); });
  readQuery(form); run();
</script>
`;

for (const [name, content] of Object.entries(calculators)) {
  fs.writeFileSync(path.join(calcDir, `${name}.astro`), content);
  console.log('wrote', name);
}

console.log('Calculator components done');
