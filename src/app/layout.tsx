// app/layout.tsx (server component)
import '../../public/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { ReactNode } from 'react';

export const metadata = {
	title: 'Tu Librería - Landing',
	description: 'Landing profesional de libros — Compra y descubre títulos seleccionados.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es">
			<body className="min-h-screen flex flex-col">
				<Navbar />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
