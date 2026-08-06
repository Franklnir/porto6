# Deployment

## Vercel

- Build command: `npm run build`
- Output directory: `dist`
- Node: 22
- Adapter tidak diperlukan karena output statis.

## Cloudflare Workers static assets

`wrangler.jsonc` menunjuk ke `./dist`. Jalankan:

```bash
npm run build
npx wrangler deploy
```

Cloudflare Pages juga dapat dipakai dengan build command `npm run build` dan output `dist`.

## Environment variables

Gunakan nilai yang sama pada provider:

- `PUBLIC_SITE_URL`
- `PUBLIC_CONTACT_EMAIL`
- `PUBLIC_CV_URL`
- `PUBLIC_GITHUB_URL`
- `PUBLIC_LINKEDIN_URL`
