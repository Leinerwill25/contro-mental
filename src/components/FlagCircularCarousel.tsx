'use client';

import React, { useEffect, useMemo, useState } from 'react';

type Flag = { src: string; name: string };

interface FlagCircularCarouselProps {
	flags: Flag[];
	size?: number; // px (container square)
	itemSize?: number; // px (flag visual)
	autoRotateMs?: number | null; // autoplay interval in ms (null = off)
}

export default function FlagCircularCarousel({ flags, size = 260, itemSize = 84, autoRotateMs = null }: FlagCircularCarouselProps) {
	const n = flags.length;
	const [active, setActive] = useState(0);

	// precompute angle step
	const angleStep = useMemo(() => 360 / n, [n]);

	// helper: minimal circular delta in range (-n/2, n/2]
	const deltaIndex = (i: number, center: number) => {
		let raw = i - center;
		while (raw > n / 2) raw -= n;
		while (raw <= -n / 2) raw += n;
		return raw;
	};

	// autoplay
	useEffect(() => {
		if (!autoRotateMs) return;
		const t = setInterval(() => setActive((s) => (s + 1) % n), autoRotateMs);
		return () => clearInterval(t);
	}, [autoRotateMs, n]);

	const prev = () => setActive((s) => (s - 1 + n) % n);
	const next = () => setActive((s) => (s + 1) % n);

	// radius for translate: keep items inside container
	const radius = Math.max((size - itemSize) / 2 - 6, 24);

	return (
		<div className="flex flex-col items-center" style={{ width: size }}>
			<div
				className="relative"
				style={{
					width: size,
					height: size,
					borderRadius: '9999px',
					// subtle background ring to look corporate
					boxShadow: 'inset 0 0 0 1px rgba(148,163,184,0.04)',
				}}
				aria-roledescription="Carousel circular de banderas">
				{/* center hidden focus target for proper transform origin */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'block',
						transform: 'translateZ(0)',
						// keep overflow visible for scale/shine
						overflow: 'visible',
					}}
				/>

				{/* flags positioned in circle */}
				{flags.map((f, i) => {
					const d = deltaIndex(i, active); // -.. .. ..
					const angle = 180 + d * angleStep; // active at 180deg (left)
					const rad = (angle * Math.PI) / 180;
					const x = Math.cos(rad) * radius;
					const y = Math.sin(rad) * radius;

					// depth & styles based on how far from active (abs(d))
					const absD = Math.min(Math.abs(d), n / 2);
					const blurPx = Math.min(absD * 2.6, 6); // up to 6px blur
					const scale = 1 - Math.min(absD * 0.08, 0.36); // down to ~0.64
					const opacity = 1 - Math.min(absD * 0.16, 0.7);
					const zIndex = Math.round(200 - absD * 20 + Math.cos(rad) * 10);

					const isActive = d === 0;

					return (
						<button
							key={i}
							onClick={() => setActive(i)}
							aria-label={`Presencia en ${f.name}. Seleccionar.`}
							title={f.name}
							className="absolute focus:outline-none"
							style={{
								// center origin and then apply rotate+translate+unrotate to keep image upright
								left: '50%',
								top: '50%',
								transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
								transition: 'transform 520ms cubic-bezier(.2,.9,.2,1), filter 420ms, opacity 420ms, box-shadow 420ms',
								zIndex,
								// ensure pointer target large enough
								width: itemSize,
								height: itemSize,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 12,
								background: isActive ? 'linear-gradient(180deg, rgba(255,247,237,0.06), rgba(255,247,237,0.02))' : 'transparent',
								border: isActive ? '1px solid rgba(245,158,11,0.12)' : '1px solid rgba(148,163,184,0.04)',
								boxShadow: isActive ? '0 8px 28px rgba(15,23,42,0.45)' : '0 4px 10px rgba(2,6,23,0.25)',
								cursor: 'pointer',
							}}>
							{/* inner image upright (reverse rotation) */}
							<img
								src={f.src}
								alt={f.name}
								style={{
									transform: `rotate(-${angle}deg) scale(${scale})`,
									width: '70%',
									height: '70%',
									objectFit: 'contain',
									filter: `blur(${blurPx}px) grayscale(${isActive ? 0 : 0.12})`,
									opacity,
									transition: 'transform 520ms cubic-bezier(.2,.9,.2,1), filter 420ms, opacity 420ms',
									borderRadius: 6,
								}}
							/>
						</button>
					);
				})}
			</div>

			{/* controls */}
			<div className="mt-3 flex items-center gap-3">
				<button onClick={prev} aria-label="Anterior" className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-slate-800 border border-slate-700 text-amber-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300">
					‹
				</button>
				<button onClick={next} aria-label="Siguiente" className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-slate-800 border border-slate-700 text-amber-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300">
					›
				</button>
			</div>
		</div>
	);
}
