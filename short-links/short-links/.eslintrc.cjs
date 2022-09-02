/* eslint-env node */

require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    'prettier',
  ],
  rules: {
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    '@typescript-eslint/no-unused-vars': ['off'],
  },
};
