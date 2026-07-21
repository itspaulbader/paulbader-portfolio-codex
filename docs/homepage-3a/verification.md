# Homepage Milestone 3A Verification

## Scope

- Refined the homepage story rail, spacing rhythm, typography, and project-card system.
- Added typed, replaceable visual slots for story and project media.
- Kept existing content, carousel behavior, route order, and placeholder artwork.
- Made Meta Learn the only navigable homepage case; unavailable projects remain non-navigating.
- No Meta Learn page source was changed.

## Viewports

| Viewport | Story end: before -> after | Project cards: before -> after | Page height: before -> after |
| --- | --- | --- | --- |
| 1440 x 900 | 948.5px -> 992.6px | 1440 x 900 -> 1260 x 820 | 5057px -> 4973px |
| 1024 x 768 | 842.2px -> 895.9px | 1024px wide, mixed heights -> 960 x 712 | 4768px -> 4347px |
| 390 x 844 | 851.0px -> 863.6px | 390 x 844 -> 350 x 804 | 4650px -> 4627px |

Intentional differences are the clearer story-card peek, slightly more breathing room before Work, inset project cards, consistent card gaps/radii, and shorter tablet project cards. No viewport produced horizontal page overflow.

Representative screenshots:

- `home-1440x900.png`
- `home-1024x768.png`
- `home-390x844.png`

## Interaction Results

- Story rail renders four cards and four progress controls.
- Autoplay advanced from highlight 1 to 2 after 5 seconds.
- Pause held the same card and scroll position for another 5 seconds.
- Dot navigation returned to highlight 1 and horizontal scrolling snapped to highlight 2.
- Desktop and mobile project images switched to their respective data sources.
- All four project cards rendered.
- Bershka, Sheer, and Grundfos rendered without links.
- Meta Learn remained the only case link and opened `/portfolio/meta-learn.html` successfully.
- Forced reduced motion started the gallery paused, announced the control as Play, kept highlight 1 active after 6.5 seconds, and used the video-pause code path.

## Health Checks

- `npm run build`: passed.
- Homepage console warnings/errors: none.
- Homepage local image failures: none.
- Homepage external video error: none.
- Meta Learn local and live mobile hero views matched; its source files were untouched.

## Milestone 3A.1 Foundation Correction

- Reduced `src/styles/home.css` from 1,044 to 880 lines while preserving the rendered 3A result.
- Removed the retired hero/work-history stack, legacy project image wrappers/background helpers, unused story arrows/track, legacy highlight-card content, and retired fifth story-card selector groups.
- Consolidated shared tablet/mobile project-card rules and retained only selectors used by current markup, generated carousel/progress states, footer reveal states, or the documented future inside-caption state.
- Added typed `captionPlacement` support; all four current stories remain `outside`.
- Routed project image icons through `assetPath()`.

Exact commit-to-commit computed-style and geometry comparisons against `962ea7f8a275548b0abe9e7059e86500d3ad8d15` found zero differences at 1440 x 900, 1024 x 768, and 390 x 844. Page heights remained 4,973px, 4,347px, and 4,627px respectively. Existing screenshots remain valid; the only capture variance was the external autoplaying video frame.

- Default `/portfolio` build: passed; icon paths resolve under `/portfolio/images/`.
- `PORTFOLIO_BASE=/` build: passed; icon paths resolve under `/images/`.
- Carousel autoplay, pause, dot navigation, and scroll snapping passed.
- Reduced motion starts paused, shows the play control, and leaves the external video paused.
- All four projects render, only Meta Learn is linked, no image/video failures or horizontal overflow were found, and the browser console remained clean.
- Meta Learn source files were unchanged.
