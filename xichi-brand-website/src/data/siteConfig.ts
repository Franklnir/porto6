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
  name: 'Xichi — Asisten AI Fisik, Xiaozhi Indonesia & Voice AI | IrsyadLabs',
  shortName: 'XICHI',
  tagline: 'Asisten AI Fisik Masa Depan di Meja Kerja Anda — Xiaozhi Indonesia by IrsyadLabs',
  description:
    'Xichi adalah asisten AI fisik & voice AI pintar berbasis Xiaozhi Indonesia dari IrsyadLabs (xiaozhiscig). Wajah ekspresif 60 FPS, memori semantik, YouTube streaming mandiri, AI Vision on-device, dan IoT smart home ESP32-S3.',
  author: 'Franklnir • IrsyadLabs & Komunitas Xiaozhi Indonesia',
  authorUrl: 'https://irsyadlabs.id',
  siteUrl: 'https://produk.irsyadlabs.id',
  ogImage: '/og-cover.svg',
  whatsappNumber: '6289658252277',
  whatsappMessageTemplate: 'Halo tim Xichi! Saya ingin memesan unit [PRODUCT_NAME]. Mohon informasi ketersediaan dan cara pembayaran.',
  email: 'hello@xiaozhiscig.biz.id',
  marqueeText:
    'XICHI AI ✦ PELOPOR XIAOZHI INDONESIA ✦ VOICE AI ASISTEN ✦ BY IRSYADLABS ✦ XIAOZHISCIG ✦ POWERED BY ESP32-S3 ✦ YOUTUBE STREAMING MANDIRI ✦ AI VISION ✦ SMART HOME DUAL RELAY ✦ OPEN SOURCE ✦ XICHI AI ✦ PELOPOR XIAOZHI INDONESIA ✦ VOICE AI ASISTEN ✦ BY IRSYADLABS ✦ XIAOZHISCIG ✦ POWERED BY ESP32-S3 ✦',
  navItems: [
    { label: 'Home', href: '#home', sectionId: 'home' },
    { label: 'Products', href: '#products', sectionId: 'products' },
    { label: 'Studio', href: '#culture', sectionId: 'culture' },
    { label: 'Voice', href: '#voice', sectionId: 'voice' },
    { label: 'Tools', href: '#tools', sectionId: 'tools' },
    { label: 'Compare', href: '#comparison', sectionId: 'comparison' },
    { label: 'Chronos', href: '#chronchi', sectionId: 'chronchi' },
    { label: 'Tentang', href: '/tentang', sectionId: 'tentang' },
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
