# GitHub Pages deployment

`main` remains the production branch. The Pages workflow builds on pushes to `main` and can also be started manually, but its deployment job is restricted to `main`.

Before the workflow is used for production, GitHub Pages must be configured in the repository settings to use **GitHub Actions** as its publishing source. Do not change that setting until the Astro site has passed final review.

The default build base is `/portfolio`, matching the GitHub Pages project URL. A future custom-domain build can use the root base with:

```sh
PORTFOLIO_BASE=/ npm run build
```

Do not configure the custom domain yet. Merge `refactor/portfolio-foundation` into `main` only after the final route, visual, interaction and accessibility review is approved.
