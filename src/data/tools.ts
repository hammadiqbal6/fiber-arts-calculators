export type ToolCategory = 'knitting' | 'crochet' | 'sewing' | 'quilting' | 'reference';

export interface ToolDef {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  description: string;
  category: ToolCategory;
  related: string[];
  embeddable?: boolean;
}

export const CATEGORIES: Record<
  ToolCategory,
  { name: string; path: string; description: string }
> = {
  knitting: {
    name: 'Knitting',
    path: '/knitting/',
    description: 'Yarn estimates, gauge, cast-on, and shaping calculators for knitters.',
  },
  crochet: {
    name: 'Crochet',
    path: '/crochet/',
    description: 'Blanket stitch counts, yarn needs, and amigurumi planning tools.',
  },
  sewing: {
    name: 'Sewing',
    path: '/sewing/',
    description: 'Fabric yardage, seam allowance, and pattern grading helpers.',
  },
  quilting: {
    name: 'Quilting',
    path: '/quilting/',
    description: 'Quilt size, backing, binding, and half-square triangle calculators.',
  },
  reference: {
    name: 'Reference',
    path: '/reference/',
    description: 'Yarn weight standards, needle charts, and standard sizes with sources.',
  },
};

export const TOOLS: ToolDef[] = [
  {
    slug: 'yarn-blanket-calculator',
    path: '/tools/yarn-blanket-calculator/',
    title: 'Yarn Blanket Calculator',
    shortTitle: 'Blanket yarn',
    primaryKeyword: 'yarn calculator for blanket',
    secondaryKeywords: ['how much yarn for a blanket', 'crochet blanket yarn calculator', 'afghan yarn estimator'],
    description: 'Estimate how much yarn you need for a blanket by size and Craft Yarn Council weight.',
    category: 'knitting',
    related: ['crochet-blanket-calculator', 'yarn-substitution-calculator', 'yarn-scarf-calculator'],
    embeddable: true,
  },
  {
    slug: 'yarn-sweater-calculator',
    path: '/tools/yarn-sweater-calculator/',
    title: 'Yarn Sweater Calculator',
    shortTitle: 'Sweater yarn',
    primaryKeyword: 'yarn calculator for sweater',
    secondaryKeywords: ['how much yarn for a sweater', 'pullover yarn estimate'],
    description: 'Plan sweater yarn from chest, length, sleeves, and yarn weight.',
    category: 'knitting',
    related: ['yarn-blanket-calculator', 'knitting-gauge-calculator', 'yarn-substitution-calculator'],
  },
  {
    slug: 'yarn-hat-calculator',
    path: '/tools/yarn-hat-calculator/',
    title: 'Yarn Hat Calculator',
    shortTitle: 'Hat yarn',
    primaryKeyword: 'yarn calculator for hat',
    secondaryKeywords: ['how much yarn for a beanie', 'hat yarn estimate'],
    description: 'Estimate yarn for beanies and fitted hats by circumference and depth.',
    category: 'knitting',
    related: ['yarn-scarf-calculator', 'cast-on-calculator', 'yarn-sweater-calculator'],
  },
  {
    slug: 'yarn-scarf-calculator',
    path: '/tools/yarn-scarf-calculator/',
    title: 'Yarn Scarf Calculator',
    shortTitle: 'Scarf yarn',
    primaryKeyword: 'yarn calculator for scarf',
    secondaryKeywords: ['how much yarn for a scarf', 'scarf yardage calculator'],
    description: 'Calculate scarf and cowl yarn from width, length, and yarn weight.',
    category: 'knitting',
    related: ['yarn-hat-calculator', 'yarn-blanket-calculator', 'cast-on-calculator'],
  },
  {
    slug: 'amigurumi-yarn-calculator',
    path: '/tools/amigurumi-yarn-calculator/',
    title: 'Amigurumi Yarn Calculator',
    shortTitle: 'Amigurumi yarn',
    primaryKeyword: 'amigurumi yarn calculator',
    secondaryKeywords: ['how much yarn for amigurumi', 'crochet toy yarn'],
    description: 'Estimate yarn for amigurumi toys by finished height and yarn weight.',
    category: 'crochet',
    related: ['yarn-substitution-calculator', 'crochet-blanket-calculator', 'needle-hook-size-converter'],
  },
  {
    slug: 'yarn-substitution-calculator',
    path: '/tools/yarn-substitution-calculator/',
    title: 'Yarn Substitution Calculator',
    shortTitle: 'Yarn substitution',
    primaryKeyword: 'yarn substitution calculator',
    secondaryKeywords: ['yarn weight converter', 'substitute worsted for DK'],
    description: 'Convert yardage between Craft Yarn Council weight categories.',
    category: 'knitting',
    related: ['yarn-blanket-calculator', 'knitting-gauge-calculator', 'needle-hook-size-converter'],
    embeddable: true,
  },
  {
    slug: 'knitting-gauge-calculator',
    path: '/tools/knitting-gauge-calculator/',
    title: 'Knitting Gauge Calculator',
    shortTitle: 'Gauge',
    primaryKeyword: 'knitting gauge calculator',
    secondaryKeywords: ['stitches per inch calculator', 'resize knitting pattern gauge'],
    description: 'Convert swatch stitches to gauge, finished size, and resized pattern counts.',
    category: 'knitting',
    related: ['cast-on-calculator', 'increase-decrease-calculator', 'yarn-sweater-calculator'],
    embeddable: true,
  },
  {
    slug: 'crochet-blanket-calculator',
    path: '/tools/crochet-blanket-calculator/',
    title: 'Crochet Blanket Calculator',
    shortTitle: 'Crochet blanket',
    primaryKeyword: 'crochet blanket size calculator',
    secondaryKeywords: ['crochet stitch count calculator', 'how many stitches for blanket'],
    description: 'Get starting chain, stitches across, and rows for a crochet blanket size.',
    category: 'crochet',
    related: ['yarn-blanket-calculator', 'amigurumi-yarn-calculator', 'increase-decrease-calculator'],
  },
  {
    slug: 'increase-decrease-calculator',
    path: '/tools/increase-decrease-calculator/',
    title: 'Increase Decrease Calculator',
    shortTitle: 'Inc/dec evenly',
    primaryKeyword: 'increase decrease evenly calculator',
    secondaryKeywords: ['how to increase stitches evenly', 'decrease evenly knitting'],
    description: 'Space increases or decreases evenly across a row or round.',
    category: 'knitting',
    related: ['cast-on-calculator', 'knitting-gauge-calculator', 'crochet-blanket-calculator'],
  },
  {
    slug: 'cast-on-calculator',
    path: '/tools/cast-on-calculator/',
    title: 'Cast-On Calculator',
    shortTitle: 'Cast-on',
    primaryKeyword: 'cast on calculator',
    secondaryKeywords: ['how many stitches to cast on', 'knitting cast on by width'],
    description: 'Calculate cast-on stitches from desired width and your gauge.',
    category: 'knitting',
    related: ['knitting-gauge-calculator', 'increase-decrease-calculator', 'yarn-scarf-calculator'],
  },
  {
    slug: 'fabric-yardage-calculator',
    path: '/tools/fabric-yardage-calculator/',
    title: 'Fabric Yardage Calculator',
    shortTitle: 'Fabric yardage',
    primaryKeyword: 'fabric yardage calculator',
    secondaryKeywords: ['curtain fabric calculator', 'upholstery fabric calculator', 'tablecloth fabric'],
    description: 'Estimate fabric yards/meters for garments, curtains, upholstery, and tablecloths.',
    category: 'sewing',
    related: ['seam-allowance-calculator', 'quilt-backing-calculator', 'quilt-size-calculator'],
    embeddable: true,
  },
  {
    slug: 'quilt-size-calculator',
    path: '/tools/quilt-size-calculator/',
    title: 'Quilt Size Calculator',
    shortTitle: 'Quilt size',
    primaryKeyword: 'quilt size calculator',
    secondaryKeywords: ['quilt size for queen mattress', 'mattress to quilt dimensions'],
    description: 'Size a quilt from mattress dimensions, drop, and pillow tuck.',
    category: 'quilting',
    related: ['quilt-backing-calculator', 'quilt-binding-calculator', 'half-square-triangle-calculator'],
  },
  {
    slug: 'quilt-backing-calculator',
    path: '/tools/quilt-backing-calculator/',
    title: 'Quilt Backing Calculator',
    shortTitle: 'Quilt backing',
    primaryKeyword: 'quilt backing calculator',
    secondaryKeywords: ['how much fabric for quilt backing', 'backing yardage'],
    description: 'Calculate backing fabric yardage including overhang and piecing.',
    category: 'quilting',
    related: ['quilt-size-calculator', 'quilt-binding-calculator', 'fabric-yardage-calculator'],
  },
  {
    slug: 'quilt-binding-calculator',
    path: '/tools/quilt-binding-calculator/',
    title: 'Quilt Binding Calculator',
    shortTitle: 'Quilt binding',
    primaryKeyword: 'quilt binding calculator',
    secondaryKeywords: ['how much binding for a quilt', 'binding strip calculator'],
    description: 'Find binding strip count and fabric needed from quilt perimeter.',
    category: 'quilting',
    related: ['quilt-backing-calculator', 'quilt-size-calculator', 'half-square-triangle-calculator'],
  },
  {
    slug: 'half-square-triangle-calculator',
    path: '/tools/half-square-triangle-calculator/',
    title: 'HST Cutting Calculator',
    shortTitle: 'HST cutting',
    primaryKeyword: 'half square triangle calculator',
    secondaryKeywords: ['HST cutting chart', '8 at a time HST'],
    description: 'Cut sizes for traditional, 2-at-a-time, and 8-at-a-time HSTs.',
    category: 'quilting',
    related: ['quilt-size-calculator', 'quilt-binding-calculator', 'seam-allowance-calculator'],
  },
  {
    slug: 'cross-stitch-fabric-calculator',
    path: '/tools/cross-stitch-fabric-calculator/',
    title: 'Cross-Stitch Fabric Calculator',
    shortTitle: 'Aida fabric',
    primaryKeyword: 'cross stitch fabric calculator',
    secondaryKeywords: ['aida count calculator', 'cross stitch fabric size'],
    description: 'Convert design stitch counts and Aida count into cut fabric size.',
    category: 'sewing',
    related: ['needle-hook-size-converter', 'fabric-yardage-calculator', 'seam-allowance-calculator'],
  },
  {
    slug: 'needle-hook-size-converter',
    path: '/tools/needle-hook-size-converter/',
    title: 'Needle Hook Size Converter',
    shortTitle: 'Needle/hook sizes',
    primaryKeyword: 'knitting needle size conversion',
    secondaryKeywords: ['crochet hook size chart', 'US UK metric needle converter'],
    description: 'Convert knitting needles and crochet hooks between US, UK, and metric.',
    category: 'reference',
    related: ['yarn-substitution-calculator', 'knitting-gauge-calculator', 'amigurumi-yarn-calculator'],
  },
  {
    slug: 'seam-allowance-calculator',
    path: '/tools/seam-allowance-calculator/',
    title: 'Seam Allowance Calculator',
    shortTitle: 'Seam & grading',
    primaryKeyword: 'seam allowance calculator',
    secondaryKeywords: ['pattern grading calculator', 'cut size from finished measurement'],
    description: 'Add seam allowance and ease, plus simple size-to-size pattern grading.',
    category: 'sewing',
    related: ['fabric-yardage-calculator', 'half-square-triangle-calculator', 'quilt-binding-calculator'],
  },
];

export function getTool(slug: string): ToolDef {
  const t = TOOLS.find((x) => x.slug === slug);
  if (!t) throw new Error(`Unknown tool: ${slug}`);
  return t;
}

export function toolsByCategory(cat: ToolCategory): ToolDef[] {
  return TOOLS.filter((t) => t.category === cat);
}

export function relatedTools(slug: string): ToolDef[] {
  const t = getTool(slug);
  return t.related.map((s) => getTool(s));
}
