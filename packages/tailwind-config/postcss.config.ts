import config from './tailwind.config';

module.exports = {
  plugins: {
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: { config },
    autoprefixer: {},
  },
};
