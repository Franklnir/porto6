---
key: cog
title: "Adaptasi Xiaozhi AI untuk ESP32-C3"
summary: "Adaptasi dan konfigurasi firmware Xiaozhi untuk ESP32-C3 Mini dengan audio I2S, push-to-talk, wake word, WiFi provisioning, WebSocket/MQTT, Opus, OLED opsional, dan MCP."
overview: "Prototype voice assistant low-cost berbasis upstream Xiaozhi yang diadaptasi pada board ESP32-C3 Mini, wiring INMP441/MAX98357A, kontrol perangkat, dan alur audio ke layanan Xiaozhi AI."
year: 2026
order: 2
status: development
domain: ["Voice AI", "Embedded", "IoT"]
technologies: ["ESP32-C3", "ESP-IDF 5.4+", "C++", "FreeRTOS", "I2S", "INMP441", "MAX98357A", "SSD1306", "ESP-SR", "Wake Word", "MQTT", "WebSocket", "UDP Audio", "Opus", "MCP", "NVS", "LVGL"]
featured: true
repository: "https://github.com/Franklnir/xiaozhi-AI-esp32c3-mini.git"
repositories:
  - label: "Xiaozhi AI ESP32-C3 Mini"
    url: "https://github.com/Franklnir/xiaozhi-AI-esp32c3-mini"
    scope: "Adaptasi board, konfigurasi hardware, dan firmware Xiaozhi untuk ESP32-C3 Mini."
presentation:
  kicker: "VOICE AI - EMBEDDED - ESP32"
  category: "AI & Embedded Systems"
  cardSize: narrow
  cardArtClass: "portfolio-detail-art--xiaozhi"
  caseArtClass: "art-cog"
  role: "Firmware Integrator & Hardware Prototyper"
  timeline: "2026 - Prototype"
  projectStatus: "Prototype / Integrated"
caseStudy:
  problem: "ESP32-C3 dengan flash dan resource terbatas harus menangani capture/playback audio, wake word atau push-to-talk, provisioning WiFi, reconnect, transport audio, status layar, dan kontrol lokal tanpa membuat alur percakapan tidak stabil."
  approach: "Project ini bukan firmware AI yang dibuat dari nol. Source berbasis upstream `xiaozhi-esp32` dan port ESP32-C3 `mniroy`, lalu diadaptasi melalui implementasi board, pinout bersama untuk I2S, konfigurasi INMP441/MAX98357A, tombol, OLED opsional, mode hands-free, reset WiFi, dan perintah lokal."
  functions:
    - title: "Audio percakapan dua arah"
      description: "Menangkap suara dari INMP441, mengirim audio terkompresi, menerima response, lalu memutarnya melalui MAX98357A dan speaker."
    - title: "Push-to-talk, hands-free, dan wake word"
      description: "Menyediakan beberapa mode interaksi agar pengguna dapat memulai percakapan melalui tombol, mode otomatis, atau pemicu suara."
    - title: "Provisioning dan pemulihan WiFi"
      description: "Menyimpan konfigurasi jaringan di NVS serta menyediakan reset melalui tombol atau konfirmasi suara tanpa flashing ulang."
    - title: "Transport AI dan MCP"
      description: "Membuka sesi WebSocket atau MQTT/UDP ke layanan Xiaozhi dan menerima tool command yang didukung melalui MCP."
    - title: "Kontrol serta status lokal"
      description: "Mengelola tombol, status koneksi, mode idle, perintah lagu lokal, dan tampilan SSD1306 opsional pada perangkat."
  workflow:
    - title: "Firmware menginisialisasi board"
      description: "ESP32-C3 memuat konfigurasi NVS, menyiapkan I2S, tombol, audio codec, dan layar opsional sesuai implementasi board."
    - title: "Perangkat memperoleh koneksi WiFi"
      description: "Kredensial tersimpan digunakan untuk terhubung; jika tidak tersedia atau di-reset, perangkat masuk ke alur provisioning."
    - title: "Pengguna memicu sesi bicara"
      description: "Push-to-talk, hands-free, atau wake word mengubah state perangkat dari idle menjadi listening."
    - title: "Audio ditangkap dan dikompresi"
      description: "INMP441 mengirim sampel I2S ke audio service untuk VAD/wake processing, buffering, dan encoding Opus."
    - title: "Audio dikirim ke layanan Xiaozhi"
      description: "Firmware memakai WebSocket atau MQTT control dengan UDP audio sesuai konfigurasi protocol aktif."
    - title: "Response atau tool command diproses"
      description: "Layanan mengembalikan audio percakapan atau instruksi MCP; firmware menerapkan command perangkat yang didukung."
    - title: "Jawaban diputar dan status diperbarui"
      description: "Audio response keluar melalui MAX98357A, sementara state koneksi dan percakapan ditampilkan pada OLED bila terpasang."
  architecture:
    - "INMP441 menangkap audio melalui bus I2S"
    - "Audio service menjalankan VAD, wake word, buffering, dan codec Opus"
    - "State machine mengatur push-to-talk, hands-free, idle, dan reconnect"
    - "WiFi membawa sesi melalui WebSocket atau MQTT control dengan UDP audio"
    - "Layanan Xiaozhi memproses percakapan dan mengirim response audio"
    - "MCP mengekspos tool/perintah perangkat yang didukung firmware"
    - "MAX98357A memutar response ke speaker"
    - "SSD1306 opsional dan tombol menampilkan serta mengubah status lokal"
  decisions:
    - "BCLK dan WS dibagi antara microphone dan amplifier untuk menekan penggunaan GPIO pada board ESP32-C3 Mini."
    - "Mode WebSocket serta MQTT/UDP dipertahankan karena keduanya sudah menjadi kontrak transport pada upstream Xiaozhi."
    - "NVS menyimpan konfigurasi WiFi, sedangkan tombol dan konfirmasi suara menyediakan reset tanpa flashing ulang."
    - "Hands-free dapat beralih ke low-power/wake-word setelah idle agar interaksi lokal tetap praktis."
    - "Perintah lagu dan kontrol lokal diproses pada firmware ketika tidak memerlukan round-trip penuh ke layanan AI."
  limitations: "Nilai engineering utama berada pada adaptasi board, konfigurasi hardware, dan integrasi upstream, bukan kepemilikan seluruh firmware Xiaozhi. Prototype tetap bergantung pada layanan online; latency, keamanan endpoint, stabilitas wake word, audio drop, dan konsumsi daya belum memiliki hasil uji publik."
  nextIteration: "Mencatat upstream dan versi port secara eksplisit, menambah release firmware reproducible, auth perangkat, provisioning aman, telemetry reconnect/audio drop, enclosure, serta pengujian latency dan daya pada hardware nyata."
gallery:
  labels: ["Voice device", "I2S audio", "Network protocol", "Device controls"]
  manifest: "/assets/projects/xiaozhi/manifest.json"
  title: "Xiaozhi AI ESP32-C3"
  featuredImages:
    - "08-xiaozhi-photo.png"
    - "07-xiaozhi-photo.png"
    - "17-xiaozhi-photo.png"
    - "11-xiaozhi-photo.png"
    - "10-xiaozhi-photo.png"
    - "05-xiaozhi-photo.png"
---

## Repo Yang Dicek

Repository utama: [xiaozhi-AI-esp32c3-mini](https://github.com/Franklnir/xiaozhi-AI-esp32c3-mini).

README menyatakan source berbasis proyek upstream `xiaozhi-esp32`, dengan port ESP32-C3 dari `mniroy`. Kontribusi pada repo ini paling tepat dijelaskan sebagai adaptasi board, konfigurasi hardware, dan integrasi firmware untuk ESP32-C3 Mini.

## Apa Yang Dibangun

Project ini adalah prototype perangkat asisten suara yang mengadaptasi Xiaozhi pada ESP32-C3 Mini. Audio INMP441 diproses oleh audio service, dikirim sebagai Opus lewat WebSocket atau jalur MQTT/UDP, lalu response diputar melalui MAX98357A. Firmware juga memuat push-to-talk, hands-free, wake word, provisioning/reset WiFi, OLED opsional, dan MCP.

## Fokus Implementasi

- Implementasi board dan pinout ESP32-C3 Mini untuk INMP441, MAX98357A, tombol, dan SSD1306.
- State interaction push-to-talk, hands-free, wake word, idle, serta reset kredensial melalui NVS.
- Audio Opus melalui WebSocket atau MQTT control dengan UDP audio.
- Integrasi MCP dan perintah lokal tanpa mengklaim layanan AI upstream sebagai implementasi sendiri.

## Status

Adaptasi sudah berbentuk firmware prototype. Tahap berikutnya adalah versioning upstream yang jelas, release reproducible, hardening provisioning/auth, dan pengujian latency, daya, wake word, serta audio drop.
