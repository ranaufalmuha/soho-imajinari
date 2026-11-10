import Lenis from "lenis";

/**
 * Smooth scroll global (Lenis).
 *
 * Satu instance untuk seluruh situs. Modul ini sengaja menyimpan instance di
 * scope module supaya komponen lain (mis. menu mobile) bisa menghentikan dan
 * melanjutkan scroll tanpa mengimpor Lenis lagi.
 *
 * Menghormati `prefers-reduced-motion`: kalau pengguna meminta gerak minimal,
 * tidak ada instance dibuat dan situs tetap memakai scroll bawaan browser.
 */
let lenis: Lenis | null = null;

export function initSmoothScroll(): void {
  if (lenis || typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lenis = new Lenis({
    // autoRaf: Lenis mengurus requestAnimationFrame sendiri.
    autoRaf: true,
    // Sedikit lebih panjang dari default supaya terasa "berat" tapi tidak lag.
    duration: 1.05,
    // Anchors (`#id`) ikut dihaluskan bila nanti ada tautan hash.
    anchors: true,
  });
}

/** Dipakai saat panel mobile penuh layar terbuka. */
export function stopSmoothScroll(): void {
  lenis?.stop();
}

/** Dipakai saat panel mobile ditutup. */
export function startSmoothScroll(): void {
  lenis?.start();
}
