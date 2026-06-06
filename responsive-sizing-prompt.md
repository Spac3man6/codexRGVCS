# Responsive image sizing — RGV Concrete Stain

**Context:** A prior session already did the format/delivery pass — every on-page image now
serves WebP via `<picture>` with a JPG fallback, and the hero PNG was converted. That work is
committed. What's still missing is **responsive resolution**: several images are served at full
native resolution into small display slots. A phone showing a gallery thumbnail in a ~400px-wide
slot still downloads the full 2000×1500 WebP. This task generates smaller derivatives and wires
`srcset`/`sizes` so devices fetch an appropriately-sized image.

Static HTML/CSS/JS, no build step. Absolute `/assets/` paths, served from root. There are
**11 HTML pages** (not 10): about, case-studies, concrete-polishing, concrete-staining, contact,
decorative-coatings, epoxy-flooring, gallery, garage-floor-coatings, index, services.

## Hard constraints (do not violate)
- **No build step / bundler.** Keep it static.
- Absolute `/assets/` paths stay; served from root.
- **Do NOT alter alt text, image choices, positions, or `loading="lazy"`/`decoding="async"`** on
  any image. You may change/keep `width`/`height` (they should stay matching the largest source
  to preserve aspect ratio and avoid layout shift) and add `srcset`/`sizes`.
- **Do NOT touch** `assets/js/site.js`, Formspree wiring, `sitemap.xml`, or `assets/client-assets/`
  (263MB of raw source photos — unreferenced by the site, leave them entirely alone).
- **Do NOT re-wrap or unwrap the existing `<picture>` elements** — they're correct. You're adding
  `srcset`/`sizes` *inside* them (on the `<source>` and/or the `<img>`), not restructuring.
- The gallery lightbox uses `<a href="/assets/img/.../NAME.jpg">` wrapping each `<img>`. The `href`
  should keep pointing at the full-resolution JPG (the lightbox shows the big version). Only the
  thumbnail `<img>`/`<source>` inside gets `srcset`.

## Source images and their real display slots
All live images live under `assets/img/site/*` and `assets/img/city-placeholders/*`. Native
dimensions and where they're shown:

| Image (basename) | Native px | Shown as | Notes |
|---|---|---|---|
| `polished/polished-commercial-wide` | 2000×1500 | hero (full-width) AND gallery/card thumbs | biggest offender |
| `polished/polished-aggregate-detail` | 1200×1600 | gallery/card thumbs (~400px) | portrait |
| `garage/garage-flake-closeup` | 1600×1200 | gallery/card thumbs | |
| `garage/garage-flake-exterior` | 1600×1200 | gallery/card thumbs | |
| `garage/garage-flake-interior` | 1200×1600 | hero (some pages) + thumbs | portrait |
| `staining/stained-patio-wide` | 1800×1004 | hero + gallery/card thumbs | |
| `decorative/metallic-wide` | 1600×1200 | hero + thumbs | |
| `decorative/metallic-detail` | 1200×1600 | gallery/card thumbs | portrait |
| `decorative/metallic-residential` | 1080×810 | small card/thumb | already smallish |
| `city-placeholders/*` (7 files) | 1000×562 | city cards (~333–500px) | already modest |

Each of the above has a `.jpg` and a `.webp` already on disk. The city placeholders are 1000×562
and only modestly oversized — lowest priority; consider skipping unless cheap.

## What to do

1. **Generate derivatives.** For each non-city source image, produce smaller WebP **and** JPG
   variants at widths that match real usage. Suggested width ladder (clamp to never upscale past
   native): **480, 800, 1200, 1600** for landscape; for portrait images scale by the long edge or
   use **480, 800, 1200**. Heroes that genuinely render full-bleed need a large variant
   (1600–2000); thumbnails do not. Name derivatives predictably, e.g.
   `polished-commercial-wide-800.webp`, `polished-commercial-wide-800.jpg`, etc. Keep the existing
   full-size files as the top of the ladder (don't delete them — the lightbox `href` and the
   largest `srcset` entry use them).
   - Use Python + Pillow (already available; `from PIL import Image`, WebP supported). Quality
     ~80 for WebP, ~82 for JPG, `method=6` for WebP, progressive JPG. Verify each derivative is
     smaller than its parent and visually sane.

2. **Wire `srcset` + `sizes`.** Inside each existing `<picture>`:
   - On the WebP `<source>`: `srcset="...-480.webp 480w, ...-800.webp 800w, ...-1200.webp 1200w, .../NAME.webp 2000w"` (use the real native width as the last `w`).
   - Add a JPG `<source type="image/jpeg">` (or put `srcset` on the fallback `<img>`) with the
     matching JPG ladder so non-WebP browsers also get responsive sizing.
   - Add a `sizes` attribute reflecting the real slot. Inspect the CSS (`assets/css/styles.css`,
     ~34KB) for the gallery grid / card / hero widths and breakpoints. Typical values:
     - Full-bleed hero: `sizes="100vw"`.
     - Gallery masonry / 3-up card grid thumb: something like
       `sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 400px"` — but DERIVE the real
       numbers from the CSS, don't guess blindly.
   - Keep `width`/`height` on the `<img>` set to the **largest** source dimensions so the browser
     reserves correct aspect ratio (prevents CLS).

3. **Heroes:** the home hero `<img>` already has `fetchpriority="high"`; page-hero imgs got it too.
   Preserve that. Heroes still benefit from a `srcset`/`sizes` ladder (they're full-width).

## Deliverables
1. Derivative WebP + JPG files generated for each oversized source (skip city placeholders unless cheap).
2. `srcset` + `sizes` added inside every relevant `<picture>` across all 11 pages — gallery,
   service cards, project profiles, and heroes.
3. Existing full-res files retained as the top of each ladder; lightbox `href` untouched.
4. Verification: HTML still parses & `<picture>` nesting balanced; every `srcset` URL resolves to a
   real file on disk; no `alt`/`loading`/`decoding`/position changed; spot-check that `sizes`
   matches the CSS slot widths.
5. Before/after **mobile** transfer estimate for the gallery page and homepage: compute the bytes a
   ~400px-DPR-1 phone would now fetch (smallest matching `srcset` entry) vs. before (full-res WebP).
   Report the delta. This is the metric that was left unmeasured last time.

## Known gotchas from last session
- The sandbox blocks deleting `.git/*.lock` files by default; if a git op fails with a lock error,
  `rm -f .git/<that>.lock` and retry (deletion was enabled for this folder).
- Bash paths use the `/sessions/.../mnt/Codex RGVCS/` mount; file tools use
  `/Users/victoralonso/Repos/Codex RGVCS/`. Same files, different path roots.
- 8 of 9 service-page heroes were ALREADY `<picture>` before last session; don't assume markup is
  uniform — inspect each before editing. Use a line-by-line transform that preserves the exact
  `<img>` tag, not a blind regex replace.
- Do a real browser render to confirm the gallery lightbox still opens (last session skipped this).
