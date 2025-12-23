/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        coral: {
          DEFAULT: '#A0522D', // Sienna Base
          light: '#D2691E',   // Chocolate/Accent
        },
        lime: '#A3E635',
        background: '#F3F4F6',
        foreground: '#000000',
        primary: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF',
        },
        border: '#000000',
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        neo: '6px 6px 0px 0px #000000',
        'neo-sm': '4px 4px 0px 0px #000000',
        'neo-lg': '10px 10px 0px 0px #000000',
      },
      borderRadius: {
        '2xl': '24px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}