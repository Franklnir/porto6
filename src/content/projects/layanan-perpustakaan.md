---
key: library
title: "Digitalisasi Layanan Perpustakaan SLiMS"
summary: "Bundle distribusi tujuh plugin SLiMS 9 untuk visitor, peminjaman OPAC, laporan Excel, peta OpenStreetMap, backup plugin, navigasi OPAC, dan layanan WhatsApp."
overview: "Ekstensi layanan perpustakaan di atas runtime SLiMS melalui plugin dan hook, sehingga workflow pengunjung, peminjaman, laporan, lokasi, dan komunikasi tetap menggunakan data perpustakaan yang sama."
year: 2026
order: 4
status: development
domain: ["Public Service", "Library", "Platform"]
technologies: ["PHP", "SLiMS 9 Bulian", "SLiMS Plugins API", "MySQL/MariaDB", "HTML", "CSS", "Vanilla JavaScript", "Leaflet 1.9.4", "OpenStreetMap", "ZipArchive", "Excel Export", "WhatsApp Webhook"]
featured: false
repository: "https://github.com/Franklnir/plugin-slims-9-peprustakaan.git"
repositories:
  - label: "Plugin SLiMS 9 Perpustakaan"
    url: "https://github.com/Franklnir/plugin-slims-9-peprustakaan"
    scope: "Bundle distribusi ZIP untuk visitor, peminjaman, laporan, peta, backup, dan WhatsApp."
presentation:
  kicker: "PUBLIC SERVICE - LIBRARY - SLIMS"
  category: "Public Service Platform"
  cardSize: narrow
  cardArtClass: "art-library"
  caseArtClass: "art-library"
  role: "System Analyst & Developer"
  timeline: "Internship Project"
  projectStatus: "Internship / Developed"
caseStudy:
  problem: "Buku tamu, kunjungan rombongan, permintaan peminjaman OPAC, approval petugas, laporan, lokasi cabang, backup plugin, dan komunikasi WhatsApp sering berada di proses terpisah. Aplikasi baru akan menduplikasi data anggota, koleksi, serta transaksi yang sudah dimiliki SLiMS."
  approach: "Repo mendistribusikan tujuh paket ZIP: backup plugin, hide SLiMS info/visitor menu, Lapor Data, Lokasi Maps Open, dua paket MagangKp, dan WA Service. Setelah diekstrak, source menunjukkan hook OPAC/admin, query ke data SLiMS, tabel/settings plugin, export laporan, Leaflet/OpenStreetMap, serta webhook WhatsApp."
  functions:
    - title: "Pencatatan buku tamu dan kunjungan"
      description: "Mencatat visitor anggota, non-member, kunjungan rombongan, ruang/lokasi tujuan, serta metadata layanan melalui OPAC."
    - title: "Peminjaman dari OPAC"
      description: "Menerima request koleksi, menerapkan limit dan status, lalu memberi petugas alur approval, perpanjangan, dan pengembalian."
    - title: "Laporan operasional"
      description: "Menyediakan filter dan export Excel untuk data kunjungan, persetujuan peminjaman, serta item berdasarkan lokasi."
    - title: "Peta lokasi perpustakaan"
      description: "Menampilkan satu atau beberapa lokasi menggunakan Leaflet dan OpenStreetMap dengan pengaturan dari panel admin."
    - title: "Manajemen backup plugin"
      description: "Membantu operator melihat detail, mengunduh, dan menghapus paket plugin menggunakan arsip ZIP."
    - title: "Layanan informasi dan WhatsApp"
      description: "Menambahkan navigasi OPAC, halaman informasi, widget WhatsApp, webhook, dan kompatibilitas autoresponder."
  workflow:
    - title: "Administrator memasang paket plugin"
      description: "ZIP plugin ditempatkan pada instalasi SLiMS lalu dimuat oleh runtime dan Plugins API sesuai modul yang dipilih."
    - title: "Plugin mendaftarkan hook dan menu"
      description: "Modul menambahkan route, hook OPAC, menu admin, settings, dan migrasi tabel/kolom tanpa mengubah core SLiMS secara langsung."
    - title: "Pengunjung memakai form OPAC"
      description: "Visitor mengisi buku tamu atau mengirim request peminjaman menggunakan data anggota/koleksi yang sudah tersedia."
    - title: "SLiMS dan plugin memvalidasi data"
      description: "PHP memeriksa input, status anggota, limit, dan aturan layanan sebelum menyimpan transaksi ke MySQL/MariaDB."
    - title: "Petugas memproses dari panel admin"
      description: "Admin meninjau approval, memperbarui status, mengelola lokasi/settings, atau menghasilkan laporan Excel dan backup."
    - title: "Hasil ditampilkan atau diteruskan"
      description: "Status kembali ke OPAC; informasi lokasi tampil lewat peta; komunikasi layanan dapat diteruskan melalui widget atau webhook WhatsApp."
  architecture:
    - "SLiMS 9 memuat plugin melalui Plugins API, hook, dan menu admin"
    - "OPAC menyediakan visitor form, kunjungan rombongan, dan loan request"
    - "Plugin MagangKp memvalidasi anggota/non-member dan workflow approval"
    - "MySQL/MariaDB menyimpan data SLiMS, settings, visitor, dan status transaksi"
    - "Admin mengelola approval, perpanjangan, pengembalian, dan laporan"
    - "Lapor Data membentuk export Excel dari filter operasional"
    - "Leaflet dan OpenStreetMap menampilkan beberapa lokasi perpustakaan"
    - "WA Service menambahkan widget OPAC dan alur webhook/autoresponder"
  decisions:
    - "Plugin dipilih agar fitur baru memakai autentikasi, anggota, bibliografi, item, serta sirkulasi milik SLiMS."
    - "Hook OPAC dan registrasi menu menghindari modifikasi core yang sulit di-upgrade."
    - "Approval admin menjaga request peminjaman dari OPAC tetap mengikuti kontrol petugas."
    - "Leaflet/OpenStreetMap menghindari ketergantungan pada SDK peta berbayar untuk halaman lokasi."
    - "Paket ZIP memudahkan instalasi manual, tetapi source yang hanya berada di artefak distribusi mengurangi auditabilitas."
  limitations: "Repo root hanya berisi README sangat singkat dan artefak ZIP; source baru terlihat setelah ekstraksi. Dua versi MagangKp tersimpan berdampingan, panduan kompatibilitas belum jelas, dan belum ada automated install/integration test. Karena itu repo valid sebagai bundle distribusi plugin, bukan fork SLiMS lengkap."
  nextIteration: "Commit source setiap plugin sebagai folder terpisah, jelaskan matriks versi SLiMS, hapus artefak duplikat, tambah changelog dan installer/upgrade guide, lalu jalankan smoke test untuk hook OPAC, migrasi, laporan, backup, peta, dan webhook."
gallery:
  labels: ["Service overview", "Visitor records", "Loan approval", "Reports"]
  title: "Layanan Perpustakaan SLiMS"
---

## Repo Yang Dicek

Repository paket plugin: [plugin-slims-9-peprustakaan](https://github.com/Franklnir/plugin-slims-9-peprustakaan).

Repo ini paling tepat diperlakukan sebagai bundle distribusi plugin. Source tersedia di dalam paket ZIP, bukan sebagai source tree yang langsung terlihat pada root repository.

## Apa Yang Dibangun

Setelah paket diekstrak, source memuat visitor form dan rombongan, peminjaman OPAC dengan approval/perpanjangan/pengembalian, export laporan, manager backup plugin, peta multi-lokasi, navigasi OPAC, serta widget dan webhook WhatsApp.

## Fokus Implementasi

- Hook dan menu dari SLiMS Plugins API menghubungkan modul ke OPAC serta panel admin.
- MySQL/MariaDB tetap menjadi sumber data anggota, item, sirkulasi, visitor, dan settings plugin.
- Leaflet 1.9.4/OpenStreetMap menangani peta tanpa mengubah core SLiMS.
- Laporan Excel, backup ZIP, dan WhatsApp webhook menangani kebutuhan operasional di luar transaksi inti.

## Status

Project valid sebagai bundle distribusi plugin, tetapi belum sebagai repository source yang matang. Struktur source terbuka, dokumentasi instalasi, matriks kompatibilitas, dan integration test menjadi pekerjaan utama berikutnya.
