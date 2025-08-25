// components/QuienesSomos.tsx
'use client';

import Image from 'next/image';

const team = [
	{
		name: 'Jaime',
		role: 'Presidencia',
		image: '/pexels-olly-874158.jpg',
		description: 'Encargado de liderar estrategias corporativas y toma de decisiones clave.',
	},
	{
		name: 'Dr. Jesus',
		role: 'Gerencia',
		image: '/pexels-mastercowley-1300402.jpg',
		description: 'Especialista en desarrollo de estrategias empresariales y dirección de proyectos.',
	},
	{
		name: 'Dr. Tullio',
		role: 'Gerencia',
		image: '/pexels-justin-shaifer-501272-1222271.jpg',
		description: 'Con visión estratégica para el crecimiento sostenible y expansión internacional.',
	},
	{
		name: 'Erica',
		role: 'Directora de Control',
		image: '/pexels-olly-733872.jpg',
		description: 'Coordina procesos internos y asegura eficiencia en cada área de la empresa.',
	},
	{
		name: 'Lourdes',
		role: 'Directora de Internet',
		image: '/pexels-danxavier-1239291.jpg',
		description: 'Especialista en innovación digital y estrategias de transformación tecnológica.',
	},
	{
		name: 'María',
		role: 'Directora de Comunicación y Marketing',
		image: '/pexels-olly-774909.jpg',
		description: 'Brinda soluciones de comunicación estratégica para fortalecer la marca.',
	},
];

export default function QuienesSomos() {
	return (
		<section id="quienes-somos" className="py-20 bg-gradient-to-b from-gray-50 to-white">
			<div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
				{/* Encabezado */}
				<h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Corporación Ejecutiva Internacional</h2>
				<p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">Gente Emprendedora Empresarial - Somos una empresa de conocimientos.</p>
				<p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">Brindamos a nuestro público mentorías internacionales con métodos personalizados y coaching individual, garantizando resultados tangibles. Además, apoyamos a empresas con estrategias de marketing que generan crecimiento en ventas y fidelización de clientes.</p>

				{/* Grid del equipo */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
					{team.map((member, index) => (
						<div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 p-8 text-center">
							<div className="w-32 h-32 mx-auto relative rounded-xl overflow-hidden shadow-lg">
								<Image src={member.image} alt={member.name} fill className="object-cover" />
							</div>
							<h3 className="mt-6 text-xl font-semibold text-gray-900">{member.name}</h3>
							<p className="text-accent-600 font-medium">{member.role}</p>
							<p className="mt-4 text-gray-600 text-sm leading-relaxed">{member.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
