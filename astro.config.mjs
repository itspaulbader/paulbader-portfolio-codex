import { defineConfig } from 'astro/config';

const base = process.env.PORTFOLIO_BASE ?? '/portfolio';

export default defineConfig({
  site: 'https://itspaulbader.github.io',
  base,
  output: 'static',
  build: {
    format: 'file'
  }
});
