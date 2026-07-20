# Milestone 2E verification

Baseline commit: `77d5acaca698cee4645b73b432b7cc422ef77b18`

## Route cutover

- `/portfolio/`: 200
- `/portfolio/index.html`: 200
- `/portfolio/meta-learn.html`: 200
- `/portfolio/404.html`: 200
- `/portfolio/meta-learn-next.html`: 404, as expected
- Meta Learn title: `Meta Learn — Paul Bader`
- Robots `noindex` metadata: absent
- Homepage Meta Learn card destination: `meta-learn.html`

## Build and deployment checks

- Default `/portfolio` production build: passed
- Simulated root build with `PORTFOLIO_BASE=/`: passed
- Root build contains no `/portfolio/images` or `/portfolio/_astro` assumptions
- GitHub Actions workflow parsed as valid YAML and its required trigger, permission, build, artifact and deploy declarations were verified
- Workflow deployment is restricted to `main`

## Visual regression

The route cutover made no changes under `src/components`, `src/styles`, `src/scripts`, `src/data`, `src/layouts` or `src/pages/index.astro` compared with the Milestone 2D baseline. The Meta Learn body composition is unchanged; only its route filename, document title and removed robots metadata differ.

At `1440 × 900`, `1024 × 768` and `390 × 844`, both pages retained the requested viewport width, had no horizontal overflow and reported no failed image elements. The in-app browser's high-density screenshot compositor tiled sticky content during full-page capture, so those invalid captures were not retained as comparison artifacts.

## Interaction regression

- Homepage highlights: 4 controls, play/pause toggles, direct selection updates the active item
- Homepage work rail: 4 project cards and 4 progress controls; exactly one active state
- Homepage Meta Learn navigation: reaches `/portfolio/meta-learn.html`
- Meta Learn highlights: 6 controls, play/pause toggles, direct selection and parallax rail remain active
- Research rail: next control advances the rail
- Research modal: opens the correct content, locks body scroll, traps Tab and Shift+Tab, closes with Escape and an outside click, and restores the exact trigger
- Desktop slider: `50 → 55 → 5 → 95`; pointer click returns it to `50`
- Mobile slider: `50 → 55 → 6 → 94`
- Goals: scroll-triggered background and grouped bubble transforms remain active
- Wireframes: continuous `wfScroll` animation remains active
- Validation: reveal state and both result bars complete
- Design Explore: desktop selection expands screen 2; mobile selection activates screen 2 without desktop expansion
- Mobile feature rail: touch-equivalent horizontal scrolling advances the rail
- More Work: next paddle and touch-equivalent scrolling work; IDs are `bershka`, `sheer`, `grundfos`
- More Work placeholders remain non-links with no nested interactive controls
- Section progress: 11 controls with exactly one current item
- Responsive imagery switches between Bershka desktop and mobile assets
- Reduced-motion guards and media-query rules are unchanged from the runtime-tested Milestone 2D baseline

## Runtime health

- Browser console errors/warnings: 0
- Local asset failures: 0 of 25
- External Framer asset failures: 0 of 8
- Broken completed images: 0

## Legacy integrity

The root legacy `index.html`, `meta-learn.html`, `components.js`, `case-study.css` and `404.html` remain unchanged from Milestone 2D.
