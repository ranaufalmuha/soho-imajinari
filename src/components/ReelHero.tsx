import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import VerticalReel from "./react-bits/vertical-reel";
import { FILMS } from "./films";
import { TICKETS_URL } from "./tickets";

// Item reel HANYA film yang sedang tayang (`nowShowing`), bukan seluruh
// filmografi. `title` = judul film (jadi heading hero), `subtitle` =
// sinopsis singkat (dipotong di 3 baris oleh CSS).
// Gambar memakai `backdrop` (poster horizontal 16:9, cocok untuk kartu reel)
// dan jatuh kembali ke `poster` vertikal kalau belum ada.
const ITEMS = FILMS.filter((film) => film.nowShowing).map((film) => ({
  slug: film.slug,
  src: film.backdrop || film.poster,
  alt: `Poster ${film.title} (${film.year}), sutradara ${film.director}`,
  title: film.title,
  subtitle: film.synopsis,
  href: `/film/${film.slug}`,
}));

export default function ReelHero() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const current = ITEMS[active] ?? ITEMS[0];

  const swap = {
    duration: reduceMotion ? 0 : 0.45,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-[#08080d] pt-24 text-neutral-100 sm:pt-28">
      {/* Reel 3D di paruh atas hero (naik dari posisi tengah sebelumnya).
          wheel={false} supaya gulir halaman tidak ikut tertelan —
          reel hanya digerakkan dengan seret/sentuh (plus tombol panah keyboard). */}
      {/* Wadah reel. Cincin selalu berada di TENGAH wadah (geo.cy = height / 2),
          jadi ruang kosong di bawah kartu = (1 - size) / 2 x tinggi wadah.
          Untuk mendekatkan teks ke kartu: perkecil tinggi wadah dan/atau
          perbesar `size` — jangan pakai translate, itu tidak menggeser layout. */}
      <div className="relative z-10 h-[56svh] min-h-[340px] w-full shrink-0">
        <VerticalReel
          items={ITEMS}
          captions={false}
          wheel={false}
          radius={0}
          aspect={16 / 9}
          size={0.7}
          onIndexChange={setActive}
          className="absolute inset-0"
          style={{ minHeight: 0 }}
          ariaLabel="Galeri film imajinari. Seret atau sentuh untuk memutar, atau gunakan tombol panah untuk berpindah film."
        />
      </div>

      {/* Teks + aksi, menempel tepat di bawah reel */}
      <div className="relative z-10 flex shrink-0 flex-col items-center px-6 pt-2 pb-12 text-center sm:px-10">
        <p className="text-xs font-medium tracking-[0.08em] text-neutral-400 uppercase">
          Sedang tayang
        </p>

        {/* Semua panel ditumpuk di satu sel grid: tinggi wadah otomatis mengikuti
            panel tertinggi (judul 2 baris + sinopsis 3 baris), sehingga tombol
            tidak pernah meloncat dan tidak ada celah sisa. */}
        <div className="mt-4 grid w-full max-w-2xl">
          {ITEMS.map((item, index) => {
            const isActive = index === active;
            return (
              <motion.div
                key={item.title}
                className="col-start-1 row-start-1 flex flex-col items-center"
                aria-hidden={!isActive}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, y: isActive || reduceMotion ? 0 : 10 }}
                transition={swap}
                style={{ pointerEvents: isActive ? "auto" : "none" }}
              >
                <h1 className="text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  {item.title}
                </h1>
                <p
                  title={item.subtitle}
                  className="mx-auto mt-4 line-clamp-3 max-w-md text-sm leading-relaxed text-neutral-300 text-pretty sm:text-base"
                >
                  {item.subtitle}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  {/* Tiket film yang sedang tayang — URL pusat di tickets.ts */}
                  <a
                    href={TICKETS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isActive ? 0 : -1}
                    className="rounded-full bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white"
                  >
                    Get Tickets
                  </a>
                  {/* Tombol menuju halaman detail film yang sedang aktif. */}
                  <a
                    href={`/film/${current.slug}`}
                    tabIndex={isActive ? 0 : -1}
                    className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/15"
                  >
                    Tentang Film
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
