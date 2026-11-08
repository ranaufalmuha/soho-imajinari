import { useRef, useState } from "react";
import VerticalReel, {
  type VerticalReelHandle,
  type VerticalReelItem,
} from "./react-bits/vertical-reel";

// Ganti array ini dengan gambar sendiri kapan saja.
// (Bawaan: 8 karya demo dari pro.reactbits.dev)
const ITEMS: VerticalReelItem[] = [
  {
    src: "https://pro.reactbits.dev/demo-media/abstract-amber-loop.webp",
    alt: "Lingkaran emas-amber miring di atas bidang ungu-raspberry berbutir",
    title: "Simpul Amber",
    subtitle: "Kelembutan di tengah ruang",
  },
  {
    src: "https://pro.reactbits.dev/demo-media/abstract-pink-eclipse.webp",
    alt: "Cakram koral-merah muda melintasi bidang diagonal violet",
    title: "Gerhana Senja",
    subtitle: "Satu cakram melintasi diagonal",
  },
  {
    src: "https://pro.reactbits.dev/demo-media/abstract-plum-ribbon.webp",
    alt: "Pita diagonal pink dan plum yang saling berpotongan",
    title: "Pita Plum",
    subtitle: "Dua pita, satu persilangan",
  },
  {
    src: "https://pro.reactbits.dev/demo-media/abstract-violet-steps.webp",
    alt: "Tiga bidang bertingkat violet dan pink dengan tepi amber",
    title: "Anak Tangga Violet",
    subtitle: "Tiga bidang dalam irama",
  },
  {
    src: "https://pro.reactbits.dev/demo-media/abstract-rose-balance.webp",
    alt: "Persegi raspberry miring dan cakram tangerine di atas bidang rose",
    title: "Keseimbangan Mawar",
    subtitle: "Satu titik terang penyeimbang",
  },
  {
    src: "https://pro.reactbits.dev/demo-media/abstract-coral-fold.webp",
    alt: "Lipatan bidang vermilion dan oranye di atas plum pekat",
    title: "Lipatan Koral",
    subtitle: "Belokan arah yang berani",
  },
  {
    src: "https://pro.reactbits.dev/demo-media/abstract-fuchsia-wave.webp",
    alt: "Pita fuchsia berbentuk S dengan gradien koral",
    title: "Gelombang Fuchsia",
    subtitle: "Satu lengkung tanpa putus",
  },
  {
    src: "https://pro.reactbits.dev/demo-media/abstract-orchid-orbit.webp",
    alt: "Cincin fuchsia dan sabit peach di atas ungu anggrek berbutir",
    title: "Orbit Anggrek",
    subtitle: "Warna dalam orbit",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function ReelHero() {
  const reelRef = useRef<VerticalReelHandle>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const current = ITEMS[active] ?? ITEMS[0];

  return (
    <section className="relative h-svh min-h-[640px] w-full overflow-hidden bg-[#08080d] text-neutral-100">
      {/* Reel 3D mengisi seluruh hero */}
      <VerticalReel
        ref={reelRef}
        items={ITEMS}
        captions={false}
        paused={paused}
        onIndexChange={setActive}
        className="absolute inset-0"
        ariaLabel="Galeri imajinari. Seret atau sentuh untuk memutar, gulir atau gunakan tombol panah untuk berpindah karya."
      />

      {/* Scrim agar teks terbaca */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Lapisan overlay: tembus drag kecuali kontrol */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
        {/* Bar atas */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase">
              imajinari
            </p>
            <p className="mt-1 text-xs tracking-[0.08em] text-neutral-400 uppercase">
              Galeri interaktif — Vol. 01
            </p>
          </div>
          <div className="pointer-events-auto flex items-center gap-3">
            <p className="text-sm text-neutral-300 tabular-nums">
              {pad(active + 1)} <span className="text-neutral-500">/ {pad(ITEMS.length)}</span>
            </p>
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide backdrop-blur transition hover:bg-white/15"
              aria-pressed={paused}
            >
              {paused ? "▶ Jalan" : "❚❚ Jeda"}
            </button>
          </div>
        </header>

        {/* Blok bawah */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h1 className="text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Imajinasi dalam gerak.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base">
              Seret, putar, dan jelajahi delapan karya abstrak dalam cincin 3D
              yang hidup — setiap putaran berhenti tepat pada satu karya.
            </p>
            <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => reelRef.current?.spin(4)}
                className="rounded-full bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white"
              >
                Putar Reel
              </button>
              <a
                href="https://pro.reactbits.dev/docs/components/vertical-reel"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/15"
              >
                Tentang komponen ↗
              </a>
            </div>
          </div>

          {/* Kartu karya aktif */}
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-xs font-medium tracking-[0.08em] text-neutral-400 uppercase">
              Karya {pad(active + 1)}
            </p>
            <p key={current.title} className="mt-1 text-2xl font-medium tracking-tight">
              {current.title}
            </p>
            <p className="mt-1 text-sm text-neutral-400">{current.subtitle}</p>
            <div className="pointer-events-auto mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Pilih karya">
                {ITEMS.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Ke karya ${item.title}`}
                    onClick={() => reelRef.current?.goTo(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? "w-6 bg-neutral-100" : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => reelRef.current?.previous()}
                  aria-label="Karya sebelumnya"
                  className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-lg transition hover:bg-white/15"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => reelRef.current?.next()}
                  aria-label="Karya berikutnya"
                  className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-lg transition hover:bg-white/15"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
