# Google AdSense guide

## Eligibility checklist

- [ ] Useful original content on every tool page (600+ words) and ≥5 guides
- [ ] About, Contact, Privacy, Terms, Methodology pages live
- [ ] Privacy policy discloses AdSense, cookies, DoubleClick, personalized-ads opt-out, and analytics
- [ ] `ads.txt` at site root with your publisher ID
- [ ] No broken nav/footer links; site looks finished (not a thin doorway)
- [ ] Some organic traffic before applying (Google often expects ~20–30 quality pages + real visitors)
- [ ] Domain ownership verified; HTTPS on

## When to apply

Apply after the site has unique tools, supporting articles, and a clear niche identity—not on launch day with zero traffic. Craft retail CPC is typically lower than finance; volume and engagement matter.

## Enabling ads in this repo

1. Get a publisher ID (`pub-…`).
2. Set `PUBLIC_ADSENSE_PUBLISHER_ID=pub-…` and `PUBLIC_ADSENSE_ENABLED=true`.
3. Update `public/ads.txt`:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
4. Redeploy. `AdSlot` components reserve fixed height to limit CLS.
5. Prefer Auto ads initially, then refine placements below the calculator (never push the tool below the fold on mobile).

## CMP (EEA / UK / CH)

Google requires a Google-certified Consent Management Platform before personalized ads for users in the EEA, UK, and Switzerland. Integrate a CMP (e.g. Funding Choices / other certified) before serving personalized ads to those regions. Until then, keep ads off or use non-personalized configurations consistent with Google policy.

## Policy pitfalls

- Do not encourage accidental clicks; keep ad labels clear.
- Do not place ads that shift layout (reserve min-height — already in `AdSlot`).
- Do not copy thin AI doorway pages; keep calculators functional and content unique.
- Do not place ads on empty or error-only views.
- Disclose affiliate links separately if you add them later.

## Verification

Run `npm run audit` — the AdSense readiness audit checks required pages, privacy language, `ads.txt`, and thin pages.
