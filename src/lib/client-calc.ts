/**
 * Browser entry re-exports for calculator islands.
 * Import from pages/components via <script> so Astro bundles only what's needed.
 */
export {
  estimateRectYarn,
  estimateSweaterYarn,
  estimateHatYarn,
  estimateScarfYarn,
  estimateAmigurumiYarn,
  substituteYarn,
} from './calculators/yarn';
export {
  calculateGauge,
  stitchesToSize,
  resizePattern,
  castOnStitches,
} from './calculators/gauge';
export { evenIncreaseDecrease, targetStitchChange } from './calculators/shaping';
export { crochetBlanketStitches } from './calculators/crochet';
export { fabricYardage } from './calculators/fabric';
export {
  quiltSizeFromMattress,
  quiltBacking,
  quiltBinding,
  halfSquareTriangles,
} from './calculators/quilt';
export { crossStitchFabric } from './calculators/cross-stitch';
export { cutFromFinished, gradeMeasurement } from './calculators/seam';
export { YARN_WEIGHTS } from '../data/yarn-weights';
export { BLANKET_SIZES, QUILT_SIZES, MATTRESS_SIZES, SWEATER_CHEST_IN, HAT_CIRC_IN } from '../data/sizes';
export { KNITTING_NEEDLES, CROCHET_HOOKS } from '../data/needles-hooks';
export { round, fromGrams, toGrams } from './units';

export function num(el: HTMLInputElement | HTMLSelectElement | null): number {
  if (!el) return 0;
  const v = parseFloat((el as HTMLInputElement).value);
  return Number.isFinite(v) ? v : 0;
}

export function readQuery(form: HTMLFormElement): void {
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    const field = form.elements.namedItem(key);
    if (field && 'value' in field) {
      (field as HTMLInputElement).value = value;
    }
  });
}

export function writeQuery(form: HTMLFormElement): void {
  const data = new FormData(form);
  const params = new URLSearchParams();
  data.forEach((value, key) => {
    if (typeof value === 'string' && value !== '') params.set(key, value);
  });
  const url = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', url);
}

export function setResults(root: HTMLElement, rows: [string, string][]): void {
  const dl = root.querySelector('[data-results]');
  if (!dl) return;
  dl.innerHTML = rows
    .map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`)
    .join('');
}
