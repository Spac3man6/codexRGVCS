# Craftsman Reference Analysis

Analysis date: April 4, 2026
Reference site: https://www.craftsmanconcretefloors.com/

## What Was Confirmed

- Platform: WordPress
- Theme stack: GeneratePress with a custom child theme and custom CSS bundles
- Main interaction scripts:
  - custom mobile drawer menu logic
  - gallery modal viewer
  - accordion FAQ behavior
  - sticky bottom CTA bar
- Typography in use:
  - display headings: `Bebas Neue`
  - navigation and CTA styling reference `futura-pt`
  - body copy leans on system sans with some `Barlow` usage on inner pages
- Core palette:
  - accent orange: `#ea6d00`
  - deep charcoal / black: `#161616`, `#151515`, `#2c2c2c`
  - light neutral panels: `#f1f0f0`, `#fafafa`, `#ffffff`

## Home Page Structure

Observed order on the homepage:

1. Transparent header over hero
2. Hero / credibility block
3. Client logo wall
4. Commercial gallery
5. Residential gallery
6. Mid-page proposal form
7. Service links block
8. FAQ accordion
9. Case studies / blog cards
10. Dense footer
11. Sticky bottom CTA bar
12. Modal estimate form

## Navigation Pattern

- Desktop header sits over the hero, not as a heavy boxed nav.
- Brand at left, compact uppercase navigation at right.
- Primary navigation is shallow:
  - one services dropdown
  - one strong contact / pricing CTA
- Mobile navigation uses a right-side slide-out drawer.
- Mobile submenu behavior is accordion-style, not hover-based.
- A dark page overlay and scroll lock are used when the drawer is open.

## Hero Treatment

- Large photographic hero image loaded eagerly.
- Header overlays the hero with white navigation text.
- Hero copy is left-aligned and concise.
- One dominant CTA appears early.
- The top section functions more like a credibility intro than a marketing slogan dump.
- Supporting proof is presented as disciplined bullet points instead of oversized badges.

## Typography Hierarchy

- Display typography is bold, condensed, uppercase, and industrial.
- Headings rely on large scale changes more than color changes.
- Body text is readable, neutral, and not overly stylized.
- Navigation and button text use tight tracking and uppercase treatment.
- Visual hierarchy is built through:
  - large display headings
  - thin but strong section rules
  - generous whitespace
  - restrained accent color usage

## Color And Surface Language

- Accent orange is used sparingly and intentionally:
  - CTA buttons
  - active nav emphasis
  - link hover states
  - selected FAQ or highlight text
- Most surfaces are black, charcoal, white, and pale concrete gray.
- Galleries sit on light gray panels.
- Footer and sticky CTA use dark charcoal backgrounds.
- Buttons use flat fills with strong borders and shadow / offset motion on hover.

## Section And Layout Patterns

- Content width is unusually wide, around a 2000px rail.
- Sections are separated with strong horizontal rules and generous top spacing.
- Many inner templates use a split grid:
  - left column for section title
  - right column for detail content
- Cards are boxy and editorial, not rounded or glossy.
- Footer is dense and information-rich, with four columns plus legal row.

## CTA Placement

- CTA appears in the hero.
- Another full proposal form appears mid-page.
- Footer repeats contact CTAs.
- Sticky bottom CTA appears after scroll.
- A modal estimate form is available from the sticky CTA.

This repeated CTA pattern is important to preserve.

## Image Handling

- Hero image is preloaded.
- Client logos are grayscale until hover.
- Gallery uses square crops in a rigid grid:
  - 4 columns desktop
  - 2 columns mobile
- Gallery opens a modal lightbox with previous / next controls.
- Case study cards use large editorial images with bordered card bodies.

## Footer Layout

- Dark footer with prominent brand mark at top.
- Columns observed:
  - systems / services
  - capabilities
  - vendor or support documents
  - direct contact
- Legal row is separated by a subtle top border.
- Footer is part sales tool, part procurement credibility block.

## Mobile Behavior

- Breakpoint for the mobile drawer is around `1200px`.
- Header compresses but keeps the overlay-on-hero look.
- Drawer slides from the right.
- Gallery shifts from 4 columns to 2.
- Section spacing tightens significantly on mobile.
- Content remains left-aligned; there is no centered mobile redesign.

## Animation And Interaction Notes

Confirmed:

- gallery image hover zoom + orange wash
- grayscale-to-color logo hover
- CTA hover offset / shadow feel
- accordion FAQ open / close
- slide-out mobile drawer
- sticky bottom CTA reveal
- modal popups

Inferred from CSS / markup, not directly measured in-browser:

- transitions are short and utilitarian
- motion is used for emphasis, not decoration
- there is no evidence of heavy parallax or elaborate scroll storytelling

## Inner Page Patterns

Representative inner pages inspected:

- `/polished-concrete/`
- `/contact/`
- `/blog/`

Observed inner-page conventions:

- same shell as home
- large image-led intro
- alternating informational blocks
- repeated mid-page form CTA
- repeated service links and FAQ support sections
- case studies reused as proof assets
- contact page extends the same design language rather than switching layouts

## Implementation Direction For RGV Concrete Stain

- Use a static multi-page site instead of WordPress.
- Recreate the reference structure and interaction model, not its copy.
- Keep the wide editorial layout, section rules, dark header, orange accent, and dense footer.
- Adapt the tone toward Rio Grande Valley residential and commercial concrete finishing.
- Replace the reference's national / industrial proof with local service-area proof, homeowner trust, and contractor credibility.
- Preserve these high-value reference patterns:
  - transparent overlay header
  - service dropdown + contact CTA
  - image-led hero
  - gallery before deep copy
  - mid-page estimate form
  - FAQ accordion
  - editorial case study cards
  - sticky bottom CTA
