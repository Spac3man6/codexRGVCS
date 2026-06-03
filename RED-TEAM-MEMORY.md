# Red-Team Memory

Short continuity log for client-sensitive asset decisions, external model reviews, and next actions. Keep this file brief so future sessions can recover context without replaying the whole thread.

## 2026-04-30

### Client Question

The client asked whether the photos did not work because of resolution or angle.

### Answer Already Sent

We told the client the issue was a mix of:

- resolution after crop
- angle / composition
- fit for the specific website slot
- service match, especially whether the asset clearly reads as concrete staining

The intended nuance was: the photos are not bad; some are useful in support/gallery/service slots, but the homepage hero and concrete-staining proof slots need more specific images.

### Internal Red-Team Correction

Avoid saying "the photos did not work" as a broad claim. Better framing:

> Some photos fit certain parts of the site better than others. A few may be good gallery or support assets, while the hero and staining-proof sections need more specific image types.

### Gemini / Antigravity Prompt

Created `GEMINI-ASSET-RED-TEAM-PROMPT.md` to ask Gemini / Antigravity to challenge our asset conclusions, classify usable vs. unusable assets, and audit whether model or human review rejected anything too aggressively.

### Antigravity Summary Received

The external red-team summary reported:

- The site is preview-ready but not launch-ready.
- AI placeholders and generic imagery are too risky for high-trust slots such as the hero and before-and-after sections.
- The client ask should be narrowed to four launch-blocking assets:
  - one wide-format hero photo
  - one real concrete staining photo
  - one before-and-after pair
  - one team / crew photo
- A "no filler" policy should guide asset placement: do not substitute misleading images from other service categories when a specific service lacks real proof.

The full packet is now present as `RED-TEAM-DECISION-PACKET.md`.

Important correction: the packet says the current homepage hero is the AI-generated warehouse image. That is stale. `index.html` currently uses `assets/img/site/polished/polished-commercial-wide.jpg`, and `WORKLOG.md` already notes that production pages no longer use the old AI warehouse hero. The packet's broader conclusion still stands: the current hero is temporary and not ideal for a permanent concrete-staining trust signal.

### Current Working Decision

The Antigravity summary agrees with our core position:

- preview is acceptable
- launch still needs trust-critical client assets
- the asset request should stay small and concrete
- misleading service-category substitutions should be avoided

### Open Risks

- The packet is useful but not as complete as the original prompt requested: it does not include a full asset-by-asset decision matrix.
- "No filler" should not mean empty or weak sections everywhere; branded abstracts or text-only sections can work temporarily, but must be visually reviewed so the site does not feel unfinished.
- If generated imagery is used, it should be treated as temporary/internal and should not represent real work.
- Phone number has been updated to `(956) 502-9635`; email, map preference, and form handling remain launch blockers separate from photography.

### Next Actions

1. Import or paste the full `decision_packet.md` into the workspace.
2. Compare the decision packet against `ASSET-AUDIT.md` and current page slots.
3. Update `CLIENT-ASSET-REQUESTS.md` if the "Top Four" ask becomes the official client request.
4. Replace or remove misleading placeholders only after slot-specific asset decisions are confirmed.
5. Re-run tests and browser visual QA after any asset/content integration.
