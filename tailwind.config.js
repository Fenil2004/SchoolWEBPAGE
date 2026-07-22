/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layout.js',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0082AD',
          'teal-dark': '#005F80',
          'teal-light': '#E6F4F8',
          'teal-subtle': '#F0F8FA',
          green: '#7AA13B',
          'green-light': '#8DB843',
          'green-tint': '#F2F7E9',
          dark: '#1E293B',
          gray: '#64748B',
          bg: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 130, 173, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(0, 130, 173, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 25px rgba(0, 130, 173, 0.25)',
      },
    },
  },
  plugins: [],
}

