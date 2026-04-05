/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0f1e',
          800: '#111827',
          700: '#1f2937',
        },
        teal: {
          400: '#00d4c8',
          500: '#00b3a6',
        },
        lavender: {
          400: '#a78bfa',
          500: '#8b5cf6',
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 212, 200, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 212, 200, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
