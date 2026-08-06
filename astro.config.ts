import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://portfolio.example.com',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    responsiveStyles: true,
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        jpeg: { quality: 82, mozjpeg: true, progressive: true },
        webp: { quality: 80, effort: 4 },
        avif: { quality: 72, effort: 4 },
      },
    },
  },
  vite: {
    build: {
      sourcemap: true,
      cssCodeSplit: true,
    },
  },
});
