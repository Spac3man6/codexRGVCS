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