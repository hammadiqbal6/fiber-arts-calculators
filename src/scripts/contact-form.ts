/**
 * Tiny EmailJS REST client for /contact/ only.
 * Uses the public key + fetch — never ship the EmailJS private key.
 * @see docs/CONTACT-EMAILJS.md
 */

const API_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const THROTTLE_MS = 60_000;
const MAX_MESSAGE = 2000;
const STORAGE_KEY = 'fibercalc-contact-last-send';

type StatusKind = 'idle' | 'sending' | 'success' | 'error';

function setStatus(el: HTMLElement | null, kind: StatusKind, text: string) {
  if (!el) return;
  el.textContent = text;
  el.dataset.status = kind;
}

function throttleRemaining(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const last = Number(raw);
    if (!Number.isFinite(last)) return 0;
    const left = THROTTLE_MS - (Date.now() - last);
    return left > 0 ? left : 0;
  } catch {
    return 0;
  }
}

function markSent() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore quota / private mode */
  }
}

export function initContactForm(root: HTMLElement) {
  const form = root.querySelector('form');
  const status = root.querySelector<HTMLElement>('[data-contact-status]');
  const submit = root.querySelector<HTMLButtonElement>('[data-contact-submit]');
  if (!(form instanceof HTMLFormElement) || !submit) return;

  const serviceId = root.dataset.serviceId?.trim() || '';
  const templateId = root.dataset.templateId?.trim() || '';
  const publicKey = root.dataset.publicKey?.trim() || '';
  const siteName = root.dataset.siteName?.trim() || 'FiberCalc';

  if (!serviceId || !templateId || !publicKey) {
    setStatus(status, 'error', 'Contact form is not configured. Please use the email link below.');
    submit.disabled = true;
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const honeypot = (form.elements.namedItem('company') as HTMLInputElement | null)?.value?.trim();
    if (honeypot) {
      // Silent success for bots
      setStatus(status, 'success', 'Thanks — your message was sent.');
      form.reset();
      return;
    }

    const fromName = (form.elements.namedItem('from_name') as HTMLInputElement).value.trim();
    const replyTo = (form.elements.namedItem('reply_to') as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

    if (!fromName || !replyTo || !message) {
      setStatus(status, 'error', 'Please fill in name, email, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
      setStatus(status, 'error', 'Please enter a valid email address.');
      return;
    }
    if (message.length > MAX_MESSAGE) {
      setStatus(status, 'error', `Message must be ${MAX_MESSAGE} characters or fewer.`);
      return;
    }

    const wait = throttleRemaining();
    if (wait > 0) {
      const secs = Math.ceil(wait / 1000);
      setStatus(status, 'error', `Please wait ${secs}s before sending another message.`);
      return;
    }

    submit.disabled = true;
    setStatus(status, 'sending', 'Sending…');

    const body = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: fromName,
        reply_to: replyTo,
        message,
        page_url: typeof location !== 'undefined' ? location.href : '',
        site_name: siteName,
      },
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const detail = (await res.text().catch(() => '')).slice(0, 120);
        throw new Error(detail || `HTTP ${res.status}`);
      }
      markSent();
      form.reset();
      setStatus(status, 'success', 'Thanks — your message was sent. I will reply by email when I can.');
    } catch {
      setStatus(
        status,
        'error',
        'Sorry, the message could not be sent. Please try again later or use the email link below.',
      );
    } finally {
      submit.disabled = false;
    }
  });
}
