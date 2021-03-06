module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['webpack.config.ts'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-bitwise': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/consistent-type-imports': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'prettier/prettier': 'off',
    'no-void': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        'module.css': 'never',
      },
    ],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts', 'module.css'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', 'module.css'],
      },
    },
  },
};
