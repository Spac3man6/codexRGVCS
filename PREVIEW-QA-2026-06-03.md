# Preview QA - 2026-06-03

> Historical QA snapshot: findings reflect the preview state on 2026-06-03 and follow-up checks on 2026-06-04. Current code has Formspree wiring and contact-detail updates that may resolve some findings. Re-test before treating any finding here as still open.

Preview URL under review: `https://rgvcs.vercel.app`

Note: The user provided `rgvcs.vercel.ap`; this pass assumes the intended Vercel preview is `rgvcs.vercel.app` and includes a check for the `.ap` variant.

Active GitHub deployment URLs discovered on resume:

- Preview: `https://rgvcs-62txv0hul-raptordigital.vercel.app`
- Production: `https://rgvcs-m939u9b6h-raptordigital.vercel.app`

## Coordination

| Owner | Scope | Status |
| --- | --- | --- |
| Main agent | Documentation, final consolidation, local validation | Completed first pass |
| Aquinas | Links and navigation only | Blocked by site/network access in sub-agent session; no verified defects returned |
| Hypatia | Images and visual asset trust only | Blocked by site/browser access in sub-agent session; no verified defects returned |
| Noether | Copy/content oddities only | Blocked by site/network access in sub-agent session; no verified defects returned |

## QA Checklist

- [x] Confirm preview URL and `.ap` typo behavior.
- [x] Crawl internal pages for broken links and unexpected destinations.
- [x] Review deployed images for broken, distorted, placeholder, or low-trust assets.
- [x] Review copy for typos, awkward wording, inconsistent claims, and placeholder tone.
- [x] Run the local automated validation suite.
- [x] Reconcile agent findings so each issue has one owner and no duplicated work.
- [x] Re-check this document for gaps before final handoff.

## Verification Performed

- Resume check on 2026-06-04: `https://rgvcs.vercel.app/` and `https://rgvcs.vercel.app/index.html` now return Vercel `404: NOT_FOUND` / `DEPLOYMENT_NOT_FOUND`, so live preview verification is blocked until the current preview URL or alias is confirmed.
- Resume check on 2026-06-04: an approved normal-network `curl -I https://rgvcs.vercel.app/` also returned `HTTP/2 404` with header `x-vercel-error: DEPLOYMENT_NOT_FOUND`. The user confirmed they did not intentionally remove the deployment, so treat this as a hostname/alias/current-preview lookup issue rather than an assumed deletion.
- Resume check on 2026-06-04: GitHub deployments exist for this repo. Deployment `4926340236` is a successful Preview deployment for SHA `3b774689193663ca77d6457dc4572db4b0cb4ebc`; deployment `4925610310` is a successful Production deployment for SHA `a832c4342f08c7a83e3a916fae81cd1a45d16816`.
- Resume check on 2026-06-04: both discovered Vercel deployment URLs return `HTTP/2 401` with a Vercel SSO nonce, so the deployment appears to exist but is protected from unauthenticated QA access.
- Resume check on 2026-06-04: `https://rgvcs.vercel.ap/` fails DNS resolution and appears to be a typo/nonexistent domain.
- Resume check on 2026-06-04: local automated suite still passes 11/11 tests.
- Loaded `https://rgvcs.vercel.app/` in the in-app browser.
- Loaded all 11 expected pages from the deployed preview:
  - `/`
  - `/services.html`
  - `/concrete-staining.html`
  - `/concrete-polishing.html`
  - `/epoxy-flooring.html`
  - `/decorative-coatings.html`
  - `/garage-floor-coatings.html`
  - `/gallery.html`
  - `/about.html`
  - `/contact.html`
  - `/case-studies.html`
- Browser console check after gallery interaction: no warnings or errors captured.
- Gallery modal check: representative image opened in the modal, retained the expected image URL, and reported natural size `4000x3000`.
- Local automated suite: `python3 -m unittest -v tests.test_site` passed 11/11 tests.
- Local hash-anchor check: all local `#fragment` link targets resolve.
- Git status before this document was added was clean; this QA document is the only local change from this pass.
- Sub-agent results were reviewed. All three sub-agents reported access failures and did not provide verified site-specific findings, so their outputs were not merged as defects.

## Findings

| ID | Severity | Area | Finding | Evidence | Recommended Follow-Up |
| --- | --- | --- | --- | --- | --- |
| QA-001 | P1 for launch, P2 for preview | Content/assets | Placeholder language is visible to users in multiple public pages. This is useful internally, but reads unfinished if the preview is shared as client-ready. | `gallery.html` meta description says "placeholders"; gallery sections say "should eventually" and "should be replaced"; `case-studies.html` says cards are templates and facts are placeholders; `about.html` says to replace placeholder imagery/contact details; `contact.html` includes launch/demo notes. | Move internal launch notes into docs or comments, and replace public-facing copy with client-safe wording before sharing as launch-ready. |
| QA-002 | P1 for launch | Assets | Placeholder SVGs remain in trust-critical visual slots. They render successfully, but they are not credible proof assets. | Live deployed crawl found visible SVGs on Home, Services, Concrete Staining, Concrete Polishing, Decorative Coatings, Gallery, About, Contact, and Case Studies. Local file check confirms these are SVG placeholders in `assets/img/`. | Keep as honest placeholders for internal review, but require real client-approved images before public launch. Prioritize staining, about/team, contact, and case-study proof slots. |
| QA-003 | P1 for launch | Lead flow | Forms still run in demo/local-storage mode and tell users the submission is not connected. This is correct for a preview, but would lose real leads at launch. | `assets/js/site.js` stores submissions locally and returns "Request captured in demo mode..."; Contact FAQ says the form is not live; several proposal notes mention demo/local launch endpoint status. | Connect form submissions to the final inbox/CRM/automation before launch and remove user-facing demo mode copy. |
| QA-004 | P2 | Deployment/content sync | Contact details need one final deployed-preview verification after the recent fix. User confirmed the details changed/fixed during this QA pass, so this is not treated as an open content decision. | At the time of browser verification, the deployed preview still rendered `(956) 502-9365` and `rgvconcretestain@gmail.com`, while the local worktree contains `(956) 502-9635` and `hello@rgvconcretestain.com`. | After the next Vercel build, confirm the deployed header, footer, contact cards, sticky CTA, JSON-LD, and mail/tel links all show the intended final details. |
| QA-005 | P2 | Assets/copy | Several images are technically valid but service-context mismatched or generic for proof. | Home hero and several page heroes use polished/garage/decorative images as broad proof; Concrete Staining, About, Contact, and some case-study slots rely on SVG placeholders. | Treat as a trust/readiness issue rather than a broken image issue. Keep only where the page copy honestly frames the image as representative, or replace with service-specific client photos. |
| QA-006 | P3 | SEO/social metadata | Some metadata still exposes placeholder language, which can show in search/social previews even when not visible on page. | `gallery.html` description uses "placeholders"; `concrete-staining.html`, `contact.html`, and `about.html` OG image alt fields include "placeholder". | Update metadata to public-safe wording before launch, even if the body copy remains preview-oriented. |
| QA-007 | P3 | Preview URL | The user-provided `rgvcs.vercel.ap` did not load in the browser check. The assumed intended URL, `https://rgvcs.vercel.app`, loaded. | Browser reported a load failure for `https://rgvcs.vercel.ap`; `.app` loaded all expected pages. | Use `https://rgvcs.vercel.app` for QA links unless a different preview alias is created. |
| QA-008 | P0 for further live QA | Deployment access | The short `.app` hostname returns Vercel deployment-not-found errors, but GitHub has successful Vercel deployments for this repo. The discovered deployment URLs are protected by Vercel auth, so current live QA cannot continue without access. | Resume check on 2026-06-04: `/` and `/index.html` at `https://rgvcs.vercel.app` returned `404: NOT_FOUND` with `DEPLOYMENT_NOT_FOUND`; GitHub deployments list successful Preview and Production deployments; both discovered Vercel URLs return `HTTP/2 401` with Vercel SSO nonce. | Use an authenticated browser session, temporarily disable Vercel Deployment Protection, provide a public bypass/protection token if available, or assign a public alias. Then re-run live checks for contact details, links, forms, and image rendering. |

## Non-Issues / Confirmed Behavior

- No visible broken images were found in the rendered deployed pages.
- One empty image exists in the hidden gallery modal before an item is opened; it is not visible and receives a valid `src` when a gallery item is clicked.
- Gallery item anchors point directly to image files, but the shared JavaScript opens them in the modal. The modal interaction worked for a representative image.
- Direct browser automation attempts to open standalone image files reported `net::ERR_BLOCKED_BY_CLIENT`; because the same images render in-page and open through the modal, this was not logged as a broken asset.
- All expected local HTML pages and required docs are present according to the automated test suite.

## Next QA Owner Notes

- Do not duplicate a broad placeholder audit unless new assets have been added. Use QA-001, QA-002, QA-005, and the existing `CONTENT-GUIDE.md` / `ASSET-AUDIT.md` as the starting point.
- If a new deployment is pushed, first re-check QA-004 so the contact-detail fix is verified on the public preview.
- If the preview URL changes or Vercel has a branch-specific deployment URL, update the URL at the top of this document and resolve QA-008 before assigning more live browser QA.
- If forms are connected, re-run the lead-flow test and update QA-003.
- If real images are swapped in, re-run the visual trust pass page by page and update QA-002 / QA-005.
