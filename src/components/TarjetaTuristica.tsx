'use client';

import React, { useEffect, useState } from 'react';

interface TarjetaTuristicaProps {
	ticketImage?: string;
	flags?: string[];
	email?: string;
}

export default function TarjetaTuristica({ ticketImage = '/C.png', email = 'Corporacion2025int@gmail.com' }: TarjetaTuristicaProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// activamos la animación al montarse (safe para Next)
		const rafId = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(rafId);
	}, []);

	const enterBase = 'transition-all duration-500 ease-out';
	const headingCls = `${enterBase} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`;
	const paraCls = `${enterBase} delay-150 ${mounted ? 'opacity-100' : 'opacity-0'}`;
	const cardCls = `${enterBase} delay-100 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
	const bannerCls = `${enterBase} delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`;

	const flags = [
		{ src: '/descarga (1).png', name: 'Venezuela' },
		{ src: '/descarga.png', name: 'España' },
		{ src: '/descarga (2).png', name: 'Estados Unidos' },
		{ src: '/descarga (4).png', name: 'Perú' },
		{ src: '/descarga (3).png', name: 'Colombia' },
	];

	// mailto links pre-filled (puedes ajustar asunto / cuerpo)
	const mailtoMoreInfo = `mailto:${email}?subject=${encodeURIComponent('Información - Tarjeta Turística Internacional')}&body=${encodeURIComponent('Hola,\n\nQuisiera recibir más información sobre la Tarjeta Turística Internacional. Por favor, indíquenme los requisitos y beneficios.\n\nGracias.')}`;

	const mailtoAffiliate = `mailto:${email}?subject=${encodeURIComponent('Afiliación - Tarjeta Turística Internacional')}&body=${encodeURIComponent('Hola,\n\nEstoy interesado en afiliar mi negocio / registrarme como beneficiario. Por favor, envíenme los pasos a seguir y condiciones.\n\nSaludos.')}`;

	return (
		<section id="tarjeta-turistica" className="w-full max-w-5xl mx-auto p-6 md:p-10 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800">
			{/* Encabezado principal con estilo corporativo */}
			<header className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-400 via-amber-400 to-red-500 flex items-center justify-center shadow-inner">
						<span className="font-extrabold text-slate-900">CI</span>
					</div>
					<div>
						<h2 className="text-2xl md:text-3xl font-serif text-amber-300 tracking-wide">Corporación Ejecutiva Internacional</h2>
						<p className="text-sm text-slate-300">Aumento De Ventas y Clientela — Estrategias & Afiliaciones</p>
					</div>
				</div>

				<div className="text-right">
					<p className="text-sm md:text-base text-slate-300">Presencia en +12 países</p>
					{/* Reemplaza tu bloque actual por este */}
					<div className="mt-2 flex items-center justify-end gap-3">
						{flags && flags.length > 0 ? (
							flags.map((f, i) => (
								<div key={i} className="group relative flex items-center" aria-hidden={false}>
									{/* Imagen de la bandera (focusable para accesibilidad) */}
									<img
										src={f.src}
										alt={f.name}
										tabIndex={0}
										role="img"
										aria-label={f.name}
										className="w-8 h-5 object-cover rounded-sm shadow-sm border border-slate-700 transform transition-transform duration-200
                     group-hover:scale-110 group-focus:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
									/>

									{/* Tooltip (aparece en hover y focus) */}
									<span
										className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-md bg-slate-800 text-amber-300 text-xs px-2 py-1
                     opacity-0 translate-y-1 transition-all duration-200 ease-out
                     group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0"
										aria-hidden="true">
										{f.name}
									</span>
								</div>
							))
						) : (
							<div className="text-xs text-slate-500">Banderas de países (opcionales)</div>
						)}
					</div>
				</div>
			</header>

			{/* Contenido principal */}
			<main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
				<div className="md:col-span-2">
					<h3 className={`${headingCls} text-xl md:text-2xl font-semibold text-rose-50`}>El Sistema Turístico Internacional</h3>

					<p className={`${paraCls} mt-3 text-sm md:text-base text-slate-300 leading-relaxed`}>
						Se desarrolla a través de la <span className="font-semibold text-amber-300">Tarjeta Turística Internacional</span>, la cual brinda una <strong>ATENCIÓN ESPECIAL</strong> y/o descuentos en compras y servicios por parte del público comprador en las empresas afiliadas.
					</p>

					<ul className="mt-4 space-y-2 text-slate-300 text-sm">
						<li>• Módulo de beneficios exclusivo para clientes afiliados.</li>
						<li>• Descuentos aplicables en comercios y servicios asociados.</li>
						<li>• Soporte y atención prioritaria en empresas afiliadas.</li>
					</ul>

					{/* reemplaza: className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3" */}
					<div className="mt-3 grid grid-cols-1 gap-4">
						<div className="flex items-center gap-3 py-3 border-b border-slate-700">
							<div className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center border border-slate-700">🏷️</div>
							<div>
								<p className="text-sm text-slate-300">Restaurantes</p>
								<p className="text-sm font-semibold text-amber-300">1 brindis de cortesía</p>
							</div>
						</div>

						<div className="flex items-center gap-3 py-3 border-b border-slate-700">
							<div className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center border border-slate-700">🔒</div>
							<div>
								<p className="text-xs text-slate-300">Todo uso sujeto a</p>
								<p className="text-sm font-semibold text-amber-300">Reglamento en página web</p>
							</div>
						</div>

						<div className="flex items-center gap-3 py-3">
							<p className="text-xs text-slate-400">Atención especial en empresas afiliadas — Beneficios exclusivos y descuentos en servicios.</p>
						</div>
					</div>
				</div>

				{/* Columna lateral con tarjeta / imagen y CTA */}
				<aside className="flex flex-col items-center gap-4">
					<div className={`${cardCls} w-full max-w-xs bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl shadow-xl border border-amber-500/10`}>
						<div className="w-full h-40 rounded-md overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
							<img src={ticketImage} alt="Tarjeta Turistica" className="object-contain h-full" />
						</div>

						<div className="mt-3 text-center">
							<p className="text-sm text-slate-300">Tarjeta Internacional Turística</p>
							<p className="text-xs text-amber-300 font-semibold mt-1">Descuentos y/o Atención Especial</p>
						</div>

						<div className="mt-4 flex items-center justify-center gap-3">
							{/* Enlaces mailto para abrir el cliente de correo */}
							<a href={mailtoMoreInfo} className="px-4 py-2 rounded-md bg-amber-400 text-slate-900 font-semibold text-sm shadow hover:brightness-95 transition inline-flex items-center justify-center" aria-label="Enviar correo para más información">
								Más info
							</a>

							<a href={mailtoAffiliate} className="px-3 py-2 rounded-md border border-slate-700 text-slate-200 text-sm hover:bg-slate-800 transition inline-flex items-center justify-center" aria-label="Enviar correo para afiliarse">
								Afiliate
							</a>
						</div>
					</div>

					{/* Banner CTA inferior */}
					<div className={`${bannerCls} w-full max-w-xs bg-amber-50 text-slate-900 p-3 rounded-md border border-amber-300 shadow-md`}>
						<p className="text-sm font-semibold">¿Eres empresario y deseas aumentar tus ventas?</p>
						<p className="text-xs mt-1 text-slate-700">Escríbenos sin compromiso para recibir más información:</p>
						<a href={`mailto:${email}`} className="mt-2 inline-block text-xs font-medium underline text-amber-600">
							{email}
						</a>
					</div>
				</aside>
			</main>

			<footer className="mt-8 text-center text-xs text-slate-500">
				<p>Todo uso sujeto a reglamento en la página web. Corporación Ejecutiva Internacional ©</p>
			</footer>
		</section>
	);
}
