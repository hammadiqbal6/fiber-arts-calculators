export interface Guide {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  datePublished: string;
  dateModified: string;
  relatedTools: string[];
  /** Full HTML-safe paragraphs and headings as structured blocks */
  sections: { type: 'p' | 'h2' | 'ul' | 'takeaway'; content: string | string[] }[];
}

export const GUIDES: Guide[] = [
  {
    slug: 'how-much-yarn-for-a-blanket',
    title: 'How Much Yarn for a Blanket? (Knit & Crochet)',
    description: 'Practical yardage ranges for baby, throw, and bed blankets by yarn weight, plus how to calculate your own.',
    primaryKeyword: 'how much yarn for a blanket',
    datePublished: '2026-10-19',
    dateModified: '2026-10-19',
    relatedTools: ['yarn-blanket-calculator', 'crochet-blanket-calculator', 'yarn-substitution-calculator'],
    sections: [
      { type: 'takeaway', content: 'A worsted-weight knit throw about 50×60 inches usually needs roughly 1,100–1,800 yards; crochet needs about 25–30% more. Use a swatch weight or our yarn blanket calculator for your exact size and skein length.' },
      { type: 'p', content: '“How much yarn for a blanket?” depends on finished size, yarn weight category, stitch density, and whether you knit or crochet. Ball-band “blanket” suggestions help, but they rarely match custom dimensions. This guide gives planning ranges and a method you can reuse.' },
      { type: 'h2', content: 'Quick yardage ranges (worsted / category 4, knit)' },
      { type: 'ul', content: [
        'Lovey ~12×12": 80–120 yards',
        'Baby ~30×36": 500–700 yards',
        'Throw ~50×60": 1,100–1,800 yards',
        'Twin-size blanket: often 2,000–3,000+ yards',
      ]},
      { type: 'p', content: 'Move one CYC category thicker (bulky) and yardage usually drops; move thinner (DK/fingering) and yardage rises for the same area. Crochet fabric is denser—budget extra yarn or a larger skein count.' },
      { type: 'h2', content: 'Method: area × density' },
      { type: 'p', content: 'Convert your blanket to inches, multiply width by length for area, then multiply by a yarn-density factor for your weight and method. Divide by yards per skein and round up. Our free yarn blanket calculator automates that with a waste allowance.' },
      { type: 'h2', content: 'Worked example' },
      { type: 'p', content: '50×60" throw, worsted, knit, 200 yard skeins: expect on the order of 9–10 skeins after waste, depending on stitch pattern. Cables or tapestry colorwork can add another skein.' },
      { type: 'h2', content: 'Common mistakes' },
      { type: 'ul', content: [
        'Buying by “number of balls” without checking yards per ball',
        'Mixing dye lots on a large solid blanket',
        'Forgetting borders and pom-pom or fringe yarn',
        'Using crochet stitches with a knit-only yardage chart',
      ]},
      { type: 'h2', content: 'Next steps' },
      { type: 'p', content: 'Run the yarn blanket calculator, check CYC weight standards, and read our gauge guide before casting on a wearable or fitted blanket.' },
    ],
  },
  {
    slug: 'knitting-gauge-explained',
    title: 'Knitting Gauge Explained: Measure, Match, Resize',
    description: 'How to measure knitting gauge, fix mismatches, and resize stitch counts so finished measurements stay correct.',
    primaryKeyword: 'knitting gauge explained',
    datePublished: '2026-10-19',
    dateModified: '2026-10-19',
    relatedTools: ['knitting-gauge-calculator', 'cast-on-calculator', 'yarn-sweater-calculator'],
    sections: [
      { type: 'takeaway', content: 'Gauge is stitches and rows over a measured distance—usually per 4 inches. If your stitch gauge differs from the pattern, rescale cast-on counts or change needle size; do not hope blocking will fix a large width error.' },
      { type: 'p', content: 'Gauge is the bridge between a pattern’s numbers and the sweater that fits your body. It is also the reason two knitters can follow the same pattern and get different sizes.' },
      { type: 'h2', content: 'How to measure gauge' },
      { type: 'ul', content: [
        'Knit a swatch at least 5–6 inches wide in the project stitch',
        'Wash and block as you will the garment',
        'Count stitches and rows over 4 inches in the center',
        'Convert to stitches per inch for cast-on math',
      ]},
      { type: 'h2', content: 'When gauge does not match' },
      { type: 'p', content: 'Too many stitches per inch means fabric is tight—try larger needles. Too few stitches means loose fabric—try smaller needles. If you love the fabric but not the gauge, resize the pattern stitch counts with our knitting gauge calculator.' },
      { type: 'h2', content: 'Worked example' },
      { type: 'p', content: 'Pattern: 20 stitches = 4 inches. You get 22 stitches = 4 inches. A 100-stitch cast-on becomes about 110 stitches to keep the same width (100 × 22/20).' },
      { type: 'h2', content: 'FAQ-style tips' },
      { type: 'p', content: 'Row gauge is often fixed by knitting more or fewer rows to length. Stitch gauge controls circumference—treat it as non-negotiable for fitted garments.' },
    ],
  },
  {
    slug: 'quilt-backing-yardage-guide',
    title: 'Quilt Backing Yardage Guide',
    description: 'How to calculate quilt backing fabric, choose seam orientation, and plan overhang for longarm or domestic quilting.',
    primaryKeyword: 'quilt backing yardage',
    datePublished: '2026-10-19',
    dateModified: '2026-10-19',
    relatedTools: ['quilt-backing-calculator', 'quilt-binding-calculator', 'quilt-size-calculator'],
    sections: [
      { type: 'takeaway', content: 'Backing should be larger than the quilt top—often 3–4 inches per side. Piece 44-inch fabric in the orientation that uses fewer yards, or buy wide-back fabric to avoid a seam.' },
      { type: 'p', content: 'Running short on backing stops a quilt on the frame. Measuring once with overhang and panel math prevents that scramble.' },
      { type: 'h2', content: 'Steps' },
      { type: 'ul', content: [
        'Measure the finished top',
        'Add overhang on all sides (ask your longarmer)',
        'Divide the larger dimension across your fabric width to find panels',
        'Multiply panel cut length by panel count and convert inches to yards',
      ]},
      { type: 'h2', content: 'Worked example' },
      { type: 'p', content: 'An 80×90" top with 4" overhang needs an 88×98" backing. On 44" fabric you will piece at least two panels—our quilt backing calculator compares horizontal vs vertical seams.' },
      { type: 'h2', content: 'Tips' },
      { type: 'p', content: 'Press seams open, remove selvages, and square the pieced backing before basting. Wide 108" backs often simplify bed quilts.' },
    ],
  },
  {
    slug: 'half-square-triangle-math',
    title: 'Half-Square Triangle Math (HST Cutting Guide)',
    description: 'Formulas for 2-at-a-time, 4-at-a-time, and 8-at-a-time HSTs with trimming tips and a free calculator link.',
    primaryKeyword: 'half square triangle formula',
    datePublished: '2026-10-19',
    dateModified: '2026-10-19',
    relatedTools: ['hst-calculator', 'quilt-size-calculator', 'seam-allowance-calculator'],
    sections: [
      { type: 'takeaway', content: 'For 2-at-a-time HSTs, cut squares to finished size + 7/8 inch. Eight-at-a-time squares are about twice the finished size plus 1.75 inches. Trim every unit to the same unfinished size.' },
      { type: 'p', content: 'Half-square triangles are the workhorse of scrap quilts. Accurate cutting formulas keep blocks from drifting when you sew grids together.' },
      { type: 'h2', content: 'Core formulas' },
      { type: 'ul', content: [
        '2-at-a-time square = finished + 0.875"',
        '4-at-a-time square = finished + 1"',
        '8-at-a-time square = 2 × finished + 1.75"',
        'Unfinished HST = finished + 0.5"',
      ]},
      { type: 'h2', content: 'Worked example' },
      { type: 'p', content: 'Need forty 3" finished HSTs with the 8-at-a-time method: cut 7.75" squares and make five fabric pairs (ten squares) for forty units.' },
      { type: 'h2', content: 'Trimming' },
      { type: 'p', content: 'Press, then trim. Skipping the trim is the most common reason HST blocks finish small or skewed.' },
    ],
  },
  {
    slug: 'yarn-substitution-basics',
    title: 'Yarn Substitution Basics: Weight, Yardage, Gauge',
    description: 'How to substitute yarn using Craft Yarn Council categories, yards-per-gram, and swatching—not just ball counts.',
    primaryKeyword: 'yarn substitution guide',
    datePublished: '2026-10-19',
    dateModified: '2026-10-19',
    relatedTools: ['yarn-substitution-calculator', 'knitting-gauge-calculator', 'needle-hook-converter'],
    sections: [
      { type: 'takeaway', content: 'Match CYC weight category and total yards first, then swatch for gauge and fabric hand. Never substitute by number of balls alone when yardage per ball differs.' },
      { type: 'p', content: 'Yarn substitution is how stash projects and discontinued colors stay alive. It is also where fit problems begin if you skip math.' },
      { type: 'h2', content: 'A reliable checklist' },
      { type: 'ul', content: [
        'Note the pattern’s CYC weight and listed gauge',
        'Convert required yards to grams if fiber density matters',
        'Pick a candidate with similar yards per 100 g',
        'Change needle/hook to approach gauge',
        'Wash the swatch before deciding',
      ]},
      { type: 'h2', content: 'Worked example' },
      { type: 'p', content: 'Pattern needs 400 yards of worsted. Your DK has more yards per 100 g, so you may need more than 400 yards of DK to knit the same area—or you accept a finer fabric and resize with gauge tools.' },
      { type: 'h2', content: 'Fiber caveats' },
      { type: 'p', content: 'Cotton lacks wool’s bounce; acrylic blocks differently than animal fibers; novelty yarns hide stitch patterns. Substitution is both arithmetic and taste.' },
    ],
  },
  {
    slug: 'how-many-stitches-to-cast-on-for-a-hat',
    title: 'How Many Stitches to Cast On for a Hat?',
    description:
      'Work out hat cast-on stitches from head circumference and gauge, with ease tips for beanies vs fitted hats, plus a free cast-on calculator link.',
    primaryKeyword: 'how many stitches to cast on for a hat',
    datePublished: '2026-10-20',
    dateModified: '2026-10-20',
    relatedTools: ['cast-on-calculator', 'knitting-gauge-calculator', 'yarn-hat-calculator'],
    sections: [
      {
        type: 'takeaway',
        content:
          'Cast-on stitches ≈ head circumference × stitches per inch, then adjust for negative ease (often 10–20% for stretchy ribbed beanies). Measure a blocked gauge swatch; do not guess from the ball band alone.',
      },
      {
        type: 'p',
        content:
          'This guide answers the stitch-count question for hats. For yarn shopping, use the separate yarn hat calculator. For general width math on scarves or sweaters, use the cast-on calculator with your own width and ease.',
      },
      { type: 'h2', content: 'How it is calculated' },
      {
        type: 'p',
        content:
          'stitches = round(circumference_inches × (stitches_in_swatch ÷ swatch_width_inches) × (1 − ease_fraction)). Example: 22″ head, 20 sts over 4″ (5 sts/in), 15% negative ease → 22 × 5 × 0.85 ≈ 94 stitches. Round to a multiple that fits your ribbing (e.g. multiples of 4 for 2×2 rib).',
      },
      { type: 'h2', content: 'Worked example' },
      {
        type: 'p',
        content:
          'Adult woman, 22″ circumference (CYC head chart ranges help), worsted gauge 18 sts/4″ = 4.5 sts/in, classic beanie with ~10% negative ease: 22 × 4.5 × 0.9 ≈ 89, round to 88 for 2×2 rib. Confirm after a brim swatch in the round if your tension changes on DPNs or magic loop.',
      },
      { type: 'h2', content: 'Common mistakes' },
      {
        type: 'ul',
        content: [
          'Using ball-band gauge instead of your blocked swatch',
          'Forgetting negative ease on stretchy rib, then knitting a loose bucket',
          'Casting on for circumference but measuring a flat child’s head too tightly',
        ],
      },
      {
        type: 'h2',
        content: 'Next steps',
      },
      {
        type: 'p',
        content:
          'Run the cast-on calculator with your gauge and ease, check head circumference against CYC charts, then estimate yarn with the hat yardage tool if you still need skein counts.',
      },
    ],
  },
  {
    slug: 'how-much-quilt-binding-do-i-need',
    title: 'How Much Quilt Binding Do I Need?',
    description:
      'Calculate quilt binding strip length and fabric yardage from perimeter and strip width, with joins and corner tips, plus a free binding calculator.',
    primaryKeyword: 'how much quilt binding do I need',
    datePublished: '2026-10-20',
    dateModified: '2026-10-20',
    relatedTools: ['quilt-binding-calculator', 'quilt-size-calculator', 'quilt-backing-calculator'],
    sections: [
      {
        type: 'takeaway',
        content:
          'Binding length ≈ quilt perimeter + 10–20″ for joins and corners. Divide by usable strip length (fabric width minus selvages) to get strip count, then convert strips × strip width into yardage.',
      },
      {
        type: 'p',
        content:
          'This guide explains binding math in words. Use the quilt binding calculator for strip counts and yardage from your exact perimeter. Size and backing questions belong on their own tools and guides so keywords stay distinct.',
      },
      { type: 'h2', content: 'How it is calculated' },
      {
        type: 'p',
        content:
          'perimeter = 2 × (width + length). Add join allowance (often 10–20″). strips = ceil(total_binding_length ÷ strip_usable_length). fabric inches ≈ strips × strip_width (for straight-grain binding cut across width); divide by 36 for yards. Bias binding needs more fabric—check your pattern.',
      },
      { type: 'h2', content: 'Worked example' },
      {
        type: 'p',
        content:
          '60×80″ quilt: perimeter 280″. Add 20″ → 300″ of binding. With 2½″ strips from 42″ usable width: 300 ÷ 42 ≈ 7.2 → 8 strips. Yardage ≈ 8 × 2.5 / 36 ≈ 0.56 yd—buy at least ⅝–¾ yd so joins and mistakes are covered.',
      },
      { type: 'h2', content: 'Tips' },
      {
        type: 'ul',
        content: [
          'Mitered corners consume a little extra length—do not cut the allowance too tight',
          'Join strips on the bias to reduce bulk',
          'Measure the finished quilt after quilting; quilting can draw up the top slightly',
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
