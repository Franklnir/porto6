export interface FAQItem {
  question: string;
  answer: string;
  category: 'product' | 'hardware' | 'network' | 'preorder';
}

export const faqItems: FAQItem[] = [
  {
    question: 'Apa perbedaan mendasar antara Xichi, Xiaozhi, dan Chronchi?',
    answer:
      'Xichi adalah produk fisik AI companion (casing 3D, layar ekspresi, mic, speaker, kamera). Xiaozhi adalah protokol inti dan voice engine suara AI berbasis WebSocket. Chronchi adalah aplikasi Android pendamping untuk scan QR, pairing Bluetooth BLE SmartConfig, dan pengaturan saklar smart home.',
    category: 'product',
  },
  {
    question: 'Apakah Xichi membutuhkan langganan bulanan untuk memutar musik YouTube?',
    answer:
      'Sama sekali TIDAK. Xichi terintegrasi dengan gateway cerdas Hugging Xiaozhi yang mentranscode audio YouTube mandiri langsung ke format kompresi Opus secara gratis dan tanpa iklan mengganggu.',
    category: 'product',
  },
  {
    question: 'Apakah Xichi bisa tersambung ke jaringan Wi-Fi 5 GHz?',
    answer:
      'Mikrokontroler ESP32-C3 dan ESP32-S3 menggunakan frekuensi Wi-Fi standar 2.4 GHz (802.11 b/g/n). Pastikan router rumah Anda mengaktifkan frekuensi 2.4 GHz saat menghubungkan Xichi.',
    category: 'network',
  },
  {
    question: 'Bagaimana cara setup perangkat untuk pertama kalinya?',
    answer:
      'Sangat mudah! Nyalakan Xichi, lalu Anda bisa menghubungkan via aplikasi Android Chronchi (otomatis isi SSID & password lewat Bluetooth BLE SmartConfig) ATAU sambungkan HP/laptop ke hotspot captive portal "Xichi-Setup-XXXX" dan buka 192.168.4.1 di browser.',
    category: 'network',
  },
  {
    question: 'Apa saja yang didapatkan dalam paket pembelian Ready-to-Use vs DIY Maker Kit?',
    answer:
      'Ready-to-Use Unit sudah terpasang rapi di dalam casing 3D print eksklusif, sudah di-flash firmware terbaru, teruji quality control, dan langsung siap pakai. Sedangkan DIY Maker Kit berisi modul terpisah (ESP32, mic I2S, amplifier DAC, speaker, layar LCD) untuk dirakit dan disolder sendiri oleh mahasiswa atau pehobi elektronika.',
    category: 'preorder',
  },
  {
    question: 'Apakah ada garansi untuk pembelian unit Xichi?',
    answer:
      'Ya! Setiap unit Ready-to-Use dilengkapi garansi penggantian modul 6 bulan jika terjadi cacat pabrik atau kerusakan fungsi bukan akibat kelalaian fisik/tegangan salah.',
    category: 'preorder',
  },
  {
    question: 'Bisakah saya mengoprek atau memodifikasi firmware Xichi sendiri?',
    answer:
      'Tentu saja! Xichi didesain untuk komunitas maker. Anda dapat mem-flash firmware custom langsung dari browser Chromium menggunakan fitur Web Flasher (Web Serial API) tanpa perlu menginstal driver Arduino atau VSCode sama sekali.',
    category: 'hardware',
  },
];
