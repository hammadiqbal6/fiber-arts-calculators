import { ceilTo, round, toCm, type FabricLengthUnit, type LengthUnit } from '../units';

export interface QuiltSizeInput {
  mattressWidth: number;
  mattressLength: number;
  drop: number;
  unit: LengthUnit;
  /** Extra for pillow tuck (top only), same unit */
  pillowTuck?: number;
}

export interface QuiltSizeResult {
  quiltWidth: number;
  quiltLength: number;
  quiltWidthCm: number;
  quiltLengthCm: number;
  unit: LengthUnit;
}

/** Quilt top size from mattress + drop on sides/foot (+ optional pillow tuck) */
export function quiltSizeFromMattress(input: QuiltSizeInput): QuiltSizeResult {
  const w = input.mattressWidth + 2 * input.drop;
  const l = input.mattressLength + input.drop + (input.pillowTuck ?? 0);
  const wCm = toCm(w, input.unit);
  const lCm = toCm(l, input.unit);
  return {
    quiltWidth: round(w, 2),
    quiltLength: round(l, 2),
    quiltWidthCm: round(wCm, 2),
    quiltLengthCm: round(lCm, 2),
    unit: input.unit,
  };
}

export interface BackingInput {
  quiltWidth: number;
  quiltLength: number;
  unit: LengthUnit;
  fabricWidth: number;
  fabricWidthUnit: LengthUnit;
  /** Extra beyond quilt on each side for quilting (default 4 in) */
  overhang?: number;
  overhangUnit?: LengthUnit;
  wastePercent?: number;
}

export interface BackingResult {
  backingWidth: number;
  backingLength: number;
  panels: number;
  yards: number;
  meters: number;
  seamOrientation: 'vertical' | 'horizontal' | 'single';
}

export function quiltBacking(input: BackingInput): BackingResult {
  const overhang = input.overhang ?? 4;
  const oUnit = input.overhangUnit ?? input.unit;
  const oCm = toCm(overhang, oUnit);
  const qw = toCm(input.quiltWidth, input.unit) + 2 * oCm;
  const ql = toCm(input.quiltLength, input.unit) + 2 * oCm;
  const fw = toCm(input.fabricWidth, input.fabricWidthUnit);
  const waste = 1 + (input.wastePercent ?? 5) / 100;

  // Prefer orientation that needs less fabric
  const verticalPanels = Math.ceil(qw / fw);
  const verticalLength = ql * verticalPanels; // seams parallel to length
  const horizontalPanels = Math.ceil(ql / fw);
  const horizontalLength = qw * horizontalPanels;

  let panels: number;
  let totalCm: number;
  let orientation: BackingResult['seamOrientation'];

  if (qw <= fw && ql <= fw * 2) {
    // Might fit as single width if both dimensions work
    if (qw <= fw) {
      panels = 1;
      totalCm = ql;
      orientation = 'single';
    } else {
      panels = verticalPanels;
      totalCm = verticalLength;
      orientation = 'vertical';
    }
  } else if (verticalLength <= horizontalLength) {
    panels = verticalPanels;
    totalCm = verticalLength;
    orientation = qw <= fw ? 'single' : 'vertical';
  } else {
    panels = horizontalPanels;
    totalCm = horizontalLength;
    orientation = 'horizontal';
  }

  totalCm *= waste;
  const meters = totalCm / 100;
  const yards = meters / 0.9144;

  return {
    backingWidth: round(qw / 2.54, 2),
    backingLength: round(ql / 2.54, 2),
    panels,
    yards: round(yards, 2),
    meters: round(meters, 2),
    seamOrientation: orientation,
  };
}

export interface BindingInput {
  quiltWidth: number;
  quiltLength: number;
  unit: LengthUnit;
  /** Finished binding width (folded), default 0.5 in */
  finishedBindingWidth?: number;
  bindingWidthUnit?: LengthUnit;
  /** Strip cut width (usually 2.25–2.5 in for double-fold) */
  stripCutWidth?: number;
  stripCutUnit?: LengthUnit;
  fabricWidth: number;
  fabricWidthUnit: LengthUnit;
}

export interface BindingResult {
  perimeterIn: number;
  totalStripLengthIn: number;
  stripsNeeded: number;
  fabricYards: number;
  fabricMeters: number;
  stripCutWidthIn: number;
}

export function quiltBinding(input: BindingInput): BindingResult {
  const wIn = input.unit === 'in' ? input.quiltWidth : input.quiltWidth / 2.54;
  const lIn = input.unit === 'in' ? input.quiltLength : input.quiltLength / 2.54;
  const perimeter = 2 * (wIn + lIn);
  // Extra 10–12" for joining and corners
  const totalStrip = perimeter + 12;
  const stripCut =
    input.stripCutWidth != null
      ? input.stripCutUnit === 'cm'
        ? input.stripCutWidth / 2.54
        : input.stripCutWidth
      : 2.5;
  const fwIn =
    input.fabricWidthUnit === 'in' ? input.fabricWidth : input.fabricWidth / 2.54;
  const usable = fwIn - 1; // selvage waste
  const stripsNeeded = Math.ceil(totalStrip / usable);
  const fabricInches = stripsNeeded * stripCut;
  const yards = fabricInches / 36;
  const meters = fabricInches * 2.54 / 100;

  return {
    perimeterIn: round(perimeter, 2),
    totalStripLengthIn: round(totalStrip, 2),
    stripsNeeded,
    fabricYards: round(Math.max(yards, 0.25), 2),
    fabricMeters: round(Math.max(meters, 0.25), 2),
    stripCutWidthIn: stripCut,
  };
}

export interface HstInput {
  /** Finished HST size (along short legs), inches or cm */
  finishedSize: number;
  unit: LengthUnit;
  /** Traditional method: cut squares then slice, or 2-at-a-time */
  method: 'traditional' | 'two-at-a-time' | 'eight-at-a-time';
  count: number;
}

export interface HstResult {
  cutSquareSize: number;
  cutSquareUnit: LengthUnit;
  squaresToCut: number;
  hstsProducedPerSquarePair: number;
  fabricAreaSqIn: number;
  notes: string;
}

/**
 * Half-square triangle cutting math.
 * Traditional: cut square = finished + 7/8"
 * Two-at-a-time: cut square = finished + 7/8" (same), yields 2 HST per pair
 * Eight-at-a-time: cut square = (finished × 2) + 1.75"
 */
export function halfSquareTriangles(input: HstInput): HstResult {
  const finIn = input.unit === 'in' ? input.finishedSize : input.finishedSize / 2.54;
  let cutIn: number;
  let perPair: number;
  let notes: string;

  switch (input.method) {
    case 'traditional':
      cutIn = finIn + 7 / 8;
      perPair = 2; // one square → 2 triangles sewn to HSTs with another
      notes = 'Traditional: cut squares finished + ⅞″, slice diagonally, sew pairs.';
      break;
    case 'two-at-a-time':
      cutIn = finIn + 7 / 8;
      perPair = 2;
      notes = 'Two-at-a-time: draw diagonal on wrong side, sew ¼″ each side, cut on line.';
      break;
    case 'eight-at-a-time':
      cutIn = finIn * 2 + 1.75;
      perPair = 8;
      notes = 'Eight-at-a-time: large square method; trim to unfinished size (finished + ½″).';
      break;
  }

  const pairsNeeded = Math.ceil(input.count / perPair);
  const squaresToCut = pairsNeeded * 2;
  const fabricAreaSqIn = squaresToCut * cutIn * cutIn;

  return {
    cutSquareSize: input.unit === 'in' ? round(cutIn, 3) : round(cutIn * 2.54, 2),
    cutSquareUnit: input.unit,
    squaresToCut,
    hstsProducedPerSquarePair: perPair,
    fabricAreaSqIn: round(fabricAreaSqIn, 1),
    notes,
  };
}
