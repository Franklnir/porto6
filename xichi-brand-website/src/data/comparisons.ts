export interface ComparisonRow {
  category: string;
  xichi: {
    title: string;
    description: string;
    positive: boolean;
    tag?: string;
  };
  conventional: {
    title: string;
    description: string;
    positive: boolean;
    tag?: string;
  };
}

export const comparisonData: ComparisonRow[] = [
  {
    category: 'Fleksibilitas Dialog & Karakter',
    xichi: {
      title: 'Dialog Natural & Kontekstual',
      description: 'Didukung LLM canggih (Gemini/DeepSeek/OpenAI). Mampu berdialog santai, punya kepribadian hangat, paham konteks panjang, dan humoris.',
      positive: true,
      tag: 'LLM Multimodal',
    },
    conventional: {
      title: 'Perintah Kaku Berbasis Pola',
      description: 'Hanya merespons kata pemicu ("trigger word") dan template perintah baku. Sering menjawab "Maaf saya tidak mengerti" jika kalimat bervariasi.',
      positive: false,
      tag: 'Command-Only',
    },
  },
  {
    category: 'Streaming Musik & Podcast',
    xichi: {
      title: 'Gratis Bebas Iklan (YouTube Mandiri)',
      description: 'Stream YouTube Music secara langsung dari perangkat tanpa biaya langganan bulanan dan tanpa perlu menghubungkan smartphone.',
      positive: true,
      tag: 'Rp 0 / Selamanya',
    },
    conventional: {
      title: 'Wajib Langganan Berbayar',
      description: 'Wajib bayar Spotify Premium atau YouTube Music Rp 55.000 - Rp 75.000/bulan. Tanpa langganan, dibatasi iklan berulang dan shuffle acak.',
      positive: false,
      tag: 'Bayar Bulanan',
    },
  },
  {
    category: 'Data Cuaca & Kebencanaan Lokal',
    xichi: {
      title: 'Integrasi Realtime BMKG Indonesia',
      description: 'Terhubung langsung ke API resmi BMKG untuk data gempa terkini, cuaca tingkat kecamatan di Indonesia, dan peringatan cuaca ekstrem lokal.',
      positive: true,
      tag: 'BMKG API Live',
    },
    conventional: {
      title: 'Data Global Terbatas',
      description: 'Hanya mengandalkan penyedia cuaca global generik. Tidak memiliki integrasi deteksi gempa atau sirine peringatan dini bencana Indonesia.',
      positive: false,
      tag: 'Data Global Generic',
    },
  },
  {
    category: 'Privasi & Lokasi Server',
    xichi: {
      title: 'Transparan & Open Source',
      description: 'Firmware open-source transparan. Anda memiliki kendali penuh atas konfigurasi server, API key pribadi, dan bisa self-host.',
      positive: true,
      tag: '100% Transparan',
    },
    conventional: {
      title: 'Terkunci di Cloud Korporat Asing',
      description: 'Data rekaman suara dikirim ke server luar negeri milik raksasa teknologi untuk analisis perilaku dan penargetan iklan komersial.',
      positive: false,
      tag: 'Server Luar Negeri',
    },
  },
  {
    category: 'Kustomisasi Alat (MCP Superpowers)',
    xichi: {
      title: '47+ MCP Tools & Smart Home Dual Relay',
      description: 'Bisa integrasi ke coding workflow (GitHub/Notion), kalkulator ilmiah, kontrol saklar fisik lampu/kipas, hingga tutor belajar anak.',
      positive: true,
      tag: '47 MCP Tools',
    },
    conventional: {
      title: 'Ekosistem Tertutup (Walled Garden)',
      description: 'Kemampuan terbatas pada apa yang disetujui platform. Kustomisasi fungsi teknis sangat terbatas dan tidak fleksibel.',
      positive: false,
      tag: 'Ekosistem Tertutup',
    },
  },
  {
    category: 'Total Biaya 1 Tahun (TCO)',
    xichi: {
      title: 'Mulai Rp 300rb — Beli Sekali Selamanya',
      description: 'Tidak ada biaya langganan bulanan tersembunyi. Penggunaan kuota token AI sangat hemat dan transparan.',
      positive: true,
      tag: 'Super Hemat',
    },
    conventional: {
      title: 'Total > Rp 1.800.000 / Tahun',
      description: 'Harga beli speaker awal (Rp 800rb - 1.5jt) + biaya langganan musik streaming (Rp 70rb x 12 bulan = Rp 840rb).',
      positive: false,
      tag: 'Biaya Membengkak',
    },
  },
];
