# Architecture

## Lapisan

- `src/pages`: file-based routes Astro.
- `src/layouts`: document shell dan SEO.
- `src/features/portfolio`: homepage hasil migrasi, dibagi menjadi chrome, fragments, client motion, dan helper.
- `src/content/projects`: sumber tunggal data card, overlay, galeri, dan route project yang divalidasi Zod saat build.
- `src/features/projects`: komponen halaman studi kasus baru dan Astro Image pipeline.
- `src/styles/legacy`: CSS source dipisah berdasarkan domain/cascade.
- `public/assets/media`: data URI yang diekstrak dari HTML sehingga HTML lebih ringan dan cacheable.

## Mengapa fragments + set:html?

Astro 7 menggunakan compiler Rust yang lebih ketat. Markup statis yang stabil dipertahankan sebagai fragment raw agar visual tidak berubah. Konten yang sering berubah, terutama project dan galeri, sudah memakai Astro Content Collections dan komponen Astro native.

## Kontrak motion

- `src/features/portfolio/client/index.ts` adalah satu-satunya browser entrypoint homepage.
- Setiap domain motion memiliki satu modul pemilik.
- Dark page-cover dianimasikan langsung pada section `.projects`, `.process`, dan `.contact` melalui class `dark-cover-entering`.
- Jangan menambahkan fixed overlay untuk meniru background section karena akan membentuk dua compositing surface.
- `prefers-reduced-motion` harus menghapus radius, bayangan, dan sticky motion tambahan.

## Target migrasi lanjutan

1. Ubah section raw menjadi komponen Astro native hanya saat section tersebut membutuhkan data dinamis atau sering diedit.
2. Konversi motion module tersisa dari `// @ts-nocheck` menjadi TypeScript strict per domain.
3. Pertahankan regression test desktop/mobile sebelum mengubah sticky atau scroll choreography.
4. Setelah seluruh lifecycle aman, pertimbangkan `<ClientRouter />`; saat ini browser-native transitions dipakai agar script legacy tetap stabil.
