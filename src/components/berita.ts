/**
 * Artikel berita Imajinari.
 *
 * Sumber fakta: `docs/IMAJINARI.md` (rekor penonton, FFI 2024, filmografi).
 * Struktur mengikuti template Agentframe: satu artikel = intro + beberapa
 * bagian (heading + teks). Semua konten masih draf editorial — ganti teks dan
 * tanggal terbit dengan artikel asli begitu tersedia.
 *
 * `BERITA` sudah diurutkan dari yang terbaru, jadi kartu di section beranda,
 * halaman indeks, dan "baca juga" otomatis konsisten.
 */

export interface BeritaSection {
  heading: string;
  text: string;
}

export interface Berita {
  /** URL publik: /berita/<slug>. Huruf kecil + strip, tanpa tanggal. */
  slug: string;
  title: string;
  /** Label pendek di kartu, mis. "Rekor" atau "Penghargaan". */
  category: string;
  /** Tanggal terbit format ISO (YYYY-MM-DD). */
  date: string;
  /** Estimasi waktu baca, sudah dalam bentuk teks ("5 menit baca"). */
  readTime: string;
  image: string;
  /** Alt text deskriptif Bahasa Indonesia. */
  alt: string;
  /** Paragraf pembuka / ringkasan. Dipakai juga sebagai meta description. */
  intro: string;
  sections: BeritaSection[];
  /** Slug film terkait — dipakai untuk tautan internal ke halaman film. */
  film?: string;
}

const RAW: Berita[] = [
  {
    slug: "agak-laen-menyala-pantiku-11-juta-penonton",
    title: "Agak Laen: Menyala Pantiku tembus 11 juta penonton",
    category: "Rekor",
    date: "2026-11-08",
    readTime: "4 menit baca",
    image: "/film/poster/horizontal/agak_laen_menyala_pantiku.jpeg",
    alt: "Poster horizontal film Agak Laen: Menyala Pantiku! karya Imajinari",
    intro:
      "Sekuel Agak Laen menutup masa tayangnya dengan 11.000.866 penonton — film Indonesia terlaris sepanjang masa, melampaui rekor yang sebelumnya dipegang film pertamanya sendiri.",
    sections: [
      {
        heading: "Dari 272 ribu ke sebelas juta",
        text: "Perjalanannya terlihat sejak hari pertama: 272.846 penonton. Dalam tiga hari angkanya melewati satu juta, sepekan kemudian lebih dari tiga juta, dan pada hari ke-11 sudah lima juta penonton. Pada hari ke-28, sekuel ini melampaui total Agak Laen yang berhenti di 9.125.188.",
      },
      {
        heading: "Melewati dua nama besar",
        text: "Pada 2 Januari 2026, penonton Menyala Pantiku melewati 10,25 juta dan resmi menjadi film terlaris sepanjang masa Indonesia. Di pasar yang sama, angka itu juga melampaui Jumbo dan Avengers: Endgame yang berhenti di sekitar 10,98 juta penonton.",
      },
      {
        heading: "Kenapa sekuel bisa lebih besar",
        text: "Agak Laen berangkat dari siniar komedi yang sudah punya pendengar setia. Sekuelnya mewarisi basis penonton itu, lalu memperbesar skala cerita: dari rumah hantu ke kasus kriminal. Imajinari memilih menambah kekacauan tanpa mengganti bahan bakunya — empat tokoh yang selalu merasa punya rencana.",
      },
    ],
    film: "agak-laen-menyala-pantiku",
  },
  {
    slug: "tujuh-piala-ffi-2024-jatuh-cinta-seperti-di-film-film",
    title: "Tujuh piala FFI 2024 untuk Jatuh Cinta Seperti di Film-Film",
    category: "Penghargaan",
    date: "2026-11-05",
    readTime: "4 menit baca",
    image: "/film/poster/horizontal/jatuh_cinta_seperti_di_film_film.webp",
    alt: "Poster horizontal film Jatuh Cinta Seperti di Film-Film dalam hitam putih",
    intro:
      "Jatuh Cinta Seperti di Film-Film pulang dari Festival Film Indonesia 2024 dengan tujuh piala — jumlah terbanyak pada edisi itu.",
    sections: [
      {
        heading: "Hitam putih sepanjang film",
        text: "Film ini memakai hitam putih dari menit pertama sampai akhir, bukan sebagai efek sesaat. Pilihan itu memaksa cerita bertumpu pada komposisi, wajah, dan dialog — hal yang jarang ditemui di film romansa Indonesia arus utama.",
      },
      {
        heading: "Tujuh piala dalam satu malam",
        text: "Perjalanan film ini tidak berhenti di box office. Di FFI 2024, Jatuh Cinta Seperti di Film-Film membawa pulang tujuh penghargaan, capaian tertinggi pada edisi tersebut. Film ini juga masuk daftar Letterboxd sebagai salah satu film romantis terbaik 2023.",
      },
      {
        heading: "Dua kutub di tahun yang sama",
        text: "Yang membuat 2024 menarik: pada tahun yang sama Imajinari merilis Agak Laen yang menembus 9,1 juta penonton dan menerima Piala Antemas. Satu judul menang di bioskop, satu judul menang di festival.",
      },
    ],
    film: "jatuh-cinta-seperti-di-film-film",
  },
  {
    slug: "ngeri-ngeri-sedap-film-bernuansa-batak",
    title: "Ngeri-Ngeri Sedap dan gelombang film bernuansa Batak",
    category: "Analisis",
    date: "2026-11-02",
    readTime: "4 menit baca",
    image: "/film/poster/horizontal/ngeringeri_sedap.webp",
    alt: "Poster horizontal film Ngeri-Ngeri Sedap, film perdana Imajinari",
    intro:
      "Ngeri-Ngeri Sedap adalah film pertama Imajinari: drama keluarga berlatar budaya Batak yang menutup 2022 dengan sekitar 2,8 juta penonton.",
    sections: [
      {
        heading: "Debut yang tidak ikut arus",
        text: "Sebagai film perdana, Ngeri-Ngeri Sedap memilih cerita keluarga daripada formula komedi yang sedang laku. Pak Domu dan Mak Domu berpura-pura hendak bercerai untuk memulangkan anak-anak mereka dari perantauan.",
      },
      {
        heading: "Batak sebagai latar, bukan bumbu",
        text: "Budaya Batak hadir lewat bahasa, adat, dan cara keluarga berbicara satu sama lain — bukan sekadar selipan lokal. Konfliknya universal: anak yang ingin hidup menurut caranya sendiri, orang tua yang merasa berhak menentukan.",
      },
      {
        heading: "Jejak setelahnya",
        text: "Bene Dion Rajagukguk, sutradara film ini, kembali ke Imajinari untuk Pulang Kampung (2026) — film musikal Batak. Ngeri-Ngeri Sedap jadi titik awal arah rumah produksi ini: cerita asli dengan akar lokal.",
      },
    ],
    film: "ngeri-ngeri-sedap",
  },
];

/** Terbaru lebih dulu. */
export const BERITA: Berita[] = [...RAW].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date),
);

export function getBeritaBySlug(slug: string): Berita | undefined {
  return BERITA.find((article) => article.slug === slug);
}

/** Artikel lain untuk blok "Baca juga". */
export function getOtherBerita(slug: string, limit = 2): Berita[] {
  return BERITA.filter((article) => article.slug !== slug).slice(0, limit);
}

export function formatBeritaDate(date: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
