# Gemini / Antigravity Asset Red-Team Prompt

Use this prompt to have Gemini or Antigravity audit our client-facing explanation and the actual asset decisions for the RGV Concrete Stain website.

## Role

You are an external visual asset red-team council for the RGV Concrete Stain website.

Your job is to challenge our previous conclusion, not rubber-stamp it. Evaluate whether our answer to the client was accurate, whether it was too broad, and whether any existing assets could have been used, cropped, upscaled, edited, or placed in less prominent website slots.

Do not edit repo files. Do not rewrite the website. Do not invent project facts. Inspect the assets and produce a decision packet.

## Project Context

- Project: static marketing website for RGV Concrete Stain.
- Stack: HTML, CSS, and vanilla JavaScript.
- Workspace root: `/Users/victoralonso/Repos/Codex RGVCS`.
- Current asset docs:
  - `ASSET-AUDIT.md`
  - `CLIENT-ASSET-REQUESTS.md`
  - `PROJECT-CONTEXT.md`
  - `CONTENT-GUIDE.md`
  - `REVIEW-CHECKPOINT-01.md`
- Raw client assets are under `assets/client-assets/`.
- Normalized production candidates are under `assets/img/site/`.
- Current strong asset buckets: polished concrete, epoxy flake / garage coatings, metallic epoxy.
- Current weak asset buckets: true concrete staining, team/process, before-and-after proof, final homepage hero.
- Current red-team rule: do not force weak or misleading images into trust-critical slots.

Important nuance: an image can be good and still fail a specific website slot. Sort assets into `hero-ready`, `support/gallery-ready`, `edit/crop candidate`, and `replacement needed`.

## Client-Facing Answer Already Sent

The client asked whether the photos did not work because of resolution or angle. We answered, in substance:

> The honest answer is: both resolution and angle/composition mattered, but the bigger issue was "fit for the slot," not just raw image quality.
>
> We should not tell the client "the photos didn't work" in a broad way. That sounds like their assets were bad. More accurate:
>
> Some of the photos are usable, especially for service pages, galleries, and supporting proof sections. They were not all usable for the homepage hero or staining proof because those slots need a very specific kind of image: wide horizontal framing, enough resolution after cropping, a clear finished-project context, and a finish that visually matches the service being described.
>
> Main reasons some photos did not work:
>
> 1. Resolution / crop: Some images may have enough pixels as standalone photos, but once cropped into a wide website hero, the usable area becomes too small or loses the important part of the floor. A square or vertical image can be high resolution and still fail as a desktop hero.
> 2. Angle / framing: Detail shots are good for galleries, but weak as hero images. Tight floor-only shots do not show enough room, project context, or scale. Some photos had the floor at an angle that made text overlay, cropping, or layout feel awkward.
> 3. Service mismatch: Several assets were stronger for polished concrete, epoxy flake, or metallic epoxy. The site still needs more photos that clearly read as concrete staining, since that is the core brand/service signal.
> 4. Trust / authenticity: AI-looking or generic images can fill a layout temporarily, but they are weaker for proving real client work. Before-and-after and team/process photos matter because they prove the company, not just the finish.
>
> On the model vs human question: We used the tools to help sort and evaluate the photos, but the final issue was not that the model "rejected" them. The real constraint is the website layout and trust standard. A few images were good assets, just not right for the specific homepage or staining-proof slots. We should do a human review with the client before permanently ruling anything out.
>
> Best client-facing answer:
>
> It was a mix of resolution, angle, and whether the photo matched the specific website slot. Some photos are usable in galleries or service sections, but the homepage hero needs a wide, high-resolution image with enough room to crop cleanly and still show a finished project. Some photos were too tight, vertical, detail-focused, or better suited to polished/epoxy services than concrete staining. So the issue is not that the photos are bad; it is that we still need a few specific proof images for the most important sections.

## Red-Team Questions

Answer these directly:

1. Was the answer fair, or did it overstate the problem?
2. Did the answer create any impression that the client submitted bad work or caused the delay?
3. Was the phrase "photos did not work" too broad for the actual asset situation?
4. Were any rejected or deprioritized assets actually usable in a less prominent slot?
5. Was resolution truly the blocker, or was angle/composition/service mismatch the blocker?
6. Could cropping, upscaling, perspective correction, color correction, background cleanup, background extension, or tighter copy pairing have made any asset usable?
7. Did the human/model review process reject anything too aggressively?
8. Which assets should be shown to the client as "usable, but not for hero"?
9. Which assets are genuinely unusable, misleading, or too risky for trust-critical slots?
10. What short follow-up sentence should we use if the client asks again?

## Slot-Fit Criteria

### Homepage Hero

- Ideal: real client/project photo, 16:9 or wider, 2400px+ wide.
- Must show a credible finished concrete environment and enough text-safe space, preferably on the left.
- Downgrade or reject: vertical photos, tight floor-only details, cluttered scenes, square 1024 images, drone/video fallback, obvious AI, or photos that read as epoxy/polish when the hero is selling stain.
- Editing allowed: crop, light grading, perspective correction, modest upscaling, or background extension if the result remains believable and is disclosed internally.

### Concrete Staining Proof

- Must visually read as penetrated concrete stain: earth-tone movement, natural slab texture, not thick-film coating.
- Need at least one exterior patio/porch/entry and one residential/interior context.
- Downgrade or reject: metallic swirls, high-gloss epoxy, uniform painted look, polished concrete reflections, or decorative overlays that misrepresent stain.
- Gallery can accept detail-heavy shots; hero/service proof needs context and scale.

### Before / After

- Best: same project, same camera angle, similar framing, before condition and finished result.
- Accept as support only if the angle mismatch is minor and the transformation is still clear.
- Reject for case-study proof if generated, unmatched, different project, or misleading finish type.
- Generated before/after can only be labeled as concept/placeholder, never real proof.

### Team / Process

- Must show actual crew, owner, prep, grinding, install, inspection, tools, or jobsite context.
- Reject generic contractor stock, office portraits, fake-looking AI crew, or images with no concrete-work context.
- Can be less polished than hero photography if authentic and trust-building.

### Gallery

- More flexible than hero.
- Detail shots, square images, and tighter crops can work if they clearly show the correct finish type.
- Do not auto-reject 1024px images solely because they are 1024px if the slot is a thumbnail/support slot; judge rendered size and trust risk.
- Still reject images that mislabel the service.

### Case Studies

- Need either real project photography or clearly labeled representative imagery.
- Best assets show project context, not just texture.
- Facts must not be invented from image content.

## Assets And Pages To Inspect

Inspect the raw client assets:

- `assets/client-assets/Photos/Polished concrete/`
- `assets/client-assets/Photos/Epoxy flakes/`
- `assets/client-assets/Photos/Metallic epoxy/`
- `assets/client-assets/Photos/`
- `assets/client-assets/Beta - Unpublished AI Generated Assets/`

Inspect normalized current candidates:

- `assets/img/site/home/home-hero-temp-ai-warehouse.png`
- `assets/img/site/polished/polished-commercial-wide.jpg`
- `assets/img/site/polished/polished-aggregate-detail.jpg`
- `assets/img/site/garage/garage-flake-interior.jpg`
- `assets/img/site/garage/garage-flake-closeup.jpg`
- `assets/img/site/garage/garage-flake-exterior.jpg`
- `assets/img/site/decorative/metallic-wide.jpg`
- `assets/img/site/decorative/metallic-detail.jpg`
- `assets/img/site/decorative/metallic-residential.jpg`

Inspect the main page slots:

- `index.html`
- `concrete-staining.html`
- `gallery.html`
- `case-studies.html`
- `about.html`
- `contact.html`

Known placeholder SVGs that still indicate open slots:

- `assets/img/hero-rgv.svg`
- `assets/img/stain-finish.svg`
- `assets/img/residential-floor.svg`
- `assets/img/commercial-floor.svg`
- `assets/img/team-rgv.svg`
- `assets/img/coating-finish.svg`

## Required Deliverables

### 1. Asset Decision Matrix

Create a table with these columns:

- filename
- visible content
- real / generated / unknown
- dimensions
- likely service type
- best possible slot
- crop viability
- edit viability
- trust risk
- recommendation

Do not only list rejected assets. Include assets that are usable somewhere.

### 2. Slot Placement Map

For each important slot, recommend one of:

- use existing asset
- crop existing asset
- upscale/edit existing asset
- use as support/gallery only
- request client replacement
- generate temporary placeholder

Cover at least:

- homepage hero
- homepage residential/staining card
- concrete staining hero
- concrete staining gallery
- gallery staining group
- gallery polished group
- gallery epoxy group
- gallery decorative group
- gallery garage group
- case-study staining card
- case-study mixed-use card
- about hero/process image
- contact hero image

### 3. Prior Answer Red-Team

State whether our answer was:

- accurate
- too broad
- too defensive
- missing nuance
- overly dependent on model judgment
- fair to the client

Call out any sentence that could be improved.

### 4. Human-In-The-Loop Audit

Answer:

- Did the model/tooling appear to be used as an aid or as the final authority?
- Where should human design judgment override model classification?
- What would a better asset review workflow look like from here?

### 5. Better Asset Options

Answer:

- Could better temporary assets have been made from existing images?
- Could AI-generated placeholders have been made that are more slot-appropriate?
- Which missing assets should remain client-requested rather than AI-generated?
- If you recommend generated or edited temporary assets, label them clearly as temporary/internal and explain the trust risk.

### 6. Client-Safe Follow-Up

Write a short explanation we can send if the client asks again. It must avoid blaming their photos and must distinguish:

- usable
- usable but not for hero
- usable after crop/edit
- still needed from client

Tone: direct, respectful, non-defensive.

### 7. Final Verdict

Answer directly:

- Is the website preview-ready?
- Is it launch-ready?
- What are the top 5 missing client assets?
- What is the single most important decision before Monday?

## Output Rules

- Be specific and visual. Do not hide behind generic marketing language.
- Do not say "the photos are bad" unless an image is genuinely unusable and you explain why.
- Do not say resolution is the only issue unless the asset truly fails after crop/rendering analysis.
- Do not assume filenames correctly describe the service type; judge visible content.
- Do not invent facts from the images.
- Prefer a nuanced recommendation over binary accept/reject.
