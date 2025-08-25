// components/SupportAnimalsBanner.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Heart } from 'lucide-react';

type Img = { src: string; alt?: string };
type Props = {
	message?: string;
	images?: Img[];
	persistKey?: string;
	onDonate?: () => void;
};

export default function SupportAnimalsBanner({
	message = 'Todos nuestros productos ayudan a los animalitos abandonados — Pre Fundación PATITAS en la calle. ¡Ayúdanos a ayudar!',
	images = [
		{ src: '/pexels-pixabay-416160.jpg', alt: 'Gatito' },
		{ src: '/pexels-lum3n-44775-406014.jpg', alt: 'Perrito' },
		{ src: '/pexels-pixabay-45201.jpg', alt: 'Gatita' },
	],
	persistKey = 'supportAnimalsBanner:v1',
	onDonate,
}: Props) {
	const [open, setOpen] = useState(true);
	const [minimized, setMinimized] = useState(false);
	const [index, setIndex] = useState(0);
	const autoplayRef = useRef<number | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	// load persisted
	useEffect(() => {
		try {
			const raw = localStorage.getItem(persistKey);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (typeof parsed.open === 'boolean') setOpen(parsed.open);
				if (typeof parsed.minimized === 'boolean') setMinimized(parsed.minimized);
			}
		} catch {}
	}, [persistKey]);

	useEffect(() => {
		try {
			localStorage.setItem(persistKey, JSON.stringify({ open, minimized }));
		} catch {}
	}, [open, minimized, persistKey]);

	// autoplay, respects prefers-reduced-motion
	useEffect(() => {
		const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (images.length <= 1 || prefersReduced) return;
		autoplayRef.current = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 4500);
		return () => {
			if (autoplayRef.current) window.clearInterval(autoplayRef.current);
		};
	}, [images.length]);

	// keyboard: Esc to close, M to toggle minimize (quick accessibility)
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
			if ((e.key === 'm' || e.key === 'M') && open) setMinimized((s) => !s);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [open]);

	if (!open) return null;

	const prev = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
	};
	const next = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		setIndex((i) => (i + 1) % images.length);
	};

	return (
		<div ref={containerRef} aria-live="polite" role="region" aria-label="Apoya a los animalitos - PATITAS" className="fixed left-5 bottom-5 z-50 w-[340px] sm:w-[380px] md:w-[540px]">
			{/* Minimizado (pill) */}
			{minimized ? (
				<div className="flex items-center gap-3 bg-white/95 backdrop-blur rounded-full px-3 py-2 shadow-lg border border-slate-200">
					<button onClick={() => setMinimized(false)} aria-label="Abrir panel de ayuda" className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded">
						<Heart className="w-4 h-4 text-rose-500" />
						<span className="hidden sm:inline">Apoya a PATITAS</span>
						<span className="inline sm:hidden">PATITAS</span>
					</button>

					<div className="ml-auto flex items-center gap-1">
						<button onClick={() => setOpen(false)} aria-label="Cerrar" className="p-1 rounded-full text-slate-400 hover:text-slate-700 focus:outline-none">
							<X className="w-4 h-4" />
						</button>
					</div>
				</div>
			) : (
				/* Expandido: tarjeta */
				<div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 ring-1 ring-slate-200">
					<div className="flex items-start gap-3 p-4">
						{/* Imagen / carrusel */}
						<div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
							<Image src={images[index].src} alt={images[index].alt ?? 'animal'} fill sizes="112px" className="object-cover" priority={index === 0} />
							{images.length > 1 && (
								<>
									<button onClick={prev} aria-label="Anterior imagen" className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100">
										<ChevronLeft className="w-4 h-4 text-slate-700" />
									</button>
									<button onClick={next} aria-label="Siguiente imagen" className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100">
										<ChevronRight className="w-4 h-4 text-slate-700" />
									</button>
								</>
							)}
						</div>

						{/* Texto */}
						<div className="flex-1 min-w-0">
							<h3 className="text-sm text-rose-600 font-semibold uppercase tracking-wide">Apoya a PATITAS</h3>
							<p className="mt-1 text-sm text-slate-700 leading-snug line-clamp-3">{message}</p>

							<div className="mt-3 flex items-center gap-2">
								<button onClick={() => onDonate?.()} className="inline-flex items-center gap-2 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-200 transition-transform transform hover:-translate-y-0.5">
									<Heart className="w-4 h-4" />
									Donar
								</button>

								<button onClick={() => setMinimized(true)} className="px-3 py-2 text-sm bg-slate-50 text-slate-700 rounded-md border border-slate-100 hover:bg-slate-100 focus:outline-none" aria-expanded={!minimized}>
									Minimizar
								</button>
							</div>
						</div>

						{/* Controles verticales */}
						<div className="flex flex-col items-center gap-2 ml-2">
							<button aria-label="Cerrar panel" onClick={() => setOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-700 focus:outline-none">
								<X className="w-4 h-4" />
							</button>
							<div className="text-xs text-slate-400 uppercase tracking-wide">Fundación</div>
						</div>
					</div>

					{/* Pie decorativo */}
					<div className="h-1 bg-gradient-to-r from-rose-600 via-amber-400 to-rose-600" />
				</div>
			)}
		</div>
	);
}
