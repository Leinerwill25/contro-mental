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
		<section id="animal-help" className="bg-gradient-to-r from-[#0B2342] to-[#133A66] py-6 md:py-10">
			<div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
				{/* Texto */}
				<div className="w-full lg:w-1/2 text-center lg:text-left">
					<p className="text-sm md:text-base uppercase tracking-wide text-amber-300 font-semibold">* Todos nuestros Productos ayudan a los Animalitos Abandonados *</p>

					<h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
						Pre Fundación <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">PATITAS en la CALLE</span>
					</h2>

					<p className="mt-4 text-slate-300 text-lg md:text-xl lg:text-2xl">AYÚDANOS ah AYUDAR</p>
				</div>

				{/* Imagen apaisada (más ancha que larga) */}
				<div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
					{/* Contenedor con tamaños más grandes y breakpoints */}
					<div className="relative w-[560px] md:w-[720px] lg:w-[800px] xl:w-[960px] aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 transform transition-all duration-350 hover:scale-102">
						<Image src={imageSrc} alt={imageAlt} fill className="object-cover object-center" priority sizes="(max-width: 640px) 420px, (max-width: 1024px) 720px, 960px" />
						{/* ligera capa de degradado para contraste */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
					</div>
				</div>
			</div>

			{/* Línea decorativa inferior */}
			<div className="mt-8 border-t border-slate-800/60">
				<div className="flex justify-center items-center py-4 text-base md:text-lg text-slate-400 gap-3">
					<Heart className="w-5 h-5 text-amber-300" />
					<span>Tu apoyo marca la diferencia</span>
				</div>
			</div>
		</section>
	);
}
