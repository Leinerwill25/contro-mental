// components/Navbar.improved.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
	{ href: '#libros', label: '¿Quiénes Somos?' },
	{ href: '#autor', label: 'Sistema Internacional Turístico' },
	{ href: '#contacto', label: 'Pre-Fundación Patitas En La Calle' },
];

export default function NavbarImproved() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	// Close mobile menu when route/path changes (improves UX on navigation)
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<header className="sticky top-0 z-150 w-full bg-gradient-to-r from-[#0B2342]/80 to-[#133A66]/75 backdrop-blur-md border-b border-slate-800/10">
			{/* Skip link for keyboard users */}
			<a href="#main" className="sr-only focus:not-sr-only focus:relative focus:z-50 focus:top-4 focus:left-4 focus:px-3 focus:py-2 focus:bg-white/90 focus:text-[#0B2342] rounded-md font-medium">
				Ir al contenido
			</a>

			<div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-3" aria-label="Inicio - Corporación Ejecutiva Internacional">
					<Image src="/grok.png" alt="Logo - Corporación Ejecutiva Internacional" width={44} height={44} priority />
					<span
						className="font-semibold text-lg tracking-tight
               bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200
               bg-clip-text text-transparent
               drop-shadow-[0_6px_18px_rgba(245,158,11,0.20)]">
						CORPORACIÓN EJECUTIVA INTERNACIONAL
					</span>
				</Link>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
					{NAV_ITEMS.map((item) => (
						<a key={item.href} href={item.href} className={clsx('text-sm font-medium transition-colors whitespace-nowrap', pathname?.includes(item.href.replace('#', '')) ? 'text-white/95' : 'text-white/80 hover:text-white/100')}>
							{item.label}
						</a>
					))}

					<Link href="#comprar" className="inline-flex items-center px-5 py-2 rounded-lg bg-yellow-300 text-[#0B2342] text-sm font-semibold shadow-sm hover:shadow-md transform-gpu hover:-translate-y-0.5 transition" aria-label="Comprar ahora">
						Adquirir Productos
					</Link>
				</nav>

				{/* Mobile toggle */}
				<button onClick={() => setOpen((v) => !v)} className="md:hidden p-2 rounded-md bg-white/6 text-white hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-white/40" aria-controls="mobile-menu" aria-expanded={open} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
					{open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
				</button>
			</div>

			{/* Mobile menu panel. Uses transforms + opacity for smoother animation and is accessible. */}
			<div id="mobile-menu" className={clsx('md:hidden origin-top overflow-hidden transition-[opacity,transform,max-height] duration-300 ease-in-out', open ? 'opacity-100 transform scale-y-100 max-h-[480px]' : 'opacity-0 transform scale-y-0 max-h-0')} aria-hidden={!open}>
				<div className="px-6 pb-6 pt-4 flex flex-col gap-3 bg-gradient-to-b from-[#0B2342]/70 to-[#0B2342]/60">
					{NAV_ITEMS.map((item) => (
						<a key={item.href} href={item.href} className="text-sm text-white/90 py-2 px-2 rounded-md hover:bg-white/6 transition-colors">
							{item.label}
						</a>
					))}

					<Link href="#comprar" className="mt-2 inline-flex items-center px-5 py-2 rounded-lg bg-white text-[#0B2342] text-sm font-semibold shadow-sm hover:shadow-md transition">
						Comprar
					</Link>
				</div>
			</div>
		</header>
	);
}
