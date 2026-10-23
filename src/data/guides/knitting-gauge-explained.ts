import type { Guide } from './types';

export const guide: Guide = {
  slug: 'knitting-gauge-explained',
  title: 'Knitting Gauge Explained',
    description:
    'Learn how to measure knitting gauge, fix mismatches, and resize stitch counts so finished width and sweater fit stay correct.',
  primaryKeyword: 'knitting gauge explained',
  datePublished: '2026-10-19',
  dateModified: '2026-10-23',
  relatedTools: [
    'knitting-gauge-calculator',
    'cast-on-calculator',
    'yarn-sweater-calculator',
  ],
  relatedGuides: [
    'how-much-yarn-for-a-sweater',
    'how-many-stitches-to-cast-on-for-a-hat',
    'how-to-increase-evenly-across-a-row',
  ],
  faqs: [
    {
      q: 'What is knitting gauge?',
      a: 'Gauge is the number of stitches and rows in a measured distance—often reported per 4 inches (10 cm). It connects pattern numbers to real-world width and length.',
    },
    {
      q: 'My stitch gauge is off. What should I change first?',
      a: 'Try a different needle size to approach the pattern’s stitch gauge while keeping fabric you like. If you prefer your fabric, rescale cast-on and width counts with the knitting gauge calculator (/tools/knitting-gauge-calculator/).',
    },
    {
      q: 'Does row gauge matter as much as stitch gauge?',
      a: 'For fitted width (chest, hat circumference), stitch gauge is critical. Row gauge often can be adjusted by knitting more or fewer rows to length, unless a charted motif locks both dimensions.',
    },
    {
      q: 'Should I block my gauge swatch?',
      a: 'Yes—wash and dry the swatch the same way you will treat the finished piece. Unblocked gauge can misrepresent stretch and stitch size after laundering.',
    },
    {
      q: 'How does gauge affect yarn amounts for a sweater?',
      a: 'Looser fabric usually uses more yarn per square inch; tighter fabric uses less. After you lock gauge, estimate yardage with the yarn sweater calculator (/tools/yarn-sweater-calculator/) and read how much yarn for a sweater (/guides/how-much-yarn-for-a-sweater/).',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'Gauge is stitches and rows over a measured distance—usually per 4 inches. If your stitch gauge differs from the pattern, change needle size or rescale stitch counts; do not rely on blocking alone to fix a large width error. Measure a washed swatch in the project stitch.',
    },
    {
      type: 'p',
      content:
        'Gauge is the bridge between a pattern’s numbers and a hat, sweater, or blanket that matches the schematic. Two knitters can follow the same written instructions and finish different sizes if their stitches per inch differ. Understanding how to measure, match, and resize gauge keeps Craft Yarn Council sizing charts and pattern schematics meaningful on your needles.',
    },
    {
      type: 'h2',
      content: 'How to measure gauge accurately',
    },
    {
      type: 'ul',
      content: [
        'Cast on enough stitches for a swatch at least 5–6 inches wide in the project stitch pattern',
        'Work enough rows for similar height; include any ribbing or texture that affects fabric',
        'Wash and block as you will the garment or accessory',
        'Lay the swatch flat without stretching; count stitches and rows over 4 inches in the center',
        'Convert to stitches per inch (stitches ÷ 4) for cast-on and circumference math',
      ],
    },
    {
      type: 'p',
      content:
        'Count in the middle of the fabric, not at the edges where tension often changes. If the pattern lists gauge over 4 inches in stockinette but your project is lace or cables, swatch in that textured stitch—cable fabric pulls inward and can change effective width.',
    },
    {
      type: 'h2',
      content: 'Pattern gauge vs your gauge',
    },
    {
      type: 'p',
      content:
        'Patterns publish a target gauge so finished measurements match the size chart. Matching stitch gauge protects circumference: bust, hip, sleeve, and hat band. Matching row gauge protects lengths and motif height, but many accessories let you add or subtract plain rows. When a colorwork chart must fill a fixed number of rounds, both directions matter.',
    },
    {
      type: 'table',
      content: {
        caption: 'What to do when gauge does not match',
        headers: ['Your result vs pattern', 'Typical meaning', 'First adjustments'],
        rows: [
          ['More stitches per 4"', 'Fabric tighter / denser', 'Try larger needles; re-swatch'],
          ['Fewer stitches per 4"', 'Fabric looser / more open', 'Try smaller needles; re-swatch'],
          ['Stitch gauge OK, row gauge off', 'Length will drift', 'Adjust row counts or needle material'],
          ['Love the fabric, hate the gauge', 'Hand is right, size wrong', 'Resize stitch counts with a calculator'],
        ],
      },
    },
    {
      type: 'p',
      content:
        'Needle material and brand can change tension slightly even at the same labeled size. If you are between needle sizes, prioritize stitch gauge for fitted wearables. The knitting gauge calculator (/tools/knitting-gauge-calculator/) helps you rescale a published stitch count when you keep your preferred fabric.',
    },
    {
      type: 'h2',
      content: 'Worked example: resizing a cast-on',
    },
    {
      type: 'p',
      content:
        'Pattern gauge: 20 stitches = 4 inches (5 stitches per inch). Your blocked swatch: 22 stitches = 4 inches (5.5 stitches per inch). The pattern’s cast-on of 100 stitches was meant to create 20 inches of width (100 ÷ 5). To keep that 20-inch width at your gauge, cast on about 100 × (22 ÷ 20) = 110 stitches—or 20 × 5.5 = 110. Round to a multiple that fits your ribbing or stitch pattern (for example a multiple of 4 for 2×2 rib).',
    },
    {
      type: 'p',
      content:
        'For hats, combine this idea with ease: circumference × stitches per inch × ease factor. The cast-on calculator (/tools/cast-on-calculator/) and the guide how many stitches to cast on for a hat (/guides/how-many-stitches-to-cast-on-for-a-hat/) walk through negative ease for beanies.',
    },
    {
      type: 'h2',
      content: 'Gauge, yarn substitution, and sweater yardage',
    },
    {
      type: 'p',
      content:
        'Substituting yarn without matching gauge is a common source of sweaters that feel a size off. Stay in the same CYC weight category when possible, then swatch. After gauge is locked, estimate yarn with the yarn sweater calculator (/tools/yarn-sweater-calculator/). Even increases across a yoke or body use the same stitch-per-inch thinking—see how to increase evenly across a row (/guides/how-to-increase-evenly-across-a-row/).',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Trusting ball-band gauge instead of your blocked project-stitch swatch',
        'Measuring a tiny swatch where edge stitches distort the count',
        'Ignoring stitch pattern (cables vs stockinette) when checking width',
        'Hoping aggressive blocking will hide a large stitch-gauge miss on a fitted sweater',
        'Changing yarn mid-project without re-checking stitches per inch',
      ],
    },
    {
      type: 'h2',
      content: 'Swatch strategy for busy stitch patterns',
    },
    {
      type: 'p',
      content:
        'Stockinette swatches are fast, but they lie when the project is lace, brioche, or cables. Work the actual stitch pattern, including any wrong-side rows that tighten or loosen fabric. For motif charts, include at least two full repeats horizontally when possible so edge stitches do not dominate the count. If the pattern mixes ribbing and stockinette, swatch both: brim or hem rib often pulls in and changes the circumference even when body gauge matches.',
    },
    {
      type: 'p',
      content:
        'Circular vs flat tension deserves a mention. Many knitters purl looser or tighter than they knit, so a flat stockinette swatch can disagree with an in-the-round project that is knit every round. For hats and seamless sweaters, a small circular or magic-loop swatch is worth the time. Record needle brand, material, and size beside the stitch and row counts so you can reproduce the fabric months later.',
    },
    {
      type: 'h2',
      content: 'Blocking, stretch, and wear ease',
    },
    {
      type: 'p',
      content:
        'Wet blocking can open lace and grow animal fibers; steam can relax stitches without a full wash. Always treat the swatch the way you will treat the garment. After blocking, measure again—some fabrics rebound slightly after resting overnight. Wear ease is separate from gauge: even perfect gauge will feel tight if you pick a size with aggressive negative ease. Use gauge to hit the schematic; use size charts and personal preference to pick which schematic.',
    },
    {
      type: 'p',
      content:
        'When you intentionally keep a non-pattern gauge for fabric hand, recalculate every width-dependent number: cast-on, chest stitches, sleeve stitches, and button-band picks. Length can often be adjusted while knitting, but width mistakes show up only after hours of work. Pair resized counts with a fresh yarn estimate so you do not finish the body and discover the sleeves need another skein.',
    },
    {
      type: 'h2',
      content: 'Tools that help after you know your gauge',
    },
    {
      type: 'p',
      content:
        'Once stitches per inch are trustworthy, circumference projects become arithmetic: hats use how many stitches to cast on for a hat (/guides/how-many-stitches-to-cast-on-for-a-hat/), and general widths use the cast-on calculator (/tools/cast-on-calculator/). Even increases on yokes rely on how to increase evenly across a row (/guides/how-to-increase-evenly-across-a-row/). Sweater yarn totals belong in how much yarn for a sweater (/guides/how-much-yarn-for-a-sweater/) after the fabric is decided.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Swatch, wash, measure over 4 inches, then either change needles or rescale counts with the knitting gauge calculator (/tools/knitting-gauge-calculator/). For circumference projects, confirm ease; for sweaters, revisit yardage after gauge settles.',
    },
  ],
};

export default guide;
