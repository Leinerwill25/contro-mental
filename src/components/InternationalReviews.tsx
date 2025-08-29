// components/InternationalReviews.tsx
'use client';
import React, { useState } from 'react';

type Review = {
	id: number;
	author: string;
	title?: string;
	location?: string;
	date?: string;
	text: string;
	accent?: string; // color accent per card
};

const REVIEWS: Review[] = [
	{
		id: 1,
		author: 'ENZO — Gerente de Marketing',
		location: 'Santiago, Chile',
		date: '',
		text: 'No soy entendido en política, mas doy mi felicitación sincera y emocionada a este escritor por la valentía demostrada en decir la verdad. Jaime, no te conozco pero eres un completo analista y un gran escritor. Felicidades desde Santiago de Chile.',
		accent: 'from-red-400 to-blue-600',
	},
	{
		id: 2,
		author: 'KATHERINE Quiroga Mejía — Ejecutiva y Empresaria',
		location: 'Lima, Perú',
		date: '8 feb',
		text: 'Me ha gustado mucho el libro: a sido genial poder leerlo. Dice la verdad de manera cruda y sin “pelos en la lengua”. Creo que hemos estado dormidos demasiado y hoy América y nuestras instituciones empezarán a despertar. Felicitaciones, escritor Jaime Bértoli C.',
		accent: 'from-amber-400 to-rose-500',
	},
	{
		id: 3,
		author: 'DAYANA — Investigadora Universitaria',
		location: 'Venezuela',
		date: '28 nov 2024',
		text: 'Leer este libro es entrar en una realidad paralela que cuestiona estructuras tradicionales. Es una obra que invita a la reflexión y a despertar la conciencia. Gracias, Jaime Bértoli, por este regalo para despertar.',
		accent: 'from-sky-400 to-indigo-500',
	},
	{
		id: 4,
		author: 'DOMENICO — Dedicatario (Italia, Milán)',
		location: 'Italia - Milán',
		date: 'Mayo 2025',
		text: 'Difícil encontrar palabras para definir las verdades y claridades de este libro. Second Pearl Harbor muestra la crudeza de la realidad reciente con pruebas imposibles de refutar. Felicitaciones al valiente autor.',
		accent: 'from-green-400 to-teal-600',
	},
];

export default function InternationalReviews() {
	const [open, setOpen] = useState(false);

	return (
		<section id="opiniones-internacionales" className="w-full max-w-6xl mx-auto px-6 py-10">
			<div className="flex flex-col gap-6">
				{/* CTA Link */}
				<div className="flex items-center justify-between gap-4">
					<h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-slate-900">Opiniones internacionales</h2>

					<button onClick={() => setOpen((s) => !s)} aria-expanded={open} className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition">
						OPINIONES INTERNACIONALES
						<svg className={`w-4 h-4 transform transition ${open ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
							<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
						</svg>
					</button>
				</div>

				{/* Intro subtitle */}
				<p className="text-sm md:text-base text-slate-600 max-w-3xl">Selección de 4 reseñas internacionales destacadas sobre la obra. Testimonios reales presentados por lectores e interesados.</p>

				{/* Collapsible area */}
				<div className={`overflow-hidden transition-[max-height,opacity] duration-400 ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`} aria-hidden={!open}>
					<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
						{REVIEWS.map((r) => (
							<article key={r.id} className="relative bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden" aria-labelledby={`rev-${r.id}-title`}>
								{/* colorful left stripe + badge */}
								<div className={`absolute left-0 top-0 bottom-0 w-2 md:w-3 bg-gradient-to-b ${r.accent ?? 'from-indigo-500 to-sky-500'}`} />

								<div className="p-5 md:p-6 pl-8 md:pl-10">
									<div className="flex items-start justify-between gap-4">
										<div>
											<h3 id={`rev-${r.id}-title`} className="text-sm md:text-base font-bold text-slate-900">
												{r.author}
											</h3>
											<p className="text-xs md:text-sm text-slate-500 mt-1">
												{r.location} {r.date ? `• ${r.date}` : ''}
											</p>
										</div>

										{/* cuadro amarillo: Razones obvias */}
										<div className="flex-shrink-0">
											<div className="inline-block bg-yellow-300 text-yellow-900 text-xs md:text-sm font-semibold px-3 py-2 rounded shadow-sm border border-yellow-400">
												Razones obvias nos impiden dar
												<br />
												Ubicación por ahora
											</div>
										</div>
									</div>

									{/* testimonial text */}
									<p className="mt-4 text-sm md:text-[15px] text-slate-700 leading-relaxed">{r.text}</p>

									{/* small footer / decorative line */}
									<div className="mt-5 flex items-center justify-between">
										<div className="flex items-center gap-3">
											{/* decorative star icon */}
											<span className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm text-lg">★</span>
											<span className="text-xs text-slate-500">Reseña #{r.id}</span>
										</div>

										<a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-indigo-600 font-medium hover:underline">
											Leer original
										</a>
									</div>
								</div>
							</article>
						))}
					</div>

					{/* bottom call-to-action */}
					<div className="mt-6 flex items-center justify-between gap-4">
						<a href="mailto:Corporacion2025intl@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition">
							Contactar equipo
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
