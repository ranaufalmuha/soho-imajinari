"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Settle } from "./textures/settle";
import { TICKETS_URL } from "./tickets";

// Section CTA: bagian dari alur halaman, bukan bagian footer.
// Standar jepit CTA (berlaku di semua page yang memakai CTA):
// - TANPA padding atas (pt-0) — jarak atas sudah dipasok padding bawah
//   section sebelumnya, supaya tidak dobel.
// - Padding bawah penuh satu unit rhythm (pb-16 sm:pb-20 lg:pb-24).
// Hasilnya: jarak konten→CTA sama persis dengan jarak CTA→footer
// (satu unit rhythm di tiap sisi) di semua breakpoint.
export function CtaSection() {
  const reduceMotion = useReducedMotion();

  const reveal: Variants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="w-full bg-[#0b0b12] px-4 pt-0 pb-16 text-neutral-100 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="site-container">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="grid overflow-hidden border border-white/10 lg:grid-cols-2">
            {/* Kiri: teks bersih, tanpa texture */}
            <div className="flex flex-col items-start justify-center gap-10 p-10 sm:p-16 lg:min-h-[560px] lg:p-20">
              <div className="max-w-xl">
                <h2 className="text-3xl leading-[1.05] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  Punya cerita yang layak layar lebar?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-pretty text-neutral-400 sm:text-lg">
                  Kami selalu mencari naskah dan kolaborator baru. Ceritakan
                  idemu — siapa tahu film berikutnya adalah milikmu.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                {/* Tiket film yang sedang tayang — URL pusat di tickets.ts */}
                <a
                  href={TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white"
                >
                  Get Tickets
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                {/* TODO: ganti dengan halaman kontak yang sebenarnya (lihat docs/SEO.md) */}
                <a
                  href="/#kontak"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-neutral-100 transition-colors hover:bg-white/10"
                >
                  Hubungi Kami
                </a>
              </div>
            </div>

            {/* Kanan: texture Settle solid, tanpa opacity */}
            <div className="relative min-h-[320px] border-t border-white/10 sm:min-h-[400px] lg:border-t-0 lg:border-l lg:min-h-full">
              <div className="absolute inset-0">
                <Settle
                  tokens={{
                    "--texture-ink": "var(--color-accent)",
                    "--texture-field": "transparent",
                  }}
                  static={reduceMotion}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaSection;
