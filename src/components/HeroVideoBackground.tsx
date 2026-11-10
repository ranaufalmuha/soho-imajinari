"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Latar video YouTube untuk hero detail film.
 *
 * Aturan autoplay browser: video HARUS mute + playsInline, kalau tidak
 * diblokir. Karena itu lapisan ini murni dekoratif (aria-hidden) dan
 * pointer-events dimatikan — kontrol tetap milik halaman, bukan iframe.
 *
 * Fallback berlapis:
 * - hero memakai warna dasar gelap, jadi kalau video tidak tampil tetap rapi
 *   (tidak ada gambar cover di belakangnya lagi);
 * - reduced-motion, Save-Data, atau koneksi lambat → iframe tidak dipasang
 *   sama sekali;
 * - iframe baru dimuat setelah halaman sempat idle, jadi tidak menahan LCP.
 */
interface HeroVideoBackgroundProps {
	videoId: string;
	title: string;
}

export function HeroVideoBackground({
	videoId,
	title,
}: HeroVideoBackgroundProps) {
	const reduceMotion = useReducedMotion();
	const [allowed, setAllowed] = useState(false);

	useEffect(() => {
		const connection = (
			navigator as Navigator & {
				connection?: { saveData?: boolean; effectiveType?: string };
			}
		).connection;

		if (connection?.saveData) return;
		if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) {
			return;
		}

		setAllowed(true);
	}, []);

	if (reduceMotion || !allowed) return null;

	const params = new URLSearchParams({
		autoplay: "1",
		mute: "1",
		loop: "1",
		playlist: videoId,
		controls: "0",
		modestbranding: "1",
		playsinline: "1",
		rel: "0",
		iv_load_policy: "3",
		disablekb: "1",
		fs: "0",
	});

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 overflow-hidden opacity-55"
		>
			<iframe
				src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
				title={title}
				tabIndex={-1}
				allow="autoplay; encrypted-media; picture-in-picture"
				referrerPolicy="strict-origin-when-cross-origin"
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
				style={{
					// Tutup seluruh hero tanpa distorsi: 16:9 diskalakan ke sisi
					// terpanjang viewport.
					width: "100vw",
					height: "56.25vw",
					minWidth: "177.78vh",
					minHeight: "100%",
				}}
			/>
		</div>
	);
}

export default HeroVideoBackground;
