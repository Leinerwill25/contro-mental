// components/QuienesSomos.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, Variants, Transition } from 'framer-motion';
import { X } from 'lucide-react';

type TeamMember = {
	name: string;
	role: string;
	image: string;
	description?: string;
	linkedin?: string;
	email?: string;
	phone?: string;
};

const defaultTeam: TeamMember[] = [
	{ name: 'Jaime', role: 'Presidencia', image: '/pexels-olly-874158.jpg', description: 'Encargado de liderar estrategias corporativas y toma de decisiones clave.' },
	{ name: 'Dr. Jesus', role: 'Gerencia', image: '/Jesus.png', description: 'Especialista en desarrollo de estrategias empresariales y dirección de proyectos.' },
	{ name: 'Dr. Tullio', role: 'Gerencia', image: '/Tullio.jpg', description: 'Con visión estratégica para el crecimiento sostenible y expansión internacional.' },
	{ name: 'Erica', role: 'Directora de Control', image: '/Erica.png', description: 'Coordina procesos internos y asegura eficiencia en cada área de la empresa.' },
	{ name: 'Lourdes', role: 'Directora de Internet', image: '/Lourdes.jpg', description: 'Especialista en innovación digital y estrategias de transformación tecnológica.' },
	{ name: 'María', role: 'Directora de Comunicación y Marketing', image: '/pexels-olly-774909.jpg', description: 'Brinda soluciones de comunicación estratégica para fortalecer la marca.' },
];

/* Motion config */
const spring: Transition = { type: 'spring', stiffness: 240, damping: 24 };

const containerVariants: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 14, scale: 0.995 },
	visible: { opacity: 1, y: 0, scale: 1, transition: spring },
};

const overlayVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
	hidden: { opacity: 0, y: 20, scale: 0.98 },
	visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ...spring } },
};

/* Small inline LinkedIn icon */
const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden {...props}>
		<path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.48 1 4.98 2.12 4.98 3.5z" fill="#0A66C2" />
		<path d="M.5 8.5h4v13h-4v-13zM9 8.5h3.78v1.78h.05c.53-1 1.82-2.06 3.74-2.06 4 0 4.74 2.63 4.74 6.05V21.5h-4V15c0-1.54-.03-3.51-2.14-3.51-2.14 0-2.47 1.67-2.47 3.4V21.5H9v-13z" fill="#0A66C2" />
	</svg>
);

/* Role badge styled */
function RoleBadge({ role }: { role: string }) {
	return <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-sm">{role}</span>;
}

/* Team card component */
function TeamCard({ member, onOpen }: { member: TeamMember; onOpen: (m: TeamMember, trigger: HTMLElement | null) => void }) {
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	return (
		<motion.article variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} whileHover={{ y: -6, scale: 1.01 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="group rounded-2xl bg-white/75 backdrop-blur-sm border border-slate-100 p-6 shadow-md hover:shadow-2xl focus-within:ring-4 focus-within:ring-indigo-100" aria-label={`${member.name} — ${member.role}`} tabIndex={0}>
			<div className="flex flex-col items-center text-center gap-4">
				<motion.div whileHover={{ scale: 1.06, rotate: -1.25 }} transition={{ type: 'spring', stiffness: 280, damping: 18 }} className="relative w-36 h-36 rounded-xl overflow-hidden ring-1 ring-slate-100 shadow-lg" aria-hidden>
					<Image src={member.image} alt={member.name} fill sizes="(max-width: 640px) 140px, 144px" className="object-cover" />
					<div className="absolute -top-3 -left-3 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-sky-300 opacity-18 blur-[14px] pointer-events-none" />
				</motion.div>

				<div className="space-y-1">
					<h3 className="text-lg md:text-xl font-semibold text-slate-900">{member.name}</h3>
					<div className="flex items-center justify-center gap-2">
						<RoleBadge role={member.role} />
					</div>
				</div>

				{member.description && <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-4">{member.description}</p>}

				<div className="mt-4 flex items-center gap-3">
					{member.linkedin && (
						<a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${member.name}`} className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/60 hover:bg-white/80 shadow-sm transition">
							<LinkedInIcon />
						</a>
					)}

					{member.email && (
						<a href={`mailto:${member.email}`} className="text-sm text-slate-600 hover:text-slate-900 underline px-2 py-1 rounded">
							Contacto
						</a>
					)}

					<button ref={triggerRef} onClick={(e) => onOpen(member, (e.currentTarget as HTMLElement) ?? null)} className="ml-1 inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-600 to-sky-500 text-white rounded-lg text-sm font-semibold shadow-sm hover:translate-y-[-2px] transform transition" aria-label={`Ver perfil de ${member.name}`}>
						Ver perfil
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
							<path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>
			</div>
		</motion.article>
	);
}

/* Modal for profile details */
function ProfileModal({ member, onClose, initialFocus }: { member: TeamMember | null; onClose: () => void; initialFocus?: HTMLElement | null }) {
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);
	const overlayRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!member) return;
		// lock scroll
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		// focus close button
		requestAnimationFrame(() => closeButtonRef.current?.focus());

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('keydown', onKey);
			document.body.style.overflow = prev;
			// restore focus
			initialFocus?.focus();
		};
	}, [member, onClose, initialFocus]);

	if (!member) return null;

	return (
		<motion.div initial="hidden" animate="visible" exit="hidden" variants={overlayVariants} className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* overlay */}
			<motion.div ref={overlayRef} variants={overlayVariants} initial="hidden" animate="visible" onClick={(e) => e.target === overlayRef.current && onClose()} className="absolute inset-0 bg-black/45" />

			{/* modal */}
			<motion.div variants={modalVariants} initial="hidden" animate="visible" className="relative z-10 max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
					<div className="relative md:col-span-1 w-full h-56 md:h-auto rounded-lg overflow-hidden">
						<Image src={member.image} alt={member.name} fill className="object-cover" />
					</div>

					<div className="md:col-span-2">
						<div className="flex items-start justify-between gap-4">
							<div>
								<h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
								<p className="mt-1 text-sm text-slate-600">{member.role}</p>
							</div>

							<button ref={closeButtonRef} onClick={onClose} aria-label="Cerrar perfil" className="ml-auto p-2 rounded-md text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200">
								<X className="w-5 h-5" />
							</button>
						</div>

						{member.description && <p className="mt-4 text-slate-700 leading-relaxed">{member.description}</p>}

						<div className="mt-6 flex flex-col sm:flex-row gap-3">
							{member.email && (
								<a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-50 border border-slate-100 text-sm text-slate-700 hover:bg-slate-100">
									Email: <span className="font-semibold">{member.email}</span>
								</a>
							)}
							{member.phone && (
								<a href={`tel:${member.phone}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-50 border border-slate-100 text-sm text-slate-700 hover:bg-slate-100">
									Tel: <span className="font-semibold">{member.phone}</span>
								</a>
							)}
							{member.linkedin && (
								<a href={member.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:brightness-95">
									<LinkedInIcon /> LinkedIn
								</a>
							)}
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

/* Main exported component */
export default function QuienesSomos({ team = defaultTeam }: { team?: TeamMember[] }) {
	const [selected, setSelected] = useState<TeamMember | null>(null);
	const [focusEl, setFocusEl] = useState<HTMLElement | null>(null);

	const openProfile = (m: TeamMember, trigger: HTMLElement | null) => {
		setFocusEl(trigger ?? null);
		setSelected(m);
	};

	const closeProfile = () => setSelected(null);

	return (
		<section id="quienes-somos" className="py-20 bg-gradient-to-b from-gray-50 to-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-12">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">Corporación Ejecutiva Internacional</h2>
					<p className="mt-3 text-md md:text-lg text-slate-600 max-w-3xl mx-auto">Equipo ejecutivo con trayectoria internacional en consultoría, estrategia y transformación digital.</p>

					<div className="mt-6 flex items-center justify-center gap-3">
						<span className="inline-block w-28 h-1 rounded-full bg-gradient-to-r from-indigo-600 via-sky-400 to-rose-400 shadow-sm" />
					</div>
				</div>

				{/* Grid */}
				<motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
					{team.map((member, i) => (
						<TeamCard key={i} member={member} onOpen={openProfile} />
					))}
				</motion.div>

				{/* CTA */}
				<div className="mt-12 text-center">
					<p className="text-sm text-slate-500">
						¿Quieres conocer más sobre nuestro equipo o agendar una reunión estratégica?{' '}
						<a href="#contacto" className="font-semibold text-indigo-600 hover:underline">
							Contáctanos
						</a>
					</p>
				</div>
			</div>

			{/* Modal */}
			<ProfileModal member={selected} onClose={closeProfile} initialFocus={focusEl ?? undefined} />
		</section>
	);
}
