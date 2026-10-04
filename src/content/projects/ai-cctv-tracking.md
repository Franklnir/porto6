---
key: cctv-ai
title: "AI-Based CCTV Object Tracking System"
summary: "Sistem CCTV berbasis computer vision menggunakan YOLO dan MediaPipe untuk deteksi dan pelacakan objek secara real-time pada alur video."
overview: "Sistem pemantauan cerdas yang menggabungkan model deteksi objek YOLO dengan pelacakan MediaPipe untuk mendeteksi, mengidentifikasi, dan melacak objek secara real-time, sehingga mendukung pemantauan otomatis pada alur video."
year: 2025
order: 8
status: development
domain: ["Computer Vision", "AI", "Security"]
technologies: ["Python", "YOLO", "MediaPipe", "OpenCV", "NumPy", "Real-Time Processing", "Object Detection", "Object Tracking", "Landmark Detection"]
featured: false
repositories:
  - label: "AI CCTV Object Tracking"
    url: "https://github.com/Franklnir"
    scope: "Sistem deteksi dan pelacakan objek berbasis YOLO dan MediaPipe."
presentation:
  kicker: "AI - COMPUTER VISION - TRACKING"
  category: "AI & Computer Vision"
  cardSize: narrow
  cardArtClass: "art-cctv-ai"
  caseArtClass: "art-cctv-ai"
  role: "AI & Computer Vision Engineer"
  timeline: "2025"
  projectStatus: "Developed"
caseStudy:
  problem: "Pemantauan CCTV manual membutuhkan operator yang terus-menerus memperhatikan layar. Sistem konvensional tidak dapat mendeteksi, mengidentifikasi, dan melacak objek secara otomatis dalam alur video real-time."
  approach: "Menggunakan YOLO untuk deteksi objek cepat dan akurat pada setiap frame video, kemudian MediaPipe untuk pelacakan dan landmark detection. Pipeline digabungkan untuk memproses video stream secara real-time dengan performa yang optimal."
  functions:
    - title: "Deteksi objek real-time"
      description: "Mendeteksi berbagai jenis objek pada setiap frame video menggunakan model YOLO dengan akurasi dan kecepatan tinggi."
    - title: "Pelacakan objek berkelanjutan"
      description: "Melacak objek yang terdeteksi antar frame menggunakan MediaPipe untuk mempertahankan identitas objek."
    - title: "Landmark detection"
      description: "Mendeteksi titik-titik landmark pada objek seperti tubuh manusia untuk analisis pose dan gerakan."
    - title: "Visualisasi overlay"
      description: "Menampilkan bounding box, label, dan landmark secara real-time pada video stream."
    - title: "Pemrosesan pipeline"
      description: "Menggabungkan deteksi dan pelacakan dalam satu pipeline yang efisien untuk video real-time."
  workflow:
    - title: "Video stream dimuat"
      description: "Aplikasi membaca frame dari sumber video (kamera atau file) secara berurutan."
    - title: "YOLO melakukan deteksi"
      description: "Setiap frame diproses oleh model YOLO untuk mendeteksi objek beserta confidence score dan bounding box."
    - title: "MediaPipe melakukan pelacakan"
      description: "Objek yang terdeteksi dilacak antar frame menggunakan MediaPipe untuk mempertahankan kontinuitas."
    - title: "Landmark diproses"
      description: "MediaPipe mendeteksi landmark pada objek seperti tubuh manusia untuk analisis lebih lanjut."
    - title: "Hasil divisualisasikan"
      description: "Bounding box, label, dan landmark digambar pada frame dan ditampilkan secara real-time."
  architecture:
    - "OpenCV menangkap dan memproses frame video"
    - "YOLO melakukan deteksi objek pada setiap frame"
    - "MediaPipe menangani pelacakan objek dan landmark detection"
    - "NumPy mengelola array dan operasi numerik untuk pemrosesan frame"
    - "Pipeline menggabungkan deteksi dan pelacakan dalam alur yang efisien"
  decisions:
    - "YOLO dipilih karena kecepatan inferensi yang tinggi sehingga cocok untuk real-time processing."
    - "MediaPipe digunakan untuk pelacakan karena terintegrasi baik dan mendukung landmark detection."
    - "Pipeline digabungkan agar deteksi dan pelacakan berjalan dalam satu alur tanpa overhead komunikasi."
    - "OpenCV dipakai sebagai fondasi karena dukungan luas terhadap format video dan operasi citra."
  limitations: "Belum ada penyimpanan rekaman atau alert otomatis. Model belum di-train pada dataset khusus. Belum ada integrasi dengan sistem notifikasi atau backend monitoring. Performa tergantung pada hardware GPU yang tersedia."
  nextIteration: "Menambahkan penyimpanan rekaman, alert berbasis aturan, integrasi backend untuk monitoring jarak jauh, fine-tuning model pada dataset khusus, dan optimasi performa untuk perangkat tanpa GPU."
gallery:
  labels: ["Detection overlay", "Object tracking", "Landmark detection", "Video stream"]
  title: "AI CCTV Tracking"
---

## Apa Yang Dibangun

AI-Based CCTV Object Tracking System menggabungkan YOLO untuk deteksi objek dan MediaPipe untuk pelacakan serta landmark detection. Sistem memproses video stream secara real-time dan menampilkan visualisasi deteksi pada setiap frame.

## Fokus Implementasi

- YOLO untuk deteksi objek cepat dan akurat pada setiap frame video.
- MediaPipe untuk pelacakan objek antar frame dan landmark detection.
- Pipeline terintegrasi yang menggabungkan deteksi dan pelacakan.
- Visualisasi real-time dengan bounding box, label, dan landmark overlay.
- Pemrosesan video stream dari kamera atau file.

## Status

Project telah dikembangkan sebagai prototype computer vision. Prioritas berikutnya adalah penyimpanan rekaman, alert otomatis, integrasi backend, fine-tuning model, dan optimasi performa.
