/**
 * Lightweight client handlers for all calculators.
 * Bundled per-page via Astro <script> imports — no React.
 */
import { estimateAmigurumiYarn, estimateHatYarn, estimateRectangleYarn, estimateScarfYarn, estimateSweaterYarn, substituteYarnYardage, weightLengthConvert, SWEATER_SIZES } from '../lib/calculators/yarn';
import { calculateGauge, resizePattern, sizeFromGauge } from '../lib/calculators/gauge';
import { crochetBlanketStitchCount } from '../lib/calculators/crochet-blanket';
import { castOnStitches, evenShaping } from '../lib/calculators/shaping';
import { addEase, cutSizeFromFinished, fabricYardage, gradeMeasurement } from '../lib/calculators/fabric';
import { blocksForQuilt, hstProject, quiltBacking, quiltBinding, quiltFromBlocks } from '../lib/calculators/quilt';
import { aidaCountForSize, crossStitchFabric } from '../lib/calculators/cross-stitch';
import { CROCHET_HOOKS, KNITTING_NEEDLES, findHookByMetric, findHookByUs, findNeedleByMetric, findNeedleByUs } from '../lib/reference/needles-hooks';
import type { YarnWeightId } from '../lib/reference/yarn-weights';

function num(fd: FormData, key: string, fallback = 0): number {
  const v = Number(fd.get(key));
  return Number.isFinite(v) ? v : fallback;
}

function track(name: string, params: Record<string, string | number | boolean> = {}) {
  import('./analytics')
    .then(({ trackEvent }) => trackEvent(name, params))
    .catch(() => {});
}

function showResults(root: HTMLElement, rows: [string, string][], sharePath?: string) {
  const box = root.querySelector<HTMLElement>('[data-results]');
  const dl = root.querySelector<HTMLElement>('[data-results-dl]');
  const share = root.querySelector<HTMLElement>('[data-share]');
  if (!box || !dl) return;
  dl.innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
  box.hidden = false;
  box.setAttribute('tabindex', '-1');
  if (share && sharePath) {
    share.innerHTML = `<a href="${sharePath}">Shareable results link</a> · <button type="button" class="btn btn--secondary" data-print>Print results</button>`;
    share.querySelector('[data-print]')?.addEventListener('click', () => window.print());
  }
}

function syncQuery(form: HTMLFormElement) {
  const q = new URLSearchParams(new FormData(form) as any).toString();
  const url = `${location.pathname}?${q}`;
  history.replaceState(null, '', url);
  return url;
}

function hydrateFromQuery(form: HTMLFormElement) {
  const params = new URLSearchParams(location.search);
  params.forEach((value, key) => {
    const el = form.elements.namedItem(key);
    if (el && 'value' in el) (el as HTMLInputElement).value = value;
  });
  return params.size > 0;
}

type Handler = (fd: FormData) => [string, string][];

const handlers: Record<string, Handler> = {
  'yarn-blanket': (fd) => {
    const r = estimateRectangleYarn({
      width: num(fd, 'width'),
      length: num(fd, 'length'),
      unit: String(fd.get('unit')) as 'in' | 'cm',
      yarnWeight: num(fd, 'yarnWeight') as YarnWeightId,
      method: String(fd.get('method')) as 'knit' | 'crochet',
      skeinLength: num(fd, 'skeinLength'),
      skeinLengthUnit: String(fd.get('skeinLengthUnit')) as 'yd' | 'm',
      skeinGrams: num(fd, 'skeinGrams') || undefined,
    });
    return [
      ['Area', `${r.areaSqIn} in²`],
      ['Yarn needed', `${r.yardsNeeded} yd (${r.metersNeeded} m)`],
      ['Skeins to buy', String(r.skeinsNeeded)],
      ['Approx. weight', `${r.gramsNeeded ?? '—'} g (${r.ozNeeded ?? '—'} oz)`],
    ];
  },
  'yarn-sweater': (fd) => {
    const size = String(fd.get('size')) as keyof typeof SWEATER_SIZES;
    const r = estimateSweaterYarn(
      size,
      num(fd, 'yarnWeight') as YarnWeightId,
      String(fd.get('method')) as 'knit' | 'crochet',
      num(fd, 'skeinLength'),
      String(fd.get('skeinLengthUnit')) as 'yd' | 'm',
      num(fd, 'skeinGrams') || undefined,
    );
    const s = SWEATER_SIZES[size];
    return [
      ['Size (chest × length)', `${s.chestIn}" × ${s.lengthIn}"`],
      ['Yarn needed', `${r.yardsNeeded} yd (${r.metersNeeded} m)`],
      ['Skeins to buy', String(r.skeinsNeeded)],
      ['Approx. weight', `${r.gramsNeeded ?? '—'} g (${r.ozNeeded ?? '—'} oz)`],
    ];
  },
  'yarn-hat': (fd) => {
    const r = estimateHatYarn(
      num(fd, 'circumference'),
      num(fd, 'depth'),
      num(fd, 'yarnWeight') as YarnWeightId,
      String(fd.get('method')) as 'knit' | 'crochet',
      num(fd, 'skeinLength'),
      String(fd.get('skeinLengthUnit')) as 'yd' | 'm',
      num(fd, 'skeinGrams') || undefined,
    );
    return [
      ['Yarn needed', `${r.yardsNeeded} yd (${r.metersNeeded} m)`],
      ['Skeins to buy', String(r.skeinsNeeded)],
      ['Approx. weight', `${r.gramsNeeded ?? '—'} g (${r.ozNeeded ?? '—'} oz)`],
    ];
  },
  'yarn-scarf': (fd) => {
    const r = estimateScarfYarn(
      num(fd, 'width'),
      num(fd, 'length'),
      String(fd.get('unit')) as 'in' | 'cm',
      num(fd, 'yarnWeight') as YarnWeightId,
      String(fd.get('method')) as 'knit' | 'crochet',
      num(fd, 'skeinLength'),
      String(fd.get('skeinLengthUnit')) as 'yd' | 'm',
      num(fd, 'skeinGrams') || undefined,
    );
    return [
      ['Yarn needed', `${r.yardsNeeded} yd (${r.metersNeeded} m)`],
      ['Skeins to buy', String(r.skeinsNeeded)],
      ['Approx. weight', `${r.gramsNeeded ?? '—'} g (${r.ozNeeded ?? '—'} oz)`],
    ];
  },
  'yarn-amigurumi': (fd) => {
    const r = estimateAmigurumiYarn(
      num(fd, 'height'),
      String(fd.get('unit')) as 'in' | 'cm',
      num(fd, 'yarnWeight') as YarnWeightId,
      num(fd, 'skeinLength'),
      String(fd.get('skeinLengthUnit')) as 'yd' | 'm',
      num(fd, 'skeinGrams') || undefined,
    );
    return [
      ['Yarn needed', `${r.yardsNeeded} yd (${r.metersNeeded} m)`],
      ['Skeins to buy', String(r.skeinsNeeded)],
      ['Approx. weight', `${r.gramsNeeded ?? '—'} g (${r.ozNeeded ?? '—'} oz)`],
    ];
  },
  'yarn-substitution': (fd) => {
    const mode = String(fd.get('mode'));
    if (mode === 'substitute') {
      const r = substituteYarnYardage(
        num(fd, 'yards'),
        num(fd, 'fromWeight') as YarnWeightId,
        num(fd, 'toWeight') as YarnWeightId,
      );
      return [
        ['Substitute yardage', `${r.yards} yd (${r.meters} m)`],
        ['Yardage ratio', String(r.ratio)],
      ];
    }
    const r = weightLengthConvert(
      num(fd, 'value'),
      String(fd.get('fromUnit')) as 'g' | 'oz' | 'yd' | 'm',
      num(fd, 'yarnWeight') as YarnWeightId,
    );
    return [
      ['Grams', `${r.grams} g`],
      ['Ounces', `${r.oz} oz`],
      ['Yards', `${r.yards} yd`],
      ['Meters', `${r.meters} m`],
    ];
  },
  'knitting-gauge': (fd) => {
    const mode = String(fd.get('mode') || 'gauge');
    const g = calculateGauge({
      stitchesInSwatch: num(fd, 'stitches'),
      rowsInSwatch: num(fd, 'rows'),
      swatchWidth: num(fd, 'swatchWidth'),
      swatchHeight: num(fd, 'swatchHeight'),
      swatchUnit: String(fd.get('swatchUnit')) as 'in' | 'cm',
    });
    if (mode === 'size') {
      const s = sizeFromGauge(g, num(fd, 'targetWidth'), num(fd, 'targetLength'), String(fd.get('targetUnit')) as 'in' | 'cm');
      return [
        ['Gauge', `${g.stitchesPer4in} sts / ${g.rowsPer4in} rows per 4"`],
        ['Cast on / stitches across', String(s.stitches)],
        ['Rows to work', String(s.rows)],
        ['Expected size', `${s.widthOut} × ${s.lengthOut} ${fd.get('targetUnit')}`],
      ];
    }
    if (mode === 'resize') {
      const r = resizePattern(
        num(fd, 'patternStitches'),
        num(fd, 'patternRows'),
        num(fd, 'patternSts4'),
        num(fd, 'patternRows4'),
        g.stitchesPer4in,
        g.rowsPer4in,
      );
      return [
        ['Your gauge', `${g.stitchesPer4in} sts / ${g.rowsPer4in} rows per 4"`],
        ['Adjusted stitches', String(r.stitches)],
        ['Adjusted rows', String(r.rows)],
      ];
    }
    return [
      ['Stitches per inch', String(g.stitchesPerInch)],
      ['Rows per inch', String(g.rowsPerInch)],
      ['Stitches per cm', String(g.stitchesPerCm)],
      ['Per 4 inches', `${g.stitchesPer4in} sts × ${g.rowsPer4in} rows`],
    ];
  },
  'crochet-blanket': (fd) => {
    const r = crochetBlanketStitchCount({
      width: num(fd, 'width'),
      length: num(fd, 'length'),
      unit: String(fd.get('unit')) as 'in' | 'cm',
      stitchesPer4in: num(fd, 'stitchesPer4in'),
      rowsPer4in: num(fd, 'rowsPer4in'),
      turningChain: num(fd, 'turningChain', 1),
    });
    return [
      ['Stitches across', String(r.stitchesAcross)],
      ['Starting chain', String(r.startingChain)],
      ['Rows', String(r.rows)],
      ['Total stitches (approx.)', r.totalStitches.toLocaleString()],
    ];
  },
  'increase-decrease': (fd) => {
    const r = evenShaping({
      currentStitches: num(fd, 'currentStitches'),
      changeCount: num(fd, 'changeCount'),
      mode: String(fd.get('mode')) as 'increase' | 'decrease',
      inTheRound: String(fd.get('inTheRound')) === 'yes',
    });
    return [
      ['Target stitches', String(r.targetStitches)],
      ['Repeat spacing (~)', `${r.repeatWork} sts between shaping`],
      ['Instruction', r.instruction],
    ];
  },
  'cast-on': (fd) => {
    const r = castOnStitches(
      num(fd, 'width'),
      String(fd.get('unit')) as 'in' | 'cm',
      num(fd, 'stitchesPer4in'),
      num(fd, 'easePercent'),
      num(fd, 'ribbingFactor', 1),
    );
    return [
      ['Cast on', `${r.stitches} stitches`],
      ['Width with ease', `${r.effectiveWidth} in`],
    ];
  },
  'fabric-yardage': (fd) => {
    const r = fabricYardage({
      project: String(fd.get('project')) as 'garment' | 'curtains' | 'upholstery' | 'tablecloth',
      width: num(fd, 'width'),
      length: num(fd, 'length'),
      unit: String(fd.get('unit')) as 'in' | 'cm',
      fabricWidth: num(fd, 'fabricWidth'),
      fabricWidthUnit: String(fd.get('fabricWidthUnit')) as 'in' | 'cm',
      patternRepeat: num(fd, 'patternRepeat') || undefined,
      wastePercent: num(fd, 'wastePercent', 10),
      fullness: num(fd, 'fullness', 2),
      garmentFactor: num(fd, 'garmentFactor', 1.5),
    });
    return [
      ['Fabric needed', `${r.yards} yd (${r.meters} m)`],
      ['Panels / lengths', String(r.panelsNeeded)],
      ['Cut length', `${r.cutLengthIn} in`],
      ['Notes', r.notes],
    ];
  },
  'quilt-size': (fd) => {
    const mode = String(fd.get('mode'));
    if (mode === 'fit') {
      const r = blocksForQuilt(
        num(fd, 'targetWidth'),
        num(fd, 'targetLength'),
        String(fd.get('unit')) as 'in' | 'cm',
        num(fd, 'finishedBlockIn'),
        num(fd, 'sashingIn'),
        num(fd, 'borderIn'),
      );
      return [
        ['Blocks', `${r.blocksAcross} × ${r.blocksDown} (${r.totalBlocks} total)`],
        ['Finished quilt', `${r.widthIn}" × ${r.lengthIn}"`],
      ];
    }
    const r = quiltFromBlocks(
      num(fd, 'blocksAcross'),
      num(fd, 'blocksDown'),
      num(fd, 'finishedBlockIn'),
      num(fd, 'sashingIn'),
      num(fd, 'borderIn'),
    );
    return [
      ['Finished quilt', `${r.widthIn}" × ${r.lengthIn}"`],
      ['Total blocks', String(r.totalBlocks)],
    ];
  },
  'quilt-backing': (fd) => {
    const r = quiltBacking({
      quiltWidth: num(fd, 'quiltWidth'),
      quiltLength: num(fd, 'quiltLength'),
      unit: String(fd.get('unit')) as 'in' | 'cm',
      fabricWidth: num(fd, 'fabricWidth'),
      fabricWidthUnit: String(fd.get('fabricWidthUnit')) as 'in' | 'cm',
      overhangIn: num(fd, 'overhangIn', 4),
    });
    return [
      ['Backing fabric', `${r.yards} yd (${r.meters} m)`],
      ['Panels', String(r.panels)],
      ['Seam orientation', r.seamOrientation],
      ['Cut length', `${r.cutLengthIn} in`],
    ];
  },
  'quilt-binding': (fd) => {
    const r = quiltBinding({
      quiltWidth: num(fd, 'quiltWidth'),
      quiltLength: num(fd, 'quiltLength'),
      unit: String(fd.get('unit')) as 'in' | 'cm',
      bindingWidthIn: num(fd, 'bindingWidthIn', 2.5),
      fabricWidth: num(fd, 'fabricWidth'),
      fabricWidthUnit: String(fd.get('fabricWidthUnit')) as 'in' | 'cm',
    });
    return [
      ['Perimeter', `${r.perimeterIn} in`],
      ['Strip length needed', `${r.stripLengthIn} in`],
      ['Strips to cut', String(r.stripsNeeded)],
      ['Fabric', `${r.yards} yd (${r.meters} m)`],
    ];
  },
  hst: (fd) => {
    const r = hstProject(
      num(fd, 'finishedHstIn'),
      num(fd, 'hstNeeded'),
      String(fd.get('method')) as 'two-at-a-time' | 'four-at-a-time' | 'eight-at-a-time',
    );
    return [
      ['Cut square size', `${r.squareSizeIn}"`],
      ['Fabric pairs needed', String(r.pairsNeeded)],
      ['Total squares (both fabrics)', String(r.totalSquares)],
      ['HSTs produced', String(r.hstProduced)],
    ];
  },
  'cross-stitch': (fd) => {
    const r = crossStitchFabric({
      stitchesWide: num(fd, 'stitchesWide'),
      stitchesHigh: num(fd, 'stitchesHigh'),
      aidaCount: num(fd, 'aidaCount'),
      margin: num(fd, 'margin'),
      marginUnit: String(fd.get('marginUnit')) as 'in' | 'cm',
      stitchesPerSquare: num(fd, 'stitchesPerSquare', 1),
    });
    const count = aidaCountForSize(num(fd, 'stitchesWide'), num(fd, 'maxWidth') || r.designWidthIn, String(fd.get('maxUnit') || 'in') as 'in' | 'cm');
    return [
      ['Design size', `${r.designWidthIn}" × ${r.designHeightIn}" (${r.designWidthCm} × ${r.designHeightCm} cm)`],
      ['Fabric to cut', `${r.fabricWidthIn}" × ${r.fabricHeightIn}" (${r.fabricWidthCm} × ${r.fabricHeightCm} cm)`],
      ['Count for max width (ref)', String(count)],
    ];
  },
  'needle-hook': (fd) => {
    const kind = String(fd.get('kind'));
    const system = String(fd.get('system'));
    const value = String(fd.get('value')).trim();
    if (kind === 'needle') {
      let n =
        system === 'metric'
          ? findNeedleByMetric(Number(value))
          : system === 'us'
            ? findNeedleByUs(value)
            : KNITTING_NEEDLES.find((x) => x.uk === value);
      if (!n && system === 'us') {
        n = KNITTING_NEEDLES.find((x) => x.us.toLowerCase() === value.toLowerCase());
      }
      if (!n) {
        const mm = Number(value);
        if (Number.isFinite(mm)) {
          n = KNITTING_NEEDLES.reduce((best, cur) =>
            Math.abs(cur.metricMm - mm) < Math.abs(best.metricMm - mm) ? cur : best,
          );
        }
      }
      if (!n) throw new Error('Needle size not found — try metric mm or a US/UK label from the CYC chart');
      return [
        ['Metric', `${n.metricMm} mm`],
        ['US', n.us],
        ['UK', n.uk],
      ];
    }
    let h =
      system === 'metric'
        ? findHookByMetric(Number(value))
        : system === 'us'
          ? findHookByUs(value)
          : CROCHET_HOOKS.find((x) => x.uk === value);
    if (!h && system === 'us') {
      h = CROCHET_HOOKS.find((x) => x.us.toLowerCase() === value.toLowerCase());
    }
    if (!h) {
      const mm = Number(value);
      if (Number.isFinite(mm)) {
        h = CROCHET_HOOKS.reduce((best, cur) =>
          Math.abs(cur.metricMm - mm) < Math.abs(best.metricMm - mm) ? cur : best,
        );
      }
    }
    if (!h) throw new Error('Hook size not found — try metric mm or a US label like H-8');
    return [
      ['Metric', `${h.metricMm} mm`],
      ['US', h.us],
      ['UK', h.uk],
    ];
  },
  'seam-allowance': (fd) => {
    const mode = String(fd.get('mode'));
    if (mode === 'grade') {
      const r = gradeMeasurement(num(fd, 'base'), num(fd, 'fromSize'), num(fd, 'toSize'), num(fd, 'gradePerSize'));
      return [['Graded measurement', String(r)]];
    }
    if (mode === 'ease') {
      return [['With ease', String(addEase(num(fd, 'body'), num(fd, 'ease')))]];
    }
    const r = cutSizeFromFinished(
      num(fd, 'finished'),
      num(fd, 'seamAllowance'),
      String(fd.get('unit')) as 'in' | 'cm',
      num(fd, 'seams', 2),
    );
    return [['Cut / pattern size', `${r} ${fd.get('unit')}`]];
  },
};

function syncModeFields(form: HTMLFormElement) {
  const modeSelect = form.querySelector<HTMLSelectElement>('[data-mode-select], select[name="mode"]');
  if (!modeSelect) return;
  const mode = modeSelect.value;
  form.querySelectorAll<HTMLElement>('[data-mode-show]').forEach((el) => {
    const modes = (el.getAttribute('data-mode-show') || '').split(/\s+/).filter(Boolean);
    const show = modes.includes(mode);
    el.hidden = !show;
    el.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select, textarea').forEach((input) => {
      if (show) input.removeAttribute('disabled');
      else input.setAttribute('disabled', '');
    });
  });
}

export function initTool(name: string) {
  const root = document.querySelector<HTMLElement>(`[data-calc="${name}"]`);
  if (!root) return;
  const form = root.querySelector('form');
  if (!form) return;
  const handler = handlers[name];
  if (!handler) return;

  const shouldRun = hydrateFromQuery(form);
  syncModeFields(form);
  const run = () => {
    try {
      const fd = new FormData(form);
      const rows = handler(fd);
      const url = syncQuery(form);
      showResults(root, rows, url);
    } catch (err) {
      showResults(root, [['Error', err instanceof Error ? err.message : 'Invalid input']]);
    }
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    run();
    track('calculation_run', { tool_name: name });
  });
  form.querySelector('[data-mode-select], select[name="mode"]')?.addEventListener('change', (ev) => {
    syncModeFields(form);
    const mode = (ev.target as HTMLSelectElement).value;
    track('mode_change', { tool_name: name, mode });
  });

  // Preset helpers
  root.querySelectorAll<[HTMLElement]>('[data-preset]').forEach((el) => {
    el.addEventListener('change', () => {
      const v = (el as HTMLSelectElement).value;
      if (!v) return;
      const [w, l] = v.split('x');
      const width = form.elements.namedItem('width') as HTMLInputElement | null;
      const length = form.elements.namedItem('length') as HTMLInputElement | null;
      if (width && w) width.value = w;
      if (length && l) length.value = l;
    });
  });

  if (shouldRun) run();
}
