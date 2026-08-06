# Quality Gates

- `verify:structure`: memastikan section, media, dan file inti tersedia.
- `astro check`: type checking `.astro` dan TypeScript.
- `eslint`: aturan kode typed; fragment dan motion legacy dikecualikan sementara.
- `vitest`: unit test data/config.
- `playwright`: desktop/mobile smoke test dan overflow check.
- `build`: static production build.
- `lighthouse`: performance, accessibility, dan SEO.
- `knip`: unused exports/dependencies.

Build tidak boleh dianggap selesai jika homepage kosong, horizontal overflow muncul, project overlay gagal dibuka, atau reduced-motion tetap menjalankan sticky sequence berat.
