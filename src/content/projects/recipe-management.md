---
key: recipe
title: "Recipe Management System – CodeIgniter 4"
summary: "Aplikasi web manajemen resep berbasis CodeIgniter 4 dengan arsitektur MVC, CRUD resep, kategori, dan konten terstruktur."
overview: "Sistem manajemen resep yang dibangun menggunakan framework CodeIgniter 4 dengan pendekatan MVC untuk mengelola data resep dan konten secara terstruktur, termasuk kategori, bahan, langkah memasak, dan pencarian."
year: 2025
order: 7
status: development
domain: ["Full-Stack", "Web Application"]
technologies: ["CodeIgniter 4", "PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap", "MVC Architecture"]
featured: false
repository: "https://github.com/Franklnir/resep-makanan-insep-dengan-CodeIgniter-4.git"
repositories:
  - label: "Recipe Management System"
    url: "https://github.com/Franklnir/resep-makanan-insep-dengan-CodeIgniter-4"
    scope: "Aplikasi web CodeIgniter 4 untuk manajemen resep dan konten terstruktur."
presentation:
  kicker: "FULL-STACK - WEB - CODEIGNITER"
  category: "Full-Stack Web Application"
  cardSize: narrow
  cardArtClass: "art-recipe"
  caseArtClass: "art-recipe"
  role: "Full-Stack Developer"
  timeline: "2025"
  projectStatus: "Developed"
caseStudy:
  problem: "Pengelolaan data resep secara manual atau menggunakan spreadsheet sulit diorganisir, dicari, dan dikelola kategorinya. Dibutuhkan sistem terstruktur yang memudahkan input, pencarian, dan pengelolaan resep secara efisien."
  approach: "Menggunakan CodeIgniter 4 dengan arsitektur MVC untuk memisahkan logika bisnis, tampilan, dan akses data. Database MySQL menyimpan data resep, kategori, bahan, dan langkah memasak. Framework menyediakan routing, helper, dan library bawaan yang mempercepat pengembangan."
  functions:
    - title: "CRUD resep lengkap"
      description: "Membaca, menambah, mengedit, dan menghapus data resep beserta bahan, langkah memasak, dan gambar."
    - title: "Kategori dan pencarian"
      description: "Mengelola kategori resep dan menyediakan fitur pencarian berdasarkan judul, bahan, atau kategori."
    - title: "Tampilan responsif"
      description: "Menampilkan daftar dan detail resep dengan layout responsif yang dapat diakses dari berbagai perangkat."
    - title: "Validasi input"
      description: "Memvalidasi data input pada sisi server menggunakan validation library CodeIgniter 4."
  workflow:
    - title: "Pengguna mengakses halaman utama"
      description: "Aplikasi menampilkan daftar resep terbaru beserta filter kategori."
    - title: "Pengguna menambah resep baru"
      description: "Form input mengumpulkan judul, kategori, bahan, langkah, dan gambar resep."
    - title: "Data divalidasi dan disimpan"
      description: "Controller memvalidasi input, model menyimpan ke database, dan pengguna diarahkan ke halaman detail."
    - title: "Pengguna mencari atau filter resep"
      description: "Query database memfilter berdasarkan kata kunci atau kategori, hasil ditampilkan pada view."
  architecture:
    - "CodeIgniter 4 menangani routing, controller, model, dan view"
    - "MySQL menyimpan data resep, kategori, bahan, dan langkah memasak"
    - "Bootstrap menyediakan komponen UI dan layout responsif"
    - "Validation library memeriksa input sebelum penyimpanan"
  decisions:
    - "CodeIgniter 4 dipilih karena ringan, memiliki dokumentasi lengkap, dan mendukung arsitektur MVC yang bersih."
    - "MySQL digunakan sebagai database utama karena kompatibilitas baik dengan framework dan hosting umum."
    - "Bootstrap dipakai untuk mempercepat pengembangan UI responsif tanpa kustomisasi CSS dari nol."
  limitations: "Belum ada autentikasi pengguna multi-role, upload gambar belum dioptimasi, dan belum ada fitur berbagi resep atau komentar. Testing otomatis belum tersedia."
  nextIteration: "Menambahkan autentikasi dan otorisasi pengguna, optimasi gambar, fitur berbagi resep, komentar dan rating, serta unit test untuk controller dan model."
gallery:
  labels: ["Recipe list", "Recipe detail", "Category filter", "Add recipe form"]
  title: "Recipe Management"
---

## Apa Yang Dibangun

Recipe Management System adalah aplikasi web yang dibangun menggunakan CodeIgniter 4 dengan pendekatan MVC. Sistem memungkinkan pengguna mengelola data resep secara terstruktur, termasuk kategori, bahan, langkah memasak, dan pencarian.

## Fokus Implementasi

- Arsitektur MVC CodeIgniter 4 untuk pemisahan controller, model, dan view.
- CRUD resep dengan relasi ke kategori, bahan, dan langkah memasak.
- Pencarian dan filter berdasarkan kategori dan kata kunci.
- Validasi input server-side menggunakan validation library bawaan.
- Tampilan responsif dengan Bootstrap.

## Status

Project telah dikembangkan sebagai bagian dari portofolio web development. Prioritas berikutnya adalah autentikasi pengguna, optimasi media, fitur sosial, dan test coverage.
