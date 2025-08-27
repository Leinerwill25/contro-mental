// components/AnimalHelpBanner.tsx
'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function AnimalHelpBanner() {
	return (
		<section id="animal-help" className="bg-gradient-to-r from-[#0B2342] to-[#133A66] py-8">
			<div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
				{/* Texto */}
				<div className="text-center md:text-left max-w-2xl">
					<p className="text-sm uppercase tracking-wide text-amber-300 font-semibold">* Todos nuestros Productos ayudan a los Animalitos Abandonados *</p>
					<h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-white leading-snug">
						Pre Fundación <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">PATITAS en la CALLE</span>
					</h2>
					<p className="mt-2 text-slate-300 text-base">AYÚDANOS a AYUDAR</p>
				</div>

				{/* Imágenes */}
				<div className="flex gap-4">
					<div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/10">
						<Image src="/pexels-tranmautritam-2194261.jpg" alt="Gatito rescatado" fill className="object-cover" />
					</div>
					<div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/10">
						<Image src="/pexels-terricks-noah-282960-840326.jpg" alt="Perrito rescatado" fill className="object-cover" />
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
