/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#8B4513',
          800: '#723710',
          900: '#5d2d0c'
        },
        secondary: {
          50: '#fef7ed',
          100: '#feecd3',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#D2691E',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#FF6347',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        surface: '#FAF0E6',
        background: '#FFFDF7',
        warm: {
          50: '#fffdf7',
          100: '#fefcf0',
          200: '#fef7e0',
          300: '#feefca',
          400: '#fde68a',
          500: '#fbbf24',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 16px rgba(139, 69, 19, 0.1)',
        'hover': '0 8px 24px rgba(139, 69, 19, 0.15)'
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FFFDF7 0%, #FAF0E6 100%)',
        'gradient-primary': 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FF6347 0%, #FFA500 100%)'
      }
    },
  },
  plugins: [],
}