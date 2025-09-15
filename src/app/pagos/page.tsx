// app/pagos/page-styled-updated.tsx
'use client';

import React, { useEffect, useRef, useState, ReactElement } from 'react';

type Product = {
	id: string;
	title: string;
	price: number;
};

const PRODUCTS: Product[] = [
	{ id: 'p1', title: 'Mentoria CUMPLE TUS DESEOS', price: 250 },
	{ id: 'p2', title: 'Mentoria COMO TENER EXITO EN EL AMOR', price: 144 },
	{ id: 'p3', title: 'Literatura - Second Pearl Harbor', price: 12 },
];

const PAYMENT_METHODS = [
	{ id: 'bank', label: 'Transferencia bancaria (Master Card - España)' },
	{ id: 'paypal', label: 'PayPal' },
	{ id: 'binance', label: 'Binance / Crypto' },
	{ id: 'mobile', label: 'Pago móvil / Banesco' },
	{ id: 'zelle', label: 'Zelle' }, // nuevo método agregado
];

export default function PagosPage(): ReactElement {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		const raf = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(raf);
	}, []);

	const enterBase = 'transition-all duration-500 ease-out';
	const headingCls = `${enterBase} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`;
	const paraCls = `${enterBase} delay-150 ${mounted ? 'opacity-100' : 'opacity-0'}`;
	const cardCls = `${enterBase} delay-100 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
	const bannerCls = `${enterBase} delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`;

	const flags = [
		{ src: '/descarga (1).png', name: 'Venezuela' },
		{ src: '/descarga.png', name: 'España' },
		{ src: '/descarga (2).png', name: 'Estados Unidos' },
		{ src: '/descarga (4).png', name: 'Perú' },
		{ src: '/descarga (3).png', name: 'Colombia' },
	];

	const [selected, setSelected] = useState<Record<string, boolean>>({});
	const [email, setEmail] = useState('');
	const [fileName, setFileName] = useState<string | null>(null);
	const [filePreview, setFilePreview] = useState<string | null>(null);
	const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id);
	const [confirmed, setConfirmed] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState<string | null>(null);
	const fileRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		return () => {
			if (filePreview) URL.revokeObjectURL(filePreview);
		};
	}, [filePreview]);

	function toggleProduct(id: string) {
		setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
	}

	const total = PRODUCTS.reduce((sum, p) => (selected[p.id] ? sum + p.price : sum), 0);

	function formatCurrency(n: number) {
		return `$ ${n.toFixed(2)}`;
	}

	function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const f = e.target.files?.[0] ?? null;
		setFileName(f ? f.name : null);
		if (f && f.type.startsWith('image/')) {
			const url = URL.createObjectURL(f);
			setFilePreview(url);
		} else {
			setFilePreview(null);
		}
	}

	function removeFile() {
		setFileName(null);
		setFilePreview(null);
		if (fileRef.current) fileRef.current.value = '';
	}

	function validateEmail(mail: string) {
		return /\S+@\S+\.\S+/.test(mail);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setMessage(null);

		const chosen = Object.keys(selected).filter((k) => selected[k]);
		if (chosen.length === 0) {
			setMessage('Por favor selecciona al menos 1 producto.');
			return;
		}
		if (!validateEmail(email)) {
			setMessage('Ingresa un correo electrónico válido.');
			return;
		}
		if (!confirmed) {
			setMessage('Debes confirmar que realizaste el pago.');
			return;
		}

		const form = new FormData();
		form.append('email', email);
		form.append('products', JSON.stringify(chosen));
		form.append('total', String(total));
		form.append('paymentMethod', paymentMethod);
		if (fileRef.current?.files?.[0]) form.append('comprobante', fileRef.current.files[0]);

		try {
			setUploading(true);
			setProgress(0);
			// Ejemplo de subida con progreso (reemplaza URL por tu endpoint real)
			await new Promise<void>((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.open('POST', '/api/pagos');
				xhr.upload.onprogress = (ev) => {
					if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100));
				};
				xhr.onload = () => {
					setUploading(false);
					if (xhr.status >= 200 && xhr.status < 300) {
						setMessage('Comprobante enviado con éxito. Nos pondremos en contacto.');
						setSelected({});
						setEmail('');
						setFileName(null);
						setFilePreview(null);
						setConfirmed(false);
						if (fileRef.current) fileRef.current.value = '';
						resolve();
					} else {
						setMessage('Hubo un error al enviar. Intenta de nuevo.');
						reject();
					}
				};
				xhr.onerror = () => {
					setUploading(false);
					setMessage('Error de red. Intenta nuevamente.');
					reject();
				};
				xhr.send(form);
			});
		} catch (err) {
			console.error(err);
		} finally {
			setUploading(false);
			setProgress(0);
		}
	}

	const contactEmail = 'corporacion2025int@gmail.com';
	const mailtoContact = `mailto:${contactEmail}?subject=${encodeURIComponent('Consulta sobre pago y comprobante')}`;

	return (
		<section className="w-full max-w-5xl mx-auto p-6 md:p-10 bg-gradient-to-b from-sky-100 to-sky-50 m-5 text-slate-900 rounded-2xl shadow-2xl border border-slate-200">
			<header className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-400 via-amber-400 to-red-500 flex items-center justify-center shadow-inner">
						<span className="font-extrabold text-slate-900">PD</span>
					</div>
					<div>
						<h2 className="text-2xl md:text-3xl font-serif text-sky-800 tracking-wide">Pagos y Comprobantes</h2>
						<p className="text-sm text-slate-600">Envía tu comprobante y selecciona los libros o mentorías que deseas comprar.</p>
					</div>
				</div>

				<div className="text-right">
					<p className="text-sm md:text-base text-slate-600">Aceptamos transferencias, PayPal, tarjetas, crypto y más</p>
					<div className="mt-2 flex items-center justify-end gap-3">
						{flags.map((f, i) => (
							<div key={i} className="group relative flex items-center" aria-hidden={false}>
								<img src={f.src} alt={f.name} tabIndex={0} role="img" aria-label={f.name} className="w-8 h-5 object-cover rounded-sm shadow-sm border border-slate-300 transform transition-transform duration-200 group-hover:scale-110 group-focus:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400" />
								<span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-md bg-slate-800 text-amber-300 text-xs px-2 py-1 opacity-0 translate-y-1 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0" aria-hidden="true">
									{f.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</header>

			<main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
				<div className="md:col-span-2">
					<h3 className={`${headingCls} text-xl md:text-2xl font-semibold text-rose-700`}>Métodos de pago</h3>

					<div className={`${paraCls} mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4`}>
						{/* payment methods */}
						{PAYMENT_METHODS.map((m) => (
							<div key={m.id} className="p-4 border border-slate-700 rounded-md bg-slate-800">
								<h4 className="font-medium text-slate-100">{m.label}</h4>
								<p className="text-sm text-slate-300 mt-1">
									{m.id === 'bank' && 'Cuenta: 5591 8401 0038 2863 — Titular: Jaime Bertoli Castagneto'}
									{m.id === 'paypal' && 'Envía el pago a: presidenciajaime379@gmail.com'}
									{m.id === 'binance' && 'Usa la dirección de correo asociada: jaimeinstituto12@gmail.com'}
									{m.id === 'mobile' && 'Banesco - Tel: 0414 797 34 75 - C.I: 12422041'}
									{m.id === 'zelle' && 'Usa la dirección de correo asociada: jesusbj82@gmail.com'}
								</p>
							</div>
						))}
					</div>

					<section className="mt-6 bg-slate-800 p-4 rounded-md border border-slate-700">
						<h4 className="text-sm text-slate-300 mb-3 font-semibold">Selecciona tus productos</h4>
						<div className="flex flex-col sm:flex-row gap-3">
							{PRODUCTS.map((p) => (
								<button key={p.id} onClick={() => toggleProduct(p.id)} className={`flex-1 px-4 py-3 rounded-lg border transition-shadow text-left ${selected[p.id] ? 'bg-amber-400 text-slate-900 shadow-md border-amber-300' : 'bg-blue-500 text-slate-100 border-slate-700'}`} aria-pressed={!!selected[p.id]}>
									<div className="font-semibold">{p.title}</div>
									<div className="text-sm">{formatCurrency(p.price)}</div>
								</button>
							))}
						</div>

						<div className="mt-4 flex items-center justify-between p-3 border border-slate-700 rounded-md">
							<div>
								<div className="text-sm text-slate-300">Total seleccionado</div>
								<div className="text-2xl font-bold text-amber-300">{formatCurrency(total)}</div>
							</div>

							<div className="text-right text-sm text-slate-300">
								<div>{Object.keys(selected).filter((k) => selected[k]).length} producto(s)</div>
								<a href={mailtoContact} className="mt-2 inline-block text-xs underline text-amber-600">
									¿Necesitas ayuda?
								</a>
							</div>
						</div>
					</section>

					{/* FORM MEJORADO: estructura en grid con previsualización y resumen */}
					<form className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
						{/* Left column: inputs */}
						<div className="md:col-span-3 bg-slate-800 p-4 rounded-md border border-slate-700">
							<h4 className="text-sm text-slate-300 mb-3 font-semibold">Enviar comprobante</h4>

							<label className="block mb-3">
								<span className="text-sm text-slate-300">Correo electrónico</span>
								<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="tu@correo.com" className="mt-1 block w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100" required />
							</label>

							<label className="block mb-3">
								<span className="text-sm text-slate-300">Método de pago utilizado</span>
								<select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 block w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100">
									{PAYMENT_METHODS.map((m) => (
										<option key={m.id} value={m.id} className="bg-slate-900">
											{m.label}
										</option>
									))}
								</select>
							</label>

							{/* Improved upload UI */}
							<div className="block mb-3">
								<span className="text-sm font-medium text-slate-300">Subir comprobante (foto o PDF)</span>

								<div className="mt-2 flex items-center gap-3">
									{/* Hidden input */}
									<input ref={fileRef} onChange={onFileChange} type="file" accept="image/*,application/pdf" className="sr-only" id="comprobante-input" />

									{/* Visible button to trigger file picker */}
									<label htmlFor="comprobante-input" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:brightness-95 shadow">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
											<path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0016.414 6L13 2.586A2 2 0 0011.586 2H4z" />
										</svg>
										<span className="text-sm font-medium">Seleccionar archivo</span>
									</label>

									{/* Show filename or placeholder */}
									<div className="flex-1 text-sm text-slate-400">
										{fileName ? (
											<div className="flex items-center justify-between gap-3">
												<span className="truncate">{fileName}</span>
												<button type="button" onClick={removeFile} className="text-xs underline text-blue-600">
													Eliminar
												</button>
											</div>
										) : (
											<span className="text-sm text-slate-400">No hay archivo seleccionado</span>
										)}
									</div>
								</div>

								{/* Preview for images */}
								{filePreview && (
									<div className="mt-3">
										<img src={filePreview} alt="preview" className="max-h-40 rounded-md border border-gray-200 object-contain" />
									</div>
								)}
							</div>

							<label className="flex items-center gap-3 mt-2 text-sm">
								<input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="w-4 h-4 rounded border-slate-700 bg-slate-900" />
								<span className="text-slate-300">Confirmo que realicé el pago y adjunté el comprobante.</span>
							</label>

							<div className="flex items-center gap-3 mt-4">
								<button type="submit" disabled={uploading} className="px-5 py-2 rounded bg-amber-400 text-slate-900 font-medium disabled:opacity-60">
									{uploading ? `Enviando (${progress}%)...` : 'Enviar comprobante'}
								</button>

								<button
									type="button"
									onClick={() => {
										setSelected({});
										setEmail('');
										removeFile();
										setConfirmed(false);
										setMessage(null);
									}}
									className="px-4 py-2 rounded border border-slate-700 text-slate-200">
									Limpiar
								</button>
							</div>

							{uploading && (
								<div className="mt-3 w-full bg-slate-700 rounded overflow-hidden">
									<div className="h-2" style={{ width: `${progress}%`, backgroundColor: '#f59e0b' }} />
								</div>
							)}

							{message && <div className="mt-4 text-sm text-amber-600">{message}</div>}
						</div>
					</form>
				</div>

				<aside className={`${cardCls} flex flex-col items-center gap-4`}>
					<div className="w-full max-w-xs bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl shadow-xl border border-amber-500/10">
						<div className="w-full h-40 rounded-md overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
							<img src="/caratula.png" alt="Libros" className="object-contain h-full" />
						</div>

						<div className="mt-3 text-center">
							<p className="text-sm text-slate-300">Compra Second Pearl Harbor</p>
							<p className="text-xs text-amber-300 font-semibold mt-1">Envíanos el comprobante y confirma tu pedido</p>
						</div>

						<div className="mt-4 flex items-center justify-center gap-3">
							<a href={mailtoContact} className="px-4 py-2 rounded-md bg-amber-400 text-slate-900 font-semibold text-sm shadow hover:brightness-95 transition inline-flex items-center justify-center" aria-label="Enviar correo para más información">
								Contacto
							</a>
						</div>
					</div>

					<div className={`${bannerCls} w-full max-w-xs bg-amber-50 text-slate-900 p-3 rounded-md border border-amber-300 shadow-md`}>
						<p className="text-sm font-semibold">¿Dudas o prefieres pago directo?</p>
						<p className="text-xs mt-1 text-slate-700">Escríbenos y te orientamos con el proceso de pago.</p>
						<a href={`mailto:${contactEmail}`} className="mt-2 inline-block text-xs font-medium underline text-amber-600">
							{contactEmail}
						</a>
					</div>

					{/* Right column: resumen y CTA */}
					<aside className={`${cardCls} bg-slate-800 p-4 rounded-md border border-amber-500/10`}>
						<div className="w-full text-center">
							<p className="text-sm text-slate-300">Resumen de la orden</p>
							<ul className="mt-3 text-left text-sm text-slate-200 space-y-2">
								{PRODUCTS.map(
									(p) =>
										selected[p.id] && (
											<li key={p.id} className="flex items-center justify-between">
												<span>{p.title}</span>
												<strong>{formatCurrency(p.price)}</strong>
											</li>
										)
								)}
							</ul>
							<div className="mt-4 border-t border-slate-700 pt-3">
								<div className="flex items-center justify-between">
									<span className="text-sm text-slate-300">Total</span>
									<strong className="text-2xl text-amber-300">{formatCurrency(total)}</strong>
								</div>
								<p className="text-xs mt-2 text-slate-400">Selecciona el método utilizado y sube tu comprobante para confirmar.</p>
							</div>
							<a href={mailtoContact} className="mt-4 inline-block px-4 py-2 rounded-md bg-amber-400 text-slate-900 font-semibold text-sm shadow hover:brightness-95 transition">
								Contacto
							</a>
						</div>
					</aside>
				</aside>
			</main>

			<footer className="mt-8 text-center text-xs text-slate-600">Todo uso sujeto a reglamento en la página web.</footer>
		</section>
	);
}
