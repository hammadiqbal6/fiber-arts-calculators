import type { Guide } from './types';

export const guide: Guide = {
  slug: 'how-much-yarn-for-a-sweater',
  title: 'How Much Yarn for a Sweater?',
  description:
    'Estimate sweater yarn by size, gauge, and yarn weight. Planning tips, a worked example, and free sweater and gauge calculators.',
  primaryKeyword: 'how much yarn for a sweater',
  datePublished: '2026-10-23',
  dateModified: '2026-10-23',
  relatedTools: [
    'yarn-sweater-calculator',
    'knitting-gauge-calculator',
    'yarn-substitution-calculator',
  ],
  relatedGuides: [
    'knitting-gauge-explained',
    'yarn-substitution-basics',
    'how-much-yarn-for-a-blanket',
  ],
  faqs: [
    {
      q: 'How many skeins do I need for an adult sweater?',
      a: 'It depends on size, yarn weight, and stitch density. Patterns list yards for a reason—use that first. For freestyle planning, the yarn sweater calculator (/tools/yarn-sweater-calculator/) estimates from dimensions and category after you lock gauge.',
    },
    {
      q: 'Why did I run out of yarn on the second sleeve?',
      a: 'Often the skein put-up was shorter than assumed, gauge was looser than the pattern, or colorwork and ribbing used more than stockinette. Weigh remaining yarn before starting sleeves and keep same dye lots.',
    },
    {
      q: 'Does a larger needle mean more yarn?',
      a: 'Looser fabric usually consumes more yarn per square inch for the same finished measurements. Confirm with a swatch weight if you change needles after shopping.',
    },
    {
      q: 'Can I use blanket yardage charts for sweaters?',
      a: 'Not directly. Sweaters include ease, sleeves, neck shaping, and ribbing. Blanket guides such as how much yarn for a blanket (/guides/how-much-yarn-for-a-blanket/) are for rectangular flat fabric.',
    },
    {
      q: 'What if I substitute yarn?',
      a: 'Match CYC category and total yards, then swatch. See yarn substitution basics (/guides/yarn-substitution-basics/) and the yarn substitution calculator (/tools/yarn-substitution-calculator/).',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'Sweater yarn depends on finished size, ease, Craft Yarn Council yarn weight, and your blocked gauge. Prefer the pattern’s yardage chart when you have one; for custom designs, estimate from surface area and density, then round skeins up. Lock gauge before you buy the full amount.',
    },
    {
      type: 'p',
      content:
        '“How much yarn for a sweater?” is one of the most searched yarn questions—and one of the easiest to get wrong if you shop by ball count alone. Adult pullovers in fingering yarn can need surprising length; bulky cropped cardigans can look huge with fewer yards. This guide explains what drives yardage, how to use planning tools, and how gauge and substitution change the shopping list.',
    },
    {
      type: 'h2',
      content: 'What drives sweater yardage',
    },
    {
      type: 'ul',
      content: [
        'Finished chest, length, and sleeve measurements (plus ease)',
        'CYC yarn weight category and yards per skein',
        'Stitch pattern density (cables and colorwork use more than plain stockinette)',
        'Construction (seamless vs seamed, drop shoulder vs set-in, yoke depth)',
        'Notions that consume yarn: collars, pocket linings, i-cord, duplicate-stitch motifs',
      ],
    },
    {
      type: 'p',
      content:
        'Craft Yarn Council standards describe yarn weight categories and publish body sizing guidance that many patterns follow. Categories and typical gauges are summarized at /reference/yarn-weights/. Your swatch still overrides generic charts when estimating yarn for a specific fabric.',
    },
    {
      type: 'h2',
      content: 'Pattern charts vs freestyle estimates',
    },
    {
      type: 'p',
      content:
        'If you follow a published pattern, start with its yardage by size and add a buffer when your gauge is looser or you lengthen the body. If you design or heavily modify, break the sweater into rectangles and trapezoids (body fronts/back, sleeves, yoke), estimate area, and apply a density factor from a weighed swatch. The yarn sweater calculator (/tools/yarn-sweater-calculator/) is built for that planning style without pretending to replace a graded pattern’s chart.',
    },
    {
      type: 'table',
      content: {
        caption: 'Planning inputs for sweater yarn',
        headers: ['Input', 'Where it comes from', 'Effect on yarn'],
        rows: [
          ['Chest × lengths', 'Schematic or measurements', 'Sets fabric area'],
          ['Ease', 'Fit preference', 'Larger ease → more yarn'],
          ['CYC category', 'Ball band', 'Thicker → fewer yards typical'],
          ['Gauge', 'Blocked swatch', 'Looser → more yarn / sq in'],
          ['Yards per skein', 'Band', 'Converts yards → skeins'],
        ],
      },
    },
    {
      type: 'h2',
      content: 'Gauge before you checkout',
    },
    {
      type: 'p',
      content:
        'Buy a single skein first when you can, swatch in the project stitch, wash, and measure. If stitch gauge differs from the pattern, change needles or rescale counts with the knitting gauge calculator (/tools/knitting-gauge-calculator/). Read knitting gauge explained (/guides/knitting-gauge-explained/) before trusting an unblocked scarf scrap as sweater gauge. Only after gauge settles should you commit to a full dye-lot purchase.',
    },
    {
      type: 'h2',
      content: 'Worked example: worsted adult pullover sketch',
    },
    {
      type: 'p',
      content:
        'Suppose a simple drop-shoulder pullover aimed at about 40 inches of finished chest circumference, hip-length body, and average adult sleeves in category-4 worsted with 200-yard skeins. A pattern for a similar size might list on the order of 1,100–1,600 yards depending on length and stitch—treat that as a planning band, not a universal constant. At 1,400 yards you would buy at least seven skeins (1,400 ÷ 200 = 7) and often eight for ribbing length, swatches, and insurance. Cables or stranded colorwork can push you up a skein or more.',
    },
    {
      type: 'p',
      content:
        'Weigh a 4×4 inch blocked swatch, scale weight to the approximate fabric area of body plus sleeves, and convert with yards per gram from the band for a custom check. If the math says 7.2 skeins, buy 8 of one dye lot.',
    },
    {
      type: 'h2',
      content: 'Substitution and dye lots',
    },
    {
      type: 'p',
      content:
        'Changing brands mid-plan requires yard matching, not ball matching. Use the yarn substitution calculator (/tools/yarn-substitution-calculator/) and yarn substitution basics (/guides/yarn-substitution-basics/). For tonal solids, buy enough of one dye lot for the whole sweater; sleeves knit last are where lot shifts show.',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Shopping from a different size’s yardage line on the pattern',
        'Ignoring that longer sleeves and torso add real yards',
        'Substituting a shorter put-up skein one-for-one',
        'Skipping gauge, then wondering why yarn ran short',
        'Using blanket rectangular estimates for a shaped garment',
      ],
    },
    {
      type: 'h2',
      content: 'Construction details that quietly eat yarn',
    },
    {
      type: 'p',
      content:
        'Pockets, button bands, collars, hoods, and lined hems are easy to forget when you estimate from body and sleeve rectangles alone. A double-thick collar can consume as much yarn as a short sleeve cuff section. Steeked colorwork adds waste yarn for cutting and finishing. If you lengthen a cropped pattern to hip length, multiply the extra body inches by your stitches-per-inch width and rows-per-inch, then convert with yards from a weighed swatch—do not add “about a skein” without arithmetic on large sizes.',
    },
    {
      type: 'p',
      content:
        'Short-row shoulders and shaped necklines redistribute stitch counts but usually do not change total yarn as dramatically as overall length and circumference. Still, heavily shaped yokes with wrap-and-turns can use slightly more than a straight tube of the same outline because of local density. When in doubt, weigh similar finished garments in the same yarn if you have them, or buy the spare skein.',
    },
    {
      type: 'h2',
      content: 'Kids, crop tops, and oversized fits',
    },
    {
      type: 'p',
      content:
        'Children’s sweaters need less yarn, but growth room and durable fibers matter more than shaving a skein. Oversized adult fits with positive ease can jump a full skein compared with a slim schematic in the same category. Use Craft Yarn Council-style body measurement charts as a starting point for chest and length when drafting, then apply your ease preference before estimating yarn.',
    },
    {
      type: 'h2',
      content: 'Cardigans, colorwork, and yarn management',
    },
    {
      type: 'p',
      content:
        'Cardigans need button bands and often overlapping fronts—those strips are easy to omit from a pullover-based mental estimate. Stranded colorwork uses both yarns across rows, so total yards rise even when the garment outline matches a solid pullover. Dominating background colors still need enough continuous yarn for long stretches; contrast colors need enough for motifs without surprising knots mid-bird.',
    },
    {
      type: 'p',
      content:
        'Weigh as you go on large sweaters: after the body, weigh remaining yarn and compare to one finished sleeve’s expected share. That mid-project checkpoint prevents the classic one-sleeve shortfall. Keep labels until the garment is done and blocked so dye-lot numbers remain available if you must buy emergency matching skeins.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Swatch and wash, confirm gauge, run the yarn sweater calculator (/tools/yarn-sweater-calculator/), and purchase same-lot skeins with at least one spare when dye lots are limited. If the yarn changes, restart from yarn substitution basics (/guides/yarn-substitution-basics/) before you trust the old skein count.',
    },
  ],
};

export default guide;
