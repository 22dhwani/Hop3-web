const prettierConfig = require('./.prettierrc.js');
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // Possible errors
    'no-console': 'off',
    // Best practices
    'dot-notation': 'error',
    'no-else-return': 'error',
    'no-floating-decimal': 'error',
    'no-sequences': 'error',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    // Stylistic
    'array-bracket-spacing': 'error',
    'computed-property-spacing': ['error', 'never'],
    curly: 'error',
    'no-lonely-if': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-unneeded-ternary': 'error',
    'one-var-declaration-per-line': 'error',
    // ES6
    'array-callback-return': 'off',
    'prefer-const': 'error',
    // Imports
    'import/prefer-default-export': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'no-unused-expressions': 'off',
    'no-prototype-builtins': 'off',
    // REACT
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/href-no-hash': [0],
    'react/display-name': 0,
    'react/no-deprecated': 'error',
    'react/no-unsafe': [
      'error',
      {
        checkAliases: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Prettier
    // eslint looks for the prettier config at the top level of the package/app
    // but the config lives in the `config/` directory. Passing the config here
    // to get around this.
    'prettier/prettier': ['error', prettierConfig],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
