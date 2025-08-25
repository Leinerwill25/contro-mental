// components/BookCarousel.tsx
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Book = {
	id: number;
	title: string;
	subtitle?: string;
	price: string;
	image: string;
	info?: string;
	tag?: string;
};

type Props = {
	books: Book[];
	autoplay?: number; // ms, 0 = off
};

export default function BookCarousel({ books, autoplay = 0 }: Props) {
	const [current, setCurrent] = useState(0);

	// autoplay
	useEffect(() => {
		if (!autoplay || books.length <= 1) return;
		const t = setInterval(() => setCurrent((s) => (s === books.length - 1 ? 0 : s + 1)), autoplay);
		return () => clearInterval(t);
	}, [autoplay, books.length]);

	// keyboard nav
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

	return (
		<section className="w-full max-w-7xl mx-auto p-6 md:p-10">
			{/* Outer frame: thin accent border to match diagram */}
			<div className="relative bg-gradient-to-b from-white via-white/95 to-slate-50 border-2 border-slate-100 rounded-3xl p-6 md:p-8 shadow-lg overflow-visible">
				<div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
					{/* Imagen sobresaliente */}
					<div className="relative flex-shrink-0 w-56 md:w-72 lg:w-80 -mt-8 md:-mt-12 transform transition-all duration-500 hover:scale-105" aria-hidden={false}>
						<div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-100 shadow-2xl">
							<Image src={book.image} alt={book.title} width={720} height={960} className="object-cover w-full h-[260px] md:h-[420px] lg:h-[480px] block" priority />
						</div>

						{/* Tag superior (opcional) */}
						{book.tag ? <span className="absolute -left-3 top-4 md:top-6 bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm">{book.tag}</span> : null}

						{/* Sutil label debajo de la imagen */}
						<div className="mt-3 flex items-center gap-2">
							<div className="w-10 h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" />
							<p className="text-xs text-slate-500">Imagen del producto</p>
						</div>
					</div>

					{/* Bloque de información redondeado */}
					<div className="flex-1 w-full">
						<div className="bg-white/70 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 md:p-8 shadow-md">
							<h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-slate-900 leading-tight">{book.title}</h3>

							{book.subtitle && <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl">{book.subtitle}</p>}

							{/* Información destacada dentro de un panel redondeado (a la derecha en el dibujo) */}
							{book.info && (
								<div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-5 md:p-6 shadow-inner">
									<p className="text-sm md:text-base text-slate-700 leading-relaxed">{book.info}</p>
								</div>
							)}

							{/* Precio grande y CTA */}
							<div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
								<div className="flex items-baseline gap-3">
									<span className="text-sm text-slate-500">Precio</span>
									<span className="text-2xl md:text-3xl font-extrabold text-slate-900">€{book.price}</span>
								</div>

								<div className="flex items-center gap-3 ml-0 sm:ml-6">
									<a href={`#comprar-${book.id}`} className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-lg hover:scale-[1.03] transform transition" aria-label={`Comprar ${book.title}`}>
										Comprar ahora
									</a>

									<button onClick={() => alert(`Más info de ${book.title}`)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition" aria-label={`Más información ${book.title}`}>
										Más info
									</button>
								</div>
							</div>

							{/* Thumbnails / indicadores visuales (miniaturas) */}
							<div className="mt-6 flex items-center gap-3">
								<div className="flex gap-2 overflow-x-auto pb-1">
									{books.map((b, i) => (
										<button key={b.id} onClick={() => setCurrent(i)} aria-label={`Ver ${b.title}`} className={`flex-none rounded-lg overflow-hidden ring-1 ring-transparent ${i === current ? 'ring-2 ring-indigo-300 scale-105' : 'opacity-70 hover:opacity-100'} transform transition`} style={{ width: 64, height: 64 }}>
											<Image src={b.image} alt={b.title} width={64} height={64} className="object-cover w-full h-full" />
										</button>
									))}
								</div>

								{/* Dots (alternativa) */}
								<div className="ml-auto hidden sm:flex items-center gap-2">
									{books.map((_, idx) => (
										<button key={idx} onClick={() => setCurrent(idx)} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === current ? 'bg-indigo-600 scale-125' : 'bg-slate-300'}`} aria-label={`Slide ${idx + 1}`} />
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Flechas superpuestas */}
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
