import { describe, expect, it } from 'vitest';
import {
  aidaCountForSize,
  calculateGauge,
  castOnStitches,
  crochetBlanketStitchCount,
  crossStitchFabric,
  estimateAmigurumiYarn,
  estimateHatYarn,
  estimateRectangleYarn,
  estimateScarfYarn,
  estimateSweaterYarn,
  evenShaping,
  fabricYardage,
  gradeMeasurement,
  cutSizeFromFinished,
  hstProject,
  hstSquareSize,
  quiltBacking,
  quiltBinding,
  quiltFromBlocks,
  blocksForQuilt,
  resizePattern,
  sizeFromGauge,
  substituteYarnYardage,
  weightLengthConvert,
  addEase,
} from './index';
import { cmToInches, gramsToOz, inchesToCm, metersToYards, ozToGrams, yardsToMeters } from '../units';
import { findHookByUs, findNeedleByUs } from '../reference/needles-hooks';

describe('units', () => {
  it('converts length and weight bidirectionally', () => {
    expect(inchesToCm(10)).toBeCloseTo(25.4, 5);
    expect(cmToInches(25.4)).toBeCloseTo(10, 5);
    expect(yardsToMeters(1)).toBeCloseTo(0.9144, 5);
    expect(metersToYards(0.9144)).toBeCloseTo(1, 5);
    expect(gramsToOz(28.349523125)).toBeCloseTo(1, 5);
    expect(ozToGrams(1)).toBeCloseTo(28.349523125, 5);
  });
});

describe('yarn estimates', () => {
  it('estimates blanket yarn and skeins', () => {
    const r = estimateRectangleYarn({
      width: 50,
      length: 60,
      unit: 'in',
      yarnWeight: 4,
      method: 'knit',
      skeinLength: 200,
      skeinLengthUnit: 'yd',
      skeinGrams: 100,
      wastePercent: 10,
    });
    expect(r.areaSqIn).toBe(3000);
    expect(r.yardsNeeded).toBeGreaterThan(500);
    expect(r.skeinsNeeded).toBeGreaterThanOrEqual(3);
    expect(r.metersNeeded).toBeGreaterThan(0);
    expect(r.gramsNeeded).toBeGreaterThan(0);
  });

  it('uses more yarn for crochet than knit', () => {
    const base = {
      width: 40,
      length: 40,
      unit: 'in' as const,
      yarnWeight: 4 as const,
      skeinLength: 200,
      skeinLengthUnit: 'yd' as const,
    };
    const knit = estimateRectangleYarn({ ...base, method: 'knit' });
    const crochet = estimateRectangleYarn({ ...base, method: 'crochet' });
    expect(crochet.yardsNeeded).toBeGreaterThan(knit.yardsNeeded);
  });

  it('estimates sweater, hat, scarf, amigurumi', () => {
    const sweater = estimateSweaterYarn('m', 4, 'knit', 200, 'yd', 100);
    expect(sweater.skeinsNeeded).toBeGreaterThanOrEqual(4);
    expect(sweater.yardsNeeded).toBeGreaterThan(800);
    const hat = estimateHatYarn(22, 8, 4, 'knit', 200, 'yd', 100);
    expect(hat.yardsNeeded).toBeGreaterThan(50);
    const scarf = estimateScarfYarn(8, 60, 'in', 4, 'knit', 200, 'yd');
    expect(scarf.yardsNeeded).toBeGreaterThan(80);
    const ami = estimateAmigurumiYarn(6, 'in', 3, 150, 'yd', 50);
    expect(ami.yardsNeeded).toBeGreaterThan(10);
  });

  it('substitutes yarn weights and converts units', () => {
    const sub = substituteYarnYardage(400, 4, 3);
    expect(sub.yards).toBeGreaterThan(400); // DK has more yards/100g
    const conv = weightLengthConvert(100, 'g', 4);
    expect(conv.yards).toBeGreaterThan(150);
    expect(conv.oz).toBeCloseTo(3.53, 1);
  });
});

describe('gauge', () => {
  it('calculates stitches per inch and size', () => {
    const g = calculateGauge({
      stitchesInSwatch: 20,
      rowsInSwatch: 28,
      swatchWidth: 4,
      swatchHeight: 4,
      swatchUnit: 'in',
    });
    expect(g.stitchesPerInch).toBe(5);
    expect(g.stitchesPer4in).toBe(20);
    const size = sizeFromGauge(g, 20, 10, 'in');
    expect(size.stitches).toBe(100);
    expect(size.rows).toBe(70);
  });

  it('resizes patterns when gauge differs', () => {
    const r = resizePattern(100, 120, 20, 28, 22, 30);
    expect(r.stitches).toBe(110);
    expect(r.rows).toBe(129);
  });
});

describe('crochet blanket', () => {
  it('computes chain and rows', () => {
    const r = crochetBlanketStitchCount({
      width: 36,
      length: 40,
      unit: 'in',
      stitchesPer4in: 12,
      rowsPer4in: 14,
      turningChain: 1,
    });
    expect(r.stitchesAcross).toBe(108);
    expect(r.startingChain).toBe(109);
    expect(r.rows).toBe(140);
    expect(r.totalStitches).toBe(108 * 140);
  });
});

describe('shaping & cast-on', () => {
  it('spaces increases evenly', () => {
    const r = evenShaping({
      currentStitches: 80,
      changeCount: 8,
      mode: 'increase',
      inTheRound: true,
    });
    expect(r.targetStitches).toBe(88);
    expect(r.markers.length).toBe(8);
    expect(r.instruction).toMatch(/increase/i);
  });

  it('spaces decreases and rejects invalid', () => {
    const r = evenShaping({
      currentStitches: 100,
      changeCount: 10,
      mode: 'decrease',
      inTheRound: false,
    });
    expect(r.targetStitches).toBe(90);
    expect(() =>
      evenShaping({ currentStitches: 10, changeCount: 10, mode: 'decrease', inTheRound: true }),
    ).toThrow();
  });

  it('cast-on from gauge with ease', () => {
    const r = castOnStitches(20, 'in', 20, 5, 1);
    expect(r.stitches).toBe(105);
  });
});

describe('fabric yardage', () => {
  it('estimates curtain and garment yardage', () => {
    const curtains = fabricYardage({
      project: 'curtains',
      width: 60,
      length: 84,
      unit: 'in',
      fabricWidth: 54,
      fabricWidthUnit: 'in',
      fullness: 2,
    });
    expect(curtains.yards).toBeGreaterThan(4);
    expect(curtains.panelsNeeded).toBeGreaterThanOrEqual(2);

    const garment = fabricYardage({
      project: 'garment',
      width: 40,
      length: 30,
      unit: 'in',
      fabricWidth: 45,
      fabricWidthUnit: 'in',
    });
    expect(garment.yards).toBeGreaterThan(1);
  });

  it('grades and adds seam allowance', () => {
    expect(cutSizeFromFinished(20, 0.625, 'in', 2)).toBeCloseTo(21.25, 2);
    expect(gradeMeasurement(36, 0, 2, 1.5)).toBe(39);
    expect(addEase(36, 2)).toBe(38);
  });
});

describe('quilt tools', () => {
  it('sizes quilt from blocks', () => {
    const q = quiltFromBlocks(8, 10, 12, 2, 4);
    // 8*12 + 7*2 + 8 = 96+14+8 = 118
    expect(q.widthIn).toBe(118);
    expect(q.totalBlocks).toBe(80);
  });

  it('fits blocks into target', () => {
    const q = blocksForQuilt(80, 90, 'in', 10, 0, 0);
    expect(q.blocksAcross).toBe(8);
    expect(q.blocksDown).toBe(9);
  });

  it('calculates backing and binding', () => {
    const backing = quiltBacking({
      quiltWidth: 80,
      quiltLength: 90,
      unit: 'in',
      fabricWidth: 44,
      fabricWidthUnit: 'in',
    });
    expect(backing.yards).toBeGreaterThan(4);
    expect(backing.panels).toBeGreaterThanOrEqual(2);

    const binding = quiltBinding({
      quiltWidth: 60,
      quiltLength: 70,
      unit: 'in',
      fabricWidth: 42,
      fabricWidthUnit: 'in',
      bindingWidthIn: 2.5,
    });
    expect(binding.perimeterIn).toBe(260);
    expect(binding.stripsNeeded).toBeGreaterThanOrEqual(6);
    expect(binding.yards).toBeGreaterThan(0.3);
  });

  it('computes HST square sizes', () => {
    expect(hstSquareSize(3, 'two-at-a-time')).toBeCloseTo(3.875, 3);
    expect(hstSquareSize(3, 'eight-at-a-time')).toBeCloseTo(7.75, 3);
    const proj = hstProject(3, 40, 'eight-at-a-time');
    expect(proj.pairsNeeded).toBe(5);
    expect(proj.hstProduced).toBe(40);
  });
});

describe('cross-stitch', () => {
  it('sizes aida fabric with margins', () => {
    const r = crossStitchFabric({
      stitchesWide: 140,
      stitchesHigh: 180,
      aidaCount: 14,
      margin: 3,
      marginUnit: 'in',
    });
    expect(r.designWidthIn).toBe(10);
    expect(r.designHeightIn).toBeCloseTo(12.86, 1);
    expect(r.fabricWidthIn).toBe(16);
    expect(aidaCountForSize(140, 10, 'in')).toBe(14);
  });
});

describe('needle/hook reference', () => {
  it('maps US sizes to metric', () => {
    expect(findNeedleByUs('8')?.metricMm).toBe(5);
    expect(findHookByUs('H-8')?.metricMm).toBe(5);
  });
});
