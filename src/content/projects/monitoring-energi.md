---
key: energy
title: "Monitoring & Otomasi Energi"
summary: "Sistem dua repo: dashboard React/Supabase dan firmware ESP32-S3 untuk PZEM-004T v3, BME280, BH1750, telemetri listrik, estimasi biaya, command, serta relay 4 channel."
overview: "Sistem monitoring dan otomasi energi yang memisahkan firmware akuisisi/kontrol dari dashboard analitik, lalu menghubungkannya melalui Supabase REST, PostgreSQL, dan Realtime."
year: 2026
order: 3
status: development
domain: ["IoT", "Energy", "Realtime"]
technologies: ["ESP32-S3 Mini", "Arduino C++", "PZEM-004T v3", "BME280", "BH1750", "UART", "I2C", "ArduinoJson", "Preferences NVS", "HTTPS REST", "Supabase PostgreSQL", "Supabase Realtime", "React 18", "Vite", "Chart.js", "react-chartjs-2", "Lucide"]
featured: false
repository: "https://github.com/Franklnir/Dasboard-monitor-listrik.git"
repositories:
  - label: "Dashboard Monitoring Listrik"
    url: "https://github.com/Franklnir/Dasboard-monitor-listrik"
    scope: "Dashboard React, visualisasi Chart.js, Supabase Realtime, biaya energi, dan kontrol relay."
  - label: "Firmware Sensor PZEM"
    url: "https://github.com/Franklnir/sensor-pzem-004t-v4"
    scope: "Firmware ESP32-S3 untuk PZEM-004T, BME280, BH1750, kalibrasi, telemetri, dan relay."
presentation:
  kicker: "IOT - ENERGY - AUTOMATION"
  category: "IoT Automation"
  cardSize: narrow
  cardArtClass: "portfolio-detail-art--energy"
  caseArtClass: "art-energy"
  role: "IoT Systems Engineer"
  timeline: "2025 - Prototype"
  projectStatus: "Designed / Prototype"
caseStudy:
  problem: "Nilai listrik, kondisi lingkungan, biaya, state relay, dan command perangkat tidak boleh dicampur dalam satu payload tanpa histori. Sistem juga harus menahan noise sensor, menjaga kalibrasi energi, dan menyinkronkan kontrol dashboard dengan aktuator active-low."
  approach: "Firmware ESP32-S3 membaca PZEM-004T melalui UART dan BME280/BH1750 melalui I2C, menerapkan trimmed mean, EMA, auto-zero, kalibrasi dua titik, serta Preferences NVS. Telemetri dikirim lewat HTTPS REST ke Supabase; dashboard React memuat histori dan subscribe INSERT Realtime, lalu menulis state relay serta device command kembali ke tabel terpisah."
  functions:
    - title: "Pengukuran listrik lengkap"
      description: "Membaca tegangan, arus, daya aktif, daya semu, daya reaktif, frekuensi, power factor, dan energi dari PZEM-004T v3."
    - title: "Pemantauan kondisi lingkungan"
      description: "Mengambil suhu, kelembapan, tekanan, altitude, dan intensitas cahaya dari BME280 serta BH1750."
    - title: "Filtering dan kalibrasi perangkat"
      description: "Menjalankan trimmed mean, EMA, auto-zero, kalibrasi dua titik, recovery I2C, dan penyimpanan parameter di Preferences NVS."
    - title: "Dashboard real-time dan histori"
      description: "Menampilkan data Supabase Realtime dalam chart, ringkasan periode, peak load, dan indikator kondisi perangkat."
    - title: "Analisis energi dan biaya"
      description: "Menghitung konsumsi harian/bulanan, estimasi biaya rupiah, target budget, dan perbandingan periode pada dashboard."
    - title: "Kontrol empat relay"
      description: "Mendukung mode manual/auto, rule suhu/kelembapan/cahaya, jadwal, debounce, guard, dan command perangkat."
  workflow:
    - title: "Sensor dibaca oleh ESP32-S3"
      description: "PZEM-004T berkomunikasi melalui UART, sedangkan BME280 dan BH1750 menggunakan bus I2C."
    - title: "Data dibersihkan dan dikalibrasi"
      description: "Firmware menghapus outlier, meratakan noise, menerapkan offset/scale tersimpan, serta memulihkan I2C ketika bus bermasalah."
    - title: "Telemetri dikirim ke Supabase"
      description: "Payload perangkat dikirim melalui HTTPS REST ke tabel monitoring_log dengan timestamp serta identitas device."
    - title: "Dashboard memuat histori dan update baru"
      description: "React mengambil data awal periode terpilih lalu berlangganan event INSERT Supabase Realtime untuk pembaruan berikutnya."
    - title: "Data diolah menjadi grafik dan biaya"
      description: "Chart.js membentuk visualisasi; kalkulasi frontend merangkum energi, biaya, peak watt, budget, dan statistik periode."
    - title: "Pengguna mengubah relay atau rule"
      description: "Dashboard menulis state relay, mode otomatis, jadwal, atau device command ke tabel yang sesuai."
    - title: "Firmware menerapkan aksi dan melaporkan state"
      description: "Perangkat membaca konfigurasi, menjalankan guard/rate limit, menggerakkan relay active-low, lalu mengirim state pada telemetri berikutnya."
  architecture:
    - "PZEM-004T, BME280, dan BH1750 menghasilkan data listrik serta lingkungan"
    - "ESP32-S3 menjalankan filtering, auto-zero, kalibrasi, NTP WIB, dan I2C recovery"
    - "HTTPS REST mengirim telemetri berkala ke Supabase"
    - "PostgreSQL memisahkan monitoring_log, relay_channel, dan device_commands"
    - "Supabase Realtime mendorong INSERT dan perubahan konfigurasi ke dashboard"
    - "React/Vite dan Chart.js menyajikan chart, biaya, budget, serta analisis periode"
    - "Dashboard menulis mode manual/auto, rule, jadwal, dan command reset"
    - "Firmware menerapkan guard/rate limit lalu menggerakkan empat relay active-low"
  decisions:
    - "Telemetry, state relay, dan command dipisahkan agar histori append-only tidak tertimpa oleh konfigurasi saat ini."
    - "Lima pembacaan dengan trimmed mean dan EMA dipakai untuk meredam outlier sebelum data dikirim."
    - "Kalibrasi energi disimpan di NVS agar perangkat tidak kehilangan parameter ketika restart."
    - "Dashboard mengambil histori 30 hari, membatasi data aktif, lalu memakai Realtime untuk update tanpa polling penuh."
    - "Relay memiliki debounce, guard, rate limit, mode manual/auto, dan schedule supaya aktuasi tidak mengikuti noise secara langsung."
  limitations: "Firmware dan dashboard masih menyimpan credential/config sensitif di source, contoh RLS terlalu luas, dan repo dashboard menyertakan artefak yang seharusnya tidak di-version-control. Instalasi tegangan tinggi juga belum boleh dianggap production tanpa fail-safe, enclosure, dan review keselamatan."
  nextIteration: "Rotasi seluruh credential, pindahkan secret ke provisioning aman, sempitkan RLS per device/user, rapikan repository, tambah offline buffer dan audit command, fail-safe relay, alert threshold, serta uji kalibrasi dengan alat referensi dan beban nyata."
gallery:
  labels: ["Energy overview", "Live telemetry", "Automation rules", "Load control"]
  manifest: "/assets/projects/monitoring-energi/manifest.json"
  title: "Monitoring Listrik"
---

## Repo Yang Dicek

Repository dashboard: [Dasboard-monitor-listrik](https://github.com/Franklnir/Dasboard-monitor-listrik).

Repository firmware: [sensor-pzem-004t-v4](https://github.com/Franklnir/sensor-pzem-004t-v4). Kedua repo merupakan bagian dari satu sistem: repo pertama menangani visualisasi dan kontrol, repo kedua menangani sensor serta aktuator.

## Apa Yang Dibangun

Firmware ESP32-S3 membaca tegangan, arus, daya aktif/apparent/reactive, frekuensi, power factor, energi, suhu, kelembapan, tekanan, dan cahaya. Dashboard menampilkan histori Realtime, biaya, peak watt, budget, analisis mingguan/bulanan, serta kontrol empat relay.

## Fokus Implementasi

- Filtering trimmed mean, EMA, auto-zero, kalibrasi dua titik, NVS, NTP WIB, dan pemulihan bus I2C pada firmware.
- Tabel `monitoring_log`, `relay_channel`, dan `device_commands` memisahkan histori, konfigurasi, dan aksi remote.
- Supabase Realtime mengalirkan perubahan ke dashboard React/Chart.js.
- Kontrol relay manual/auto berbasis suhu, kelembapan, cahaya, jadwal, debounce, dan guard.

## Status

Project valid sebagai satu sistem dari dua repo. Prioritas berikutnya adalah rotasi secret, RLS yang ketat, kebersihan repository, safety relay, offline buffer, dan kalibrasi sebelum digunakan pada instalasi listrik nyata.
