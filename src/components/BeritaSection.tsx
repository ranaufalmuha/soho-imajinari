"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BERITA, formatBeritaDate, type Berita } from "./berita";

// Section Berita untuk akhir beranda: tiga kartu artikel terbaru,
// gaya mengikuti block Showcase8 (carousel film) supaya satu bahasa visual.
// Dipakai juga di /berita sebagai "Berita lainnya" lewat props.

interface BeritaSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: Berita[];
  linkLabel?: string;
  /** "h1" untuk halaman indeks /berita, "h2" untuk section di beranda. */
  headingLevel?: "h1" | "h2";
  /** Tombol "Semua berita" hanya relevan di beranda, sembunyikan di indeks. */
  showAllLink?: boolean;
}

const DEFAULT_TITLE = "Berita terbaru dari studio.";
const DEFAULT_DESCRIPTION =
  "Catatan produksi, rekor penonton, dan perjalanan film kami di festival.";

export function BeritaSection({
  eyebrow = "Berita",
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  items = BERITA.slice(0, 3),
  linkLabel = "Semua berita",
  headingLevel = "h2",
  showAllLink = true,
}: BeritaSectionProps = {}) {
  const reduceMotion = useReducedMotion();
  const Heading = headingLevel;

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

  const cardVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };

  return (
    <section
      id="berita"
      aria-label="Berita Imajinari"
      className="w-full scroll-mt-20 border-t border-white/5 bg-[#0b0b12] px-4 py-16 text-neutral-100 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
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
            <p className="flex items-center gap-3 text-xs font-medium tracking-[0.08em] text-neutral-500 uppercase">
              <span className="h-px w-8 bg-(--color-accent)"></span>
              {eyebrow}
            </p>
            <Heading className="mt-5 text-3xl leading-[1.05] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {title}
            </Heading>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-neutral-400 sm:text-lg">
              {description}
            </p>
          </div>
          {showAllLink && (
            <a
              href="/berita"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100"
            >
              {linkLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-3"
        >
          {items.map((article) => (
            <motion.a
              key={article.slug}
              href={`/berita/${article.slug}`}
              variants={reveal(24)}
              className="group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-100"
            >
              <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-neutral-900">
                <img
                  src={article.image}
                  alt={article.alt}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 font-mono text-[10px] tracking-[0.08em] text-neutral-500 uppercase">
                <time dateTime={article.date}>
                  {formatBeritaDate(article.date)}
                </time>
              </div>
              <h3 className="mt-3 text-xl leading-snug font-medium tracking-tight text-balance text-neutral-100 sm:text-2xl">
                {article.title}
              </h3>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BeritaSection;
