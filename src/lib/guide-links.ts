/**
 * Turn guide prose conventions into safe HTML links.
 * Convention: `descriptive label (/tools/slug/)` or bare `/reference/.../` paths.
 */

const ALLOWED_PREFIXES = ['/tools/', '/guides/', '/reference/', '/methodology/', '/knitting-crochet/', '/sewing/', '/quilting/'];

function isAllowedPath(path: string): boolean {
  if (!path.startsWith('/') || path.includes('://') || path.includes('//')) return false;
  if (path.includes('<') || path.includes('"') || path.includes("'")) return false;
  return ALLOWED_PREFIXES.some((p) => path === p || path.startsWith(p));
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Visible HTML with real anchors. */
export function linkifyGuideHtml(text: string): string {
  let out = escapeHtml(text);
  // Label (/path/) → <a href="path">Label</a>
  out = out.replace(/([^<>(]+?)\s*\((\/[^)\s]+)\)/g, (full, label, path) => {
    if (!isAllowedPath(path)) return full;
    const trimmed = label.trim();
    if (!trimmed) return full;
    return `<a href="${path}">${trimmed}</a>`;
  });
  // Bare /path/ not already inside an href
  out = out.replace(/(?<!href=")(\/(?:tools|guides|reference|methodology|knitting-crochet|sewing|quilting)\/[a-z0-9\-]*\/?)/g, (path) => {
    if (!isAllowedPath(path.endsWith('/') ? path : `${path}/`)) return path;
    const href = path.endsWith('/') ? path : `${path}/`;
    return `<a href="${href}">${href}</a>`;
  });
  return out;
}

/** Plain text for FAQ JSON-LD — strip parenthetical paths and leave readable prose. */
export function stripGuidePaths(text: string): string {
  return text
    .replace(/\s*\(\/(?:tools|guides|reference|methodology|knitting-crochet|sewing|quilting)\/[^)\s]*\)/g, '')
    .replace(/(?:^|\s)(\/(?:tools|guides|reference|methodology|knitting-crochet|sewing|quilting)\/[a-z0-9\-]*\/?)/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
