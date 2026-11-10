# Strategi SEO Imajinari

Situs: Astro (SSG) + React islands. Bahasa target: **Indonesia**. Domain (asumsi):
`imajinari.id` — ganti di semua contoh bila berbeda.

## 1. Arsitektur situs yang diusulkan

```text
/                          → homepage (brand + film unggulan + cuplikan berita)
/tentang                   → profil PT. Akal Andal Askara (E-E-A-T: alamat, pendiri, induk)
/film                      → indeks filmografi
/film/ngeri-ngeri-sedap
/film/jatuh-cinta-seperti-di-film-film
/film/agak-laen
/film/agak-laen-menyala-pantiku
/berita                    → indeks artikel
/berita/[slug]             → artikel (fakta FFI, rekor penonton, dsb.)
/kontak                    → alamat + YouTube + form sederhana
```

Setiap halaman film = peluang ranking untuk keyword `[judul film] + sinopsis/jadwal/pemain/fakta`.

## 2. Keyword map awal

| Halaman | Keyword utama | Keyword turunan |
| --- | --- | --- |
| `/` | imajinari, rumah produksi imajinari | rumah produksi ernest prakasa, PH imajinari |
| `/tentang` | tentang imajinari | PT Akal Andal Askara, pemilik imajinari, hahaha corp |
| `/film/agak-laen` | agak laen | film agak laen, nonton agak laen, pemain agak laen |
| `/film/agak-laen-menyala-pantiku` | agak laen menyala pantiku | film indonesia terlaris, jumlah penonton agak laen 2 |
| `/film/jatuh-cinta-seperti-di-film-film` | jatuh cinta seperti di film-film | film hitam putih indonesia, pemenang FFI 2024 |
| `/film/ngeri-ngeri-sedap` | ngeri-ngeri sedap | film Batak, film perdana imajinari |
| `/berita/*` | lihat `KONTEN.md` | — |

## 3. Fondasi teknis (checklist implementasi)

Prioritas **P0** = kerjakan sebelum launch.

- [ ] **P0** — `<html lang="id">` (sekarang `en`), title & meta description unik per halaman (ID).
- [ ] **P0** — Canonical absolut per halaman (`https://imajinari.id/...`).
- [ ] **P0** — Open Graph + Twitter Card (title, desc, image 1200×630, `og:locale=id_ID`).
- [ ] **P0** — Satu `<h1>` per halaman; hero `ReelHero` harus render judul sebagai teks (sudah), pastikan terbaca crawler tanpa JS.
- [ ] **P0** — `robots.txt` + `sitemap.xml` (pakai `@astrojs/sitemap`) + daftarkan ke Search Console.
- [ ] **P0** — Alt text deskriptif Bahasa Indonesia di semua gambar (hapus URL `pro.reactbits.dev`).
- [ ] **P1** — JSON-LD: `Organization` (homepage) + `Movie` (tiap halaman film) + `NewsArticle`/`BlogPosting` (artikel) + `BreadcrumbList`.
- [ ] **P1** — Halaman 404 + redirect rapi; URL slug konsisten huruf kecil + strip.
- [ ] **P1** — Performance: hero WebGL berat — lazy-load/paused di mobile, `prefers-reduced-motion` sudah ada (pertahankan), target LCP < 2,5 dtk.
- [ ] **P2** — Hreflang hanya bila ada versi EN; bila situs full-ID, tidak perlu.
- [ ] **P2** — Favicon + apple-touch-icon + theme-color + manifest (PWA ringan).

## 4. Audit awal situs ini (per Nov 2026)

Temuan dari kode yang ada sekarang — anggap sebagai backlog P0:

1. `Layout.astro` masih `lang="en"`, satu title generik, satu meta description generik, **tanpa** canonical/OG/Twitter/JSON-LD.
2. `public/` hanya favicon — belum ada `robots.txt`, OG image, manifest.
3. `ReelHero.tsx` + `showcase-8.tsx` masih **data dummy** (8 karya abstrak + 5 proyek fiktif, gambar hotlink `pro.reactbits.dev`). Hotlink = risiko broken + nol nilai SEO. Ganti sebelum index.
4. CTA `#tickets` dan `#tentang-film` masih TODO / anchor mati — crawler & user mentok.
5. `Showcase8` memakai link `href="#"` — ganti ke URL film asli atau jadikan non-link.
6. Satu-satunya route adalah `/` — belum ada `/film/*`, `/tentang`, `/berita` (belum ada konten untuk di-rank).
7. Positif: semantic HTML rapi, `aria-label` ID, `aria-live` di reel, alt text terisi, reduced-motion dihormati — pertahankan saat refactor.

## 5. E-E-A-T & off-page

- Halaman `/tentang` wajib memuat: nama PT, alamat lengkap, pendiri, induk (Hahaha Corp), tahun berdiri — cocokkan persis dengan profil Google Business & Wikipedia (NAP consistency).
- Tautkan keluar ke: YouTube @Imajinari, IMDb tiap film, akun resmi pemain.
- Target backlink awal: liputan FFI 2024 (7 piala + Antemas), artikel rekor 11 jt penonton, direktori PH Indonesia, Wikipedia ( Pranala luar bila memenuhi kelayakan).

## 6. Pengukuran

- Search Console: index coverage, query “imajinari / agak laen / FFI 2024”.
- GA4/Plausible: traffic organik per template halaman (`/film/*` vs `/berita/*`).
- Target 90 hari: homepage + 4 halaman film ter-index, tampil untuk keyword brand, 8 artikel tayang (lihat `KONTEN.md`).
