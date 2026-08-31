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
