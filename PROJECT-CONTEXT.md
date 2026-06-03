# Project Context

Last updated: April 21, 2026

This file is the canonical project handoff and thread-recovery reference for the RGV Concrete Stain rebuild.

## Project Snapshot

- Project: static multi-page marketing site rebuild for RGV Concrete Stain
- Stack: HTML, CSS, and vanilla JavaScript only
- Workspace root: `/Users/victoralonso/Repos/Codex RGVCS`
- Current preview URL: `http://127.0.0.1:8000/`
- Repo note: this workspace is not currently inside a Git repository

## Core Constraint

Continue from the existing scaffold. Do not restart from scratch. Preserve and extend the shared CSS and JS unless a targeted change is necessary.

## What Already Exists

- Shared header, footer, mobile nav, sticky CTA, modal, accordion, gallery modal, and demo form handling in `assets/js/site.js`
- Shared visual system and layout primitives in `assets/css/styles.css`
- Full static page set:
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
- Reference analysis in `REFERENCE-ANALYSIS.md`
- Supporting docs in:
  - `README.md`
  - `BRANDING.md`
  - `CONTENT-GUIDE.md`
  - `ASSET-AUDIT.md`
  - `CLIENT-ASSET-REQUESTS.md`
  - `ANTIGRAVITY-MASTER-PROMPT.md`
  - `WORKLOG.md`
  - `REVIEW-CHECKPOINT-01.md`

## Current Build Status

- The multi-page site is built and passes the current regression suite
- Shared scaffold behavior is preserved
- Client assets have been partially normalized into `assets/img/site/`
- Antigravity-only external imagery handoff is now documented for the missing-image categories
- Stronger real-ish support exists for:
  - polished concrete
  - epoxy flake / garage coatings
  - metallic epoxy / decorative coatings
- Weak areas still remain for:
  - true concrete staining
  - team / owner / process photography
  - before-and-after proof
  - a final trustworthy homepage hero

## Homepage Direction

The homepage hero was intentionally simplified after review feedback.

- The old homepage hero was overloaded
  - headline
  - dual CTAs
  - proof panel
  - stat strip
- The current homepage hero is quieter
  - one primary CTA
  - stronger image overlay for contrast
  - simplified shared header
  - proof content moved below the fold

## Loom-Derived Business Guidance

The stakeholder Loom transcript clarified these priorities:

- The hero image drives typography, contrast, and color decisions
- Drone-style hero video is a risky fallback because performance will likely be poor, especially on mobile
- Launch speed matters because real user behavior matters more than internal opinion
- If the client cannot supply strong media fast, AI fallback is acceptable temporarily, but it lowers trust and proof quality

## Current Red-Team Decisions

- Do not point production pages directly at `assets/client-assets/`
  - Use normalized production paths instead
- Do not treat AI-generated media as permanent homepage proof
- Do not force weak or misleading asset matches onto staining, about, or team content
- Keep the site credible even if that means leaving honest placeholders in place

## Best Current Asset Read

- Best temporary homepage visual:
  - `assets/img/site/polished/polished-commercial-wide.jpg`
- Best current real-project support:
  - polished concrete images
  - epoxy flake images
  - metallic epoxy images
- Still missing:
  - one real wide hero image
  - true staining images
  - team / process photos
  - before-and-after pairs

## Verification Baseline

Use this command from the project root:

```bash
python3 -m unittest -v tests.test_site
```

Current regression coverage includes:

- required pages and project docs
- shared mounts and SEO shell
- valid LocalBusiness JSON-LD
- local file references
- placeholder replacement comments
- no raw `assets/client-assets/` references in production pages
- shared JS syntax
- sitemap XML validity
- client asset drop presence
- homepage hero simplification guard

## Visual Review Tooling

- `playwright` is installed locally via `python3 -m pip install playwright`
- Chromium is installed locally via `python3 -m playwright install chromium`
- Current environment note:
  - launching headless Chromium for screenshots requires escalated execution on this machine because the sandboxed launch hits a macOS permission failure
  - once escalated, Playwright can be used for real rendered page review instead of HTML/CSS inference

## External Imagery Handoff

- `ANTIGRAVITY-MASTER-PROMPT.md` is the only approved external AI-imagery handoff prompt for this project
- Antigravity scope is locked to:
  - generated imagery
  - manifest-based handoff documentation
- Antigravity may not:
  - edit repo files
  - propose code or layout changes
  - rename or reorganize project assets
- Codex resumes only after the returned bundle is validated visually and against the documented manifest

## Files That Matter Most For Continuation

- `PROJECT-CONTEXT.md`
- `ANTIGRAVITY-MASTER-PROMPT.md`
- `WORKLOG.md`
- `ASSET-AUDIT.md`
- `CLIENT-ASSET-REQUESTS.md`
- `REVIEW-CHECKPOINT-01.md`
- `tests/test_site.py`
- `assets/css/styles.css`
- `assets/js/site.js`
- `index.html`

## Immediate Next Best Steps

1. Use `ANTIGRAVITY-MASTER-PROMPT.md` if external generated imagery is needed to close the remaining gaps
2. Accept only imagery plus the documented handoff bundle from Antigravity
3. Validate returned assets by visible content, not filenames or folder labels
4. Integrate only accepted assets into normalized production paths
5. Re-run the regression suite and a screenshot-based visual QA pass after integration

## Reasoning Guidance

- Extra high reasoning is useful while hero strategy, asset credibility, and visual direction are still moving
- High reasoning is safe once the homepage hero direction is approved
- Mid reasoning is safe once the remaining work is mostly repetitive asset swaps, caption cleanup, and light QA
