# Custom domain cutover (FiberCalc)

Do **not** change the live domain in a normal feature PR. Keep coding against
`PUBLIC_SITE_URL` (default: the current `*.workers.dev` origin). When you are
ready to attach a custom domain, follow this checklist once.

## Single origin setting

| Consumer | Source |
|---|---|
| Astro `site`, canonicals, OG URLs, JSON-LD | `src/config/site.ts` → `siteConfig.siteUrl` |
| Sitemap `<loc>`, robots.txt `Sitemap:` | same (`siteConfig.siteUrl`) |
| `llms.txt` | same |
| IndexNow `host` / `keyLocation` | `scripts/indexnow.mjs` → `PUBLIC_SITE_URL` \|\| `DEFAULT_SITE_URL` |
| Default fallback (local / missing env) | `src/config/defaults.mjs` → `DEFAULT_SITE_URL` |

Override with the Cloudflare Workers Builds (and GitHub Actions) env var:

```bash
PUBLIC_SITE_URL=https://your-custom-domain.example
```

No trailing slash. Never hardcode the hostname in pages, components, or guides.

Sister-site origins (`PUBLIC_SITE_URL_*`) are separate and stay on their own
hosts until each sibling cuts over.

## Cutover steps

1. **Set the variable**  
   In Cloudflare Workers Builds → Variables (production), set  
   `PUBLIC_SITE_URL=https://<your-domain>` (https, no trailing slash).  
   Mirror the same value in GitHub Actions `env` for CI builds if CI should
   assert the new host. Update `DEFAULT_SITE_URL` in `src/config/defaults.mjs`
   only after production is stably on the custom domain (so local builds without
   env still match production).

2. **Add the custom domain in Cloudflare**  
   Workers & Pages → this Worker → Settings → Domains & Routes → Add  
   Custom Domain (or attach a route). Complete DNS as prompted. Do not change
   app routes or path structure.

3. **301 from `*.workers.dev` to the custom domain**  
   Keep the Worker serving the same `dist/` assets. Add a permanent redirect
   (308/301) from the old `fiber-arts-calculators.hammadiqbal117.workers.dev`
   host to `https://<your-domain>$path$query` so bookmarks and indexed URLs
   consolidate. Prefer host-level redirect in the Worker/`_redirects` or
   Cloudflare Bulk Redirects — do not leave two indexable origins.

4. **Google Search Console**  
   - Add a new URL-prefix (or domain) property for `https://<your-domain>/`.  
   - Verify (HTML tag already supported via `PUBLIC_GSC_VERIFICATION`).  
   - Submit `https://<your-domain>/sitemap-index.xml`.  
   - Use the Change of Address tool from the old property if Google still lists
     the workers.dev property as primary.  
   - Expect recrawl delay; monitor Coverage / Page indexing.

5. **IndexNow**  
   Redeploy so `public/<key>.txt` is live on the new host, then run  
   `npx wrangler deploy && node scripts/indexnow.mjs` so pings use the new host.

6. **Verify**  
   ```bash
   PUBLIC_SITE_URL=https://<your-domain> npm run build && npm run audit
   ```  
   Spot-check canonical, `og:url`, sitemap `<loc>`, robots `Sitemap:`, and
   JSON-LD for the new origin. Confirm `*.workers.dev` no longer appears in
   `dist/` HTML/XML when building with the custom `PUBLIC_SITE_URL`.

## Guardrails

- CI fails if this site’s `*.workers.dev` hostname is hardcoded outside the
  allowlisted config / env / docs files (`scripts/audit/site-origin.mjs`).
- Do not put `PUBLIC_*` in wrangler top-level `vars` (breaks `wrangler preview`);
  set them in the Workers Builds dashboard. See `docs/SEO-GUARDRAILS.md`.
