import { fromInches, round, toInches, type LengthUnit } from '../units';

/**
 * Aida / evenweave fabric calculator.
 * Stitched size (inches) = stitches / count
 * Fabric to cut = stitched size + margin on each side.
 */
export interface CrossStitchInput {
  stitchesWide: number;
  stitchesHigh: number;
  /** Aida count: threads/squares per inch (11, 14, 16, 18, 22…) */
  aidaCount: number;
  margin: number;
  marginUnit: LengthUnit;
  /** 1 = full stitch on aida; 2 = over-2 on linen/evenweave */
  stitchesPerSquare?: number;
}

export interface CrossStitchResult {
  designWidthIn: number;
  designHeightIn: number;
  fabricWidthIn: number;
  fabricHeightIn: number;
  designWidthCm: number;
  designHeightCm: number;
  fabricWidthCm: number;
  fabricHeightCm: number;
}

export function crossStitchFabric(input: CrossStitchInput): CrossStitchResult {
  const sps = input.stitchesPerSquare ?? 1;
  const effectiveCount = input.aidaCount / sps;
  if (effectiveCount <= 0) throw new Error('Aida count must be positive');
  const designWidthIn = input.stitchesWide / effectiveCount;
  const designHeightIn = input.stitchesHigh / effectiveCount;
  const marginIn = toInches(input.margin, input.marginUnit);
  const fabricWidthIn = designWidthIn + marginIn * 2;
  const fabricHeightIn = designHeightIn + marginIn * 2;
  return {
    designWidthIn: round(designWidthIn, 2),
    designHeightIn: round(designHeightIn, 2),
    fabricWidthIn: round(fabricWidthIn, 2),
    fabricHeightIn: round(fabricHeightIn, 2),
    designWidthCm: round(fromInches(designWidthIn, 'cm'), 2),
    designHeightCm: round(fromInches(designHeightIn, 'cm'), 2),
    fabricWidthCm: round(fromInches(fabricWidthIn, 'cm'), 2),
    fabricHeightCm: round(fromInches(fabricHeightIn, 'cm'), 2),
  };
}

/** Count needed to fit a design into a max finished size. */
export function aidaCountForSize(
  stitchesWide: number,
  maxWidth: number,
  unit: LengthUnit,
): number {
  const maxIn = toInches(maxWidth, unit);
  if (maxIn <= 0) throw new Error('Max width must be positive');
  return round(stitchesWide / maxIn, 1);
}
