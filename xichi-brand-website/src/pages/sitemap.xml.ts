import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://produk.irsyadlabs.id';
  const now = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${siteUrl}/assets/logoxichi.jpg</image:loc>
      <image:title>Logo Xichi AI - Pelopor Xiaozhi Indonesia Voice AI</image:title>
      <image:caption>Xichi AI Asisten Fisik Xiaozhi Indonesia karya IrsyadLabs</image:caption>
    </image:image>
    <image:image>
      <image:loc>${siteUrl}/assets/products/xichi-core-render.jpg</image:loc>
      <image:title>Xichi Core - Asisten AI Fisik Xiaozhi Indonesia</image:title>
      <image:caption>Perangkat pintar Voice AI Xiaozhi ESP32-S3 dengan layar ekspresi emosi 60 FPS</image:caption>
    </image:image>
    <image:image>
      <image:loc>${siteUrl}/assets/products/xichi-pocket-render.jpg</image:loc>
      <image:title>Xichi Pocket - Pendant Saku Voice AI Xiaozhi</image:title>
      <image:caption>Asisten AI portabel mini berbasis ESP32-C3 SuperMini</image:caption>
    </image:image>
    <image:image>
      <image:loc>${siteUrl}/assets/products/xichi-vision-pro-render.jpg</image:loc>
      <image:title>Xichi Vision Pro - AI Vision on-device Xiaozhi</image:title>
      <image:caption>Asisten AI fisik dengan kamera OV2640 dan pengenalan objek visual</image:caption>
    </image:image>
    <image:image>
      <image:loc>${siteUrl}/assets/showcase/chronos-app.webp</image:loc>
      <image:title>Aplikasi Pendamping Android Chronos untuk Xichi Xiaozhi</image:title>
      <image:caption>Integrasi BLE notifikasi dan SmartConfig aplikasi Chronos</image:caption>
    </image:image>
  </url>
  <url>
    <loc>${siteUrl}/komparasi</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${siteUrl}/tentang</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
