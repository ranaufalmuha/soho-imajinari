/**
 * Filmografi Imajinari sebagai studio utama.
 *
 * Poster asli di `public/film/poster/vertical/`; film yang belum punya file
 * poster memakai gambar demo ReactBits sebagai placeholder.
 * `poster` ditulis eksplisit per film (bukan urutan array) supaya tidak
 * bergeser saat filmografi bertambah. Urutan mengikuti sumber (kronologis).
 */

export interface Film {
  title: string;
  year: string;
  director: string;
  genre: string;
  /** Sinopsis pendek untuk deskripsi hero. Ganti dengan sinopsis resmi. */
  synopsis: string;
  /** Mitra koproduksi, sesuai urutan pada sumber. */
  partners: string;
  poster: string;
  /** Poster horizontal untuk hero reel (kartu 16:9). Opsional —
      kalau kosong, hero memakai `poster`. */
  backdrop?: string;
  /** Sedang tayang di bioskop. Hero hanya menampilkan film yang
      ditandai ini; daftar lain (showcase, grid, arsip) tetap memakai
      seluruh filmografi. */
  nowShowing?: boolean;
}

const FALLBACKS = [
  "https://pro.reactbits.dev/demo-media/abstract-amber-loop.webp",
  "https://pro.reactbits.dev/demo-media/abstract-pink-eclipse.webp",
  "https://pro.reactbits.dev/demo-media/abstract-plum-ribbon.webp",
  "https://pro.reactbits.dev/demo-media/abstract-violet-steps.webp",
  "https://pro.reactbits.dev/demo-media/abstract-rose-balance.webp",
  "https://pro.reactbits.dev/demo-media/abstract-coral-fold.webp",
  "https://pro.reactbits.dev/demo-media/abstract-fuchsia-wave.webp",
  "https://pro.reactbits.dev/demo-media/abstract-orchid-orbit.webp",
];

const RAW: Film[] = [
  {
    title: "Ngeri-Ngeri Sedap",
    year: "2022",
    director: "Bene Dion Rajagukguk",
    genre: "Drama komedi",
    synopsis:
      "Sepasang orang tua Batak berpura-pura hendak bercerai demi memulangkan anak-anaknya yang merantau.",
    poster: "/film/poster/vertical/ngeringeri_sedap.jpg",
    backdrop: "/film/poster/horizontal/ngeringeri_sedap.webp",
    partners: "Visionari Film Fund",
  },
  {
    title: "Jatuh Cinta Seperti di Film-Film",
    year: "2023",
    director: "Yandy Laurens",
    genre: "Drama romansa",
    synopsis:
      "Seorang penulis skenario yang patah hati mencoba memenangkan kembali cinta lamanya lewat naskah film.",
    poster: "",
    partners: "Jagartha, Trinity Entertainment, Cerita Films",
  },
  {
    title: "Agak Laen",
    year: "2024",
    director: "Muhadkly Acho",
    genre: "Komedi horor",
    synopsis:
      "Empat penjaga rumah hantu yang sepi pengunjung nekat menyembunyikan mayat demi menyelamatkan usaha mereka.",
    poster: "/film/poster/vertical/agak_laen.jpeg",
    backdrop: "/film/poster/horizontal/agak_laen.jpg",
    partners:
      "Jagartha, Trinity Entertainment, A&Z Films, Legacy Pictures, Agak Laen",
  },
  {
    title: "Harta Tahta Raisa",
    year: "2024",
    director: "Soleh Solihun",
    genre: "Dokumenter musik",
    synopsis:
      "Perjalanan Raisa menuju konser tunggal di Gelora Bung Karno, dari latihan hingga malam puncak.",
    poster: "",
    partners: "Juni Records, Jagartha, Trinity Entertainment",
  },
  {
    title: "Kaka Boss",
    year: "2024",
    director: "Arie Kriting",
    genre: "Drama komedi",
    synopsis:
      "Seorang debt collector timur yang ditakuti diam-diam mengejar mimpinya menjadi penyanyi demi putrinya.",
    poster: "",
    partners:
      "Jagartha, Trinity Entertainment, A&Z Films, Karma Club, Legacy Pictures",
  },
  {
    title: "Cinta Tak Seindah Drama Korea",
    year: "2024",
    director: "Meira Anastasia",
    genre: "Drama romansa",
    synopsis:
      "Seorang penggemar drama Korea terbang ke Seoul dan menemukan cinta yang tak seindah di layar kaca.",
    poster: "",
    partners:
      "Jagartha, Trinity Entertainment, Legacy Pictures, A&Z Films, Navarros, Rhaya Flicks",
  },
  {
    title: "Agak Laen: Menyala Pantiku!",
    year: "2025",
    director: "Muhadkly Acho",
    genre: "Komedi kriminal",
    synopsis:
      "Kuartet Agak Laen kembali — kali ini terseret kasus kriminal yang menyalakan panti pijat mereka.",
    poster: "/film/poster/vertical/agak_laen_menyala_pantiku.jpg",
    backdrop: "/film/poster/horizontal/agak_laen_menyala_pantiku.jpeg",
    nowShowing: true,
    partners:
      "Jagartha, Trinity Entertainment, Legacy Pictures, A&Z Films, Navarros, Agak Laen",
  },
  {
    title: "Sore: Istri dari Masa Depan",
    year: "2025",
    director: "Yandy Laurens",
    genre: "Romansa fiksi ilmiah",
    synopsis:
      "Jonathan menjalani hidup berantakan di Zagreb hingga Sore muncul mengaku sebagai istrinya dari masa depan — datang untuk mencegah kematiannya.",
    poster: "/film/poster/vertical/Sore_a_wife_from_the_future.jpg",
    backdrop: "/film/poster/horizontal/Sore_a_wife_from_the_future.jpg",
    nowShowing: true,
    partners: "Cerita Films",
  },
  {
    title: "Tinggal Meninggal",
    year: "2025",
    director: "Kristo Immanuel",
    genre: "Komedi hitam",
    synopsis:
      "Rencana pemakaman yang seharusnya sederhana berubah menjadi rangkaian kekacauan penuh tawa gelap.",
    poster: "/film/poster/vertical/tinggal_meninggal.jpeg",
    backdrop: "/film/poster/horizontal/tinggal_meninggal.jpg",
    nowShowing: true,
    partners:
      "Jagartha, Trinity Entertainment, Legacy Pictures, A&Z Films, Navarros",
  },
  {
    title: "Lupa Daratan",
    year: "2025",
    director: "Ernest Prakasa",
    genre: "Komedi",
    synopsis:
      "Ketenaran mendadak membuat seorang komika lupa daratan, hingga hidupnya menagih kembali semuanya.",
    poster: "",
    partners: "Netflix Original Indonesia",
  },
  {
    title: "Operasi Pesta Copet",
    year: "2026",
    director: "Edy Khemod",
    genre: "Komedi kriminal",
    synopsis:
      "Komplotan copet amatir menyusup ke pesta mewah dan mendapati target mereka bukan orang sembarangan.",
    poster: "",
    partners:
      "Angin Segar, Boss Creator, Jagartha, Trinity Entertainment, Legacy Pictures, Navarros",
  },
  {
    title: "Pulang Kampung",
    year: "2026",
    director: "Bene Dion Rajagukguk",
    genre: "Musikal",
    synopsis:
      "Perjalanan pulang yang dibalut lagu — tentang rumah, keluarga, dan semua yang ditinggalkan di kota.",
    poster: "/film/poster/vertical/pulang_kampung.jpeg",
    backdrop: "/film/poster/horizontal/pulang_kampung.webp",
    nowShowing: true,
    partners: "—",
  },
];

export const FILMS: Film[] = RAW.map((film, index) => ({
  ...film,
  // Film tanpa poster asli memakai placeholder demo secara berurutan.
  poster: film.poster || FALLBACKS[index % FALLBACKS.length],
}));
