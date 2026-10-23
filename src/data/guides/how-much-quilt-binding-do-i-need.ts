import type { Guide } from './types';

export const guide: Guide = {
  slug: 'how-much-quilt-binding-do-i-need',
  title: 'How Much Quilt Binding Do I Need?',
  description:
    'Calculate quilt binding strip length and fabric yardage from perimeter and strip width, with joins, corners, and a free calculator.',
  primaryKeyword: 'how much quilt binding do I need',
  datePublished: '2026-10-20',
  dateModified: '2026-10-23',
  relatedTools: [
    'quilt-binding-calculator',
    'quilt-size-calculator',
    'quilt-backing-calculator',
  ],
  relatedGuides: [
    'quilt-backing-yardage-guide',
    'half-square-triangle-math',
  ],
  faqs: [
    {
      q: 'How do I calculate binding length?',
      a: 'Perimeter = 2 × (width + length). Add about 10–20 inches for joins and corners as a common planning allowance. That total is the continuous binding length you need before cutting strips.',
    },
    {
      q: 'How many binding strips do I cut?',
      a: 'Divide total binding length by usable strip length (fabric width minus selvages). Round up. Convert strips × strip width into yards for shopping.',
    },
    {
      q: 'Is bias binding calculated the same way?',
      a: 'Continuous length is similar, but bias cutting wastes more fabric and needs a different layout. Check your pattern; straight-grain cross-width strips are the default in many modern tutorials.',
    },
    {
      q: 'Should I measure before or after quilting?',
      a: 'Measure the finished quilt after quilting when possible—quilting can draw the top up slightly and change perimeter.',
    },
    {
      q: 'What about backing fabric vs binding fabric?',
      a: 'They are separate purchases unless you plan a scrappy self-binding look. See quilt backing yardage guide (/guides/quilt-backing-yardage-guide/) for back panels.',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'Binding length ≈ quilt perimeter + 10–20 inches for joins and corners (a common rule of thumb). Divide by usable strip length to get strip count, then convert strips × strip width into yardage. Measure after quilting when you can.',
    },
    {
      type: 'p',
      content:
        'Running out of binding on the last corner is avoidable math. This guide explains how perimeter, strip width, and fabric width turn into yardage. Use the quilt binding calculator (/tools/quilt-binding-calculator/) for exact strip counts from your measurements. Size and backing questions belong on their own tools so each keyword stays distinct.',
    },
    {
      type: 'h2',
      content: 'Perimeter first',
    },
    {
      type: 'p',
      content:
        'Measure the quilt’s width and length after quilting and squaring. Perimeter = 2 × (width + length). Add join and corner allowance—many quilters plan roughly 10–20 extra inches so diagonal joins and mitered corners do not leave you short. If the quilt is scalloped or otherwise irregular, walk a tape along the edge instead of using the rectangle formula.',
    },
    {
      type: 'p',
      content:
        'If you are still designing the top, the quilt size calculator (/tools/quilt-size-calculator/) helps estimate finished dimensions from blocks and borders before you shop binding fabric.',
    },
    {
      type: 'h2',
      content: 'From continuous length to strips and yards',
    },
    {
      type: 'p',
      content:
        'For straight-grain binding cut across the fabric width, usable strip length ≈ fabric width minus selvages (often near 40–42 inches on quilting cotton—measure yours). Strip count = ceil(total binding length ÷ usable strip length). Fabric inches along the cut edge ≈ strips × strip width (commonly 2.25″ or 2.5″ cut strips for double-fold binding—follow your pattern). Divide by 36 for yards and round up at the cutting counter.',
    },
    {
      type: 'table',
      content: {
        caption: 'Binding workflow at a glance',
        headers: ['Input', 'Typical source', 'Output'],
        rows: [
          ['Width × length', 'Finished quilt', 'Perimeter'],
          ['Join allowance', '10–20″ rule of thumb', 'Total binding length'],
          ['Usable fabric width', 'Bolt minus selvages', 'Strip length'],
          ['Strip width', 'Pattern (e.g. 2½")', 'Yardage from strip count'],
        ],
      },
    },
    {
      type: 'h2',
      content: 'Worked example: 60×80" quilt',
    },
    {
      type: 'p',
      content:
        'A 60×80 inch quilt has perimeter 2 × (60 + 80) = 280 inches. Add 20 inches → 300 inches of binding. With 2½ inch strips from about 42 inches usable width: 300 ÷ 42 ≈ 7.14 → 8 strips. Yardage ≈ 8 × 2.5 ÷ 36 ≈ 0.56 yards. Buying at least ⅝–¾ yard covers joins, mistakes, and slight measurement error. Join strips on the bias to distribute bulk; press seams open or to the side consistently.',
    },
    {
      type: 'p',
      content:
        'Machine-finish or hand-finish methods do not change the shopping length much, but bulky seams at corners consume a little extra—do not cut the allowance razor-thin. The quilt binding calculator (/tools/quilt-binding-calculator/) repeats this arithmetic for other sizes and strip widths.',
    },
    {
      type: 'h2',
      content: 'Straight-grain vs bias, and scrappy binding',
    },
    {
      type: 'p',
      content:
        'Straight-grain binding is stable and economical for straight edges. Bias binding eases around curves and can show stripes on the diagonal; it generally requires more fabric for the same continuous length because of cutting waste. Scrappy binding still needs the same total length—piecing many short strips works if joins are strong and bulk is managed.',
    },
    {
      type: 'h2',
      content: 'Coordinate with backing and the top',
    },
    {
      type: 'p',
      content:
        'Buy backing with overhang using quilt backing yardage guide (/guides/quilt-backing-yardage-guide/) and the quilt backing calculator (/tools/quilt-backing-calculator/). If the top is HST-heavy, keep unfinished units consistent via half-square triangle math (/guides/half-square-triangle-math/) so the finished perimeter you bind matches the size you planned.',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Forgetting join and corner allowance',
        'Using bolt width including selvages as usable strip length',
        'Measuring the unquilted top only, then finding the quilt shrank on the frame',
        'Cutting bias binding with a straight-grain yardage estimate',
        'Mitering corners without enough free tail to turn cleanly',
      ],
    },
    {
      type: 'h2',
      content: 'Strip width, single-fold, and machine binding',
    },
    {
      type: 'p',
      content:
        'Cut strip width depends on batting loft and whether you prefer narrow or wider finished binding. Many quilters default to 2.5 inch strips for double-fold binding on common battings; thicker sandwiches sometimes need wider strips so the binding fills the edge without strain. Single-fold binding and facing finishes use different cut widths—follow the finishing pattern rather than forcing double-fold math.',
    },
    {
      type: 'p',
      content:
        'Machine-binding methods that sew both sides by machine can be slightly less forgiving of bulk at joins. Bias joins still help. If you flange or add a piping accent, that accent strip needs its own length roughly equal to the perimeter plus joins—budget it separately from the outer binding fabric.',
    },
    {
      type: 'h2',
      content: 'Scrappy and leftover binding plans',
    },
    {
      type: 'p',
      content:
        'Scrappy binding is a great use for leftover border fabric, but short strips mean more joins. Aim for pieces long enough to sew comfortably—very short scraps increase bulk and time. Sort values so high-contrast joins do not land exactly on a corner if that bothers you visually. Even with scraps, compute total length first so you know when you have enough before the final side.',
    },
    {
      type: 'h2',
      content: 'Attaching sequence and leftover math',
    },
    {
      type: 'p',
      content:
        'Leave a generous tail when you start attaching binding so the final join has room to nest neatly. Patterns vary on whether you sew binding to the front or back first; the shopping length does not change, but your comfort with mitering might. If you stop mid-side, pin the remaining binding along the edge to confirm you still have enough before trimming “scraps” into another project.',
    },
    {
      type: 'p',
      content:
        'Leftover binding strips store flat, labeled with cut width and fiber. They are handy for mini quilts, mug rugs, and practice miters. Do not assume leftovers from a 2.5 inch double-fold project will suit a pattern that wants 2.25 inch strips without re-cutting. When coordinating binding fabric with borders, buy binding yardage when you buy borders if dye lots matter—waiting until after quilting risks a missing lot.',
    },
    {
      type: 'h2',
      content: 'Specialty edges',
    },
    {
      type: 'p',
      content:
        'Prairie points, piped edges, and facing finishes replace or modify standard binding and need their own formulas. Scalloped or curved edges almost always prefer bias binding and extra length beyond a simple rectangle perimeter. Walk the tape measure along the finished edge rather than trusting width×length math when the quilt is not a clean rectangle.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Measure the finished quilt, add allowance, run the quilt binding calculator (/tools/quilt-binding-calculator/), and cut strips only after you confirm strip width and join method for your project. Keep backing purchases on a separate list using quilt backing yardage guide (/guides/quilt-backing-yardage-guide/) so the two fabric roles do not steal from each other.',
    },
  ],
};

export default guide;
