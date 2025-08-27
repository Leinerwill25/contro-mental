'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

type TeamMember = {
	name: string;
	role: string;
	image: string;
	description: string;
};

const defaultTeam: TeamMember[] = [
	{ name: 'Jaime Bertoli Castagneto', role: 'Presidencia', image: '/pexels-cottonbro-4865536.jpg', description: 'Liderazgo visionario, con amplia experiencia en dirección estratégica.' },
	{ name: 'Dr. Jesus', role: 'Gerencia', image: '/Jesus.png', description: 'Comprometido con la excelencia y el crecimiento sostenible.' },
	{ name: 'Dr. Tullio', role: 'Gerencia', image: '/Tullio.jpg', description: 'Experto en gestión operativa y planeación empresarial.' },
	{ name: 'Erica', role: 'Directora de Control', image: '/Erica.png', description: 'Supervisa procesos y asegura el cumplimiento organizacional.' },
	{ name: 'Lourdes', role: 'Directora de Internet', image: '/Lourdes.jpg', description: 'Encargada de innovación tecnológica y transformación digital.' },
	{ name: 'Luishaidy Gil', role: 'Directora', image: '/1077063.png', description: 'Diseña estrategias de comunicación efectivas y modernas.' },
	{ name: 'Dereck Ruiz', role: 'Director Desarrollo Web', image: '/pexels-djordje-petrovic-590080-2102416.jpg', description: 'Desarrollador web enfocado en la sostenibilidad y el control.' },
	{ name: 'Veronica Salazar', role: 'Gerencia', image: '/1077063.png', description: 'Impulsa el desarrollo del talento humano con visión global.' },
];

const containerVariants: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 18, scale: 0.98 },
	visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 160, damping: 20 } },
};

export default function QuienesSomos({ team = defaultTeam }: { team?: TeamMember[] }) {
	return (
		<section id="quienes-somos" className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100">
			<div className="max-w-7xl mx-auto px-6 lg:px-12">
				{/* Header */}
				<header className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#05295B]">
						<span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#073B7A] via-[#1F6FB8] to-[#F6C23E]">CORPORACIÓN EJECUTIVA INTERNACIONAL</span>
					</h2>
					{/* Texto principal */}
					<p className="mt-4 text-md md:text-lg text-slate-600 max-w-3xl mx-auto">Nuestro Equipo Ejecutivo: Experiencia y Juventud Brindando Éxitos En Más De 12 Países</p>

					{/* Texto con nombres resaltados */}
					<p className="mt-3 text-sm md:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
						Justo es nombrar a&nbsp;
						<span title="Veronica Salazar" className="inline-block px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold tracking-wide uppercase text-xs md:text-sm transform transition-transform duration-150 hover:scale-105">
							Veronica Salazar
						</span>
						&nbsp;— integra y eficiente, venezolana gerenciando maravillosamente. &nbsp;
						<span title="Dereck Leinerwill Ruiz" className="inline-block px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold tracking-wide uppercase text-xs md:text-sm transform transition-transform duration-150 hover:scale-105">
							Dereck Leinerwill Ruiz
						</span>
						&nbsp;— desarrollador web y genio en el mundo del internet. &nbsp;
						<span title="Luishaidy Gil" className="inline-block px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold tracking-wide uppercase text-xs md:text-sm transform transition-transform duration-150 hover:scale-105">
							Luishaidy Gil
						</span>
						&nbsp;— excelencia y juventud como directora. Ahora ellos no están más; Dios mediante esperamos tener la suerte de volver pronto a tenerlos en nuestra familia empresarial.
					</p>
					<div className="mt-6 flex items-center justify-center gap-3">
						<span className="inline-block w-32 h-1 rounded-full bg-gradient-to-r from-[#073B7A] via-[#1F6FB8] to-[#F6C23E] shadow-sm" />
					</div>
				</header>

				{/* Decorative SVG (subtle) */}
				<div aria-hidden className="pointer-events-none absolute -top-8 -right-16 opacity-10 hidden lg:block">
					<svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="130" cy="130" r="130" fill="url(#g)" />
						<defs>
							<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
								<stop offset="0" stopColor="#073B7A" stopOpacity="0.18" />
								<stop offset="1" stopColor="#F6C23E" stopOpacity="0.08" />
							</linearGradient>
						</defs>
					</svg>
				</div>

				{/* Grid */}
				<motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
					{team.map((member, idx) => (
						<motion.article key={member.name} variants={cardVariants} className="relative rounded-3xl bg-white/80 backdrop-blur-[2px] border border-slate-100 shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-3" aria-label={`${member.name} — ${member.role}`}>
							{/* Accent shape */}
							<div className="absolute -left-8 -top-8 w-28 h-28 rotate-45 rounded-xl bg-gradient-to-br from-[#073B7A] to-[#1F6FB8] opacity-10 pointer-events-none" />

							{/* Card inner */}
							<div className="p-6 md:p-7 flex flex-col items-center text-center gap-4">
								{/* Avatar with layered rings */}
								<div className="relative flex items-center justify-center w-36 h-36 -mt-8">
									<div className="absolute inset-0 rounded-full scale-105 blur-[10px] opacity-30 bg-gradient-to-tr from-[#F6C23E] to-[#F3D07A]" />
									<div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-white shadow-md">
										<Image src={member.image} alt={member.name} fill className="object-cover" />
									</div>
									<span className="absolute -bottom-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-sm border border-slate-100">Miembro</span>
								</div>

								<div className="mt-2">
									<h3 className="text-lg md:text-xl font-semibold text-[#05295B]">{member.name}</h3>
									<div className="mt-1 inline-flex items-center gap-2">
										<span className="inline-block px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider rounded-md bg-gradient-to-r from-[#073B7A] to-[#1F6FB8] text-white shadow-sm">{member.role}</span>
									</div>
								</div>

								<p className="mt-3 text-sm text-slate-600 leading-relaxed min-h-[3.4rem]">{member.description}</p>

								{/* subtle footer */}
								<div className="mt-4 w-full flex items-center justify-center">
									<div className="h-px w-3/4 bg-slate-100" />
								</div>

								<div className="mt-3 text-xs text-slate-500">Comité Ejecutivo</div>
							</div>

							{/* Bottom color stripe */}
							<div className="h-1 bg-gradient-to-r from-[#073B7A] via-[#1F6FB8] to-[#F6C23E]" aria-hidden />
						</motion.article>
					))}
				</motion.div>

				{/* CTA */}
				<div className="mt-10 text-center">
					<p className="text-sm text-slate-600">
						¿Interesado en conocer más sobre nuestra gobernanza corporativa?{' '}
						<a href="#contacto" className="font-semibold text-[#073B7A] underline-offset-2 hover:underline">
							Contáctanos
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
