// components/Footer.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

	const handleSubscribe = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return setStatus('error');
		setStatus('loading');
		// Simulación de petición — reemplaza por fetch a tu API real
		setTimeout(() => {
			setStatus('success');
			setEmail('');
		}, 900);
	};

	return (
		<footer className="bg-slate-900 text-slate-100">
			<div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
					{/* Branding */}
					<div className="md:col-span-4">
						<div className="flex items-center gap-3">
							<div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 ring-1 ring-white/6 flex items-center justify-center">
								{/* Logo placeholder: reemplaza por <Image /> si tienes logo */}
								<span className="font-semibold text-indigo-300 text-lg">CEI</span>
							</div>
							<div>
								<h3 className="text-xl font-extrabold tracking-tight text-white">Corporación Ejecutiva Internacional</h3>
								<p className="mt-1 text-sm text-slate-300">Consultoría · Mentorías · Estrategias corporativas</p>
							</div>
						</div>

						<p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-sm">Edición seleccionada — Atención profesional. Acompañamos a líderes y equipos a desarrollar estrategias con impacto real y crecimiento sostenible.</p>

						<div className="mt-4 flex items-center gap-3">
							<a aria-label="Facebook" href="#" className="p-2 rounded-md bg-white/5 hover:bg-white/8 transition">
								<Facebook className="w-5 h-5 text-slate-100" />
							</a>
							<a aria-label="Instagram" href="#" className="p-2 rounded-md bg-white/5 hover:bg-white/8 transition">
								<Instagram className="w-5 h-5 text-slate-100" />
							</a>
							<a aria-label="Twitter" href="#" className="p-2 rounded-md bg-white/5 hover:bg-white/8 transition">
								<Twitter className="w-5 h-5 text-slate-100" />
							</a>
						</div>
					</div>

					{/* Navigation columns */}
					<nav className="md:col-span-5 grid grid-cols-2 gap-6">
						<div>
							<h4 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider">Servicios</h4>
							<ul className="mt-4 space-y-2 text-sm text-slate-300">
								<li>
									<Link href="#consultoria" className="hover:text-white">
										Consultoría estratégica
									</Link>
								</li>
								<li>
									<Link href="#mentorias" className="hover:text-white">
										Mentorías ejecutivas
									</Link>
								</li>
								<li>
									<Link href="#marketing" className="hover:text-white">
										Marketing de alto impacto
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider">Enlaces</h4>
							<ul className="mt-4 space-y-2 text-sm text-slate-300">
								<li>
									<Link href="#libros" className="hover:text-white">
										Libros
									</Link>
								</li>
								<li>
									<Link href="#autor" className="hover:text-white">
										Autor
									</Link>
								</li>
								<li>
									<Link href="#contacto" className="hover:text-white">
										Contacto
									</Link>
								</li>
							</ul>
						</div>
					</nav>

					{/* Contact + Newsletter */}
					<div className="md:col-span-3">
						<h4 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider">Contacto</h4>
						<div className="mt-4 text-sm text-slate-300 space-y-2">
							<div className="flex items-center gap-2">
								<Phone className="w-4 h-4 text-indigo-300" />
								<span>+34 600 000 000</span>
							</div>
							<div className="flex items-center gap-2">
								<Mail className="w-4 h-4 text-indigo-300" />
								<a href="mailto:email@tulibreria.com" className="hover:text-white">
									email@tulibreria.com
								</a>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="w-4 h-4 text-indigo-300" />
								<span>Oficina central · España</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-slate-800/60">
				<div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-400">
					<div>© {new Date().getFullYear()} Corporación Ejecutiva Internacional. Todos los derechos reservados.</div>

					<div className="flex items-center gap-4">
						<Link href="/politica-privacidad" className="hover:text-slate-200">
							Política de privacidad
						</Link>
						<Link href="/terminos" className="hover:text-slate-200">
							Términos
						</Link>
						<span className="hidden md:inline">·</span>
						<span className="hidden md:inline">Hecho con profesionalismo</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
