// SeduccionPromoFinal.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface SeduccionPromoFinalProps {
	title?: string;
	subtitle?: string;
	bullets?: string[];
	email?: string;
	/** URL de imagen opcional para fondo; si se omite se usa degradado azul */
	bgImageUrl?: string | null;
	/** 0..1 intensidad del overlay oscuro sobre la imagen (cuando bgImageUrl está presente) */
	darkness?: number;
}

export default function SeduccionPromoFinal({ title = 'Cómo Tener Éxito en el Amor', subtitle = 'Cómo Aprender — Seducción Subliminal', bullets = ['Si eres persona cansada de la soledad', 'Si deseas volver a creer en el amor', 'Si tienes fracasos continuos en romances', 'Si deseas ser una persona experta en conquistar', 'Si quieres un verdadero amor de por vida'], email = 'alphadeseos@gmail.com', bgImageUrl = null, darkness = 0.72 }: SeduccionPromoFinalProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const raf = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(raf);
	}, []);

	const mailto = `mailto:${email}`;
	const overlayColor = `rgba(2,20,55, ${darkness})`; // tono azul oscuro semi-opaco

	// si hay imagen, aplicamos overlay sobre la imagen; si no, usamos degradado azul por defecto
	const sectionStyle: React.CSSProperties = bgImageUrl ? { background: `linear-gradient(${overlayColor}, ${overlayColor}), url(${bgImageUrl}) center/cover no-repeat` } : { background: 'linear-gradient(135deg, #02102a 0%, #06243f 50%, #083055 100%)' };

	return (
		<section aria-labelledby="promo-title" className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl" style={sectionStyle}>
			<div className={`p-6 md:p-8 lg:p-10 transition-transform duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
				{/* panel interior con ligero glass / contraste */}
				<div className="rounded-xl backdrop-blur-sm bg-blue-900/20 border border-blue-800/20 shadow-inner p-5 md:p-8">
					{/* HEADER */}
					<header className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
						<div className="md:max-w-2xl">
							<h1
								id="promo-title"
								className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight"
								style={{
									background: 'linear-gradient(90deg,#ffd6e0 0%, #ff9ac4 60%)',
									WebkitBackgroundClip: 'text',
									backgroundClip: 'text',
									color: 'transparent',
								}}>
								{title}
							</h1>

							<h2 className="mt-2 text-xl md:text-2xl font-medium italic text-rose-100/90">{subtitle}</h2>

							<p className="mt-4 text-sky-100/90 text-sm md:text-base leading-relaxed">Programa breve, práctico y personalizado — diseñado para reconectar con tus capacidades de atracción y construir relaciones duraderas.</p>
						</div>

						<div className="flex-shrink-0">
							<div className="rounded-lg px-4 py-3 bg-blue-800/30 border border-blue-700/40 text-right">
								<p className="text-sky-100 font-semibold text-sm md:text-base">Curso Short Time</p>
								<p className="text-sky-200 text-xs md:text-sm mt-1">Online • 19 días • Grabado y personalizado</p>
							</div>
						</div>
					</header>

					{/* DIVISOR */}
					<div className="my-6 h-px bg-gradient-to-r from-transparent via-blue-700/30 to-transparent" />

					{/* MAIN */}
					<main className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
						{/* CONTENIDO PRINCIPAL (2/3) */}
						<div className="md:col-span-2 bg-blue-900/08 border border-blue-800/16 rounded-lg p-5 md:p-6">
							<h3 className="text-sky-100 font-semibold text-lg md:text-xl">¿Para quién es este programa?</h3>

							<ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sky-100 text-sm md:text-base">
								{bullets.map((b, i) => (
									<li key={i} className="flex gap-3 items-start leading-tight bg-blue-800/5 p-3 rounded-md border border-blue-800/8">
										<span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-sm font-semibold shadow-sm">{i + 1}</span>
										<span className="text-sky-100/95">{b}</span>
									</li>
								))}
							</ul>

							<div className="mt-6 text-sky-100/85 text-sm md:text-base">
								<p>Si buscas reconectar con el amor y transformar tus resultados románticos mediante técnicas prácticas, éticas y personalizadas, este curso ofrece un camino claro con seguimiento y herramientas aplicables.</p>
							</div>

							<div className="mt-6 flex flex-wrap items-center gap-3">
								<span className="text-sky-200 text-xs md:text-sm italic">Todo uso sujeto a reglamento en la página web.</span>
								<span className="mx-2 text-sky-500">•</span>
								<span className="text-sky-200 text-xs md:text-sm">Garantizado • 19 días</span>
							</div>
						</div>

						{/* TARJETA CTA (1/3) */}
						<aside className="flex flex-col gap-4 p-5 rounded-lg bg-gradient-to-b from-blue-800/12 to-blue-900/08 border border-blue-800/16">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-md flex items-center justify-center bg-rose-200/6 border border-rose-300/10">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
										<path d="M12 21s-6-3.8-9-6.5C0.5 11 3 7 6.5 7c1.7 0 2.8 1.2 5.5 3.9 2.7-2.7 3.8-3.9 5.5-3.9C21 7 23.5 11 21 14.5 18 17.2 12 21 12 21z" fill="#FF97B6" opacity="0.95" />
									</svg>
								</div>

								<div>
									<p className="text-sky-100 font-semibold text-sm md:text-base">Informes sin compromiso</p>
									<p className="text-sky-200 text-xs md:text-sm">Respuesta personalizada</p>
								</div>
							</div>

							<div>
								<a href={mailto} className="block w-full text-center px-4 py-3 rounded-md bg-gradient-to-r from-rose-400 to-pink-500 text-slate-900 font-semibold shadow-lg transform hover:-translate-y-0.5 transition" aria-label={`Enviar correo a ${email}`}>
									{email}
								</a>
							</div>

							<div className="mt-auto pt-2 text-center text-sky-200/80 text-xs">
								<p>Contacto directo • Modalidad Online • Cupos limitados</p>
							</div>
						</aside>
					</main>
				</div>
			</div>
		</section>
	);
}
