# Image-generation prompt — stained concrete gallery variants

**Goal:** Produce 3–4 distinct, photorealistic stained-concrete images for the
RGV Concrete Stain gallery. We currently have one real staining photo
(`stained-patio-wide.jpg`); the gallery has four slots, so all four show the
same image. We need visually different shots that still read as the same
company's work in the Rio Grande Valley (South Texas).

## Base / reference
- Match the look of our existing photo: warm earth-tone acid/water-based stain
  on a troweled concrete surface, natural daylight, realistic (not glossy CGI).
- Keep it believable as a real contractor's project photo — not a stock render,
  not over-saturated, no people, no visible brand logos or text.

## Core prompt (paste this, then vary per slot below)

> Photorealistic photograph of decorative stained concrete in a South Texas /
> Rio Grande Valley setting. Acid-stained / water-based stained concrete floor
> with warm earth-tone color variation (browns, tans, terracotta, subtle
> mottling). Natural daylight, soft shadows, realistic concrete texture with
> visible troweled finish and slight surface variation. Shot like a real
> contractor's project photo — clean, neutral, no people, no text, no logos,
> no watermark. Wide aspect ratio (16:9), high detail, true-to-life color.

## Per-image variations (generate one of each)

1. **Covered outdoor patio** — stained concrete patio under a covered porch /
   ramada, residential backyard, warm afternoon light, a few potted plants at
   the edges. Earth-tone stain with natural mottling.

2. **Interior living space** — stained concrete floor inside a modern Valley
   home interior, large windows, warm indoor light, minimal furniture at frame
   edges, showing the stain's color depth and sheen indoors.

3. **Entry / walkway** — stained concrete entryway or front walkway, daytime,
   showing edge work and a saw-cut or score-line pattern, slightly different
   stain tone (cooler brown / gray-brown) to vary from the others.

4. **(Optional) Detail / close-up** — tight close-up of stained concrete
   surface showing mottling, color layering, and sealed sheen; macro feel,
   shallow depth of field.

## Output specs
- Aspect ratio **16:9** to match the existing 1800×1004 gallery slots.
- Deliver as JPG (and WebP if the tool supports it).
- Avoid: glossy showroom CGI, people, signage, text overlays, brand marks,
  unrealistic mirror-finish floors, cartoon/illustration styles.

## Where these go
- File location: `assets/img/site/staining/`
- Suggested names: `stained-patio-covered.jpg`, `stained-interior.jpg`,
  `stained-entry.jpg`, `stained-detail.jpg`
- Then update the 4 gallery slots in `gallery.html` (#stained-projects,
  lines ~121–131) and the 4 slots in `concrete-staining.html` (gallery,
  lines ~176–187) to point at the new files, with matching alt text and
  correct width/height.
