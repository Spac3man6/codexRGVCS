# RGV Concrete Stain Static Rebuild

Static multi-page rebuild for RGV Concrete Stain, continuing from the existing scaffold and reference analysis already in this workspace.

## What Is Included

- Shared site shell and interactions from [`assets/js/site.js`](./assets/js/site.js)
- Shared visual system and layout primitives in [`assets/css/styles.css`](./assets/css/styles.css)
- Eleven static HTML pages:
  - `index.html`
  - `services.html`
  - `concrete-staining.html`
  - `concrete-polishing.html`
  - `epoxy-flooring.html`
  - `decorative-coatings.html`
  - `garage-floor-coatings.html`
  - `gallery.html`
  - `about.html`
  - `contact.html`
  - `case-studies.html`
- Placeholder SVG artwork in `assets/img/`
- Supporting documentation in `REFERENCE-ANALYSIS.md`, `BRANDING.md`, and `CONTENT-GUIDE.md`
- Canonical project handoff and continuity notes in `PROJECT-CONTEXT.md`
- External AI-imagery handoff prompt in `ANTIGRAVITY-MASTER-PROMPT.md`
- Asset triage notes in `ASSET-AUDIT.md`
- Client-facing asset request list in `CLIENT-ASSET-REQUESTS.md`
- Running implementation history in `WORKLOG.md`
- First visual review milestone in `REVIEW-CHECKPOINT-01.md`
- `sitemap.xml` for the static page set
- Automated validation tests in `tests/test_site.py`

## Build Direction

- Static HTML, CSS, and JS only
- Shared header, footer, mobile drawer, sticky CTA, estimate modal, accordion, gallery modal, and demo form handling are all reused from the existing scaffold
- Copy and service framing are tailored to the Rio Grande Valley instead of the original reference site's broader national positioning
- All image placeholders are explicitly marked in the HTML with `<!-- REPLACE: ... -->` comments

## Local Preview

From this directory:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/`

## Tests

Run the static-site validation suite from this directory:

```bash
python3 -m unittest -v tests.test_site
```

The suite checks:

- required page and documentation files
- required shared mounts and SEO shell
- valid LocalBusiness JSON-LD
- local asset and internal file references
- placeholder image replacement comments
- shared JS syntax
- sitemap XML validity
- presence of the client asset drop

## Form Behavior

- All forms currently run in demo mode
- Submissions are stored in `localStorage` under `rgvConcreteLeadForms`
- Before launch, connect the forms in [`assets/js/site.js`](./assets/js/site.js) to the final inbox, CRM, or automation target

## Content Notes

- Phone number has been updated; email, map preference, and form destination still need final launch confirmation
- Gallery and case study imagery are still placeholder SVGs
- The contact page map is a broad regional embed and should be replaced with the final business-preferred map presentation if needed
- If generated imagery is needed to close the remaining gaps, use `ANTIGRAVITY-MASTER-PROMPT.md` and require the documented handoff bundle before Codex resumes integration
- See [`CONTENT-GUIDE.md`](./CONTENT-GUIDE.md) for the full replacement list
- See [`ASSET-AUDIT.md`](./ASSET-AUDIT.md) for current client asset quality, fit, and remaining gaps

## Validation Performed

- HTML files created for the full requested page set
- Shared CSS extended rather than replaced
- Shared JS scaffold preserved
- Automated regression checks added in `tests/test_site.py`
