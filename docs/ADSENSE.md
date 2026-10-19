# Google AdSense readiness

## Eligibility checklist

- [ ] You are 18+ with **one** AdSense account  
- [ ] You own the site and can edit HTML/config  
- [ ] Original content on every tool page (formulas, examples, FAQs) — not widget-only  
- [ ] No thin/auto-generated doorway pages  
- [ ] Clear navigation; no broken links; no “under construction”  
- [ ] Privacy policy discloses Google/third-party advertising cookies + opt-out links (`/privacy/`)  
- [ ] About + Contact pages live  
- [ ] Working tools (not deceptive ad bait)  
- [ ] Supported language (English)  
- [ ] Traffic: apply after ~20–30 quality pages **and** some organic visits (recommendation)

## Enabling ads

1. Get approved; copy publisher ID (`ca-pub-…`).
2. Set in `src/config/site.ts` or env:
   - `PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX`
   - `PUBLIC_ADSENSE_ENABLED=true`
   - Slot IDs in `siteConfig.adsense.slots`
3. Update `public/ads.txt`:
   `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
4. Rebuild and deploy.
5. Ad slots use reserved min-height (`.ad-slot`) to protect CLS.

## Auto ads

Optional in AdSense UI. Still keep reserved manual slots for above-the-fold stability. Never push the calculator below the fold with ads on mobile.

## CMP (EEA / UK / CH)

Personalized ads require a Google-certified CMP with IAB TCF. Integrate before enabling ads for those regions. Until then, keep ads disabled or limited to non-personalized where required.

## Policy pitfalls

- Misleading functionality  
- Encouraging accidental clicks  
- Copyrighted pattern text pasted in bulk  
- Thin pages with only ads  
- Traffic from paid-to-click schemes  

See also market research AdSense section in [MARKET-RESEARCH.md](./MARKET-RESEARCH.md).
