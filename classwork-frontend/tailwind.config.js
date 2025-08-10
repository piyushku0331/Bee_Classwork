/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/contexts/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        genz: {
          bg: '#18181b', // dark background
          card: '#232336',
          accent: '#7c3aed', // purple
          accent2: '#06b6d4', // cyan
          accent3: '#f472b6', // pink
          text: '#f3f4f6', // light text
          muted: '#71717a',
        },
      },
      fontFamily: {
        genz: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

