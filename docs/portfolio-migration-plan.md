# Portfolio foundation audit and Astro migration plan

Branch: `refactor/portfolio-foundation`  
Audit date: 2026-07-20  
Repository: `https://github.com/itspaulbader/portfolio`

## Current state

The portfolio is currently a static GitHub Pages site served from repository root. There is no build step, package manifest, GitHub Actions workflow, CNAME, or `.nojekyll` file in the repo.

Live routes verified:

- `https://itspaulbader.github.io/portfolio/`
- `https://itspaulbader.github.io/portfolio/meta-learn.html`

The public GitHub Pages API returned `404`, so the exact Pages setting could not be read from the repo. Based on the live URLs and repository contents, deployment appears to be static root publishing from `main`.

## Files inspected

- `index.html`
- `meta-learn.html`
- `components.js`
- `case-study.css`
- `images/`
- Git remote, branch state, Pages-related files, and live GitHub Pages URLs

## Baseline screenshots

Homepage:

- [Desktop 1440](baseline/home-desktop-1440.png)
- [Tablet 1024](baseline/home-tablet-1024.png)
- [Mobile 390](baseline/home-mobile-390.png)

Meta Learn:

- [Desktop 1440](baseline/meta-learn-desktop-1440.png)
- [Tablet 1024](baseline/meta-learn-tablet-1024.png)
- [Mobile 390](baseline/meta-learn-mobile-390.png)

Machine-readable capture details are saved in [baseline-report.json](baseline/baseline-report.json).

## Baseline verification

All six baseline pages loaded locally with HTTP `200`.

Measured page widths matched the viewport at all tested sizes:

- `1440px` desktop
- `1024px` tablet
- `390px` mobile

One browser console `404` appeared during the first desktop homepage capture, but no failed network request was recorded and it did not reproduce during the interaction pass. This should be rechecked during implementation, with special attention to favicon or implicit browser assets.

## Important routes to preserve

The Astro migration should preserve these public URLs exactly:

- `/portfolio/`
- `/portfolio/index.html`
- `/portfolio/meta-learn.html`
- `/portfolio/404.html`

Internal links that must keep working:

- Top nav logo to homepage
- Top nav `Work` to `./#work`
- Contact mail links
- Homepage Meta Learn card to `meta-learn.html`
- Meta Learn “More work” cards generated from homepage project data

Current placeholder routes that should remain intentionally non-breaking until real pages exist:

- Bershka case: `#`
- Sheer case: `#`
- Grundfos case: `#`

## Important behaviours to preserve

Shared behaviours from `components.js`:

- Injected top navigation
- Injected footer
- Subtle page transition on internal navigation
- Footer rotating word animation
- Footer wordmark parallax when present
- Reveal-on-scroll animation
- Case-study section progress rail on pages with `body[data-case]`
- More Work rail populated from homepage case cards

Homepage behaviours:

- Horizontal intro/story carousel with frosted dot controls
- Play/pause control for intro carousel
- Non-looping visual feel of carousel progression
- Work section vertical progress ticks on desktop
- Full-screen case cards
- Responsive case card image handling at desktop/tablet/mobile
- Meta Learn card navigates to `meta-learn.html`

Meta Learn behaviours:

- Hero image with bottom fade
- Highlights carousel with sticky frosted controls
- Play/pause control for highlights
- Scroll-driven/parallax card text in highlights
- Desktop before/after slider
- Mobile before/after card rail with independent handles
- Research cards opening modal details
- Goals scroll moment with dark background and animated grouping
- Process/wireframe carousel with paddles
- Apple-style design/explore section
- Mobile design/explore section as horizontal feature cards
- Outcomes grid
- Reflection section
- More Work rail with paddles
- Responsive section progress ticks on desktop only

## Asset handling audit

Current local assets are under `images/`.

Keep current filenames during the first migration to avoid accidental visual drift. Astro can later optimize assets, but the first pass should preserve current image paths and rendering.

Recommended first-pass asset approach:

- Move current `images/` to `public/images/`.
- Reference assets as `/portfolio/images/...` only when absolute paths are required.
- Prefer relative paths in rendered HTML when preserving existing behavior is easier.
- Do not convert or compress images during the migration baseline step.
- Keep external Framer-hosted screen images in Meta Learn unchanged until a later asset-localization pass.

## Proposed Astro structure

```text
portfolio/
  astro.config.mjs
  package.json
  public/
    images/
  src/
    data/
      projects.ts
      experience.ts
      metaLearn.ts
    layouts/
      BaseLayout.astro
      CaseStudyLayout.astro
    components/
      site/
        Topbar.astro
        Footer.astro
        PageTransition.astro
        Reveal.astro
      home/
        IntroStory.astro
        WorkSection.astro
        CaseCard.astro
        WorkProgressRail.astro
      case/
        SectionProgress.astro
        MoreWorkRail.astro
        BeforeAfterSlider.astro
        HighlightCarousel.astro
      meta-learn/
        MetaHero.astro
        ProblemSection.astro
        ResearchSection.astro
        GoalsMoment.astro
        ProcessSection.astro
        ValidationSection.astro
        DesignExplore.astro
        OutcomesSection.astro
        ReflectionsSection.astro
    scripts/
      pageTransitions.ts
      reveal.ts
      carousels.ts
      beforeAfter.ts
      metaLearnInteractions.ts
      rails.ts
    styles/
      tokens.css
      global.css
      utilities.css
      home.css
      case-study.css
      meta-learn.css
  docs/
    portfolio-migration-plan.md
    baseline/
```

## GitHub Pages configuration for Astro

Use Astro with a repository base path:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://itspaulbader.github.io',
  base: '/portfolio',
  output: 'static'
});
```

The final deployment can use GitHub Actions later, but the first migration branch should not alter the current live Pages setup. A separate implementation PR should add the build workflow only after visual parity is verified.

Recommended future workflow:

```text
source branch -> build Astro -> deploy static dist to GitHub Pages
```

Do not enable that workflow in this audit phase.

## Shared layouts

`BaseLayout.astro` should own:

- `<html>`, `<head>`, metadata, viewport
- global font strategy
- design tokens/global styles
- top navigation
- footer
- page transition script

`CaseStudyLayout.astro` should extend the base layout and add:

- `body[data-case]`
- case section progress
- shared More Work area
- optional case metadata

## Centralized data

Create `src/data/projects.ts` as the source of truth for project cards:

- id
- company/project name
- year
- title
- description
- tags
- icon data
- desktop image
- mobile image
- href
- status such as `comingSoon`

This should replace the current runtime parsing in `components.js`, where Meta Learn fetches `index.html` to build More Work cards. The migrated More Work rail should render from the same project data at build time.

Create `src/data/experience.ts` for homepage experience cards:

- company
- role
- period
- logo or initials

Create `src/data/metaLearn.ts` for case-specific content:

- highlights
- research cards and modal content
- goals bubbles
- process items
- validation/outcome stats
- design explore pills
- reflections

## Design tokens

Move repeated values into `src/styles/tokens.css`:

- colors: page background, white, text, muted text, soft surfaces, lines, blue
- radius: section, card, inner, pill
- shadows and glass treatments
- spacing: gutter, max content width, section padding
- typography scale for section headings, body, labels, captions
- easing curves
- z-index layers for nav, sticky controls, modals

Keep the current visual values first. Do not “improve” colors, radius, type sizes, or spacing during migration.

## Styles strategy

Use:

- `global.css` for reset, body, base typography, links, reusable helpers
- `tokens.css` for variables only
- `home.css` for homepage-specific layout
- `meta-learn.css` for the Meta Learn case page
- `case-study.css` for future shared case patterns

Avoid a full CSS rewrite in the first pass. Move styles section-by-section while keeping selectors close to the original names so visual diffs are easier to review.

## Client-side interactions

The first Astro migration should keep interactions as small client scripts, not framework components.

Recommended script split:

- `pageTransitions.ts`: internal link fade
- `reveal.ts`: IntersectionObserver reveals
- `carousels.ts`: homepage story and Meta Learn highlights/process rails
- `beforeAfter.ts`: desktop and mobile before/after sliders
- `metaLearnInteractions.ts`: goals moment, research modal, design explore
- `rails.ts`: work progress, section progress, More Work rail paddles

Scripts should initialize based on DOM selectors, so pages only activate what they actually contain.

## URL preservation

Astro should output:

- `src/pages/index.astro` -> `/portfolio/`
- `src/pages/meta-learn.astro` -> `/portfolio/meta-learn.html`
- `src/pages/404.astro` -> `/portfolio/404.html`

Use `build.format: 'file'` only if needed to preserve `.html` output consistently. Confirm generated URLs before deployment.

## Migration rules

- No redesign.
- No image optimization in the first implementation milestone.
- No copy changes unless required by data extraction.
- No route changes.
- No animation changes except where needed to faithfully reattach existing behaviour.
- No live deployment change until visual parity is proven against these baselines.

## Proposed first implementation milestone

Create the Astro shell without replacing production:

1. Add Astro config and package files on the refactor branch.
2. Move assets to `public/images/`.
3. Create `BaseLayout`, `Topbar`, `Footer`, tokens, and global styles.
4. Migrate only the homepage into `src/pages/index.astro`.
5. Preserve `/portfolio/` and `/portfolio/index.html`.
6. Compare homepage screenshots at 1440, 1024, and 390 against this baseline.
7. Do not migrate Meta Learn until homepage parity is close.

