# Content Guide

## Project

Tambah file Markdown di `src/content/projects/`. Frontmatter divalidasi oleh `src/content.config.ts`.

```yaml
---
title: Nama proyek
summary: Ringkasan singkat
year: 2026
order: 7
status: development
domain: [IoT, AI]
technologies: [Astro, TypeScript]
featured: false
---
```

Route `/projects/[id]/` dibuat otomatis dari nama file.

## Homepage legacy

Untuk perubahan kecil pada teks homepage, edit fragment section yang sesuai. Jangan mengubah ID atau data attribute sebelum memeriksa modul motion yang menggunakannya.
