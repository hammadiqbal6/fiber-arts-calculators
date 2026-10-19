import { fromYards, round, toInches, type FabricLengthUnit, type LengthUnit } from '../units';

export interface QuiltSizeResult {
  widthIn: number;
  lengthIn: number;
  blocksAcross: number;
  blocksDown: number;
  totalBlocks: number;
  finishedBlockIn: number;
}

/** Compute quilt top size from block grid + sashings + borders. */
export function quiltFromBlocks(
  blocksAcross: number,
  blocksDown: number,
  finishedBlockIn: number,
  sashingIn = 0,
  borderIn = 0,
): QuiltSizeResult {
  const widthIn =
    blocksAcross * finishedBlockIn +
    Math.max(0, blocksAcross - 1) * sashingIn +
    borderIn * 2;
  const lengthIn =
    blocksDown * finishedBlockIn +
    Math.max(0, blocksDown - 1) * sashingIn +
    borderIn * 2;
  return {
    widthIn: round(widthIn, 2),
    lengthIn: round(lengthIn, 2),
    blocksAcross,
    blocksDown,
    totalBlocks: blocksAcross * blocksDown,
    finishedBlockIn,
  };
}

/** How many blocks fit a target quilt size. */
export function blocksForQuilt(
  targetWidth: number,
  targetLength: number,
  unit: LengthUnit,
  finishedBlockIn: number,
  sashingIn = 0,
  borderIn = 0,
): QuiltSizeResult {
  const w = toInches(targetWidth, unit) - borderIn * 2;
  const l = toInches(targetLength, unit) - borderIn * 2;
  const step = finishedBlockIn + sashingIn;
  const blocksAcross = Math.max(1, Math.floor((w + sashingIn) / step));
  const blocksDown = Math.max(1, Math.floor((l + sashingIn) / step));
  return quiltFromBlocks(blocksAcross, blocksDown, finishedBlockIn, sashingIn, borderIn);
}

export interface QuiltBackingInput {
  quiltWidth: number;
  quiltLength: number;
  unit: LengthUnit;
  fabricWidth: number;
  fabricWidthUnit: LengthUnit;
  /** Extra inches beyond quilt on each side (default 4") */
  overhangIn?: number;
  outputUnit?: FabricLengthUnit;
}

export interface QuiltBackingResult {
  yards: number;
  meters: number;
  panels: number;
  seamOrientation: 'horizontal' | 'vertical' | 'none';
  cutLengthIn: number;
}

export function quiltBacking(input: QuiltBackingInput): QuiltBackingResult {
  const overhang = input.overhangIn ?? 4;
  const qw = toInches(input.quiltWidth, input.unit) + overhang * 2;
  const ql = toInches(input.quiltLength, input.unit) + overhang * 2;
  const fw = toInches(input.fabricWidth, input.fabricWidthUnit);

  // Prefer fewer seams: try vertical seam (panels side by side along width) vs horizontal
  const verticalPanels = Math.ceil(qw / fw);
  const verticalCut = ql * verticalPanels;

  const horizontalPanels = Math.ceil(ql / fw);
  const horizontalCut = qw * horizontalPanels;

  let panels: number;
  let cutLengthIn: number;
  let seamOrientation: QuiltBackingResult['seamOrientation'];

  if (qw <= fw && ql <= fw * 2) {
    // Single width of fabric long enough
    if (qw <= fw) {
      panels = 1;
      cutLengthIn = ql;
      seamOrientation = 'none';
    } else {
      panels = verticalPanels;
      cutLengthIn = verticalCut;
      seamOrientation = 'vertical';
    }
  } else if (verticalCut <= horizontalCut) {
    panels = verticalPanels;
    cutLengthIn = verticalCut;
    seamOrientation = panels === 1 ? 'none' : 'vertical';
  } else {
    panels = horizontalPanels;
    cutLengthIn = horizontalCut;
    seamOrientation = panels === 1 ? 'none' : 'horizontal';
  }

  // Add 2" for seam allowances when piecing backing
  if (panels > 1) cutLengthIn += 2 * panels;

  const yards = round(cutLengthIn / 36, 2);
  return {
    yards,
    meters: round(fromYards(yards, 'm'), 2),
    panels,
    seamOrientation,
    cutLengthIn: round(cutLengthIn, 1),
  };
}

export interface QuiltBindingInput {
  quiltWidth: number;
  quiltLength: number;
  unit: LengthUnit;
  bindingWidthIn?: number;
  fabricWidth: number;
  fabricWidthUnit: LengthUnit;
  /** Join method waste */
  joinWasteIn?: number;
}

export interface QuiltBindingResult {
  perimeterIn: number;
  stripLengthIn: number;
  stripsNeeded: number;
  yards: number;
  meters: number;
  bindingWidthIn: number;
}

export function quiltBinding(input: QuiltBindingInput): QuiltBindingResult {
  const w = toInches(input.quiltWidth, input.unit);
  const l = toInches(input.quiltLength, input.unit);
  const bindingWidthIn = input.bindingWidthIn ?? 2.5;
  const fw = toInches(input.fabricWidth, input.fabricWidthUnit);
  const joinWaste = input.joinWasteIn ?? 12;
  const perimeterIn = 2 * (w + l);
  const stripLengthIn = perimeterIn + joinWaste;
  const usableStrip = fw - 2; // trim selvages roughly
  const stripsNeeded = Math.max(1, Math.ceil(stripLengthIn / usableStrip));
  const fabricInches = stripsNeeded * bindingWidthIn;
  // Convert continuous strip fabric requirement: strips cut across width → length along bolt = strip width * strips… 
  // Standard: cut strips across fabric width, so yardage = (strips * bindingWidth) / 36
  const yards = round(fabricInches / 36, 2);
  return {
    perimeterIn: round(perimeterIn, 1),
    stripLengthIn: round(stripLengthIn, 1),
    stripsNeeded,
    yards,
    meters: round(fromYards(yards, 'm'), 2),
    bindingWidthIn,
  };
}

/**
 * Half-square triangle (HST) cutting.
 * Traditional: two squares yield 2 HSTs; square size = finished HST + 7/8".
 * 8-at-a-time: square = finished * 2 + 1.75" (common formula).
 */
export type HstMethod = 'two-at-a-time' | 'four-at-a-time' | 'eight-at-a-time';

export function hstSquareSize(finishedHstIn: number, method: HstMethod): number {
  switch (method) {
    case 'two-at-a-time':
      return round(finishedHstIn + 7 / 8, 3);
    case 'four-at-a-time':
      return round(finishedHstIn + 1, 3);
    case 'eight-at-a-time':
      return round(finishedHstIn * 2 + 1.75, 3);
    default:
      return round(finishedHstIn + 7 / 8, 3);
  }
}

export function hstYield(squaresPerFabric: number, method: HstMethod): number {
  const perPair: Record<HstMethod, number> = {
    'two-at-a-time': 2,
    'four-at-a-time': 4,
    'eight-at-a-time': 8,
  };
  // squaresPerFabric means number of squares cut from each of two fabrics (paired)
  return squaresPerFabric * perPair[method];
}

export function hstProject(
  finishedHstIn: number,
  hstNeeded: number,
  method: HstMethod,
): { squareSizeIn: number; pairsNeeded: number; totalSquares: number; hstProduced: number } {
  const perPair = method === 'two-at-a-time' ? 2 : method === 'four-at-a-time' ? 4 : 8;
  const pairsNeeded = Math.ceil(hstNeeded / perPair);
  return {
    squareSizeIn: hstSquareSize(finishedHstIn, method),
    pairsNeeded,
    totalSquares: pairsNeeded * 2,
    hstProduced: pairsNeeded * perPair,
  };
}
