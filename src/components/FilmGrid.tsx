"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { FILMS } from "./films";

// Arsip filmografi: grid kartu vertikal dengan batas maksimal 3 baris.
// Kapasitas mengikuti jumlah kolom aktif: 2 kol (6) → 3 kol (9) →
// 4 kol (12) → 5 kol (15). Kelebihan slot dipotong dan dibuka
// lewat tombol "Lihat Semua". Total item tidak pernah lebih dari 15.
const MAX_ITEMS = 15;
const MAX_ROWS = 3;

const ALL = FILMS.slice(0, MAX_ITEMS);

// Kolom mengikuti breakpoint grid Tailwind: base 2, md 3, lg 4, xl 5.
function useGridCols() {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const queries: Array<[MediaQueryList, number]> = [
      [window.matchMedia("(min-width: 1280px)"), 5],
      [window.matchMedia("(min-width: 1024px)"), 4],
      [window.matchMedia("(min-width: 768px)"), 3],
    ];
    const compute = () => {
      for (const [mq, c] of queries) {
        if (mq.matches) {
          setCols(c);
          return;
        }
      }
      setCols(2);
    };
    compute();
    queries.forEach(([mq]) => mq.addEventListener("change", compute));
    return () =>
      queries.forEach(([mq]) => mq.removeEventListener("change", compute));
  }, []);
  return cols;
}

export function FilmGrid({ archive = false }: { archive?: boolean }) {
  const reduceMotion = useReducedMotion();
  const cols = useGridCols();
  const [expanded, setExpanded] = useState(false);

  // Mode arsip (/film): tampilkan seluruh filmografi tanpa batas 15.
  const ALL = archive ? FILMS : FILMS.slice(0, MAX_ITEMS);

  const capacity = cols * MAX_ROWS;
  const truncated = !archive && ALL.length > capacity;
  const visible = archive || expanded ? ALL : ALL.slice(0, capacity);

  const reveal = (distance: number): Variants => ({
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  const gridVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.05 } },
  };

  return (
    <section
      id="film"
      className="w-full border-t border-white/5 bg-[#0b0b12] px-4 py-16 text-neutral-100 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="site-container">
        <motion.div
          variants={reveal(20)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 flex flex-col gap-4 sm:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-[1.05] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Semua film yang telah kami produksi.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-neutral-400 sm:text-lg">
              Dari {ALL[0].title} ({ALL[0].year}) hingga{" "}
              {ALL[ALL.length - 1].title} ({ALL[ALL.length - 1].year}) —{" "}
              {ALL.length} judul.
            </p>
          </div>
          {/* Di beranda: expand in-place kalau kepotong, link ke /film
              kalau semua sudah muat. Di halaman arsip: tidak ada tombol. */}
          {!archive &&
            (truncated ? (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100"
              >
                {expanded ? "Tutup" : "Lihat Semua"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            ) : (
              <a
                href="/film"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100"
              >
                Lihat Semua
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {visible.map((film) => (
            <motion.a
              // TODO: arahkan ke halaman detail /film/[slug] (lihat docs/SEO.md)
              key={film.title}
              href="#"
              variants={reveal(24)}
              className="group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-100"
            >
              <div className="relative aspect-[2/3] overflow-hidden border border-white/10 bg-neutral-900">
                <img
                  src={film.poster}
                  alt={`Poster ${film.title} (${film.year}), sutradara ${film.director}`}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 px-0.5">
                <h3
                  title={film.title}
                  className="truncate text-base font-medium tracking-tight text-neutral-100 sm:text-lg"
                >
                  {film.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{film.year}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FilmGrid;
