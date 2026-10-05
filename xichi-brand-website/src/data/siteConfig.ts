export interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

export interface SocialLink {
  label: string;
  shortLabel: string;
  href: string;
  ariaLabel: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  author: string;
  authorUrl: string;
  siteUrl: string;
  ogImage: string;
  whatsappNumber: string;
  whatsappMessageTemplate: string;
  email: string;
  marqueeText: string;
  navItems: NavItem[];
  socialLinks: SocialLink[];
  stats: {
    mcpTools: number;
    pillars: number;
    fps: number;
    variants: number;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Xichi | Asisten AI Fisik Masa Depan',
  shortName: 'XICHI',
  tagline: 'Asisten AI Fisik Masa Depan di Meja Kerja Anda',
  description:
    'Xichi — asisten AI fisik dengan wajah ekspresif 60 FPS, memori semantik jangka panjang, YouTube streaming mandiri, AI Vision on-device, dan smart home dual relay. ESP32 + Xiaozhi open-source Indonesia.',
  author: 'Franklnir & Komunitas Xiaozhi Indonesia',
  authorUrl: 'https://github.com/Franklnir',
  siteUrl: 'https://produk.irsyadlabs.id',
  ogImage: '/og-cover.svg',
  whatsappNumber: '6289658252277',
  whatsappMessageTemplate: 'Halo tim Xichi! Saya ingin memesan unit [PRODUCT_NAME]. Mohon informasi ketersediaan dan cara pembayaran.',
  email: 'hello@xiaozhiscig.biz.id',
  marqueeText:
    'XICHI AI ✦ POWERED BY ESP32 ✦ YOUTUBE FREE STREAMING ✦ AI VISION ✦ BMKG REALTIME ✦ SMART HOME DUAL RELAY ✦ OPEN SOURCE ✦ XICHI AI ✦ POWERED BY ESP32 ✦ YOUTUBE FREE STREAMING ✦ AI VISION ✦ BMKG REALTIME ✦ SMART HOME DUAL RELAY ✦ OPEN SOURCE ✦',
  navItems: [
    { label: 'Home', href: '#home', sectionId: 'home' },
    { label: 'Products', href: '#products', sectionId: 'products' },
    { label: 'Voice', href: '#voice', sectionId: 'voice' },
    { label: 'Tools', href: '#tools', sectionId: 'tools' },
    { label: 'Compare', href: '#comparison', sectionId: 'comparison' },
    { label: 'Studio', href: '#culture', sectionId: 'culture' },
    { label: 'Chronos', href: '#chronchi', sectionId: 'chronchi' },
    { label: 'FAQ', href: '#faq', sectionId: 'faq' },
  ],
  socialLinks: [
    { label: 'Instagram', shortLabel: 'IG', href: 'https://instagram.com/xichiaipendant', ariaLabel: 'Instagram Xichi AI' },
    { label: 'TikTok', shortLabel: 'TT', href: 'https://tiktok.com/@xichiaipendant', ariaLabel: 'TikTok Xichi AI' },
    { label: 'YouTube', shortLabel: 'YT', href: 'https://youtube.com/@xichiaipendant', ariaLabel: 'YouTube Xichi AI' },
    { label: 'GitHub', shortLabel: 'GH', href: 'https://github.com/Franklnir', ariaLabel: 'GitHub Xichi Open Source' },
  ],
  stats: {
    mcpTools: 47,
    pillars: 8,
    fps: 60,
    variants: 3,
  },
};
