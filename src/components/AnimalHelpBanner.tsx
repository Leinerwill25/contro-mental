'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import React from 'react';

interface AnimalHelpBannerProps {
	imageSrc?: string;
	imageAlt?: string;
}

export default function AnimalHelpBanner({ imageSrc = '/cap2.png', imageAlt = 'Animal rescatado' }: AnimalHelpBannerProps) {
	return (
		<section id="animal-help" className="bg-gradient-to-r from-[#0B2342] to-[#133A66] py-8">
			<div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
				{/* Texto */}
				<div className="text-center md:text-left max-w-2xl">
					<p className="text-sm uppercase tracking-wide text-amber-300 font-semibold">* Todos nuestros Productos ayudan a los Animalitos Abandonados *</p>

					<h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
						Pre Fundación <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">PATITAS en la CALLE</span>
					</h2>

					<p className="mt-2 text-slate-300 text-xl">AYÚDANOS a AYUDAR</p>
				</div>

				{/* Imagen apaisada (más ancha que larga) - option A: next/image object-contain */}
				<div className="w-full md:w-1/2 lg:w-2/5 flex justify-center md:justify-end">
					<div className="relative w-[420px] md:w-[560px] lg:w-[640px] aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" aria-hidden={false}>
						<Image src={imageSrc} alt={imageAlt} fill className="object-contain object-center" priority sizes="(max-width: 768px) 420px, (max-width: 1024px) 560px, 640px" />
						<div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent pointer-events-none" />
					</div>
				</div>
			</div>

			{/* Línea decorativa inferior */}
			<div className="mt-6 border-t border-slate-800/60">
				<div className="flex justify-center items-center py-3 text-sm text-slate-400 gap-2">
					<Heart className="w-4 h-4 text-amber-300" />
					<span>Tu apoyo marca la diferencia</span>
				</div>
			</div>
		</section>
	);
}
