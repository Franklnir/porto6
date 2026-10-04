# Panduan Deployment Cloudflare — produk.irsyadlabs.id

Dokumen ini menjelaskan cara mendeploy website produk **Xichi Asisten AI** ke **Cloudflare** dengan subdomain **`produk.irsyadlabs.id`**.

---

## 1. Spesifikasi Build Cloudflare

* **Framework Preset:** Astro
* **Build Command:** `npm run build`
* **Build Output Directory:** `dist`
* **Node.js Version:** `22` (atau 20 LTS)
* **Environment Variable:**
  * `PUBLIC_SITE_URL` = `https://produk.irsyadlabs.id`

---

## 2. Cara Deploy via Cloudflare Pages (Rekomendasi)

1. **Buka Dashboard Cloudflare:** Masuk ke [dash.cloudflare.com](https://dash.cloudflare.com).
2. **Pilih Menu:** `Compute (Workers & Pages)` > `Create application` > `Pages` > `Connect to Git`.
3. **Pilih Repository:** Pilih repo yang berisi folder `xichi-brand-website`.
4. **Isi Pengaturan Build:**
   * **Root directory:** `/xichi-brand-website` (jika monorepo) atau `/` (jika repo terpisah).
   * **Build command:** `npm run build`
   * **Output directory:** `dist`
5. **Tambahkan Custom Subdomain:**
   * Setelah deploy berhasil, buka tab **Custom domains** pada proyek Pages Anda.
   * Klik **Set up a custom domain**.
   * Ketik: **`produk.irsyadlabs.id`**.
   * Cloudflare akan otomatis mengonfigurasi DNS record CNAME ke proyek Pages Anda dengan SSL/TLS aktif seketika.

---

## 3. Cara Deploy via Wrangler CLI

Jika Anda ingin deploy langsung dari terminal/command prompt lokal:

```powershell
cd "c:\Users\frank\Downloads\irsyad-portfolio-astro-production\xichi-brand-website"

# Login ke akun Cloudflare (hanya pertama kali)
npx wrangler login

# Build dan deploy ke Cloudflare
npm run deploy:cloudflare
```

Setelah selesai, tambahkan custom domain `produk.irsyadlabs.id` pada dashboard Worker `xichi-produk` di menu **Triggers** > **Custom Domains**.

---

## 4. Konfigurasi DNS Cloudflare (Manual jika diperlukan)

Jika domain `irsyadlabs.id` menggunakan DNS Cloudflare:
* **Type:** `CNAME`
* **Name:** `produk`
* **Target:** `<nama-proyek-anda>.pages.dev` (atau worker endpoint)
* **Proxy Status:** `Proxied` (Awan Oranye)
* **SSL/TLS Mode:** `Full` atau `Full (strict)`
