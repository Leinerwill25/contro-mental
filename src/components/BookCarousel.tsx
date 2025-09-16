'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Review = { user: string; text: string; rating: number; date?: string };

type Book = {
	id: number;
	title: string;
	subtitle?: string;
	author?: string;
	price: string;
	image: string;
	tag?: string;
	info?: string;
	details?: string;
	features?: string[];
	isbn?: string;
	pages?: number;
	language?: string;
	format?: string;
	releaseDate?: string;
	stock?: number;
	sku?: string;
	purchaseUrl?: string;
	rating?: number;
	reviews?: Review[];
	sampleUrl?: string;
	category?: string;
	relatedIds?: number[];
};

type Props = {
	books: Book[];
	autoplay?: number;
	/** ruta a la imagen de fondo en /public (opcional) */
	backgroundImage?: string;
	/** escala del fondo: 1 = 100%, 1.3 = 130% (opcional) */
	backgroundScale?: number;
};

const FEATURED_ID = 1;

// Colores corporativos / adicionales para degradado más llamativo
const PINK_HEX = '#ff6fa3';
const BLUE_HEX = '#0066ff';
const DARK_BLUE_HEX = '#0b2b8a';
const RED_HEX = '#ff3b30';
const STRONG_GRADIENT = `linear-gradient(90deg, ${RED_HEX} 0%, ${PINK_HEX} 40%, ${BLUE_HEX} 100%)`;

export default function BookCarousel({ books, autoplay = 0, backgroundImage = '/f.jpg', backgroundScale = 1.6 }: Props) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!autoplay || books.length <= 1) return;
		const t = setInterval(() => setCurrent((s) => (s === books.length - 1 ? 0 : s + 1)), autoplay);
		return () => clearInterval(t);
	}, [autoplay, books.length]);

	const prevSlide = useCallback(() => setCurrent((p) => (p === 0 ? books.length - 1 : p - 1)), [books.length]);
	const nextSlide = useCallback(() => setCurrent((p) => (p === books.length - 1 ? 0 : p + 1)), [books.length]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') prevSlide();
			if (e.key === 'ArrowRight') nextSlide();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [prevSlide, nextSlide]);

	if (!books || books.length === 0) return null;
	const book = books[current];

	const loveTitleMatcher = (t?: string) => {
		if (!t) return false;
		const normalized = t
			.normalize('NFD')
			.replace(/[^\w\s]/g, '')
			.replace(/[\u0300-\u036f]/g, '');
		return /como\s+tener\s+exito\s+en\s+el\s+amor/i.test(normalized);
	};

	function parseThemes(sub?: string) {
		if (!sub) return [];
		const cleaned = sub.replace(/^Temas:\s*/i, '').trim();
		const parts = cleaned
			.split(/\s*-\s*/)
			.map((s) => s.trim())
			.filter(Boolean);
		return parts;
	}

	const containerTextStyle: React.CSSProperties | undefined = book.id === 2 ? { color: BLUE_HEX } : undefined;
	const isSecondPearl = !!book.title && book.title.trim().toLowerCase() === 'second pearl harbor';

	// Background style (inline so it uses the provided path)
	const sectionBgStyle: React.CSSProperties = {
		backgroundImage: `url('${backgroundImage}')`,
		backgroundSize: `${Math.round(backgroundScale * 100)}% auto`,
		backgroundPosition: 'center top',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'scroll',
	};

	const sectionExtraStyle: React.CSSProperties = {
		minHeight: '640px',
		paddingTop: '32px',
		paddingBottom: '32px',
	};

	return (
		<section id="libro" className="w-full max-w-7xl mx-auto p-8 md:p-16 relative rounded-3xl overflow-visible" style={{ ...sectionBgStyle, ...sectionExtraStyle }} aria-label="Carrusel de libros">
			{/* overlay for readable text */}
			<div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-black/10 via-white/30 to-black/10 pointer-events-none" />

			{/* Outer frame (content) */}
			<div className="relative bg-white/30 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl overflow-visible" style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>
				<div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-t from-white/30 via-white/10 to-transparent mix-blend-overlay" />
				<div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
					{/* Imagen sobresaliente */}
					<div className={`relative flex-shrink-0 -mt-8 md:-mt-12 transform transition-all duration-500 hover:scale-105 ${book.id === FEATURED_ID ? 'w-64 md:w-80 lg:w-96' : 'w-56 md:w-72 lg:w-80'}`} aria-hidden={false}>
						<div className={`relative rounded-3xl overflow-hidden ring-1 ${book.id === FEATURED_ID ? 'ring-indigo-200 shadow-[0_20px_50px_rgba(56,53,112,0.12)]' : 'ring-slate-100 shadow-2xl'}`}>
							<Image src={book.image} alt={book.title} width={720} height={960} className="object-cover w-full h-[260px] md:h-[420px] lg:h-[480px] block" priority />
						</div>

						{book.tag ? <span className={`absolute -left-3 top-4 md:top-6 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm ${book.id === FEATURED_ID ? 'bg-gradient-to-r from-red-500 to-blue-600 text-white' : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white'}`}>{book.tag}</span> : null}

						<div className="mt-3 flex items-center gap-2">
							<div className="w-10 h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" aria-hidden="true" />
						</div>
					</div>

					{/* Bloque de información redondeado */}
					<div className="flex-1 w-full">
						<div className={`bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 md:p-8 shadow-md ${book.id === FEATURED_ID ? 'ring-1 ring-indigo-50' : ''}`} style={containerTextStyle}>
							{/* Title: prioridad especial para book.id === 2 */}
							{book.id === 2 ? (
								<>
									<h3 className="leading-tight text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ backgroundImage: STRONG_GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', textShadow: '0 6px 30px rgba(2,6,23,0.18)' }}>
										{book.title}
									</h3>
									{/* Subtitulo más grande y legible para id 2 */}
									{book.subtitle && (
										<p className="mt-3 text-base md:text-lg lg:text-xl font-semibold leading-snug" style={{ color: DARK_BLUE_HEX, letterSpacing: '0.2px' }}>
											{book.subtitle}
										</p>
									)}
								</>
							) : loveTitleMatcher(book.title) ? (
								<h3 className="leading-tight text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
									<span style={{ backgroundImage: `linear-gradient(90deg, ${PINK_HEX}, ${BLUE_HEX})` }} className="bg-clip-text text-transparent">
										{book.title}
									</span>
								</h3>
							) : isSecondPearl ? (
								<h3 className="leading-tight text-2xl md:text-3xl lg:text-5xl font-extrabold tracking-tight">
									<span style={{ backgroundImage: `linear-gradient(90deg, ${BLUE_HEX}, ${RED_HEX})` }} className="bg-clip-text text-transparent">
										{book.title}
									</span>
								</h3>
							) : (
								<h3 className={`leading-tight ${book.id === FEATURED_ID ? 'text-3xl md:text-5xl lg:text-6xl font-extrabold' : 'text-lg md:text-2xl lg:text-3xl font-semibold'}`} style={book.id === 1 ? { color: DARK_BLUE_HEX } : undefined}>
									{book.title}
								</h3>
							)}

							{/* Featured: themes */}
							{book.id === FEATURED_ID && book.subtitle ? (
								<div className="mt-4">
									<p className="text-base md:text-lg font-medium" style={{ color: DARK_BLUE_HEX }}>
										{/^Temas:/i.test(book.subtitle) ? 'Temas destacados:' : ''}
									</p>

									<div className="mt-3 flex flex-wrap gap-2 items-start">
										{parseThemes(book.subtitle).map((t, i) => (
											<span key={i} className="flex items-center gap-2 bg-white/40 border border-slate-100 rounded-xl px-3 py-2 text-sm md:text-base font-medium shadow-sm" role="listitem">
												<span aria-hidden title={i % 2 === 0 ? 'estrella roja' : 'estrella azul'} className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-[12px] md:text-sm font-bold ${i % 2 === 0 ? 'bg-red-500' : 'bg-[#0066FF]'}`}>
													★
												</span>
												<span style={{ color: DARK_BLUE_HEX }}>{t}</span>
											</span>
										))}
									</div>
								</div>
							) : (
								book.subtitle && <p className="mt-3 text-sm md:text-base" style={book.subtitle.includes('Extras:') ? { color: DARK_BLUE_HEX } : undefined}></p>
							)}

							{/* Info card */}
							{book.info && (
								<div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-5 md:p-6 shadow-inner">
									<p className={`${book.id === FEATURED_ID ? 'text-blue-800 text-base md:text-lg' : 'text-sm md:text-base text-blue-800'} leading-relaxed`} style={book.info.includes('Extras:') || book.id === 2 ? { color: DARK_BLUE_HEX } : undefined}>
										{book.info}
									</p>
								</div>
							)}

							{/* Price & CTA */}
							<div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
								<div className="flex items-center gap-3 ml-0 sm:ml-6">
									<Link href={`/pagos?product=${encodeURIComponent(String(book.id))}`} className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-900 text-white font-semibold shadow-lg hover:scale-[1.03] transform transition focus:outline-none focus:ring-4 focus:ring-indigo-200" aria-label={`Adquirir ${book.title} - Ir a pagos`}>
										Adquirir
									</Link>

									{book.sampleUrl && (
										<a href={book.sampleUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border text-sm text-slate-700 hover:bg-slate-50 transition">
											Ver muestra
										</a>
									)}
								</div>
							</div>

							{/* Indicators */}
							<div className="mt-6 flex items-center gap-3">
								<div className="ml-auto hidden sm:flex items-center gap-2">
									{books.map((_, idx) => (
										<button key={idx} onClick={() => setCurrent(idx)} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === current ? 'bg-indigo-600 scale-125' : 'bg-slate-300'}`} aria-label={`Slide ${idx + 1}`} />
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Overlaid navigation arrows */}
				<button onClick={prevSlide} aria-label="Anterior" className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2.5 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition">
					<ChevronLeft className="w-5 h-5 text-indigo-600" />
				</button>

				<button onClick={nextSlide} aria-label="Siguiente" className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-2.5 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition">
					<ChevronRight className="w-5 h-5 text-indigo-600" />
				</button>
			</div>
		</section>
	);
}
