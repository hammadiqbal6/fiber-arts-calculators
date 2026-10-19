import { round, toCm, type LengthUnit } from '../units';

/** Common Aida counts (squares per inch) */
export const AIDA_COUNTS = [11, 14, 16, 18, 20, 22] as const;

export interface CrossStitchFabricInput {
  designStitchesWide: number;
  designStitchesHigh: number;
  aidaCount: number;
  /** Margin on each side */
  margin: number;
  marginUnit: LengthUnit;
  /** Extra for framing/hoop (same unit as margin) */
  finishingExtra?: number;
}

export interface CrossStitchFabricResult {
  designWidthIn: number;
  designHeightIn: number;
  designWidthCm: number;
  designHeightCm: number;
  cutWidthIn: number;
  cutHeightIn: number;
  cutWidthCm: number;
  cutHeightCm: number;
  aidaCount: number;
}

export function crossStitchFabric(input: CrossStitchFabricInput): CrossStitchFabricResult {
  if (input.aidaCount <= 0) throw new Error('Aida count must be positive');
  const designW = input.designStitchesWide / input.aidaCount;
  const designH = input.designStitchesHigh / input.aidaCount;
  const marginIn = input.marginUnit === 'in' ? input.margin : input.margin / 2.54;
  const extraIn =
    input.finishingExtra != null
      ? input.marginUnit === 'in'
        ? input.finishingExtra
        : input.finishingExtra / 2.54
      : 0;
  const cutW = designW + 2 * marginIn + 2 * extraIn;
  const cutH = designH + 2 * marginIn + 2 * extraIn;
  return {
    designWidthIn: round(designW, 2),
    designHeightIn: round(designH, 2),
    designWidthCm: round(designW * 2.54, 2),
    designHeightCm: round(designH * 2.54, 2),
    cutWidthIn: round(cutW, 2),
    cutHeightIn: round(cutH, 2),
    cutWidthCm: round(cutW * 2.54, 2),
    cutHeightCm: round(cutH * 2.54, 2),
    aidaCount: input.aidaCount,
  };
}

export function stitchesForSize(
  width: number,
  height: number,
  unit: LengthUnit,
  aidaCount: number,
): { stitchesWide: number; stitchesHigh: number } {
  const wIn = unit === 'in' ? width : width / 2.54;
  const hIn = unit === 'in' ? height : height / 2.54;
  return {
    stitchesWide: Math.round(wIn * aidaCount),
    stitchesHigh: Math.round(hIn * aidaCount),
  };
}

export function convertAidaSize(
  stitches: number,
  fromCount: number,
  toCount: number,
): { designInches: number; designCm: number } {
  const inches = stitches / fromCount;
  return {
    designInches: round(inches, 2),
    designCm: round(inches * 2.54, 2),
  };
}

// silence unused in case tree-shaken wrongly
void toCm;
