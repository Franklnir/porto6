export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface HardwareProduct {
  id: string;
  code: string;
  name: string;
  badge: string;
  status: 'IN STOCK' | 'BEST SELLER' | 'PRE-ORDER';
  chipset: string;
  priceDisplay: string;
  priceValue: number;
  priceOld?: string;
  priceLabel?: string;
  description: string;
  featured?: boolean;
  sticker: string;
  image?: string;
  gallery?: string[];
  specs: ProductSpecItem[];
  features?: string[];
  idealFor?: string;
}

export const hardwareProducts: HardwareProduct[] = [
  {
    id: 'xichi-pocket',
    code: 'PRD-001',
    name: 'Xichi Pocket',
    badge: '★ Entry',
    status: 'IN STOCK',
    chipset: 'ESP32-C3 SuperMini',
    priceDisplay: '300',
    priceValue: 300000,
    priceLabel: 'Harga',
    description:
      'Ukuran jempol, ultra-ringkas, hemat daya. Ideal sebagai pendant saku atau pengontrol saklar mini dengan tombol PTT.',
    featured: false,
    sticker: '★ Entry',
    image: '/assets/products/xichi-pocket-render.jpg',
    gallery: [
      '/assets/products/xichi-pocket-render.jpg',
      '/assets/products/06-xiaozhi-photo.png',
      '/assets/products/10-xiaozhi-photo.png',
    ],
    specs: [
      { label: 'CHIP', value: 'ESP32-C3' },
      { label: 'FORM', value: 'Pocket Size' },
      { label: 'INPUT', value: 'PTT Button' },
      { label: 'POWER', value: '12H+ Standby' },
    ],
    features: [
      'Ukuran jempol ultra-ringkas seberat 22 gram',
      'Tombol Push-to-Talk (PTT) instan',
      'Opus audio streaming hemat RAM (12 kbps)',
      'Kontrol saklar Smart Home via suara',
      'Setup mudah lewat Chronchi BLE SmartConfig',
    ],
    idealFor: 'Pelajar, gantungan saku harian, dan kontrol saklar cerdas minimalis.',
  },
  {
    id: 'xichi-core',
    code: 'PRD-002',
    name: 'Xichi Core',
    badge: '★ Best',
    status: 'BEST SELLER',
    chipset: 'ESP32-S3 N16R8',
    priceDisplay: '560',
    priceValue: 560000,
    priceOld: '650rb',
    priceLabel: 'Harga',
    description:
      'Layar LCD ekspresi emosi dinamis, PSRAM 8MB, speaker I2S jernih, dan pemutar YouTube mandiri tanpa perlu HP.',
    featured: true,
    sticker: '★ Best',
    image: '/assets/products/xichi-core-render.jpg',
    gallery: [
      '/assets/products/xichi-core-render.jpg',
      '/assets/products/01-device-front.png',
      '/assets/products/02-xiaozhi-photo.png',
      '/assets/products/03-xiaozhi-photo.png',
      '/assets/products/04-xiaozhi-photo.png',
    ],
    specs: [
      { label: 'CHIP', value: 'ESP32-S3 N16R8' },
      { label: 'MEMORY', value: '8MB PSRAM' },
      { label: 'DISPLAY', value: 'LCD Face 60FPS' },
      { label: 'AUDIO', value: 'I2S Speaker 3W' },
    ],
    features: [
      'Layar LCD bulat ekspresi emosional hidup (60 FPS)',
      'Pemutar musik YouTube mandiri tanpa langganan/iklan',
      '47 MCP Superpower Tools (Koding, BMKG, Edukasi)',
      'Memori semantik percakapan jangka panjang',
      'Speaker jernih anti-buffering 32KB audio buffer',
    ],
    idealFor: 'Tech enthusiast, desk setup creator, dan teman belajar meja kerja.',
  },
  {
    id: 'xichi-vision-pro',
    code: 'PRD-003',
    name: 'Xichi Vision Pro',
    badge: '★ Pro',
    status: 'PRE-ORDER',
    chipset: 'ESP32-S3 CAM',
    priceDisplay: '630',
    priceValue: 630000,
    priceLabel: 'Harga',
    description:
      'Semua keunggulan Core + kamera OV2640 untuk OCR baca teks buku, pengenalan objek, dan AI Vision on-device.',
    featured: false,
    sticker: '★ Pro',
    image: '/assets/products/xichi-vision-render.jpg',
    gallery: [
      '/assets/products/xichi-vision-render.jpg',
      '/assets/products/11-xiaozhi-photo.png',
      '/assets/products/12-xiaozhi-photo.png',
      '/assets/products/13-xiaozhi-photo.png',
    ],
    specs: [
      { label: 'CHIP', value: 'ESP32-S3 CAM' },
      { label: 'CAMERA', value: 'OV2640' },
      { label: 'VISION', value: 'OCR · Object' },
      { label: 'EDGE AI', value: 'On-Device' },
    ],
    features: [
      'Visual OCR: Baca lembar soal matematika via kamera',
      'Layar TFT 1.69" / 1.54" IPS resolusi tinggi',
      'Object & Environment Recognition via LLM Multimodal',
      'YouTube Music + Smart Home + 47 MCP Superpowers',
      'Kamera snapshot berlatensi rendah untuk meja kerja',
    ],
    idealFor: 'Mahasiswa teknik, peneliti AI multimodal, dan pelajar yang butuh tutor visual cerdas.',
  },
];
