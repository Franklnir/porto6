# Architecture

## Lapisan

- `src/pages`: file-based routes Astro.
- `src/layouts`: document shell dan SEO.
- `src/features/portfolio`: homepage hasil migrasi, dibagi menjadi chrome, fragments, client motion, dan helper.
- `src/content/projects`: project content collection yang divalidasi Zod saat build.
- `src/features/projects`: komponen halaman studi kasus baru dan Astro Image pipeline.
- `src/styles/legacy`: CSS source dipisah berdasarkan domain/cascade.
- `public/assets/media`: data URI yang diekstrak dari HTML sehingga HTML lebih ringan dan cacheable.

## Mengapa fragments + set:html?

Astro 7 menggunakan compiler Rust yang lebih ketat. Source HTML besar dipertahankan sebagai fragment raw agar visual tidak berubah dan compiler tidak perlu menafsirkan ulang seluruh markup legacy. Batas section tetap modular, sehingga setiap section bisa dimigrasikan menjadi Astro native secara bertahap.

## Target migrasi lanjutan

1. Pindahkan data project overlay ke Content Collections.
2. Ubah satu section raw menjadi komponen Astro native per iterasi.
3. Konversi motion module dari `// @ts-nocheck` menjadi TypeScript strict.
4. Setelah seluruh lifecycle aman, pertimbangkan `<ClientRouter />`; saat ini browser-native transitions dipakai agar script legacy tetap stabil.
