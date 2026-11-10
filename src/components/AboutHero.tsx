"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { FILMS } from "./films";

// Hero /tentang memakai marquee `showcase-2` ReactBits APA ADANYA:
// auto-drift konstan, drag-x dengan momentum yang meluruh kembali ke
// kecepatan dasar, dan hover 3D (scale + rotateX + lift + zIndex).
// Semua nilai animasi, easing, ukuran kartu, dan struktur drag
// dipertahankan persis dari komponen aslinya.
//
// Yang diganti hanya:
//   - gambar  → poster film Imajinari (aset sendiri)
//   - bgColor → neutral gelap, mengikuti tema situs
//   - teks    → copywriting halaman Tentang
//
// Satu pengecualian: `useReducedMotion` tetap dihormati (auto-drift berhenti)
// karena itu berlaku di SELURUH situs ini — pengguna yang menyalakan
// "reduce motion" di OS-nya memang meminta animasi berhenti.
//
// Hanya film yang punya file poster lokal yang dipakai — poster placeholder
// ReactBits (URL eksternal) dilewati agar tidak ada kartu bolong.

const POSTERS = FILMS.filter((film) => film.poster.startsWith("/film/poster/"));

// Tinggi berselang-seling mengikuti pola kartu showcase-2.
const CARD_HEIGHTS = ["h-[400px]", "h-[450px]", "h-[420px]", "h-[380px]"];

const ITEMS = POSTERS.map((film, index) => ({
  id: film.title,
  image: film.poster,
  height: CARD_HEIGHTS[index % CARD_HEIGHTS.length],
  alt: `Poster ${film.title} (${film.year})`,
}));

export function AboutHero() {
  const reduceMotion = useReducedMotion();
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [oneSetWidth, setOneSetWidth] = useState(0);

  const baseVelocity = -20;
  const baseX = useMotionValue(0);
  const scrollVelocity = useRef(baseVelocity);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const items = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      const itemWidth = isMobile ? 280 : 320;
      const gap = 24;
      const width = (itemWidth + gap) * ITEMS.length;
      setOneSetWidth(width);

      baseX.set(-width);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [baseX]);

  useAnimationFrame((t, delta) => {
    if (!oneSetWidth || reduceMotion) return;

    if (!isDragging) {
      scrollVelocity.current = scrollVelocity.current * 0.9 + baseVelocity * 0.1;

      const moveBy = scrollVelocity.current * (delta / 1000);
      baseX.set(baseX.get() + moveBy);

      const x = baseX.get();
      if (x <= -oneSetWidth * 2) {
        baseX.set(x + oneSetWidth);
      } else if (x > 0) {
        baseX.set(x - oneSetWidth);
      }
    }
  });

  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-[#08080d] pt-32 text-neutral-100 sm:pt-36">
      {/* Teks halaman, di atas marquee */}
      <div className="relative z-10 px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
        <div className="site-container">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl"
          >
            <p className="flex items-center gap-3 text-xs font-medium tracking-[0.08em] text-neutral-400 uppercase">
              <span className="h-px w-8 bg-(--color-accent)" />
              Tentang
            </p>
            <h1 className="mt-6 text-4xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Rumah produksi cerita orisinal.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-neutral-300 sm:text-lg">
              Imajinari adalah rumah produksi film dan serial web yang berdiri
              sejak 2022 di Jakarta. Kami didirikan oleh Ernest Prakasa dan Dipa
              Andika, dan bernaung di bawah Hahaha Corp.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Marquee showcase-2: struktur, ukuran, dan animasinya dipertahankan. */}
      <div className="-mx-4 w-full overflow-hidden py-16 sm:-mx-6 sm:py-20 lg:-mx-8">
        <motion.div
          ref={scrollerRef}
          className="flex w-max items-end gap-6"
          style={{ x: baseX }}
          drag={reduceMotion ? false : "x"}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            scrollVelocity.current = info.velocity.x;
          }}
          dragElastic={0.05}
          dragMomentum={false}
        >
          {items.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className={`relative w-[280px] shrink-0 cursor-grab select-none overflow-hidden active:cursor-grabbing sm:w-[320px] ${item.height}`}
              initial={{ rotateX: 0, opacity: 1 }}
              animate={
                hoveredId === index
                  ? {
                      scale: 1.05,
                      rotateX: -15,
                      y: -25,
                      zIndex: 50,
                    }
                  : {
                      scale: 1,
                      rotateX: 0,
                      y: 0,
                      zIndex: 1,
                    }
              }
              transition={{
                duration: 0.3,
                ease: "backOut",
                zIndex: { delay: hoveredId === index ? 0 : 0.4 },
              }}
              onMouseEnter={() => setHoveredId(index)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ transformPerspective: 1000 }}
            >
              <div className="h-full w-full bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="pointer-events-none h-full w-full object-cover object-top"
                  draggable="false"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AboutHero;
