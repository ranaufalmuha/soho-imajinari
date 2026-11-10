# Rencana Konten & Keyword

Tujuan: mengubah fakta di [`IMAJINARI.md`](IMAJINARI.md) menjadi halaman yang
menang di pencarian Indonesia.

## 1. Pilar konten

| Klaster | Halaman inti | Peran SEO |
| --- | --- | --- |
| Brand | `/`, `/tentang` | Menang keyword “imajinari”, bangun E-E-A-T |
| Film | `/film/*` | Menang keyword judul film jangka panjang |
| Berita/Fakta | `/berita/*` | Rekor penonton, FFI 2024, siniar → IP |
| Edukasi industri | `/berita/*` | “rumah produksi”, “film hitam putih”, “film Batak” |

## 2. Batch artikel pertama (8 artikel, 1–8)

| # | Judul kerja | Keyword utama | Sudut |
| --- | --- | --- | --- |
| 1 | Profil Imajinari: Rumah Produksi di Balik Agak Laen | imajinari, rumah produksi imajinari | Halaman `/tentang` diperkaya |
| 2 | Agak Laen: Menyala Pantiku Tembus 11 Juta Penonton | agak laen menyala pantiku, film indonesia terlaris | Timeline milestone (hari 1 → 28) |
| 3 | Rekor Penonton Film Indonesia: Dari Jumbo ke Menyala Pantiku | film indonesia terlaris sepanjang masa | Perbandingan angka |
| 4 | 7 Piala FFI 2024 untuk Jatuh Cinta Seperti di Film-Film | jatuh cinta seperti di film-film, FFI 2024 | Daftar penghargaan |
| 5 | Kenapa Film Hitam Putih Bisa Menang Festival? | film hitam putih indonesia | Edukasi + studi kasus |
| 6 | Dari Siniar ke Layar Lebar: Jalan IP Agak Laen | siniar agak laen, IP film Indonesia | Proses adaptasi |
| 7 | Ngeri-Ngeri Sedap dan Gelombang Film Bernuansa Batak | ngeri-ngeri sedap, film Batak | Debut PH + konteks budaya |
| 8 | Siapa Ernest Prakasa dan Dipa Andika, Pendiri Imajinari? | ernest prakasa, dipa andika | Profil tokoh, E-E-A-T |

## 3. Template brief artikel

```md
# [Judul kerja]
- Keyword utama:
- Keyword sekunder:
- Search intent: informasional | navigasional | komersial
- Panjang target: 800–1.200 kata
- H1 (final):
- Meta description (≤155 karakter):
- URL slug: /berita/...
- Struktur:
  1. Jawaban singkat di 2 kalimat pertama (untuk AI Overview/snippet)
  2. Konteks & kronologi (pakai tanggal + angka dari IMAJINARI.md)
  3. Bagian “Yang perlu diketahui” (bullet)
  4. FAQ 3 pertanyaan (schema FAQPage opsional)
- Sumber yang dikutip:
- Internal link keluar: (minimal 2 halaman film/tentang)
- Gambar: 1 utama 1200×630 + alt Bahasa Indonesia
```

## 4. Aturan penulisan

- **Jangan pernah** menyalin kalimat Wikipedia langsung — tulis ulang, tambah konteks dan tautan internal.
- Setiap klaim angka (penonton, penghargaan) diberi tanggal + sumber agar tidak basi.
- Sebut entitas secara lengkap di awal artikel (“PT. Akal Andal Askara (Imajinari)”) lalu singkat berikutnya.
- Satu artikel = satu keyword utama. Jangan dua artikel berburu keyword yang sama.
- Setiap artikel wajib internal link ke minimal 2 halaman film + 1 halaman `/tentang`.
- Perbarui artikel rekor penonton begitu ada data baru — konten yang di-update menjaga peringkat.

## 5. Checklist pra-publish

- [ ] Slug huruf kecil + strip, tanpa tanggal di URL artikel berita evergreen
- [ ] Title ≤ 60 karakter, meta description ≤ 155 karakter, keduanya Bahasa Indonesia
- [ ] Satu H1, H2/H3 berjenjang rapi, kata kunci di H1 + paragraf pertama
- [ ] Alt text deskriptif (bukan nama file)
- [ ] Internal link 2 film + 1 tentang, 1–2 tautan keluar otoritatif
- [ ] JSON-LD `NewsArticle` + `BreadcrumbList`
- [ ] OG image 1200×630
- [ ] Masuk `sitemap.xml`, lalu ajukan re-index di Search Console
