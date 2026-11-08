"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

// Karya terpilih — samakan dengan ITEMS di ReelHero bila daftarnya berubah.
const projects = [
  {
    title: "Simpul Amber",
    client: "Koleksi Lingkar",
    category: "Amber · Rasberi",
    year: "2026",
    src: "https://pro.reactbits.dev/demo-media/abstract-amber-loop.webp",
    alt: "Lingkaran emas-amber miring di atas bidang ungu-raspberry berbutir",
  },
  {
    title: "Gerhana Senja",
    client: "Koleksi Diagonal",
    category: "Koral · Violet",
    year: "2026",
    src: "https://pro.reactbits.dev/demo-media/abstract-pink-eclipse.webp",
    alt: "Cakram koral-merah muda melintasi bidang diagonal violet",
  },
  {
    title: "Pita Plum",
    client: "Koleksi Silang",
    category: "Pink · Plum",
    year: "2025",
    src: "https://pro.reactbits.dev/demo-media/abstract-plum-ribbon.webp",
    alt: "Pita diagonal pink dan plum yang saling berpotongan",
  },
  {
    title: "Anak Tangga Violet",
    client: "Koleksi Bertingkat",
    category: "Violet · Amber",
    year: "2025",
    src: "https://pro.reactbits.dev/demo-media/abstract-violet-steps.webp",
    alt: "Tiga bidang bertingkat violet dan pink dengan tepi amber",
  },
  {
    title: "Gelombang Fuchsia",
    client: "Koleksi Lengkung",
    category: "Fuchsia · Koral",
    year: "2024",
    src: "https://pro.reactbits.dev/demo-media/abstract-fuchsia-wave.webp",
    alt: "Pita fuchsia berbentuk S dengan gradien koral",
  },
];

export function Showcase8() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
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
    setProgress(max > 0 ? Math.min(1, Math.max(0, left / max)) : 0);
    setCanPrev(left > 8);
    setCanNext(left < max - 8);
    const cards = Array.from(node.children) as HTMLElement[];
    if (!cards.length) return;
    const start = cards[0].offsetLeft;
    let nearest = 0;
    let smallest = Infinity;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - start - left);
      if (distance < smallest) {
        smallest = distance;
        nearest = index;
      }
    });
    if (max - left < 8) nearest = cards.length - 1;
    setActive(nearest);
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
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 flex flex-col gap-8 sm:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <motion.div variants={reveal(20)} className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.08em] text-neutral-400 uppercase">
              Karya terpilih
            </p>
            <h2 className="mt-4 text-3xl leading-[1.05] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
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
            {projects.map((project) => (
              <motion.a
                key={project.title}
                href="#"
                variants={reveal(24)}
                whileHover="hover"
                className="group w-[78vw] max-w-[420px] shrink-0 cursor-pointer snap-start scroll-ml-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-100 sm:w-[400px] sm:scroll-ml-6 lg:w-[440px] lg:scroll-ml-8"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                  <img
                    src={project.src}
                    alt={project.alt}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-neutral-100 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 px-1">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-medium tracking-tight text-neutral-100 sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {project.client} · {project.year}
                    </p>
                  </div>
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-neutral-100 transition-colors duration-200 group-hover:border-neutral-100 group-hover:bg-neutral-100 group-hover:text-neutral-950">
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

        <div className="mt-8 flex items-center gap-6">
          <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="absolute inset-0 origin-left rounded-full bg-neutral-100"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <p className="font-mono text-xs tracking-[0.12em] tabular-nums">
            <span className="text-neutral-100">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="text-neutral-500">
              {" "}
              / {String(projects.length).padStart(2, "0")}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Showcase8;
