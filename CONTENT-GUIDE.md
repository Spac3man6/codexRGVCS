# Content Replacement Guide

This guide lists the remaining placeholder or provisional content in the rebuild and what should replace it before launch.

## Site-Wide Placeholder Copy

- Phone number: `(956) 502-9365`
  - Current launch value; re-confirm only if the owner reports a change.
- Phone href: `+19565029365`
  - Current launch value; keep it aligned with the visible phone number.
- Email: `rgvconcretestain@gmail.com`
  - Current launch value; replace only if a monitored branded inbox is created.
- Form behavior
  - Lead forms submit through the Formspree endpoint configured in `assets/js/site.js`.
  - Run a real end-to-end submission on the deployed site after every form endpoint or hosting change.

## Site-Wide Placeholder Images

- `assets/img/hero-rgv.svg`
  - Replace with a real high-quality hero image showing a finished Rio Grande Valley decorative concrete project
- `assets/img/commercial-floor.svg`
  - Replace with a real commercial floor photo such as a showroom, office, retail, or hospitality install
- `assets/img/residential-floor.svg`
  - Replace with a real residential interior, patio, or home concrete finish photo
- `assets/img/stain-finish.svg`
  - Replace with real stained concrete imagery showing color variation and final sealer appearance
- `assets/img/polished-finish.svg`
  - Replace with real polished concrete imagery showing reflection, aggregate, and full-space context
- `assets/img/epoxy-finish.svg`
  - Replace with real epoxy flooring imagery for service, utility, or commercial applications
- `assets/img/coating-finish.svg`
  - Replace with real overlay or decorative coating imagery showing texture and surface reset
- `assets/img/garage-floor.svg`
  - Replace with real garage floor coating photography including flake detail and finished garage context
- `assets/img/team-rgv.svg`
  - Replace with owner-approved team, owner portrait, shop, or jobsite photography

## Page-Specific Placeholder Copy

- `index.html`
  - Case study cards are structural examples and should be replaced with real client-approved project stories and facts
- `services.html`
  - General process and service framing can remain, but should eventually include any real differentiators, warranties, or scheduling policies the business wants to claim publicly
- `concrete-staining.html`
  - Gallery examples should be replaced with actual stain installs and real finish descriptions
- `concrete-polishing.html`
  - Gallery examples should be replaced with actual polished projects and real sheen / aggregate outcomes
- `epoxy-flooring.html`
  - Gallery examples should be replaced with actual epoxy system installs and accurate use-case specifics
- `decorative-coatings.html`
  - Gallery examples should be replaced with actual overlay or decorative resurfacing projects
- `garage-floor-coatings.html`
  - Garage examples should be replaced with actual finished garage floors and true turnaround expectations
- `gallery.html`
  - All gallery groups are placeholder-only and need real project photography
- `about.html`
  - Team/process story is generic and should be updated with real company history, owner viewpoint, crew info, or differentiators
- `contact.html`
  - The embedded map points to the Pharr address; replace only if the business prefers a broader service-area map or a different public map presentation
- `case-studies.html`
  - Every case study card is currently a template and must be replaced with actual project names, cities, finish systems, before/after facts, and approved photography

## Image Placeholder Markup

- Every placeholder image currently used in HTML has an adjacent `<!-- REPLACE: ... -->` comment
- Keep those comments until the real photography is swapped in, then remove them or archive them in documentation

## Recommended Launch Replacements

1. Verify live Formspree delivery on the deployed domain so lead flow is proven.
2. Replace hero and gallery imagery next because the site is intentionally gallery-first.
3. Replace case study template content with actual approved project stories.
4. Revisit service pages to add any real warranty, crew, or schedule claims only after they are confirmed.
