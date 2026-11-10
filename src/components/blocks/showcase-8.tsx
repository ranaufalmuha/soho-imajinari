"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FILMS } from "../films";

// Menampilkan filmografi penuh (11 film); kartu mengambil poster dari modul
// data bersama dengan hero. Urutan kronologis sesuai sumber.

export function Showcase8() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Satu reveal untuk seluruh section; mati total saat reduced-motion aktif.
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

  const headerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };

  const trackVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
  };

  const readScroll = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    const left = node.scrollLeft;
    setCanPrev(left > 8);
    setCanNext(left < max - 8);
  }, []);

  const handleScroll = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(readScroll);
  };

  useEffect(() => {
    frameRef.current = requestAnimationFrame(readScroll);
    window.addEventListener("resize", readScroll);
    return () => {
      window.removeEventListener("resize", readScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, [readScroll]);

  const step = (direction: number) => {
    const node = trackRef.current;
    if (!node) return;
    const cards = Array.from(node.children) as HTMLElement[];
    if (!cards.length) return;
    const start = cards[0].offsetLeft;
    const left = node.scrollLeft;
    const offsets = cards.map((card) => card.offsetLeft - start);
    let target: number | undefined;
    if (direction < 0) {
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (offsets[i] < left - 8) {
          target = offsets[i];
          break;
        }
      }
      if (target === undefined) target = 0;
    } else {
      for (let i = 0; i < offsets.length; i++) {
        if (offsets[i] > left + 8) {
          target = offsets[i];
          break;
        }
      }
      if (target === undefined) target = node.scrollWidth - node.clientWidth;
    }
    node.scrollTo({
      left: target,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const controlClass =
    "grid h-11 w-11 place-items-center rounded-full border border-white/15 text-neutral-100 enabled:hover:bg-white/10 enabled:cursor-pointer disabled:opacity-35 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100";

  return (
    <section className="w-full border-t border-white/5 bg-[#0b0b12] px-4 py-16 text-neutral-100 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="site-container">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 flex flex-col gap-8 sm:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <motion.div variants={reveal(20)} className="max-w-2xl">
            <h2 className="text-3xl leading-[1.05] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Satu musim karya yang tuntas.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-neutral-400 sm:text-lg">
              Identitas, platform, dan situs peluncuran — dikerjakan bersama tim
              yang kini menjalankannya sendiri.
            </p>
          </motion.div>

          <motion.div variants={reveal(20)} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={!canPrev}
              aria-label="Karya sebelumnya"
              className={controlClass}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={!canNext}
              aria-label="Karya berikutnya"
              className={controlClass}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>

        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <motion.div
            ref={trackRef}
            onScroll={handleScroll}
            role="region"
            aria-label="Karya terpilih"
            tabIndex={0}
            variants={trackVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100 sm:gap-6 sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {FILMS.map((film) => (
              <motion.a
                key={film.title}
                href="#"
                variants={reveal(24)}
                whileHover="hover"
                className="group w-[62vw] max-w-[320px] shrink-0 cursor-pointer snap-start scroll-ml-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-100 sm:w-[300px] sm:scroll-ml-6 lg:w-[340px] lg:scroll-ml-8"
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
                <div className="mt-5 flex items-start justify-between gap-4 px-1">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-medium tracking-tight text-neutral-100 sm:text-xl">
                      {film.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {film.year}
                    </p>
                  </div>
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center border border-white/15 text-neutral-100 transition-colors duration-200 group-hover:border-neutral-100 group-hover:bg-neutral-100 group-hover:text-neutral-950">
                    <motion.span
                      variants={{ hover: { x: 2, y: -2 } }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="grid place-items-center"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.span>
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Showcase8;
