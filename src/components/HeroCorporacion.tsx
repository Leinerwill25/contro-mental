// src/components/HeroProfesional.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FlagCircularCarousel from './FlagCircularCarousel';

interface Flag {
	src: string;
	name: string;
}
interface HeroProfesionalProps {
	email?: string;
	flags?: Flag[];
}

export default function HeroProfesional({
	email = 'Corporacion2025int@gmail.com',
	flags = [
		{ src: '/descarga.png', name: 'España' },
		{ src: '/descarga (1).png', name: 'Venezuela' },
		{ src: '/descarga (2).png', name: 'Estados Unidos' },
		{ src: '/descarga (4).png', name: 'Perú' },
		{ src: '/descarga (3).png', name: 'Colombia' },
	],
}: HeroProfesionalProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const raf = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(raf);
	}, []);

	const enterBase = 'transition-all duration-600 ease-out';
	const titleCls = `${enterBase} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`;
	const subtitleCls = `${enterBase} delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`;
	const ctasCls = `${enterBase} delay-250 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`;

	const mailtoContacto = `mailto:${email}?subject=${encodeURIComponent('Información - Corporación Ejecutiva Internacional')}`;
	const mailtoContactar = `mailto:${email}?subject=${encodeURIComponent('Contacto - Corporación Ejecutiva Internacional')}`;

	// Helper: open Gmail compose on desktop, fallback to mailto on mobile.
	function openMailCompose(targetEmail: string, subject = '', body = ''): void {
		if (typeof window === 'undefined') return;

		const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent || '');
		const encodedSubject = encodeURIComponent(subject);
		const encodedBody = encodeURIComponent(body || '');

		// Gmail web compose URL (opens in new tab)
		const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodedSubject}&body=${encodedBody}&tf=1`;

		if (!isMobile) {
			// Desktop: open Gmail web compose in a new tab
			window.open(gmailUrl, '_blank', 'noopener,noreferrer');
		} else {
			// Mobile: use mailto to open native mail app
			window.location.href = `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}`;
		}
	}

	return (
		<header
			id="hero"
			className="w-full"
			aria-label="Hero Corporativo - Corporación Ejecutiva Internacional"
			// background sky-blue gradient
			style={{
				background: 'linear-gradient(180deg, rgba(199,230,255,1) 0%, rgba(224,249,255,1) 40%, rgba(245,253,255,1) 100%)',
			}}>
			<div className="relative overflow-hidden">
				<div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 flex flex-col-reverse md:flex-row items-center gap-10">
					{/* Texto principal */}
					<div className="w-full md:w-2/3">
						<div className={titleCls}>
							{/* Título en dorado (gradient dorado) */}
							<h1 className="gold-text text-3xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight" style={{ lineHeight: 1.02 }}>
								Corporación Ejecutiva Internacional
							</h1>
						</div>

						<div className={subtitleCls}>
							<p className="mt-4 text-sm md:text-base max-w-prose" style={{ color: '#06304a' /* azul oscuro legible, no negro */ }}>
								<strong style={{ color: '#D4AF37' /* dorado */ }}>Gente Emprendedora — Empresarial</strong> ·{' '}
								<span className="italic" style={{ color: '#06425a' }}>
									Somos una empresa de conocimientos
								</span>
								.
							</p>

							<p className="mt-4 text-sm md:text-lg leading-relaxed max-w-2xl" style={{ color: '#06304a' }}>
								<span style={{ fontWeight: 400 }}>Somos Una Empresa Que Ofrece A Su Público Conocimientos Que Brindan A Su Clientela La Oportunidad De Tener Mayor Éxito En Sus Vidas Mediante Nuestras Mentorias Internacionales, Las Cuales Son Acompañadas De Métodos Y Sistemas Personalizados, Coaching Individuales, Todo Short-Time con Resultados Tangibles y Concretos.</span>
							</p>
						</div>

						{/* CTAs */}
						<div className={`${ctasCls} mt-6 flex flex-wrap gap-3`}>
							{/* Solicitar información */}
							<a
								href={mailtoContacto}
								onClick={(e) => {
									e.preventDefault();
									openMailCompose(email, 'Información - Corporación Ejecutiva Internacional', '');
								}}
								className="inline-flex items-center gap-3 px-5 py-3 rounded-md font-semibold text-sm shadow-md focus:outline-none focus:ring-2"
								aria-label="Solicitar información"
								target="_blank"
								rel="noopener noreferrer"
								// botón dorado con texto azul oscuro para suficiente contraste
								style={{
									background: 'linear-gradient(90deg,#E9C96A 0%, #D4AF37 100%)',
									color: '#042f42',
								}}>
								Solicitar información
							</a>

							{/* Contactar */}
							<a
								href={mailtoContactar}
								onClick={(e) => {
									e.preventDefault();
									openMailCompose(email, 'Contacto - Corporación Ejecutiva Internacional', '');
								}}
								className="inline-flex items-center gap-2 px-5 py-3 rounded-md font-medium text-sm border focus:outline-none focus:ring-2"
								aria-label="Contactar"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									borderColor: '#D4AF37',
									color: '#D4AF37',
									background: 'transparent',
								}}>
								Contactar - Corporacion2025int@gmail.com
							</a>
						</div>

						{/* Texto pequeño / presencia */}
						<div className="mt-6 flex items-center gap-4 flex-wrap">
							<p className="text-xs" style={{ color: '#07506a' }}>
								Presencia en países:
							</p>
							<div className="flex items-center gap-2">
								{flags.map((f, i) => (
									<div key={i} className="hidden md:block">
										{/* Reemplazado por next/image para mejor LCP */}
										<div className="w-7 h-4 relative rounded-sm overflow-hidden" style={{ boxShadow: '0 2px 6px rgba(4, 32, 50, 0.08)' }}>
											<Image src={f.src} alt={f.name} fill style={{ objectFit: 'cover' }} className="rounded-sm border" />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Rejilla de banderas (sustituye la imagen derecha) */}
					<div className="w-full md:w-1/3 flex justify-center md:justify-end">
						<FlagCircularCarousel flags={flags} size={260} itemSize={88} autoRotateMs={5000} />
					</div>
				</div>
			</div>

			{/* Estilos locales: texto dorado y accesibilidad */}
			<style jsx>{`
				.gold-text {
					/* gradiente dorado para el título */
					background: linear-gradient(90deg, #f2d57a 0%, #d4af37 45%, #c89e2b 100%);
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					/* sombra sutil no negra para separación */
					text-shadow: 0 6px 20px rgba(6, 30, 45, 0.08), 0 2px 8px rgba(6, 30, 45, 0.04);
					position: relative;
					animation: goldShift 6s linear infinite;
				}

				@keyframes goldShift {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}

				/* Reduce motion for users who prefer it */
				@media (prefers-reduced-motion: reduce) {
					.gold-text {
						animation: none !important;
						background-position: 50% 50% !important;
					}
				}

				/* Responsivo: título más pequeño en móvil para mantener legibilidad */
				@media (max-width: 640px) {
					.gold-text {
						font-size: 1.6rem;
					}
				}
			`}</style>
		</header>
	);
}
