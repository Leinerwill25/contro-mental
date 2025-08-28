// components/Footer.tsx
'use client';

import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
	// const [email, setEmail] = useState('');
	// const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

	// const handleSubscribe = async (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	if (!email) return setStatus('error');
	// 	setStatus('loading');
	// 	// Simulación de petición — reemplaza por fetch a tu API real
	// 	setTimeout(() => {
	// 		setStatus('success');
	// 		setEmail('');
	// 		setTimeout(() => setStatus('idle'), 2000);
	// 	}, 900);
	// };

	return (
		<footer className="bg-gradient-to-r from-[#0B2342] to-[#133A66] text-slate-100">
			<div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
					{/* Branding */}
					<div className="md:col-span-4">
						<div className="flex items-center gap-3">
							<div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/5 ring-1 ring-white/6 flex items-center justify-center">
								{/* Logo placeholder: reemplaza por <Image /> si tienes logo */}
								<span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 text-lg">CEI</span>
							</div>
							<div>
								<h3 className="text-xl font-extrabold tracking-tight text-white"> CORPORACIÓN EJECUTIVA INTERNACIONAL</h3>
								<p className="mt-1 text-sm text-slate-300">Consultoría · Mentorías · Estrategias corporativas</p>
							</div>
						</div>

						<p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-sm">Edición seleccionada — Atención profesional. Acompañamos a líderes y equipos a desarrollar estrategias con impacto real y crecimiento sostenible.</p>
					</div>

					{/* Navigation columns */}
					<nav className="md:col-span-5 grid grid-cols-2 gap-6">
						<div>
							<h4 className="text-sm font-semibold uppercase tracking-wider">
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Servicios</span>
							</h4>
							<ul className="mt-4 space-y-2 text-sm text-slate-300">
								<li>
									<Link href="#" className="hover:text-white focus:outline-none focus:ring-4 focus:ring-[#0B2342]/25 rounded">
										Consultoría estratégica
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white focus:outline-none focus:ring-4 focus:ring-[#0B2342]/25 rounded">
										Mentorías ejecutivas
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-white focus:outline-none focus:ring-4 focus:ring-[#0B2342]/25 rounded">
										Marketing de alto impacto
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="text-sm font-semibold uppercase tracking-wider">
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Enlaces</span>
							</h4>
							<ul className="mt-4 space-y-2 text-sm text-slate-300">
								<li>
									<Link href="#libro" className="hover:text-white focus:outline-none focus:ring-4 focus:ring-[#0B2342]/25 rounded">
										Libros
									</Link>
								</li>
								<li>
									<Link href="#autor" className="hover:text-white focus:outline-none focus:ring-4 focus:ring-[#0B2342]/25 rounded">
										Autor
									</Link>
								</li>
								<li>
									<Link href="mailto:Corporacion2025intl@gmail.com" className="hover:text-white focus:outline-none focus:ring-4 focus:ring-[#0B2342]/25 rounded">
										Contacto
									</Link>
								</li>
							</ul>
						</div>
					</nav>

					{/* Contact + Newsletter */}
					<div className="md:col-span-3">
						<h4 className="text-sm font-semibold uppercase tracking-wider">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">Contacto</span>
						</h4>

						<div className="mt-4 text-sm text-slate-300 space-y-2">
							<div className="flex items-center gap-2">
								<Mail className="w-4 h-4 text-amber-300" />
								<a href="mailto:Corporacion2025intl@gmail.com" className="hover:text-white focus:outline-none focus:ring-4 focus:ring-[#0B2342]/25 rounded">
									Corporacion2025intl@gmail.com
								</a>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="w-4 h-4 text-amber-300" />
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
						<Link href="/politica-privacidad" className="hover:text-slate-200 focus:outline-none focus:ring-4 focus:ring-[#0B2342]/20 rounded">
							Política de privacidad
						</Link>
						<Link href="/terminos" className="hover:text-slate-200 focus:outline-none focus:ring-4 focus:ring-[#0B2342]/20 rounded">
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
