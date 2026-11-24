/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b1b33',
          soft: '#44546a',
          mute: '#6b7c94',
          faint: '#8a99ad',
        },
        graphite: {
          950: '#ffffff',
          900: '#f7fafe',
          850: '#ffffff',
          800: '#fbfdff',
          750: '#f7fafe',
          700: '#e3eaf3',
          600: '#cfdbe9',
        },
        steel: {
          100: '#0b1b33',
          200: '#1a2b45',
          300: '#44546a',
          400: '#5a6b82',
          500: '#6b7c94',
          600: '#8a99ad',
          700: '#cbd8e7',
        },
        amber: {
          100: '#0b1b33',
          200: '#0052a3',
          300: '#0063c6',
          400: '#0c77e2',
          500: '#0063c6',
          600: '#0052a3',
          700: '#0d4f95',
        },
        signal: {
          300: '#9cc7e8',
          400: '#5da6dc',
          500: '#0c77e2',
          600: '#0063c6',
        },
        success: {
          300: '#0f7b43',
          400: '#0f7b43',
          500: '#1f9d55',
          600: '#166534',
        },
        danger: {
          300: '#b91d03',
          400: '#d4351a',
          500: '#d4351a',
          600: '#9f1d0b',
        },
        product: {
          bg: '#f4f8fd',
          surface: '#ffffff',
          soft: '#fbfdff',
          line: '#e3eaf3',
          strong: '#cfdbe9',
          ink: '#0b1b33',
          dim: '#44546a',
          mute: '#6b7c94',
          accent: '#0c77e2',
          accentDeep: '#0063c6',
          plateFrom: '#f8fcff',
          plateTo: '#edf6ff',
          plateLine: '#cfe3f7',
          plateLineHover: '#b9d8f4',
          sky: '#4d9fdd',
          green: {
            DEFAULT: '#0f7b43',
            soft: '#eaf7ef',
            line: '#c9ebd8',
          },
          amber: {
            DEFAULT: '#b45309',
            soft: '#fef6e7',
            line: '#f2dfb4',
          },
          red: {
            DEFAULT: '#b91d03',
            soft: '#fdece8',
            line: '#f5cfc6',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      boxShadow: {
        panel: '0 26px 60px -34px rgba(11, 27, 51, 0.18)',
        lift: '0 28px 70px -40px rgba(11, 27, 51, 0.22)',
        glow: '0 0 0 1px rgba(12, 119, 226, 0.2), 0 18px 45px -30px rgba(12, 119, 226, 0.25)',
        plate: '0 16px 34px -30px rgba(12, 119, 226, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        plateHover: '0 22px 42px -30px rgba(12, 119, 226, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
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
