/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-blue': '#0C4A6E',
        'dark-blue': '#0F172A',
        'light-blue': '#BAE6FD',
        'red': '#7F1D1D'
      }
    },
  },
  plugins: [],
}