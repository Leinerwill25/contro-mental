'use client';

import Image from 'next/image';
import React from 'react';

type TeamMember = {
	name: string;
	role: string;
	image: string;
	description?: string;
	linkedin?: string;
	email?: string;
};

const defaultTeam: TeamMember[] = [
	{
		name: 'Jaime',
		role: 'Presidencia',
		image: '/pexels-olly-874158.jpg',
		description: 'Encargado de liderar estrategias corporativas y toma de decisiones clave.',
	},
	{
		name: 'Dr. Jesus',
		role: 'Gerencia',
		image: '/Jesus.png',
		description: 'Especialista en desarrollo de estrategias empresariales y dirección de proyectos.',
	},
	{
		name: 'Dr. Tullio',
		role: 'Gerencia',
		image: '/Tullio.jpg',
		description: 'Con visión estratégica para el crecimiento sostenible y expansión internacional.',
	},
	{
		name: 'Erica',
		role: 'Directora de Control',
		image: '/Erica.png',
		description: 'Coordina procesos internos y asegura eficiencia en cada área de la empresa.',
	},
	{
		name: 'Lourdes',
		role: 'Directora de Internet',
		image: '/Lourdes.jpg',
		description: 'Especialista en innovación digital y estrategias de transformación tecnológica.',
	},
	{
		name: 'María',
		role: 'Directora de Comunicación y Marketing',
		image: '/pexels-olly-774909.jpg',
		description: 'Brinda soluciones de comunicación estratégica para fortalecer la marca.',
	},
];

function RoleBadge({ role }: { role: string }) {
	return <span className="inline-block bg-gradient-to-r from-indigo-600 to-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wide">{role}</span>;
}

function TeamCard({ member }: { member: TeamMember }) {
	return (
		<article className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300" aria-label={`${member.name} — ${member.role}`}>
			<div className="flex flex-col items-center text-center gap-4">
				<div className="relative w-36 h-36 rounded-xl overflow-hidden ring-1 ring-slate-100 shadow-lg">
					<Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 640px) 140px, 144px" />
				</div>

				<div className="space-y-1">
					<h3 className="text-lg md:text-xl font-semibold text-slate-900">{member.name}</h3>
					<div className="flex items-center justify-center gap-2">
						<RoleBadge role={member.role} />
					</div>
				</div>

				{member.description && <p className="mt-3 text-sm text-slate-600 leading-relaxed">{member.description}</p>}

				<div className="mt-4 flex items-center gap-3">
					{member.linkedin && (
						<a href={member.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
								<path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.48 1 4.98 2.12 4.98 3.5z" fill="#0A66C2" />
								<path d="M.5 8.5h4v13h-4v-13zM9 8.5h3.78v1.78h.05c.53-1 1.82-2.06 3.74-2.06 4 0 4.74 2.63 4.74 6.05V21.5h-4V15c0-1.54-.03-3.51-2.14-3.51-2.14 0-2.47 1.67-2.47 3.4V21.5H9v-13z" fill="#0A66C2" />
							</svg>
						</a>
					)}

					{member.email && (
						<a href={`mailto:${member.email}`} className="text-sm text-slate-600 hover:text-slate-900 underline">
							Contacto
						</a>
					)}
				</div>
			</div>
		</article>
	);
}

export default function QuienesSomos({ team = defaultTeam }: { team?: TeamMember[] }) {
	return (
		<section id="quienes-somos" className="py-20 bg-gradient-to-b from-gray-50 to-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-12">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">Corporación Ejecutiva Internacional</h2>
					<p className="mt-3 text-md md:text-lg text-slate-600 max-w-3xl mx-auto">Gente Emprendedora Empresarial — Mentorías y soluciones estratégicas para crecimiento internacional.</p>

					<div className="mt-6 flex items-center justify-center gap-3">
						<span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-sky-400 shadow-sm" />
					</div>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{team.map((member, i) => (
						<TeamCard key={i} member={member} />
					))}
				</div>

				{/* CTA / nota corporativa */}
				<div className="mt-12 text-center">
					<p className="text-sm text-slate-500">
						¿Quieres conocer más sobre nuestro equipo o agendar una reunión estratégica?{' '}
						<a href="#contacto" className="font-semibold text-indigo-600 hover:underline">
							Contáctanos
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
