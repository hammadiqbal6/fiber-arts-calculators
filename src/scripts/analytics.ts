/**
 * GA4 loader: Consent Mode v2 defaults denied, deferred until idle/interaction,
 * upgrades consent only after cookie accept. Keeps verification meta untouched.
 */
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    __fiberGaReady?: boolean;
    /** Set by Analytics.astro inline stub (never put import in define:vars). */
    __FIBER_GA_ID?: string;
  }
}

const CONSENT_KEY = 'fibercalc-cookie-ok';

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === '1';
  } catch {
    return false;
  }
}

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }
}

/** Call as early as possible (inline in head) — sets Consent Mode v2 defaults. */
export function initConsentDefaults() {
  ensureGtagStub();
  window.gtag!('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });
}

export function grantAnalyticsConsent() {
  ensureGtagStub();
  window.gtag!('consent', 'update', {
    analytics_storage: 'granted',
  });
}

function loadGaScript(measurementId: string) {
  if (window.__fiberGaReady || document.querySelector(`script[data-ga4="${measurementId}"]`)) {
    return;
  }
  ensureGtagStub();
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  s.dataset.ga4 = measurementId;
  s.onload = () => {
    window.gtag!('js', new Date());
    window.gtag!('config', measurementId, {
      anonymize_ip: true,
      send_page_view: true,
    });
    window.__fiberGaReady = true;
  };
  document.head.appendChild(s);
}

/** Defer GA until idle or first interaction, and only with consent. */
export function scheduleAnalytics(measurementId: string) {
  if (!measurementId) return;

  const start = () => {
    if (!hasAnalyticsConsent()) return;
    grantAnalyticsConsent();
    loadGaScript(measurementId);
  };

  if (hasAnalyticsConsent()) {
    const run = () => start();
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(run, {
        timeout: 4000,
      });
    } else {
      window.addEventListener('load', () => setTimeout(run, 1), { once: true });
    }
  }

  const onInteract = () => {
    if (hasAnalyticsConsent()) start();
  };
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((evt) => {
    window.addEventListener(evt, onInteract, { once: true, passive: true });
  });
}

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (!hasAnalyticsConsent() || !window.gtag) return;
  window.gtag('event', name, params);
}

export function bindOutboundTracking(root: ParentNode = document) {
  root.querySelectorAll<HTMLAnchorElement>('a[href^="http"]').forEach((a) => {
    if (a.dataset.trackOutbound) return;
    try {
      const url = new URL(a.href);
      if (url.hostname === location.hostname) return;
    } catch {
      return;
    }
    a.dataset.trackOutbound = '1';
    a.addEventListener('click', () => {
      trackEvent('outbound_reference_click', {
        link_url: a.href,
        link_text: (a.textContent || '').trim().slice(0, 80),
      });
    });
  });
}
