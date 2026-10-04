import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://produk.irsyadlabs.id',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  server: {
    port: 4322,
    host: '127.0.0.1',
  },
});
