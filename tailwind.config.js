/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0c0b09',
        bone: '#f2ede4',
        ember: '#f97316',
        rust: '#2a1608',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
