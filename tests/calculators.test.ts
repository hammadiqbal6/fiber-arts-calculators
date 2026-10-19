import { describe, expect, it } from 'vitest';
import {
  estimateRectYarn,
  estimateSweaterYarn,
  estimateHatYarn,
  estimateScarfYarn,
  estimateAmigurumiYarn,
  substituteYarn,
} from '../src/lib/calculators/yarn';
import {
  calculateGauge,
  stitchesToSize,
  resizePattern,
  castOnStitches,
} from '../src/lib/calculators/gauge';
import { evenIncreaseDecrease, targetStitchChange } from '../src/lib/calculators/shaping';
import { crochetBlanketStitches, gaugeFromSwatch } from '../src/lib/calculators/crochet';
import { fabricYardage, convertFabricLength } from '../src/lib/calculators/fabric';
import {
  quiltSizeFromMattress,
  quiltBacking,
  quiltBinding,
  halfSquareTriangles,
} from '../src/lib/calculators/quilt';
import { crossStitchFabric, stitchesForSize } from '../src/lib/calculators/cross-stitch';
import { cutFromFinished, gradeMeasurement } from '../src/lib/calculators/seam';
import { findNeedleByUs, findHookByMetric } from '../src/data/needles-hooks';
import { toCm, fromGrams, toMeters } from '../src/lib/units';

describe('units', () => {
  it('converts inches to cm', () => {
    expect(toCm(10, 'in')).toBeCloseTo(25.4, 5);
    expect(toCm(25.4, 'cm')).toBeCloseTo(25.4, 5);
  });
  it('converts yards to meters and oz to g', () => {
    expect(toMeters(1, 'yd')).toBeCloseTo(0.9144, 4);
    expect(fromGrams(28.349523125, 'oz')).toBeCloseTo(1, 5);
  });
});

describe('yarn estimates', () => {
  it('estimates blanket yarn for worsted throw', () => {
    const r = estimateRectYarn({
      width: 50,
      length: 60,
      unit: 'in',
      yarnCategory: '4',
      wastePercent: 10,
      craft: 'knit',
    });
    expect(r.areaSqM).toBeGreaterThan(1.5);
    expect(r.metersNeeded).toBeGreaterThan(1000);
    expect(r.ballsNeeded).toBeGreaterThanOrEqual(1);
    expect(r.yarnName).toContain('Worsted');
  });

  it('crochet uses more yarn than knit for same area', () => {
    const knit = estimateRectYarn({
      width: 40,
      length: 40,
      unit: 'in',
      yarnCategory: '4',
      craft: 'knit',
      wastePercent: 0,
    });
    const crochet = estimateRectYarn({
      width: 40,
      length: 40,
      unit: 'in',
      yarnCategory: '4',
      craft: 'crochet',
      wastePercent: 0,
    });
    expect(crochet.metersNeeded).toBeGreaterThan(knit.metersNeeded);
  });

  it('estimates sweater, hat, scarf, amigurumi', () => {
    expect(estimateSweaterYarn({ chestIn: 40, lengthIn: 25, sleeveLengthIn: 18, yarnCategory: '4' }).ballsNeeded).toBeGreaterThan(1);
    expect(estimateHatYarn({ circumferenceIn: 22, depthIn: 8, yarnCategory: '4' }).gramsNeeded).toBeGreaterThan(20);
    expect(estimateScarfYarn({ widthIn: 8, lengthIn: 60, yarnCategory: '4' }).metersNeeded).toBeGreaterThan(100);
    expect(estimateAmigurumiYarn({ heightIn: 6, yarnCategory: '3' }).gramsNeeded).toBeGreaterThan(10);
  });

  it('substitutes yarn between weights', () => {
    const r = substituteYarn({
      originalCategory: '4',
      substituteCategory: '3',
      originalMeters: 1000,
    });
    expect(r.recommendedMeters).toBeGreaterThan(1000);
    expect(r.gaugeRatio).toBeGreaterThan(1);
  });
});

describe('gauge & cast-on', () => {
  it('calculates gauge from swatch', () => {
    const g = calculateGauge({
      stitchesInSwatch: 20,
      rowsInSwatch: 28,
      swatchWidth: 4,
      swatchHeight: 4,
      unit: 'in',
    });
    expect(g.stitchesPer4in).toBeCloseTo(20, 1);
    expect(g.rowsPer4in).toBeCloseTo(28, 1);
    expect(g.stitchesPer10cm).toBeCloseTo(19.7, 0);
  });

  it('converts stitches to size and resizes patterns', () => {
    const size = stitchesToSize({
      stitches: 100,
      rows: 120,
      stitchesPer4in: 20,
      rowsPer4in: 28,
    });
    expect(size.widthIn).toBeCloseTo(20, 1);
    const resized = resizePattern({
      patternStitchesPer4in: 20,
      patternRowsPer4in: 28,
      yourStitchesPer4in: 18,
      yourRowsPer4in: 26,
      patternStitchCount: 100,
      patternRowCount: 140,
    });
    expect(resized.newStitchCount).toBe(90);
  });

  it('cast-on calculator', () => {
    expect(castOnStitches({ desiredWidth: 20, unit: 'in', stitchesPer4in: 20 })).toBe(100);
    expect(castOnStitches({ desiredWidth: 20, unit: 'in', stitchesPer4in: 20, edgeStitches: 2 })).toBe(102);
  });
});

describe('shaping', () => {
  it('spaces increases evenly', () => {
    const r = evenIncreaseDecrease({ currentStitches: 60, changeBy: 10, mode: 'increase' });
    expect(r.groups).toBe(10);
    expect(r.instructions).toMatch(/M1|Increase/);
  });

  it('spaces decreases evenly', () => {
    const r = evenIncreaseDecrease({ currentStitches: 100, changeBy: 10, mode: 'decrease' });
    expect(r.plainBetween).toBe(9);
    expect(r.instructions).toMatch(/k2tog|Decrease/);
  });

  it('target change helper', () => {
    expect(targetStitchChange(80, 100)).toEqual({ mode: 'increase', changeBy: 20 });
    expect(targetStitchChange(100, 80)).toEqual({ mode: 'decrease', changeBy: 20 });
    expect(targetStitchChange(80, 80)).toEqual({ mode: 'none', changeBy: 0 });
  });
});

describe('crochet blanket', () => {
  it('computes stitch and row counts', () => {
    const r = crochetBlanketStitches({
      width: 40,
      length: 48,
      unit: 'in',
      stitchesPer4in: 14,
      rowsPer4in: 15,
    });
    expect(r.stitchesWide).toBe(140);
    expect(r.rowsTall).toBe(180);
    expect(r.startingChain).toBe(141);
  });

  it('gauge from swatch', () => {
    const g = gaugeFromSwatch(14, 16, 4, 4, 'in');
    expect(g.stitchesPer4in).toBeCloseTo(14, 1);
  });
});

describe('fabric yardage', () => {
  it('calculates curtain panels', () => {
    const r = fabricYardage({
      type: 'curtains',
      width: 40,
      length: 84,
      unit: 'in',
      fabricWidth: 54,
      fabricWidthUnit: 'in',
      pieces: 2,
      wastePercent: 10,
    });
    expect(r.yards).toBeGreaterThan(4);
    expect(r.panelsNeeded).toBeGreaterThanOrEqual(2);
  });

  it('converts fabric length', () => {
    expect(convertFabricLength(1, 'yd', 'm')).toBeCloseTo(0.914, 2);
  });
});

describe('quilt', () => {
  it('sizes quilt from mattress', () => {
    const r = quiltSizeFromMattress({
      mattressWidth: 60,
      mattressLength: 80,
      drop: 12,
      unit: 'in',
      pillowTuck: 10,
    });
    expect(r.quiltWidth).toBe(84);
    expect(r.quiltLength).toBe(102);
  });

  it('backing yardage', () => {
    const r = quiltBacking({
      quiltWidth: 90,
      quiltLength: 100,
      unit: 'in',
      fabricWidth: 42,
      fabricWidthUnit: 'in',
      overhang: 4,
    });
    expect(r.yards).toBeGreaterThan(5);
    expect(r.panels).toBeGreaterThanOrEqual(2);
  });

  it('binding strip count', () => {
    const r = quiltBinding({
      quiltWidth: 60,
      quiltLength: 70,
      unit: 'in',
      fabricWidth: 42,
      fabricWidthUnit: 'in',
      stripCutWidth: 2.5,
      stripCutUnit: 'in',
    });
    expect(r.perimeterIn).toBe(260);
    expect(r.stripsNeeded).toBeGreaterThanOrEqual(7);
  });

  it('HST cutting sizes', () => {
    const trad = halfSquareTriangles({
      finishedSize: 3,
      unit: 'in',
      method: 'traditional',
      count: 8,
    });
    expect(trad.cutSquareSize).toBeCloseTo(3.875, 3);
    const eight = halfSquareTriangles({
      finishedSize: 3,
      unit: 'in',
      method: 'eight-at-a-time',
      count: 8,
    });
    expect(eight.cutSquareSize).toBeCloseTo(7.75, 2);
    expect(eight.hstsProducedPerSquarePair).toBe(8);
  });
});

describe('cross-stitch', () => {
  it('fabric cut size from design and aida', () => {
    const r = crossStitchFabric({
      designStitchesWide: 140,
      designStitchesHigh: 180,
      aidaCount: 14,
      margin: 3,
      marginUnit: 'in',
    });
    expect(r.designWidthIn).toBeCloseTo(10, 1);
    expect(r.cutWidthIn).toBeCloseTo(16, 1);
  });

  it('stitches for size', () => {
    const s = stitchesForSize(10, 10, 'in', 14);
    expect(s.stitchesWide).toBe(140);
  });
});

describe('seam & grading', () => {
  it('adds seam allowance to finished measurement', () => {
    const r = cutFromFinished({
      finished: 20,
      unit: 'in',
      seamAllowance: 0.625,
      seamUnit: 'in',
      seamEdges: 2,
    });
    expect(r.cutIn).toBeCloseTo(21.25, 2);
  });

  it('grades pattern measurements', () => {
    const r = gradeMeasurement({
      baseSizeMeasurement: 36,
      unit: 'in',
      gradePerSize: 1,
      gradeUnit: 'in',
      sizesAway: 2,
    });
    expect(r.newMeasurement).toBeCloseTo(38, 2);
  });
});

describe('needle/hook charts', () => {
  it('looks up US needle and metric hook', () => {
    expect(findNeedleByUs('8')?.metricMm).toBe(5);
    expect(findHookByMetric(5)?.us).toBe('H-8');
  });
});
