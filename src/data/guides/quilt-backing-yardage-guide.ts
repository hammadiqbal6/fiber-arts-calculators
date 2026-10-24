import type { Guide } from './types';

export const guide: Guide = {
  slug: 'quilt-backing-yardage-guide',
  title: 'Quilt Backing Yardage Guide',
  description:
    'Calculate quilt backing fabric with overhang, panel seams, and wide-back options. Includes a worked example and free calculator links.',
  primaryKeyword: 'quilt backing yardage',
  datePublished: '2026-10-19',
  dateModified: '2026-10-24',
  relatedTools: [
    'quilt-backing-calculator',
    'quilt-binding-calculator',
    'quilt-size-calculator',
  ],
  relatedGuides: [
    'how-much-quilt-binding-do-i-need',
    'half-square-triangle-math',
  ],
  faqs: [
    {
      q: 'How much bigger should backing be than the quilt top?',
      a: 'A common planning rule of thumb is about 3–4 inches of overhang per side for domestic basting; longarm quilters often ask for more—confirm with your quilter before cutting.',
    },
    {
      q: 'Should I seam backing horizontally or vertically?',
      a: 'Choose the orientation that uses fewer yards of your fabric width after selvages. The quilt backing calculator (/tools/quilt-backing-calculator/) compares panel layouts for you.',
    },
    {
      q: 'Is wide-back fabric worth it?',
      a: '108-inch wide backs often eliminate a center seam on bed quilts, which saves piecing time. Compare cost per usable area against pieced 42–44 inch quilting cotton.',
    },
    {
      q: 'Do I remove selvages before piecing backing?',
      a: 'Yes. Selvages can pucker and print differently; trim them so seam allowances sit in stable woven fabric.',
    },
    {
      q: 'What about binding after backing?',
      a: 'Backing and binding are separate yardage problems. After the quilt is quilted, measure the finished perimeter and use how much quilt binding do I need (/guides/how-much-quilt-binding-do-i-need/).',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'Backing should be larger than the quilt top—often about 3–4 inches per side as a planning rule of thumb (ask your longarmer). Piece standard-width fabric in the orientation that uses fewer yards, or buy wide-back fabric to avoid a seam. Confirm overhang before you cut.',
    },
    {
      type: 'p',
      content:
        'Running short on backing stops a quilt on the frame or the dining-room basting table. Quilt backing yardage is not the same as top fabric: you must add overhang, account for fabric width after selvages, and decide whether panels run with the length or the width of the quilt. This guide walks through the steps, a worked example, and when wide-back fabric simplifies the math.',
    },
    {
      type: 'h2',
      content: 'Measure the top, then add overhang',
    },
    {
      type: 'p',
      content:
        'Measure the finished quilt top width and length after borders are attached and the top is pressed square. Add overhang on all four sides. Domestic machine quilters often plan roughly 3–4 inches per side; many longarm studios request more so clamps and leaders have fabric to hold. If someone else will quilt it, use their written requirement instead of a generic rule of thumb.',
    },
    {
      type: 'p',
      content:
        'Useful related planning: block and border layout with the quilt size calculator (/tools/quilt-size-calculator/), and common craft sizes on /reference/quilt-sizes/. Mattress dimensions matter when the quilt must cover a specific bed with drop.',
    },
    {
      type: 'h2',
      content: 'Panel math on standard-width fabric',
    },
    {
      type: 'p',
      content:
        'Quilting cotton is often sold around 42–44 inches of usable width after selvages—always measure your bolt. Divide the larger backing dimension across that usable width to see how many panels you need, then multiply panel cut length by panel count and convert inches to yards (divide by 36). Try both seam orientations: a horizontal seam versus a vertical seam can change total yardage noticeably on rectangular bed quilts.',
    },
    {
      type: 'table',
      content: {
        caption: 'Backing planning checklist',
        headers: ['Step', 'What to record', 'Why it matters'],
        rows: [
          ['1', 'Top width × length', 'Base rectangle before overhang'],
          ['2', 'Overhang per side', 'Longarm vs domestic needs differ'],
          ['3', 'Usable fabric width', 'After selvages, not bolt label alone'],
          ['4', 'Panel orientation', 'Fewer yards wins'],
          ['5', 'Seam finishing', 'Press open; square before basting'],
        ],
      },
    },
    {
      type: 'ul',
      content: [
        'Remove selvages before sewing panels',
        'Use a ½ inch seam allowance for backing joins unless your pattern says otherwise',
        'Press seams open to reduce bulk under quilting',
        'Square the pieced backing; trim only after confirming both dimensions still clear overhang',
      ],
    },
    {
      type: 'h2',
      content: 'Worked example: 80×90" top',
    },
    {
      type: 'p',
      content:
        'An 80×90 inch top with 4 inches of overhang on each side needs an 88×98 inch backing rectangle. On fabric with about 42 inches usable width, you cannot cover 88 inches with one panel, so you will piece at least two panels. One common approach uses two panels cut along the 98-inch direction: each panel about 98 inches long, seamed to create enough width. Yardage is roughly (98 × 2) ÷ 36 ≈ 5.5 yards before extra for squaring and mistakes—buy a little more if the print needs matching.',
    },
    {
      type: 'p',
      content:
        'Compare that to a horizontal seam layout or to 108-inch wide-back fabric, which may cover 88 inches of width without a center seam if the bolt is truly wide enough after trimming. Run both options in the quilt backing calculator (/tools/quilt-backing-calculator/) so cost and seam placement are visible before you cut.',
    },
    {
      type: 'h2',
      content: 'Wide-back, directional prints, and piecing tips',
    },
    {
      type: 'p',
      content:
        'Wide backs shine on large bed quilts when you want an uninterrupted print or less bulk under dense quilting. Directional prints and one-way designs may force extra length so motifs stay upright across seams. Busy all-over prints hide seams better than large motifs that must match. If you piece leftover top fabrics into a scrappy back, still meet the overhang dimensions—scrappy does not mean smaller.',
    },
    {
      type: 'h2',
      content: 'From backing to binding',
    },
    {
      type: 'p',
      content:
        'Quilting can draw the sandwich up slightly, so measure the quilt again after quilting before cutting binding. Binding strip math is covered in how much quilt binding do I need (/guides/how-much-quilt-binding-do-i-need/) and the quilt binding calculator (/tools/quilt-binding-calculator/). If your top is built from half-square triangles, keep unfinished sizes consistent with half-square triangle math (/guides/half-square-triangle-math/) so the finished top matches the backing plan you shopped for.',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Buying top yardage amounts for the back without adding overhang',
        'Forgetting to subtract selvages from fabric width',
        'Choosing a seam orientation that wastes an extra yard',
        'Skipping the quilter’s overhang requirements',
        'Cutting binding from the backing estimate without a separate perimeter calculation',
      ],
    },
    {
      type: 'h2',
      content: 'Batting, quilt sandwich, and draw-up',
    },
    {
      type: 'p',
      content:
        'Backing size assumes the top’s measured rectangle, but batting choice and quilting density can draw the sandwich up. Dense custom quilting or high-loft batting may shrink the finished perimeter slightly compared with the unquilted top. That is one reason binding should be calculated after quilting when possible. If you must cut binding early, keep a generous join allowance.',
    },
    {
      type: 'p',
      content:
        'When loading on a longarm, follow the studio’s leader and side allowances exactly—those numbers override generic domestic overhang tips. Piece backing seams so they run in a direction that will not fight the quilting plan; some quilters prefer seams parallel to the roller, others prefer to avoid a seam under a dense motif. Ask before you sew if you are sending the quilt out.',
    },
    {
      type: 'h2',
      content: 'Budgeting fabric and leftovers',
    },
    {
      type: 'p',
      content:
        'Compare cost per usable square inch between pieced standard-width fabric and wide-back bolts. A cheaper-per-yard narrow fabric can still cost more overall if it needs three panels and matching. Leftover backing strips are useful for binding tests, sleeve rods on wall quilts, or pieced backs on mini projects—store them labeled with fiber content and width remaining.',
    },
    {
      type: 'h2',
      content: 'Pieced backs and leftover tops',
    },
    {
      type: 'p',
      content:
        'A pieced back from leftover blocks still must meet overhang dimensions. Treat it like a second small quilt top: square it, measure it, and confirm both width and length clear the quilter’s requirements. Extra seams on the back are fine if pressed well; avoid placing a bulky seam exactly where a dense quilting motif will sit if you can plan around it.',
    },
    {
      type: 'p',
      content:
        'Label yardage purchases with the quilt name and intended role (back vs binding vs border). It is easy to cut into “backing” fabric for another project and discover the shortfall only when basting weekend arrives. Keep receipts or bolt-end stickers until the quilt is bound.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Measure the top, add overhang, compare panel orientations in the quilt backing calculator (/tools/quilt-backing-calculator/), and write the cut lengths on your project sheet before visiting the cutting counter.',
    },
  ],
  sources: [
    ["International Sleep Products Association", "https://www.sleepproducts.org/"],
    ["National Museum of African American History — quilt layers overview", "https://nmaahc.si.edu/explore/stories/evolution-expression"],
  ],
};

export default guide;
