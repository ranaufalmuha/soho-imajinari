"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { SocialLinks } from "../SocialLinks";
import { stopSmoothScroll, startSmoothScroll } from "../../lib/smooth-scroll";

// Semua tautan memakai path absolut supaya tetap berfungsi saat dibuka dari
// halaman mana pun (/film, /tentang, /berita, /404).
const LINKS = [
  { label: "Film", href: "/film" },
  { label: "Tentang", href: "/tentang" },
  { label: "Berita", href: "/berita" },
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

  // Panel mobile menutup seluruh viewport: kunci scroll body + tutup dengan Esc.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Hentikan smooth scroll selama panel penuh layar terbuka, supaya latar
    // tidak ikut bergulir di balik overlay.
    stopSmoothScroll();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      startSmoothScroll();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Panel hanya ada di mobile; kalau layar melebar ke desktop, tutup sendiri
  // supaya scroll body tidak tertinggal terkunci.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mql.matches) setOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Dipakai semua tautan di panel mobile: panel selalu ditutup setelah navigasi
  // (termasuk link hash seperti "Berita").
  const closeMenu = () => setOpen(false);

  const isActive = (href: string) => {
    const target = href.split("#")[0];
    if (target === "/film") return path.startsWith("/film");
    if (target === "/tentang") return path.startsWith("/tentang");
    if (target === "/berita") return path.startsWith("/berita");
    if (target === "/") return path === "/" && !href.includes("#");
    return false;
  };

  // Bar selalu selebar viewport; yang berubah hanya tinggi (padding-y).
  // Lebar (padding-x) tetap supaya sisi kiri/kanan tidak ikut bergerak.
  const solid = scrolled || open;

  return (
    <>
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
              supaya tepi konten nav sejajar persis dengan konten section.
              Saat panel mobile terbuka, bar ini disembunyikan (panel yang
              mengambil alih seluruh layar). */}
          <div className={`px-4 sm:px-6 lg:px-8 ${open ? "invisible" : ""}`}>
            <div
              className={`site-container flex items-center justify-between transition-[padding] duration-300 ease-out ${
                scrolled ? "py-2.5" : "py-5"
              }`}
            >
              {/* Kiri: logo + navigasi menempel tepat di kanannya (satu grup).
                  Kanan: hanya sosial media + tombol menu mobile. */}
              <div className="flex items-center gap-6 md:gap-8">
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

                <nav
                  aria-label="Navigasi utama"
                  className="hidden items-center gap-8 md:flex"
                >
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
                </nav>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Kanal sosial resmi — URL pusat di SocialLinks.tsx */}
                <div className="hidden md:block">
                  <SocialLinks />
                </div>
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
        </motion.nav>
      </header>

      {/* Panel menu mobile fullscreen — dirender di luar <motion.nav> supaya
          `fixed inset-0` benar-benar mengacu ke viewport, bukan ke transform
          milik nav. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#0b0b12] md:hidden"
          >
            {/* Baris atas: logo + tombol tutup, sejajar dengan bar aslinya. */}
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="site-container flex items-center justify-between py-5">
                <a
                  href="/"
                  onClick={closeMenu}
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
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Tutup menu"
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/15 text-neutral-100 transition-colors hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="border-t border-white/10" />

            <nav aria-label="Navigasi utama" className="px-4 pt-2 sm:px-6 lg:px-8">
              <div className="site-container flex flex-col">
                {LINKS.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    onClick={closeMenu}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                      delay: reduceMotion ? 0 : 0.05 * index,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`border-b border-white/5 py-5 text-3xl font-semibold tracking-tight transition-colors ${
                      isActive(link.href)
                        ? "text-neutral-100"
                        : "text-neutral-400 hover:text-neutral-100"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </nav>

            {/* Kaki panel: kanal sosial + jargon, menempel di bawah. */}
            <div className="mt-auto px-4 pb-10 pt-8 sm:px-6 lg:px-8">
              <div className="site-container flex flex-col items-start gap-6">
                <SocialLinks />
                <p className="text-xs text-neutral-500">Imajinasi dalam Gerak.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
