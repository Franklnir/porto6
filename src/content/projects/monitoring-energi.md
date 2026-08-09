---
key: energy
title: "Monitoring & Otomasi Energi"
summary: "Sistem telemetry dan otomasi untuk memantau konsumsi, kejadian, serta kontrol perangkat secara real-time."
overview: "Sistem untuk memberi visibilitas konsumsi listrik dan mengendalikan beban berdasarkan aturan."
year: 2026
order: 3
status: development
domain: ["IoT", "Energy", "Realtime"]
technologies: ["ESP32", "MQTT", "Mosquitto", "Firebase"]
featured: false
presentation:
  kicker: "IOT · ENERGY · AUTOMATION"
  category: "IoT Automation"
  cardSize: narrow
  cardArtClass: "portfolio-detail-art--energy"
  caseArtClass: "art-energy"
  role: "IoT Systems Engineer"
  timeline: "2025 — Prototype"
  projectStatus: "Designed / Prototype"
caseStudy:
  problem: "Pengguna sering baru mengetahui konsumsi setelah tagihan diterima dan tidak memiliki kontrol otomatis berbasis kondisi."
  approach: "Sensor energi mengirim telemetry melalui ESP32, disimpan untuk histori, lalu aturan jadwal atau fuzzy logic dapat memicu relay."
  architecture:
    - "PZEM / Sensor"
    - "ESP32"
    - "MQTT / Firebase"
    - "Monitoring API"
    - "Database"
    - "Rule / Fuzzy Logic"
    - "Relay / Load"
  decisions:
    - "Komunikasi real-time menghindari polling agresif."
    - "Kontrol relay dipisahkan dari dashboard."
    - "Fuzzy logic digunakan saat keputusan tidak cukup direpresentasikan oleh kondisi biner."
  limitations: "Instalasi tegangan tinggi memerlukan proteksi dan review keselamatan oleh pihak berkualifikasi."
  nextIteration: "Menguji akurasi sensor, fail-safe relay, local broker, audit event, dan mode offline."
gallery:
  labels: ["Energy overview", "Live telemetry", "Automation rules", "Load control"]
  manifest: "/assets/projects/monitoring-energi/manifest.json"
  title: "Monitoring Listrik"
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
