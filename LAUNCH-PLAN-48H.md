# RGV Concrete Stain — 48-Hour Launch Plan

Status as verified on clone (tests run, JS read, assets inventoried):
- Stack: static HTML/CSS/vanilla JS. No build step. 11 pages. Test suite passes 11/11.
- Code/structure: DONE. This is not a coding project anymore.
- Real blockers are non-code (see below).

## The core insight
The bottleneck is the OWNER and DNS, not the code. Front-load anything with
external latency (asset requests, domain/DNS, email confirmation). Everything
in your direct control is small and fast.

## Launch blockers, ranked
A. Forms go nowhere — all lead forms only write to localStorage. Must wire to a
   real destination or the live site silently loses every lead. (CRITICAL)
B. No deployment configured at all. (HIGH — start DNS early)
C. ~25 image placeholders remain; AI images already self-rejected on resolution.
   Heaviest: gallery (9), concrete-staining (5). (MEDIUM-HIGH)
D. Contact truth unconfirmed: email, domain ownership, address/map. (MEDIUM)

## Six gating decisions (answer before hour 1)
1. Host? (Recommended: Netlify — solves deploy AND forms in one platform.)
2. Do you own rgvconcretestain.com with registrar/DNS access? (Y/N)
3. Where should leads go — exact inbox? Netlify Forms OK, or Formspree/CRM?
4. Real street address, or service-area-only (no street, keep cities)?
5. Is hello@rgvconcretestain.com real and monitored? (Y/N)
6. Is the owner reachable for photos in the next 24h? (Y/N)
   - If N: launch with honest placeholders + working forms + real phone,
     defer photography to a post-launch swap. Do NOT block launch on photos.

## Hour-by-hour (48 wall-clock hours, ~24-28 productive)

### Hour 0-1 — Fire the slow stuff (parallel)
- Send the client asset+decision request NOW. Reuse the message already in
  CLIENT-ASSET-REQUESTS.md (the "Stronger Client Message" block). Ask for:
  hero photo, 2-4 staining photos, 2 before/after pairs, 2 team photos.
- Confirm the six gating decisions above.
- Pick the host. Begin domain/DNS setup immediately (propagation latency).

### Hour 1-3 — De-risk deploy + forms (fully in your control)
- Deploy current state (with placeholders) to host as a preview. Prove pipeline.
- Wire forms to a real destination:
  - Netlify path: add name + netlify attributes to each <form>, add a honeypot,
    and stop site.js from preventDefault-ing the real submit (keep client-side
    validation, let it POST natively). Netlify detects the static form HTML.
  - Formspree path: point form action at the Formspree endpoint; remove the
    localStorage interception for live submit.
- Start DNS pointing to host.

### Hour 3-8 — Content truth pass
- Replace confirmed contact details (email, map/address).
- Integrate real assets as they arrive from the owner.
- Staining page is the credibility priority — real photo or honest framing.

### Hour 8-16 — Imagery integration + honest-placeholder strategy
- Fill the ~25 placeholders with real assets where available.
- Where none: honest placeholder per existing red-team rule, or temporary AI
  ONLY with eyes open about the quality hit. Consider restructuring layouts so
  weak-asset pages don't demand a hero-grade image.

### Hour 16-24 — QA pass
- Mobile + desktop, every page.
- END-TO-END form test: submit a real test lead, confirm it lands in the inbox.
  (Do not assume — verify receipt.)
- Every link, tel:, mailto:. Fix EXIF-rotated phone photos (flagged in audit).
- Check video weight/perf if any video is used. Console clean. Lighthouse pass.

### Hour 24-40 — Buffer + second asset wave
- Owner assets usually arrive late; this absorbs it.
- Replace remaining weak placeholders.

### Hour 40-48 — Final deploy + verification + handoff
- Flip DNS to production if not already; confirm HTTPS.
- Final end-to-end form test ON the production domain.
- Titles/OG images sane (no AI-reject images as share images). Submit sitemap.

## Definition of done (launch checklist)
[ ] Live on the intended domain over HTTPS
[ ] A test lead submitted on production reaches the real inbox
[ ] Real phone number works (tel: dials correctly)
[ ] No placeholder/REPLACE imagery visible above the fold on key pages
[ ] Staining page does not over-claim beyond available proof
[ ] All internal links + nav resolve; no 404s
[ ] Mobile layout verified on a real phone
[ ] No console errors; sitemap reachable
[ ] OG/share image is not a rejected AI asset

## Hard truth
If the owner goes dark on photos, that is NOT a launch blocker. Working forms +
real phone + honest placeholders is a shippable, credible site. A pretty site
that loses every lead is not. Fix the forms first.

---

## ROUND 2 — Verified business data + locked decisions

### CRITICAL: phone number must be re-verified
- Site uses: (956) 502-9635  (tel:+19565029635)
- Public business listing shows: 956-502-9365  (last 4 digits transposed)
- These conflict. Confirm the REAL number with the owner before launch.
  A wrong tel: link sends every call to a stranger.

### Confirmed facts (use these exact values)
- Business: RGV Concrete Stain
- Address: 810 W Dipper Ave, Pharr, TX 78577  (add streetAddress + postalCode 78577 to all JSON-LD)
- Domain: rgvconcretestain.com  -> there is likely an EXISTING live site here.
  This is a DNS CUTOVER. Keep old site live until Vercel build is verified, then flip.
- Hours: Mon-Fri 7:00 AM - 5:00 PM, Sat/Sun closed. Make footer match.

### Host = Vercel (consequences)
- No native form capture. Deploy and forms are SEPARATE problems.
- Static deploy on Vercel is trivial (connect repo or vercel CLI).

### Email = the fake address must die (15 locations)
- hello@rgvconcretestain.com does NOT exist. Appears in:
  - site.js line 4 (siteConfig.email -> renders footer mailto on all 11 pages)
  - 11 per-page JSON-LD blocks
  - contact.html headline + footer mailto
  - index.html trust block
- Decision: either drop public email entirely (phone + form only) OR set up one
  real inbox. Do NOT ship a mailto to a bouncing address.

### Forms (Vercel-compatible) = Web3Forms or Formspree
- Destination: owner personal email or a new dedicated inbox (recommended).
- Implementation: replace the localStorage write in site.js submit handler with a
  fetch POST to the form service. Destination email stays hidden from public HTML.
- ~1 hour. Verify end-to-end with a real test submission to the real inbox.

### Photos = NO AI needed
- Triage (which photo, what's in it): human eyeball. ~10 min. Zero cost.
- Processing (EXIF auto-rotate, resize to target widths, optimize, rename into
  assets/img/site/ paths): deterministic script (Pillow/ImageMagick). Zero AI tokens.
- Workflow: download Drive folder -> run script -> web-ready files land in named paths.

### Updated gating answers
1. Host: Vercel (locked)
2. Domain/DNS: client owns, access confirmed -> treat as cutover
3. Lead destination: personal email or new inbox via Web3Forms/Formspree
4. Address: 810 W Dipper Ave, Pharr, TX 78577 (locked)
5. Email hello@...: does NOT exist -> remove or replace
6. Owner photos: already collected in a Drive folder -> human triage + script

### Remaining unknowns to confirm
- [ ] CORRECT phone number (9635 vs 9365)
- [ ] Public email: drop entirely, or which real address
- [ ] Is rgvconcretestain.com currently serving an old live site? (cutover planning)
