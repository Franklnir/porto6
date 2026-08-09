---
key: school
title: "Platform Operasi Akademik Sekolah"
summary: "Platform multi-tenant untuk proses akademik, presensi RFID, data operasional, keamanan, dan observability."
overview: "Platform modular yang menyatukan banyak proses akademik dan perangkat RFID ke dalam satu alur."
year: 2026
order: 1
status: development
domain: ["Full-Stack", "Education", "RFID"]
technologies: ["Laravel 13", "Next.js", "PostgreSQL", "Redis", "MQTT"]
featured: false
repository: "https://github.com/Franklnir/edusmart-presensi.git"
presentation:
  kicker: "FULL-STACK · EDUCATION · RFID"
  category: "Full-Stack Engineering"
  cardSize: wide
  cardArtClass: "portfolio-detail-art--school"
  caseArtClass: "art-school"
  role: "System Architect & Full-Stack Engineer"
  timeline: "2026 — Ongoing"
  projectStatus: "Developed / Evolving"
caseStudy:
  problem: "Presensi, tugas, quiz, data siswa, laporan, dan perangkat RFID mudah membentuk silo. Operator berpindah konteks, data sulit dilacak, dan error tidak memiliki jejak konsisten."
  approach: "Laravel 13 digunakan sebagai API domain, Next.js sebagai frontend, PostgreSQL sebagai sumber data relasional, Redis untuk cache dan runtime, serta MQTT untuk event perangkat RFID."
  architecture:
    - "RFID / Web Client"
    - "MQTT / HTTPS"
    - "Laravel 13 API"
    - "Queue & Redis"
    - "PostgreSQL"
    - "Next.js Dashboard"
    - "Observability"
  decisions:
    - "Arsitektur modular menjaga domain akademik tetap terpisah tetapi konsisten."
    - "Typed API client mengurangi drift kontrak frontend-backend."
    - "X-Request-ID, Problem Details, idempotency, dan tenant scope memudahkan keamanan serta debugging."
  limitations: "Platform masih berkembang. Klaim skala produksi belum ditampilkan sebelum ada runtime benchmark yang dapat diverifikasi."
  nextIteration: "Menyelesaikan E2E runtime, load test, security regression, observability dashboard, dan OpenAPI penuh."
gallery:
  labels: ["Platform overview", "Academic operations", "RFID events", "System architecture"]
  manifest: "/assets/projects/platform-operasi-akademik/manifest.json"
  title: "Platform Operasi Akademik"
---

## Masalah

Proyek ini berangkat dari kebutuhan operasional yang perlu dipahami sebagai satu sistem, bukan sekadar kumpulan fitur.

## Pendekatan

Arsitektur disusun dari aktor, aliran data, state, event, integrasi, jalur kegagalan, keamanan, dan observability. Implementasi dilakukan secara bertahap dengan kontrak yang dapat diuji.

## Fokus engineering

- Struktur modular yang mudah dikembangkan.
- Data dan integrasi yang dapat ditelusuri.
- Performa, reliability, dan keamanan sebagai bagian dari desain.
- Dokumentasi untuk manusia dan coding agent.

## Status

Konten studi kasus ini disiapkan sebagai koleksi Astro. Ubah file Markdown ini untuk memperbarui halaman proyek tanpa menyentuh layout atau motion system.
