import type { Guide } from './types';

export const guide: Guide = {
  slug: 'how-much-yarn-for-a-blanket',
  title: 'How Much Yarn for a Blanket?',
  description:
    'Plan knit or crochet blanket yarn by size and weight. Use planning ranges, a worked example, and free calculators for skein counts.',
  primaryKeyword: 'how much yarn for a blanket',
  datePublished: '2026-10-19',
  dateModified: '2026-10-23',
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
  faqs: [
    {
      q: 'How many skeins do I need for a throw blanket?',
      a: 'For a knit worsted throw about 50×60 inches, a common planning range is roughly 1,100–1,800 yards. Divide by yards per skein and round up. A 200-yard skein often means about 6–10 skeins before borders; crochet usually needs more. Confirm with the yarn blanket calculator (/tools/yarn-blanket-calculator/).',
    },
    {
      q: 'Does crochet use more yarn than knitting for the same blanket?',
      a: 'Yes, as a rule of thumb crochet fabric is denser, so many makers budget about 25–30% more yarn than a comparable knit. See does crochet use more yarn than knitting (/guides/does-crochet-use-more-yarn-than-knitting/) for detail.',
    },
    {
      q: 'Should I buy yarn by ball count or by yards?',
      a: 'Always plan by total yards (or meters), then convert to skeins using the length printed on your ball band. Ball sizes vary widely even within the same Craft Yarn Council weight category.',
    },
    {
      q: 'How do yarn weight categories change blanket yardage?',
      a: 'Thicker yarns (bulky, super bulky) usually need fewer yards for the same area; thinner yarns (DK, fingering) need more. Match the category on the ball band to the Craft Yarn Council Standard Yarn Weight System, summarized at /reference/yarn-weights/.',
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
        'A worsted-weight knit throw about 50×60 inches usually needs roughly 1,100–1,800 yards; crochet often needs about 25–30% more as a planning rule of thumb. Convert yards to skeins with your ball band, then add a little waste. Use the yarn blanket calculator (/tools/yarn-blanket-calculator/) for your exact size.',
    },
    {
      type: 'p',
      content:
        '“How much yarn for a blanket?” depends on finished size, Craft Yarn Council yarn weight category, stitch density, borders, and whether you knit or crochet. Ball-band “blanket” suggestions help with shopping, but they rarely match a custom lovey, throw, or bed cover. This guide gives practical planning ranges, a reusable method, and links to free tools so you can turn dimensions into skein counts before you buy.',
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
        'Next, note the yarn’s CYC category (0 lace through 7 jumbo) from the ball band. Category drives both recommended needle or hook size and how many yards a square foot of fabric tends to consume. A bulky throw can look large with surprisingly few yards; a fingering-weight afghan for the same footprint can look modest on the shelf but empty many skeins.',
    },
    {
      type: 'h2',
      content: 'Planning yardage ranges (knit, worsted / category 4)',
    },
    {
      type: 'p',
      content:
        'These knit ranges are common planning estimates for stockinette or similarly open fabric in worsted-weight yarn. Dense cables, tapestry colorwork, or very tight gauges push you toward the high end. Treat them as shopping guides, not pattern substitutes.',
    },
    {
      type: 'table',
      content: {
        caption: 'Approximate knit worsted blanket yardage (planning ranges)',
        headers: ['Blanket type', 'Approx. size', 'Yards (knit, worsted)', 'Notes'],
        rows: [
          ['Lovey', '~12×12"', '80–120', 'Small scrap or mini project'],
          ['Baby', '~30×36"', '500–700', 'Often one color or simple stripes'],
          ['Throw', '~50×60"', '1,100–1,800', 'Most common living-room size'],
          ['Twin-ish cover', 'varies', '2,000–3,000+', 'Confirm against mattress if fitted'],
        ],
      },
    },
    {
      type: 'p',
      content:
        'Move one CYC category thicker (bulky) and yardage usually drops for the same area. Move thinner (DK or fingering) and yardage rises. For crochet, many makers multiply a comparable knit estimate by about 1.25–1.3 as a rule of thumb—crochet stitches typically pack more yarn per square inch. Pair the yarn blanket calculator with the crochet blanket calculator (/tools/crochet-blanket-calculator/) when you need starting-chain or stitch counts for a rectangular crochet piece.',
    },
    {
      type: 'h2',
      content: 'Method: area, density, skeins, and waste',
    },
    {
      type: 'p',
      content:
        'A reliable DIY method is: convert the blanket to inches, multiply width by length for area, then apply a yarn-density factor for your weight and craft (from a swatch or a trusted calculator). Divide total yards by yards per skein and round up. Add waste for tails, color changes, and a border—often a skein’s worth on a large throw is safer than running short mid-row.',
    },
    {
      type: 'ul',
      content: [
        'Measure or choose finished width × length',
        'Note CYC weight and yards (or meters) per skein',
        'Decide knit vs crochet and stitch density (swatch when possible)',
        'Estimate total yards, then skeins = ceil(total ÷ yards per skein)',
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
        'Suppose you want a 50×60 inch throw in category 4 worsted, knit in a simple stitch, with skeins labeled 200 yards each. Using the planning band of roughly 1,100–1,800 yards, the midpoint near 1,450 yards suggests about eight skeins (1,450 ÷ 200 ≈ 7.25, round up). Add one skein for a contrasting border or fringe and you might buy nine. If you crochet the same size in a dense stitch, budget toward the higher knit range plus about 25–30% more, then round up again.',
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
        'Ignoring borders, fringe, or colorwork floats',
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
        'Temperature and hand matter as much as math. A dense crochet afghan in wool can feel heavy at the same yardage as a drapey knit stockinette throw. When comfort is the goal, make a larger swatch, fold it into a small square, and judge weight and drape before multiplying to full size. That tactile check often changes whether you buy the low or high end of a planning range.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Pick your finished size, confirm the CYC weight on /reference/yarn-weights/, run the yarn blanket calculator (/tools/yarn-blanket-calculator/), and adjust for crochet density if needed. Keep a written skein count and dye-lot numbers with your project notes so restocks stay consistent.',
    },
  ],
};

export default guide;
