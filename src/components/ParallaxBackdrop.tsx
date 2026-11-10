"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Backdrop panel kredit dengan parallax vertikal.
 *
 * Panel memakai rasio 2/1, poster aslinya 16/9 — `object-cover` memotong
 * area vertikal. Supaya potongan itu "terbaca" penuh:
 *
 * - gambar dibuat 160% tinggi panel (`top: -30%`), jadi ada 30% ruang lebih
 *   di atas dan di bawah;
 * - gambarnya digeser dari -18% ke +18% (persen dari tinggi gambar) sepanjang
 *   section melewati viewport.
 *
 * Arahnya berlawanan dengan scroll: halaman di-scroll ke bawah (section naik),
 * gambar justru bergerak TURUN relatif terhadap panel — efek parallax klasik,
 * background terasa lebih jauh daripada konten.
 *
 * Konsekuensi arah ini: saat section mulai terlihat, yang tampil bagian BAWAH
 * cover; saat section selesai hilang di atas layar, yang tampil bagian ATAS.
 * Total lintasan ±57% tinggi panel dalam satu kali lewat.
 *
 * 18% x 160% = 28,8% < 30% ruang lebih, jadi tepi gambar tidak pernah bocor.
 * `prefers-reduced-motion` → tanpa transform sama sekali.
 * Overlay hitam 90% meredam backdrop supaya teks kredit tetap dominan.
 */
interface ParallaxBackdropProps {
	src: string;
}

export function ParallaxBackdrop({ src }: ParallaxBackdropProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduceMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

	return (
		<div ref={ref} className="absolute inset-0 overflow-hidden">
			<motion.img
				src={src}
				alt=""
				aria-hidden="true"
				loading="lazy"
				decoding="async"
				draggable={false}
				style={reduceMotion ? undefined : { y }}
				className="absolute inset-x-0 top-[-30%] h-[160%] w-full object-cover object-center will-change-transform"
			/>
			{/* Overlay pekat: panel credit sempit (rasio 2:1) dan teksnya
			    berjalan terus, jadi backdrop cuma boleh terbaca sebagai
			    tekstur samar — bukan saingan visual teks kredit. */}
			<div className="absolute inset-0 bg-black/90" />
		</div>
	);
}

export default ParallaxBackdrop;
