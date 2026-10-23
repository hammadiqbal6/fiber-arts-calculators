import type { Guide } from './types';

export const guide: Guide = {
  slug: 'half-square-triangle-math',
  title: 'Half-Square Triangle Math',
    description:
    'HST cutting formulas for 2-, 4-, and 8-at-a-time methods, with trimming tips, a worked example, and a free HST calculator.',
  primaryKeyword: 'half square triangle formula',
  datePublished: '2026-10-19',
  dateModified: '2026-10-23',
  relatedTools: [
    'hst-calculator',
    'quilt-size-calculator',
    'seam-allowance-calculator',
  ],
  relatedGuides: [
    'quilt-backing-yardage-guide',
    'how-much-quilt-binding-do-i-need',
  ],
  faqs: [
    {
      q: 'What is the 2-at-a-time HST formula?',
      a: 'A widely used rule is: cut squares to finished HST size + ⅞ inch (0.875"). Draw a diagonal, sew ¼ inch on both sides, cut apart, and press. Trim to unfinished size (finished + ½ inch).',
    },
    {
      q: 'When should I use 8-at-a-time HSTs?',
      a: 'When you need many identical pairs from the same two fabrics. The common formula is about twice the finished size plus 1.75 inches for the starting squares—confirm with the HST calculator (/tools/hst-calculator/).',
    },
    {
      q: 'Why do my HST blocks finish small?',
      a: 'Skipped trimming, scant seam allowances that were too scant, or pressing that stretched the bias edge. Trim every unit to the same unfinished size before block assembly.',
    },
    {
      q: 'How does seam allowance relate to HST size?',
      a: 'Traditional quilting uses a ¼ inch seam. Unfinished HST size is typically finished size + ½ inch so seams land on the design line. The seam allowance calculator (/tools/seam-allowance-calculator/) helps when you alter cut sizes.',
    },
    {
      q: 'How many HSTs fit in a quilt layout?',
      a: 'Divide the quilt’s finished block grid using the quilt size calculator (/tools/quilt-size-calculator/), then multiply blocks by HSTs per block. Add extras for mistakes when cutting large batches.',
    },
  ],
  sections: [
    {
      type: 'takeaway',
      content:
        'For 2-at-a-time HSTs, a common formula is finished size + ⅞ inch for the starting squares. Eight-at-a-time squares are often about twice the finished size plus 1.75 inches. Trim every unit to the same unfinished size (finished + ½ inch) before sewing blocks.',
    },
    {
      type: 'p',
      content:
        'Half-square triangles (HSTs) are the workhorse of scrap quilts, sampler blocks, and modern geometric tops. Accurate cutting formulas keep points sharp and blocks from drifting when you sew grids together. This guide summarizes the usual 2-, 4-, and 8-at-a-time methods, shows a worked batch plan, and points to the free HST calculator (/tools/hst-calculator/) so you are not recalculating by hand for every size.',
    },
    {
      type: 'h2',
      content: 'Finished vs unfinished size',
    },
    {
      type: 'p',
      content:
        'Finished size is what you see inside the seams on the completed quilt. Unfinished size is what you measure after the HST is sewn and trimmed, before it is joined to neighboring units—typically finished size plus ½ inch when using a standard ¼ inch seam on all sides. Mixing unfinished sizes in one block is the fastest path to wavy seams and lost points.',
    },
    {
      type: 'h2',
      content: 'Core cutting formulas',
    },
    {
      type: 'p',
      content:
        'These formulas are long-standing quilting conventions for a ¼ inch seam. Always make a test pair and trim before cutting an entire stash. Slight differences in seam width or trimming preference lead some quilters to add a little extra to the starting square and rely on the trim step.',
    },
    {
      type: 'table',
      content: {
        caption: 'Common HST starting-square formulas',
        headers: ['Method', 'Starting square (rule of thumb)', 'HSTs per fabric pair', 'Best for'],
        rows: [
          ['2-at-a-time', 'Finished + ⅞"', '2', 'Precision, few units'],
          ['4-at-a-time', 'Finished + 1"', '4', 'Balanced speed'],
          ['8-at-a-time', '2 × finished + 1¾"', '8', 'Large matching batches'],
        ],
      },
    },
    {
      type: 'ul',
      content: [
        'Unfinished HST target = finished + ½"',
        'Sew with an accurate ¼ inch unless your pattern specifies otherwise',
        'Press toward the darker fabric or open—be consistent within a project',
        'Trim with a square ruler, diagonal on the seam, edges true to unfinished size',
      ],
    },
    {
      type: 'h2',
      content: 'Worked example: forty 3" finished HSTs',
    },
    {
      type: 'p',
      content:
        'You need forty half-square triangles that finish at 3 inches (unfinished 3.5 inches). Using the 8-at-a-time method, starting squares are about 2 × 3 + 1.75 = 7.75 inches. Each pair of 7.75 inch squares (two fabrics right sides together, marked and sewn on the usual grid) yields eight HSTs. Forty units ÷ 8 = five pairs, so cut five squares of fabric A and five of fabric B at 7.75 inches. Trim each pressed unit to 3.5 inches square before block assembly.',
    },
    {
      type: 'p',
      content:
        'If you prefer 2-at-a-time for maximum control, starting squares would be 3 + 0.875 = 3.875 inches, and you would need twenty fabric pairs (forty squares) to produce forty HSTs. The HST calculator (/tools/hst-calculator/) switches methods and sizes without redoing the arithmetic.',
    },
    {
      type: 'h2',
      content: 'Trimming and pressing',
    },
    {
      type: 'p',
      content:
        'Press, then trim. Skipping the trim is the most common reason HST blocks finish small or skewed. Keep the diagonal seam from corner to corner on the ruler; shave both sides so the unit is square. Bias edges stretch—slide, do not tug, when pressing. If you chain-piece hundreds of units, trim in batches with the same ruler marks so the whole quilt shares one unfinished size.',
    },
    {
      type: 'h2',
      content: 'Planning the quilt around HSTs',
    },
    {
      type: 'p',
      content:
        'Once unit size is fixed, lay out blocks with the quilt size calculator (/tools/quilt-size-calculator/). Add borders only after the HST field measures what you expect. Backing and binding still need their own yardage: see quilt backing yardage guide (/guides/quilt-backing-yardage-guide/) and how much quilt binding do I need (/guides/how-much-quilt-binding-do-i-need/).',
    },
    {
      type: 'h2',
      content: 'Common mistakes',
    },
    {
      type: 'ul',
      content: [
        'Using finished size as the cutting size without the method’s add-on',
        'Mixing 2-at-a-time and 8-at-a-time leftovers without re-trimming to one unfinished size',
        'Stretching bias edges while pressing',
        'Cutting all fabric before a test pair confirms seam and trim habits',
      ],
    },
    {
      type: 'h2',
      content: 'Color placement and nesting seams',
    },
    {
      type: 'p',
      content:
        'HSTs create strong diagonals. Before you cut hundreds of units, sketch or use a design wall so dark/light orientation supports the block (pinwheels, chevrons, flying-adjacent layouts). Pressing toward the dark fabric helps seams nest when two HSTs meet; pressing open reduces bulk in very dense centers. Pick one pressing habit for the quilt and stick to it so nested seams stay predictable.',
    },
    {
      type: 'p',
      content:
        'Strip-piecing shortcuts and specialty rulers can speed production, but they still end at the same unfinished size target. If a ruler’s printed formula differs slightly from the classic add-ons above, trust a test unit and your trim. The goal is a stack of identical unfinished squares, not loyalty to a single mnemonic.',
    },
    {
      type: 'h2',
      content: 'Batch cutting without running short',
    },
    {
      type: 'p',
      content:
        'Calculate how many HSTs the quilt needs, add extras for mistakes (especially on bias-heavy methods), then convert to starting squares for your chosen method. Cut identical sizes from contrast fabrics so pairs match. When using scraps, cut the limiting fabric first—often the feature print—then cut solids to match the count you actually got. Re-check unfinished size every dozen trims; rotary blades that dull mid-batch can create creeping undersized units.',
    },
    {
      type: 'h2',
      content: 'From HST units to quilt yardage',
    },
    {
      type: 'p',
      content:
        'Once you know how many HSTs you need, convert starting squares into fabric yardage by laying squares on your usable fabric width. Remember seam allowances are already inside the HST formulas; do not add another ¼ inch on each square “just in case” or units grow. Extra insurance belongs in spare units, not in inflating every cut.',
    },
    {
      type: 'p',
      content:
        'Bias edges on HSTs make starch or careful handling worthwhile before block assembly. If you are shipping blocks to a bee, agree on unfinished size in writing. Mixed unfinished sizes from different makers are a classic bee-quilt headache that trimming discipline prevents.',
    },
    {
      type: 'h2',
      content: 'Next steps',
    },
    {
      type: 'p',
      content:
        'Pick a method, run the HST calculator (/tools/hst-calculator/), sew one test pair, trim to unfinished size, then cut the full batch. Keep a written unfinished size on your cutting notes for every scrap bin that joins the project later. When the top is finished, plan backing and binding with quilt backing yardage guide (/guides/quilt-backing-yardage-guide/) and how much quilt binding do I need (/guides/how-much-quilt-binding-do-i-need/) so shopping stays coordinated.',
    },
  ],
};

export default guide;
