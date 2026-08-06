# Motion System

Motion source dibagi menjadi tujuh domain:

1. Core UI, menu, modal, slider, FAQ.
2. Global motion, loader, cursor, image reveal, featured project.
3. Dark curtain section transition.
4. Capability lookbook.
5. Shared profile movement.
6. Horizontal project details.
7. Process lookbook.

Semua modul dimuat dari `src/features/portfolio/client/index.ts`. Masing-masing menggunakan IIFE dan tetap mempertahankan `prefers-reduced-motion`. Jangan menggabungkan transform dari dua modul pada elemen yang sama tanpa membuat CSS custom properties sebagai composition layer.

## Debug motion

- Nonaktifkan satu import di `client/index.ts` untuk menemukan domain yang bermasalah.
- Periksa duplicate listener ketika menambah page transition.
- Gunakan Performance panel untuk memastikan scroll handler menggunakan `requestAnimationFrame`.
- Uji viewport laptop pendek, tablet, serta mobile; sticky animation tidak boleh dipaksakan pada layar kecil.
