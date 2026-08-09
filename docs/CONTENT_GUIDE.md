# Content Guide

## Project

Setiap project disimpan sebagai Markdown di `src/content/projects/`. Frontmatter adalah sumber tunggal untuk card homepage, featured project, overlay detail, galeri, dan route `/projects/[id]/`.

Schema lengkap berada di `src/content.config.ts`. Contoh minimal yang valid:

```yaml
---
key: weather
title: "Nama project"
summary: "Ringkasan singkat untuk metadata dan card."
overview: "Penjelasan konteks project."
year: 2026
order: 6
status: development
domain: ["IoT", "AI"]
technologies: ["Astro", "TypeScript"]
featured: false
presentation:
  kicker: "IOT / AI"
  category: "IoT Engineering"
  cardSize: narrow
  cardArtClass: "portfolio-detail-art--weather"
  caseArtClass: "art-weather"
  role: "System Engineer"
  timeline: "2026 - Ongoing"
  projectStatus: "Development"
caseStudy:
  problem: "Masalah operasional yang diselesaikan."
  approach: "Pendekatan sistem dan teknologi."
  architecture: ["Device", "API", "Database", "Dashboard"]
  decisions: ["Keputusan engineering utama."]
  limitations: "Batasan project saat ini."
  nextIteration: "Tahap pengembangan berikutnya."
gallery:
  labels: ["Overview"]
  featuredImages: []
---
```

`repository`, `gallery.manifest`, dan `gallery.title` bersifat opsional. Nilai `key` harus mengikuti enum pada schema. Jalankan `npm run check` setelah mengubah frontmatter.

## Galeri

- Simpan aset di `public/assets/projects/<slug>/`.
- Untuk galeri berbasis manifest, isi `gallery.manifest` dengan path publik yang diawali `/`.
- Jangan menulis daftar gambar yang sama di fragment HTML atau client script.
- Jalankan `npm run assets:projects` untuk memperbarui manifest gallery yang dikelola generator.

## Homepage Statis

Untuk teks section statis yang masih menggunakan fragment, edit file terkait di `src/features/portfolio/fragments/sections/`. Jangan mengubah ID, class motion, atau `data-*` sebelum memeriksa modul pemiliknya di `src/features/portfolio/client/`.
