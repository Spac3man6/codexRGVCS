# Site cleanup & performance prompt — RGV Concrete Stain

Static HTML/CSS/JS site (no build step). All asset paths are absolute (`/assets/...`),
so the site must be served from root. Goal: resolve performance issues and the
placeholder/missing-image gaps before/just after launch. The two halves below are
independent — the **Engineering** half can be done by a dev or coding agent now;
the **Content** half depends on the client supplying (or approving generated) photos.

Audit was run on the current repo; the specific findings are baked into the tasks
below — these are real, not hypothetical.

---

## PART A — Performance (engineering, can start immediately)

### A1. Homepage hero is a 2.3 MB PNG — highest-impact fix
- `assets/img/site/home/home-hero-temp-ai-warehouse.png` is **2,327 KB** and has
  **no WebP variant**. It's the largest asset on the site by 2.5×, and it's the
  LCP (largest contentful paint) element on the homepage — so it directly drives
  the homepage's perceived load speed.
- Action: replace the PNG source with an optimized JPG **and** a WebP, wire both
  into the existing `<picture>` element in `index.html` (around lines 80–90,
  including the `max-width:767px` mobile `<source>` which currently points at the
  PNG). Target: hero JPG < 250 KB, WebP < 150 KB at the displayed dimensions.
- Note: this file is also AI-generated/temporary (see B1) — ideally the real hero
  photo and this optimization land together.

### A2. City-placeholder images have no WebP variants
- All 7 files in `assets/img/city-placeholders/*.jpg` lack a `.webp` sibling, and
  the city cards (homepage + about.html) reference them as bare `<img>` with no
  `<picture>` fallback.
- Action: generate WebP for each, and either (a) wrap each city card image in a
  `<picture>` with WebP `<source>` + JPG fallback, or (b) if these are being
  replaced with real photos (B2), do the WebP conversion on the replacements.

### A3. Gallery images are bare `<img>` JPGs, several 600–950 KB
- WebP `<picture>` markup currently exists for **heroes only** (one `<picture>`
  per page). Every gallery thumbnail and detail image is a plain `<img>` with no
  WebP fallback. Heaviest offenders:
  `garage-flake-closeup.jpg` (944 KB), `garage-flake-exterior.jpg` (692 KB),
  `garage-flake-interior.jpg` (663 KB), `polished-commercial-wide.jpg` (650 KB),
  `polished-aggregate-detail.jpg` (613 KB).
- WebP siblings already exist for these `site/*` images — they're just not
  referenced in markup. Action: convert gallery `<img>` tags to `<picture>` with
  the existing WebP `<source>` + JPG fallback. Lower-effort alternative: at minimum
  re-compress the JPGs (target < 300 KB each) since the WebP files are already
  ~half the size.
- All gallery images already have `loading="lazy"` and `decoding="async"` — keep that.

### A4. General front-end performance pass
- Confirm every `<img>` has explicit `width`/`height` (prevents layout shift / CLS).
  Most do; verify none were missed.
- Check CSS/JS: is `styles.css` render-blocking and larger than it needs to be?
  Is `site.js` deferred (`defer`/`async`)? Minify if not already.
- Verify the font loading strategy (Google Fonts `Barlow` etc.) uses
  `display=swap` (it does) and `preconnect` (it does) — confirm no FOIT.
- Add `Cache-Control` / long-lived caching headers for `/assets/` if the host
  supports it (note: hosting-dependent, not in-repo).
- Run Lighthouse (mobile + desktop) on the homepage and one service page;
  report Performance, LCP, CLS, TBT scores before and after.

---

## PART B — Placeholder / missing content (depends on real or approved photos)

### B1. AI-generated / temp-named assets still in production markup
Three placeholder-quality assets are live and referenced:
- `home-hero-temp-ai-warehouse.png` — homepage hero (`index.html` ~line 83)
- `city-placeholders/mcallen-retail-generated-temp.jpg` — referenced in BOTH
  `index.html` (~163) and `about.html` (~205)
- The other 6 city-placeholder JPGs are stand-ins of the same class (acceptable
  but not real project photos).
Action: replace with real (or client-approved) photography. The filenames signal
their temp status — once replaced, rename to drop `-temp` / `-generated` / `-ai`.

### B2. Staining gallery shows one photo four times
- Only one real staining photo exists (`stained-patio-wide.jpg`); the gallery
  staining section (`gallery.html` #stained-projects, ~lines 121–131) and
  `concrete-staining.html` (~176–187) repeat it across all 4 slots.
- See `staining-photo-prompt.md` for the image-generation brief to create
  distinct variants. Once available, update both files' slots with matching
  alt text and correct dimensions.

### B3. Inventory of real vs. placeholder imagery (for the client)
Real project photos that exist: staining ×1, polished ×2, decorative/metallic ×3,
garage/flake ×3. Everything else (hero, 7 city cards) is generated/temp.
Action: get the client to prioritize which categories need real photography first
(recommend: homepage hero + staining gallery, the two most-visible gaps).

---

## Deliverables
1. Optimized hero (JPG+WebP) wired into `index.html` `<picture>`.
2. WebP variants for all city-placeholder images + `<picture>` markup, OR
   replacement with real photos already in WebP.
3. Gallery `<img>` → `<picture>` conversion (or JPG re-compression) for the
   heavy files listed in A3.
4. Before/after Lighthouse numbers (mobile + desktop).
5. A list of any temp/AI assets still remaining so the client can supply reals.

## Constraints
- No build step exists — keep it static HTML/CSS/JS. Don't introduce a bundler
  unless explicitly approved.
- Absolute `/assets/` paths must stay; site is served from root.
- Don't touch `site.js` form logic, Formspree wiring, or `sitemap.xml`.
- Preserve existing `loading="lazy"` / `decoding="async"` / `width` / `height`.
