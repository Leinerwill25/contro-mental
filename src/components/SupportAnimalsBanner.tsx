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

const DEFAULT_IMAGES: Img[] = [
	{ src: '/pexels-pixabay-416160.jpg', alt: 'Gatito' },
	{ src: '/pexels-lum3n-44775-406014.jpg', alt: 'Perrito' },
	{ src: '/pexels-pixabay-45201.jpg', alt: 'Gatita' },
];

export default function SupportAnimalsBanner({ message = 'Todos nuestros productos ayudan a los animalitos abandonados — Pre Fundación PATITAS en la calle. ¡Ayúdanos ah ayudar!', images = DEFAULT_IMAGES, persistKey = 'supportAnimalsBanner:v1', onDonate }: Props) {
	// Sólo usamos `minimized`. Eliminamos la opción de "ocultar" para evitar desapariciones.
	const [minimized, setMinimized] = useState<boolean>(() => {
		try {
			if (typeof window === 'undefined') return false;
			const raw = localStorage.getItem(persistKey);
			if (!raw) return false;
			const parsed = JSON.parse(raw);
			// Compatibilidad: si datos antiguos tenían `open: false`, lo convertimos en minimized = true
			if (typeof parsed.minimized === 'boolean') return parsed.minimized;
			if (typeof parsed.open === 'boolean' && parsed.open === false) return true;
			return false;
		} catch {
			return false;
		}
	});

	const [index, setIndex] = useState(0);
	const autoplayRef = useRef<number | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	// Persistir SOLO minimized
	useEffect(() => {
		try {
			localStorage.setItem(persistKey, JSON.stringify({ minimized }));
		} catch {}
	}, [minimized, persistKey]);

	// autoplay (respeta prefers-reduced-motion)
	useEffect(() => {
		const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (images.length <= 1 || prefersReduced) return;
		autoplayRef.current = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 4500);
		return () => {
			if (autoplayRef.current) window.clearInterval(autoplayRef.current);
		};
	}, [images.length]);

	// keyboard: Esc => minimizar, M => toggle minimizar (accesibilidad)
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setMinimized(true);
			if (e.key === 'm' || e.key === 'M') setMinimized((s) => !s);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	const prev = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
	};
	const next = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		setIndex((i) => (i + 1) % images.length);
	};

	// Siempre se renderiza — sólo mostramos la versión minimizada o expandida.
	return (
		<div ref={containerRef} aria-live="polite" role="region" aria-label="Apoya a los animalitos - PATITAS" className="fixed left-5 bottom-5 z-50 w-[340px] sm:w-[380px] md:w-[540px]">
			{/* Minimizado (pill) */}
			{minimized ? (
				<div className="flex items-center gap-3 bg-white/95 backdrop-blur rounded-full px-3 py-2 shadow-lg border border-slate-200">
					<button onClick={() => setMinimized(false)} aria-label="Abrir panel de ayuda" className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 hover:text-[#0B2342] focus:outline-none focus:ring-4 focus:ring-[#0B2342]/15 rounded">
						<Heart className="w-4 h-4 text-amber-400" />
						<span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 font-semibold">Apoya a PATITAS - Clic Aquí</span>
						<span className="inline sm:hidden bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 font-semibold">PATITAS</span>
					</button>

					{/* Eliminé el botón "cerrar" que ocultaba el componente; si quieres reintroducir un 'dismiss permanente'
              lo hago con una opción explícita y confirmación. */}
				</div>
			) : (
				/* Expandido: tarjeta */
				<div className="bg-white/95 rounded-2xl shadow-2xl overflow-hidden border border-slate-100 ring-1 ring-slate-100">
					<div className="flex items-start gap-3 p-4">
						{/* Imagen / carrusel */}
						<div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
							<Image src={images[index].src} alt={images[index].alt ?? 'animal'} fill sizes="112px" className="object-cover" priority={index === 0} />
							{images.length > 1 && (
								<>
									<button onClick={prev} aria-label="Anterior imagen" className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-[#0B2342]/15">
										<ChevronLeft className="w-4 h-4 text-slate-700" />
									</button>
									<button onClick={next} aria-label="Siguiente imagen" className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-[#0B2342]/15">
										<ChevronRight className="w-4 h-4 text-slate-700" />
									</button>
								</>
							)}
						</div>

						{/* Texto */}
						<div className="flex-1 min-w-0">
							<h3 className="text-sm font-semibold uppercase tracking-wide">
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-400">Apoya a PATITAS</span>
							</h3>
							<p className="mt-1 text-sm text-slate-700 leading-snug line-clamp-3">{message}</p>

							<div className="mt-3 flex items-center gap-2">
								<button onClick={() => setMinimized(true)} className="px-3 py-2 text-sm bg-slate-50 text-slate-700 rounded-md border border-slate-100 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-[#0B2342]/12" aria-expanded={!minimized}>
									Minimizar
								</button>
							</div>
						</div>

						{/* Controles verticales */}
						<div className="flex flex-col items-center gap-2 ml-2">
							<button aria-label="Minimizar panel" onClick={() => setMinimized(true)} className="p-1 rounded-full text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#0B2342]/12">
								<X className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Pie decorativo con gradiente de acento */}
					<div className="h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200" />
				</div>
			)}
		</div>
	);
}
