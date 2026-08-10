---
key: cog
title: "Xiaozhi AI — Asisten Pintar Suara"
summary: "Asisten suara modular yang menghubungkan speech pipeline, tool execution, dan layanan AI secara terukur."
overview: "Eksperimen asisten suara berbasis perangkat yang terhubung ke model AI dan tool eksternal."
year: 2026
order: 2
status: development
domain: ["Voice AI", "MCP", "Embedded"]
technologies: ["ESP32", "FastAPI", "Python", "MCP", "OpenAI"]
featured: true
repository: "https://github.com/Franklnir/xiaozhi-AI-esp32c3-mini.git"
presentation:
  kicker: "VOICE AI · MCP · EMBEDDED"
  category: "AI & Embedded Systems"
  cardSize: narrow
  cardArtClass: "portfolio-detail-art--xiaozhi"
  caseArtClass: "art-cog"
  role: "AI & Embedded Engineer"
  timeline: "2026 — Prototype"
  projectStatus: "Prototype / Integrated"
caseStudy:
  problem: "Voice assistant tertutup sulit dihubungkan dengan workflow atau tool buatan sendiri."
  approach: "ESP32 menangani perangkat dan input dasar, sedangkan FastAPI menjadi jembatan ke model AI serta MCP server."
  architecture:
    - "Microphone / Input"
    - "ESP32 Device"
    - "Network Gateway"
    - "FastAPI Service"
    - "AI Model"
    - "MCP Tools"
    - "Audio / Action Output"
  decisions:
    - "FastAPI efektif untuk layanan AI asynchronous."
    - "MCP memisahkan model dari tool agar kapabilitas dapat diperluas."
    - "Perangkat dan layanan AI dipisah supaya keterbatasan embedded tidak menjadi bottleneck utama."
  limitations: "Masih berupa prototype. Latensi, privasi audio, fallback offline, dan keamanan tool perlu pengujian."
  nextIteration: "Menambahkan autentikasi perangkat, permission per tool, streaming audio stabil, dan observability."
gallery:
  labels: ["Voice device", "Speech pipeline", "AI service bridge", "MCP tools"]
  manifest: "/assets/projects/xiaozhi/manifest.json"
  title: "Xiaozhi AI device"
  featuredImages:
    - "08-xiaozhi-photo.png"
    - "07-xiaozhi-photo.png"
    - "17-xiaozhi-photo.png"
    - "11-xiaozhi-photo.png"
    - "10-xiaozhi-photo.png"
    - "05-xiaozhi-photo.png"
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
