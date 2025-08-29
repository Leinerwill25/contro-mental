// components/BookCarousel.tsx
'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

type Review = { user: string; text: string; rating: number; date?: string };

type Book = {
	id: number;
	title: string;
	subtitle?: string;
	author?: string;
	price: string;
	image: string;
	tag?: string;
	info?: string; // breve: mostrado en la card
	details?: string; // modal: contenido distinto y más extenso
	features?: string[]; // bullets para modal
	isbn?: string;
	pages?: number;
	language?: string;
	format?: string;
	releaseDate?: string; // 'YYYY-MM-DD'
	stock?: number;
	sku?: string;
	purchaseUrl?: string;
	rating?: number; // 0..5
	reviews?: Review[];
	sampleUrl?: string;
	category?: string;
	relatedIds?: number[];
};

type Props = {
	books: Book[];
	autoplay?: number; // ms, 0 = off
};

const overlayVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.18 } },
};

const dialogVariants: Variants = {
	hidden: { opacity: 0, y: 16, scale: 0.995 },
	visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22 } },
};

export default function BookCarousel({ books, autoplay = 0 }: Props) {
	const [current, setCurrent] = useState(0);

	// modal state
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalBook, setModalBook] = useState<Book | null>(null);
	const lastActiveRef = useRef<HTMLElement | null>(null);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);

	// autoplay
	useEffect(() => {
		if (!autoplay || books.length <= 1) return;
		const t = setInterval(() => setCurrent((s) => (s === books.length - 1 ? 0 : s + 1)), autoplay);
		return () => clearInterval(t);
	}, [autoplay, books.length]);

	// keyboard nav for slides + ESC close handled here
	const prevSlide = useCallback(() => setCurrent((p) => (p === 0 ? books.length - 1 : p - 1)), [books.length]);
	const nextSlide = useCallback(() => setCurrent((p) => (p === books.length - 1 ? 0 : p + 1)), [books.length]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') prevSlide();
			if (e.key === 'ArrowRight') nextSlide();
			if (e.key === 'Escape' && isModalOpen) closeModal();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [prevSlide, nextSlide, isModalOpen]);

	if (!books || books.length === 0) return null;
	const book = books[current];

	function openModalForBook(b: Book, trigger?: HTMLElement | null) {
		lastActiveRef.current = trigger ?? (document.activeElement as HTMLElement | null);
		setModalBook(b);
		setIsModalOpen(true);
		// focus will be given by AnimateModal on mount (we still attempt a small timeout)
		setTimeout(() => closeBtnRef.current?.focus(), 50);
	}

	function closeModal() {
		setIsModalOpen(false);
		setModalBook(null);
		// restore focus to last active element (slight timeout to allow modal unmount)
		setTimeout(() => lastActiveRef.current?.focus(), 50);
	}

	function getModalContent(b: Book) {
		if (b.details && b.details.trim().length > 0) return b.details;
		// ensure difference from book.info
		const infoDiff = b.info && b.info.trim().length > 0 ? `Nota: (diferente al resumen) ${b.info}` : '';
		return `Detalles extendidos sobre "${b.title}". Contenido adicional: características clave, beneficios y uso recomendado. Precio: €${b.price}. ${infoDiff}`;
	}

	return (
		<section id="libro" className="w-full max-w-7xl mx-auto p-6 md:p-10">
			{/* Outer frame */}
			<div className="relative bg-gradient-to-b from-white via-white/95 to-slate-50 border-2 border-slate-100 rounded-3xl p-6 md:p-8 shadow-lg overflow-visible">
				<div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
					{/* Imagen sobresaliente */}
					<div className="relative flex-shrink-0 w-56 md:w-72 lg:w-80 -mt-8 md:-mt-12 transform transition-all duration-500 hover:scale-105" aria-hidden={false}>
						<div className="relative rounded-3xl overflow-hidden ring-1 ring-slate-100 shadow-2xl">
							<Image src={book.image} alt={book.title} width={720} height={960} className="object-cover w-full h-[260px] md:h-[420px] lg:h-[480px] block" priority />
						</div>

						{book.tag ? <span className="absolute -left-3 top-4 md:top-6 bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm">{book.tag}</span> : null}

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

							{/* Información breve (card) */}
							{book.info && (
								<div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-5 md:p-6 shadow-inner">
									<p className="text-sm md:text-base text-slate-700 leading-relaxed">{book.info}</p>
								</div>
							)}

							{/* Precio y CTAs */}
							<div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4">
								<div className="flex items-baseline gap-3">
									<span className="text-sm text-slate-500">Precio</span>
									<span className="text-2xl md:text-3xl font-extrabold text-slate-900">€{book.price}</span>
								</div>

								<div className="flex items-center gap-3 ml-0 sm:ml-6">
									<a href={`#comprar-${book.id}`} className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold shadow-lg hover:scale-[1.03] transform transition" aria-label={`Comprar ${book.title}`}>
										Comprar ahora
									</a>

									{/* Opens modal with DIFFERENT content */}
									<button
										onClick={(e) => {
											e.stopPropagation();
											openModalForBook(book, e.currentTarget as HTMLElement);
										}}
										className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition"
										aria-label={`Más información sobre ${book.title}`}>
										Más info
									</button>
								</div>
							</div>

							{/* Thumbnails / indicators */}
							<div className="mt-6 flex items-center gap-3">
								<div className="flex gap-2 overflow-x-auto pb-1">
									{books.map((b, i) => (
										<button key={b.id} onClick={() => setCurrent(i)} aria-label={`Ver ${b.title}`} className={`flex-none rounded-lg overflow-hidden ring-1 ring-transparent ${i === current ? 'ring-2 ring-indigo-300 scale-105' : 'opacity-70 hover:opacity-100'} transform transition`} style={{ width: 64, height: 64 }}>
											<Image src={b.image} alt={b.title} width={64} height={64} className="object-cover w-full h-full" />
										</button>
									))}
								</div>

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

			{/* Modal (rendered in portal to ensure it sits above everything) */}
			<AnimateModal isOpen={isModalOpen} onClose={closeModal} initialFocusRef={closeBtnRef}>
				{modalBook && (
					<div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
						{/* Left: image (con altura restringida para no estirar verticalmente) */}
						<div className="relative rounded-2xl overflow-hidden bg-white/70 ring-1 ring-slate-100 shadow-md h-48 md:h-64 lg:h-80 xl:h-[340px]">
							<Image src={modalBook.image} alt={modalBook.title} fill className="object-cover w-full h-full" />
						</div>

						{/* Right: different details */}
						<div className="p-4 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm h-[calc(80vh-48px)] md:h-auto overflow-auto">
							<h2 className="text-2xl font-bold text-slate-900">{modalBook.title}</h2>
							{modalBook.author && (
								<p className="mt-1 text-sm text-slate-600">
									Autor: <strong>{modalBook.author}</strong>
								</p>
							)}
							{modalBook.subtitle && <p className="mt-2 text-sm text-slate-600">{modalBook.subtitle}</p>}

							<div className="mt-4 text-sm text-slate-700">
								<p>{getModalContent(modalBook)}</p>

								{/* Render features if available */}
								{modalBook.features && modalBook.features.length > 0 && (
									<ul className="mt-4 list-disc list-inside text-sm text-slate-700 space-y-2">
										{modalBook.features.map((f, i) => (
											<li key={i}>{f}</li>
										))}
									</ul>
								)}

								{/* Example structured extra info */}
								<ul className="mt-4 list-disc list-inside text-sm text-slate-700 space-y-2">
									<li>
										<strong>Formato:</strong> {modalBook.format ?? ''}
									</li>
									<li>
										<strong>Etiqueta:</strong> {modalBook.tag ?? ''}
									</li>
								</ul>
							</div>

							{/* reviews (if present) */}
							{modalBook.reviews && modalBook.reviews.length > 0 && (
								<div className="mt-4">
									<h4 className="font-medium text-sm text-slate-800">Reseñas</h4>
									<div className="mt-2 space-y-2 text-sm text-slate-700">
										{modalBook.reviews.slice(0, 3).map((r, i) => (
											<div key={i} className="border rounded-md p-2 bg-slate-50">
												<div className="flex items-center justify-between">
													<strong>{r.user}</strong>
													<span className="text-xs text-slate-500">{r.rating}/5</span>
												</div>
												<p className="mt-1 text-xs text-slate-700">{r.text}</p>
											</div>
										))}
									</div>
								</div>
							)}

							<div className="mt-6 flex items-center gap-3">
								<div className="flex items-baseline gap-3">
									<span className="text-sm text-slate-500">Precio</span>
									<span className="text-xl font-extrabold text-slate-900">€{modalBook.price}</span>
								</div>

								<a href={modalBook.purchaseUrl ?? `#comprar-${modalBook.id}`} className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:brightness-95 transition">
									Comprar ahora
								</a>
							</div>
						</div>
					</div>
				)}
			</AnimateModal>
		</section>
	);
}

/* AnimateModal: portal-based modal with very high z-index and scroll lock */
function AnimateModal({ children, isOpen, onClose, initialFocusRef }: { children: React.ReactNode; isOpen: boolean; onClose: () => void; initialFocusRef?: React.RefObject<HTMLButtonElement | null> }) {
	const elRef = useRef<HTMLDivElement | null>(null);

	// create portal container
	useEffect(() => {
		if (typeof window === 'undefined') return;
		elRef.current = document.createElement('div');
		elRef.current.setAttribute('data-modal-portal', 'true');
		document.body.appendChild(elRef.current);
		return () => {
			if (elRef.current) {
				document.body.removeChild(elRef.current);
				elRef.current = null;
			}
		};
	}, []);

	// lock scroll while open
	useEffect(() => {
		if (!isOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, [isOpen]);

	// nothing to render until portal node exists and open
	if (!isOpen || typeof window === 'undefined' || !elRef.current) return null;

	const modal = (
		<motion.div initial="hidden" animate="visible" exit="hidden" variants={overlayVariants} className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
			{/* overlay */}
			<motion.div variants={overlayVariants} initial="hidden" animate="visible" onClick={(e) => e.currentTarget === e.target && onClose()} className="absolute inset-0 bg-black/55" />

			{/* dialog: wider and constrained vertically */}
			<motion.div variants={dialogVariants} initial="hidden" animate="visible" role="dialog" aria-modal="true" className="relative z-[100000] max-w-7xl w-full max-h-[80vh]">
				<div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 p-4 md:p-6 h-full">
					<div className="flex items-start justify-end">
						<button ref={initialFocusRef ?? null} onClick={onClose} aria-label="Cerrar" className="inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-600 hover:text-slate-900 bg-white border border-slate-100 shadow-sm">
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="mt-2 h-[calc(80vh-64px)] overflow-auto">{children}</div>
				</div>
			</motion.div>
		</motion.div>
	);

	return createPortal(modal, elRef.current);
}
