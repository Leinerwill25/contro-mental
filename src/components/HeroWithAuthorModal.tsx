// components/HeroWithAuthorModal.improved.tsx
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, Mail, Linkedin } from 'lucide-react';

type Author = {
	name: string;
	title?: string;
	bio: string;
	photo?: string;
	email?: string;
	linkedin?: string;
};

const SAMPLE_AUTHOR: Author = {
	name: 'Jaime Bértoli',
	title: 'Escritor e Investigador',
	bio: 'Con más de 28 años como profesor y conferencista internacional en Control Mental ALPHA, me dedico a enseñar el método Bértoli en varios países. Es un sistema short-time que produce cambios rápidos y sostenibles, permitiendo aplicar la energía mental para transformar tu entorno y alcanzar objetivos concretos.',
	photo: '/author-photo.jpg',
	email: 'alejandro@ejemplo.com',
	linkedin: 'https://linkedin.com/in/alejandro-ramirez',
};

export default function HeroWithAuthorModal(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const modalRef = useRef<HTMLDivElement | null>(null);
	const previouslyFocused = useRef<HTMLElement | null>(null);

	const openModal = useCallback(() => {
		previouslyFocused.current = document.activeElement as HTMLElement | null;
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		setTimeout(() => previouslyFocused.current?.focus(), 0);
	}, []);

	// Scroll lock while modal open
	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (isOpen) {
			const scrollY = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = '100%';
		} else {
			const top = document.body.style.top;
			if (top) {
				const scrollY = parseInt(top || '0') * -1;
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
				window.scrollTo(0, scrollY);
			} else {
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
			}
		}
		return () => {
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
		};
	}, [isOpen]);

	// Focus trap + ESC
	useEffect(() => {
		if (!isOpen) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				closeModal();
			} else if (e.key === 'Tab') {
				const modal = modalRef.current;
				if (!modal) return;
				const focusables = modal.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
				if (focusables.length === 0) return;
				const first = focusables[0];
				const last = focusables[focusables.length - 1];
				if (e.shiftKey) {
					if (document.activeElement === first) {
						e.preventDefault();
						last.focus();
					}
				} else {
					if (document.activeElement === last) {
						e.preventDefault();
						first.focus();
					}
				}
			}
		};

		// initial focus inside modal
		setTimeout(() => {
			const modal = modalRef.current;
			if (!modal) return;
			const focusable = modal.querySelector<HTMLElement>('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
			(focusable ?? modal).focus();
		}, 10);

		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, closeModal]);

	// Re-usable card base for a clean corporate look
	const cardBase = 'bg-white rounded-2xl border border-slate-100 p-4 shadow-sm';

	return (
		<>
			<section className="relative bg-gradient-to-r from-[#0B2342] to-[#133A66] text-white py-20">
				<div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-start md:items-center gap-10">
					{/* LEFT: Texto */}
					<div className="flex-1 pt-10">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
							Programa Internacional Bértoli
							<span className="block text-accent-200 mt-2 text-lg font-medium">"Control Mental Alpha"</span>
						</h1>

						<p className="mt-6 text-lg text-slate-100 max-w-xl leading-relaxed">Sistema short-time que activa tu potencial mental y proporciona resultados rápidos y aplicables. Aprende técnicas probadas para mejorar concentración, reducir estrés y alcanzar objetivos con mayor claridad.</p>

						<ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-100">
							{['Aplicación práctica de ondas mentales', 'Técnicas Alpha de relajación profunda', 'Visualización y clarividencia dirigida', 'Reducción efectiva del estrés y la ansiedad', 'Técnicas de análisis del ser humano', 'Mejora de la toma de decisiones y el foco'].map((item) => (
								<li key={item} className="flex items-start gap-3">
									<span className="flex-shrink-0 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">✓</span>
									<span className="leading-tight">{item}</span>
								</li>
							))}
						</ul>

						<div className="mt-6 flex flex-wrap gap-3 items-center">
							<a href="#libros" className="inline-flex items-center px-6 py-3 rounded-md bg-white text-[#07203a] font-semibold shadow hover:translate-y-[-2px] transition-transform">
								Ver libro
							</a>

							<button ref={triggerRef} onClick={openModal} className="inline-flex items-center px-6 py-3 rounded-md border border-white/20 bg-transparent text-white font-medium shadow-sm hover:bg-white/5 transition" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls="author-modal">
								Sobre el autor
							</button>
						</div>
					</div>

					{/* RIGHT: Imagen con recuadros decorativos y la tarjeta sobresaliente */}
					<div className="w-full md:w-1/2 relative">
						<div className="relative mx-auto md:mx-0 w-[92%] md:w-full lg:w-[95%] transform transition-shadow duration-300">
							{/* Top-left card */}
							<div aria-hidden className={`absolute -top-6 -left-6 z-50 w-40 md:w-43 h-30 ${cardBase} text-slate-900`}>
								<div className="text-sm font-semibold">Elimina:</div>
								<div className="mt-1 text-xs text-slate-500">Tus principales bloqueos mentales mediante técnicas prácticas.</div>
							</div>

							{/* Right card */}
							<div aria-hidden className={`absolute -right-6 top-16 z-50 w-40 md:w-48 h-20 ${cardBase} text-slate-900 flex items-center justify-center`}>
								<div>
									<div className="text-sm font-semibold">Aprende:</div>
									<div className="text-xs text-slate-500">A conectar con el núcleo mental de forma efectiva.</div>
								</div>
							</div>

							{/* Imagen principal */}
							<div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-800/20 bg-white z-40">
								<div className="w-full h-64 md:h-80 lg:h-96 relative">
									<Image src="/pexels-divinetechygirl-1181355.jpg" alt="Libros y formación" fill style={{ objectFit: 'cover' }} className="block" priority />
								</div>
							</div>

							{/* Bottom floating card */}
							<div className="absolute left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 bottom-[-48px] md:bottom-[-72px] z-50 w-[86%] md:w-[58%]">
								<div className={`${cardBase} text-slate-900`}>
									<p className="text-sm font-semibold">Aumento mínimo esperado</p>
									<p className="mt-1 text-xs text-slate-500">Hasta 3x en capacidad de análisis, comprensión y resolución práctica.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Modal del autor (responsive: full-screen on mobile, md+ keeps original grid) */}
			{isOpen && (
				<div id="author-modal" role="dialog" aria-modal="true" aria-labelledby="author-modal-title" className="fixed inset-0 z-50 flex items-center justify-center px-0 md:px-4">
					{/* overlay */}
					<div onClick={closeModal} className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" aria-hidden="true" />

					{/* PANEL:
              - Mobile: full-screen, no rounding, header sticky, footer sticky.
              - md+: previous max-w, rounded-2xl, grid layout preserved.
          */}
					<div
						ref={modalRef}
						role="document"
						tabIndex={-1}
						style={{ zIndex: 60 }}
						className="
              relative
              w-full
              h-full
              md:h-auto
              md:max-w-3xl
              md:mx-auto
              bg-white
              md:rounded-2xl
              shadow-2xl
              ring-1 ring-slate-100
              overflow-hidden
            ">
						{/* Mobile header (visible on mobile, hidden on md+) */}
						<div className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 flex items-center justify-between px-4 py-3">
							<div>
								<h3 className="text-base font-semibold text-slate-900">{SAMPLE_AUTHOR.name}</h3>
								{SAMPLE_AUTHOR.title && <p className="text-xs text-slate-600 mt-0.5">{SAMPLE_AUTHOR.title}</p>}
							</div>

							<button onClick={closeModal} aria-label="Cerrar" className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0B2342]">
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Content area:
                - Mobile: column, scrollable.
                - md+: grid 1/3 + 2/3 preserved.
            */}
						<div className="h-full md:h-auto overflow-y-auto">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-8">
								{/* Photo column */}
								<div className="md:col-span-1">
									<div className="w-full rounded-xl overflow-hidden border border-slate-100 bg-neutral-50">
										<div className="relative w-full h-44 md:h-56">
											{SAMPLE_AUTHOR.photo ? (
												<Image src={SAMPLE_AUTHOR.photo} alt={`${SAMPLE_AUTHOR.name} - foto`} fill style={{ objectFit: 'cover' }} />
											) : (
												<div className="w-full h-full flex items-center justify-center text-2xl text-slate-700 font-semibold">
													{SAMPLE_AUTHOR.name
														.split(' ')
														.map((n) => n[0])
														.slice(0, 2)
														.join('')}
												</div>
											)}
										</div>
									</div>
								</div>

								{/* Content column */}
								<div className="md:col-span-2 flex flex-col">
									{/* Desktop close sits top-right for md+, mobile uses header close */}
									<div className="hidden md:flex items-start justify-between">
										<div>
											<h2 id="author-modal-title" className="text-lg md:text-2xl font-semibold text-slate-900">
												{SAMPLE_AUTHOR.name}
											</h2>
											{SAMPLE_AUTHOR.title && <p className="mt-1 text-sm text-slate-600">{SAMPLE_AUTHOR.title}</p>}
										</div>

										<div>
											<button onClick={closeModal} aria-label="Cerrar" className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0B2342]">
												<X className="w-5 h-5" />
											</button>
										</div>
									</div>

									<div className="mt-4 text-sm text-slate-700 leading-relaxed space-y-4">
										<p>{SAMPLE_AUTHOR.bio}</p>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
											{SAMPLE_AUTHOR.email && (
												<a className="inline-flex items-center gap-2 text-sm text-slate-700" href={`mailto:${SAMPLE_AUTHOR.email}`}>
													<Mail className="w-4 h-4" />
													{SAMPLE_AUTHOR.email}
												</a>
											)}

											{SAMPLE_AUTHOR.linkedin && (
												<a className="inline-flex items-center gap-2 text-sm text-slate-700" href={SAMPLE_AUTHOR.linkedin} target="_blank" rel="noreferrer noopener">
													<Linkedin className="w-4 h-4" />
													Perfil LinkedIn
												</a>
											)}
										</div>

										<div className="mt-2 flex flex-wrap gap-3">
											<a href="#contacto" className="inline-flex items-center px-4 py-2 rounded-md bg-[#0B2342] text-white font-medium shadow-sm hover:opacity-95 transition">
												Contactar
											</a>

											<button onClick={closeModal} className="inline-flex items-center px-4 py-2 rounded-md border border-slate-200 text-sm text-slate-700 hover:bg-slate-100 transition">
												Cerrar
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Mobile sticky footer (visible on mobile only) */}
						<div className="md:hidden sticky bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-slate-100 px-4 py-3 flex items-center gap-3">
							<a href="#contacto" className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-md bg-[#0B2342] text-white font-medium">
								Contactar
							</a>
							<button onClick={closeModal} className="inline-flex items-center justify-center px-4 py-3 rounded-md border border-slate-200 text-sm text-slate-700">
								Cerrar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
