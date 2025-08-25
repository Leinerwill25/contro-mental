/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f6f7fb',
					100: '#eef2fb',
					300: '#a5b4fc',
					500: '#1f2937',
					700: '#111827',
				},
				accent: {
					500: '#b98b1f',
				},
				neutral: {
					100: '#f8fafc',
					300: '#e6eef7',
				},
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui'],
				display: ['Merriweather', 'serif'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
