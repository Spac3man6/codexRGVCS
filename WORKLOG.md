# Work Log

## 2026-06-04 — cowork-mobile-fix (Cowork agent, Computer 2)

**Branch:** `cowork-mobile-fix` off `launch-fixes`

**Context read:** WORKLOG.md, LAUNCH-PLAN-48H.md, SETUP-STEPS.md, ASSET-AUDIT.md, antigravity-handoff/ notes.

**Root cause confirmed:** Global `h1` rule is `clamp(3.9rem, 6vw, 6.4rem)`. At 390px viewport (body 17px mobile), 6vw = 23.4px falls below the 3.9rem minimum (≈66px), so the clamp always resolves to ~66px. No mobile override existed. Affects both the homepage hero (`.hero--home h1`) and every service page hero (`.page-hero h1`).

**Fix applied in `assets/css/styles.css` inside `@media (max-width: 767px)`:**
```css
.hero--home h1 {
  font-size: clamp(2.4rem, 9vw, 3.1rem); /* ~41px at 390px vs ~66px before */
  line-height: 1.05;
}

.page-hero h1 {
  font-size: clamp(2.4rem, 9vw, 3.1rem); /* same fix for all service page heroes */
  line-height: 1.05;
}
```

**Pages affected / audited:**
- `index.html` — `.hero--home h1` — "Concrete Finishes For Rio Grande Valley Floors"
- `epoxy-flooring.html` — `.page-hero h1`
- `concrete-staining.html` — `.page-hero h1`
- `concrete-polishing.html` — `.page-hero h1`
- `garage-floor-coatings.html` — `.page-hero h1`
- `decorative-coatings.html` — `.page-hero h1`
- `about.html`, `services.html` — `.page-hero h1` (same rule applies)

**Horizontal scroll audit:** No bare px-width elements wider than viewport. `min-width: 320px` on body is below all target widths (360–414px). All grids already collapse to `1fr` at 767px. No new risk introduced.

**Desktop regression:** New rules scoped entirely inside `@media (max-width: 767px)`. No desktop rules touched.

**Test suite:** `python3 -m unittest tests.test_site` — 11/11 passed.

**PR:** `cowork-mobile-fix` → `launch-fixes` (see GitHub).

**CSS section touched:** Lines ~1860–1872 of `assets/css/styles.css` (inside the existing 767px block, after `.hero--home { padding-top: 8.4rem; }`). No other sections modified. No conflict expected with Codex QA branch unless it also edits the 767px hero block — check before merge.

## 2026-04-04

- Read the existing scaffold instead of restarting the project.
- Confirmed the workspace only contained the shared stylesheet, shared script, placeholder SVGs, and the reference analysis.
- Built the requested multi-page static site shell on top of the existing CSS and JS scaffold.
- Preserved the shared header, footer, sticky CTA, modal, accordion, gallery lightbox, and demo form handling.
- Added project documentation:
  - `README.md`
  - `BRANDING.md`
  - `CONTENT-GUIDE.md`
  - `sitemap.xml`
- Added initial targeted validation and corrected HTML entity escaping for Google Fonts URLs.

## 2026-04-06

- Client asset drop added under `assets/client-assets/`.
- Audited the drop and documented findings in `ASSET-AUDIT.md`.
- Added automated regression coverage in `tests/test_site.py`.
- Ran `python3 -m unittest -v tests.test_site` and confirmed the suite passed.
- Created normalized first-pass production asset folders under `assets/img/site/`.
- Copied selected polished, metallic, garage, and temporary AI hero assets into normalized paths for safer production use.
- Added `CLIENT-ASSET-REQUESTS.md` so the missing-asset ask stays short and reusable.
- Added `REVIEW-CHECKPOINT-01.md` to define the first formal pause and red-team review moment.
- Integrated first-pass normalized still assets into:
  - homepage
  - services
  - concrete polishing
  - epoxy flooring
  - decorative coatings
  - garage floor coatings
  - gallery
  - case studies
- Started a local preview server for the first visual review checkpoint.
- Re-ran `python3 -m unittest -v tests.test_site` after the integration batch and confirmed the suite still passed.
- Captured Loom transcript guidance from stakeholder review:
  - the hero image is upstream of typography, color, and contrast decisions
  - drone hero video is a weak fallback because mobile performance risk is too high
  - launch speed matters, but not at the cost of weak first-impression proof
  - AI fallback is acceptable temporarily if the client cannot deliver usable hero media fast
- Started a homepage simplification pass after visual review feedback:
  - reduced shared header clutter
  - removed the homepage hero proof panel and stat strip
  - moved proof content below the fold
  - increased hero contrast against photography

## 2026-04-13

- Added `PROJECT-CONTEXT.md` as the canonical continuity file for thread recovery and future handoff.
- Updated the README and regression suite so the project context file stays part of the expected project state.
- Installed local visual review tooling:
  - `playwright` via `python3 -m pip install playwright`
  - Chromium via `python3 -m playwright install chromium`
- Confirmed Playwright is available locally for future rendered-page review.
- Noted an execution constraint for future visual QA:
  - headless Chromium launch requires escalated execution on this machine because sandboxed launch hits a macOS permission failure
- Ran a screenshot-based rendered review with Playwright and removed the AI warehouse image from production page usage.
- Replaced the homepage and gallery hero/share image with the strongest current real polished floor photo.
- Replaced AI polished-gallery slots with explicit placeholders so proof stays honest.

## 2026-04-21

- Added `ANTIGRAVITY-MASTER-PROMPT.md` as the approved external imagery-only handoff prompt.
- Locked the Antigravity handoff to generated imagery plus a manifest-based documentation bundle only.
- Updated project continuity docs so future handoff and re-entry do not depend on chat history.
- Updated the expected-docs regression check so the Antigravity prompt stays part of the required project state.

## 2026-05-01

- Applied browser review comments for the shared site shell:
  - ma
## 2026-07-12 — mcallen.html service-area page (Cowork scheduled task) — DRAFT PENDING VIC REVIEW

- Added `mcallen.html`, first of the five weekly service-area pages (McAllen, Edinburg, Mission, Brownsville, Harlingen backlog).
- Copied head/meta/JSON-LD/mount/form patterns from `concrete-staining.html`; LocalBusiness shared fields match `index.html` exactly (regression-tested).
- Schema: LocalBusiness + Service (areaServed McAllen) + FAQPage + BreadcrumbList. Canonical/og:url use clean URL `/mcallen`.
- Hero uses `assets/img/city-placeholders/mcallen-retail-generated-temp.(webp|jpg)` with a REPLACE comment; swap for a real McAllen project photo when approved.
- Unique local copy: Pharr proximity, residential vs commercial project split, off-hours scheduling for retail/clinic installs, sun/heat sealer framing. No fabricated project claims.
- Internal links to all five service pages plus services.html; lead form wired to shared Formspree handler with `data-lead-form="mcallen-page"`, city preselected to McAllen.
- Added `/mcallen` to `sitemap.xml`.
- NOT touched: git, nav in `assets/js/site.js` (city pages are landing pages; a "Service Areas" nav/footer block is a decision for Vic once 2-3 city pages exist).

## 2026-07-15 — edinburg.html service-area page (Cowork scheduled task) — DRAFT PENDING VIC REVIEW

- Added `edinburg.html`, second of the five weekly service-area pages (McAllen shipped 2026-07-12; remaining backlog: Mission, Brownsville, Harlingen).
- Copied head/meta/JSON-LD/mount/form patterns from `mcallen.html` (the most recent city page, closer template match than a service page); LocalBusiness shared fields (name, telephone, email, address, areaServed, openingHoursSpecification, geo, hasMap, sameAs) are byte-identical to `index.html` and `mcallen.html` (regression-tested).
- Schema: LocalBusiness + Service (areaServed Edinburg) + FAQPage + BreadcrumbList. Canonical/og:url use clean URL `/edinburg`.
- Hero uses the existing `assets/img/city-placeholders/edinburg-residential-entry.(webp|jpg)` (already present in the repo, same 1000x562 dimensions as the McAllen hero) with a REPLACE comment; swap for a real Edinburg project photo when approved.
- Unique local copy angle (distinct from McAllen's retail/clinic framing): Pharr proximity, newer-subdivision residential growth (entries, patios, garages), rental-property flooring near UTRGV timed to lease turnover, and county/municipal office floors (polish/epoxy) near the courthouse. No fabricated project claims or invented statistics; general geography/institution references only (UTRGV, county seat) are factual and not project-specific.
- Internal links to all five service pages plus services.html; lead form wired to shared Formspree handler with `data-lead-form="edinburg-page"`, city preselected to Edinburg.
- Added `/edinburg` to `sitemap.xml`.
- Verified: `python3 -m unittest -v tests.test_site` — 19/19 passed. Manual sweep confirmed no em-dashes/en-dashes and all local href/src/srcset references resolve on disk.
- NOT touched: git, nav in `assets/js/site.js` (same open decision as McAllen: a "Service Areas" nav/footer block is Vic's call once 2-3 city pages exist, now at 2).

## 2026-07-22 — mission.html service-area page (Cowork scheduled task) — DRAFT PENDING VIC REVIEW

- Added `mission.html`, third of the five weekly service-area pages (McAllen shipped 2026-07-12, Edinburg 2026-07-15; remaining backlog: Brownsville, Harlingen).
- Copied head/meta/JSON-LD/mount/form patterns from `edinburg.html`; LocalBusiness shared fields (name, telephone, email, address, areaServed, openingHoursSpecification, geo, hasMap, sameAs) verified byte-identical to `index.html` with a field-by-field JSON comparison.
- Schema: LocalBusiness + Service (areaServed Mission) + FAQPage + BreadcrumbList. Canonical/og:url use clean URL `/mission`.
- Hero uses the existing `assets/img/city-placeholders/mission-patio-poolside.(webp|jpg)` (already in the repo, same 1000x562 dimensions as the other city heroes) with a REPLACE comment; swap for a real Mission project photo when approved.
- Unique local copy angle (distinct from McAllen retail/clinic and Edinburg rentals/county): outdoor living — pool decks and patios finished for full sun and wet traction, Sharyland-area custom-home interiors, and winter-resident homes with install scheduling while owners are away. FAQ covers travel charge, slip resistance, sun fade/resealing, and empty-home flooring (pulls slip-resistance and heat-durability objections from the FAQ backlog item). No fabricated project claims; only general geography references (Sharyland area, expressway proximity, winter-resident communities).
- Internal links to all five service pages plus services.html; lead form wired to shared Formspree handler with `data-lead-form="mission-page"`, city preselected to Mission.
- Added `/mission` to `sitemap.xml`.
- Verified: `python3 -m unittest -v tests.test_site` — 19/19 passed (includes local-reference resolution, sitemap xmllint, JSON-LD validity). Grep sweep confirmed no em-dashes/en-dashes in the new page or sitemap.
- NOT touched: git, nav in `assets/js/site.js`. Nav/footer "Service Areas" block decision is now ripe: 3 of 5 city pages exist and none are discoverable from on-site navigation, only via sitemap. Flagging for Vic rather than deciding unilaterally.

## 2026-07-28 — brownsville.html service-area page (Cowork scheduled task) — DRAFT PENDING VIC REVIEW

- Added `brownsville.html`, fourth of the five weekly service-area pages (McAllen 2026-07-12, Edinburg 2026-07-15, Mission 2026-07-22; remaining backlog: Harlingen, then FAQ page).
- Copied head/meta/JSON-LD/mount/form patterns from `mission.html`; LocalBusiness shared fields (name, telephone, email, priceRange, address, areaServed, openingHoursSpecification, geo, hasMap, sameAs, serviceType, additionalType, @id) verified identical to `index.html` with a field-by-field JSON comparison. Per-page fields (url, image, description) point to /brownsville.
- Schema: LocalBusiness + Service (areaServed Brownsville) + FAQPage + BreadcrumbList. Canonical/og:url use clean URL `/brownsville`.
- Hero uses the existing `assets/img/city-placeholders/brownsville-hospitality.(webp|jpg)` (already in the repo, same 1000x562 dimensions as the other city heroes) with a REPLACE comment; swap for a real Brownsville project photo when approved.
- Unique local copy angle (distinct from McAllen retail/clinic, Edinburg rentals/county, Mission outdoor living): hospitality floors installed around service hours, older downtown slabs scoped with a test grind, Gulf humidity shaping epoxy/sealer install windows, and distance honesty. The page states the roughly one-hour drive from Pharr openly and does NOT promise "no travel charge" (unlike the close-in city pages) because that is a pricing policy only Vic/JP can commit to; it says Brownsville is inside the published service area and estimates start from photos. FAQ covers distance, humidity, older-building slabs, and business downtime (pulls the install-downtime objection from the FAQ backlog item).
- Internal links to all five service pages plus services.html; lead form wired to shared Formspree handler with `data-lead-form="brownsville-page"`, city preselected to Brownsville.
- Added `/brownsville` to `sitemap.xml`.
- Verified: `python3 -m unittest -v tests.test_site` — 19/19 passed (includes local-reference resolution, sitemap xmllint, JSON-LD validity). Grep sweep confirmed no em-dashes/en-dashes in the new page or sitemap.
- NOT touched: git, nav in `assets/js/site.js`. Standing flag for Vic, now stronger: 4 of 5 city pages exist and none are reachable from on-site navigation, only via sitemap. A footer "Service Areas" block is one shared edit in site.js once Harlingen ships.

## 2026-08-04: harlingen.html service-area page (Cowork scheduled task), DRAFT PENDING VIC REVIEW

- Added `harlingen.html`, fifth and FINAL of the five weekly service-area pages (McAllen 2026-07-12, Edinburg 2026-07-15, Mission 2026-07-22, Brownsville 2026-07-28). City-page backlog item is now COMPLETE; next run starts the FAQ page with FAQPage schema.
- Copied head/meta/JSON-LD/mount/form patterns from `brownsville.html`; LocalBusiness shared fields verified identical to `index.html` with a field-by-field JSON comparison. Per-page fields (url, image, description) point to /harlingen.
- Schema: LocalBusiness + Service (areaServed Harlingen) + FAQPage + BreadcrumbList. Canonical/og:url use clean URL `/harlingen`. FAQ schema answers verified verbatim against the visible accordion text.
- Hero uses the existing `assets/img/city-placeholders/harlingen-showroom-office.(webp|jpg)` (already in the repo, same dimensions as the other city heroes) with a REPLACE comment; swap for a real Harlingen project photo when approved.
- Unique local copy angle (distinct from McAllen retail/clinic, Edinburg rentals/county, Mission outdoor living, Brownsville hospitality/humidity): mid-Valley crossroads commercial work. Polished showroom/office/storefront floors set to a written gloss spec with sample panels, shop and warehouse epoxy near the airport corridor and industrial parks, and stained/polished interiors for established neighborhoods on decades-old slabs. FAQ pulls the cost-vs-replacement objection from the FAQ backlog plus service-area, older-slab, and gloss-spec questions. Distance stated honestly (about 40 minutes from Pharr); no travel-charge promise, same pricing-policy honesty as the Brownsville page since that commitment is Vic/JP's call. No fabricated projects or statistics; only general geography (expressway junction, airport corridor, established neighborhoods).
- Internal links to all five service pages plus services.html; lead form wired to shared Formspree handler with `data-lead-form="harlingen-page"`, city preselected to Harlingen.
- Added `/harlingen` to `sitemap.xml`.
- Verified: `python3 -m unittest tests.test_site`: 19/19 passed (includes local-reference resolution, sitemap xmllint, JSON-LD validity, Formspree wiring, REPLACE-comment guard). Grep sweep confirmed no em-dashes/en-dashes in the new page or sitemap. Script check confirmed all local href/src/srcset references resolve on disk.
- NOT touched: git, nav in `assets/js/site.js`. DECISION NOW FULLY RIPE for Vic: all 5 city pages exist and none are reachable from on-site navigation, only via sitemap. One shared footer "Service Areas" block in site.js would wire all five at once.

## 2026-08-11: faq.html FAQ page (Cowork scheduled task), DRAFT PENDING VIC REVIEW

- Added `faq.html`. City-page backlog item (McAllen, Edinburg, Mission, Brownsville, Harlingen) finished 2026-08-04; this run starts backlog item 2, the FAQ page with FAQPage schema. Remaining backlog after this: Spanish versions of index/services/contact, then new case-study entries.
- Copied head/meta/JSON-LD/mount/form patterns from `harlingen.html` and `services.html` (closest templates: city page for the head/schema shell, services page for the generic non-city FAQ layout). LocalBusiness shared fields (name, telephone, email, address, areaServed, openingHoursSpecification, geo, hasMap, sameAs, serviceType, additionalType, @id) verified identical to `index.html` with a field-by-field JSON comparison. Per-page fields (url, image, description) point to /faq.
- Schema: LocalBusiness + FAQPage (14 questions) + BreadcrumbList. No Service schema, this page is not a single-service page, so it is intentionally excluded from `tests.test_site.test_service_pages_have_service_and_faq_schema`'s service-page set. Canonical/og:url use clean URL `/faq`. FAQ schema answers verified verbatim against the visible accordion text for all 14 questions.
- Hero reuses `assets/img/site/polished/polished-commercial-wide.jpg`, the same real (non-placeholder, no REPLACE comment needed) photo already used on `services.html`, `gallery.html`, and `case-studies.html` for general, non-city pages. Considered `polished-aggregate-detail.jpg` for variety but its EXIF orientation flag (upper-right on a Samsung capture) makes the raw 1600x1200 pixel dimensions unreliable for a full-bleed 100vw hero; it is only ever used elsewhere as a 1200x1600 portrait gallery/card thumbnail, so reusing the already-proven wide hero asset was the safer call instead of guessing at unverified crop behavior.
- Content: 14 Q&A pairs grouped into 5 categories, each its own `.faq`/`.accordion` section (Getting Started; Cost And Value; Durability And Climate; Choosing A Finish; Installation And Maintenance), covering the six required objection topics from the task brief: cost vs. replacement, RGV heat durability, slip resistance, install downtime, maintenance, and epoxy vs. stain vs. polish differences. Also covers estimate process, service-area coverage, scheduling, cost drivers, decorative-coatings timing, garage vs. interior systems, and older/cracked slabs.
- Deviation flagged: the task brief said to source questions from `CONTENT-GUIDE.md`, but that file is a placeholder/asset replacement checklist with no FAQ-style question content in it. Questions were instead written to stay consistent with claims already live elsewhere on the site (services.html detail-grid finish comparisons, the process-card steps on services/epoxy pages, and the objection-handling language already proven on the five city pages). No warranty, license, or insurance claims were added anywhere. I grepped the whole site for "licensed", "insured", "warranty", and "guarantee" first and found zero matches, so the FAQ page does not introduce any claim the rest of the site does not already make.
- Confirmed no per-page site.js change needed: verified the accordion click handler in `assets/js/site.js` (~line 323) scopes "close siblings" to `item.parentElement`, so five independent `.accordion` groups on one page each behave as their own exclusive accordion. No shared-JS edit required.
- Added internal links to all five service pages plus `services.html`, and, as a bonus (not required by the brief), to `mcallen.html`, `edinburg.html`, `mission.html`, `harlingen.html`, and `brownsville.html` in a closing "Explore Further" section. This gives the orphaned city pages a second discovery path beyond the sitemap without touching nav or `site.js`, consistent with the standing flag in every prior city-page entry.
- Lead form wired to shared Formspree handler with `data-lead-form="faq-page"`; no city preselected since this page is not city-specific (all seven cities available, none marked `selected`).
- Added `/faq` to `sitemap.xml`.
- Verified: `python3 -m unittest tests.test_site`, grep sweep for em-dashes/en-dashes, and a local-reference resolution check. Full results in this run's QA summary to Vic.
- NOT touched: git, nav in `assets/js/site.js`. Same standing flag as the city pages: FAQ is reachable from the sitemap and from the new city-page cross-links, but not from primary nav or the footer, until Vic decides on that shared nav/footer edit.

## 2026-08-18: es.html Spanish homepage (Cowork scheduled task), DRAFT PENDING VIC REVIEW

- Added `es.html`, first of backlog item 3 (Spanish versions of index, services, contact). City pages (backlog item 1) finished 2026-08-04, FAQ page (backlog item 2) finished 2026-08-11. This run starts the Spanish translation pass; remaining after this: Spanish services, then Spanish contact, then backlog item 4 (new case-study entries).
- Filename and URL decision: used a flat root-level file `es.html` (clean URL `/es`) instead of an `/es/` subdirectory. Reason: `tests/test_site.py` globs `ROOT.glob("*.html")`, root level only, so a subdirectory page would ship with zero automated regression coverage. A flat file gets full coverage from the existing 19-test suite for free, at the cost of a slightly less conventional URL than `/es/`. Flagging the URL scheme as a decision for Vic once all three Spanish pages exist, same as the standing nav flag below.
- Content is a full translation of `index.html`: hero, trust block, city wall (city names and street/business proper nouns kept in English, descriptive copy translated), commercial and residential galleries (alt text and aria-labels translated), the on-page proposal lead form (all labels, placeholders, and select options translated; `name=` attributes on inputs left as `name`, `email`, `phone`, `city`, `service`, `project-size`, `message` so Formspree field keys stay consistent with the English form), services links, FAQ accordion, and project profile cards. No fabricated claims added or changed; content tracks the English original sentence for sentence.
- Form is wired to the same shared Formspree endpoint with `data-lead-form="home-estimate-es"` and `data-page="home-es"` so Vic can filter Spanish-site leads in Formspree submissions without any JS change.
- Schema: LocalBusiness (all fields byte-identical to `index.html` except `url`, `image` staying the representative photo, and `description`, which is translated, same discipline as the city-page precedent) + FAQPage (4 questions, translated, verified verbatim against the visible accordion text). Canonical is `/es`. Added reciprocal `hreflang` alternate tags: `es.html` links back to `en`/`/ ` and forward to itself as `es`/`x-default` fallback to English; **`index.html` was also edited** to add the matching `hreflang="en"`, `hreflang="es"`, `hreflang="x-default"` link tags in its `<head>` so the pair is discoverable by search engines. This is the one edit to an existing shipped page in this run; no other content in `index.html` changed.
- Added `/es` to `sitemap.xml`.
- **IMPORTANT LIMITATION, not fixed in this run:** the shared header nav, footer, sticky CTA bar, and the "Schedule a Call" estimate popup modal are all rendered by `assets/js/site.js` (`renderSiteHeader`, `renderSiteFooter`, `renderStickyBar`, `renderEstimateModal`), and every string inside those four functions is hardcoded English with no locale branching. That means `es.html`'s header, footer, sticky bar, and popup form will render in English exactly like every other page, even though the page body is fully Spanish. Making this genuinely bilingual requires adding a small i18n dictionary and a `lang`-based lookup to those four functions in `site.js`, a change that touches the shared chrome on all 18 existing pages at once. I did not make that change on an unattended run: it is a much larger blast-radius edit than a new page, and every prior run in this backlog has deliberately deferred shared-`site.js`/nav decisions to Vic rather than deciding unilaterally (see the standing "Service Areas nav" flag on every city-page entry above). Flagging this explicitly rather than shipping a page that silently looks half-translated. Recommend Vic decide whether that i18n pass is worth doing before or after the remaining two Spanish pages ship, since doing it once now would cover all three.
- **Separately discovered, not introduced by this run:** a repo-wide em-dash sweep during QA found live em-dashes (character U+2014) still present in three shipped files despite the "no em/en-dashes" rule and the 2026-06-08/06-09 sweeps noted earlier in this log: `index.html` line 304 and 377 ("Commercial scopes across the Rio Grande Valley — retail interiors...", "Residential work across the Valley — entry floors..."), `services.html`, `gallery.html`, and `assets/js/site.js` line 565 (the form success message: `"Thank you — your request was sent..."`, which renders on every lead form on every page, English and Spanish). None of these were touched in this run since they are outside a single new page's scope, but flagging because the JS one is customer-facing on every form submission sitewide and directly violates the standing rule.
- Internal links point to the existing English `concrete-staining.html`, `concrete-polishing.html`, `epoxy-flooring.html`, `decorative-coatings.html`, `garage-floor-coatings.html`, `contact.html`, and `case-studies.html` since no Spanish equivalents of those pages exist yet; anchor text is Spanish, hrefs are the English pages.
- Verified: `python3 -m unittest tests.test_site`, 19/19 passed (includes local-reference resolution, sitemap xmllint, JSON-LD validity, shared LocalBusiness field equality, lead-form `name=` markup, lazy-loading, clean-URL canonical check). Grep sweep confirmed zero em-dashes/en-dashes in `es.html`, the `index.html` diff, and `sitemap.xml`. Confirmed all `name=` attributes present on required form controls, including the `<textarea>` (multi-line tag, missed by a naive single-line grep, checked manually).
- NOT touched: git, nav in `assets/js/site.js` (the pre-existing standing flag), and the em-dash/i18n issues named above.

## 2026-08-27: servicios.html Spanish services page (Cowork scheduled task), DRAFT PENDING VIC REVIEW

- Added `servicios.html`, second of backlog item 3 (Spanish versions of index, services, contact). Backlog item 1 (five city pages) finished 2026-08-04, item 2 (FAQ page) finished 2026-08-11, Spanish homepage `es.html` shipped 2026-08-18. Remaining after this run: Spanish contact page, then backlog item 4 (new case-study entries).
- Filename and URL decision: flat root-level `servicios.html`, clean URL `/servicios`. Same reasoning as `es.html`: `tests/test_site.py` globs `ROOT.glob("*.html")` at root only, so a subdirectory page would ship with zero regression coverage. Chose the keyword-bearing Spanish slug `/servicios` over an `/es-services` style prefix because it is the stronger Spanish search target. This does mean the Spanish set now reads `/es` + `/servicios` rather than a single consistent prefix. That URL-scheme question is still open for Vic, same standing flag as the 2026-08-18 entry, and is cheapest to settle before the Spanish contact page ships next week.
- Copied head/meta/JSON-LD/mount/form patterns from `services.html` (direct English counterpart) with the Spanish head conventions from `es.html`. LocalBusiness shared fields (name, telephone, email, address, areaServed, openingHoursSpecification) verified equal to `index.html` by the automated suite. Per-page fields (url, image, description) point to /servicios, description translated, same discipline as `es.html` and the city pages.
- Schema: LocalBusiness + FAQPage + BreadcrumbList, deliberately mirroring the English `services.html` schema set exactly. No `Service` schema added: the English overview page does not carry one either (only the five single-service pages do, per `tests.test_site.test_service_pages_have_service_and_faq_schema`), and an hreflang pair should not emit different structured-data types on each side. Breadcrumb points at `/es` then `/servicios` so the Spanish trail stays inside the Spanish tree. Canonical and og:url use the clean URL `/servicios`.
- FAQ: 5 questions, the 4 translated from the English services page plus one new Spanish-only question ("¿Puedo pedir la cotización y hacer todo el proceso en español?") that answers the objection an English page has no reason to carry. All 5 schema answers verified verbatim against the visible accordion text by script, tags stripped, whitespace normalized.
- hreflang: reciprocal tags added on both sides. `servicios.html` declares en=/services, es=/servicios, x-default=/services. **`services.html` was also edited** to add the matching three `link rel="alternate"` tags in its head. That is the only change to an existing shipped page in this run, three added lines, no content touched.
- Hero reuses `assets/img/site/polished/polished-commercial-wide.jpg`, the same real photo the English services page uses. Real client-supplied asset, so no REPLACE comment needed and no new placeholder debt introduced.
- Content is a full translation of `services.html`: hero, system-selection detail grid, five service cards, residential/commercial compare cards, six-step process grid, proposal lead form, and FAQ. No fabricated claims, no new warranty/license/insurance language, no invented numbers. One honest addition: the "Servicios Principales" intro states plainly that the five service detail pages are still in English, so a Spanish reader is not surprised when the link lands on English copy.
- Form wired to the shared Formspree handler with `data-lead-form="servicios-page"` and `data-page="services-es"` so Vic can filter Spanish services-page leads in Formspree without a JS change. Input `name=` attributes left as `name`, `email`, `phone`, `city`, `service`, `project-size`, `message` so field keys stay consistent with every other form on the site.
- Added a closing "Seguir Explorando" section linking to `es.html`, `contact.html#request-estimate`, `gallery.html`, `case-studies.html`, `faq.html`, and all five city pages. Same rationale as the FAQ page: gives the orphaned pages another discovery path without touching nav or `site.js`.
- Added `/servicios` to `sitemap.xml`.
- Verified: `python3 -m unittest tests.test_site`, 19/19 passed. Script check confirmed all 90 local href/src/srcset references in `servicios.html` resolve on disk, including the `contact.html#request-estimate` anchor target. `xmllint --noout sitemap.xml` passed. Grep sweep confirmed zero em-dashes and en-dashes in `servicios.html`, `sitemap.xml`, and the three lines added to `services.html`.
- **STILL OPEN, carried forward unchanged from 2026-08-18, not fixed in this run:** (1) the shared header nav, footer, sticky CTA, and estimate modal are all rendered from hardcoded English strings in `assets/js/site.js` with no locale branching, so `servicios.html` renders Spanish body copy inside English chrome exactly like `es.html` does. That i18n pass touches shared code on all 20 pages at once and is Vic's call. It is now the single biggest quality gap in the Spanish track and is worth deciding before the Spanish contact page ships. (2) Live em-dashes still present in `index.html` (lines ~304, ~377), `services.html`, `gallery.html`, and `assets/js/site.js` line ~565 (the form success message, which renders on every lead form sitewide). Neither was touched because both are outside a single new page's scope.
- NOT touched: git, nav in `assets/js/site.js`, and the two open items above.

## 2026-09-01: contacto.html Spanish contact page (Cowork scheduled task), DRAFT PENDING VIC REVIEW

- Added `contacto.html`, third and FINAL page of backlog item 3 (Spanish versions of index, services, contact). Backlog item 1 (five city pages) finished 2026-08-04, item 2 (FAQ page) 2026-08-11, `es.html` 2026-08-18, `servicios.html` 2026-08-27. **Backlog item 3 is now COMPLETE.** Next run starts backlog item 4, new case-study entries for `case-studies.html`, which is the last item on the standing backlog.
- Filename and URL: flat root-level `contacto.html`, clean URL `/contacto`. Same reasoning as `es.html` and `servicios.html`: `tests/test_site.py` globs `ROOT.glob("*.html")` at root only, so a subdirectory page would ship with zero regression coverage. Keyword-bearing Spanish slug chosen over an `/es-contact` prefix for the same search reason as `/servicios`. The Spanish set now reads `/es` + `/servicios` + `/contacto`. That URL-scheme question, flagged as open on 2026-08-18 and 2026-08-27, is now moot for new pages: all three Spanish pages are shipped and consistent with each other. If Vic still wants an `/es/` prefix scheme, it is now a one-time rename of three files plus six hreflang tags plus three sitemap entries, and it should be decided before the pages get indexed and start earning links.
- Copied head/meta/JSON-LD/mount/form patterns from `contact.html` (direct English counterpart) with the Spanish head conventions from `servicios.html` (lang="es", og:locale es_US, hreflang triple). LocalBusiness shared fields (name, telephone, email, address, areaServed, openingHoursSpecification) verified equal to `index.html` by the automated suite. Per-page fields (url, image, description) point to /contacto, description translated, same discipline as `es.html`, `servicios.html`, and the city pages.
- Schema: LocalBusiness + FAQPage (5 questions) + BreadcrumbList, mirroring the English `contact.html` schema set exactly. No Service schema, matching the English counterpart and satisfying `test_any_page_with_service_schema_also_has_faq_schema`. Breadcrumb trail points at `/es` then `/contacto` so the Spanish tree stays internally consistent, same pattern as `servicios.html`.
- FAQ: 5 questions, the 4 translated from the English contact page plus one new Spanish-only question ("¿Me pueden atender en español de principio a fin?"), the same "answer the objection the English page has no reason to carry" pattern used on `servicios.html`. All 5 schema answers verified verbatim against the visible accordion text by script (tags stripped, whitespace normalized, 5/5 exact match). That Spanish-support answer is written honestly: it states that some service pages are still in English and that this does not change how the client is served.
- hreflang: reciprocal tags added on both sides. `contacto.html` declares en=/contact, es=/contacto, x-default=/contact. **`contact.html` was also edited** to add the matching three `link rel="alternate"` tags in its head. That is the only change to an existing shipped page in this run: three added lines, zero content touched (verified by `git diff --stat`, 3 insertions, 0 deletions).
- Hero reuses `assets/img/site/staining/stained-patio-wide.jpg` with its full responsive srcset, the same real photo the English contact page uses. Real client-supplied asset, so no REPLACE comment and no new placeholder debt.
- Content is a full translation of `contact.html`: hero, four contact cards, the request-estimate lead form, the "three things that make a quote better" and scheduling panels, the coverage map, and the FAQ. No fabricated claims, no new warranty/license/insurance language, no invented numbers. Two honest additions: the hero and the intro both state plainly that the client is served in Spanish, and the form intro says the form can be written in Spanish or English.
- Form wired to the shared Formspree handler with `data-lead-form="contacto-page"` and `data-page="contact-es"` so Vic can filter Spanish contact-page leads in Formspree without a JS change. Input `name=` attributes left as `name`, `email`, `phone`, `city`, `service`, `project-size`, `message` so field keys stay consistent with every other form on the site. Service `<option>` labels are translated, which means Spanish submissions will arrive with values like "Tinción de concreto" rather than "Concrete Staining". Same behavior already shipped on `es.html` and `servicios.html`, so this is consistent, not new, but flagging it because it does mean the `service` field is not a clean single-vocabulary column across all forms. If Vic wants one vocabulary, the fix is `value="Concrete Staining"` on each translated option, a small edit to three Spanish pages.
- `id=` attributes on form controls prefixed `contacto-` so they never collide with the English page or the shared estimate modal.
- Added a closing "Seguir Explorando" section linking to `es.html`, `servicios.html`, `gallery.html`, `case-studies.html`, `faq.html`, and all five city pages. Same rationale as the FAQ and services pages: a second discovery path for the orphaned pages without touching nav or `site.js`.
- Added `/contacto` to `sitemap.xml`. Sitemap is now 20 entries for 20 pages, enforced automatically by `test_sitemap_matches_html_pages_exactly`.
- Verified: `python3 -m unittest tests.test_site`, 22/22 passed (up from 19 on the last run: Vic added em-dash, Service/FAQ pairing, and sitemap-completeness tests in commit e017f46). Plus the manual checks in the QA summary below.
- **NOW RESOLVED, closing a flag carried since 2026-08-18:** the live em-dashes in `index.html`, `services.html`, `gallery.html`, and `assets/js/site.js` are FIXED. Vic shipped them in commits c1f6209, 9b05211, f60f0d1, and c18e42e, and codified the rule as a regression test in e017f46 so it cannot silently regress again. The only remaining em-dashes in the repo are inside two stale `.claude/worktrees/` copies, which are not shipped and are not covered by the test. Recommend deleting those worktrees so a future grep sweep does not keep re-flagging them.
- **STILL OPEN, carried forward unchanged from 2026-08-18 and 2026-08-27:** the shared header nav, footer, sticky CTA, and estimate modal are all rendered from hardcoded English strings in `assets/js/site.js` with no locale branching, so all three Spanish pages render Spanish body copy inside English chrome. This is now the single biggest quality gap in the Spanish track and it is no longer blocked by anything: the Spanish page set is complete, so the i18n pass would land once and cover all three at final scope instead of being redone. The change is a small locale dictionary plus a `document.documentElement.lang` lookup inside `renderSiteHeader`, `renderSiteFooter`, `renderStickyBar`, and `renderEstimateModal`. Blast radius is all 20 pages at once, which is why an unattended run has never made it. Recommending it explicitly as the next non-backlog task.
- **Also still open, unchanged:** the five city pages, `faq.html`, and now all three Spanish pages are reachable only from the sitemap and from cross-link sections at the bottom of newer pages, not from primary nav or the footer. One shared "Service Areas" plus "Español" footer block in `site.js` would wire all of them at once, and it is the same file the i18n pass touches, so both edits should be done in one sitting.
- **New, minor, not fixed:** `assets/img/site/contact/rgv-service-area-map.svg` has English text baked into the artwork ("Rio Grande Valley Service Radius", "Local decorative concrete scheduling across the main Valley cities.", "Others cities upon request & project approval."), so the coverage map renders in English on the Spanish page. Surrounding copy, alt text, and caption are all Spanish, so the meaning still lands. Separately, that third line has a grammar error in the English original: "Others cities" should be "Other cities". It is baked into the SVG and shows on the live English contact page today. Not touched in this run because editing a shared production asset is outside a single new page's scope, but it is a one-word fix worth doing.
- NOT touched: git, nav in `assets/js/site.js`, the coverage-map SVG, and the open items above.

## 2026-09-02: two footer fixes applied, shared-chrome i18n and nav wiring shipped, full multi-agent SEO audit, DRAFT PENDING VIC REVIEW

- Orchestrated run from `SEO-ORCHESTRATION-MASTER-PROMPT.md`: two pre-diagnosed footer fixes plus a five-agent SEO scan. Vic expanded scope twice mid-run, so this entry covers more than the prompt specified. Full report in `SEO-AUDIT-2026-09-02.md`, client-facing summaries in `CLIENT-CHANGE-LIST-2026-09-02.md` and `CLIENT-SEO-ROADMAP-2026-09-02.md`.
- **Both Part 1 fixes APPLIED.** Fix 1: removed `.toLowerCase()` at `assets/js/site.js:103` so footer service names keep their capitalization. Fix 2: added `footer-link--estimate` to the "Schedule a call" anchor at line 140 so it picks up the orange accent. Both went through the full apply, test, revert, verify cycle first (file confirmed byte-identical to its pre-run md5 `0826afa49186299a6289d4c43381270d` after revert), then were reapplied after Vic's conditional pre-approval. Re-verified the CSS specificity claim independently: `.footer-link--estimate` at styles.css:1606 sets color and weight, the second block at :1631 sets only `min-width`, no conflict.
- **Hard rule 4 was lifted by Vic mid-run**, so the standing nav and i18n flag carried on 2026-08-18, 2026-08-27, and 2026-09-01 is now CLOSED rather than deferred a fourth time. `assets/js/site.js` grew from 607 to 794 lines. Added a `siteCopy` dictionary with full `en` and `es` string sets, locale detection off `document.documentElement.lang` (anything starting with "es" is Spanish, everything else falls back to English so an unexpected value degrades safely), a `pagesEs` counterpart map, and Spanish `labelEs` values on all five services. `renderSiteHeader`, `renderSiteFooter`, `renderStickyBar`, `renderEstimateModal`, and the six lead-form status messages in `initForms` all read through the dictionary now. No inline ternaries scattered through the templates, one dictionary and one lookup.
- Footer "Service Area" section previously rendered all seven cities as plain `<li>` text. Now the five cities with pages (McAllen, Edinburg, Mission, Harlingen, Brownsville) render as `footer-link` anchors and Pharr and Weslaco stay plain text since they have no page. Added a FAQ link to the "Project Fit" section following the existing "View case studies" pattern. This wires six previously orphaned pages into every page on the site.
- Added an EN/ES toggle to the primary nav using an explicit counterpart map, not filename derivation. Verified it resolves correctly from every page type: `/services` to `/servicios`, `/contacto` to `/contact`, and pages with no counterpart (gallery, city pages) to the opposite homepage. Reuses the existing `site-nav__item` and `nav-link` classes, so **zero CSS was added** and the mobile nav behavior is unchanged.
- **Also fixed, outside the original scope, at Vic's direction:** homepage `h1` on `index.html` and `es.html` rewritten to carry service keywords (was "Built to Last. Designed to Impress.", no service noun on the highest-authority page on the site). The Spanish CTAs on `es.html:163` and `servicios.html:180` plus the cross-link at `servicios.html:587` were repointed from `contact.html` to `contacto.html`; `servicios.html` shipped before `contacto.html` existed and was never updated, so Spanish visitors were being handed an English form at the last step.
- Created `robots.txt` at the repo root with `User-agent: *`, `Allow: /`, and the sitemap directive. It did not exist; `https://www.rgvconcretestain.com/robots.txt` returns 404 live today.
- Verified: `python3 -m unittest tests.test_site` 22/22 after every step. `node --check assets/js/site.js` parses. Repo-wide em-dash and en-dash sweep across all 20 pages plus `site.js`, `styles.css`, `robots.txt`, and `sitemap.xml`: zero hits. Rendered both locales in a stubbed DOM across seven page-and-locale combinations and confirmed zero `undefined` and zero `[object Object]`, which was the main risk in a dictionary-driven chrome rewrite touching 20 pages at once. Estimate modal city `<select>` option values diffed before and after: unchanged, all seven.
- **Flagged, not fixed:** the estimate modal now sends English `service` values to Formspree in both languages (visible label translated, `value=` attribute not). The three Spanish page forms still send Spanish values per the 2026-09-01 convention. The modal is now the cleaner of the two but the `service` field is still not one vocabulary across all forms.
- **Biggest finding of the run, from the client's own GBP data:** of 460 measured searches Apr to Sep 2026, five epoxy-explicit terms account for 388 (84.3%) and "concrete stain" for 72 (15.7%). Polishing and decorative coatings: zero. Garage intent alone is 150 (32.6%) and is phrased "epoxy garage floor", not "garage floor coatings". The site's architecture was ordered close to the reverse of that. Homepage h1 is fixed; the `siteConfig.services` reorder is left for Vic since reordering the nav away from the brand's namesake service is a positioning call, not a technical one.
- **Most urgent finding:** at least 20 legacy pre-rebuild URLs are still indexed, still returned by search with their old titles, and every one returns HTTP 404. Two are currently the top result for commercial-intent queries while none of the five city pages appeared in any of ten test searches. Fix is a 301 map in `vercel.json`, roughly one hour, after pulling the authoritative 404 list from Search Console. Also confirmed `https://www.rgvconcretestain.com/contacto` returns 404 live: `contacto.html` shipped locally on 2026-09-01 and was never deployed.
- Two findings escalated to the client rather than resolved: the site publishes zero warranty, license, or insurance claims while the client's Instagram bio says "insured and licensed" and a public GBP review reply claims a warranty and "biggest installer in south texas". Nothing was added to the site; a written question set with documentation requirements is in the audit and the roadmap. Related, that same review reply is argumentative and is a live reputation liability worth editing.
- Run deviations, all disclosed in the audit: the Implementation Agent was terminated mid-task by a usage limit before writing anything (repo verified untouched, `site.js` byte-identical, no partial writes) and the orchestrator completed the work directly; the Review Agent was never spawned for the same reason and the review pass was done inline, which caught one incorrect "verified clean" call from Scan Agent 1 on `sameAs`; Fix Agents A and B ran as one serialized chain rather than two agents; the master prompt's page count of 19 is stale, there are 20.
- NOT touched: git. Every file is left uncommitted on disk for Vic to review. The working tree was already dirty before this run started (`.gitignore`, `WORKLOG.md`, `contact.html`, `sitemap.xml` modified, plus untracked files), so the master prompt's expected `git status` in Part 4 could not match as written.
- **Red team addendum, same day.** Three adversarial agents were run against this run's own work and against the audit. They found more than the inline review did, and the audit now carries a "Revision 2: red team findings" section. Headlines: (1) all nav is injected via `innerHTML` with no static fallback, which Googlebot handles but **GPTBot, ClaudeBot and PerplexityBot do not, since they do not render JavaScript**, so today's "orphan pages fixed" claim holds for Google and fails for AI crawlers; (2) **only `/` and `/contact` are currently indexed**, so much of the schema and meta work in this audit optimizes pages Google has not indexed; (3) the **deployed `site.js` is 22,582 bytes against the repo's 30,498**, so roughly 12 audit statements describe undeployed code; (4) the performance section was about 2x too high (real transfer 202 KiB, Lighthouse 87 to 90) and named the wrong bottleneck, which is 843 ms of render-blocking Google Fonts; (5) the client roadmap claimed the site has no analytics when **Vercel Analytics was installed and billed on 2026-06-25**, corrected; (6) the **84.3% epoxy statistic was arithmetically wrong** because GBP suppresses terms under 15 impressions, so the six visible terms are not the denominator, and the "0%" for polishing and decorative coatings was a suppression artifact rather than a measurement, retracted and rewritten as a range; (7) the F-05 causation hedge on the GBP decline is not defensible (May was the peak, August is within 5% of April, and there is no mechanism from a dead website URL to a Maps-surface metric); (8) the redirect map routes city equity into generic pages and would produce soft 404s.
- Errors in today's own shipped code, found by red team and **fixed**: the new Spanish h1 was grammatically incoherent and pushed the primary CTA 49px below the fold at 1366x657; the language toggle promised "this page in Spanish" on 14 of 20 pages and delivered the homepage; the toggle had no `lang` attribute (WCAG 3.1.2); `aria-current` never fired on any Spanish page; seven terminology mismatches against already-shipped Spanish plus register problems. All corrected, `node --check` passes, 22/22 passing, zero em or en dashes.
- **Open question for Vic, gates roughly 7 hours of work:** `es.html` uses "tinción" 14 times against "tinte" once, and "garaje" 15 times against "cochera" zero. If Valley Spanish favors "tinte"/"concreto teñido" and "cochera", the proposed Spanish service pages target phrases nobody types. Native-speaker call, 20 minutes.
- Also newly surfaced and not previously logged: static assets ship `cache-control: max-age=0, must-revalidate`; the live homepage LCP element is `home-hero-temp-ai-warehouse-800.webp`, an AI placeholder, with 14 placeholder image paths live in production; the site carries no license, insurance, team, or years-in-business content anywhere; `mcallen.html` and `edinburg.html` share 77% of their tokens, which is a cannibalization risk the audit never examined.
