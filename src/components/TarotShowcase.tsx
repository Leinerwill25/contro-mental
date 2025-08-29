// components/TarotShowcase.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

type TarotShowcaseProps = {
	title?: string;
	subtitle?: string;
	lead?: string;
	videoSrc?: string; // path to mp4 or external link (Drive link supported)
	posterSrc?: string;
	imageSrc?: string;
	priceLabel?: string;
	contactEmail?: string;
};

export default function TarotShowcase({ title = 'CONSULTAS TAROT ALPHA', subtitle = 'Visualización escrita de 9 Meses — Si deseas Ver y tener mejores decisiones, esta es tu oportunidad', lead = 'Conoce Tu Futuro', videoSrc = 'https://drive.google.com/file/d/1J0aSdJ3GCEdRJWXnA8bdaNE9ARJOodd7/view?usp=drive_link', posterSrc = '/foto para  el  TAROT.png', imageSrc = '/foto para  el  TAROT.png', priceLabel = 'Precio súper económico por promoción', contactEmail = 'alphadeseos@gmail.com' }: TarotShowcaseProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	// Extraer ID de Google Drive si existe
	const driveInfo = useMemo(() => {
		if (!videoSrc) return null;
		const match = videoSrc.match(/\/d\/([a-zA-Z0-9_-]+)/);
		if (match && match[1]) {
			const id = match[1];
			return {
				id,
				directUrl: `https://drive.google.com/uc?export=download&id=${id}`, // intento de url directa
				previewUrl: `https://drive.google.com/file/d/${id}/preview`, // fallback iframe
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

	// Detectar si la fuente es un .mp4 directo (local o CDN)
	const isMp4 = useMemo(() => {
		try {
			return /\.mp4(\?.*)?$/i.test(videoSrc || '');
		} catch {
			return false;
		}
	}, [videoSrc]);

	// overlay button state (visible cuando pausado)
	const [showOverlay, setShowOverlay] = useState<boolean>(true);

	// Si es Drive, intentaremos reproducir con directUrl; si falla por CORS, usaremos modal+iframe
	const [useDriveDirect, setUseDriveDirect] = useState<boolean>(Boolean(driveInfo)); // intentamos por defecto
	const [showDriveModal, setShowDriveModal] = useState<boolean>(false);
	const [driveCheckDone, setDriveCheckDone] = useState<boolean>(false);

	// Cuando hay driveInfo, intentamos comprobar si la directUrl puede ser usada como fuente de <video>.
	// Muchas veces no es posible comprobar por CORS desde cliente; intentamos un HEAD fetch y, si falla,
	// dejamos la directUrl como intento (el navegador puede o no reproducir). Si detectamos fallo reproducir, ofrecemos modal.
	useEffect(() => {
		if (!driveInfo) {
			setDriveCheckDone(true);
			setUseDriveDirect(false);
			return;
		}

		// Intento de comprobación mínima: HEAD para ver content-type (puede fallar por CORS)
		(async () => {
			try {
				const res = await fetch(driveInfo.directUrl, { method: 'HEAD', mode: 'cors' });
				// Si respuesta ok y content-type parece video, permitimos usar directUrl
				const ct = res.headers.get('content-type') || '';
				if (res.ok && ct.startsWith('video')) {
					setUseDriveDirect(true);
				} else {
					// No hay content-type de video o no ok; aún así intentaremos usar directUrl (fallará más adelante),
					// pero marcamos que la comprobación terminó.
					setUseDriveDirect(true);
				}
			} catch (err) {
				// CORS o bloqueo: no pudimos confirmar, pero intentaremos usar directUrl de todas formas.
				// Si falla reproducción, el usuario podrá usar el modal.
				setUseDriveDirect(true);
			} finally {
				setDriveCheckDone(true);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [driveInfo]);

	// Sincroniza overlay con los eventos del <video> (si existe)
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
	}, [videoRef, useDriveDirect]); // reattach si cambiamos la fuente

	// toggle play/pause; si estamos usando Drive y la reproducción falla, abrimos modal iframe
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
			} catch (err) {
				// Reproducción falló (autoplay policy o CORS/headers issues)
				// Abrimos modal para que el usuario reproduzca desde el preview de Drive dentro de la página
				// (esto evita redireccionar a otra pestaña).
				// Mostramos modal y ocultamos overlay.
				// eslint-disable-next-line no-console
				console.warn('Control de reproducción directo falló, abriendo modal como fallback:', err);
				setShowDriveModal(true);
				setShowOverlay(false);
				return;
			}
		}

		// Si no existe elemento video (por ejemplo no es mp4 y no pudimos usar directUrl)
		if (driveInfo) {
			// Abrir modal con iframe para reproducir in-page (no redirección).
			setShowDriveModal(true);
			setShowOverlay(false);
			return;
		}
	};

	// Cuando el modal se cierre, mostramos overlay de nuevo
	const closeModal = () => {
		setShowDriveModal(false);
		// Dale un pequeño retardo para evitar parpadeos si el video dentro del modal no es detectable
		setTimeout(() => setShowOverlay(true), 120);
	};

	const downloadHref = useMemo(() => {
		if (driveInfo) return driveInfo.downloadUrl;
		return videoSrc;
	}, [driveInfo, videoSrc]);

	// Fuente que pondremos en el <video> (prioridad: local/cdn mp4 > drive direct)
	const playerSrc = useMemo(() => {
		if (isMp4) return videoSrc;
		if (driveInfo && useDriveDirect) return driveInfo.directUrl;
		return undefined;
	}, [isMp4, driveInfo, useDriveDirect, videoSrc]);

	return (
		<section className="w-full max-w-6xl mx-auto px-6 py-12">
			<div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
				{/* Header */}
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 md:p-8 bg-gradient-to-r from-sky-50 to-white">
					<div>
						<h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-sky-900 tracking-tight">{title}</h1>
						<p className="mt-1 text-sm md:text-base text-slate-600 max-w-xl">{subtitle}</p>
					</div>

					<div className="ml-auto text-right">
						<div className="inline-flex items-center gap-3">
							<span className="px-3 py-2 rounded-md bg-sky-50 text-sky-800 text-sm font-semibold border border-sky-100 shadow-sm">{priceLabel}</span>
						</div>

						<p className="mt-2 text-sm text-slate-700">
							<span className="font-medium">Informes sin compromiso:</span>{' '}
							<a className="text-sky-700 hover:underline" href={`mailto:${contactEmail}`}>
								{contactEmail}
							</a>
						</p>
					</div>
				</div>

				{/* Content grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8">
					{/* Left: Video */}
					<div className="lg:col-span-7 flex flex-col gap-4">
						<div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-black">
							{/* Si playerSrc está definido, usamos <video>. Si no, mostramos poster y/o iframe modal fallback */}
							{playerSrc ? (
								<video ref={videoRef} src={playerSrc} poster={posterSrc} controls preload="metadata" className="w-full h-[320px] md:h-[420px] lg:h-[520px] object-cover bg-black" aria-label="Video presentación Tarot Alpha">
									Your browser does not support the <code>video</code> element.
								</video>
							) : (
								// No tenemos fuente reproducible todavía; mostramos poster y permitir abrir modal
								<div className="w-full h-[320px] md:h-[420px] lg:h-[520px] relative bg-black">
									<Image src={posterSrc} alt={title} fill className="object-cover" />
								</div>
							)}

							{/* Overlay play/pause button — controla el <video> cuando existe; si no, abre modal */}
							{showOverlay && (
								<div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
									<button type="button" aria-label="Reproducir / Pausar video" onClick={togglePlay} className="flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 transition rounded-full w-20 h-20 focus:outline-none focus:ring-2 focus:ring-sky-400">
										<svg className="w-8 h-8 text-white/95" viewBox="0 0 24 24" fill="none" aria-hidden>
											<path d="M8 5v14l11-7L8 5z" fill="currentColor" />
										</svg>
									</button>
								</div>
							)}
						</div>

						{/* small file box / download */}
						<div className="flex items-center gap-4">
							<div className="flex-1">
								<div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 shadow-sm">
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
								<a href={downloadHref} {...(driveInfo ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-sky-600 text-white text-sm font-semibold shadow hover:bg-sky-700 transition">
									Descargar
								</a>
							</div>
						</div>
					</div>

					{/* Right column */}
					<aside className="lg:col-span-5 flex flex-col gap-4">
						<div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">
							<div className="relative w-full h-48 md:h-64">
								<Image src={imageSrc} alt="Imagen de presentación Tarot" fill className="object-cover" />
							</div>

							<div className="p-4 md:p-6">
								<p className="text-sm text-slate-700">{lead}</p>

								<div className="mt-4">
									<h4 className="text-sm font-semibold text-sky-900">Presentación</h4>
									<p className="mt-2 text-sm text-slate-600">Lectura Garantizada</p>
								</div>

								<div className="mt-4 flex items-center justify-between gap-4">
									<div className="flex items-center gap-3">
										<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 text-sky-700 font-semibold">α</span>
										<div>
											<div className="text-sm font-semibold text-slate-900">Tarot Alpha</div>
											<div className="text-xs text-slate-500">Visualización escrita • 9 meses</div>
										</div>
									</div>

									<div className="text-right">
										<div className="text-sm font-semibold text-sky-800">{priceLabel}</div>
										<a className="mt-1 block text-xs text-sky-600 hover:underline" href={`mailto:${contactEmail}`}>
											{contactEmail}
										</a>
									</div>
								</div>

								<div className="mt-6 flex flex-col sm:flex-row gap-3">
									<a href={`mailto:${contactEmail}?subject=Interés%20Consulta%20Tarot%20Alpha`} className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-sky-700 to-indigo-600 text-white font-semibold shadow hover:scale-[1.02] transition">
										Solicitar información
									</a>
									<a href={`mailto:${contactEmail}?subject=Interés%20Consulta%20Tarot%20Alpha`} className="inline-flex items-center justify-center px-4 py-3 rounded-lg border border-slate-200 text-slate-800 bg-white hover:bg-slate-50 transition">
										Agendar reunión
									</a>
								</div>
							</div>
						</div>

						<div className="text-center text-xs text-slate-500">© {new Date().getFullYear()} Tarot Alpha — Presentación profesional y segura.</div>
					</aside>
				</div>
			</div>

			{/* Modal fallback: muestra iframe de Drive IN-PAGE (no redirige). */}
			{showDriveModal && driveInfo && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div className="absolute inset-0 bg-black/60" onClick={closeModal} />
					<div className="relative w-full max-w-4xl h-[60vh] bg-black rounded-lg overflow-hidden shadow-2xl">
						<button onClick={closeModal} aria-label="Cerrar" className="absolute right-3 top-3 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white">
							✕
						</button>
						<iframe src={driveInfo.previewUrl} title="Video presentación Tarot Alpha (Google Drive modal)" allow="autoplay; encrypted-media; fullscreen" loading="lazy" className="w-full h-full border-0" />
					</div>
				</div>
			)}
		</section>
	);
}
