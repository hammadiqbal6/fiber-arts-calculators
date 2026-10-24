import type { Guide } from './types';

export const guide: Guide = {
  slug: 'yarn-substitution-basics',
  title: 'Yarn Substitution Basics',
  description:
    'Substitute yarn using CYC weight, yards, and gauge—not ball counts. Checklist, worked example, and free substitution tools.',
  primaryKeyword: 'yarn substitution guide',
  datePublished: '2026-10-19',
  dateModified: '2026-10-24',
  relatedTools: [
    'yarn-substitution-calculator',
    'knitting-gauge-calculator',
    'needle-hook-converter',
  ],
  relatedGuides: [
    'how-much-yarn-for-a-blanket',
    'crochet-hook-size-conversion-chart',
    'how-much-yarn-for-a-sweater',
  ],
  faqs: [
    {
      q: 'Can I substitute yarn by matching the number of balls?',
      a: 'No. Balls contain different yardage even inside the same weight category. Match total yards (or meters) and CYC category first, then swatch for gauge and hand.',
    },
    {
      q: 'What does CYC weight category mean for substitution?',
      a: 'The Craft Yarn Council Standard Yarn Weight System groups yarns from 0 (lace) through 7 (jumbo) with typical gauges and tool sizes. Stay in the same category when possible; see /reference/yarn-weights/.',
    },
    {
      q: 'My substitute matches yards but not gauge. What next?',
      a: 'Change needle or hook size toward the pattern gauge, or resize stitch counts with the knitting gauge calculator (/tools/knitting-gauge-calculator/). Fabric hand may still differ by fiber.',
    },
    {
      q: 'How do I convert hook or needle sizes when swapping brands?',
      a: 'Use the needle and hook converter (/tools/needle-hook-converter/) and the crochet hook size conversion chart guide (/guides/crochet-hook-size-conversion-chart/) for metric, US, and UK labels.',
    },
    {
      q: 'Does fiber content matter if weight matches?',
      a: 'Yes. Cotton, linen, wool, and acrylic drape and block differently. Treat fiber as part of the substitution decision, not an afterthought.',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'Never substitute by ball count alone: match Craft Yarn Council weight category and total yards first, then swatch for gauge and fabric hand. Wash the swatch before you commit to a full sweater or blanket.',
    },
    {
      type: 'p',
      content:
        'Yarn substitution keeps stash projects and discontinued colors alive. It is also where fit problems begin if you skip math. A reliable substitute looks at category, length, put-up, fiber, and gauge together—not at a single label word like “worsted.” This guide gives a checklist you can reuse for blankets, scarves, and sweaters, with links to FiberCalc tools that do the arithmetic.',
    },
    {
      type: 'h2',
      content: 'A reliable substitution checklist',
    },
    {
      type: 'ul',
      content: [
        'Note the pattern’s CYC weight category and listed gauge (stitches and rows over 4 inches when given)',
        'Record total yards or meters required—not just skein count',
        'Compare yards per 100 g (or per ounce) if fiber density differs',
        'Pick a candidate in the same CYC category when possible',
        'Adjust needle or hook to approach gauge; convert sizes if labels differ',
        'Wash and block a swatch before buying the full amount',
      ],
    },
    {
      type: 'p',
      content:
        'The yarn substitution calculator (/tools/yarn-substitution-calculator/) helps compare put-ups and lengths. For category context, use the CYC summary at /reference/yarn-weights/. Brand marketing names (“DK,” “worsted,” “aran”) sometimes disagree with the icon on the band—trust the category number and your swatch.',
    },
    {
      type: 'h2',
      content: 'Yards, grams, and why ball counts mislead',
    },
    {
      type: 'p',
      content:
        'Two category-4 skeins can contain very different yardage. Planning a blanket or sweater by “eight balls” without reading yards per ball is a classic shortage. Convert the pattern’s requirement into total length, divide by your skein’s length, and round up. If you only know weight, yards per gram from the band lets you compare density: a yarn with more yards per 100 g is usually finer within or near its category and may need more length to cover the same area.',
    },
    {
      type: 'table',
      content: {
        caption: 'Substitution factors beyond “same weight”',
        headers: ['Factor', 'Why it matters', 'Where to check'],
        rows: [
          ['CYC category', 'Sets expected gauge range', 'Ball band; /reference/yarn-weights/'],
          ['Total yards', 'Determines skein count', 'Pattern + substitution calculator'],
          ['Yards per 100 g', 'Hints at thickness/density', 'Band math'],
          ['Fiber', 'Drape, elasticity, blocking', 'Fiber content line'],
          ['Gauge swatch', 'Confirms fit and fabric', 'Blocked swatch + gauge calculator'],
        ],
      },
    },
    {
      type: 'h2',
      content: 'Worked example: 400 yards of worsted to DK',
    },
    {
      type: 'p',
      content:
        'A scarf pattern calls for 400 yards of category-4 worsted at a stated gauge. Your stash DK (category 3) has more yards per 100 g and knits a finer fabric on the needles the pattern suggests. If you force the same stitch counts, the scarf will be narrower unless you add stitches. Options: (1) stay with worsted-category yarn and match yards; (2) accept DK fabric, swatch, and resize width with the knitting gauge calculator (/tools/knitting-gauge-calculator/); (3) hold the DK double if the pattern and your swatch support it—then recount yardage because each yard of fabric uses two strands.',
    },
    {
      type: 'p',
      content:
        'For large projects, incomplete substitution math multiplies risk. Blanket planners should revisit how much yarn for a blanket (/guides/how-much-yarn-for-a-blanket/); sweater knitters should read how much yarn for a sweater (/guides/how-much-yarn-for-a-sweater/) after gauge is locked.',
    },
    {
      type: 'h2',
      content: 'Hooks, needles, and label languages',
    },
    {
      type: 'p',
      content:
        'Changing tools is often part of substitution. Metric hook sizes are the clearest shared language; US and UK labels differ. Use the needle-hook converter (/tools/needle-hook-converter/) and crochet hook size conversion chart (/guides/crochet-hook-size-conversion-chart/) when a pattern and a ball band disagree on notation. Change one variable at a time: yarn first or needle first, then re-swatch.',
    },
    {
      type: 'h2',
      content: 'Fiber caveats',
    },
    {
      type: 'p',
      content:
        'Cotton lacks wool’s bounce and may need different ease in garments. Acrylic blocks differently than animal fibers. Plant blends can grow after washing. Novelty yarns hide stitch patterns that the designer expected to show. Substitution is arithmetic plus taste: a technically correct yardage match can still feel wrong in the hand.',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Matching ball counts instead of yards',
        'Ignoring CYC category icons on the band',
        'Skipping a washed swatch for sweaters and fitted hats',
        'Changing fiber and needle size at once without notes',
        'Forgetting that crochet density may need extra yarn vs a knit pattern’s chart',
      ],
    },
    {
      type: 'h2',
      content: 'Color, dye lots, and hand-dyed skeins',
    },
    {
      type: 'p',
      content:
        'Hand-dyed and kettle-dyed yarns vary between skeins even inside one colorway. When substituting into a large solid project, alternate skeins every other row or round to blend shifts. Semi-solids hide substitutions better than solids; speckles can mask small gauge differences but may clash with highly textured stitches. If the original yarn was a tonal and your substitute is high-contrast variegated, expect stitch definition and pooling to change even when yards and category match.',
    },
    {
      type: 'p',
      content:
        'Care labels belong in the substitution checklist. A superwash wool and a non-superwash wool at the same category will not behave the same in the wash. Blanket and baby projects often need machine-washable fiber; a “perfect” gauge match in non-washable wool may be the wrong substitute for the wearer. Write care requirements beside yardage on your shopping list.',
    },
    {
      type: 'h2',
      content: 'Holding yarns double and reinventing gauge',
    },
    {
      type: 'p',
      content:
        'Holding two strands of fingering to approximate DK or worsted is a valid substitution strategy when you swatch carefully. Remember that yardage doubles in consumption for the fabric length: each yard of knitted fabric uses two yards from the balls. The yarn substitution calculator (/tools/yarn-substitution-calculator/) helps you see put-up math; your swatch confirms whether the doubled fabric matches the pattern’s intended hand.',
    },
    {
      type: 'h2',
      content: 'Working with discontinued and stash yarns',
    },
    {
      type: 'p',
      content:
        'Discontinued yarns force substitution even when you love the original. Photograph the ball band, note yards per gram, and search for successors in the same CYC category with similar balance of yards to weight. Stash diving works the same way in reverse: start from what you own, compute total yards available, and only then pick a pattern that fits the yardage—not the other way around.',
    },
    {
      type: 'p',
      content:
        'When multiple stash skeins must combine to meet a yardage target, ensure they truly share category and preferred needle size. A stripe plan can celebrate small differences; a solid sweater will highlight them. Test wash a mixed swatch if fiber contents differ, watching for differential bleeding or growth.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'List category, yards, and gauge from the pattern; compare candidates in the yarn substitution calculator (/tools/yarn-substitution-calculator/); swatch and wash; then lock tool sizes and skein counts before you wind the full project.',
    },
  ],
  sources: [
    ["Craft Yarn Council — Standard Yarn Weight System", "https://www.craftyarncouncil.com/standards/yarn-weight-system"],
    ["Craft Yarn Council — Hooks & needles size chart", "https://www.craftyarncouncil.com/standards/hooks-and-needles"],
  ],
};

export default guide;
