import type { Guide } from './types';

export const guide: Guide = {
  slug: 'how-many-stitches-to-cast-on-for-a-hat',
  title: 'How Many Stitches to Cast On for a Hat?',
  description:
    'Calculate hat cast-on stitches from head circumference, gauge, and ease. Worked example, tips, and free cast-on calculator.',
  primaryKeyword: 'how many stitches to cast on for a hat',
  datePublished: '2026-10-20',
  dateModified: '2026-10-23',
  relatedTools: [
    'cast-on-calculator',
    'knitting-gauge-calculator',
    'yarn-hat-calculator',
  ],
  relatedGuides: [
    'knitting-gauge-explained',
    'how-to-increase-evenly-across-a-row',
  ],
  faqs: [
    {
      q: 'How do I calculate hat cast-on stitches?',
      a: 'Multiply head circumference by stitches per inch from a blocked swatch, then apply ease (often 10–20% negative ease for stretchy beanies). Round to a multiple that fits your ribbing.',
    },
    {
      q: 'What is negative ease on a hat?',
      a: 'Negative ease means the knitted circumference is smaller than the head so ribbing stretches to fit. Too little ease makes a loose bucket; too much can feel tight—adjust for yarn stretch and wear preference.',
    },
    {
      q: 'Should I use ball-band gauge for hats?',
      a: 'No. Use your blocked swatch in the brim stitch, preferably in the round if your tension changes on DPNs or magic loop. See knitting gauge explained (/guides/knitting-gauge-explained/).',
    },
    {
      q: 'How is yarn amount different from stitch count?',
      a: 'Stitch count sets circumference. Yardage depends on size, stitch density, and brim style. Estimate skeins with the yarn hat calculator (/tools/yarn-hat-calculator/) after cast-on math is done.',
    },
    {
      q: 'What if I need to increase after the brim?',
      a: 'Some patterns cast on for ribbing then increase into the body. Space those increases with the increase-decrease calculator (/tools/increase-decrease-calculator/) and how to increase evenly across a row (/guides/how-to-increase-evenly-across-a-row/).',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'Cast-on stitches ≈ head circumference × stitches per inch, then adjust for negative ease (often about 10–20% for stretchy ribbed beanies as a rule of thumb). Measure a blocked gauge swatch; do not guess from the ball band alone. Round to a ribbing multiple.',
    },
    {
      type: 'p',
      content:
        'This guide answers the stitch-count question for knitted hats. Head size, gauge, and ease determine the brim cast-on; yarn shopping is a separate step. Use the cast-on calculator (/tools/cast-on-calculator/) with your width and ease for any circumference project, and the yarn hat calculator (/tools/yarn-hat-calculator/) when you need skein estimates.',
    },
    {
      type: 'h2',
      content: 'Measure the head and choose ease',
    },
    {
      type: 'p',
      content:
        'Measure head circumference where the brim will sit, keeping the tape snug but not tight. Craft Yarn Council body and head sizing charts offer typical ranges by age and size category when you cannot measure the wearer—treat those as planning aids, not a substitute for a real measurement when fit matters. For baby gifts, err toward a size chart plus a stretchy rib rather than a rigid exact cast-on.',
    },
    {
      type: 'p',
      content:
        'Ease is the difference between head size and knitted circumference. Stretchy ribbed beanies often use negative ease so the hat stays put. Slouchy hats may use less negative ease or even a bit of positive ease in the body while the brim still hugs. Cable-heavy fabrics stretch less than plain rib—reduce negative ease when the fabric is inelastic.',
    },
    {
      type: 'h2',
      content: 'Gauge first, then the formula',
    },
    {
      type: 'p',
      content:
        'Knit a swatch in the brim stitch, wash and block it, and count stitches over 4 inches. Convert to stitches per inch. Prefer an in-the-round swatch if that is how you will knit the hat. Full method notes live in knitting gauge explained (/guides/knitting-gauge-explained/) and the knitting gauge calculator (/tools/knitting-gauge-calculator/).',
    },
    {
      type: 'p',
      content:
        'Core formula: stitches = round(circumference_inches × stitches_per_inch × (1 − ease_fraction)). Example structure: 22″ head, 5 stitches per inch, 15% negative ease → 22 × 5 × 0.85 ≈ 94 stitches. Round to a multiple of your rib (multiples of 4 for 2×2, multiples of 2 for 1×1).',
    },
    {
      type: 'table',
      content: {
        caption: 'Illustrative hat cast-on planning (not a size standard)',
        headers: ['Head circ.', 'Stitches / 4"', 'Ease', 'Approx. cast-on idea'],
        rows: [
          ['20"', '20 sts (5 / in)', '10% neg.', '~90 (round for rib)'],
          ['22"', '20 sts (5 / in)', '15% neg.', '~94'],
          ['22"', '18 sts (4.5 / in)', '10% neg.', '~89 → 88 for 2×2'],
          ['24"', '18 sts (4.5 / in)', '10% neg.', '~97 → 96 for 2×2'],
        ],
      },
    },
    {
      type: 'h2',
      content: 'Worked example: adult beanie',
    },
    {
      type: 'p',
      content:
        'Adult wearer, 22 inch circumference, worsted yarn with blocked gauge 18 stitches over 4 inches (4.5 stitches per inch), classic beanie with about 10% negative ease: 22 × 4.5 × 0.9 ≈ 89. Round to 88 for 2×2 rib. Knit a short brim tube and try it on before committing to the body height. If the brim feels loose, remove a rib multiple and frog; if tight, add a multiple or ease the negative percentage next time.',
    },
    {
      type: 'p',
      content:
        'After stitch count is set, estimate yarn separately—brim fold, colorwork, and pom-poms all add yardage. The yarn hat calculator (/tools/yarn-hat-calculator/) is the shopping companion to this stitch guide.',
    },
    {
      type: 'h2',
      content: 'Brim to body shaping',
    },
    {
      type: 'p',
      content:
        'Some patterns cast on fewer stitches for a firm rib, then increase into a looser body fabric. When you need to add stitches evenly, use the increase-decrease calculator (/tools/increase-decrease-calculator/) so gaps stay consistent around the round. The same spacing logic appears in how to increase evenly across a row (/guides/how-to-increase-evenly-across-a-row/).',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Using ball-band gauge instead of a blocked swatch',
        'Forgetting negative ease on stretchy rib, then knitting a loose bucket',
        'Measuring a child’s head too tightly or with a thick hair style ignored',
        'Rounding to a number that breaks the ribbing multiple',
        'Changing needle size for the body without rethinking circumference',
      ],
    },
    {
      type: 'h2',
      content: 'Ribbing, brim folds, and fabric stretch',
    },
    {
      type: 'p',
      content:
        '1×1 rib usually stretches more than 2×2 for the same yarn and needle; brioche and cables stretch less. If you cast on for highly elastic rib and then switch to inelastic colorwork, the body may feel larger than the brim—plan increases or a different ease percentage for each section. Folded brims use more height and slightly more yarn; they can also feel firmer on the head, which sometimes lets you use a touch less negative ease in the cast-on.',
    },
    {
      type: 'p',
      content:
        'Cast-on method affects edge flare. A long-tail cast-on in rib can be customized (knit/purl long-tail) to match the brim; a tubular cast-on looks polished but behaves differently in stretch tests. Whatever you choose, evaluate stretch on a swatch tube rather than on a flat piece alone.',
    },
    {
      type: 'h2',
      content: 'Sizing for kids, gifts, and charted sizes',
    },
    {
      type: 'p',
      content:
        'When you cannot measure the wearer, use age-based head circumference ranges from reputable sizing charts such as those discussed in Craft Yarn Council body measurement resources, then pick ease conservatively. Soft, stretchy yarn forgives small errors; stiff cotton blends do not. For gifts, a slightly deeper beanie with a fold-up brim covers more fit uncertainty than a shallow skullcap with aggressive negative ease.',
    },
    {
      type: 'h2',
      content: 'Slouch, beret, and colorwork special cases',
    },
    {
      type: 'p',
      content:
        'Slouch hats often use less negative ease—or none—in the body while keeping a snug brim. Berets may increase well beyond head circumference, then decrease to the crown; the cast-on is only the brim story. Colorwork hats in stranded knitting draw in; many knitters go up a needle size for the colorwork section or cast on a few more stitches so the fabric does not feel undersized. Recheck circumference math whenever the stitch pattern’s elasticity changes mid-hat.',
    },
    {
      type: 'p',
      content:
        'Crown decreases should land on a stitch count that divides cleanly for your decrease scheme (for example multiples of 8 or 10). When you round the cast-on for ribbing, also glance at how the crown will divide so you are not stuck with an awkward remainder at the top. A one-stitch cast-on tweak for rib is fine; a seven-stitch mismatch at the crown is annoying. If you must choose, prefer a clean crown multiple and adjust ease by a percent point or two rather than forcing an awkward division.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Measure, swatch, run the cast-on calculator (/tools/cast-on-calculator/) with your ease, round for ribbing, then estimate yarn with the yarn hat calculator (/tools/yarn-hat-calculator/) if you still need skein counts. Revisit knitting gauge explained (/guides/knitting-gauge-explained/) whenever needle size or yarn changes mid-plan.',
    },
  ],
};

export default guide;
