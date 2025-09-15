// src/components/HeroWithAuthorModal.tsx
'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, Mail } from 'lucide-react';

type Author = {
	name: string;
	title?: string;
	bio: string;
	photo?: string;
	email?: string;
	linkedin?: string;
};

const SAMPLE_AUTHOR: Author = {
	name: 'Jaime Bértoli Castagneto',
	title: 'Escritor e Investigador Social',
	bio: 'Despues de años viajando por este mundo de Díos en más de 16 países brindando mis conocimientos en marketing, control mental ALPHA y mátematicas no lineales a las empresas y a veces personalmente a los dueños de las mismas empresas, de tener 5 libros escritos, tres con ediciones internacionales, despues de ser asesor de dos campañas presidenciales las dos con éxitos presidenciales de los candidatos, de estudios en dos universidades y de un curso especial internacional en una marina de guerra, y de 28 añis investigando la mente humana estoy seguro que si te sientes persona frustrada, apresada, en una vida de stress y angustia, puedo ayudarte a cambiar y a mejorar tu vida. A que aprendas a manejar y dirigir el tesoro más valioso que tienes, ese tesoro es tu mente y su energía infinita, la mente humana crea físicamente tus deseos.',
	photo: '/Sr. Jaime.png',
	email: 'corporacion2025int@gmail.com',
	linkedin: 'https://linkedin.com/in/alejandro-ramirez',
};

// Helper: abre Gmail en desktop; en mobile usa mailto como fallback.
// subject y body serán codificados automáticamente.
function openMailCompose(email: string | undefined, subject = '', body = ''): void {
	if (!email || typeof window === 'undefined') return;

	const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent || '');
	const encodedSubject = encodeURIComponent(subject);
	const encodedBody = encodeURIComponent(body);

	const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodedSubject}&body=${encodedBody}&tf=1`;

	if (!isMobile) {
		window.open(gmailUrl, '_blank', 'noopener,noreferrer');
	} else {
		// fallback a mailto para abrir app nativa
		window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
	}
}

export default function HeroWithAuthorModal(): React.ReactElement {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const modalRef = useRef<HTMLDivElement | null>(null);
	const previouslyFocused = useRef<HTMLElement | null>(null);
	const scrollYRef = useRef<number | null>(null);

	const openModal = useCallback(() => {
		previouslyFocused.current = document.activeElement as HTMLElement | null;
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		// restore focus to the trigger (or previously focused element)
		setTimeout(() => {
			(previouslyFocused.current ?? triggerRef.current)?.focus();
		}, 0);
	}, []);

	// Scroll lock while modal open (robust handling)
	useEffect(() => {
		if (typeof window === 'undefined') return;

		if (isOpen) {
			scrollYRef.current = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollYRef.current}px`;
			document.body.style.width = '100%';
		} else {
			if (scrollYRef.current != null) {
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
				window.scrollTo(0, scrollYRef.current);
				scrollYRef.current = null;
			} else {
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
			}
		}
		return () => {
			// cleanup safe-guards
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
		};
	}, [isOpen]);

	// Focus trap + ESC handling
	useEffect(() => {
		if (!isOpen) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				closeModal();
			} else if (e.key === 'Tab') {
				const modal = modalRef.current;
				if (!modal) return;
				const focusables = Array.from(modal.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')).filter((el) => el.offsetParent !== null); // only visible
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
			const focusable = (modal.querySelector<HTMLElement>('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])') as HTMLElement) ?? modal;
			(focusable ?? modal).focus();
		}, 10);

		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, closeModal]);

	return (
		<>
			<section id="herotwo" className="relative text-white py-20">
				<div className="absolute inset-0 -z-20 bg-[url('/f.jpg')] bg-cover bg-center" />
				<div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
				<div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-start md:items-center gap-10">
					<div className="flex-1 pt-10">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
							Programa Internacional Bértoli
							<span className="block text-accent-200 mt-2 text-3xl font-medium">Cumple Tus Deseos</span>
							<span
								className=" font-semibold text-2xl tracking-tight
               bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200
               bg-clip-text text-transparent
               drop-shadow-[0_6px_18px_rgba(245,158,11,0.20)]">
								&quot;Control Mental ALPHA&quot;
							</span>
						</h1>

						<ul
							className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-base bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200
               bg-clip-text text-transparent
               drop-shadow-[0_6px_18px_rgba(245,158,11,0.20)]">
							{['Conocer Y Aplicar Las Ondas Electricas De Tu Mente', 'Conocer y Aplicar Técnica ALPHA De Relajación En Casos Especiales', 'Conocer y Aplicar Propiedad Mental De Visualización y Clarividencia ', 'Eliminar De Tu Vida El Stress Mas La Angustia y La Ansiedad', 'Aplicar Técnica ALPHA De Análisis Del Ser Humano', 'Ubicación ALPHA De Tu Vida En El Espacio Tiempo y Como Inmediatamente Mejorar', 'El Mas Importante: Mover Objetos Y Materializar Un Deseo'].map((item) => (
								<li key={item} className="flex items-start gap-3">
									<span
										className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200
               bg-clip-text text-transparent
               drop-shadow-[0_6px_18px_rgba(245,158,11,0.20)] flex items-center justify-center text-lg tracking-tight
               ">
										✓
									</span>
									<span className="leading-tight">{item}</span>
								</li>
							))}
						</ul>

						<div className="mt-6 flex flex-wrap gap-3 items-center">
							<a href="#herotwo" className="inline-flex items-center px-6 py-3 rounded-md bg-yellow-400 text-[#07203a] font-semibold shadow hover:translate-y-[-2px] transition-transform">
								Cumple Tus Deseos Obsequía El Libro ALPHA Al Éxito
							</a>

							<button ref={triggerRef} onClick={openModal} className="inline-flex items-center px-6 py-3 rounded-md border border-yellow-400 bg-transparent text-white font-medium shadow-sm hover:bg-white/5 transition" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls="author-modal">
								Trayectoría Del Autor Del Método Internacional Bértoli
							</button>
						</div>
					</div>

					<div className="w-full md:w-1/2 relative">
						<div className="relative mx-auto md:mx-0 w-[92%] md:w-full lg:w-[95%] transform transition-shadow duration-300">
							<div aria-hidden className="absolute -top-6 -left-6 z-50 w-40 md:w-43 h-32 bg-amber-300/95 rounded-2xl p-4 text-slate-900 shadow-lg">
								<div className="text-sm font-semibold">Elimina:</div>
								<div className="text-xs font-semibold text-slate-800">Tus principales bloqueos mentales mediante técnicas prácticas.</div>
							</div>

							<div aria-hidden className="absolute -right-6 top-16 z-50 w-40 md:w-48 h-20 bg-amber-300/95 rounded-2xl p-3 text-slate-900 flex items-center justify-center shadow-lg">
								<div>
									<div className="text-sm font-semibold">Aprende:</div>
									<div className="text-xs font-semibold text-slate-800">A conectar con el núcleo mental de forma efectiva.</div>
								</div>
							</div>

							<div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-800/20 bg-white z-40">
								<div className="w-full h-64 md:h-80 lg:h-96 relative">
									<Image src="/image (22).png" alt="Libros y formación" fill style={{ objectFit: 'cover' }} className="block" priority />
								</div>
							</div>

							<div className="absolute left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 bottom-[-48px] md:bottom-[-72px] z-50 w-[86%] md:w-[58%]">
								<div className="bg-amber-300/95 rounded-2xl p-6 text-slate-900 shadow-lg">
									<p className="text-sm font-semibold">Aumento mínimo 300%:</p>
									<p className="mt-1 text-xs font-semibold text-slate-800">Tu energía mental, eliminación completa del stress y la angustia, vas a poder a través de tu infinita energía mental. cambiar tu entorno físico, materializando tus deseos.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{isOpen && (
				<div id="author-modal" role="dialog" aria-modal="true" aria-labelledby="author-modal-title" className="fixed inset-0 z-[150] flex items-center justify-center px-4">
					<div onClick={closeModal} className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" aria-hidden="true" />

					<aside ref={modalRef} role="document" tabIndex={-1} style={{ zIndex: 60 }} className="relative w-full h-full md:h-auto md:max-w-3xl md:mx-auto bg-gradient-to-br from-slate-900 to-slate-800 md:rounded-2xl shadow-2xl ring-1 ring-amber-600/10 overflow-hidden transform transition-all duration-300 ease-out">
						<header className="md:hidden sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 flex items-center justify-between px-4 py-3">
							<div className="flex flex-col">
								<h3 className="text-base font-semibold text-amber-200">{SAMPLE_AUTHOR.name}</h3>
								{SAMPLE_AUTHOR.title && <p className="text-xs text-amber-100/80 mt-0.5">{SAMPLE_AUTHOR.title}</p>}
							</div>

							<button onClick={closeModal} aria-label="Cerrar modal" className="inline-flex items-center justify-center rounded-md p-2 text-amber-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-300">
								<X className="w-5 h-5" />
							</button>
						</header>

						<div className="h-full md:h-auto overflow-y-auto">
							<main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8" id="author-modal-main">
								<figure className="md:col-span-1 flex flex-col items-center">
									<div className="w-full rounded-xl overflow-hidden border border-amber-500/10 bg-gradient-to-b from-slate-800 to-slate-900 p-2">
										<div className="relative w-full h-44 md:h-56 rounded-xl overflow-hidden">
											{SAMPLE_AUTHOR.photo ? (
												<Image src={SAMPLE_AUTHOR.photo} alt={`${SAMPLE_AUTHOR.name} - foto`} fill style={{ objectFit: 'cover' }} className="block" />
											) : (
												<div className="w-full h-full flex items-center justify-center text-2xl text-amber-300 font-semibold bg-slate-800">
													{SAMPLE_AUTHOR.name
														.split(' ')
														.map((n) => n[0])
														.slice(0, 2)
														.join('')}
												</div>
											)}
										</div>
									</div>

									{SAMPLE_AUTHOR?.email && (
										<a href={`mailto:${SAMPLE_AUTHOR.email}`} aria-label={`Enviar correo a ${SAMPLE_AUTHOR.email}`} className="mt-2 mx-auto w-full sm:w-auto inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gradient-to-r from-amber-500 to-amber-300 text-slate-900 font-medium shadow text-xs">
											<Mail className="w-3 h-3" />
											<span className="truncate max-w-[9rem] md:max-w-none text-xs">{SAMPLE_AUTHOR.email}</span>
										</a>
									)}
								</figure>

								<section className="md:col-span-2 flex flex-col" aria-labelledby="author-modal-title">
									<div className="hidden md:flex items-start justify-between">
										<div>
											<h2 id="author-modal-title" className="text-xl md:text-2xl font-semibold text-amber-200">
												{SAMPLE_AUTHOR.name}
											</h2>
											{SAMPLE_AUTHOR.title && <p className="mt-1 text-sm text-amber-100/80">{SAMPLE_AUTHOR.title}</p>}
										</div>

										<div>
											<button onClick={closeModal} aria-label="Cerrar modal" className="inline-flex items-center justify-center rounded-md p-2 text-amber-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-300">
												<X className="w-5 h-5" />
											</button>
										</div>
									</div>

									<div className="mt-4 text-sm leading-relaxed space-y-4">
										<p className="text-amber-200/95 prose max-w-none">{SAMPLE_AUTHOR.bio}</p>
										<p className="text-amber-200/95 prose max-w-none">EMPIEZA A CAMBIAR TU VIDA LAS CASUALIDADES NO EXISTEN Y HOY DIA EL DESTINO TE BRINDA UNA OPORTUNIDAD</p>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:hidden">
											{SAMPLE_AUTHOR.email && (
												<a
													href={`mailto:${SAMPLE_AUTHOR.email}`}
													onClick={(e) => {
														e.preventDefault();
														// usamos el helper para abrir Gmail en desktop o mailto en mobile
														openMailCompose(SAMPLE_AUTHOR.email, 'Contacto - Autor', 'Hola, me interesa recibir información.');
													}}
													className="inline-flex items-center gap-2 text-xs text-amber-200 hover:underline truncate"
													aria-label={`Enviar correo a ${SAMPLE_AUTHOR.email}`}>
													<Mail className="w-3 h-3 text-amber-200" />
													<span className="max-w-[10rem] truncate">{SAMPLE_AUTHOR.email}</span>
												</a>
											)}
										</div>

										<div className="mt-2 flex flex-wrap gap-3">
											<a href={`mailto:${SAMPLE_AUTHOR.email}`} className="inline-flex items-center px-4 py-2 rounded-md bg-amber-400 text-[#07203a] font-medium shadow-sm hover:opacity-95 transition">
												Contactar - {SAMPLE_AUTHOR.email}
											</a>

											<button onClick={closeModal} className="inline-flex items-center px-4 py-2 rounded-md border border-amber-300 text-sm text-amber-100 hover:bg-white/5 transition">
												Cerrar
											</button>
										</div>
									</div>
								</section>
							</main>
						</div>

						<footer className="md:hidden sticky bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 px-4 py-3 flex items-center gap-3">
							<a href="#contacto" className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-md bg-amber-400 text-[#07203a] font-medium">
								Contactar
							</a>
							<button onClick={closeModal} className="inline-flex items-center justify-center px-4 py-3 rounded-md border border-amber-300 text-sm text-amber-100">
								Cerrar
							</button>
						</footer>
					</aside>
				</div>
			)}
		</>
	);
}
