---
key: cctv
title: "ESP32-CAM CCTV Telegram Monitor"
summary: "Prototype kamera ESP32-CAM AI Thinker dengan MJPEG stream lokal, capture JPEG/BMP, kontrol Telegram, status perangkat, dan perekaman sequence frame ke SD card."
overview: "Kamera IoT ringan yang menyediakan jalur lokal untuk live stream dan jalur remote melalui Telegram untuk command, snapshot, status, serta preview hasil recording tanpa backend aplikasi khusus."
year: 2026
order: 5
status: development
domain: ["IoT", "Camera", "Security"]
technologies: ["ESP32-CAM AI Thinker", "OV2640", "Arduino C++", "esp_camera", "ESP HTTP Server", "MJPEG", "JPEG/BMP", "PSRAM", "WiFi", "WiFiClientSecure", "Telegram Bot API", "ArduinoJson", "SD_MMC"]
featured: false
repository: "https://github.com/Franklnir/esp32-cam-Ai-thinker.git"
repositories:
  - label: "ESP32-CAM AI Thinker"
    url: "https://github.com/Franklnir/esp32-cam-Ai-thinker"
    scope: "Sketch kamera, HTTP stream/capture, kontrol Telegram, dan penyimpanan frame SD_MMC."
presentation:
  kicker: "ESP32-CAM - TELEGRAM - STREAM"
  category: "IoT Camera"
  cardSize: narrow
  cardArtClass: "art-cctv"
  caseArtClass: "art-cctv"
  role: "IoT Camera Engineer"
  timeline: "2025 - Exploration"
  projectStatus: "Explored / Prototype"
caseStudy:
  problem: "Live stream lokal tidak cukup ketika operator berada di luar jaringan, sedangkan video server penuh terlalu berat untuk ESP32-CAM. Perangkat perlu membagi fungsi stream, snapshot remote, status, dan penyimpanan lokal sesuai batas PSRAM serta koneksi WiFi."
  approach: "Sketch menggabungkan CameraWebServer Espressif dengan Telegram Bot API. HTTP server pertama menyediakan UI, status, command kamera, capture JPEG/BMP; server kedua menyediakan MJPEG `/stream`. Loop Telegram melakukan long polling sederhana, memverifikasi chat id, mengirim foto pada beberapa resolusi, dan menyimpan frame periodik ke SD_MMC saat recording aktif."
  functions:
    - title: "Live stream lokal"
      description: "Menyediakan MJPEG `/stream` dan web control kamera untuk pemantauan langsung pada jaringan yang sama."
    - title: "Capture foto multi-resolusi"
      description: "Mengambil JPEG/BMP serta snapshot QCIF, HVGA, atau XGA untuk menyeimbangkan detail, memori, dan waktu kirim."
    - title: "Kontrol dan status Telegram"
      description: "Menerima command dari chat id terdaftar untuk foto, burst, status, mulai recording, dan berhenti recording."
    - title: "Perekaman frame ke SD card"
      description: "Menyimpan sequence JPEG ke folder SD_MMC dan mengirim lima frame terakhir sebagai preview ketika sesi dihentikan."
    - title: "Pemulihan koneksi"
      description: "Mencoba menyambung ulang WiFi dan mengirim notifikasi ketika kamera kembali online."
  workflow:
    - title: "Perangkat melakukan boot"
      description: "Firmware menginisialisasi kamera AI Thinker/OV2640, frame buffer PSRAM, WiFi, SD_MMC, dan sensor settings."
    - title: "Dua HTTP server dijalankan"
      description: "Server utama menangani UI, status, control, serta capture; server pada port berikutnya mempertahankan koneksi MJPEG stream."
    - title: "Loop Telegram mengambil command"
      description: "Perangkat melakukan polling update berkala, mem-parse JSON, dan menolak perintah dari chat id yang tidak sesuai."
    - title: "Permintaan foto menangkap satu frame"
      description: "Resolusi sensor diubah sesuai command, frame diambil dari camera buffer, lalu dikirim sebagai multipart HTTPS ke Telegram."
    - title: "Mode recording menyimpan frame periodik"
      description: "Setiap interval, firmware mengambil JPEG dan menulisnya ke folder sesi pada SD card sebagai sequence gambar."
    - title: "Stop recording mengirim preview"
      description: "Perangkat menutup sesi, melaporkan total frame, dan mengunggah sampai lima frame terakhir ke operator."
    - title: "Gangguan WiFi memicu reconnect"
      description: "Firmware mencoba koneksi ulang dengan timeout dan memberi status saat akses jaringan pulih."
  architecture:
    - "Sensor OV2640 menghasilkan frame JPEG melalui esp_camera dan PSRAM"
    - "ESP HTTP Server menyajikan UI, status sensor, capture JPEG/BMP, dan command"
    - "MJPEG endpoint /stream mengirim multipart frame pada port stream terpisah"
    - "Loop Telegram mengambil update berkala dan membatasi command ke chat id terdaftar"
    - "Snapshot dikirim sebagai multipart HTTPS pada resolusi QCIF, HVGA, atau XGA"
    - "Mode recording menulis sequence frame berkala ke folder SD_MMC"
    - "Stop recording mengirim lima frame terakhir sebagai preview Telegram"
    - "Reconnect WiFi memulihkan akses dan mengirim status online"
  decisions:
    - "Dua HTTP server memisahkan control/capture dari stream agar koneksi MJPEG panjang tidak menutup endpoint kamera lain."
    - "Resolusi snapshot dapat dipilih untuk menukar detail gambar dengan waktu upload dan penggunaan memori."
    - "Frame sequence dipilih karena encoding kontainer video penuh tidak realistis pada resource ESP32-CAM ini."
    - "Daftar path preview dibatasi pada lima frame terakhir agar RAM tidak bertumbuh sepanjang sesi recording."
    - "Chat id diperiksa sebelum command dijalankan sebagai kontrol akses minimum pada jalur Telegram."
  limitations: "Repo belum memiliki motion detection, object tracking, atau computer vision; fiturnya adalah monitoring kamera. WiFi, token bot, dan chat id masih tertanam di source, TLS Telegram memakai `setInsecure()`, dan stream lokal belum memiliki autentikasi. Credential yang pernah aktif harus segera dirotasi."
  nextIteration: "Rotasi credential, pindahkan secret ke provisioning/NVS, validasi sertifikat TLS, tambah autentikasi stream, pembatasan rate command, timestamp metadata, health watchdog, serta motion/object detection bila perangkat dan privasi memungkinkan."
gallery:
  labels: ["Camera source", "Video stream", "Telegram command", "SD recording"]
  title: "ESP32-CAM CCTV"
---

## Repo Yang Dicek

Repository utama: [esp32-cam-Ai-thinker](https://github.com/Franklnir/esp32-cam-Ai-thinker).

Source berisi `CameraWebServer_telegram.ino`, `app_httpd.cpp`, pin map AI Thinker, web UI kamera, endpoint status/control/capture, MJPEG stream, Telegram Bot API, PSRAM, dan SD_MMC.

## Apa Yang Dibangun

ESP32-CAM dapat dipantau lewat MJPEG stream lokal dan dikontrol melalui Telegram untuk foto XGA/HVGA/QCIF, burst sembilan foto, status perangkat, start recording, stop recording, serta preview lima frame terakhir. Recording yang dimaksud adalah sequence JPEG di SD card, bukan file video terenkode.

## Fokus Implementasi

- Server control/capture dan server MJPEG stream berjalan pada port terpisah.
- `esp_camera` menyesuaikan frame buffer berdasarkan ketersediaan PSRAM.
- Telegram command memeriksa chat id dan mengirim multipart photo melalui HTTPS.
- Sequence frame disimpan ke SD_MMC, lalu subset terakhir dikirim sebagai preview.

## Status

Project valid sebagai kamera monitor IoT, bukan smart tracker. Sebelum deployment, token dan WiFi harus dirotasi, verifikasi TLS serta autentikasi stream perlu ditambahkan, lalu fitur deteksi dapat dinilai berdasarkan kapasitas perangkat.
