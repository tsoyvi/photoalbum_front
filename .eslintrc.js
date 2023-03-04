module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0, // <-- Раскомментировать эту строку если возникнут проблемы с CRLF и LF
  },

  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off', // disables line length check
      },
    },
  ],
};
