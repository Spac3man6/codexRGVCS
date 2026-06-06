# Image performance prompt — RGV Concrete Stain

**Problem (verified by audit):** WebP files were generated for the `site/*` images,
but the markup almost never references them. Across all 10 HTML pages, nearly every
image is a bare `<img src="...jpg">` (or one `.png`), so the site serves full-weight
JPG/PNG even though smaller WebP files already exist on disk. Only one `<picture>`
element per page (the hero) actually uses WebP. This task is to make every on-page
image serve an optimized, properly-sized, modern format.

Static HTML/CSS/JS, no build step. Absolute `/assets/` paths, served from root.
Do NOT change image positions, alt text, `width`/`height`, or existing
`loading="lazy"` / `decoding="async"`. Only change how the image is delivered.

---

## Category 1 — CRITICAL: the PNG hero (convert format + create WebP)

| File | Size | Issue |
|---|---|---|
| `assets/img/site/home/home-hero-temp-ai-warehouse.png` | **2,327 KB** | Photographic image stored as PNG, no WebP variant, it's the homepage LCP element |

Referenced in `index.html` ~line 83 (inside the hero `<picture>`, including a
`max-width:767px` mobile `<source>`).

Fix: create an optimized JPG **and** a WebP from this image; wire both into the
existing `<picture>`. Target JPG < 250 KB, WebP < 150 KB at display size. (This file
is also a temp/AI asset — coordinate with whoever supplies the real hero photo.)

---

## Category 2 — HIGH VALUE, LOW EFFORT: WebP already exists, markup ignores it

These `site/*` JPGs each already have a `.webp` sibling on disk (listed savings).
The ONLY fix needed is markup: convert each bare `<img>` to a `<picture>` with a
WebP `<source>` + the JPG as fallback. No new image files required.

| JPG (served now) | JPG size | WebP size (exists) | Savings |
|---|---|---|---|
| `site/garage/garage-flake-closeup.jpg` | 944 KB | 545 KB | ~42% |
| `site/garage/garage-flake-exterior.jpg` | 692 KB | 351 KB | ~49% |
| `site/garage/garage-flake-interior.jpg` | 663 KB | 335 KB | ~49% |
| `site/polished/polished-commercial-wide.jpg` | 650 KB | 228 KB | ~65% |
| `site/polished/polished-aggregate-detail.jpg` | 613 KB | 303 KB | ~51% |
| `site/decorative/metallic-detail.jpg` | 447 KB | 172 KB | ~62% |
| `site/staining/stained-patio-wide.jpg` | 443 KB | 179 KB | ~60% |
| `site/decorative/metallic-wide.jpg` | 366 KB | 116 KB | ~68% |
| `site/decorative/metallic-residential.jpg` | 69 KB | (has webp) | — |

These images are referenced **dozens of times** across every page (heroes, galleries,
service cards, project profiles). Pattern to apply everywhere a bare `<img>` points
at one of the above:

```html
<picture>
  <source srcset="/assets/img/site/.../NAME.webp" type="image/webp" />
  <img src="/assets/img/site/.../NAME.jpg" alt="(unchanged)" width="W" height="H"
       loading="lazy" decoding="async" />
</picture>
```

Note: page-hero `<img class="page-hero__image">` on the service pages (about,
contact, services, case-studies, concrete-polishing, concrete-staining,
decorative-coatings, epoxy-flooring, garage-floor-coatings) are ALSO bare `<img>`
pointing at these JPGs — they need the same `<picture>` treatment and should NOT
keep `loading="lazy"` (heroes are above the fold; use `fetchpriority="high"` instead).

---

## Category 3 — MEDIUM: city placeholders have no WebP at all

7 files in `assets/img/city-placeholders/*.jpg` (120–169 KB each), bare `<img>`,
no `.webp` sibling. Referenced in the city cards on `index.html` and `about.html`.

Fix: generate a WebP for each, then wrap in `<picture>`. (If these are slated for
replacement with real photos, do the conversion on the replacements instead.)

Files: `weslaco-garage-coating`, `mission-patio-poolside`, `brownsville-hospitality`,
`mcallen-retail-generated-temp`, `edinburg-residential-entry`,
`harlingen-showroom-office`, `pharr-commercial-buildout` (all `.jpg`).

---

## Optional but recommended: responsive sizing

Several images are served at full resolution into small display slots (e.g.
2000×1500 polished photos shown as gallery thumbnails). Consider generating
smaller derivatives and using `srcset`/`sizes` so phones don't download 2000px-wide
images for a ~400px slot. Lower priority than Categories 1–2.

---

## Deliverables
1. Hero PNG → optimized JPG + WebP, wired into `index.html` `<picture>`.
2. All Category-2 bare `<img>` → `<picture>` using the existing WebP siblings
   (every occurrence across all 10 pages).
3. Category-3 city images → WebP generated + `<picture>` markup.
4. Heroes use `fetchpriority="high"`, not `loading="lazy"`.
5. Before/after total page weight (KB) for homepage + one gallery page.

## Constraints
- No build step / bundler unless approved. Keep it static.
- Absolute `/assets/` paths stay; served from root.
- Don't alter alt text, dimensions, or image choices — delivery only.
- Don't touch `site.js`, Formspree wiring, or `sitemap.xml`.
