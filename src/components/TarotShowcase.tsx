// components/TarotShowcase.tsx
'use client';

import React from 'react';
import Image from 'next/image';

type TarotShowcaseProps = {
	/** Minimal content props — sensible defaults provided below */
	title?: string;
	subtitle?: string;
	lead?: string;
	videoSrc?: string; // path to mp4
	posterSrc?: string; // poster image for video
	imageSrc?: string; // supporting image (artwork)
	priceLabel?: string;
	contactEmail?: string;
};

export default function TarotShowcase({ title = 'CONSULTAS TAROT ALPHA', subtitle = 'Visualización escrita de 9 Meses — Si deseas Ver y tener mejores decisiones, esta es tu oportunidad', lead = 'Presentación especial: extracto en video y material complementario.', videoSrc = '/TAROT Y ALPHA (1) (2).mp4', posterSrc = '/mnt/data/805f8fd4-309e-4172-8ba6-01ee663a3219.png', imageSrc = '/foto para  el  TAROT.png', priceLabel = 'Precio súper económico por promoción', contactEmail = 'alphadeseos@gmail.com' }: TarotShowcaseProps) {
	return (
		<section className="w-full max-w-6xl mx-auto px-6 py-12">
			{/* Card container */}
			<div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
				{/* Header */}
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 md:p-8 bg-gradient-to-r from-sky-50 to-white">
					<div>
						<h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-sky-900 tracking-tight">{title}</h1>
						<p className="mt-1 text-sm md:text-base text-slate-600 max-w-xl">{subtitle}</p>
					</div>

					<div className="ml-auto text-right">
						<div className="inline-flex items-center gap-3">
							<span className="px-3 py-2 rounded-md bg-sky-50 text-sky-800 text-sm font-semibold border border-sky-100 shadow-sm">{priceLabel}</span>
						</div>

						<p className="mt-2 text-sm text-slate-700">
							<span className="font-medium">Informes sin compromiso:</span>{' '}
							<a className="text-sky-700 hover:underline" href={`mailto:${contactEmail}`}>
								{contactEmail}
							</a>
						</p>
					</div>
				</div>

				{/* Content grid: Video + Image/Notes */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8">
					{/* Left: Video (wider) */}
					<div className="lg:col-span-7 flex flex-col gap-4">
						<div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-black">
							{/* video element */}
							<video src={videoSrc} poster={posterSrc} controls preload="metadata" className="w-full h-[320px] md:h-[420px] lg:h-[520px] object-cover bg-black" aria-label="Video presentación Tarot Alpha">
								Your browser does not support the <code>video</code> element.
							</video>

							{/* subtle play overlay in center (visual only) */}
							<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
								<div className="hidden md:flex items-center justify-center bg-white/6 backdrop-blur-sm rounded-full w-20 h-20">
									<svg className="w-8 h-8 text-white/90" viewBox="0 0 24 24" fill="none" aria-hidden>
										<path d="M8 5v14l11-7L8 5z" fill="currentColor" />
									</svg>
								</div>
							</div>
						</div>

						{/* small file box / reel indicator (matches the screenshot intent) */}
						<div className="flex items-center gap-4">
							<div className="flex-1">
								<div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 shadow-sm">
									<div className="flex items-center gap-3">
										<svg className="w-5 h-5 text-sky-600" viewBox="0 0 24 24" fill="none" aria-hidden>
											<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<div className="truncate">TAROT Y ALPHA (1).mp4 — 2:00</div>
									</div>
								</div>
							</div>

							<div className="flex-shrink-0 text-right">
								<a href={videoSrc} download className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-sky-600 text-white text-sm font-semibold shadow hover:bg-sky-700 transition">
									Descargar
								</a>
							</div>
						</div>
					</div>

					{/* Right: Image, description, CTA */}
					<aside className="lg:col-span-5 flex flex-col gap-4">
						<div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">
							<div className="relative w-full h-48 md:h-64">
								<Image src={imageSrc} alt="Imagen de presentación Tarot" fill className="object-cover" />
							</div>

							<div className="p-4 md:p-6">
								<p className="text-sm text-slate-700">{lead}</p>

								<div className="mt-4">
									<h4 className="text-sm font-semibold text-sky-900">Presentación</h4>
									<p className="mt-2 text-sm text-slate-600">Seducción Subliminal Es Un Curso/Mentoría Que A Través De Estudio Psíquico De La Mente Humana De Tu Posible Pareja Puedes Lograr Una Chispa De Amor La Cual La Puedes Convertir En Una Llama Incendiaría De Puro Amor, Por Supuesto Actuando Con Ética Y Honestidad, Te enseña A Llegar Al Nucleo Mental De Ella y Como Aprender Seducción Subliminal No Es Un Método De Actitudes Falsas ó Postizas Para Enamorar, No Te Enseñará A Manipular A Nadie. Te Enseñará Conductas Y Actitudes Psicofisicas Que Te Convertirán En Persona Única Y Diferente Al Común, Seas Dama O Caballero.</p>
								</div>

								<div className="mt-4 flex items-center justify-between gap-4">
									<div className="flex items-center gap-3">
										<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 text-sky-700 font-semibold">α</span>
										<div>
											<div className="text-sm font-semibold text-slate-900">Tarot Alpha</div>
											<div className="text-xs text-slate-500">Visualización escrita • 9 meses</div>
										</div>
									</div>

									<div className="text-right">
										<div className="text-sm font-semibold text-sky-800">{priceLabel}</div>
										<a className="mt-1 block text-xs text-sky-600 hover:underline" href={`mailto:${contactEmail}`}>
											{contactEmail}
										</a>
									</div>
								</div>

								<div className="mt-6 flex flex-col sm:flex-row gap-3">
									<a href={`mailto:${contactEmail}?subject=Interés%20Consulta%20Tarot%20Alpha`} className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-sky-700 to-indigo-600 text-white font-semibold shadow hover:scale-[1.02] transition">
										Solicitar información
									</a>
									<a href="#agenda" className="inline-flex items-center justify-center px-4 py-3 rounded-lg border border-slate-200 text-slate-800 bg-white hover:bg-slate-50 transition">
										Agendar reunión
									</a>
								</div>

								<div className="mt-4 text-xs text-slate-500">
									<strong>Nota:</strong> Información sujeta a disponibilidad. Ofrecemos opciones de vista previa y material complementario.
								</div>
							</div>
						</div>

						{/* small footer / branding */}
						<div className="text-center text-xs text-slate-500">© {new Date().getFullYear()} Tarot Alpha — Presentación profesional y segura.</div>
					</aside>
				</div>
			</div>
		</section>
	);
}
