"use client";

import type { ComponentType, SVGProps } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";

/**
 * Kanal sosial resmi Imajinari.
 *
 * Satu-satunya sumber kebenaran URL sosial media — navbar (dan nanti footer)
 * mengimpor dari sini supaya tidak ada tautan yang basi.
 *
 * Ikon memakai react-icons (set Simple Icons), bukan lucide — lucide tidak
 * punya ikon brand TikTok/X/Facebook.
 */

/**
 * Ukuran optik tiap glyph mengikuti referensi desain (bukan seragam) supaya
 * bobot visualnya seimbang: TikTok & X paling tipis, Facebook paling padat.
 */
const SOCIALS: {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  glyph: string;
}[] = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@imajinari.id",
    Icon: SiTiktok,
    glyph: "h-[14px] w-auto",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Imajinari",
    Icon: SiYoutube,
    glyph: "h-[12.5px] w-auto",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/imajinari.id/",
    Icon: SiInstagram,
    glyph: "h-[15px] w-auto",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61551918186164",
    Icon: SiFacebook,
    glyph: "h-[15.5px] w-auto",
  },
  {
    label: "X",
    href: "https://x.com/Imajinari_id",
    Icon: SiX,
    glyph: "h-[12.5px] w-auto",
  },
];

/**
 * Pill bersambung (segmented) — border tipis 1px menyatu antar item,
 * ujung kiri/kanan membulat penuh. Ukuran sel 46px (ikon 20px + padding 13px)
 * mengikuti referensi desain.
 */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <nav
      aria-label="Media sosial Imajinari"
      className={`flex items-center ${className}`}
    >
      {SOCIALS.map(({ label, href, Icon, glyph }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} Imajinari`}
          title={label}
          className="grid h-[46px] w-[46px] place-items-center border border-l-0 border-white/35 text-white transition-colors duration-200 ease-out first:rounded-l-full first:border-l last:rounded-r-full hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
        >
          <Icon aria-hidden="true" className={glyph} />
        </a>
      ))}
    </nav>
  );
}

export default SocialLinks;
