import type { Config } from 'tailwindcss';

/**
 * PhoenixDX brand palette — dark theme matching phoenix-dx.com.
 *  - phoenix.500 = #E11D2B (brand red, sampled from the logo)
 *  - midnight    = deep-navy surface palette (page bg → cards → borders)
 *  - azure.300   = #9CC8E8 (light blue accent used on phoenix-dx.com hero)
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
        midnight: {
          50: '#F1F5F9',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475066',
          600: '#334155',
          700: '#1E293B',
          800: '#0F172A',
          850: '#0A1628',
          900: '#050B1F',
          950: '#020617',
        },
        azure: {
          200: '#C7DDF0',
          300: '#9CC8E8',
          400: '#7AB7D9',
          500: '#5BA6CA',
          600: '#3F8AB0',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // tighter tracking on display sizes
        'display-sm': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-lg': ['3.75rem', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '700' }],
      },
      boxShadow: {
        'phoenix-glow': '0 10px 40px -10px rgb(225 29 43 / 0.45)',
        'phoenix-glow-soft': '0 10px 30px -12px rgb(225 29 43 / 0.25)',
        'azure-glow': '0 10px 40px -10px rgb(156 200 232 / 0.25)',
        'card': '0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 8px 24px -12px rgb(0 0 0 / 0.5)',
        'lift': '0 20px 50px -20px rgb(0 0 0 / 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'phoenix-cta':
          'linear-gradient(180deg, #ED2A38 0%, #E11D2B 50%, #C8161F 100%)',
        'card-glow':
          'radial-gradient(120% 80% at 0% 0%, rgb(225 29 43 / 0.08) 0%, transparent 55%), radial-gradient(120% 80% at 100% 0%, rgb(156 200 232 / 0.06) 0%, transparent 55%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
