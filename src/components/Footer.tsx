// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-primary-50 border-t">
			<div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
				<div>
					<h4 className="font-semibold text-lg text-primary-700">Corporacion Ejecutira Internacional</h4>
					<p className="mt-2 text-sm text-primary-500">Edición seleccionada • Atención profesional</p>
				</div>

				<div>
					<h5 className="font-medium text-sm text-primary-700">Enlaces</h5>
					<ul className="mt-3 space-y-2 text-sm">
						<li>
							<Link href="#libros">Libros</Link>
						</li>
						<li>
							<Link href="#autor">Autor</Link>
						</li>
						<li>
							<Link href="#contacto">Contacto</Link>
						</li>
					</ul>
				</div>

				<div>
					<h5 className="font-medium text-sm text-primary-700">Contacto</h5>
					<p className="mt-3 text-sm">email@tulibreria.com</p>
					<p className="text-sm">Tel: +34 600 000 000</p>
				</div>
			</div>

			<div className="border-t py-4 text-center text-xs text-primary-400">© {new Date().getFullYear()} Corporacion Ejecutira Internacional. Todos los derechos reservados.</div>
		</footer>
	);
}
