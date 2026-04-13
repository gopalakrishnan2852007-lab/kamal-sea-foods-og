/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0B3C5D',
        secondary: '#0077B6',
        accent: '#0FA3B1',
        altbg: '#F5F7FA',
        textprimary: '#111827',
        textsecondary: '#6B7280'
      }
    }
  },
  plugins: [],
}
