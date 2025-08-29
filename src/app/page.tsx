// app/page.tsx
import React from 'react';
import HeroWithAuthorModal from '@/components/HeroWithAuthorModal';
import BookCarousel from '@/components/BookCarousel'; // ajusta si tu archivo se llama distinto
import QuienesSomos from '@/components/QuienesSomos';
import SupportAnimalsBanner from '@/components/SupportAnimalsBanner';
import TarjetaTuristica from '@/components/TarjetaTuristica';
import AnimalHelpBanner from '@/components/AnimalHelpBanner';
import TarotShowcase from '@/components/TarotShowcase';
import InternationalReviews from '@/components/InternationalReviews';

export default function Home() {
	const books = [
		{
			id: 1,
			title: 'Obra Literaria - Second Pearl Harbor',
			subtitle: 'Temas: El Verdadero Origen Del COVID 19 - El Murcielago Que Se Enamoro De Un Mono? - La Organización Terrorista - El Disfrazado Ataque A Los Estados Unidos De America Y Aliados - El Robo De Las Elecciones Al Presidente Donald Trum El 2020 - Como Operas Los Servicios De Inteligencia En El Mundo.',
			price: '12.00',
			image: '/caratula.png',
			info: 'Extras: La Posible Guerra De Estados Unidos Contra China Reforzada Por Rusia - America Empezo a Despertar.',
			details: 'Todo ello narrado con una claridad y crudeza sorprendente por el escritor e investigador social JAIME BERTOLI CASTAGNETO',
			tag: 'Literatura',
			format: 'Digital',
		},
		{
			id: 2,
			title: 'Mentoría Y Sistema Internacional Método Bértoli',
			subtitle: 'Control Mental Alpha - Tu Mente Cumple Tus Deseos - Duración: 34 Dias, Resultados Inmediatos Garantizados. Control Mental Externo Individual y/o Masivo. Aprende a Materializar tus Deseos.',
			price: '250.00',
			image: '/pexels-timur-weber-8560658.jpg',
			info: 'Investigación profunda y contundente.',
			details: 'Detalles extendidos sobre "Mentoría Y Sistema Internacional Método Bértoli". Contenido adicional: características clave, beneficios y uso recomendado. Precio: €250.00. Para más información específica del producto por favor contáctanos.',
			tag: 'Mentoría',
			format: 'Digital / Física',
		},
		{
			id: 3,
			title: 'Como Tener Éxito En El Amor, Aprende Seducción Subliminal',
			subtitle: 'Este Curso Mentoria Short time te enseña con metodologias de Control Mental ALPHA en DOCE DIAS A SABER BUSCAR Y ENCONTRAR EL AMOR TE ENSEÑA LO PRINCIPAL A SABER CONSERVARLO POR LOS AÑOS DE TODA TU VIDA',
			price: '180.00',
			image: '/pexels-rdne-7490819.jpg',
			info: 'El AMOR es la fuerza MAS PODEROSA QUE EXISTE EN ESTE MUNDO TODOS LOS SERES HUMANOS. LO BUSCAN MUCHOS DESESPERACDAMENTE VEN PASAR SUS VIDAS Y NO LO ENCUENTRAN',
			details: 'Detalles extendidos sobre "Como Tener Éxito En El Amor, Aprende Seducción Subliminal". Contenido adicional: características clave, beneficios y uso recomendado. Precio: €180.00. Para más información específica del producto por favor contáctanos.',
			tag: 'Seducción',
			format: 'Digital / Física',
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
			<SupportAnimalsBanner />
			<AnimalHelpBanner />

			{/* LIBROS - carrusel */}
			<section id="libros" className="py-16">
				<div className="max-w-6xl mx-auto px-6">
					<h2 className="text-2xl font-semibold text-primary-700 mb-8">Nuestros Productos Y Servicios</h2>

					{/* Si quieres autoplay: <BookCarousel books={books} autoplay={5000} /> */}
					<BookCarousel books={books} />
				</div>
			</section>
			<InternationalReviews />
			{/* TAROT SHOWCASE */}
			<section id="quienes-somos" className="py-16 bg-gray-50">
				<div className="max-w-6xl mx-auto px-6">
					<TarjetaTuristica />
				</div>
			</section>
			<TarotShowcase />
		</>
	);
}
