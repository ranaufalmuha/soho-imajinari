"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { TICKETS_URL } from "../tickets";

// Halaman /film dan /tentang sudah ada; Berita/Kontak menunggu section di
// beranda (lihat docs/SEO.md) — pakai path absolut + hash agar tetap
// berfungsi saat dibuka dari /film, /tentang, atau /404.
const LINKS = [
  { label: "Film", href: "/film" },
  { label: "Tentang", href: "/tentang" },
  { label: "Berita", href: "/#berita" },
];

export default function Navigation9() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [path, setPath] = useState("/");
  const reduceMotion = useReducedMotion();

  // Block asli memakai sentinel 1px + sticky yang hanya relevan dengan konten
  // demo bawaannya. Karena demo sudah dihapus, pakai fixed full-width + scrollY.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tandai link halaman aktif. Dipasang setelah mount agar tidak
  // bergantung pada nilai build-time Astro.
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const isActive = (href: string) => {
    const target = href.split("#")[0];
    if (target === "/film") return path.startsWith("/film");
    if (target === "/tentang") return path.startsWith("/tentang");
    if (target === "/") return path === "/" && !href.includes("#");
    return false;
  };

  // Bar selalu selebar viewport; yang berubah hanya tinggi (padding-y).
  // Lebar (padding-x) tetap supaya sisi kiri/kanan tidak ikut bergerak.
  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.nav
        initial={reduceMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full transition-colors duration-300 ease-out ${
          solid
            ? "border-b border-white/10 bg-[#0b0b12]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* Padding di LUAR site-container, sama seperti section lain —
            supaya tepi konten nav sejajar persis dengan konten section. */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div
            className={`site-container flex items-center justify-between transition-[padding] duration-300 ease-out ${
              scrolled ? "py-2.5" : "py-5"
            }`}
          >
          <a
            href="/"
            aria-label="imajinari — kembali ke beranda"
            className="flex shrink-0 items-center"
          >
            <img
              src="/logo-wordmark.png"
              alt="imajinari"
              width={727}
              height={153}
              draggable={false}
              className="h-7 w-auto sm:h-8"
            />
          </a>

          <div className="hidden items-center gap-8 px-4 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-sm transition-colors ${
                  isActive(link.href)
                    ? "text-neutral-100"
                    : "text-neutral-400 hover:text-neutral-100"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Tiket film yang sedang tayang — URL pusat di tickets.ts */}
            <a
              href={TICKETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center rounded-full bg-neutral-100 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white sm:inline-flex"
            >
              Get Tickets
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/15 text-neutral-100 transition-colors hover:bg-white/10 md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-mobile"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="border-t border-white/10 md:hidden"
            >
              <div className="site-container flex flex-col px-4 pb-4 sm:px-6 lg:px-8">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`py-2 text-sm transition-colors ${
                    isActive(link.href)
                      ? "text-neutral-100"
                      : "text-neutral-300 hover:text-neutral-100"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 w-full rounded-full bg-neutral-100 px-4 py-2.5 text-center text-sm font-semibold text-neutral-950"
              >
                Get Tickets
              </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
