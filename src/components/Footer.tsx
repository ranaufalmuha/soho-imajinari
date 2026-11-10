"use client";

// Footer situs — tone dibedakan dari section konten: lebih gelap (#060609),
// type lebih kecil. Section konten terakhir tiap halaman langsung mengalir
// ke footer tanpa CTA di antaranya. Padding vertikal disamakan dengan section
// konten (py-16/sm:py-20/lg:py-24) supaya jarak section→footer konsisten
// di semua halaman.
const SITE_LINKS = [
  { label: "Film", href: "/film" },
  { label: "Tentang", href: "/tentang" },
  { label: "Berita", href: "/berita" },
];

export function Footer() {
  return (
    <footer className="w-full bg-(--color-accent) px-4 py-16 text-neutral-950 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="site-container">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
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
            aria-label="Navigasi footer"
            className="grid grid-cols-2 gap-x-12 gap-y-3 sm:flex sm:items-center sm:gap-8"
          >
            {SITE_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-950/70 transition-colors hover:text-neutral-950"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-neutral-950/15 pt-6 text-sm text-neutral-950/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} imajinari. Seluruh hak cipta
            dilindungi.
          </p>
          <p>Imajinasi dalam Gerak.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
