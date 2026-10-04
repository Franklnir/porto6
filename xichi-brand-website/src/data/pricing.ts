export interface PricingTier {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  priceFormatted: string;
  priceNumber: number;
  note: string;
  featured?: boolean;
  features: string[];
  ctaText: string;
  whatsappMessage: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'xichi-unit',
    tag: 'Ready to Use',
    title: 'XICHI UNIT',
    subtitle: 'Siap pakai dalam casing 3D print eksklusif. Colok, nyalakan, langsung ngobrol.',
    priceFormatted: '560.000',
    priceNumber: 560000,
    note: 'Varian Core · Garansi 3 bulan',
    featured: false,
    features: [
      'Unit Xichi Core rakitan rapi & teruji QC',
      'Casing 3D print premium multi-warna',
      'Firmware terbaru siap pakai terinstall',
      'Kabel USB-C braided & adaptor 5V',
      'Garansi resmi penggantian modul 3 bulan',
    ],
    ctaText: 'Pre-Order Unit',
    whatsappMessage: 'Halo tim Xichi! Saya ingin memesan paket Xichi Unit (Ready to Use Rp 560.000). Bagaimana proses pembayaran dan pengirimannya?',
  },
  {
    id: 'xichi-kit',
    tag: 'DIY Maker Kit',
    title: 'XICHI KIT',
    subtitle: 'Paket komponen lengkap untuk dirakit sendiri. Cocok untuk pelajar & mahasiswa teknik.',
    priceFormatted: '299.000',
    priceNumber: 299000,
    note: 'Varian Core · Belum termasuk casing',
    featured: true,
    features: [
      'Modul mikrokontroler ESP32-S3 N16R8',
      'Layar LCD IPS bulat + speaker cavity I2S 3W',
      'Mikrofon INMP441 & komponen pasif pendukung',
      'Akses grup Discord VIP & panduan skematik',
      'Tutorial video perakitan & flasher browser',
    ],
    ctaText: 'Pre-Order Kit',
    whatsappMessage: 'Halo tim Xichi! Saya ingin memesan paket Xichi Kit (DIY Maker Kit Rp 299.000). Mohon informasi rekening dan estimasi kirim.',
  },
];
