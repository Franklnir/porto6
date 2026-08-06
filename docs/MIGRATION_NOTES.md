# Migration Notes

- Source: `legacy/source.html` (1,754,902 karakter).
- Media data URI yang diekstrak: 4 aset unik.
- Section homepage: 12.
- Script motion: 7 modul.
- CSS cascade: 7 file.

## Keputusan penting

Source tidak ditulis ulang sekaligus karena risiko merusak koreografi scroll dan responsive behavior. Migrasi ini memakai strangler pattern: Astro mengelola route, content, SEO, build, image pipeline, dan quality tools; homepage source dipisah secara modular dan dapat diganti bertahap.
