import type { Guide } from './types';

export const guide: Guide = {
  slug: 'how-to-increase-evenly-across-a-row',
  title: 'How to Increase Evenly Across a Row',
  description:
    'Space knitting or crochet increases evenly across a row or round. Formula, worked example, and a free increase calculator.',
  primaryKeyword: 'how to increase evenly across a row',
  datePublished: '2026-10-23',
  dateModified: '2026-10-24',
  relatedTools: ['increase-decrease-calculator', 'cast-on-calculator'],
  relatedGuides: [
    'how-many-stitches-to-cast-on-for-a-hat',
    'knitting-gauge-explained',
    'how-much-yarn-for-a-sweater',
  ],
  faqs: [
    {
      q: 'How do I increase evenly across a knitting row?',
      a: 'Divide the row into sections based on how many increases you need, work a set number of stitches between increases, and place remainders so gaps stay visually even. The increase-decrease calculator (/tools/increase-decrease-calculator/) writes the spacing for you.',
    },
    {
      q: 'Is in-the-round spacing different from flat rows?',
      a: 'Yes. Flat rows often use (increase count + 1) sections so edges stay clean; rounds typically divide into increase-count sections so the join does not stack a double gap. Follow your calculator’s flat vs round mode.',
    },
    {
      q: 'What about decreasing evenly?',
      a: 'The same section idea applies: space decreases so they do not clump. Use the decrease mode on the increase-decrease calculator (/tools/increase-decrease-calculator/).',
    },
    {
      q: 'Do lace patterns change the method?',
      a: 'When a chart pairs yarnovers and decreases, prefer the pattern’s written shaping so the motif stitch count stays stable. Even-increase formulas are for plain stockinette or simple textures unless the designer says otherwise.',
    },
    {
      q: 'How does this relate to hat cast-ons?',
      a: 'Some hats cast on for ribbing then increase into the body. Get the starting count from how many stitches to cast on for a hat (/guides/how-many-stitches-to-cast-on-for-a-hat/), then space increases evenly.',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'To place 8 increases evenly on 96 flat stitches, divide into 9 sections (~10–11 stitches between increases). In general, split the row or round into balanced sections and place one increase in each. Use the increase-decrease calculator (/tools/increase-decrease-calculator/) for the spacing phrase.',
    },
    {
      type: 'p',
      content:
        'Patterns often say “increase X stitches evenly across the next row” without listing every knit and increase. That instruction assumes you know how to space shaping so the fabric does not balloon in one spot. This guide explains the section method, shows a worked example, and links tools for cast-on and hat contexts where even increases show up constantly.',
    },
    {
      type: 'h2',
      content: 'The section method (flat)',
    },
    {
      type: 'p',
      content:
        'A classic approach for flat knitting: think of the increases as dividing the row into (increase count + 1) segments of plain stitches, with an increase sitting between segments. That keeps the first and last stitches from stacking increases on both ends unless you want shaping at the edges. Work the calculated number of stitches, increase, repeat, and distribute any remainder stitches across sections so no gap is more than one stitch longer than another.',
    },
    {
      type: 'p',
      content:
        'Choose an increase that fits the fabric: M1L/M1R for tidy stockinette, kfb when the pattern prefers it, or the designer’s specified method. Consistency matters more than which increase you pick—mixing kfb and M1 in one row can show as a texture stripe.',
    },
    {
      type: 'h2',
      content: 'In the round',
    },
    {
      type: 'p',
      content:
        'On a circular round you usually divide into increase-count sections (not plus one), placing one increase in each section so the join does not create an uneven double gap. Markers help: place a marker each time you complete a section until the spacing becomes muscle memory. Yoke sweaters and hat bodies after ribbing use this constantly.',
    },
    {
      type: 'table',
      content: {
        caption: 'Flat vs round even-increase setup',
        headers: ['Setting', 'Sections (typical)', 'Goal', 'Tool mode'],
        rows: [
          ['Flat row', 'Increases + 1', 'Clean edges, even gaps', 'Flat on calculator'],
          ['Round', 'Increases', 'Even spacing around', 'In the round'],
          ['Decrease evenly', 'Same idea', 'Avoid clumps', 'Decrease mode'],
          ['Charted lace', 'Follow chart', 'Keep motif count', 'Pattern authority'],
        ],
      },
    },
    {
      type: 'h2',
      content: 'Worked example',
    },
    {
      type: 'p',
      content:
        'You have 96 stitches on the needle and need to increase 8 stitches evenly on a flat row. Using the (increases + 1) section idea gives 9 sections. 96 ÷ 9 = 10 stitches per section with a remainder of 6. You will work sections that are mostly 10 stitches between increases, with six of the gaps one stitch longer (11) so the extra stitches disappear quietly. In practice the calculator output reads like “knit 10, increase, knit 11, increase…” until eight increases are placed and 104 stitches remain.',
    },
    {
      type: 'p',
      content:
        'Run the same numbers through the increase-decrease calculator (/tools/increase-decrease-calculator/) to avoid hand errors when remainders get messy. For a hat that needs a larger body after a snug brim, combine this with the cast-on calculator (/tools/cast-on-calculator/) and how many stitches to cast on for a hat (/guides/how-many-stitches-to-cast-on-for-a-hat/).',
    },
    {
      type: 'h2',
      content: 'Crochet notes',
    },
    {
      type: 'p',
      content:
        'In crochet, “increase evenly” usually means placing two stitches in one stitch (or the pattern’s stated increase) at balanced intervals. Count the stitches in the round or row first—amigurumi and hat brims drift if the starting count was wrong. The same even-spacing idea applies; only the stitch anatomy changes.',
    },
    {
      type: 'h2',
      content: 'When not to freestyle',
    },
    {
      type: 'p',
      content:
        'If a lace, cable, or colorwork chart defines where increases land, follow the chart. Even spacing that ignores motif boundaries can break repeats. Sweater armhole and neck shaping also often use specified locations rather than pure even distribution—those are fit decisions, not generic increase math.',
    },
    {
      type: 'h2',
      content: 'Markers, leftovers, and double-checks',
    },
    {
      type: 'p',
      content:
        'After placing increases, count stitches before the next row or round—especially before ribbing transitions or chart setup. Slip-on markers at each increase (or at section boundaries) make frogging less painful when a remainder was mis-distributed. If you also need a new cast-on count for a companion piece, use the cast-on calculator (/tools/cast-on-calculator/) rather than reusing the post-increase total by accident.',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Clumping all increases in the center “to get them done”',
        'Using flat math on a round (or the reverse) and seeing a gap at the join',
        'Forgetting to count the new stitches before the next chart row',
        'Changing increase type mid-row without a reason',
        'Ignoring pattern-specified shaping in favor of generic even spacing',
      ],
    },
    {
      type: 'h2',
      content: 'Choosing increase types for invisible shaping',
    },
    {
      type: 'p',
      content:
        'Lifted increases and paired M1L/M1R lean into the fabric and often look cleaner in stockinette than repeated kfbs, which leave a bump. For garter stitch, the “bump” may disappear into the ridges. In ribbing, increases are ideally placed in knit columns or per the pattern so the rib pattern continues. Whichever increase you choose, use the same one across the even-spacing row unless the designer calls for mirrored pairs at edges.',
    },
    {
      type: 'p',
      content:
        'When increasing a large number of stitches—such as doubling for a ruffle—expect the fabric to flare. Even spacing still applies, but you may need multiple increase rounds rather than one extreme round to avoid puckering. Split a +40 increase into two rounds of +20 if the fabric fights you.',
    },
    {
      type: 'h2',
      content: 'Tracking and verifying',
    },
    {
      type: 'p',
      content:
        'Write the calculator’s phrase on a sticky note or in your project app. Place removable markers after each increase on the first repeat if you are new to the method. After the row or round, count total stitches before starting lace or cable charts. A single missed increase found three inches later is much cheaper to fix than a finished yoke that is short eight stitches.',
    },
    {
      type: 'h2',
      content: 'Yokes, waists, and repeating increase rounds',
    },
    {
      type: 'p',
      content:
        'Raglan and circular yokes often repeat even-increase rounds at set intervals. Each round uses the same spacing idea on a growing stitch count, so re-run the calculator (or follow the pattern’s stated spacing) rather than reusing an old sticky note from the previous increase round. Waist shaping may combine even decreases with dart-style placement; when the designer specifies dart locations, those override pure even spacing.',
    },
    {
      type: 'p',
      content:
        'If you reverse engineer a vintage pattern that only says “increase evenly to X stitches,” compute how many stitches you must add (target minus current), then space that many increases. Confirm the target count matches any later chart multiple. Pair this habit with solid gauge practice from knitting gauge explained (/guides/knitting-gauge-explained/) so the wider fabric still hits the intended measurement.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Count current stitches, decide how many to add, choose flat or round mode in the increase-decrease calculator (/tools/increase-decrease-calculator/), place markers if needed, and re-count before continuing the pattern.',
    },
  ],
  sources: [
    ["Craft Yarn Council — Standards and guidelines", "https://www.craftyarncouncil.com/standards"],
    ["Craft Yarn Council — Knitting abbreviations", "https://www.craftyarncouncil.com/standards/knitting-abbreviations"],
  ],
};

export default guide;
