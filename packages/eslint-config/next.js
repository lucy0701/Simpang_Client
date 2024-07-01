const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    require.resolve('@vercel/style-guide/eslint/next'),
    'turbo',
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ['only-warn', 'eslint-config-turbo', 'import'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
  ],
  rules: {
    semi: 'off',
    'react/react-in-jsx-scope': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    indent: 'off',
    quotes: 'off',
    'comma-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-trailing-spaces': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': 'error',
    'react/prop-types': 'off',
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    'eol-last': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          ['type', 'internal', 'object'],
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: '@/type/*',
            group: 'external',
          },
          {
            pattern: '{../types, ../types/*}',
            group: 'type',
          },
          {
            pattern: '../interfaces',
            group: 'type',
          },
          {
            pattern: '{../utils/**, ../utils/*}',
            group: 'type',
          },
          {
            pattern: '../constants',
            group: 'type',
          },
          {
            pattern: '../middlewares',
            group: 'index',
          },
          {
            pattern: '@/containers/*',
            group: 'index',
          },
          {
            pattern: '../styles/**',
            group: 'index',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
};
