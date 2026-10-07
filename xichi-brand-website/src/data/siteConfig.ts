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
    variants: number;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Xichi AI — Asisten AI Fisik & Voice AI Pintar Indonesia',
  shortName: 'XICHI',
  tagline: 'Asisten AI Fisik Masa Depan di Meja Kerja Anda — Ditenagai ESP32-S3',
  description:
    'Xichi AI adalah asisten AI fisik & voice AI pintar berbasis Xiaozhi Indonesia. Memori semantik, YouTube streaming mandiri, AI Vision on-device, dan IoT smart home ESP32-S3.',
  author: 'Xichi AI Studio & Komunitas Xiaozhi Indonesia',
  authorUrl: 'https://produk.irsyadlabs.id',
  siteUrl: 'https://produk.irsyadlabs.id',
  ogImage: '/og-cover.svg',
  whatsappNumber: '6289658252277',
  whatsappMessageTemplate: 'Halo tim Xichi! Saya ingin memesan unit [PRODUCT_NAME]. Mohon informasi ketersediaan dan cara pembayaran.',
  email: 'hello@xiaozhiscig.biz.id',
  marqueeText:
    'XICHI AI ✦ PELOPOR ASISTEN AI FISIK ✦ VOICE AI INDONESIA ✦ POWERED BY ESP32-S3 ✦ YOUTUBE STREAMING MANDIRI ✦ AI VISION ON-DEVICE ✦ SMART HOME DUAL RELAY ✦ 47 MCP SUPERPOWERS ✦ OPEN SOURCE ✦ XICHI AI ✦ VOICE AI COMPANION ✦',
  navItems: [
    { label: 'Home', href: '#home', sectionId: 'home' },
    { label: 'Produk', href: '#products', sectionId: 'products' },
    { label: 'Tools', href: '#tools', sectionId: 'tools' },
    { label: 'Tentang', href: '#about', sectionId: 'about' },
    { label: 'Pengadaan', href: '#pengadaan', sectionId: 'pengadaan' },
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
    variants: 3,
  },
};
