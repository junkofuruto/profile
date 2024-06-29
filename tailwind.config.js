/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'bg-loading-edge': '#031B5A',
      'bg-loading-center': '#0731C6',
    },
    extend: {
      fontFamily: {
        'VT323': ['"VT323"'],
      }
    }
  },
  plugins: [],
}