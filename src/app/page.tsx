// app/page.tsx
import React from 'react';
import HeroWithAuthorModal from '@/components/HeroWithAuthorModal';
import BookCarousel from '@/components/BookCarousel'; // ajusta si tu archivo se llama distinto
import QuienesSomos from '@/components/QuienesSomos';

export default function Home() {
	const books = [
		{
			id: 1,
			title: 'Obra Literaria - Second Pearl Harbor',
			subtitle: 'Temas: El Verdadero Posible Origen del COVID 19 - El Posible Robo De Las Elecciones de E.E.U.U 2020 - El Inminente Peligro De Guerra Mundial Hoy - Como Operan Los Servicios de Inteligencia.',
			price: '16.00',
			image: '/pexels-pixabay-159866.jpg',
			info: 'Edición en digital - Record De Ventas Historico.',
		},
		{
			id: 2,
			title: 'Mentoría Y Sistema Internacional Método Bértoli',
			subtitle: 'Control Mental Alpha - Cumple Tus Deseos',
			price: '250.00',
			image: '/pexels-dom-j-7304-45717.jpg',
			info: 'Investigación profunda y contundente.',
		},
		{
			id: 3,
			title: 'Metodo Control Mental Alpha',
			subtitle: 'Como Tener Exito en el Amor y Como Aprende Seduccion Subliminal',
			price: '180.00',
			image: '/pexels-pixabay-415078.jpg',
			info: 'Idiomas: English Y Español.',
		},
	];

	return (
		<>
			{/* HERO (con modal "Sobre el autor") */}
			<HeroWithAuthorModal />

			{/* QUIÉNES SOMOS */}
			<section id="quienes-somos" className="py-16 bg-gray-50">
				<div className="max-w-6xl mx-auto px-6">
					<QuienesSomos />
				</div>
			</section>

			{/* LIBROS - carrusel */}
			<section id="libros" className="py-16">
				<div className="max-w-6xl mx-auto px-6">
					<h2 className="text-2xl font-semibold text-primary-700 mb-8">Nuestros Productos Y Servicios</h2>

					{/* Si quieres autoplay: <BookCarousel books={books} autoplay={5000} /> */}
					<BookCarousel books={books} />
				</div>
			</section>
		</>
	);
}
