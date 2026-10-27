/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────
//  Guernsey Locksmiths – Tailwind config
//  Brand colours live here. Change them once and rebuild:
//    npm install   (first time only)
//    npm run build
// ─────────────────────────────────────────────────────────────
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Ink black – the black of the GL logo and the van lettering (#181818)
        ink: {
          DEFAULT: '#181818',
          950: '#0f0f0f',
          900: '#181818',
          800: '#232323',
          700: '#373736', // logo shading
          600: '#585856', // logo mid-grey
        },
        // Paper – the off-white of the logo background (#fdfdfb), plus warm tints for sections
        paper: {
          DEFAULT: '#fdfdfb',
          50: '#fdfdfb',
          100: '#f6f5f1',
          200: '#eeece6',
          300: '#e2dfd6',
        },
        // Silver – the van paintwork in the cover photo (#a6a8a9 and friends)
        steel: {
          100: '#ecedec',
          200: '#d8d8d6', // logo light grey
          300: '#b8b8b6',
          400: '#a6a8a9', // van silver
          500: '#888887',
          600: '#676968',
        },
        // Brass – not in the pack; the colour of a traditional key, used sparingly
        // as the one warm accent against the black-and-white logo
        brass: {
          50: '#fbf6ea',
          100: '#f5e9cc',
          200: '#ebd39c',
          300: '#dfb867',
          400: '#d1a043',
          500: '#b8862f',
          600: '#956a22',
          700: '#74521c',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(24,24,24,.05), 0 10px 30px -14px rgba(24,24,24,.22)',
        lift: '0 2px 4px rgba(24,24,24,.05), 0 24px 44px -18px rgba(24,24,24,.32)',
      },
    },
  },
  plugins: [],
};
