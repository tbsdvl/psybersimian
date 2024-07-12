/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blush-red': '#EF3340',
      'midnight-black': '#000c20',
      'ivory': '#FFFAE0',
    },
    extend: {
      animation: {
				fade: 'fadeIn 2s ease-in-out',
			},

			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
    },
  },
  plugins: [],
}