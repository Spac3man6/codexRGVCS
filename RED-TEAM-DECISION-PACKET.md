# RGVCS Visual Asset Red-Team Decision Packet

## 1. Executive Summary & Verdict

**Verdict:** The site is **preview-ready but not launch-ready.**

**Reasoning:** The fundamental integrity of the website's visual proof is currently compromised by significant gaps in real-world project photography. Relying on AI-generated placeholders (such as the current warehouse hero) or low-context imagery for trust-critical slots (hero, staining proof, team presence) creates a high risk of damaging the client's credibility and reducing conversion rates. 

**Recommendation:** Delay the official launch. Prioritize acquiring real project photography for the top-four missing categories. A brief delay to secure authentic proof is vastly preferable to launching a visually weak or misleading site that fails to establish trust.

---

## 2. Asset Categorization & Status

### ✅ Strong Buckets (Approved & Normalized)
These categories have sufficient, high-quality representation and are approved for their respective slots.
- **Polished Concrete:** Strong commercial wide shots available.
- **Epoxy Flake / Garage Coatings:** Good detail and context shots.
- **Metallic Epoxy:** Sufficient examples, though care must be taken not to over-represent this niche service.

### ❌ Weak Buckets / Critical Gaps (Missing)
These categories lack the minimum viable imagery required for a professional, trustworthy launch.
- **Homepage Hero:** The current AI-generated warehouse image is unacceptable for permanent use. A high-resolution, wide-format, real project photo is mandatory.
- **Concrete Staining:** True staining examples are missing. Using epoxy or metallic shots in these slots is misleading.
- **Before-and-After Pairs:** Critical missing proof of transformation.
- **Team/Process Photography:** Missing. Crucial for establishing local authenticity and trust.

---

## 3. The "Slot-Fit" Rules

To ensure assets are used correctly and not forced into inappropriate slots, adhere to the following rules:

1. **No Filler:** If a specific service lacks real imagery (e.g., concrete staining), use a branded, abstract placeholder or text-driven design rather than substituting a misleading image from another service.
2. **AI is Temporary:** AI imagery must be clearly documented internally as a placeholder and never presented as client proof. It must be swapped out before the final launch.
3. **Hero Slot Requirements:** The homepage hero slot requires a wide-aspect, high-resolution (min 2000px wide) image with a clear focal point and space for overlay text. Low-resolution or poorly cropped images will break the site's aesthetic.

---

## 4. Client Communication Strategy

**Goal:** Break the asset logjam quickly and respectfully, without placing blame. Clearly distinguish between "unusable" and "missing" assets.

**Tone:** Direct, urgent, professional, and outcome-focused.

### Proposed Message Template

> Hi [Client Name],
>
> The website structure is fully built and ready for review, but we've hit a critical roadblock regarding the photography. To ensure the site looks premium and actually converts visitors into leads, we need to replace the temporary placeholder images with real photos of your work.
> 
> We have great shots for the garage and polished concrete sections, but we are missing a few specific, high-trust items. 
> 
> To get the site launch-ready, we need you to send us your best options for the following **four** items:
> 
> 1. **One wide hero photo:** Your absolute best, high-resolution shot of a finished project (commercial or residential) to serve as the first thing people see on the homepage.
> 2. **One real concrete staining photo:** We need an accurate representation of your staining work.
> 3. **One before-and-after pair:** The strongest proof of your floor transformations.
> 4. **One team or crew photo:** A shot of you or your crew on the job to build local trust.
> 
> We want to launch this right. Sending these four items in the next 24-48 hours will allow us to swap out the placeholders and get the site live. 
> 
> Let me know if you have these on hand!

---

## 5. Next Steps for Development Team

1. **Send Communication:** Dispatch the approved message template to the client immediately.
2. **Hold on Launch:** Do not proceed with the final launch sequence until at least the Hero and Staining photos are received and integrated.
3. **Normalize Incoming Assets:** As new assets arrive, immediately normalize them into `assets/img/site/` following the established folder structure.
4. **Final Visual QA:** Once assets are integrated, perform a final visual render-check (using Playwright when permissions allow) to ensure the "slot-fit" is professional and responsive.
