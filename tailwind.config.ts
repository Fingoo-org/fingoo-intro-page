import type { Config } from "tailwindcss"
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
    xxs: '375px',
    xs: '481px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
    },
    extend: {
      colors: {
        fingoo: {
          main: '#6ccabf',
          sub: '#B5E4DF',
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        underline: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        underline: 'underline 1s ease-out forwards',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config