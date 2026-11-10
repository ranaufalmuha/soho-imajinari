"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

// Orang-orang di dalam Imajinari — mengikuti pola kartu `about-7` dari
// ReactBits (foto, nama, jabatan saja), tapi memakai design system situs:
// tone gelap, rhythm section standar, dan jenis kartu mengikuti Showcase8
// (gambar full-bleed + teks di bawah, tanpa border kartu).
//
// HANYA berisi nama yang terverifikasi di docs/IMAJINARI.md. Jangan tambah
// nama baru tanpa konfirmasi — profil tim adalah klaim publik.
//
// Foto asli ada di public/team/. Yang belum punya foto asli memakai
// placeholder demo ReactBits yang SAMA dengan placeholder poster film
// (films.ts FALLBACKS) — jadi visualnya konsisten. Rasio kartu 2/3
// (potret). Daftar sutradara diambil dari data filmografi (films.ts);
// jabatan "Sutradara" berarti menyutradarai film Imajinari tersebut,
// bukan klaim jabatan internal.

/** Placeholder yang sama dengan poster film (urutan sama dengan films.ts). */
const TEAM_PLACEHOLDERS = [
  "https://pro.reactbits.dev/demo-media/abstract-amber-loop.webp",
  "https://pro.reactbits.dev/demo-media/abstract-pink-eclipse.webp",
  "https://pro.reactbits.dev/demo-media/abstract-plum-ribbon.webp",
  "https://pro.reactbits.dev/demo-media/abstract-violet-steps.webp",
  "https://pro.reactbits.dev/demo-media/abstract-rose-balance.webp",
  "https://pro.reactbits.dev/demo-media/abstract-coral-fold.webp",
  "https://pro.reactbits.dev/demo-media/abstract-fuchsia-wave.webp",
  "https://pro.reactbits.dev/demo-media/abstract-orchid-orbit.webp",
];

interface Person {
  name: string;
  title: string;
  /** Path foto di public/, mis. "/team/ernest_prakasa.webp". */
  image: string;
}

const PEOPLE: Person[] = [
  {
    name: "Ernest Prakasa",
    title: "Pendiri",
    image: "/team/ernest_prakasa.webp",
  },
  {
    name: "Dipa Andika",
    title: "Pendiri",
    image: "/team/dipa_andika.webp",
  },
  // Sutradara film-film Imajinari (urut kronologi film pertama).
  { name: "Bene Dion Rajagukguk", title: "Sutradara", image: TEAM_PLACEHOLDERS[0] },
  { name: "Yandy Laurens", title: "Sutradara", image: TEAM_PLACEHOLDERS[1] },
  { name: "Muhadkly Acho", title: "Sutradara", image: TEAM_PLACEHOLDERS[2] },
  { name: "Soleh Solihun", title: "Sutradara", image: TEAM_PLACEHOLDERS[3] },
  { name: "Arie Kriting", title: "Sutradara", image: TEAM_PLACEHOLDERS[4] },
  { name: "Meira Anastasia", title: "Sutradara", image: TEAM_PLACEHOLDERS[5] },
  { name: "Kristo Immanuel", title: "Sutradara", image: TEAM_PLACEHOLDERS[6] },
  { name: "Edy Khemod", title: "Sutradara", image: TEAM_PLACEHOLDERS[7] },
];

export function TeamSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (distance: number): Variants => ({
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  });

  // Hover: gambar men-zoom seperti kartu Showcase8; mati saat reduced-motion.
  const cardVariants: Variants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const gridVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };

  return (
    <section className="w-full border-t border-white/5 bg-[#0b0b12] px-4 py-16 text-neutral-100 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="site-container">
        <motion.div
          variants={reveal(20)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl leading-[1.05] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Orang-orang di dalamnya.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-neutral-400 sm:text-lg">
            Didirikan oleh seorang komika dan manajernya — dan dijalankan
            bersama orang-orang yang percaya pada cerita orisinal.
          </p>
        </motion.div>

        {/* Foto → nama → jabatan. Sama seperti pola about-7. */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid grid-cols-2 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5"
        >
          {PEOPLE.map((person) => (
            <motion.div
              key={person.name}
              variants={cardVariants}
              className="group flex flex-col gap-4"
            >
              <div className="aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                <img
                  src={person.image}
                  alt={`Foto ${person.name}`}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-medium tracking-tight text-neutral-100 sm:text-lg">
                  {person.name}
                </h3>
                <p className="text-xs text-neutral-500 sm:text-sm">
                  {person.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TeamSection;
