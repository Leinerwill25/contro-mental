'use client';

import React, { useEffect, useState } from 'react';
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
	const flagsCls = `${enterBase} delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`;

	const mailtoContacto = `mailto:${email}?subject=${encodeURIComponent('Información - Corporación Ejecutiva Internacional')}`;
	const mailtoContactar = `mailto:${email}?subject=${encodeURIComponent('Contacto - Corporación Ejecutiva Internacional')}`;

	return (
		<header id="hero" className="w-full bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100" aria-label="Hero Corporativo - Corporación Ejecutiva Internacional">
			<div className="relative overflow-hidden">
				<div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 flex flex-col-reverse md:flex-row items-center gap-10">
					{/* Texto principal */}
					<div className="w-full md:w-2/3">
						<div className={titleCls}>
							{/* Título con efecto de luces aplicado directamente al texto */}
							<h1 className="light-text text-3xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight drop-shadow-sm">Corporación Ejecutiva Internacional</h1>
						</div>

						<div className={subtitleCls}>
							<p className="mt-4 text-sm md:text-base text-slate-300 max-w-prose">
								<strong className="text-amber-300">Gente Emprendedora — Empresarial</strong> · <span className="italic">Somos una empresa de conocimientos</span>.
							</p>

							<p className="mt-4 text-sm md:text-lg text-rose-50 leading-relaxed max-w-2xl">
								<span className="font-normal">Somos Una Empresa Que Ofrece A Su Público Conocimientos Que Brindan A Su Clientela La Oportunidad De Tener Mayor Éxito En Sus Vidas Mediante Nuestras Mentorias Internacionales, Las Cuales Son Acompañadas De Métodos Y Sistemas Personalizados, Coaching Individuales, Todo Short-Time con Resultados Tangibles y Concretos.</span>
							</p>
						</div>

						{/* CTAs */}
						<div className={`${ctasCls} mt-6 flex flex-wrap gap-3`}>
							<a href={mailtoContacto} className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-amber-400 text-slate-900 font-semibold text-sm shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-amber-400" aria-label="Solicitar información">
								Solicitar información
							</a>

							<a href={mailtoContactar} className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-transparent border border-amber-500 text-amber-300 font-medium text-sm hover:bg-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-300" aria-label="Contactar">
								Contactar - Corporacion2025int@gmail.com
							</a>
						</div>

						{/* Texto pequeño / presencia */}
						<div className="mt-6 flex items-center gap-4 flex-wrap">
							<p className="text-xs text-slate-400">Presencia en países:</p>
							<div className="flex items-center gap-2">
								{flags.map((f, i) => (
									<div key={i} className="hidden md:block">
										<img src={f.src} alt={f.name} className="w-7 h-4 object-cover rounded-sm border border-slate-700 shadow-sm" />
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

			{/* Estilos locales que aplican el efecto de luces directamente al texto. */}
			<style jsx>{`
				.light-text {
					/* Gradiente principal que se mueve */
					background: linear-gradient(90deg, rgba(255, 235, 205, 1) 0%, rgba(255, 196, 0, 1) 25%, rgba(255, 140, 0, 1) 50%, rgba(255, 196, 0, 1) 75%, rgba(255, 235, 205, 1) 100%);
					background-size: 200% 100%;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent; /* importante para mostrar el gradiente */
					text-shadow: 0 8px 24px rgba(255, 160, 60, 0.06), 0 2px 8px rgba(255, 120, 40, 0.08);
					position: relative;
					/* animación suave que desplaza el gradiente */
					animation: gradientShift 5s linear infinite;
				}

				/* Pseudo-elemento que crea el 'paso de luz' sobre las letras (shimmer) */
				.light-text::after {
					content: '';
					position: absolute;
					top: 0;
					left: -40%;
					width: 40%;
					height: 100%;
					background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0) 100%);
					transform: skewX(-18deg);
					filter: blur(6px);
					opacity: 0.95;
					mix-blend-mode: screen;
					pointer-events: none;
					animation: shimmer 2.2s ease-in-out infinite;
				}

				@keyframes gradientShift {
					0% {
						background-position: 0% 50%;
					}
					100% {
						background-position: 200% 50%;
					}
				}

				@keyframes shimmer {
					0% {
						left: -40%;
						opacity: 0;
					}
					10% {
						opacity: 0.9;
					}
					50% {
						left: 120%;
						opacity: 0.9;
					}
					100% {
						left: 120%;
						opacity: 0;
					}
				}

				/* Suaviza/Desactiva animaciones si el usuario prefiere menos movimiento */
				@media (prefers-reduced-motion: reduce) {
					.light-text,
					.light-text::after {
						animation: none !important;
						background-position: 50% 50% !important;
					}
				}

				/* Ajustes responsivos */
				@media (max-width: 640px) {
					.light-text {
						font-size: 1.6rem; /* ajusta si lo necesitas */
					}
				}
			`}</style>
		</header>
	);
}
