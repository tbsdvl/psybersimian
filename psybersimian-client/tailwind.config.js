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
      'lamplight-yellow': '#F1B420',
      'honeysuckle': '#DC8391',
    },
    extend: {
      animation: {
				fade: 'fadeIn 2s ease-in-out',
        repeatFade: 'fadeIn 1s ease-in-out infinite;',
			},
			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
      screens: {
        'sm': { 'raw': '(min-width: 375px and min-height: 667px)' }
      },
      fontSize: {
        'super-xs': ['0.6rem', '1rem']
      },
    },
  },
  plugins: [],
}