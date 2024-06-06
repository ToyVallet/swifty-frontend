const config = require('./tailwind.config.js');

module.exports = {
  plugins: {
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: { config },
    autoprefixer: {},
  },
};
