'use client';

import React, { useEffect, useState } from 'react';

interface TarjetaTuristicaProps {
	ticketImage?: string;
	flags?: { src: string; name: string }[]; // si quieres pasar banderas desde props
	email?: string;
}

export default function TarjetaTuristica({ ticketImage = '/C.png', email = 'Corporacion2025int@gmail.com', flags: propsFlags }: TarjetaTuristicaProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const rafId = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(rafId);
	}, []);

	const enterBase = 'transition-all duration-500 ease-out';
	const headingCls = `${enterBase} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`;
	const paraCls = `${enterBase} delay-150 ${mounted ? 'opacity-100' : 'opacity-0'}`;
	const cardCls = `${enterBase} delay-100 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
	const bannerCls = `${enterBase} delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`;

	const defaultFlags = [
		{ src: '/descarga (1).png', name: 'Venezuela' },
		{ src: '/descarga.png', name: 'España' },
		{ src: '/descarga (2).png', name: 'Estados Unidos' },
		{ src: '/descarga (4).png', name: 'Perú' },
		{ src: '/descarga (3).png', name: 'Colombia' },
	];

	const displayFlags = propsFlags && propsFlags.length ? propsFlags : defaultFlags;

	const mailtoMoreInfo = `mailto:${email}?subject=${encodeURIComponent('Información - Tarjeta Turística Internacional')}&body=${encodeURIComponent('Hola,\n\nQuisiera recibir más información sobre la Tarjeta Turística Internacional. Por favor, indíquenme los requisitos y beneficios.\n\nGracias.')}`;

	const mailtoAffiliate = `mailto:${email}?subject=${encodeURIComponent('Afiliación - Tarjeta Turística Internacional')}&body=${encodeURIComponent('Hola,\n\nEstoy interesado en afiliar mi negocio / registrarme como beneficiario. Por favor, envíenme los pasos a seguir y condiciones.\n\nSaludos.')}`;

	return (
		<section
			id="tarjeta-turistica"
			className="w-full max-w-6xl mx-auto p-8 md:p-12 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800
                       text-lg md:text-xl" /* base más grande */
		>
			{/* Encabezado principal con estilo corporativo */}
			<header className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
				<div className="flex items-center gap-5">
					<div className="w-20 h-20 rounded-lg bg-gradient-to-br from-yellow-400 via-amber-400 to-red-500 flex items-center justify-center shadow-inner">
						<span className="font-extrabold text-slate-900 text-2xl">CI</span>
					</div>
					<div>
						<h2 className="text-3xl md:text-5xl font-serif text-amber-300 tracking-wide leading-tight">Corporación Ejecutiva Internacional</h2>
						<p className="text-base md:text-lg text-slate-300 mt-1">Aumento De Ventas y Clientela — Estrategias & Afiliaciones</p>
					</div>
				</div>

				<div className="text-right">
					<p className="text-base md:text-lg text-slate-300">Presencia en +12 países</p>
					<div className="mt-3 flex items-center justify-end gap-4">
						{displayFlags && displayFlags.length > 0 ? (
							displayFlags.map((f, i) => (
								<div key={i} className="group relative flex items-center" aria-hidden={false}>
									<img
										src={f.src}
										alt={f.name}
										tabIndex={0}
										role="img"
										aria-label={f.name}
										className="w-12 h-8 object-cover rounded-sm shadow-sm border border-slate-700 transform transition-transform duration-200
                     group-hover:scale-110 group-focus:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
									/>

									<span
										className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-md bg-slate-800 text-amber-300 text-sm px-3 py-1
                     opacity-0 translate-y-1 transition-all duration-200 ease-out
                     group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0"
										aria-hidden="true">
										{f.name}
									</span>
								</div>
							))
						) : (
							<div className="text-sm text-slate-500">Banderas de países (opcionales)</div>
						)}
					</div>
				</div>
			</header>

			{/* Contenido principal */}
			<main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
				<div className="md:col-span-2">
					<h3 className={`${headingCls} text-2xl md:text-4xl font-semibold text-rose-50`}>El Sistema Turístico Internacional</h3>

					<p className={`${paraCls} mt-4 text-base md:text-lg text-slate-300 leading-relaxed`}>
						Se desarrolla a través de la <span className="font-semibold text-amber-300">Tarjeta Turística Internacional</span>, la cual brinda una <strong>ATENCIÓN ESPECIAL</strong> y/o descuentos en compras y servicios por parte del público comprador en las empresas afiliadas.
					</p>

					<ul className="mt-5 space-y-3 text-slate-300 text-base md:text-lg list-disc list-inside">
						<li>Módulo de beneficios exclusivo para clientes afiliados.</li>
						<li>Descuentos aplicables en comercios y servicios asociados.</li>
						<li>Soporte y atención prioritaria en empresas afiliadas.</li>
					</ul>

					<div className="mt-5 grid grid-cols-1 gap-5">
						<div className="flex items-center gap-4 py-4 border-b border-slate-700">
							<div className="w-14 h-14 rounded-md bg-white/5 flex items-center justify-center border border-slate-700 text-2xl">🏷️</div>
							<div>
								<p className="text-base text-slate-300">Restaurantes</p>
								<p className="text-base md:text-lg font-semibold text-amber-300">1 brindis de cortesía</p>
							</div>
						</div>

						<div className="flex items-center gap-4 py-4 border-b border-slate-700">
							<div className="w-14 h-14 rounded-md bg-white/5 flex items-center justify-center border border-slate-700 text-2xl">🔒</div>
							<div>
								<p className="text-sm md:text-base text-slate-300">Todo uso sujeto a</p>
								<p className="text-base md:text-lg font-semibold text-amber-300">Reglamento en página web</p>
							</div>
						</div>

						<div className="flex items-start gap-4 py-4">
							<p className="text-sm md:text-base text-slate-400">Atención especial en empresas afiliadas — Beneficios exclusivos y descuentos en servicios.</p>
						</div>
					</div>
				</div>

				{/* Columna lateral con tarjeta / imagen y CTA */}
				<aside className="flex flex-col items-center gap-6">
					<div className={`${cardCls} w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl shadow-xl border border-amber-500/10`}>
						<div className="w-full h-56 rounded-md overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
							<img src={ticketImage} alt="Tarjeta Turistica" className="object-contain h-full" />
						</div>

						<div className="mt-4 text-center">
							<p className="text-base md:text-lg text-slate-300">Tarjeta Internacional Turística</p>
							<p className="text-base md:text-lg text-amber-300 font-semibold mt-2">Descuentos y/o Atención Especial</p>
						</div>

						<div className="mt-5 flex items-center justify-center gap-4">
							<a href={mailtoMoreInfo} className="px-6 py-3 rounded-lg bg-amber-400 text-slate-900 font-semibold text-base md:text-lg shadow hover:brightness-95 transition inline-flex items-center justify-center" aria-label="Enviar correo para más información">
								Más info
							</a>

							<a href={mailtoAffiliate} className="px-6 py-3 rounded-lg border border-amber-300 text-amber-300 font-semibold text-base md:text-lg shadow-sm hover:bg-amber-700/10 transition" aria-label="Enviar correo para afiliar">
								Afiliar
							</a>
						</div>
					</div>

					{/* Banner CTA inferior */}
					<div className={`${bannerCls} w-full max-w-md bg-amber-50 text-slate-900 p-4 rounded-md border border-amber-300 shadow-md`}>
						<p className="text-base md:text-lg font-semibold">¿Eres empresario y deseas aumentar tus ventas?</p>
						<p className="text-sm md:text-base mt-2 text-slate-700">Escríbenos sin compromiso para recibir más información:</p>
						<a href={`mailto:${email}`} className="mt-3 inline-block text-sm md:text-base font-medium underline text-amber-600">
							{email}
						</a>
					</div>
				</aside>
			</main>

			<footer className="mt-8 text-center text-sm md:text-base text-slate-500">
				<p>Todo uso sujeto a reglamento en la página web. Corporación Ejecutiva Internacional ©</p>
			</footer>
		</section>
	);
}
