export type ToolCategory = 'yarn' | 'knitting' | 'crochet' | 'sewing' | 'quilting' | 'reference';

export interface ToolDef {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  primaryKeyword: string;
  category: ToolCategory;
  path: string;
  related: string[];
}

export const TOOLS: ToolDef[] = [
  {
    slug: 'yarn-blanket-calculator',
    title: 'Blanket Yarn Calculator',
    shortTitle: 'Yarn for blankets',
    description: 'Estimate skeins, yards, and grams of yarn for knit or crochet blankets by size and yarn weight.',
    primaryKeyword: 'yarn calculator for blanket',
    category: 'yarn',
    path: '/tools/yarn-blanket-calculator/',
    related: ['crochet-blanket-calculator', 'yarn-substitution-calculator', 'knitting-gauge-calculator'],
  },
  {
    slug: 'yarn-sweater-calculator',
    title: 'Yarn Sweater Calculator',
    shortTitle: 'Yarn for sweaters',
    description: 'Estimate how much yarn you need for a sweater by size, yarn weight, and knit or crochet.',
    primaryKeyword: 'yarn calculator for sweater',
    category: 'yarn',
    path: '/tools/yarn-sweater-calculator/',
    related: ['yarn-blanket-calculator', 'yarn-substitution-calculator', 'cast-on-calculator'],
  },
  {
    slug: 'yarn-hat-calculator',
    title: 'Yarn Hat Calculator',
    shortTitle: 'Yarn for hats',
    description: 'Calculate yarn yardage and skeins for knit or crochet hats by circumference and depth.',
    primaryKeyword: 'yarn calculator for hat',
    category: 'yarn',
    path: '/tools/yarn-hat-calculator/',
    related: ['yarn-scarf-calculator', 'cast-on-calculator', 'knitting-gauge-calculator'],
  },
  {
    slug: 'yarn-scarf-calculator',
    title: 'Yarn Scarf Calculator',
    shortTitle: 'Yarn for scarves',
    description: 'Estimate yarn needed for scarves and wraps by dimensions and yarn weight.',
    primaryKeyword: 'yarn calculator for scarf',
    category: 'yarn',
    path: '/tools/yarn-scarf-calculator/',
    related: ['yarn-hat-calculator', 'yarn-blanket-calculator', 'yarn-substitution-calculator'],
  },
  {
    slug: 'yarn-amigurumi-calculator',
    title: 'Amigurumi Yarn Calculator',
    shortTitle: 'Amigurumi yarn',
    description: 'Estimate yarn for amigurumi projects from finished height and yarn weight.',
    primaryKeyword: 'amigurumi yarn calculator',
    category: 'yarn',
    path: '/tools/yarn-amigurumi-calculator/',
    related: ['yarn-substitution-calculator', 'needle-hook-converter', 'increase-decrease-calculator'],
  },
  {
    slug: 'yarn-substitution-calculator',
    title: 'Yarn Substitution & Weight Converter',
    shortTitle: 'Yarn substitution',
    description: 'Convert yardage between Craft Yarn Council yarn weights and grams, ounces, yards, meters.',
    primaryKeyword: 'yarn substitution calculator',
    category: 'yarn',
    path: '/tools/yarn-substitution-calculator/',
    related: ['yarn-blanket-calculator', 'needle-hook-converter', 'knitting-gauge-calculator'],
  },
  {
    slug: 'knitting-gauge-calculator',
    title: 'Knitting Gauge Calculator',
    shortTitle: 'Knitting gauge',
    description: 'Convert swatch stitches and rows to gauge, finished size, and resized pattern stitch counts.',
    primaryKeyword: 'knitting gauge calculator',
    category: 'knitting',
    path: '/tools/knitting-gauge-calculator/',
    related: ['cast-on-calculator', 'increase-decrease-calculator', 'yarn-sweater-calculator'],
  },
  {
    slug: 'crochet-blanket-calculator',
    title: 'Crochet Blanket Size & Stitch Calculator',
    shortTitle: 'Crochet blanket',
    description: 'Calculate starting chain, stitches across, and rows for a crochet blanket from gauge and size.',
    primaryKeyword: 'crochet blanket calculator',
    category: 'crochet',
    path: '/tools/crochet-blanket-calculator/',
    related: ['yarn-blanket-calculator', 'increase-decrease-calculator', 'knitting-gauge-calculator'],
  },
  {
    slug: 'increase-decrease-calculator',
    title: 'Increase & Decrease Evenly Calculator',
    shortTitle: 'Increase / decrease',
    description: 'Space increases or decreases evenly across a row or round with clear instructions.',
    primaryKeyword: 'increase decrease evenly calculator',
    category: 'knitting',
    path: '/tools/increase-decrease-calculator/',
    related: ['cast-on-calculator', 'knitting-gauge-calculator', 'crochet-blanket-calculator'],
  },
  {
    slug: 'cast-on-calculator',
    title: 'Cast-On Calculator',
    shortTitle: 'Cast on',
    description: 'Calculate how many stitches to cast on from gauge, desired width, ease, and ribbing.',
    primaryKeyword: 'cast on calculator',
    category: 'knitting',
    path: '/tools/cast-on-calculator/',
    related: ['knitting-gauge-calculator', 'increase-decrease-calculator', 'yarn-hat-calculator'],
  },
  {
    slug: 'fabric-yardage-calculator',
    title: 'Fabric Yardage Calculator',
    shortTitle: 'Fabric yardage',
    description: 'Estimate fabric yards or meters for garments, curtains, upholstery, and tablecloths.',
    primaryKeyword: 'fabric yardage calculator',
    category: 'sewing',
    path: '/tools/fabric-yardage-calculator/',
    related: ['seam-allowance-calculator', 'quilt-backing-calculator', 'quilt-binding-calculator'],
  },
  {
    slug: 'quilt-size-calculator',
    title: 'Quilt Size Calculator',
    shortTitle: 'Quilt size',
    description: 'Plan quilt dimensions from block grid, sashing, and borders — or fit blocks to a target size.',
    primaryKeyword: 'quilt size calculator',
    category: 'quilting',
    path: '/tools/quilt-size-calculator/',
    related: ['quilt-backing-calculator', 'quilt-binding-calculator', 'hst-calculator'],
  },
  {
    slug: 'quilt-backing-calculator',
    title: 'Quilt Backing Calculator',
    shortTitle: 'Quilt backing',
    description: 'Calculate backing fabric yardage, panel count, and seam orientation for any quilt size.',
    primaryKeyword: 'quilt backing calculator',
    category: 'quilting',
    path: '/tools/quilt-backing-calculator/',
    related: ['quilt-binding-calculator', 'quilt-size-calculator', 'fabric-yardage-calculator'],
  },
  {
    slug: 'quilt-binding-calculator',
    title: 'Quilt Binding Calculator',
    shortTitle: 'Quilt binding',
    description: 'Find binding strip count and fabric yardage from quilt perimeter and strip width.',
    primaryKeyword: 'quilt binding calculator',
    category: 'quilting',
    path: '/tools/quilt-binding-calculator/',
    related: ['quilt-backing-calculator', 'quilt-size-calculator', 'hst-calculator'],
  },
  {
    slug: 'hst-calculator',
    title: 'Half-Square Triangle & Block Cutting Calculator',
    shortTitle: 'HST cutting',
    description: 'Calculate HST square sizes and yield for 2-at-a-time, 4-at-a-time, and 8-at-a-time methods.',
    primaryKeyword: 'half square triangle calculator',
    category: 'quilting',
    path: '/tools/hst-calculator/',
    related: ['quilt-size-calculator', 'quilt-binding-calculator', 'seam-allowance-calculator'],
  },
  {
    slug: 'cross-stitch-fabric-calculator',
    title: 'Cross-Stitch Fabric (Aida Count) Calculator',
    shortTitle: 'Aida fabric',
    description: 'Convert stitch counts and Aida count into design size and fabric cut size with margins.',
    primaryKeyword: 'cross stitch calculator aida',
    category: 'reference',
    path: '/tools/cross-stitch-fabric-calculator/',
    related: ['needle-hook-converter', 'fabric-yardage-calculator', 'yarn-substitution-calculator'],
  },
  {
    slug: 'needle-hook-converter',
    title: 'Needle & Hook Size Converter',
    shortTitle: 'Needle / hook sizes',
    description: 'Convert knitting needle and crochet hook sizes between US, UK, and metric millimeters.',
    primaryKeyword: 'knitting needle size converter',
    category: 'reference',
    path: '/tools/needle-hook-converter/',
    related: ['yarn-substitution-calculator', 'knitting-gauge-calculator', 'yarn-amigurumi-calculator'],
  },
  {
    slug: 'seam-allowance-calculator',
    title: 'Seam Allowance & Pattern Grading Helper',
    shortTitle: 'Seam allowance',
    description: 'Add seam allowances to finished measurements and grade pattern measurements between sizes.',
    primaryKeyword: 'seam allowance calculator',
    category: 'sewing',
    path: '/tools/seam-allowance-calculator/',
    related: ['fabric-yardage-calculator', 'quilt-size-calculator', 'hst-calculator'],
  },
];

export function getTool(slug: string): ToolDef | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function toolsByCategory(category: ToolCategory): ToolDef[] {
  return TOOLS.filter((t) => t.category === category);
}

export const CATEGORIES: { id: ToolCategory; name: string; path: string; description: string }[] = [
  {
    id: 'yarn',
    name: 'Yarn calculators',
    path: '/knitting-crochet/',
    description: 'Yardage estimates for blankets, sweaters, hats, scarves, amigurumi, and substitutions.',
  },
  {
    id: 'knitting',
    name: 'Knitting tools',
    path: '/knitting-crochet/',
    description: 'Gauge, cast-on, and even increase/decrease calculators.',
  },
  {
    id: 'crochet',
    name: 'Crochet tools',
    path: '/knitting-crochet/',
    description: 'Crochet blanket stitch counts and related yarn tools.',
  },
  {
    id: 'sewing',
    name: 'Sewing calculators',
    path: '/sewing/',
    description: 'Fabric yardage, seam allowance, and pattern grading helpers.',
  },
  {
    id: 'quilting',
    name: 'Quilting calculators',
    path: '/quilting/',
    description: 'Quilt size, backing, binding, and HST cutting tools.',
  },
  {
    id: 'reference',
    name: 'Reference converters',
    path: '/reference/',
    description: 'Needle/hook sizes and cross-stitch Aida fabric sizing.',
  },
];
