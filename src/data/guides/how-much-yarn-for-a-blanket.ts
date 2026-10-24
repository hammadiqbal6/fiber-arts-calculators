import type { Guide } from './types';

export const guide: Guide = {
  slug: 'how-much-yarn-for-a-blanket',
  title: 'Blanket Yarn Chart by Size',
  description:
    'Blanket yarn chart by size using FiberCalc worsted knit density (0.55 yd/in² + 10% waste). Throw 50×60 ≈ 1,815 yd / 10 skeins at 200 yd.',
  primaryKeyword: 'blanket yarn chart by size',
  datePublished: '2026-10-19',
  dateModified: '2026-10-24',
  relatedTools: [
    'yarn-blanket-calculator',
    'crochet-blanket-calculator',
    'yarn-substitution-calculator',
  ],
  relatedGuides: [
    'does-crochet-use-more-yarn-than-knitting',
    'yarn-substitution-basics',
    'how-much-yarn-for-a-sweater',
  ],
  sources: [
    [
      'Craft Yarn Council — Standard Yarn Weight System',
      'https://www.craftyarncouncil.com/standards/yarn-weight-system',
    ],
    [
      'Craft Yarn Council — Body / sizing standards',
      'https://www.craftyarncouncil.com/standards/body-sizing',
    ],
  ],
  faqs: [
    {
      q: 'How many skeins do I need for a throw blanket?',
      a: 'For a knit worsted (#4) throw about 50×60 inches, FiberCalc’s model gives about 1,815 yards with the default 10% waste (3,000 in² × 0.55 × 1.1)—about 10 skeins at 200 yards each. Without waste the same throw is 1,650 yards. Crochet multiplies knit by about 1.28. Confirm with the yarn blanket calculator (/tools/yarn-blanket-calculator/).',
    },
    {
      q: 'Does crochet use more yarn than knitting for the same blanket?',
      a: 'Yes, as a rule of thumb crochet fabric is denser. FiberCalc uses knit density × 1.28 for crochet (about 25–30% more). See does crochet use more yarn than knitting (/guides/does-crochet-use-more-yarn-than-knitting/) for detail.',
    },
    {
      q: 'Should I buy yarn by ball count or by yards?',
      a: 'Always plan by total yards (or meters), then convert to skeins using the length printed on your ball band. Ball sizes vary widely even within the same Craft Yarn Council weight category.',
    },
    {
      q: 'How do yarn weight categories change blanket yardage?',
      a: 'Thicker yarns (bulky, super bulky) usually need fewer yards for the same area; thinner yarns (DK, fingering) need more. Match the category on the ball band to the Craft Yarn Council Standard Yarn Weight System, summarized at /reference/yarn-weights/. Density factors by category are FiberCalc planning heuristics documented on /methodology/—not CYC yardage charts.',
    },
    {
      q: 'What if I want to substitute a different yarn?',
      a: 'Match category and total yards first, then swatch. Use the yarn substitution calculator (/tools/yarn-substitution-calculator/) and the yarn substitution basics guide (/guides/yarn-substitution-basics/).',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'A worsted-weight (#4) knit throw about 50×60 inches needs about 1,815 yards with FiberCalc’s default 10% waste—roughly 10 skeins at 200 yards each. Crochet uses about 28% more (knit × 1.28). Convert with your ball band, then confirm in the yarn blanket calculator (/tools/yarn-blanket-calculator/).',
    },
    {
      type: 'p',
      content:
        'A blanket yarn chart by size turns finished width and length into a shopping list. The answer still depends on Craft Yarn Council yarn weight category, stitch density, borders, and whether you knit or crochet. Ball-band “blanket” suggestions help with shopping, but they rarely match a custom lovey, throw, or bed cover. This guide charts FiberCalc’s area-based model, walks through the formula, and links free tools so you can turn dimensions into skein counts before you buy.',
    },
    {
      type: 'h2',
      content: 'Start with size, then weight and method',
    },
    {
      type: 'p',
      content:
        'Write down the finished width and length in inches (or centimeters—stay consistent). Craft blanket sizes are conventions, not hard standards; mattress sizes are industry measurements if you are covering a bed. Cross-check common craft sizes on the quilt and blanket reference (/reference/quilt-sizes/) if you need a starting point for baby, throw, twin, or larger covers.',
    },
    {
      type: 'p',
      content:
        'Next, note the yarn’s CYC category (0 lace through 7 jumbo) from the ball band. Category drives both recommended needle or hook size and how many yards a square inch of fabric tends to consume. A bulky throw can look large with surprisingly few yards; a fingering-weight afghan for the same footprint can look modest on the shelf but empty many skeins.',
    },
    {
      type: 'h2',
      content: 'Blanket yarn chart by size (knit, worsted / category 4)',
    },
    {
      type: 'p',
      content:
        'The chart below uses FiberCalc’s rectangle formula: yards = area_in² × density × (1 + waste/100). For worsted (#4) knit, density is 0.55 yd/in²; default waste is 10%. These are site planning heuristics documented on /methodology/—not Craft Yarn Council published yardage charts. Dense cables, tapestry colorwork, or very tight gauges push you higher; open lace can land lower.',
    },
    {
      type: 'table',
      content: {
        caption:
          'FiberCalc knit worsted (#4) blanket yardage with 10% waste (site heuristic, not CYC)',
        headers: ['Blanket type', 'Approx. size', 'Area (in²)', 'Yards (knit, +10% waste)', 'Notes'],
        rows: [
          ['Lovey', '~12×12"', '144', '~87', 'Mini project; often under one 200-yd skein'],
          ['Baby', '~30×36"', '1,080', '~653', 'About 4 skeins at 200 yd'],
          ['Throw', '~50×60"', '3,000', '~1,815', 'About 10 skeins at 200 yd (1,650 yd at 0% waste)'],
          ['Twin-ish cover', '~66×90"', '5,940', '~3,594', 'About 18 skeins at 200 yd; confirm vs mattress'],
        ],
      },
    },
    {
      type: 'p',
      content:
        'Move one CYC category thicker (bulky) and yardage usually drops for the same area. Move thinner (DK or fingering) and yardage rises. For crochet, FiberCalc multiplies the knit density by 1.28 (~25–30% more yarn per square inch). Pair the yarn blanket calculator with the crochet blanket calculator (/tools/crochet-blanket-calculator/) when you need starting-chain or stitch counts for a rectangular crochet piece.',
    },
    {
      type: 'h2',
      content: 'Method: area, density, skeins, and waste',
    },
    {
      type: 'p',
      content:
        'Convert the blanket to inches, multiply width by length for area, then apply a yarn-density factor for your weight and craft. FiberCalc’s worsted knit factor is 0.55 yd/in²; crochet is that value × 1.28. Multiply by (1 + waste/100)—default 10%—then divide total yards by yards per skein and round up. Add extra for borders beyond the default waste when you plan fringe, i-cord, or a wide frame.',
    },
    {
      type: 'ul',
      content: [
        'Measure or choose finished width × length',
        'Note CYC weight and yards (or meters) per skein',
        'Decide knit vs crochet and stitch density (swatch when possible)',
        'Yards ≈ area_in² × density × (1 + waste/100); skeins = ceil(yards ÷ yards per skein)',
        'Buy same dye lot when the blanket is mostly one solid color',
      ],
    },
    {
      type: 'p',
      content:
        'The free yarn blanket calculator (/tools/yarn-blanket-calculator/) automates size, weight category, and waste allowance so you can compare skein counts before checkout. If you change yarn mid-plan, re-run the numbers with the yarn substitution calculator (/tools/yarn-substitution-calculator/) rather than assuming ball-for-ball equivalence.',
    },
    {
      type: 'h2',
      content: 'Worked example: 50×60" worsted knit throw',
    },
    {
      type: 'p',
      content:
        'Suppose you want a 50×60 inch throw in category 4 worsted, knit in a simple stitch, with skeins labeled 200 yards each. Area = 50 × 60 = 3,000 in². At 0.55 yd/in² that is 1,650 yards with 0% waste. With FiberCalc’s default 10% waste: 3,000 × 0.55 × 1.1 = 1,815 yards. Skeins = ceil(1,815 ÷ 200) = 10. If you crochet the same size, multiply by 1.28 → about 2,323 yards (~12 skeins at 200 yd) before any extra border beyond the waste allowance.',
    },
    {
      type: 'p',
      content:
        'A swatch weight check improves the estimate: knit or crochet a known area (for example 4×4 inches), weigh it dry after blocking as you will the blanket, scale weight to the full area, and convert with yards per gram from the ball band. That method is especially useful for cables, mosaic, or textured crochet where charted yardage guesses fail.',
    },
    {
      type: 'h2',
      content: 'Borders, stripes, and dye lots',
    },
    {
      type: 'p',
      content:
        'Borders, rib frames, applied i-cord, pom-poms, and fringe all consume yarn outside the main field. Stripe patterns that carry unused colors up the side still “use” those strands in your shopping list even if they are not visible every row. For large solids, buy enough of one dye lot up front; running out and joining a new lot mid-blanket is a common disappointment.',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Buying by number of balls without checking yards per ball',
        'Using a knit-only yardage chart for crochet fabric',
        'Treating FiberCalc densities as CYC standards instead of site heuristics',
        'Ignoring borders, fringe, or colorwork floats beyond the waste %',
        'Mixing dye lots on a large solid field',
        'Skipping a swatch when the stitch pattern is dense or heavily textured',
      ],
    },
    {
      type: 'h2',
      content: 'Related planning for wearables and substitutes',
    },
    {
      type: 'p',
      content:
        'Blanket math shares DNA with garment yardage, but sweaters add ease, sleeves, and neck shaping. When you outgrow throws and move to clothing, read how much yarn for a sweater (/guides/how-much-yarn-for-a-sweater/) and swatch for gauge. If your chosen yarn is discontinued or the wrong fiber, start with yarn substitution basics (/guides/yarn-substitution-basics/) before you commit to a full skein order.',
    },
    {
      type: 'h2',
      content: 'Choosing yarn put-up and fiber for blankets',
    },
    {
      type: 'p',
      content:
        'Large blankets reward predictable put-ups: cakes, hanks, and large skeins reduce joins, but you still convert everything to yards. Soft acrylics and washable wool blends are popular for baby and couch throws because care is simple; plant fibers can feel cooler but may grow after washing, which slightly changes finished size and how far a skein stretches across the area. If you combine fibers in stripes, weigh or measure each color’s share of the total yards so one stripe does not run out first.',
    },
    {
      type: 'p',
      content:
        'Temperature and hand matter as much as math. A dense crochet afghan in wool can feel heavy at the same yardage as a drapey knit stockinette throw. When comfort is the goal, make a larger swatch, fold it into a small square, and judge weight and drape before multiplying to full size. That tactile check often changes whether you buy closer to the calculator output or add another skein for insurance.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Pick your finished size, confirm the CYC weight on /reference/yarn-weights/, run the yarn blanket calculator (/tools/yarn-blanket-calculator/), and adjust for crochet density if needed. Keep a written skein count and dye-lot numbers with your project notes so restocks stay consistent. For how densities and waste are defined on this site, see /methodology/.',
    },
  ],
};

export default guide;
