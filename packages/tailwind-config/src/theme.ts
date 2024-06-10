export const theme = {
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
    },
    fontFamily: {
      Pretendard: ['Pretendard', 'sans-serif'],
    },
  },
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
};
