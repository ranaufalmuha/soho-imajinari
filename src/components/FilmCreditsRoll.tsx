"use client";

import { useEffect, useRef, useState } from "react";
import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useReducedMotion,
} from "motion/react";
import {
	formatReleaseDate,
	formatRuntime,
	type Film,
} from "./films";

/**
 * Credit roll vertikal (bawah → atas) seperti kredit akhir film.
 *
 * Satu lajur saja. Isinya diambil dari data film yang sudah ada, jadi tidak
 * ada field baru: sutradara, penulis, pemain, genre, durasi, tahun, tanggal
 * rilis, bahasa, rumah produksi, dan mitra produksi.
 *
 * Loop tanpa lompatan: satu grup kredit diulang beberapa kali (jumlahnya
 * dihitung dari tinggi area), lalu `y` dianimasikan 0 → -tinggiGrup dan
 * di-reset. Karena grup identik dan selalu menutupi area, ulangannya mulus.
 *
 * `prefers-reduced-motion` → tidak ada animasi sama sekali; kredit tampil
 * sebagai daftar statis yang bisa dibaca semua tanpa terpotong.
 */

interface FilmCreditsRollProps {
	film: Film;
}

interface Credit {
	role: string;
	/** Satu entri = satu baris. Nama-nama tidak pernah digabung jadi satu baris. */
	values: string[];
}

const SPEED_PX_PER_SECOND = 24;

function splitPartnerList(partners: string): string[] {
	return partners
		.split(",")
		.map((partner) => partner.trim())
		.filter(Boolean);
}

function buildCredits(film: Film): Credit[] {
	const credits: Credit[] = [
		{ role: "Sutradara", values: [film.director] },
	];

	if (film.writers?.length) {
		credits.push({ role: "Penulis", values: film.writers });
	}
	if (film.cast?.length) {
		credits.push({ role: "Pemain", values: film.cast });
	}

	credits.push({ role: "Genre", values: [film.genre] });

	if (film.runtime) {
		credits.push({ role: "Durasi", values: [formatRuntime(film.runtime)] });
	}

	credits.push({ role: "Tahun", values: [film.year] });

	if (film.releaseDate) {
		credits.push({
			role: "Tanggal rilis",
			values: [formatReleaseDate(film.releaseDate)],
		});
	}
	if (film.language) {
		credits.push({ role: "Bahasa", values: [film.language] });
	}

	credits.push({ role: "Rumah produksi", values: ["Imajinari"] });

	if (film.partners && film.partners !== "—") {
		credits.push({
			role: "Mitra produksi",
			values: splitPartnerList(film.partners),
		});
	}

	return credits;
}

function CreditList({
	film,
	credits,
	hidden,
}: {
	film: Film;
	credits: Credit[];
	hidden?: boolean;
}) {
	return (
		<ul
			data-credit-group
			aria-hidden={hidden || undefined}
			className="flex flex-col items-center gap-14 px-6 py-8 text-center"
		>
			{credits.map((credit) => (
				<li key={credit.role} className="flex flex-col items-center gap-3">
					<span className="text-sm leading-none font-medium text-neutral-400">
						{credit.role}
					</span>
					<span className="flex max-w-full flex-col items-center gap-2">
						{credit.values.map((value) => (
							<span
								key={value}
								className="text-lg leading-snug font-medium tracking-tight text-balance break-words text-white sm:text-xl lg:text-2xl"
							>
								{value}
							</span>
						))}
					</span>
				</li>
			))}

			{/* Penutup, seperti judul di akhir credit roll. */}
			<li className="flex flex-col items-center gap-3 pt-8">
				<span className="text-sm leading-none font-medium text-neutral-400">
					Film
				</span>
				<span className="max-w-full text-2xl leading-tight font-medium tracking-tight text-balance text-white sm:text-3xl lg:text-4xl">
					{film.title}
				</span>
				<span className="text-sm text-neutral-400">{film.year}</span>
			</li>
		</ul>
	);
}

export function FilmCreditsRoll({ film }: FilmCreditsRollProps) {
	const reduceMotion = useReducedMotion();
	const viewportRef = useRef<HTMLDivElement>(null);
	const y = useMotionValue(0);
	const [metrics, setMetrics] = useState({ groupHeight: 0, copies: 2 });

	const credits = buildCredits(film);

	useEffect(() => {
		const node = viewportRef.current;
		if (!node) return;

		const measure = () => {
			const group = node.querySelector<HTMLElement>("[data-credit-group]");
			if (!group) return;
			const groupHeight = group.offsetHeight;
			if (!groupHeight) return;

			setMetrics({
				groupHeight,
				copies: Math.max(2, Math.ceil(node.clientHeight / groupHeight) + 1),
			});
		};

		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(node);
		return () => observer.disconnect();
	}, [reduceMotion]);

	useAnimationFrame((_, delta) => {
		if (reduceMotion || !metrics.groupHeight) return;

		const next = y.get() - (SPEED_PX_PER_SECOND * delta) / 1000;
		y.set(next <= -metrics.groupHeight ? next + metrics.groupHeight : next);
	});

	// Tanpa animasi: daftar statis di dalam panel yang bisa digulir.
	if (reduceMotion) {
		return (
			<div className="h-full overflow-y-auto px-6 py-10">
				<dl className="grid gap-x-8 gap-y-12 text-center">
					{credits.map((credit) => (
						<div key={credit.role} className="flex flex-col gap-3">
							<dt className="text-sm leading-none font-medium text-neutral-400">
								{credit.role}
							</dt>
							<dd className="flex flex-col gap-2 text-lg leading-snug font-medium tracking-tight text-balance text-white sm:text-xl">
								{credit.values.map((value) => (
									<span key={value}>{value}</span>
								))}
							</dd>
						</div>
					))}

					<div className="flex flex-col gap-3 pt-6">
						<dt className="text-sm leading-none font-medium text-neutral-400">
							Film
						</dt>
						<dd className="flex flex-col gap-2 text-white">
							<span className="text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
								{film.title}
							</span>
							<span className="text-sm text-neutral-400">{film.year}</span>
						</dd>
					</div>
				</dl>
			</div>
		);
	}

	return (
		<div className="relative h-full overflow-hidden">
			<div ref={viewportRef} className="h-full">
				<motion.div style={{ y }} className="will-change-transform">
					{Array.from({ length: metrics.copies }).map((_, index) => (
						<CreditList
							key={index}
							film={film}
							credits={credits}
							hidden={index > 0}
						/>
					))}
				</motion.div>
			</div>
		</div>
	);
}

export default FilmCreditsRoll;
