---
key: iot-control
title: "IoT Device Control & Automation System"
summary: "Sistem kontrol perangkat berbasis ESP32 yang mengintegrasikan sensor, relay, dan antarmuka web untuk otomasi terjadwal serta berbasis kondisi sensor."
overview: "Platform IoT end-to-end yang menghubungkan perangkat ESP32 dengan sensor dan aktuator, menyediakan antarmuka web untuk monitoring dan kontrol, serta menjalankan otomasi berbasis jadwal dan kondisi sensor secara real-time."
year: 2025
order: 9
status: development
domain: ["IoT", "Automation", "Embedded"]
technologies: ["ESP8266", "Arduino C++", "DHT22", "Relay 4 Channel", "Web Server", "WiFi", "HTML", "CSS", "JavaScript", "Real-Time Monitoring", "Sensor Integration"]
featured: false
repository: "https://github.com/Franklnir/ESP8266-DHT22-Relay-control.git"
repositories:
  - label: "IoT Device Control"
    url: "https://github.com/Franklnir/ESP8266-DHT22-Relay-control"
    scope: "Dashboard pengontrol relay 4 channel dan monitoring suhu menggunakan ESP8266 + DHT22."
presentation:
  kicker: "IOT - AUTOMATION - ESP32"
  category: "IoT Automation"
  cardSize: narrow
  cardArtClass: "art-iot-control"
  caseArtClass: "art-iot-control"
  role: "IoT Systems Engineer"
  timeline: "2025"
  projectStatus: "Developed"
caseStudy:
  problem: "Pengendalian perangkat IoT sering terpisah antara monitoring sensor, kontrol aktuator, dan penjadwalan. Tanpa sistem terintegrasi, pengguna harus beralih antar aplikasi atau mengontrol perangkat secara manual."
  approach: "Firmware ESP32 mengintegrasikan pembacaan sensor, kontrol relay, dan komunikasi MQTT/HTTP. Antarmuka web menyediakan dashboard monitoring dan kontrol. Mesin aturan menjalankan otomasi berdasarkan kondisi sensor atau jadwal yang telah ditentukan."
  functions:
    - title: "Monitoring sensor real-time"
      description: "Membaca dan menampilkan data sensor (suhu, kelembapan, cahaya, dll.) secara real-time melalui MQTT dan antarmuka web."
    - title: "Kontrol relay manual"
      description: "Mengontrol perangkat melalui relay secara manual dari antarmuka web atau command MQTT."
    - title: "Otomasi berbasis kondisi"
      description: "Menjalankan aksi otomatis pada relay berdasarkan threshold sensor, misalnya menyalakan kipas saat suhu melebihi batas."
    - title: "Penjadwalan tugas"
      description: "Menjalankan aksi pada waktu tertentu menggunakan scheduler, misalnya menyalakan lampu pada jam tertentu."
    - title: "Antarmuka web dashboard"
      description: "Menyediakan dashboard responsif untuk monitoring data sensor, status perangkat, dan kontrol relay."
    - title: "Komunikasi MQTT"
      description: "Menggunakan MQTT sebagai transport utama untuk komunikasi antara perangkat, broker, dan klien."
  workflow:
    - title: "ESP32 membaca sensor"
      description: "Firmware mengambil data dari sensor yang terhubung secara periodik."
    - title: "Data dikirim ke broker MQTT"
      description: "Payload sensor dipublish ke topic MQTT yang sesuai untuk dikonsumsi oleh subscriber."
    - title: "Dashboard menampilkan data"
      description: "Antarmuka web subscribe topic MQTT dan menampilkan data sensor secara real-time."
    - title: "Pengguna mengirim command"
      description: "Dashboard mempublish command kontrol relay ke topic MQTT yang sesuai."
    - title: "ESP32 menerima dan menjalankan command"
      description: "Firmware subscribe command topic, memvalidasi, dan mengaktifkan relay yang diminta."
    - title: "Otomasi berjalan otomatis"
      description: "Mesin aturan pada firmware memeriksa kondisi sensor dan menjalankan aksi relay tanpa intervensi pengguna."
    - title: "Jadwal dieksekusi"
      description: "Scheduler pada firmware menjalankan aksi yang telah dijadwalkan pada waktu yang ditentukan."
  architecture:
    - "ESP32 menangani pembacaan sensor, kontrol relay, dan logika otomasi"
    - "MQTT broker mengalirkan data sensor dan command antara perangkat dan klien"
    - "Antarmuka web subscribe data dan publish command melalui MQTT"
    - "Mesin aturan memproses threshold sensor dan memicu aksi otomatis"
    - "Scheduler mengeksekusi tugas berdasarkan waktu yang telah ditentukan"
  decisions:
    - "MQTT dipilih sebagai transport utama karena ringan, mendukung pub/sub, dan cocok untuk perangkat embedded."
    - "Otomasi dijalankan pada firmware agar tetap berfungsi meski koneksi ke broker terputus."
    - "Antarmuka web menggunakan pendekatan responsif agar dapat diakses dari berbagai perangkat."
    - "Relay dikontrol melalui GPIO ESP32 langsung untuk merespon secara cepat."
  limitations: "Belum ada autentikasi pada MQTT dan antarmuka web. Konfigurasi aturan otomasi masih hardcode. Belum ada histori data atau logging. Tidak ada fail-safe jika sensor gagal membaca."
  nextIteration: "Menambahkan autentikasi MQTT dan web, konfigurasi aturan melalui UI, histori data dan grafik, fail-safe mechanism, OTA firmware update, dan integrasi dengan platform cloud."
gallery:
  labels: ["Device setup", "Web dashboard", "Automation rules", "Sensor data"]
  title: "IoT Device Control"
---

## Apa Yang Dibangun

IoT Device Control & Automation System adalah platform yang mengintegrasikan ESP32 dengan sensor dan relay, menyediakan antarmuka web untuk monitoring dan kontrol, serta menjalankan otomasi berbasis kondisi sensor dan jadwal.

## Fokus Implementasi

- Firmware ESP32 untuk pembacaan sensor, kontrol relay, dan logika otomasi.
- MQTT sebagai transport komunikasi antara perangkat, broker, dan klien.
- Antarmuka web responsif untuk dashboard monitoring dan kontrol.
- Mesin aturan untuk otomasi berdasarkan threshold sensor.
- Scheduler untuk penjadwalan tugas berbasis waktu.

## Status

Project telah dikembangkan sebagai prototype IoT automation. Prioritas berikutnya adalah autentikasi, konfigurasi aturan via UI, histori data, fail-safe, dan OTA update.
