# Irsyad Portfolio — Astro + TypeScript

Portofolio engineering berbasis **Astro 7**, **TypeScript strictest**, Content Collections, static rendering, dan motion system progresif. Proyek disiapkan untuk Vercel dan Cloudflare, serta menyertakan preview lokal instan untuk memeriksa seluruh visual tanpa menunggu instalasi dependency.

## Coba langsung di lokal

### Windows

Klik dua kali:

```text
START_LOCAL.bat
```

### Linux/macOS

```bash
./start-local.sh
```

Kemudian buka `http://127.0.0.1:4321`.

## Development Astro

Astro 7 membutuhkan Node.js 22.12+.

```bash
npm run doctor
npm install
cp .env.example .env
npm run dev
```

## Quality gate

```bash
npm run verify
npm run test:e2e:install
npm run test:e2e
```

## Struktur

- `src/pages`: route Astro.
- `src/content/projects`: studi kasus tervalidasi schema.
- `src/features`: komponen dan controller per domain.
- `src/styles`: tokens, global styles, transitions, dan parity styles.
- `tests`: unit dan Playwright E2E.
- `preview-static`: snapshot lengkap yang dapat dijalankan tanpa dependency.
- `docs`: arsitektur, motion, konten, deployment, dan quality gates.
- `legacy`: source historis untuk regression reference, bukan source utama pengembangan.

Baca `docs/LOCAL_DEVELOPMENT.md` untuk workflow lokal dan `RELEASE_STATUS.md` untuk definition of done.
