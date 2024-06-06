/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#1A1B1D',
        'dark-gray-bg': '#242529',
        'primary-color': '#4338CA',
        'light-gray': '#F7F7F7'
      },
    },
  },
  plugins: [],
}