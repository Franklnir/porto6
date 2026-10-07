export interface ChronosFeature {
  num: string;
  title: string;
  desc: string;
  badge?: string;
}

export interface ChronosConfig {
  sectionBadge: string;
  sectionTitleWords: string[];
  description: string;
  playStoreUrl: string;
  githubUrl: string;
  features: ChronosFeature[];
  demoUser: {
    appName: string;
    connectionStatus: string;
    deviceName: string;
    bleAddress: string;
    activeMusic: {
      title: string;
      artist: string;
      app: string;
    };
    notification: {
      app: string;
      sender: string;
      message: string;
    };
    defaultToggles: { id: string; label: string; initial: boolean }[];
  };
}

export const chronchiConfig: ChronosConfig = {
  sectionBadge: '06 / Support Aplikasi Chronos',
  sectionTitleWords: ['CHRONOS', '—', 'INTEGRASI', 'HP', 'VIA', 'BLE.'],
  description:
    'Xichi kompatibel penuh dengan ekosistem aplikasi open-source Chronos oleh Felix Biego (fbiego). Sambungkan smartphone Android kamu ke Xichi via Bluetooth Low Energy (BLE) untuk notifikasi instan, kontrol musik, navigasi Maps, dan sinkronisasi waktu tanpa ribet.',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.fbiego.chronos',
  githubUrl: 'https://github.com/fbiego/chronos-esp32',
  features: [
    {
      num: '01',
      title: 'Notifikasi & Panggilan Real-Time',
      desc: 'Meneruskan pesan WhatsApp, Telegram, SMS, dan notifikasi telepon masuk dari HP langsung ke layar Xichi via BLE.',
      badge: 'BLE Notification Bridge',
    },
    {
      num: '02',
      title: 'Kontrol Media & Info Lagu',
      desc: 'Kontrol pemutar musik HP (Play, Pause, Next, Volume) serta tampilkan judul lagu dan artis yang sedang diputar di layar Xichi.',
      badge: 'Media Control Sync',
    },
    {
      num: '03',
      title: 'Navigasi Turn-by-Turn Google Maps',
      desc: 'Tampilkan panduan arah belokan, jarak, dan panah navigasi Google Maps dari smartphone langsung ke layar fisik Xichi.',
      badge: 'Live Turn Direction',
    },
    {
      num: '04',
      title: 'Sinkronisasi Waktu, Cuaca & Alarm',
      desc: 'Jam, kalender, alarm, dan cuaca lokal otomatis tersinkron dari HP ke Xichi tanpa perlu koneksi WiFi mandiri.',
      badge: 'Auto Time & Weather',
    },
  ],
  demoUser: {
    appName: 'CHRONOS (fbiego)',
    connectionStatus: 'BLE CONNECTED',
    deviceName: 'Xichi Core ESP32',
    bleAddress: 'BLE: 7C:DF:A1:08:9E',
    activeMusic: {
      title: 'Midnight Coding Lo-Fi',
      artist: 'Xichi Audio Session',
      app: 'Spotify Music',
    },
    notification: {
      app: 'WHATSAPP',
      sender: 'Irsyad',
      message: 'Xichi berhasil tersambung ke Chronos App!',
    },
    defaultToggles: [
      { id: 'notif-sync', label: 'Sinkron Notifikasi', initial: true },
      { id: 'media-sync', label: 'Kontrol Pemutar Musik', initial: true },
    ],
  },
};

