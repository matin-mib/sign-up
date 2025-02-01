/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-color': 'rgba(224, 252, 241, 1)',
      },
    },
  },
  plugins: [],
}