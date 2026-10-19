import { round, toInches, type LengthUnit } from '../units';
import type { GaugeResult } from './gauge';

export interface CrochetBlanketInput {
  width: number;
  length: number;
  unit: LengthUnit;
  stitchesPer4in: number;
  rowsPer4in: number;
  /** Starting chain often = stitches + turning chain */
  turningChain?: number;
}

export interface CrochetBlanketResult {
  stitchesAcross: number;
  rows: number;
  totalStitches: number;
  startingChain: number;
  widthIn: number;
  lengthIn: number;
}

export function crochetBlanketStitchCount(input: CrochetBlanketInput): CrochetBlanketResult {
  const widthIn = toInches(input.width, input.unit);
  const lengthIn = toInches(input.length, input.unit);
  const stsPerInch = input.stitchesPer4in / 4;
  const rowsPerInch = input.rowsPer4in / 4;
  const stitchesAcross = Math.round(widthIn * stsPerInch);
  const rows = Math.round(lengthIn * rowsPerInch);
  const turningChain = input.turningChain ?? 1;
  return {
    stitchesAcross,
    rows,
    totalStitches: stitchesAcross * rows,
    startingChain: stitchesAcross + turningChain,
    widthIn: round(widthIn, 2),
    lengthIn: round(lengthIn, 2),
  };
}

export function crochetBlanketFromGauge(
  width: number,
  length: number,
  unit: LengthUnit,
  gauge: GaugeResult,
  turningChain = 1,
): CrochetBlanketResult {
  return crochetBlanketStitchCount({
    width,
    length,
    unit,
    stitchesPer4in: gauge.stitchesPer4in,
    rowsPer4in: gauge.rowsPer4in,
    turningChain,
  });
}
