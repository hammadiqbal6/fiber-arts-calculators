import type { Guide } from './types';
import { guide as howMuchYarnForABlanket } from './how-much-yarn-for-a-blanket';
import { guide as knittingGaugeExplained } from './knitting-gauge-explained';
import { guide as quiltBackingYardageGuide } from './quilt-backing-yardage-guide';
import { guide as halfSquareTriangleMath } from './half-square-triangle-math';
import { guide as yarnSubstitutionBasics } from './yarn-substitution-basics';
import { guide as howManyStitchesToCastOnForAHat } from './how-many-stitches-to-cast-on-for-a-hat';
import { guide as howMuchQuiltBindingDoINeed } from './how-much-quilt-binding-do-i-need';
import { guide as howMuchYarnForASweater } from './how-much-yarn-for-a-sweater';
import { guide as howManySkeinsForAScarf } from './how-many-skeins-for-a-scarf';
import { guide as howToIncreaseEvenlyAcrossARow } from './how-to-increase-evenly-across-a-row';
import { guide as crochetHookSizeConversionChart } from './crochet-hook-size-conversion-chart';
import { guide as howManyYardsOfFabric } from './how-many-yards-of-fabric';
import { guide as whatSizeAidaForCrossStitch } from './what-size-aida-for-cross-stitch';
import { guide as howMuchYarnForAmigurumi } from './how-much-yarn-for-amigurumi';
import { guide as doesCrochetUseMoreYarnThanKnitting } from './does-crochet-use-more-yarn-than-knitting';

export type { Guide, GuideBlock, GuideFaq, GuideTable } from './types';

export const GUIDES: Guide[] = [
  howMuchYarnForABlanket,
  knittingGaugeExplained,
  quiltBackingYardageGuide,
  halfSquareTriangleMath,
  yarnSubstitutionBasics,
  howManyStitchesToCastOnForAHat,
  howMuchQuiltBindingDoINeed,
  howMuchYarnForASweater,
  howManySkeinsForAScarf,
  howToIncreaseEvenlyAcrossARow,
  crochetHookSizeConversionChart,
  howManyYardsOfFabric,
  whatSizeAidaForCrossStitch,
  howMuchYarnForAmigurumi,
  doesCrochetUseMoreYarnThanKnitting,
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
