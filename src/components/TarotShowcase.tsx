'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

type TarotShowcaseProps = {
	title?: string;
	subtitle?: string;
	lead?: string;
	videoSrc?: string;
	posterSrc?: string;
	imageSrc?: string;
	priceLabel?: string;
	contactEmail?: string;
};

// Helper: abre Gmail en desktop; en mobile usa mailto como fallback.
// subject y body serán codificados automáticamente.
function openMailCompose(email: string, subject = '', body = ''): void {
	if (typeof window === 'undefined') return;

	const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
	const encodedSubject = encodeURIComponent(subject);
	const encodedBody = encodeURIComponent(body);

	const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodedSubject}&body=${encodedBody}&tf=1`;

	if (!isMobile) {
		// Desktop: abrir Gmail web en nueva pestaña
		window.open(gmailUrl, '_blank', 'noopener,noreferrer');
	} else {
		// Mobile: abrir app nativa con mailto
		window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
	}
}

export default function TarotShowcase({ title = 'CONSULTAS TAROT ALPHA', subtitle = 'Visualización escrita de 9 Meses — Si deseas Ver y tener mejores decisiones, esta es tu oportunidad', lead = 'Conoce Tu Futuro', videoSrc = 'https://drive.google.com/file/d/1J0aSdJ3GCEdRJWXnA8bdaNE9ARJOodd7/view?usp=drive_link', posterSrc = '/cap.png', imageSrc = '/foto para  el  TAROT.png', priceLabel = 'Precio súper económico por promoción', contactEmail = 'alphadeseos@gmail.com' }: TarotShowcaseProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const driveInfo = useMemo(() => {
		if (!videoSrc) return null;
		const match = videoSrc.match(/\/d\/([a-zA-Z0-9_-]+)/);
		if (match && match[1]) {
			const id = match[1];
			return {
				id,
				directUrl: `https://drive.google.com/uc?export=download&id=${id}`,
				previewUrl: `https://drive.google.com/file/d/${id}/preview`,
				downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
			};
		}
		const ucMatch = videoSrc.match(/[?&]id=([a-zA-Z0-9_-]+)/);
		if (ucMatch && ucMatch[1]) {
			const id = ucMatch[1];
			return {
				id,
				directUrl: `https://drive.google.com/uc?export=download&id=${id}`,
				previewUrl: `https://drive.google.com/file/d/${id}/preview`,
				downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
			};
		}
		return null;
	}, [videoSrc]);

	const isMp4 = useMemo(() => {
		try {
			return /\.mp4(\?.*)?$/i.test(videoSrc || '');
		} catch {
			return false;
		}
	}, [videoSrc]);

	const [showOverlay, setShowOverlay] = useState<boolean>(true);
	const [useDriveDirect, setUseDriveDirect] = useState<boolean>(Boolean(driveInfo));
	const [showDriveModal, setShowDriveModal] = useState<boolean>(false);

	useEffect(() => {
		if (!driveInfo) {
			setUseDriveDirect(false);
			return;
		}

		(async () => {
			try {
				const res = await fetch(driveInfo.directUrl, { method: 'HEAD', mode: 'cors' });
				const ct = res.headers.get('content-type') || '';
				if (res.ok && ct.startsWith('video')) {
					setUseDriveDirect(true);
				} else {
					setUseDriveDirect(true);
				}
			} catch (error) {
				// registrar advertencia para diagnóstico; seguimos con fallback
				console.warn('Drive direct check failed:', error);
				setUseDriveDirect(true);
			}
		})();
	}, [driveInfo]);

	useEffect(() => {
		const v = videoRef.current;
		if (!v) return;

		const onPlay = () => setShowOverlay(false);
		const onPause = () => setShowOverlay(true);
		const onEnded = () => setShowOverlay(true);
		v.addEventListener('play', onPlay);
		v.addEventListener('pause', onPause);
		v.addEventListener('ended', onEnded);

		if (!v.paused) setShowOverlay(false);

		return () => {
			v.removeEventListener('play', onPlay);
			v.removeEventListener('pause', onPause);
			v.removeEventListener('ended', onEnded);
		};
	}, [videoRef, useDriveDirect]);

	const togglePlay = async () => {
		const v = videoRef.current;
		if (v) {
			try {
				if (v.paused) {
					await v.play();
				} else {
					v.pause();
				}
				return;
			} catch (error) {
				console.warn('Control de reproducción directo falló, abriendo modal como fallback:', error);
				setShowDriveModal(true);
				setShowOverlay(false);
				return;
			}
		}

		if (driveInfo) {
			setShowDriveModal(true);
			setShowOverlay(false);
			return;
		}
	};

	const closeModal = () => {
		setShowDriveModal(false);
		setTimeout(() => setShowOverlay(true), 120);
	};

	const downloadHref = useMemo(() => {
		if (driveInfo) return driveInfo.downloadUrl;
		return videoSrc;
	}, [driveInfo, videoSrc]);

	const playerSrc = useMemo(() => {
		if (isMp4) return videoSrc;
		if (driveInfo && useDriveDirect) return driveInfo.directUrl;
		return undefined;
	}, [isMp4, driveInfo, useDriveDirect, videoSrc]);

	const emailHighlight = 'inline-block px-3 py-1 rounded-md bg-amber-400 text-slate-900 font-semibold shadow-sm hover:brightness-95 transition text-base';

	// Subject & body defaults for the contact button
	const contactSubject = 'Interés Consulta Tarot Alpha';
	const contactBody = 'Hola, estoy interesado en la consulta Tarot Alpha. Por favor, indíqueme detalles y pasos a seguir.';

	return (
		<section className="w-full max-w-6xl mx-auto px-6 py-12">
			<div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
				{/* Header */}
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 md:p-8 bg-gradient-to-r from-sky-50 to-white">
					<div>
						<h1 id="promo-title" className="font-extrabold tracking-tight leading-tight text-4xl md:text-5xl lg:text-6xl" aria-label={title}>
							<span
								className="block title-gradient hover:scale-[1.02] transition-transform"
								style={{
									backgroundImage: 'linear-gradient(90deg, #98ffe0 0%, #5ccda7 45%, #009d71 100%)',
									WebkitBackgroundClip: 'text',
									backgroundClip: 'text',
									color: 'transparent',
									WebkitTextFillColor: 'transparent',
									textShadow: '0 6px 24px rgba(2,12,40,0.14)',
									backgroundSize: '200% 100%',
								}}>
								{title}
							</span>
						</h1>

						<p className="mt-2 text-lg md:text-xl lg:text-2xl text-slate-600 max-w-xl font-medium">{subtitle}</p>
					</div>

					<div className="ml-auto text-right">
						<div className="inline-flex items-center gap-3">
							<span className="px-3 py-2 rounded-md bg-sky-50 text-sky-800 text-lg font-semibold border border-sky-100 shadow-sm">{priceLabel}</span>
						</div>

						<p className="mt-2 text-lg text-slate-700">
							<span className="font-medium">Informes sin compromiso:</span>{' '}
							<a className={emailHighlight} href={`mailto:${contactEmail}`}>
								{contactEmail}
							</a>
						</p>
					</div>
				</div>

				{/* Content grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8">
					{/* Left: Video */}
					<div className="lg:col-span-6 flex flex-col gap-4">
						<div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-black">
							{playerSrc ? (
								<video ref={videoRef} src={playerSrc} poster={posterSrc} controls preload="metadata" className="w-full h-[220px] md:h-[300px] lg:h-[360px] object-cover bg-black" aria-label="Video presentación Tarot Alpha">
									Your browser does not support the <code>video</code> element.
								</video>
							) : (
								<div className="w-full h-[220px] md:h-[300px] lg:h-[360px] relative bg-black">
									<Image src={posterSrc} alt={title} fill className="object-cover" />
								</div>
							)}

							{showOverlay && (
								<div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
									<button type="button" aria-label="Reproducir / Pausar video" onClick={togglePlay} className="flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 transition rounded-full w-16 h-16 focus:outline-none focus:ring-2 focus:ring-sky-400">
										<svg className="w-6 h-6 text-white/95" viewBox="0 0 24 24" fill="none" aria-hidden>
											<path d="M8 5v14l11-7L8 5z" fill="currentColor" />
										</svg>
									</button>
								</div>
							)}
						</div>

						<div className="flex items-center gap-4">
							<div className="flex-1">
								<div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-lg text-slate-700 shadow-sm">
									<div className="flex items-center gap-3">
										<svg className="w-5 h-5 text-sky-600" viewBox="0 0 24 24" fill="none" aria-hidden>
											<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										<div className="truncate">TAROT Y ALPHA (1).mp4 — 2:00</div>
									</div>
								</div>
							</div>

							<div className="flex-shrink-0 text-right">
								<a href={downloadHref} {...(driveInfo ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-sky-600 text-white text-lg font-semibold shadow hover:bg-sky-700 transition">
									Descargar
								</a>
							</div>
						</div>
					</div>

					{/* Right column */}
					<aside className="lg:col-span-6 flex flex-col gap-4">
						<div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">
							<div className="relative w-full h-48 md:h-64">
								<Image src={imageSrc} alt="Imagen de presentación Tarot" fill className="object-cover" />
							</div>

							<div className="p-4 md:p-6">
								<p className="text-lg text-slate-700">{lead}</p>

								<div className="mt-4">
									<h4 className="text-lg font-semibold text-sky-900">Presentación</h4>
									<p className="mt-2 text-lg text-slate-600">Lectura Garantizada</p>
								</div>

								<div className="mt-4 flex items-center justify-between gap-4">
									<div className="flex items-center gap-3">
										<span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-50 text-sky-700 font-semibold text-lg">α</span>
										<div>
											<div className="text-lg font-semibold text-slate-900">Tarot Alpha</div>
											<div className="text-base text-slate-500">Visualización escrita • 9 meses</div>
										</div>
									</div>

									<div className="text-right">
										<div className="text-lg font-semibold text-sky-800">{priceLabel}</div>
										<a className={emailHighlight + ' mt-1 inline-block'} href={`mailto:${contactEmail}`}>
											{contactEmail}
										</a>
									</div>
								</div>

								<div className="mt-6 flex flex-col sm:flex-row gap-3">
									{/* Aquí aplicamos el helper: el href es un fallback y onClick usa openMailCompose */}
									<a
										href={`mailto:${contactEmail}?subject=${encodeURIComponent(contactSubject)}`}
										onClick={(e) => {
											e.preventDefault();
											openMailCompose(contactEmail, contactSubject, contactBody);
										}}
										className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-sky-700 to-indigo-600 text-white font-semibold text-lg shadow hover:scale-[1.02] transition"
										target="_blank"
										rel="noopener noreferrer">
										Solicitar información
									</a>
								</div>
							</div>
						</div>

						<div className="text-center text-base text-slate-500">© {new Date().getFullYear()} Tarot Alpha — Presentación profesional y segura.</div>
					</aside>
				</div>
			</div>

			{/* Modal fallback */}
			{showDriveModal && driveInfo && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div className="absolute inset-0 bg-black/60" onClick={closeModal} />
					<div className="relative w-full max-w-3xl h-[50vh] bg-black rounded-lg overflow-hidden shadow-2xl">
						<button onClick={closeModal} aria-label="Cerrar" className="absolute right-3 top-3 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white">
							✕
						</button>
						<iframe src={driveInfo.previewUrl} title="Video presentación Tarot Alpha (Google Drive modal)" allow="autoplay; encrypted-media; fullscreen" loading="lazy" className="w-full h-full border-0" />
					</div>
				</div>
			)}

			{/* Scoped styles for title shimmer animation */}
			<style jsx>{`
				.title-gradient {
					background-repeat: no-repeat;
					background-size: 200% 100%;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					-webkit-text-fill-color: transparent;
					animation: shimmer 6s linear infinite;
					will-change: background-position, transform;
					display: inline-block;
				}
				@keyframes shimmer {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
				/* pequeño extra: foco accesible */
				.title-gradient:focus {
					outline: 3px solid rgba(2, 132, 199, 0.14);
					outline-offset: 3px;
				}
			`}</style>
		</section>
	);
}
