"use client";

import { useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { Play } from "lucide-react";

// Mitra koproduksi dari filmografi — tampil berputar sebagai marquee.
// Dua mitra sudah punya file logo (public/mitra/); sisanya teks.
interface Partner {
  name: string;
  logo?: string;
  /** Kecerahan logo agar terbaca di background gelap (1 = solid). */
  opacity?: number;
}

const PARTNERS: Partner[] = [
  { name: "Agak Laen", logo: "/mitra/agak_laen.webp" },
  { name: "Titik Kumpul", logo: "/mitra/titik_kumpul.png" },
  { name: "Jagartha" },
  { name: "Trinity Entertainment" },
  { name: "Legacy Pictures" },
  { name: "A&Z Films" },
  { name: "Navarros" },
  { name: "Cerita Films" },
  { name: "Juni Records" },
  { name: "Visionari Film Fund" },
  { name: "Karma Club" },
  { name: "Rhaya Flicks" },
  { name: "Angin Segar" },
  { name: "Boss Creator" },
  { name: "Netflix Original Indonesia" },
];

const PartnerMarquee = ({ partners }: { partners: Partner[] }) => {
  const reduceMotion = useReducedMotion();
  const xPercent = useMotionValue(0);
  const x = useTransform(xPercent, (v) => `${v}%`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const moveBy = delta / 1000; // ~1% per detik
    const next = xPercent.get() - moveBy;
    xPercent.set(next <= -50 ? 0 : next);
  });

  // Dua salinan identik selebar penuh: saat x = -50%, salinan kedua tepat
  // menggantikan posisi salinan pertama → loop mulus tanpa lompatan.
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <motion.div
      className="flex min-w-full shrink-0 flex-row items-center justify-around"
      style={{ x }}
      aria-hidden={hidden ?? false}
    >
      {partners.map((partner) => (
        <span
          key={`${hidden ? "b" : "a"}-${partner.name}`}
          className="flex h-10 shrink-0 items-center px-8"
        >
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
              draggable={false}
              className="h-full w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            <span className="text-lg font-medium tracking-tight whitespace-nowrap text-neutral-500 transition-colors duration-300 hover:text-neutral-100">
              {partner.name}
            </span>
          )}
        </span>
      ))}
    </motion.div>
  );

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <div className="flex w-full flex-row overflow-hidden p-2">
        <Row />
        <Row hidden />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0b0b12] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0b0b12] to-transparent" />
    </div>
  );
};

// Video showreel Imajinari. Embed bergaya "lite": yang dimuat lebih dulu
// hanya thumbnail, iframe YouTube baru dipasang setelah tombol putar diklik
// supaya halaman awal tetap enteng.
const VIDEO_ID = "7D6sgJYAiDE";
const VIDEO_TITLE = "Dari 2022 Sampai 2024, Semoga Masih Terasa Hangat";
const THUMBNAIL = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export function SocialProof7() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="w-full overflow-hidden border-t border-white/5 bg-[#0b0b12] px-4 py-16 text-neutral-100 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="site-container">
        <div className="relative mx-auto mb-12 w-full sm:mb-16">
          <div className="group relative flex aspect-video items-center justify-center overflow-hidden border border-white/10 bg-neutral-900">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title={VIDEO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Putar video: ${VIDEO_TITLE}`}
                className="absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-100"
              >
                <img
                  src={THUMBNAIL}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />

                <span className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/20" />

                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-20 w-20 place-items-center bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-8 w-8 fill-current text-neutral-900" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-lg font-medium text-neutral-400">
            Diproduksi bersama mitra terbaik di industri film Indonesia
          </p>
        </div>

        <PartnerMarquee partners={PARTNERS} />
      </div>
    </section>
  );
}

export default SocialProof7;
