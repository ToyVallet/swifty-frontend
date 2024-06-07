import config from './tailwind.config';

export default {
  plugins: {
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: { config },
    autoprefixer: {},
  },
};
