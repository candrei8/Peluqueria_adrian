/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        luxury: ['Playfair Display', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      colors: {
        // Dark theme colors matching the image
        dark: {
          primary: '#0a0a0a',
          secondary: '#1a1a1a',
          accent: '#2a2a2a',
          card: '#1e1e1e',
        },
        // Gold/Bronze palette from the image
        gold: {
          primary: '#D4AF37',
          accent: '#B8860B',
          light: '#F4E4BC',
          dark: '#8B7355',
          muted: '#9B8B6B',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.2), 0 0 60px rgba(212, 175, 55, 0.1)' 
          },
          '100%': { 
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.3), 0 0 90px rgba(212, 175, 55, 0.2)' 
          },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '475px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};