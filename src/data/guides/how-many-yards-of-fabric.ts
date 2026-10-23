import type { Guide } from './types';

export const guide: Guide = {
  slug: 'how-many-yards-of-fabric',
  title: 'How Many Yards of Fabric Do I Need?',
  description:
    'Estimate fabric yards for dresses, curtains, and quilt-adjacent sewing. Rule-of-thumb ranges, worked example, and free yardage tools.',
  primaryKeyword: 'how many yards of fabric do I need',
  datePublished: '2026-10-23',
  dateModified: '2026-10-23',
  relatedTools: ['fabric-yardage-calculator', 'seam-allowance-calculator'],
  relatedGuides: [
    'how-much-quilt-binding-do-i-need',
    'half-square-triangle-math',
  ],
  faqs: [
    {
      q: 'How many yards of fabric do I need for a simple dress?',
      a: 'It depends on size, length, fabric width, nap, and pattern layout. Many adult dress patterns call for roughly 2–4 yards of 45″ or 60″ fabric as a shopping starting point—treat that as a rule of thumb, then trust the pattern chart and the fabric yardage calculator (/tools/fabric-yardage-calculator/).',
    },
    {
      q: 'How much fabric for curtains?',
      a: 'Plan finished width × fullness (often about 1.5–2.5× the window width for gathered panels), plus hem and header allowances, then convert length into yards using your fabric width and whether panels are cut vertically. Run numbers in the fabric yardage calculator (/tools/fabric-yardage-calculator/).',
    },
    {
      q: 'Does quilt piecing use the same yardage math as garment sewing?',
      a: 'Pieced tops need block, border, and binding math rather than a single dress length. Binding is covered in how much quilt binding do I need (/guides/how-much-quilt-binding-do-i-need/); HSTs in half-square triangle math (/guides/half-square-triangle-math/).',
    },
    {
      q: 'Should I add extra for matching prints or nap?',
      a: 'Yes. Directional prints, plaids, stripes, and napped fabrics (velvet, corduroy) often need extra length so motifs and pile run the same way. Add the pattern’s matching allowance or a planning buffer before you cut.',
    },
    {
      q: 'How do seam allowances change cut fabric?',
      a: 'Finished garment measurements are not cut sizes. Add seam allowance (and hem depth) before estimating rectangles. The seam allowance calculator (/tools/seam-allowance-calculator/) helps turn finished edges into cut dimensions.',
    },
    {
      q: 'Is fabric sold by the yard the same as quilting cotton “fat quarters”?',
      a: 'No. Continuous yardage is cut from a bolt (commonly ~42–44″ usable quilting cotton or ~45″/60″ apparel widths). Fat quarters are pre-cut patches for piecing—handy for scraps, not a substitute for dress or curtain lengths.',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'Fabric yards depend on finished size, fabric width, layout (nap and repeats), and waste—not a single universal number. Use pattern charts when you have them; for custom dresses, curtains, or quilt-adjacent shopping, estimate area plus allowances, then convert with the fabric yardage calculator (/tools/fabric-yardage-calculator/).',
    },
    {
      type: 'p',
      content:
        '“How many yards of fabric do I need?” is the question at every cutting counter, whether you are drafting a summer dress, gathering curtain panels, or stocking up for a quilt weekend. Bolt widths differ, patterns nest differently on the grain, and a directional print can quietly double what a solid would have used. This guide separates rule-of-thumb shopping ranges from project math, shows a worked example, and points to free tools so you buy enough without overbuying blindly.',
    },
    {
      type: 'h2',
      content: 'What drives yardage (before any chart)',
    },
    {
      type: 'p',
      content:
        'Start with four facts: the largest finished dimensions (or pattern piece footprints), the usable fabric width after selvages, whether the fabric has nap or a one-way print, and how much you need for seams, hems, ease, and mistakes. Apparel patterns publish size charts in yards for specific widths—those charts win when you sew a commercial pattern as written. Custom projects and “I only know the window size” curtain jobs need the area-plus-allowance approach instead.',
    },
    {
      type: 'p',
      content:
        'Quilting cotton often measures about 42–44 inches usable; many apparel fabrics are labeled 45″ or 60″. Wider fabric can reduce total yards for the same garment because pieces sit side by side. Narrower fabric or a large motif repeat can increase yards even when the dress looks “simple.”',
    },
    {
      type: 'h2',
      content: 'Rule-of-thumb shopping ranges (labeled as such)',
    },
    {
      type: 'p',
      content:
        'The ranges below are informal shopping starting points makers often hear at the counter—not standards, not substitutes for a pattern yardage chart, and not results from a controlled study. Use them only to ballpark a purchase when you do not yet have a pattern in hand, then refine.',
    },
    {
      type: 'table',
      content: {
        caption: 'Informal fabric shopping starting points (rules of thumb)',
        headers: ['Project vibe', 'Common starting guess', 'What usually changes it'],
        rows: [
          ['Simple adult dress / sundress', '~2–4 yd (45″ or 60″)', 'Size, length, sleeves, flare, width'],
          ['Gathered curtain pair', 'Width × fullness + hems', 'Fullness factor, header style, repeat'],
          ['Straight valance / simple panel', 'Often under 2 yd', 'Return depth, lining, pattern match'],
          ['Quilt top “stash run”', 'Varies by blocks', 'Binding, backing, borders separate'],
        ],
      },
    },
    {
      type: 'p',
      content:
        'For pieced quilts, treat the top, backing, binding, and borders as separate shopping lists. Binding length comes from perimeter math—see how much quilt binding do I need (/guides/how-much-quilt-binding-do-i-need/). Half-square triangles and similar units have their own cutting formulas in half-square triangle math (/guides/half-square-triangle-math/).',
    },
    {
      type: 'h2',
      content: 'Dresses and apparel: pattern chart vs DIY',
    },
    {
      type: 'p',
      content:
        'If you have a commercial pattern, buy from the envelope chart for your size, view, and fabric width. Add extra only when the chart footnotes say so (napped fabrics, matching plaids). If you are drafting or thrifting a pattern without a chart, sketch the largest pieces as rectangles including seam allowance and hem, nest them on a paper “bolt” the width of your fabric, and measure how long that layout runs—that length in inches ÷ 36 is yards before waste.',
    },
    {
      type: 'p',
      content:
        'Seam allowance turns finished measurements into cut sizes. A skirt finished at 28 inches long with a 2-inch hem and ⅝-inch waist seam is not cut at 28 inches. Use the seam allowance calculator (/tools/seam-allowance-calculator/) when you are building custom blocks or grading a muslin into cut fabric.',
    },
    {
      type: 'h2',
      content: 'Curtains: fullness, hems, and repeats',
    },
    {
      type: 'p',
      content:
        'Curtain yardage is mostly width math dressed up as length on the bolt. Decide finished panel length (including hem and header/rod-pocket stack), decide how wide each panel should be after gathering or pleating, then see how many widths of fabric you need. A common planning approach uses a fullness factor—roughly 1.5× for gentler gathers up to about 2–2.5× for fuller traditional looks—as a rule of thumb, not a decorating law. Multiply the window (or rod) width by fullness, divide by usable fabric width to get panel count, then multiply by cut length and convert to yards.',
    },
    {
      type: 'p',
      content:
        'Pattern repeats matter: if the print must match across panels, you may cut longer than the finished length so motifs align. Lined curtains need lining yardage too—often similar cut lengths with fewer matching constraints. The fabric yardage calculator (/tools/fabric-yardage-calculator/) is built for these garment- and home-decor-style estimates with waste and repeat fields.',
    },
    {
      type: 'h2',
      content: 'Quilt-adjacent fabric shopping',
    },
    {
      type: 'p',
      content:
        'Even when you are “just buying fabric for a quilt,” yardage questions split. Background yardage for a block-heavy top is not the same as continuous backing yardage, and binding is a skinny continuous strip problem. If your shopping list mixes dress cotton and quilting cotton, measure usable widths—apparel bolts and quilting bolts are not always interchangeable in layout math.',
    },
    {
      type: 'h2',
      content: 'Worked example: gathered curtain panels',
    },
    {
      type: 'p',
      content:
        'A rod spans 60 inches. You want two gathered panels with about 2× fullness as a planning choice: 60 × 2 = 120 inches of finished fabric width across both panels, or 60 inches of fullness width per panel. Fabric is 54 inches usable. Each panel needs one fabric width (60 ≤ 54? No—60 > 54, so each panel needs two widths seamed, or you reduce fullness). Simpler plan: one width per panel at 54 inches gives total 108 inches ≈ 1.8× fullness—close enough for a casual gather. Cut length is 84 inches finished look plus 8 inches for hem and header = 92 inches. Two panels × 92 inches = 184 inches of fabric length ≈ 5.2 yards → buy 5½ or 6 yards to allow for squaring and mistakes.',
    },
    {
      type: 'p',
      content:
        'Plug the same dimensions into the fabric yardage calculator (/tools/fabric-yardage-calculator/) to adjust waste percentage and pattern repeat instead of doing the longhand every time.',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Buying “3 yards for a dress” without checking fabric width or pattern view',
        'Forgetting nap or one-way prints that forbid rotating pieces',
        'Estimating finished curtain length without hem and header allowances',
        'Using quilt binding math for garment hems (or the reverse)',
        'Ignoring selvage and shrinkage on natural fibers',
        'Treating fat-quarter packs as dress yardage',
      ],
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'List finished sizes and fabric width, add seam and hem allowances with the seam allowance calculator (/tools/seam-allowance-calculator/) when drafting, then estimate yards in the fabric yardage calculator (/tools/fabric-yardage-calculator/). For quilt binding and HST cuts, switch to how much quilt binding do I need (/guides/how-much-quilt-binding-do-i-need/) and half-square triangle math (/guides/half-square-triangle-math/).',
    },
  ],
};

export default guide;
