---
key: cctv
title: "Smart CCTV Tracker"
summary: "Eksperimen computer vision untuk pelacakan objek dan penyajian event yang dapat ditinjau kembali."
overview: "Eksplorasi pipeline kamera, tracking, dan notifikasi untuk membuat pemantauan lebih aktif."
year: 2026
order: 5
status: development
domain: ["AI", "Computer Vision", "Security"]
technologies: ["Python", "OpenCV", "FastAPI"]
featured: false
presentation:
  kicker: "COMPUTER VISION · REAL-TIME"
  category: "Computer Vision"
  cardSize: narrow
  cardArtClass: "art-cctv"
  caseArtClass: "art-cctv"
  role: "Computer Vision Engineer"
  timeline: "2025 — Exploration"
  projectStatus: "Explored / Prototype"
caseStudy:
  problem: "CCTV tradisional lebih banyak berfungsi sebagai rekaman pasif."
  approach: "Sumber video mengirim stream ke server pemrosesan. Computer vision melakukan deteksi atau tracking, lalu event tertentu menghasilkan notifikasi."
  architecture:
    - "ESP32-CAM"
    - "Streaming Server"
    - "Vision Pipeline"
    - "Object Tracking"
    - "Event Rules"
    - "Notification"
    - "Operator Review"
  decisions:
    - "Pemrosesan dipindahkan ke server karena perangkat kamera terbatas."
    - "Tracking mengikuti objek, bukan menyimpulkan niat atau identitas."
    - "Notifikasi tetap memerlukan verifikasi manusia."
  limitations: "Akurasi dipengaruhi pencahayaan, sudut, occlusion, jaringan, dan dataset."
  nextIteration: "Menguji false positive, privacy masking, threshold, dan dashboard review manusia."
gallery:
  labels: ["Camera source", "Video stream", "Object tracking", "Operator alert"]
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
