# Menjalankan di Lokal

## Preview instan tanpa instalasi dependency

Windows: klik dua kali `START_LOCAL.bat`.

Linux/macOS:

```bash
./start-local.sh
```

Buka `http://127.0.0.1:4321`. Preview ini memakai snapshot lengkap yang disertakan, sehingga visual dan animasi dapat diperiksa sebelum `npm install`.

## Menjalankan proyek Astro

Persyaratan: Node.js 22.12 atau lebih baru.

```bash
npm run doctor
npm install
cp .env.example .env
npm run dev
```

Buka URL yang ditampilkan Astro, biasanya `http://localhost:4321`.

## Validasi produksi

```bash
npm run verify
npm run test:e2e:install
npm run test:e2e
npm run preview
```

`npm run verify` menjalankan pemeriksaan environment, struktur, TypeScript/Astro, lint, unit test, dan production build.
