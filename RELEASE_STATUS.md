# Release Status

## Yang sudah siap

- Source Astro + TypeScript strictest.
- Content Collections untuk project.
- Static output untuk Vercel dan Cloudflare.
- SEO, sitemap, robots, JSON-LD, Open Graph.
- Unit, E2E, structure, lint, type, and build scripts.
- Preview lokal tanpa dependency melalui `START_LOCAL.bat` / `start-local.sh`.
- Snapshot visual lengkap untuk regression check.
- Dokumentasi arsitektur, motion, content, deployment, dan quality gates.

## Definition of Done sebelum produksi

Production certification hanya diberikan setelah `npm run verify:full` berhasil pada mesin yang memiliki akses registry npm dan browser Playwright. Jangan melewati gate ini.
