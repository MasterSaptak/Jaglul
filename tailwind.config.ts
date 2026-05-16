/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Prata', 'Merriweather', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        // Bangladesh Flag & Army Color Palette
        bd: {
          green: '#006A4E',
          greenLight: '#008060',
          greenDark: '#004D38',
          red: '#F42A41',
          redDark: '#D91E36',
          olive: '#4A5D23',
          oliveDark: '#3A4A1C',
          forest: '#1A3A2A',
          gold: '#D4AF37',
          goldLight: '#E5C158',
          goldDark: '#B8960B',
          cream: '#FAFAF8',
          warmWhite: '#F5F3EF',
          charcoal: '#2D3436',
          slate: '#636E72',
        },
        army: {
          green: '#006A4E',
          greenLight: '#008060',
          greenDark: '#004D38',
          olive: '#4A5D23',
          oliveDark: '#3A4A1C',
          forest: '#1A3A2A',
          red: '#F42A41',
          redDark: '#D91E36',
          gold: '#D4AF37',
          goldDark: '#B8960B',
          cream: '#FAFAF8',
          navy: '#1E3A5F',
        },
      },
      backgroundImage: {
        'bd-gradient': 'linear-gradient(135deg, #006A4E 0%, #004D38 100%)',
        'bd-flag': 'linear-gradient(180deg, #006A4E 0%, #004D38 100%)',
        'army-gradient': 'linear-gradient(135deg, #006A4E 0%, #1A3A2A 100%)',
        'army-gradient-v': 'linear-gradient(180deg, #1A3A2A 0%, #006A4E 100%)',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
