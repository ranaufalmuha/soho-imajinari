/**
 * Filmografi Imajinari sebagai studio utama.
 *
 * Poster asli di `public/film/poster/vertical/`; film yang belum punya file
 * poster memakai gambar demo ReactBits sebagai placeholder.
 * `poster` ditulis eksplisit per film (bukan urutan array) supaya tidak
 * bergeser saat filmografi bertambah. Array `RAW` disimpan kronologis sesuai
 * sumber; `FILMS` yang diekspor sudah diurutkan dari tahun terbaru ke terlama
 * untuk tampilan.
 *
 * Halaman detail film: `/film/[slug]` — `slug` wajib unik dan stabil
 * (jangan diubah setelah terindeks; itu URL publiknya).
 */

export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "x"
  | "facebook"
  | "threads";

export interface FilmSocial {
  platform: SocialPlatform;
  /** URL lengkap akun resmi film. */
  url: string;
  /** Nama akun untuk label tombol, mis. "@agaklaen". */
  handle?: string;
}

/**
 * Akun sosial resmi studio (Imajinari) yang tampil di halaman detail film.
 *
 * Halaman film untuk sementara hanya menampilkan Instagram, TikTok, dan
 * YouTube. X/Facebook/Threads tetap didukung tipe `SocialPlatform` (dan
 * ikonnya sudah tersedia di `FilmAbout.astro`) — tinggal ditambahkan lagi
 * di sini kalau mau ditampilkan.
 *
 * URL-nya sama dengan yang dipakai `SocialLinks.tsx` di navbar, jadi jangan
 * diubah sepihak — kalau akun pindah, ubah di sini dan di sana.
 */
export const STUDIO_SOCIALS: FilmSocial[] = [
  {
    platform: "instagram",
    url: "https://www.instagram.com/imajinari.id/",
    handle: "@imajinari.id",
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@imajinari.id",
    handle: "@imajinari.id",
  },
  {
    platform: "youtube",
    url: "https://www.youtube.com/@Imajinari",
    handle: "@Imajinari",
  },
];

export interface Film {
  /** URL publik: /film/<slug>. Huruf kecil + strip. */
  slug: string;
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

  // ---- Data halaman detail (semua opsional, section disembunyikan bila kosong) ----

  /** Sinopsis panjang, satu string per paragraf. */
  synopsisLong?: string[];
  /** Durasi dalam menit. */
  runtime?: number;
  /** Tanggal rilis format ISO (YYYY-MM-DD). */
  releaseDate?: string;
  language?: string;
  writers?: string[];
  cast?: string[];
  /** Jumlah penonton bioskop (angka mentah; diformat di UI). */
  audience?: number;
  awards?: string[];
  /** YouTube video ID trailer resmi. Kosong = pakai showreel studio. */
  trailer?: string;
  /** Akun sosial media resmi film. TODO: isi per film begitu tersedia. */
  socials?: FilmSocial[];
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
    slug: "ngeri-ngeri-sedap",
    title: "Ngeri-Ngeri Sedap",
    year: "2022",
    director: "Bene Dion Rajagukguk",
    genre: "Drama komedi",
    synopsis:
      "Sepasang orang tua Batak berpura-pura hendak bercerai demi memulangkan anak-anaknya yang merantau.",
    synopsisLong: [
      "Pak Domu dan Mak Domu memanggil pulang ketiga anak mereka dari perantauan dengan cara yang nekat: berpura-pura hendak bercerai. Mereka berharap rencana itu cukup mengguncang keluarga hingga semua anak kembali ke tanah Batak.",
      "Di rumah, perbedaan jalan hidup antara orang tua dan anak-anak perlahan terbuka — soal adat, pekerjaan, dan siapa yang berhak menentukan masa depan. Tawa dan luka keluarga datang bergantian sampai setiap pihak harus memilih apa yang benar-benar ingin mereka pertahankan.",
    ],
    poster: "/film/poster/vertical/ngeringeri_sedap.jpg",
    backdrop: "/film/poster/horizontal/ngeringeri_sedap.webp",
    partners: "Visionari Film Fund",
    runtime: 114,
    releaseDate: "2022-06-02",
    language: "Indonesia, Batak",
    cast: [
      "Arswendy Bening Swara",
      "Tika Panggabean",
      "Boris Bokir",
      "Gita Bhebhita",
      "Lolox",
      "Indra J. Manurung",
    ],
    audience: 2800000,
    awards: ["Box office 2022"],
    trailer: "i2yeRM9jcqc",
    socials: [],
  },
  {
    slug: "jatuh-cinta-seperti-di-film-film",
    title: "Jatuh Cinta Seperti di Film-Film",
    year: "2023",
    director: "Yandy Laurens",
    genre: "Drama romansa",
    synopsis:
      "Seorang penulis skenario yang patah hati mencoba memenangkan kembali cinta lamanya lewat naskah film.",
    synopsisLong: [
      "Bagus, seorang penulis skenario, masih menyimpan perasaan pada Hana, perempuan yang dulu meninggalkannya. Ketika mereka dipertemukan lagi, ia menulis ulang kisah cinta mereka sebagai naskah film — hitam putih, seperti film-film lama yang ia idolakan.",
      "Batas antara naskah dan kenyataan perlahan kabur. Bagus harus memutuskan apakah ia sedang menulis akhir yang ia inginkan, atau belajar menerima bahwa cinta tidak selalu mengikuti alur cerita yang rapi.",
    ],
    poster: "/film/poster/vertical/jatuh_cinta_seperti_di_film_film.jpg",
    backdrop: "/film/poster/horizontal/jatuh_cinta_seperti_di_film_film.webp",
    partners: "Jagartha, Trinity Entertainment, Cerita Films",
    runtime: 118,
    releaseDate: "2023-11-30",
    language: "Indonesia",
    cast: ["Ringgo Agus Rahman", "Nirina Zubir"],
    awards: [
      "FFI 2024 — 7 penghargaan",
      "Letterboxd — 10 Film Romantis Terbaik 2023",
    ],
    trailer: "F6jPobzz-ag",
    socials: [],
  },
  {
    slug: "agak-laen",
    title: "Agak Laen",
    year: "2024",
    director: "Muhadkly Acho",
    genre: "Komedi horor",
    synopsis:
      "Empat penjaga rumah hantu yang sepi pengunjung nekat menyembunyikan mayat demi menyelamatkan usaha mereka.",
    synopsisLong: [
      "Empat sekawan penjaga rumah hantu melihat usaha mereka sekarat: pengunjung makin sedikit, tagihan makin menumpuk. Ketika seorang pengunjung tewas di dalam wahana, mereka memilih jalan paling nekat — menyembunyikan mayat itu agar rumah hantu tetap buka.",
      "Rencana yang awalnya rapi berubah jadi rangkaian kekacauan. Setiap keputusan kecil membuka masalah baru, dan keempatnya harus bertahan dari penyelidikan, rasa bersalah, dan satu sama lain.",
    ],
    poster: "/film/poster/vertical/agak_laen.jpeg",
    backdrop: "/film/poster/horizontal/agak_laen.jpg",
    partners:
      "Jagartha, Trinity Entertainment, A&Z Films, Legacy Pictures, Agak Laen",
    runtime: 119,
    releaseDate: "2024-02-01",
    language: "Indonesia",
    cast: [
      "Bene Dion Rajagukguk",
      "Oki Rengga",
      "Indra Jegel",
      "Boris Bokir",
    ],
    audience: 9125188,
    awards: ["Piala Antemas FFI 2024"],
    trailer: "0YLSPyGA4h0",
    socials: [],
  },
  {
    slug: "harta-tahta-raisa",
    title: "Harta Tahta Raisa",
    year: "2024",
    director: "Soleh Solihun",
    genre: "Dokumenter musik",
    synopsis:
      "Perjalanan Raisa menuju konser tunggal di Gelora Bung Karno, dari latihan hingga malam puncak.",
    synopsisLong: [
      "Dokumenter ini mengikuti Raisa di balik layar persiapan konser tunggalnya di Gelora Bung Karno — panggung terbesar dalam kariernya. Kamera masuk ke ruang latihan, rapat produksi, dan momen-momen tenang yang jarang terlihat.",
      "Yang terekam bukan hanya kemegahan konser, tetapi juga beban dan keraguan seorang musisi yang harus membuktikan bahwa ia layak berdiri di panggung sebesar itu.",
    ],
    poster: "/film/poster/vertical/harta_tahta_raisa.jpeg",
    backdrop: "/film/poster/horizontal/harta_tahta_raisa.jpg",
    partners: "Juni Records, Jagartha, Trinity Entertainment",
    language: "Indonesia",
    cast: ["Raisa"],
    trailer: "PRuv0CBNGvw",
    socials: [],
  },
  {
    slug: "kaka-boss",
    title: "Kaka Boss",
    year: "2024",
    director: "Arie Kriting",
    genre: "Drama komedi",
    synopsis:
      "Seorang debt collector timur yang ditakuti diam-diam mengejar mimpinya menjadi penyanyi demi putrinya.",
    synopsisLong: [
      "Di mata orang-orang, Kaka Boss adalah penagih utang yang ditakuti. Di rumah, ia hanya ayah yang berusaha menghidupi putrinya — dan menyimpan cita-cita lama yang tak pernah ia beranikan: menjadi penyanyi.",
      "Ketika kesempatan itu muncul, ia harus berhadapan dengan citra yang sudah melekat pada dirinya, tekanan pekerjaan, dan kenyataan bahwa mimpi tidak selalu datang di waktu yang nyaman.",
    ],
    poster: "/film/poster/vertical/kaka_boss.jpg",
    backdrop: "/film/poster/horizontal/kaka_boss.jpg",
    partners:
      "Jagartha, Trinity Entertainment, A&Z Films, Karma Club, Legacy Pictures",
    language: "Indonesia",
    trailer: "s-nlqqWtaR8",
    socials: [],
  },
  {
    slug: "cinta-tak-seindah-drama-korea",
    title: "Cinta Tak Seindah Drama Korea",
    year: "2024",
    director: "Meira Anastasia",
    genre: "Drama romansa",
    synopsis:
      "Seorang penggemar drama Korea terbang ke Seoul dan menemukan cinta yang tak seindah di layar kaca.",
    synopsisLong: [
      "Terobsesi pada drama Korea, seorang perempuan memutuskan berangkat ke Seoul untuk mengejar hidup yang selama ini hanya ia lihat di layar. Ia membayangkan pertemuan yang manis, konflik yang romantis, dan akhir bahagia yang rapi.",
      "Kenyataan di Seoul jauh lebih berantakan — dan justru di situlah ia mulai belajar membedakan antara cerita yang menghibur dan cinta yang sungguh-sungguh.",
    ],
    poster: "/film/poster/vertical/cinta_tak_seindah_drama_korea.jpeg",
    backdrop: "/film/poster/horizontal/cinta_tak_seindah_drama_korea.jpg",
    partners:
      "Jagartha, Trinity Entertainment, Legacy Pictures, A&Z Films, Navarros, Rhaya Flicks",
    language: "Indonesia",
    trailer: "o-S6lNvttno",
    socials: [],
  },
  {
    slug: "agak-laen-menyala-pantiku",
    title: "Agak Laen: Menyala Pantiku!",
    year: "2025",
    director: "Muhadkly Acho",
    genre: "Komedi kriminal",
    synopsis:
      "Kuartet Agak Laen kembali — kali ini terseret kasus kriminal yang menyalakan panti pijat mereka.",
    synopsisLong: [
      "Empat sekawan yang kini punya usaha baru harus kembali berurusan dengan masalah jauh di luar rencana. Sebuah kasus kriminal menyeret mereka ke jaringan yang lebih besar, rumit, dan berbahaya daripada rumah hantu yang dulu mereka kelola.",
      "Sekuel ini memperbesar skala kekacauan tanpa melepas ciri khasnya: humor yang lahir dari kepanikan empat orang yang selalu merasa punya rencana.",
    ],
    poster: "/film/poster/vertical/agak_laen_menyala_pantiku.jpg",
    backdrop: "/film/poster/horizontal/agak_laen_menyala_pantiku.jpeg",
    nowShowing: true,
    partners:
      "Jagartha, Trinity Entertainment, Legacy Pictures, A&Z Films, Navarros, Agak Laen",
    language: "Indonesia",
    cast: [
      "Bene Dion Rajagukguk",
      "Oki Rengga",
      "Indra Jegel",
      "Boris Bokir",
    ],
    audience: 11000866,
    awards: ["Film Indonesia terlaris sepanjang masa"],
    trailer: "KGWkDj_vMOM",
    socials: [],
  },
  {
    slug: "sore-istri-dari-masa-depan",
    title: "Sore: Istri dari Masa Depan",
    year: "2025",
    director: "Yandy Laurens",
    genre: "Romansa fiksi ilmiah",
    synopsis:
      "Jonathan menjalani hidup berantakan di Zagreb hingga Sore muncul mengaku sebagai istrinya dari masa depan — datang untuk mencegah kematiannya.",
    synopsisLong: [
      "Jonathan hidup sendiri di Zagreb, jauh dari rumah dan dari versi dirinya yang ia harapkan. Suatu hari Sore muncul dan mengaku sebagai istrinya — dari masa depan, dengan satu tugas: mencegah kematian Jonathan.",
      "Keduanya perlahan mengenal satu sama lain dalam urutan yang terbalik: Sore sudah tahu bagaimana kisah mereka berakhir, Jonathan belum. Pertanyaan yang tersisa bukan lagi apakah masa depan bisa diubah, melainkan apakah mereka ingin mengubahnya.",
    ],
    poster: "/film/poster/vertical/Sore_a_wife_from_the_future.jpg",
    backdrop: "/film/poster/horizontal/Sore_a_wife_from_the_future.jpg",
    nowShowing: true,
    partners: "Cerita Films",
    language: "Indonesia",
    trailer: "HiVzpboRpR0",
    socials: [],
  },
  {
    slug: "tinggal-meninggal",
    title: "Tinggal Meninggal",
    year: "2025",
    director: "Kristo Immanuel",
    genre: "Komedi hitam",
    synopsis:
      "Rencana pemakaman yang seharusnya sederhana berubah menjadi rangkaian kekacauan penuh tawa gelap.",
    synopsisLong: [
      "Sebuah pemakaman seharusnya menjadi urusan yang jelas: hadir, berduka, lalu pulang. Tetapi keluarga yang ditinggalkan justru terseret ke dalam kekacauan yang makin lama makin tidak masuk akal.",
      "Lewat humor hitam, film ini menguji seberapa jauh orang bisa bertahan ketika duka, uang, dan ego keluarga bercampur dalam satu ruangan.",
    ],
    poster: "/film/poster/vertical/tinggal_meninggal.jpeg",
    backdrop: "/film/poster/horizontal/tinggal_meninggal.jpg",
    nowShowing: true,
    partners:
      "Jagartha, Trinity Entertainment, Legacy Pictures, A&Z Films, Navarros",
    language: "Indonesia",
    trailer: "Z_G2cU5-vSk",
    socials: [],
  },
  {
    slug: "lupa-daratan",
    title: "Lupa Daratan",
    year: "2025",
    director: "Ernest Prakasa",
    genre: "Komedi",
    synopsis:
      "Ketenaran mendadak membuat seorang komika lupa daratan, hingga hidupnya menagih kembali semuanya.",
    synopsisLong: [
      "Seorang komika yang bertahun-tahun tampil di panggung kecil tiba-tiba mendapat ketenaran yang ia impikan. Publik menyukainya, tawaran datang terus, dan hidupnya berubah dalam hitungan bulan.",
      "Masalahnya, ketenaran tidak datang bersama kesadaran. Satu per satu orang di sekitarnya mulai menjauh, dan ia harus berhadapan dengan versi dirinya yang ia sendiri tidak kenali.",
    ],
    poster: "/film/poster/vertical/lupa_daratan.jpg",
    backdrop: "/film/poster/horizontal/lupa_daratan.jpeg",
    partners: "Netflix Original Indonesia",
    language: "Indonesia",
    trailer: "EPymsvhuT-E",
    socials: [],
  },
  {
    slug: "operasi-pesta-copet",
    title: "Operasi Pesta Copet",
    year: "2026",
    director: "Edy Khemod",
    genre: "Komedi kriminal",
    synopsis:
      "Komplotan copet amatir menyusup ke pesta mewah dan mendapati target mereka bukan orang sembarangan.",
    synopsisLong: [
      "Sebuah komplotan copet amatir merencanakan aksi besar: menyusup ke pesta mewah dan menguras barang berharga para tamu. Rencananya sederhana, eksekusinya tidak.",
      "Ketika target mereka ternyata bukan orang sembarangan, pesta itu berubah jadi permainan kucing-kucingan yang menempatkan setiap anggota komplotan pada risiko yang jauh lebih besar dari yang mereka perkirakan.",
    ],
    poster: "/film/poster/vertical/pesta_copet.jpeg",
    backdrop: "/film/poster/horizontal/pesta_copet.jpg",
    partners:
      "Angin Segar, Boss Creator, Jagartha, Trinity Entertainment, Legacy Pictures, Navarros",
    language: "Indonesia",
    trailer: "qeXsUo-ZyFE",
    socials: [],
  },
  {
    slug: "pulang-kampung",
    title: "Pulang Kampung",
    year: "2026",
    director: "Bene Dion Rajagukguk",
    genre: "Musikal",
    synopsis:
      "Perjalanan pulang yang dibalut lagu — tentang rumah, keluarga, dan semua yang ditinggalkan di kota.",
    synopsisLong: [
      "Perjalanan pulang seharusnya jadi hal sederhana. Bagi orang-orang dalam film ini, pulang berarti menghadapi rumah yang berubah, keluarga yang menua, dan versi diri yang mereka tinggalkan saat pergi ke kota.",
      "Dibalut lagu dan koreografi, cerita ini merayakan hal-hal kecil yang membuat seseorang tetap merasa punya tempat untuk kembali.",
    ],
    poster: "/film/poster/vertical/pulang_kampung.jpeg",
    backdrop: "/film/poster/horizontal/pulang_kampung.webp",
    nowShowing: true,
    partners: "—",
    language: "Indonesia",
    trailer: "tlI4ByX7KX4",
    socials: [],
  },
];

export const FILMS: Film[] = RAW.map((film, index) => ({
  ...film,
  // Film tanpa poster asli memakai placeholder demo secara berurutan.
  poster: film.poster || FALLBACKS[index % FALLBACKS.length],
}))
  // Tampilan memakai urutan terbaru → terlama. `RAW` tetap kronologis
  // (mengikuti sumber), jadi jangan mengandalkan urutan `FILMS` untuk itu.
  // `sort` stabil: film di tahun yang sama tetap mengikuti urutan sumber.
  .sort((a, b) => Number(b.year) - Number(a.year));

/** Video showreel studio — fallback latar hero selama trailer resmi film
 *  belum diisi di `trailer`. */
export const SHOWREEL_VIDEO_ID = "7D6sgJYAiDE";

/** Poster horizontal terbaik yang tersedia untuk hero/OG. */
export function filmBackdrop(film: Film): string {
  return film.backdrop || film.poster;
}

export function getFilmBySlug(slug: string): Film | undefined {
  return FILMS.find((film) => film.slug === slug);
}

/** Pecah genre jadi kata kunci agar "Drama komedi" cocok dengan "Komedi horor". */
function genreTokens(genre: string): string[] {
  return genre
    .toLowerCase()
    .split(/[\s,/]+/)
    .filter(Boolean);
}

/**
 * Film serupa untuk section "Film serupa" di halaman detail.
 * Prioritas: sutradara sama → genre beririsan → tahun terdekat.
 * Deterministik (tanpa Math.random) supaya HTML hasil build stabil.
 */
export function getSimilarFilms(film: Film, limit = 6): Film[] {
  const tokens = new Set(genreTokens(film.genre));
  const year = Number(film.year);

  return FILMS.filter((candidate) => candidate.slug !== film.slug)
    .map((candidate) => {
      const sharedGenres = genreTokens(candidate.genre).filter((token) =>
        tokens.has(token),
      ).length;
      const yearGap = Math.abs(Number(candidate.year) - year);

      return {
        candidate,
        score:
          (candidate.director === film.director ? 4 : 0) +
          sharedGenres * 2 +
          Math.max(0, 3 - yearGap * 0.5),
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        Number(b.candidate.year) - Number(a.candidate.year),
    )
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

/** 114 → "1 jam 54 menit". */
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} menit`;
  if (!rest) return `${hours} jam`;
  return `${hours} jam ${rest} menit`;
}

/** ISO → "2 Juni 2022". */
export function formatReleaseDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/** 9125188 → "9,1 juta penonton". */
export function formatAudience(count: number): string {
  if (count >= 1_000_000) {
    const millions = new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 1,
    }).format(count / 1_000_000);
    return `${millions} juta penonton`;
  }
  if (count >= 1_000) {
    return `${new Intl.NumberFormat("id-ID").format(count)} penonton`;
  }
  return `${count} penonton`;
}
