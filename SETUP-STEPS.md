# RGV Concrete Stain — Setup Steps (the parts only you can do)

Apply the code fixes first, then do these in order. Items 1-3 are required
before launch. Item 4 is the cutover. Item 5 is photos (can trail launch).

## 0. Apply the patch
From the repo root on your machine:
    git apply rgvcs-fixes.patch
    python3 -m unittest tests.test_site     # should print OK (11 tests)

What the patch already fixed (verified):
- Phone corrected to (956) 502-9365 everywhere (site had the wrong/transposed number)
- Dead email hello@rgvconcretestain.com replaced with rgvconcretestain@gmail.com
- Street address + ZIP (810 W Dipper Ave, Pharr, TX 78577) added to all JSON-LD
- Footer hours corrected to Mon-Fri 7:00 AM - 5:00 PM  (CONFIRM with owner)
- Contact map embed repointed to the real address
- All lead forms rewired from localStorage demo mode to your Formspree endpoint (AJAX)

## 1. Activate the Formspree form (REQUIRED — leads won't arrive until you do)
- Endpoint is already wired in assets/js/site.js: https://formspree.io/f/xkoanrop
- Formspree HOLDS the first submission and emails you a confirmation link.
  Submit one test lead, then click that link in the inbox tied to the form,
  or nothing will flow. This is the most common "my form is broken" cause.
- All 12 forms (11 pages + estimate modal) POST to this one endpoint. Each
  submission carries a "form" field + subject line so you can tell which
  page/modal it came from.
- Free tier = 50 submissions/month. Upgrade if volume exceeds that.

## 2. Deploy to Vercel (preview first, NOT the live domain yet)
- Push the repo to GitHub (already done) and import it in Vercel as a static project.
  No build command, no framework preset — it's plain HTML. Output dir = repo root.
- Vercel gives you a *.vercel.app preview URL. Use that for all testing below.

## 3. End-to-end verification on the preview URL (do NOT skip)
- Submit a real test lead from a page form AND from the estimate modal.
- Confirm BOTH arrive in rgvconcretestain@gmail.com. If not, fix before going further.
- Tap the phone number on a real phone — confirm it dials (956) 502-9365.
- Click every nav link; confirm no 404s. Open on a real phone for layout.
- Confirm no placeholder/REPLACE imagery is visible above the fold on key pages.

## 4. DNS cutover (LAST — the old site is still live, keep it that way until ready)
- Only after item 3 passes: in your DNS panel, point rgvconcretestain.com
  (and www) at Vercel per Vercel's "Add Domain" instructions.
- Keep the old host live until DNS has propagated and the Vercel site serves
  the domain correctly over HTTPS. Then retire the old site.
- Re-run the item 3 form test ON the production domain after cutover.

## 5. Photos (can trail launch — honest placeholders are fine to launch on)
- Triage by eye into category folders (see tools/process_photos.py header).
- Run:  pip install Pillow  &&  python3 tools/process_photos.py <raw-folder>
- Swap the <!-- REPLACE: ... --> placeholders for the generated paths.
- Priority order: homepage hero, then concrete-staining (weakest + it's the
  namesake service), then gallery, then before/after, then team.

## Still to confirm with the owner
- [ ] Phone (956) 502-9365 is final (patch assumes the public-listing number is correct)
- [ ] Hours Mon-Fri 7-5 are correct
- [ ] rgvconcretestain@gmail.com is the right destination for leads for now
