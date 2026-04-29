import type { Config } from 'tailwindcss';

/**
 * PhoenixDX brand tokens — red-and-white identity.
 * Primary 500 (#E11D2B) sampled from the PhoenixDX logo badge.
 * Refine when an official brand guide / Elementor color variables are available.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        phoenix: {
          50: '#FEF2F3',
          100: '#FDE2E4',
          200: '#FBC8CC',
          300: '#F89BA2',
          400: '#F26773',
          500: '#E11D2B',
          600: '#C8161F',
          700: '#A8121C',
          800: '#7A0E16',
          900: '#4A0810',
        },
        ink: {
          50: '#F4F6FA',
          100: '#E5E9F2',
          200: '#C9D0DF',
          300: '#9BA6BD',
          400: '#6B7794',
          500: '#475066',
          600: '#2E3548',
          700: '#1B2030',
          800: '#11141F',
          900: '#0A0C14',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC',
          muted: '#EEF1F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)',
        rise: '0 10px 30px -12px rgb(15 23 42 / 0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
