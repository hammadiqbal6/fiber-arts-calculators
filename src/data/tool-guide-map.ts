/**
 * Topical tool → guide links for the “Learn more” block on tool pages.
 * Every tool should map to at least one guide (enforced by seo-audit).
 */
export const TOOL_GUIDE_MAP: Record<string, string[]> = {
  'yarn-blanket-calculator': [
    'how-much-yarn-for-a-blanket',
    'does-crochet-use-more-yarn-than-knitting',
    'yarn-substitution-basics',
  ],
  'yarn-sweater-calculator': [
    'how-much-yarn-for-a-sweater',
    'knitting-gauge-explained',
    'yarn-substitution-basics',
  ],
  'yarn-hat-calculator': [
    'how-many-stitches-to-cast-on-for-a-hat',
    'knitting-gauge-explained',
  ],
  'yarn-scarf-calculator': [
    'how-many-skeins-for-a-scarf',
    'yarn-substitution-basics',
  ],
  'yarn-amigurumi-calculator': [
    'how-much-yarn-for-amigurumi',
    'yarn-substitution-basics',
  ],
  'yarn-substitution-calculator': [
    'yarn-substitution-basics',
    'how-much-yarn-for-a-blanket',
  ],
  'knitting-gauge-calculator': [
    'knitting-gauge-explained',
    'how-much-yarn-for-a-sweater',
    'how-many-stitches-to-cast-on-for-a-hat',
  ],
  'crochet-blanket-calculator': [
    'does-crochet-use-more-yarn-than-knitting',
    'how-much-yarn-for-a-blanket',
  ],
  'increase-decrease-calculator': [
    'how-to-increase-evenly-across-a-row',
    'how-many-stitches-to-cast-on-for-a-hat',
  ],
  'cast-on-calculator': [
    'how-many-stitches-to-cast-on-for-a-hat',
    'knitting-gauge-explained',
    'how-to-increase-evenly-across-a-row',
  ],
  'fabric-yardage-calculator': [
    'how-many-yards-of-fabric',
    'how-much-quilt-binding-do-i-need',
  ],
  'quilt-size-calculator': [
    'quilt-backing-yardage-guide',
    'how-much-quilt-binding-do-i-need',
    'half-square-triangle-math',
  ],
  'quilt-backing-calculator': [
    'quilt-backing-yardage-guide',
    'how-much-quilt-binding-do-i-need',
  ],
  'quilt-binding-calculator': [
    'how-much-quilt-binding-do-i-need',
    'quilt-backing-yardage-guide',
  ],
  'hst-calculator': [
    'half-square-triangle-math',
    'quilt-backing-yardage-guide',
  ],
  'cross-stitch-fabric-calculator': [
    'what-size-aida-for-cross-stitch',
    'how-many-yards-of-fabric',
  ],
  'needle-hook-converter': [
    'crochet-hook-size-conversion-chart',
    'yarn-substitution-basics',
  ],
  'seam-allowance-calculator': [
    'how-many-yards-of-fabric',
    'half-square-triangle-math',
  ],
};

export function guidesForTool(toolSlug: string): string[] {
  return TOOL_GUIDE_MAP[toolSlug] ?? [];
}
