# Asset Audit

Audit date: April 6, 2026

## Inventory Summary

- Total client asset files: 66
- Image files: 56
- Video files: 10
- Main buckets:
  - `Photos/Polished concrete`
  - `Photos/Epoxy flakes`
  - `Photos/Metallic epoxy`
  - `Beta - Unpublished AI Generated Assets`

## High-Value Assets Ready To Use First

These are the strongest current candidates for immediate integration because they have recognizable project context and enough resolution for web delivery.

- `assets/client-assets/Photos/warehouse_polished_concrete_floor_stain.png`
  - Strong temporary hero or polished/commercial feature image
  - Risk: likely AI-generated rather than real project photography, so it should not anchor the trust story long term
- `assets/client-assets/Photos/Polished concrete/20250618_180252.jpg`
  - Good commercial polish image with clear scale and floor reflection
- `assets/client-assets/Photos/Polished concrete/20250128_095832.jpg`
  - Strong aggregate/detail image for polished concrete supporting gallery content
- `assets/client-assets/Photos/Epoxy flakes/20250524_121840.jpg`
  - Good flake epoxy texture/detail image
- `assets/client-assets/Photos/Epoxy flakes/20240731_143851.jpg`
  - Good epoxy flake image with exterior context and directional shadow
- `assets/client-assets/Photos/Epoxy flakes/20260304_173046.jpg`
  - Good floor-surface closeup with clean coating finish
- `assets/client-assets/Photos/Metallic epoxy/20251001_112435.jpg`
  - Strong metallic epoxy wide shot with reflective finish
- `assets/client-assets/Photos/Metallic epoxy/20251107_114828.jpg`
  - Usable metallic epoxy detail shot with clear finish movement

## Assets To Use Carefully

- `assets/client-assets/60c5cb8c9e788814f86d3d6a_LOGO_RGV Concrete Stain-p-1080.png`
  - Technically usable as a provided logo asset
  - Risk: the mark feels more like equipment clip-art than a premium editorial brand system, so I would not swap it into the current site shell without owner approval
- `assets/client-assets/Photos/Google_AI_Studio_2025-09-10T01_26_25.366Z.png`
  - High-resolution image
  - Risk: reads as generic AI/generated tech imagery and is not aligned with decorative concrete credibility
- `assets/client-assets/Beta - Unpublished AI Generated Assets/*.mp4`
  - Potential future use for social or background motion studies
  - Risk: "unpublished AI generated" is the wrong trust signal for a concrete contractor homepage or proof gallery

## Red-Team Findings On The Asset Drop

- The current asset set is strong for:
  - polished concrete
  - epoxy flake systems
  - metallic epoxy
- The current asset set is weak for:
  - true concrete staining
  - decorative coatings beyond epoxy-style visuals
  - team / owner / process photography
  - before-and-after sequences
  - local Rio Grande Valley exterior hero photography
- Several phone-shot images appear rotated or rely on EXIF orientation.
  - Before production use, normalize orientation and export web derivatives so browser rendering is consistent.
- Several useful photos are detail-heavy but not environment-heavy.
  - They will work best in galleries, service pages, and case-study supporting slots, not as the main hero.
- The most "hero-ready" image currently available appears to be AI-generated.
  - It is acceptable as a temporary internal draft visual, but it should not become the permanent homepage proof image.

## Recommended Immediate Integration Order

1. Replace polished concrete placeholders first.
2. Replace epoxy flooring and garage floor placeholders next using epoxy flake assets.
3. Add metallic epoxy imagery to decorative coatings where the finish genuinely matches the service description.
4. Keep the homepage hero as placeholder unless the client approves use of an AI-generated hero or supplies a real wide-format project image.
5. Leave about/team imagery as placeholder until real owner or crew photography exists.

## Gaps Still Needed From The Client

- One real wide hero image with strong architectural composition
- Two to four real staining photos
- Team / owner / active jobsite imagery
- At least two before-and-after pairs
- One or two local residential patios or outdoor living photos

## Scalability Recommendation

Before mass integration, create a normalized delivery set:

- `assets/img/clients/hero/`
- `assets/img/clients/polished/`
- `assets/img/clients/epoxy/`
- `assets/img/clients/decorative/`
- `assets/img/clients/garage/`
- `assets/img/clients/team/`

From there, export web-safe derivatives with consistent orientation, naming, and target widths so future swaps are predictable and testable.
