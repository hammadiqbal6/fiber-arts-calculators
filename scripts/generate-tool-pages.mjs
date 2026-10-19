/**
 * Generates Astro tool pages with full SEO content from a content map.
 * Run: node scripts/generate-tool-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/pages/tools');
fs.mkdirSync(root, { recursive: true });

const pages = [
  {
    file: 'yarn-blanket-calculator.astro',
    slug: 'yarn-blanket-calculator',
    calc: 'YarnBlanketCalc',
    calcPath: '../../components/calculators/YarnBlanketCalc.astro',
    answer:
      'A throw-size blanket (about 50×60 in / 127×152 cm) in medium/worsted (CYC 4) yarn typically needs roughly 1,800–2,400 meters (2,000–2,600 yards), or about 10–14 standard 100 g balls, depending on stitch pattern and whether you knit or crochet. Use the calculator above with your exact size and yarn weight for a planning estimate, then add swatch yarn.',
    faqs: [
      ['How much yarn do I need for a queen blanket?', 'A queen-size blanket near 90×90 in in worsted weight often needs 3,500–5,000+ meters. Enter queen preset and your yarn category for a tighter estimate; crochet usually needs more than knit stockinette.'],
      ['Does crochet use more yarn than knitting?', 'Yes—dense single crochet can use about 15–25% more yarn than stockinette for the same finished area. The calculator applies a crochet factor when you select crochet.'],
      ['Should I buy extra yarn?', 'Buy at least 10% extra for swatching, fringe, and dye-lot matching. For large blankets, buying one spare ball from the same dye lot is cheap insurance.'],
      ['Are CYC yarn weights exact?', 'Craft Yarn Council categories are ranges. Two “worsted” yarns can differ in yardage per gram—always prefer meters/yards on the ball band over category alone.'],
    ],
    body: yarnBlanketBody(),
  },
];

function yarnBlanketBody() {
  return `
    <h2>How to use this yarn blanket calculator</h2>
    <ol>
      <li>Pick a standard blanket size or enter a custom width and length.</li>
      <li>Choose inches or centimeters.</li>
      <li>Select the Craft Yarn Council (CYC) yarn weight printed on your ball band.</li>
      <li>Choose knitting or crochet, set a waste percentage, and calculate.</li>
    </ol>

    <div class="key-takeaways">
      <strong>Key takeaways</strong>
      <ul>
        <li>Yarn need scales with area × yarn weight density.</li>
        <li>CYC categories (0–7) provide planning averages, not brand-specific yardage.</li>
        <li>Crochet usually needs more yarn than knitting for the same blanket size.</li>
        <li>Always swatch; lace and cables change consumption dramatically.</li>
      </ul>
    </div>

    <h2>The formula</h2>
    <p>
      We convert your blanket to square meters, then multiply by a CYC-weight factor for approximate meters of yarn per square meter of fabric
      (stockinette or single-crochet density at mid-range gauge). A waste percent covers swatches and ends:
    </p>
    <p><code>meters ≈ area_m² × meters_per_m² × craft_factor × (1 + waste%)</code></p>
    <p>
      Grams are estimated from a typical grams-per-meter for that weight. Ball counts use a typical ball size for the category.
      These are <strong>planning estimates</strong>—pattern designers measure yardage from sample garments for a reason.
    </p>

    <h2>Worked example</h2>
    <p>
      You want a 50×60 in throw in CYC 4 (worsted), knitting, with 10% waste.
      Area = (50×2.54/100)×(60×2.54/100) ≈ 1.935 m².
      Using ~1,100 m per m² for worsted knit fabric: 1.935 × 1,100 × 1.10 ≈ 2,340 meters (~2,560 yards), roughly 12×200 m balls.
    </p>

    <h2>Standard blanket sizes</h2>
    <p>
      Presets follow common pattern sizes used by knitters and crocheters (lovey through king).
      They are finished dimensions, not mattress sizes—see our <a href="/reference/blanket-quilt-sizes/">blanket & quilt size chart</a>
      and <a href="/tools/quilt-size-calculator/">quilt size calculator</a> if you need bed coverage with drop.
    </p>

    <h2>Tips</h2>
    <ul>
      <li>Check meters (or yards) on the label, not only “worsted.”</li>
      <li>Textured stitches (bobbles, cables, dense moss) increase yardage.</li>
      <li>For colorwork, estimate each color’s proportion of the area.</li>
      <li>Weigh a swatch and scale: <code>project grams ≈ swatch grams × (project area / swatch area)</code>.</li>
    </ul>

    <h2>Common mistakes</h2>
    <ul>
      <li>Buying by ball count without comparing meters per ball.</li>
      <li>Ignoring dye lots on large blankets.</li>
      <li>Using garment sweater yardage charts for blankets (different shapes).</li>
      <li>Forgetting that border and fringe add length.</li>
    </ul>

    <h2>Sources</h2>
    <ul>
      <li><a href="https://www.craftyarncouncil.com/standards/yarn-weight-system" rel="noopener">Craft Yarn Council — Standard Yarn Weight System</a></li>
      <li>Manufacturer ball bands for meters per gram (always authoritative for a specific yarn).</li>
    </ul>
  `;
}

// For now this script only documents structure; pages written manually below.
console.log('Content helpers loaded; pages are authored as Astro files.');
