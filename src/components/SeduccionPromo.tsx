// SeduccionPromoFinal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SeduccionPromoFinalProps {
	title?: string;
	subtitle?: string;
	bullets?: string[];
	email?: string;
	/** ruta a imagen de fondo (public/) - opcional */
	bgImageUrl?: string | null;
	/** imagen lateral (pareja) - opcional, ruta pública */
	sideImageUrl?: string | null;
	darkness?: number;
}

export default function SeduccionPromoFinal({ title = 'I.- Como Tener Éxito en el Amor', subtitle = 'II.- Como Aprender — Seducción Subliminal', bullets = ['Si eres persona CANSADA de la SOLEDAD', 'Si deseas volver a Creer en EL AMOR', 'Si tienes Fracasos Continuos en Romances', 'Si deseas ser una Persona Experta en CONQUISTAR', 'Si quieres Un Verdadero AMOR de por VIDA'], email = 'alphadeseos@gmail.com', bgImageUrl = null, sideImageUrl = '/pexels-jmendezrf-1066801.jpg', darkness = 0.64 }: SeduccionPromoFinalProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const raf = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(raf);
	}, []);

	const mailto = `mailto:${email}`;
	const overlayColor = `rgba(2,20,55, ${darkness})`;

	const sectionStyle: React.CSSProperties = bgImageUrl
		? {
				background: `linear-gradient(${overlayColor}, ${overlayColor}), url(${bgImageUrl}) center/cover no-repeat`,
		  }
		: {
				background: 'linear-gradient(180deg, #99d0f3 0%, #9fd7ff 25%, #bfe7ff 50%, #d9f2ff 100%)',
		  };

	// gradient text helpers
	const bigTitleGradient = {
		background: 'linear-gradient(90deg, #0b4efc 0%, #ff3b8a 50%, #ffccdd 100%)',
		WebkitBackgroundClip: 'text' as const,
		backgroundClip: 'text' as const,
		color: 'transparent',
		WebkitTextFillColor: 'transparent' as const,
		textShadow: '0 6px 30px rgba(2,6,23,0.12)',
	};

	const highlightGradient = {
		background: 'linear-gradient(90deg, #ff9ac4 0%, #ff74a1 60%)',
		WebkitBackgroundClip: 'text' as const,
		backgroundClip: 'text' as const,
		color: 'transparent',
		WebkitTextFillColor: 'transparent' as const,
	};

	return (
		<section aria-labelledby="promo-title" className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl my-8" style={sectionStyle}>
			{/* translucent inner container to improve legibility */}
			<div className={`p-4 md:p-6 lg:p-8 transition-transform duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
				<div className="rounded-lg backdrop-blur-sm bg-white/20 border border-white/30 p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-start">
					{/* left content */}
					<div className="flex-1 min-w-0">
						{/* top header: title and small icon */}
						<div className="flex items-start gap-4">
							{/* small heart icon like the original design */}
							<div className="flex-shrink-0 mt-1">
								<div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-300 flex items-center justify-center shadow-md ring-1 ring-white/30">
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
										<path d="M12 21s-6-3.8-9-6.5C0.5 11 3 7 6.5 7c1.7 0 2.8 1.2 5.5 3.9 2.7-2.7 3.8-3.9 5.5-3.9C21 7 23.5 11 21 14.5 18 17.2 12 21 12 21z" fill="#ffffff" opacity="0.9" />
									</svg>
								</div>
							</div>

							<div className="min-w-0">
								{/* Title: very large, italic, serif, gradient */}
								<h1 id="promo-title" className="font-serif italic leading-tight text-3xl md:text-4xl lg:text-5xl tracking-tight" style={bigTitleGradient}>
									{title}
								</h1>

								{/* Subtitle: bigger, pink gradient script-like */}
								<h2 className="mt-1 text-2xl md:text-3xl lg:text-4xl font-semibold italic" style={highlightGradient}>
									{subtitle}
								</h2>
							</div>
						</div>

						{/* Decorative sample image (small) - optional */}
						<div className="mt-4">
							<p className="text-sm md:text-base text-blue-900/95 font-medium">
								Programa Curso Short Time — On Line grabado y Personalizado • <span className="font-bold">19 días</span> • <span className="italic">21 Minutos</span>
							</p>
						</div>

						{/* bullets list styled like the poster (asterisk + emphasis) */}
						<div className="mt-6">
							<ul className="space-y-3">
								{bullets.map((b, i) => (
									<li key={i} className="flex items-start gap-4">
										{/* large asterisk bullet */}
										<div className="text-2xl md:text-3xl font-extrabold text-rose-600 leading-none mt-0.5 select-none">*</div>

										<div>
											{/* try to mimic the original emphasis: keep capitalization and bold words */}
											<p className="text-sm md:text-base lg:text-lg leading-snug text-slate-900" dangerouslySetInnerHTML={{ __html: b.replace(/\b([A-Z]{2,})\b/g, '<span class="font-bold">$1</span>') }} />
										</div>
									</li>
								))}
							</ul>
						</div>

						{/* short descriptive paragraph */}
						<div className="mt-6 text-sm md:text-base text-slate-800">
							<p>Este Programa Curso Short Time es para TI — Online grabado y Personalizado. Ideal para personas que desean reconectar con su potencial afectivo, aprender técnicas éticas de atracción y mejorar sus resultados románticos.</p>
						</div>
					</div>

					{/* right column: image + CTA area */}
					<aside className="w-full md:w-80 lg:w-96 flex flex-col gap-4">
						{/* side image similar to the reference (si se proporciona) */}
						<div className="rounded-lg overflow-hidden bg-white/10 border border-white/20 shadow-lg">
							{sideImageUrl ? (
								// next/image si deseas optimización; si no, puedes usar <img>
								<Image src={sideImageUrl} alt="Imagen promocional" width={520} height={360} className="object-cover w-full h-48 md:h-56" priority />
							) : (
								<div className="w-full h-48 md:h-56 bg-gradient-to-br from-pink-200/30 to-rose-200/20 flex items-center justify-center">
									<span className="text-sm md:text-base text-rose-700">Imagen promocional</span>
								</div>
							)}
						</div>

						{/* info card */}
						<div className="rounded-lg p-4 bg-rose-50/30 border border-rose-200/30">
							<div className="flex items-start gap-3">
								<div className="w-12 h-12 rounded-md flex items-center justify-center bg-rose-200/60 border border-rose-300/40">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
										<path d="M12 21s-6-3.8-9-6.5C0.5 11 3 7 6.5 7c1.7 0 2.8 1.2 5.5 3.9 2.7-2.7 3.8-3.9 5.5-3.9C21 7 23.5 11 21 14.5 18 17.2 12 21 12 21z" fill="#FF97B6" opacity="0.95" />
									</svg>
								</div>

								<div className="flex-1">
									<p className="text-sm md:text-base font-semibold text-slate-900">Informes sin Compromiso</p>
									<p className="text-xs md:text-sm text-slate-700 mt-1">On Line • Grabado y Personalizado • 19 días</p>
								</div>
							</div>

							{/* email CTA styled like poster (pink box) */}
							<div className="mt-4">
								<a href={mailto} className="block text-center px-3 py-2 rounded-md bg-gradient-to-r from-rose-200 to-pink-300 text-white font-bold shadow-md hover:scale-[1.02] transition-transform" aria-label={`Enviar correo a ${email}`}>
									{email}
								</a>
							</div>

							<div className="mt-3 text-xs text-slate-600 text-center">
								<p>Informes sin Compromiso • Garantizado</p>
							</div>
						</div>
					</aside>
				</div>

				{/* footer strip like the poster bottom */}
				<div className="mt-4 text-center">
					<p className="text-xs md:text-sm text-slate-700 italic">Informes sin compromiso • alphadeseos@gmail.com</p>
				</div>
			</div>
		</section>
	);
}
