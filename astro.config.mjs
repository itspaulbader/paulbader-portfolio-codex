import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://itspaulbader.github.io',
  base: '/portfolio',
  output: 'static',
  build: {
    format: 'file'
  }
});
