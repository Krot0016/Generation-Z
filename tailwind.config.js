/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#080a0c',
          900: '#0c0f12',
          850: '#101317',
          800: '#14181d',
          750: '#191e24',
          700: '#20262d',
          600: '#2a323b',
        },
        steel: {
          100: '#e9edf1',
          200: '#d3dae1',
          300: '#b2bdc7',
          400: '#8e9aa6',
          500: '#6f7b87',
          600: '#55616d',
          700: '#3f4954',
        },
        amber: {
          300: '#f2d9a0',
          400: '#e7bf74',
          500: '#d8a64e',
          600: '#b98736',
          700: '#8f6828',
        },
        signal: {
          300: '#b4c9d9',
          400: '#8faac0',
          500: '#6f92ad',
          600: '#557690',
        },
        success: {
          300: '#b7d0bd',
          400: '#93b49b',
          500: '#72967c',
          600: '#587a62',
        },
        danger: {
          300: '#e2b3a9',
          400: '#cf9186',
          500: '#b87366',
          600: '#95584d',
        },
        product: {
          bg: '#070809',
          surface: '#15171a',
          soft: '#1a1d21',
          line: 'rgba(232, 238, 246, 0.10)',
          strong: 'rgba(232, 238, 246, 0.18)',
          ink: '#e8edf3',
          dim: '#a4adb8',
          mute: '#8794a3',
          accent: '#7ef0a2',
          accentDeep: '#4ade80',
          green: {
            DEFAULT: '#86efac',
            soft: 'rgba(74, 222, 128, 0.10)',
            line: 'rgba(74, 222, 128, 0.26)',
          },
          amber: {
            DEFAULT: '#fcd34d',
            soft: 'rgba(251, 191, 36, 0.10)',
            line: 'rgba(251, 191, 36, 0.28)',
          },
          red: {
            DEFAULT: '#fca5a5',
            soft: 'rgba(248, 113, 113, 0.10)',
            line: 'rgba(248, 113, 113, 0.28)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      boxShadow: {
        panel: '0 24px 60px -38px rgba(0, 0, 0, 0.9)',
        lift: '0 28px 70px -40px rgba(0, 0, 0, 0.95)',
        glow: '0 0 0 1px rgba(231, 191, 116, 0.22), 0 18px 45px -30px rgba(231, 191, 116, 0.35)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        rise: 'rise 0.45s ease both',
        pulseSoft: 'pulseSoft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
