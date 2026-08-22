---
key: school
title: "EduSmart Presensi - Platform Operasi Akademik"
summary: "Platform operasi sekolah multi-tenant dengan React/Vite PWA, Laravel API, presensi RFID via MQTT, queue Redis, PostgreSQL, dan pipeline deployment production."
overview: "Monorepo operasional sekolah yang menyatukan dashboard admin, guru, siswa, data akademik, presensi RFID, worker, audit event, dan deployment tanpa mencampur tanggung jawab frontend, API, messaging, dan database."
year: 2026
order: 1
status: development
domain: ["Full-Stack", "Education", "RFID"]
technologies: ["React 18", "Vite", "React Router", "TanStack Query", "Zustand", "Laravel 13", "PHP 8.3", "Laravel Sanctum", "Laravel Horizon", "PostgreSQL 16", "PgBouncer", "Redis 7", "Redis Streams", "Eclipse Mosquitto", "MQTT", "Server-Sent Events", "Docker Compose", "Nginx", "Caddy", "GitHub Actions", "Cloudflare Pages"]
featured: false
repository: "https://github.com/Franklnir/edusmart-presensi.git"
repositories:
  - label: "EduSmart Presensi"
    url: "https://github.com/Franklnir/edusmart-presensi"
    scope: "Monorepo frontend React/Vite PWA, Laravel API, RFID bridge, worker, database, dan deployment."
presentation:
  kicker: "FULL-STACK - EDUCATION - RFID"
  category: "Full-Stack Engineering"
  cardSize: wide
  cardArtClass: "portfolio-detail-art--school"
  caseArtClass: "art-school"
  role: "System Architect & Full-Stack Engineer"
  timeline: "2026 - Ongoing"
  projectStatus: "Production Pipeline / Evolving"
caseStudy:
  problem: "Presensi, jadwal, nilai, quiz, pengumuman, organisasi, ekstrakurikuler, sertifikat, dan tenant sekolah mudah terpecah ke banyak alat. Tanpa kontrak event yang jelas, scan RFID juga sulit ditelusuri dari perangkat sampai catatan kehadiran dan tampilan operator."
  approach: "Repo dibangun sebagai monorepo. React/Vite menyediakan PWA per role; Laravel 13 dan Sanctum menangani API serta otorisasi; PostgreSQL menjadi sumber data utama; Redis, Horizon, dan Redis Streams menjalankan queue serta live event; Mosquitto dan RFID bridge menghubungkan perangkat; Docker, Nginx, Caddy, GitHub Actions, dan Cloudflare Pages menangani delivery."
  functions:
    - title: "Operasi akademik berdasarkan role"
      description: "Menyediakan workflow admin, guru, siswa, dan superadmin untuk data siswa, kelas, jadwal, nilai, quiz, pengumuman, organisasi, ekstrakurikuler, serta sertifikat."
    - title: "Presensi RFID multi-tenant"
      description: "Menerima scan kartu dari perangkat terdaftar, memetakan kartu ke siswa, menerapkan aturan presensi, dan menyimpan hasil per tenant."
    - title: "Live scan dan audit event"
      description: "Mengirim hasil scan ke dashboard secara real-time sekaligus mempertahankan histori database untuk penelusuran dan catch-up setelah koneksi terputus."
    - title: "Pekerjaan background"
      description: "Menjalankan queue, worker, scheduler, dan proses berat melalui Redis/Horizon agar request API utama tetap responsif."
    - title: "Delivery frontend dan backend"
      description: "Mendukung frontend Cloudflare Pages serta stack VPS terkontrol untuk API, PostgreSQL, Redis, MQTT, RFID bridge, dan service pendukung."
  workflow:
    - title: "Pengguna masuk pada tenant dan role yang sesuai"
      description: "PWA memilih konteks sekolah, mengautentikasi sesi melalui Sanctum, lalu membatasi menu serta aksi berdasarkan role."
    - title: "Frontend mengirim request ke Laravel API"
      description: "React Router mengatur halaman, sementara TanStack Query dan service frontend mengambil atau memperbarui data operasional."
    - title: "Backend memvalidasi aturan dan menyimpan transaksi"
      description: "Laravel memeriksa tenant, otorisasi, dan business rule sebelum menulis data utama serta audit event ke PostgreSQL."
    - title: "Proses berat dialihkan ke queue"
      description: "Job yang tidak perlu selesai di request yang sama masuk ke Redis dan dikerjakan oleh Horizon worker atau scheduler."
    - title: "Perangkat RFID mengirim event terpisah"
      description: "Reader menerbitkan event_id ke topic MQTT per tenant/device; RFID bridge memvalidasi registry, melakukan deduplikasi, lalu meneruskan scan ke Laravel."
    - title: "Hasil kembali ke perangkat dan dashboard"
      description: "ACK MQTT memberi status ke perangkat, sedangkan Redis Streams dan SSE memperbarui live scan di PWA dengan PostgreSQL sebagai fallback."
  architecture:
    - "Kartu dan reader RFID menghasilkan event_id"
    - "Mosquitto menerima scan pada topic per tenant dan device"
    - "RFID bridge memvalidasi registry tenant/device dan deduplikasi"
    - "Laravel 13 memetakan kartu, aturan presensi, role, dan audit event"
    - "PostgreSQL 16 menyimpan data akademik dan histori transaksi"
    - "Redis, Horizon, dan worker menjalankan queue serta proses background"
    - "Redis Streams dan SSE mengirim live scan dengan fallback catch-up PostgreSQL"
    - "React/Vite PWA menyajikan workflow admin, guru, siswa, dan superadmin"
  decisions:
    - "Event RFID membawa event_id agar retry dari buffer LittleFS tidak membuat presensi ganda."
    - "ACK MQTT dikirim setelah business rule diproses sehingga perangkat mengetahui hasil scan, bukan hanya status koneksi."
    - "Live scan memakai Redis Streams dan SSE, dengan PostgreSQL sebagai catch-up ketika browser terputus."
    - "Frontend Cloudflare Pages dapat dipisahkan dari origin VPS; backend, database, worker, scheduler, MQTT, dan bridge tetap berjalan sebagai service terkontrol."
    - "Image production dibangun oleh GitHub Actions, lalu deployment menjalankan migrasi dan health check pada stack Docker Compose."
  limitations: "Beberapa page dan controller masih besar, dokumentasi API belum lengkap, dan klaim kapasitas production belum didukung benchmark publik. TLS serta ACL MQTT, observability lintas service, dan security regression perlu terus diperketat."
  nextIteration: "Melengkapi OpenAPI, E2E presensi RFID, load test tenant, dashboard observability, audit subscription realtime, rotasi secret, dan pemecahan modul frontend/backend yang masih besar."
gallery:
  labels: ["Platform overview", "Academic operations", "RFID events", "Deployment architecture"]
  manifest: "/assets/projects/platform-operasi-akademik/manifest.json"
  title: "EduSmart Presensi"
---

## Repo Yang Dicek

Repository utama: [edusmart-presensi](https://github.com/Franklnir/edusmart-presensi).

Source terbaru memuat frontend React/Vite, backend Laravel, Docker Compose production, konfigurasi Mosquitto, RFID bridge, worker, scheduler, Nginx/Caddy, serta workflow GitHub Actions dan Cloudflare Pages.

## Apa Yang Dibangun

EduSmart Presensi menyatukan dashboard admin, guru, siswa, dan superadmin dengan data akademik, presensi RFID, laporan, quiz, pengumuman, organisasi, ekstrakurikuler, serta sertifikat. Frontend adalah PWA React/Vite; backend Laravel menyediakan API/Sanctum dan business rule; PostgreSQL, Redis, Horizon, dan Mosquitto menopang data, queue, live event, dan perangkat.

## Fokus Implementasi

- Scan RFID mengalir dari topic MQTT per tenant/device, melalui bridge, ke business rule Laravel dan audit event PostgreSQL.
- `event_id`, ACK, buffer LittleFS, dan deduplikasi menjaga retry perangkat tetap dapat ditelusuri.
- Redis Streams dan SSE mengirim live scan ke frontend dengan fallback catch-up dari PostgreSQL.
- GitHub Actions membangun image, sedangkan Docker Compose, Nginx, Caddy, dan health check mengatur runtime production.

## Status

Project memiliki alur delivery production yang nyata, tetapi masih berkembang. Prioritas berikutnya adalah test end-to-end RFID, dokumentasi API, benchmark, hardening MQTT, observability lintas service, dan pemecahan modul besar.
