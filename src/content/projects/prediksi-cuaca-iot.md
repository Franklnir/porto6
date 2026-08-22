---
key: weather
title: "Monitoring Cuaca IoT & Forecast"
summary: "Aplikasi Android Java/XML untuk telemetri sensor via MQTT, kontrol empat relay, Firebase, GPS/geocoder, serta forecast cuaca 5 hari dari OpenWeather."
overview: "Aplikasi mobile yang menggabungkan data lingkungan dari ESP32, state aktuator, identitas perangkat, lokasi pengguna, histori cloud, dan forecast API dalam satu workflow monitoring."
year: 2026
order: 6
status: development
domain: ["IoT", "Weather", "Mobile"]
technologies: ["Android Java", "Android XML", "AndroidX", "Material Components", "Eclipse Paho MQTT", "HiveMQ Cloud", "TLS MQTT", "Firebase Auth", "Cloud Firestore", "Firebase Realtime Database", "Foreground Service", "LocationManager", "Geocoder", "OpenWeather 5 Day / 3 Hour API", "OkHttp 4", "Gson", "SharedPreferences", "Lottie"]
featured: false
repository: "https://github.com/Franklnir/stasiun-cuaca-mobile-aplikasi.git"
repositories:
  - label: "Stasiun Cuaca Mobile"
    url: "https://github.com/Franklnir/stasiun-cuaca-mobile-aplikasi"
    scope: "Aplikasi Android untuk MQTT, kontrol relay, Firebase, GPS, dan forecast OpenWeather."
presentation:
  kicker: "ANDROID - MQTT - WEATHER API"
  category: "IoT Mobile Analytics"
  cardSize: narrow
  cardArtClass: "art-weather"
  caseArtClass: "art-weather"
  role: "IoT & Mobile Engineer"
  timeline: "2025 - Developed"
  projectStatus: "Developed / Explored"
caseStudy:
  problem: "Telemetri perangkat, kontrol relay, identitas perangkat, lokasi, dan forecast berasal dari kanal berbeda. Tanpa pemisahan yang jelas, UI dapat menunjukkan state lokal yang tidak sesuai perangkat atau menyebut hasil API cuaca sebagai prediksi model sendiri."
  approach: "Aplikasi Java/XML memakai Firebase Auth untuk sesi, Paho MQTT over TLS untuk subscribe telemetri dan publish command relay, Firestore untuk snapshot `sensor_readings`, Realtime Database untuk state relay/user, LocationManager dan Geocoder untuk konteks lokasi, serta OkHttp/Gson untuk mengolah forecast OpenWeather lima hari."
  functions:
    - title: "Telemetri sensor real-time"
      description: "Menampilkan suhu, kelembapan, tekanan, altitude, MQ135, jarak ultrasonik, dan intensitas cahaya dari payload MQTT."
    - title: "Kontrol empat relay"
      description: "Mengirim command ON/OFF, menampilkan status perangkat, dan mempertahankan state UI melalui MQTT, Realtime Database, serta SharedPreferences."
    - title: "Akun dan snapshot cloud"
      description: "Menggunakan Firebase Auth untuk sesi dan menyimpan pembacaan terbaru per device pada collection Firestore `sensor_readings`."
    - title: "Lokasi perangkat"
      description: "Mengambil koordinat GPS, melakukan reverse geocoding, dan menambahkan konteks lokasi pada data monitoring."
    - title: "Forecast cuaca lima hari"
      description: "Mengambil data OpenWeather per tiga jam, merangkum suhu/kondisi/peluang hujan harian, dan menyimpan cache selama 30 menit."
    - title: "Informasi kesehatan perangkat"
      description: "Foreground service mempertahankan pengiriman informasi device dan lokasi sesuai lifecycle Android."
  workflow:
    - title: "Pengguna login melalui Firebase Auth"
      description: "Aplikasi memperoleh user id sebagai konteks device; fallback id digunakan bila sesi atau parameter device tidak tersedia."
    - title: "Aplikasi terhubung ke broker MQTT"
      description: "Paho membuka koneksi TLS ke HiveMQ Cloud, mengaktifkan automatic reconnect, lalu subscribe topic telemetri dan status."
    - title: "Payload sensor diproses"
      description: "JSON MQTT di-parse menjadi nilai sensor, kemudian UI monitoring diperbarui pada main thread."
    - title: "Snapshot disimpan ke Firestore"
      description: "Nilai sensor, timestamp server, dan lokasi digabung ke dokumen `sensor_readings` milik device."
    - title: "Lokasi dan forecast dimuat"
      description: "LocationManager memperoleh koordinat, Geocoder membentuk nama lokasi, lalu OkHttp meminta forecast OpenWeather bila cache kedaluwarsa."
    - title: "Forecast diringkas untuk UI"
      description: "Gson mengelompokkan interval tiga jam per hari, menghitung min/max dan peluang hujan, lalu memilih kondisi dominan serta ikon."
    - title: "Command relay dikirim dan dikonfirmasi"
      description: "Tombol melakukan optimistic update dan publish MQTT; pesan status perangkat memperbarui state final serta Realtime Database."
  architecture:
    - "ESP32 mengirim JSON suhu, kelembapan, tekanan, altitude, MQ135, jarak, dan lux"
    - "HiveMQ Cloud mengalirkan telemetry dan command/status empat relay melalui MQTT TLS"
    - "Android Paho client subscribe data, parse JSON, dan memperbarui UI real-time"
    - "Firebase Auth mengikat sesi pengguna dan identitas device"
    - "Cloud Firestore menyimpan snapshot sensor_readings per device"
    - "Realtime Database serta SharedPreferences menyimpan state relay dan state UI"
    - "GPS/LocationManager dan Geocoder menghasilkan koordinat serta nama lokasi"
    - "OpenWeather API memberi forecast 5 hari/3 jam yang diringkas dan di-cache 30 menit"
  decisions:
    - "MQTT dipakai untuk jalur real-time dua arah, sedangkan Firebase dipakai untuk identitas dan snapshot/state cloud."
    - "Firestore `SetOptions.merge()` memperbarui satu dokumen device tanpa membuat duplikasi tiap pesan."
    - "Relay memakai optimistic UI dan SharedPreferences, kemudian status MQTT memperbarui state yang dikonfirmasi perangkat."
    - "Forecast diproses dari interval 3 jam, diberi bobot waktu, diringkas per hari, dan di-cache 30 menit untuk menekan request API."
    - "Foreground service mempertahankan informasi device/lokasi sesuai lifecycle Android yang lebih panjang."
  limitations: "Forecast berasal dari OpenWeather dan rule agregasi lokal, bukan model machine learning buatan sendiri. Credential MQTT dan API masih tertanam di source, konfigurasi Google Services ikut ter-track, minSdk 34 membatasi perangkat, dan test yang ada masih berupa template tanpa coverage workflow utama."
  nextIteration: "Rotasi credential, pindahkan API cuaca ke backend/remote config, gunakan Android Keystore, rapikan kontrak topic dan source of truth relay, tambah offline queue, histori chart, alert, unit test parser/forecast, serta instrumentation test login dan monitoring."
gallery:
  labels: ["Sensor overview", "Weather data", "Location context", "Forecast view"]
  title: "Stasiun Cuaca Mobile"
---

## Repo Yang Dicek

Repository utama: [stasiun-cuaca-mobile-aplikasi](https://github.com/Franklnir/stasiun-cuaca-mobile-aplikasi).

Source Android menunjukkan `SensorMonitoringActivity`, `halamanutama` untuk empat relay, `WeatherAPIHandler`, `DeviceInfoService`, Firebase Auth, Firestore, Realtime Database, Paho MQTT, OkHttp, Gson, GPS/geocoder, dan foreground service.

## Apa Yang Dibangun

Data sensor masuk sebagai JSON melalui HiveMQ Cloud, ditampilkan dalam kartu monitoring, lalu disimpan sebagai snapshot Firestore per device. Aplikasi juga publish command relay, menerima status relay, mengambil lokasi GPS, dan merangkum forecast OpenWeather 5 hari dari interval 3 jam.

## Fokus Implementasi

- Telemetri MQTT: suhu, kelembapan, tekanan, altitude, MQ135, jarak ultrasonik, dan lux.
- Command/status empat relay dengan optimistic UI, SharedPreferences, dan Realtime Database.
- Firebase Auth, Firestore `sensor_readings`, GPS/geocoder, serta foreground service.
- Forecast OpenWeather lima hari, cache 30 menit, grouping harian, dan ringkasan peluang hujan.

## Status

Project valid sebagai aplikasi monitoring dan forecast berbasis API, bukan prediksi ML. Iterasi berikutnya perlu fokus pada rotasi secret, test coverage, source of truth relay, histori grafik, offline behavior, dan validasi kualitas sensor.
