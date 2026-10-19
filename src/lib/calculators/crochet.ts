import { round, toCm, type LengthUnit } from '../units';

export interface CrochetBlanketInput {
  width: number;
  length: number;
  unit: LengthUnit;
  /** Stitches per 4 inches (or derived from gauge) */
  stitchesPer4in: number;
  rowsPer4in: number;
  /** Starting chain method: foundation stitches ≈ width stitches */
  edgeChains?: number;
}

export interface CrochetBlanketResult {
  stitchesWide: number;
  rowsTall: number;
  startingChain: number;
  totalStitchesApprox: number;
  widthIn: number;
  lengthIn: number;
}

export function crochetBlanketStitches(input: CrochetBlanketInput): CrochetBlanketResult {
  const wIn = input.unit === 'in' ? input.width : input.width / 2.54;
  const lIn = input.unit === 'in' ? input.length : input.length / 2.54;
  const stitchesWide = Math.max(1, Math.round((wIn / 4) * input.stitchesPer4in));
  const rowsTall = Math.max(1, Math.round((lIn / 4) * input.rowsPer4in));
  const edge = input.edgeChains ?? 1; // +1 turning often
  return {
    stitchesWide,
    rowsTall,
    startingChain: stitchesWide + edge,
    totalStitchesApprox: stitchesWide * rowsTall,
    widthIn: round(wIn, 2),
    lengthIn: round(lIn, 2),
  };
}

export function gaugeFromSwatch(
  stitches: number,
  rows: number,
  width: number,
  height: number,
  unit: LengthUnit,
): { stitchesPer4in: number; rowsPer4in: number } {
  const wCm = toCm(width, unit);
  const hCm = toCm(height, unit);
  const stsPerCm = stitches / wCm;
  const rowsPerCm = rows / hCm;
  return {
    stitchesPer4in: round(stsPerCm * 2.54 * 4, 2),
    rowsPer4in: round(rowsPerCm * 2.54 * 4, 2),
  };
}
