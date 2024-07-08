import { type Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#1967FF',
        'primary-foreground': '#FFFFFF',
        destructive: '#FF004D',
        'destructive-foreground': '#FFFFFF',
        'swifty-color': {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A2A2A8',
          500: '#6E6E76',
          600: '#52525A',
          700: '#3F3F45',
          800: '#2E2E33',
          900: '#1D1D20',
        },
      },
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '8': [8, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '9': [9, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '10': [10, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '11': [11, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '12': [12, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '13': [13, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '14': [14, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '16': [16, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '18': [18, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '20': [20, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '22': [22, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '26': [26, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '32': [32, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
        '40': [40, { lineHeight: 1.5, letterSpacing: '-0.03em' }],
      },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
};

export default config;
