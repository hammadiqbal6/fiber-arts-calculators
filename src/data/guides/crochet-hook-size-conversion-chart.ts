import type { Guide } from './types';

export const guide: Guide = {
  slug: 'crochet-hook-size-conversion-chart',
  title: 'Crochet Hook Size Conversion Chart',
  description:
    'Convert crochet hook sizes across metric, US, and UK labels. Pair with yarn weight standards and a free needle-hook converter.',
  primaryKeyword: 'crochet hook size conversion chart',
  datePublished: '2026-10-23',
  dateModified: '2026-10-24',
  relatedTools: ['needle-hook-converter'],
  relatedGuides: [
    'yarn-substitution-basics',
    'knitting-gauge-explained',
    'how-much-yarn-for-a-blanket',
  ],
  faqs: [
    {
      q: 'Are US and UK crochet hook letters the same?',
      a: 'No. Letter and number systems differ by region. Prefer metric millimeters when you can, and confirm with a gauge swatch. Use the needle-hook converter (/tools/needle-hook-converter/) for quick label checks.',
    },
    {
      q: 'What hook size should I use for worsted yarn?',
      a: 'Ball bands and Craft Yarn Council category guidance suggest typical hook ranges by yarn weight, but your gauge swatch decides. See /reference/yarn-weights/ for category context.',
    },
    {
      q: 'Why does my gauge differ with the “same” size from two brands?',
      a: 'Shaft shape, material, and manufacturing tolerances vary. Two hooks labeled identically can crochet slightly differently—swatch when precision matters.',
    },
    {
      q: 'Do steel hooks use the same numbering as aluminum hooks?',
      a: 'Steel lace hooks often use a different number scale. Do not assume a steel “7” matches an aluminum “7.” Check metric diameter.',
    },
    {
      q: 'How do hook conversions relate to yarn substitution?',
      a: 'When you change yarn category, you usually change hook size too. Read yarn substitution basics (/guides/yarn-substitution-basics/) and confirm gauge before large projects.',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'Metric millimeters are the clearest shared crochet hook label; US letters and UK numbers do not always map one-to-one. Convert carefully, then swatch for gauge. Use the needle-hook converter (/tools/needle-hook-converter/) and CYC yarn weight context at /reference/yarn-weights/.',
    },
    {
      type: 'p',
      content:
        'A pattern written with US hook letters, a ball band printed in millimeters, and a vintage UK book on the shelf can feel like three different crafts. Hook size conversion charts exist to translate labels—not to replace gauge. This guide explains how to use conversions safely, what to watch between steel and aluminum hooks, and how yarn weight categories connect to typical tool ranges on the ball band and in the reference chart at /reference/yarn-weights/.',
    },
    {
      type: 'h2',
      content: 'Why metric is the bridge',
    },
    {
      type: 'p',
      content:
        'Millimeter measurements describe the shaft diameter directly. US letter sizes and older UK numbers are labels layered on top of that physical size. When a chart or converter gives a match, treat it as “approximately this diameter,” then verify with a swatch in your yarn. Craft Yarn Council materials discuss hooks and needles alongside the Standard Yarn Weight System; category pages and bands often list typical metric ranges rather than insisting on one letter forever.',
    },
    {
      type: 'p',
      content:
        'FiberCalc’s needle-hook converter (/tools/needle-hook-converter/) is the interactive companion to this article when you need a fast label check while shopping or reading a pattern.',
    },
    {
      type: 'h2',
      content: 'Using a conversion chart without getting burned',
    },
    {
      type: 'ul',
      content: [
        'Convert to millimeters first when patterns disagree',
        'Note whether the hook is steel (lace) or standard aluminum/inline/tapered',
        'Check the yarn’s CYC category on /reference/yarn-weights/ for typical ranges',
        'Swatch the project stitch; change hook until fabric and drape look right',
        'Write the metric size on your project notes so future you is not guessing',
      ],
    },
    {
      type: 'table',
      content: {
        caption: 'How to read hook labels in practice',
        headers: ['Label style', 'What it tells you', 'Watch-outs'],
        rows: [
          ['Metric (mm)', 'Shaft diameter', 'Best shared language'],
          ['US letters/numbers', 'Regional size name', 'Not identical to UK'],
          ['UK numbers', 'Regional size name', 'Different scale than US'],
          ['Steel hook numbers', 'Lace-hook scale', 'Do not mix with aluminum numbers'],
        ],
      },
    },
    {
      type: 'h2',
      content: 'Worked example: pattern vs ball band',
    },
    {
      type: 'p',
      content:
        'A US pattern calls for an H/8 hook with category-4 worsted yarn. Your ball band recommends a 5 mm hook for that yarn. Those often sit in the same neighborhood on conversion charts, but your hands may not match the designer’s tension. Crochet a swatch at 5 mm, measure stitches and rows, and compare to the pattern gauge. If the fabric is dense and small, try a larger metric size; if loose and drapey beyond the design, step down. Keep the metric number in your notes even if you think in US letters.',
    },
    {
      type: 'p',
      content:
        'When substituting yarn to another CYC category, expect to change hooks. Yarn substitution basics (/guides/yarn-substitution-basics/) covers yards and category matching; hook conversion alone will not fix a weight mismatch.',
    },
    {
      type: 'h2',
      content: 'Knitters reading crochet patterns (and vice versa)',
    },
    {
      type: 'p',
      content:
        'Knitting needle sizes also appear in US, UK, and metric systems. The same converter tool handles needles and hooks so mixed toolkits stay organized. Gauge principles parallel knitting—see knitting gauge explained (/guides/knitting-gauge-explained/)—even though stitch anatomy differs. Blanket makers who switch between knit and crochet versions of a throw should re-estimate yarn; denser crochet often needs more length for the same size (how much yarn for a blanket at /guides/how-much-yarn-for-a-blanket/).',
    },
    {
      type: 'h2',
      content: 'Tunisian and specialty hooks',
    },
    {
      type: 'p',
      content:
        'Tunisian (Afghan) hooks are still described by shaft diameter in millimeters, even when the tool is longer or corded. Convert the labeled size the same way, then swatch the Tunisian stitch the pattern uses—gauge rarely matches standard crochet on the “same” millimeter size. Inline vs tapered throats also change how yarn slides; comfort is personal, but notes should still record metric diameter for future repeats. When a vintage pattern lists only a brand-specific size name, measure the shaft with a gauge key or calipers and treat that millimeter reading as truth.'
    },
    {
      type: 'h2',
      content: 'Inline vs tapered hooks and ergonomic handles',
    },
    {
      type: 'p',
      content:
        'Even at the same millimeter rating, inline and tapered hooks shape stitches differently for some crocheters. Ergonomic handles do not change diameter but can change how tightly you hold the tool, which shifts gauge over a long blanket. When a pattern author lists only a US letter, convert to mm, then try the hook style you actually own before declaring the pattern “wrong.”',
    },
    {
      type: 'p',
      content:
        'Travel kits mixed from thrifted hooks are notorious for mislabeled sizes. A cheap metal gauge plate (millimeter holes) is more trustworthy than painted letters that have worn off. If two hooks claim 5.0 mm but only one fits the gauge plate cleanly, believe the plate and mark the handle with a permanent metric label.',
    },
    {
      type: 'h2',
      content: 'Teaching and pattern writing',
    },
    {
      type: 'p',
      content:
        'If you teach or write patterns, publishing metric sizes alongside regional labels reduces conversion errors for readers. Linking a chart is helpful; stating “5.0 mm (US H/8)” in the materials list is clearer still. Students shopping internationally will thank you. When a class brings mixed hook brands, start with a group swatch round so everyone sees how “same mm” can still vary slightly before the project yarn is cut. Steel lace hooks keep their own number scale—say so explicitly when a class mixes thread and yarn tools.',
    },
    {
      type: 'p',
      content:
        'Store a small mm gauge key in every project bag. It settles arguments faster than memory and keeps substitution notes honest when you later open yarn substitution basics (/guides/yarn-substitution-basics/) or estimate a throw with how much yarn for a blanket (/guides/how-much-yarn-for-a-blanket/).',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Assuming US and UK “same number” hooks match',
        'Using steel lace numbering on aluminum charts',
        'Skipping a swatch after converting labels',
        'Changing yarn category but keeping the old hook “because the letter matched”',
        'Ignoring that brand shaft shapes affect comfort and slight gauge',
      ],
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Convert labels with the needle-hook converter (/tools/needle-hook-converter/), confirm CYC category guidance at /reference/yarn-weights/, and lock your metric hook size with a washed or steamed swatch before starting the full project. Keep substitution decisions on yarn substitution basics (/guides/yarn-substitution-basics/) so hook letters do not hide a category mismatch. For large afghans, re-check yarn totals after the hook size settles—see how much yarn for a blanket (/guides/how-much-yarn-for-a-blanket/).',
    },
  ],
  sources: [
    ["Craft Yarn Council — Hooks & needles size chart", "https://www.craftyarncouncil.com/standards/hooks-and-needles"],
    ["Craft Yarn Council — Steel crochet hook sizes", "https://www.craftyarncouncil.com/standards/steel-crochet-hook-crochet-thread-sizes"],
  ],
};

export default guide;
