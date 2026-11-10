# IMAJINARI — SEO Project

Website SEO untuk **PT. Akal Andal Askara (IMAJINARI)** — rumah produksi film milik Ernest Prakasa & Dipa Andika, bagian dari Hahaha Corp.

> Jargon: *“Making the world a better place, one great story at a time.”*

Repo ini adalah fondasi situs (Astro + React + Tailwind) yang dioptimasi untuk mesin pencari: halaman profil perusahaan, filmografi, dan artikel yang menargetkan kata kunci film Indonesia.

## Tentang Perusahaan (ringkas)

- **Nama:** PT. Akal Andal Askara (IMAJINARI)
- **Industri:** Perfilman (film + serial web)
- **Pendiri:** Ernest Prakasa & Dipa Andika
- **Pemilik:** Hahaha Corp (PT. Tawa Tiada Tara)
- **Kantor:** Jl. Kubis IV No.125, Pulo, Kebayoran Baru, Jakarta Selatan 12160
- **Wilayah:** Indonesia
- **Aktif:** 2022–sekarang
- **YouTube:** [@Imajinari](https://www.youtube.com/@Imajinari)

### Filmografi utama

| Film | Tahun | Catatan |
| --- | --- | --- |
| Ngeri-Ngeri Sedap | 2022 | Film perdana, ±2,8 jt penonton, box office |
| Jatuh Cinta Seperti di Film-Film | 2023 | Hitam-putih, Ringgo Agus Rahman & Nirina Zubir; 7 Piala FFI 2024 |
| Agak Laen | 2024 | 9.125.188 penonton; Piala Antemas FFI 2024 |
| Agak Laen: Menyala Pantiku! | 2025/2026 | 11.000.866 penonton; film Indonesia terlaris sepanjang masa |

Detail lengkap + angka milestone ada di [`docs/IMAJINARI.md`](docs/IMAJINARI.md).

## Tech Stack

- [Astro](https://docs.astro.build) 7 + `@astrojs/react`
- React 19 + `motion` + `lucide-react`
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Three.js (`VerticalReel` hero 3D)

## Struktur Proyek

```text
/
├── public/
│   ├── favicon.svg
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ReelHero.tsx            # hero (data dummy — WAJIB diganti film asli)
│   │   ├── blocks/showcase-8.tsx   # section karya terpilih (data dummy)
│   │   └── react-bits/vertical-reel.tsx  # reel 3D (WebGL)
│   ├── layouts/Layout.astro        # <head> global — pusat kerja SEO teknis
│   ├── pages/index.astro           # homepage
│   ├── lib/utils.ts
│   └── styles/global.css
├── docs/
│   ├── IMAJINARI.md                # fakta perusahaan & film (sumber konten)
│   ├── SEO.md                      # strategi + checklist teknis + audit awal
│   └── KONTEN.md                   # keyword map + template brief artikel
└── package.json
```

## Cara Jalan

```sh
npm install
npm run dev      # dev server di localhost:4321
npm run build    # build produksi ke ./dist/
npm run preview  # pratinjau hasil build
```

> Catatan AGENTS.md: perintah dev standar di repo ini adalah `astro dev --background`
> (start/stop/status/logs via `astro dev ...`). `npm run dev` di atas setara untuk
> yang tidak memakai wrapper tersebut.

## Fokus SEO Project Ini

1. **Konten dulu:** ganti semua data dummy (`ReelHero.tsx`, `showcase-8.tsx`)
   dengan film asli Imajinari — judul, sinopsis, alt text Bahasa Indonesia.
2. **Teknis:** benahi `<head>` di `Layout.astro` (lang, canonical, OG/Twitter,
   JSON-LD). Daftar lengkap di [`docs/SEO.md`](docs/SEO.md).
3. **Struktur:** tambah halaman `/film/[slug]`, `/tentang`, `/berita` —
   lihat peta situs di [`docs/SEO.md`](docs/SEO.md).

## Docs

| Dokumen | Isi |
| --- | --- |
| [`docs/IMAJINARI.md`](docs/IMAJINARI.md) | Fakta perusahaan & filmografi (bahan nulis, sudah + milestone penonton) |
| [`docs/SEO.md`](docs/SEO.md) | Strategi SEO, arsitektur situs, audit teknis awal situs ini |
| [`docs/KONTEN.md`](docs/KONTEN.md) | Keyword map, kalender konten, template brief artikel |

## Status & Next

- [x] Fondasi Astro + hero 3D + section showcase
- [ ] Ganti data dummy dengan konten film asli
- [ ] Benahi `Layout.astro` (meta, OG, JSON-LD, `lang="id"`)
- [ ] Tambah `robots.txt`, `sitemap.xml`, halaman film dinamis
- [ ] Publish artikel batch pertama (lihat `docs/KONTEN.md`)

---
*Sumber fakta perusahaan: Wikipedia bahasa Indonesia — PT. Akal Andal Askara (Imajinari).*
