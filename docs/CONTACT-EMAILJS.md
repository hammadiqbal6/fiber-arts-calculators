# Contact form (EmailJS)

The `/contact/` page can send messages through the [EmailJS](https://www.emailjs.com/) REST API on the free plan. No `@emailjs/browser` SDK—only a small page-local script and `fetch`.

## Environment variables

Set these as **build-time** `PUBLIC_*` vars (same place as other site config: `.env` locally, Workers Builds / Pages dashboard in production). Leave them empty to keep the mailto-only fallback.

| Variable | Purpose |
|---|---|
| `PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS **public** key (`user_id` in the REST body) |

**Never** put the EmailJS private key in the repo, `.env.example`, or client-side code. Only the public key is used in the browser.

If any of the three is unset at build time, Astro renders the existing mailto link to `siteConfig.contactEmail` instead of the form. The mailto link stays visible as a secondary option either way.

## EmailJS dashboard setup

1. Create a free EmailJS account and an email service (Gmail, etc.).
2. Create a template with these variables:

| Template variable | Filled from |
|---|---|
| `{{from_name}}` | Name field |
| `{{reply_to}}` | Email field (set as Reply-To in the template) |
| `{{message}}` | Message field |
| `{{page_url}}` | `location.href` when the form is submitted |
| `{{site_name}}` | `siteConfig.siteName` (e.g. FiberCalc) |

3. Copy Service ID, Template ID, and Public Key into the env vars above.
4. Redeploy so Astro bakes the values into the contact page.

## Client safeguards (free-plan friendly)

- Honeypot field (`company`) — bots that fill it get a fake success; no API call.
- One successful send per 60 seconds per browser (`localStorage`).
- Message capped at 2,000 characters.
- Submit button disabled while the request is in flight.
- CSP `connect-src` allows `https://api.emailjs.com` (`public/_headers`).

## API shape

`POST https://api.emailjs.com/api/v1.0/email/send`

```json
{
  "service_id": "…",
  "template_id": "…",
  "user_id": "<public key>",
  "template_params": {
    "from_name": "…",
    "reply_to": "…",
    "message": "…",
    "page_url": "…",
    "site_name": "…"
  }
}
```

See also `.env.example` and `src/scripts/contact-form.ts`.
