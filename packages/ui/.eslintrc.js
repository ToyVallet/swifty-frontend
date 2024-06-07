/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    '@swifty/eslint-config/react-internal.js',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
};
