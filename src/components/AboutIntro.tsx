"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

// Profil perusahaan untuk /tentang. Duduk DI BAWAH AboutHero, jadi bagian
// pembuka lamanya (label + H1 + paragraf intro) dipindah ke hero — komponen
// ini mulai langsung dari narasi + fakta + statistik. Rhythm, tone, dan
// kontennya sama seperti sebelumnya.
// Angka & fakta diambil dari docs/IMAJINARI.md — jangan tambah klaim baru
// di sini tanpa memperbarui dokumen sumbernya.

const FACTS: Array<{ label: string; value: string }> = [
  { label: "Nama resmi", value: "PT. Akal Andal Askara" },
  { label: "Didirikan", value: "2022, Jakarta" },
  { label: "Pendiri", value: "Ernest Prakasa & Dipa Andika" },
  { label: "Perusahaan induk", value: "Hahaha Corp" },
  { label: "Bidang", value: "Film & serial web" },
  {
    label: "Kantor pusat",
    value: "Jl. Kubis IV No.125, Kebayoran Baru, Jakarta Selatan 12160",
  },
];

const STATS: Array<{ value: string; label: string }> = [
  { value: "2022", label: "Mulai memproduksi" },
  { value: "11", label: "Judul film & serial" },
  { value: "11 jt+", label: "Penonton satu judul" },
];

export function AboutIntro() {
  const reduceMotion = useReducedMotion();

  const reveal = (distance: number): Variants => ({
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  });

  const factsVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
  };

  return (
    <section className="w-full border-t border-white/5 bg-[#0b0b12] px-4 py-16 text-neutral-100 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
          {/* Narasi: cerita perusahaan + positioning */}
          <motion.div
            variants={reveal(20)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex max-w-2xl flex-col gap-6"
          >
            <p className="text-base leading-relaxed text-pretty text-neutral-300 sm:text-lg">
              Kami percaya pada kekuatan cerita yang kuat dan orisinal — cerita
              yang datang dari pengalaman, budaya, dan sudut pandang yang jarang
              sampai ke layar lebar. Sejak film pertama kami,{" "}
              <em className="text-neutral-100 not-italic">
                Ngeri-Ngeri Sedap
              </em>{" "}
              (2022), keyakinan itu tidak berubah.
            </p>
            <p className="text-base leading-relaxed text-pretty text-neutral-300 sm:text-lg">
              Yang membuat kami berbeda: kami menang di dua medan sekaligus.
              Pada 2024,{" "}
              <em className="text-neutral-100 not-italic">Agak Laen</em>{" "}
              memecahkan rekor penonton film komedi Indonesia, sementara{" "}
              <em className="text-neutral-100 not-italic">
                Jatuh Cinta Seperti di Film-Film
              </em>{" "}
              membawa pulang tujuh piala FFI — terbanyak di ajang itu. Sukses
              komersial dan pengakuan festival, di tahun yang sama.
            </p>
          </motion.div>

          {/* Fakta perusahaan — daftar definisi agar mudah dibaca crawler
              (NAP konsisten dengan Google Business & Wikipedia). */}
          <motion.dl
            variants={factsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex h-fit flex-col divide-y divide-white/5 border-y border-white/10"
          >
            {FACTS.map((fact) => (
              <motion.div
                key={fact.label}
                variants={reveal(16)}
                className="flex flex-col gap-1 py-4"
              >
                <dt className="text-xs font-medium tracking-[0.08em] text-neutral-500 uppercase">
                  {fact.label}
                </dt>
                <dd className="text-sm leading-relaxed text-neutral-200 sm:text-base">
                  {fact.value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          variants={reveal(20)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10 lg:mt-20"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-2xl font-medium tracking-tight text-neutral-100 sm:text-3xl lg:text-4xl">
                {stat.value}
              </span>
              <span className="text-xs leading-snug text-neutral-500 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AboutIntro;
