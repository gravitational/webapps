/*
Copyright 2019-2020 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const configFactory = require('./webpack/webpack.base');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  globals: {
    expect: true,
    jest: true,
  },
  ignorePatterns: ['**/dist/**'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['react', 'babel', 'import'],
  overrides: [
    {
      files: ['**/*.test.{ts,tsx,js,jsx}'],
      plugins: ['jest'],
      extends: ['plugin:jest/all'],
      rules: {
        'jest/prefer-called-with': 0,
        'jest/prefer-expect-assertions': 0,
        'jest/consistent-test-it': 0,
        'jest/no-try-expect': 0,
        'jest/no-hooks': 0,
        'jest/no-disabled-tests': 0,
        'jest/prefer-strict-equal': 0,
        'jest/prefer-inline-snapshots': 0,
        'jest/require-top-level-describe': 0,
        'jest/no-large-snapshots': ['warn', { maxSize: 200 }],
      },
    },
  ],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    // <TODO> Enable these rules after fixing all existing issues
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/indent': 0,
    '@typescript/no-use-before-define': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/class-name-casing': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-this-alias': 0,

    // </TODO>
    'comma-dangle': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-alert': 0,
    'import/no-named-as-default': 0,
    'import/default': 2,
    'import/named': 2,
    'import/no-unresolved': 2,
    'no-underscore-dangle': 0,
    'no-case-declarations': 0,
    'prefer-const': 0,
    'no-var': 0,
    'prefer-rest-params': 0,
    'prefer-spread': 0,

    strict: 0,
    'no-console': 1,
    'no-trailing-spaces': 2,
    'react/display-name': 0,
    'react/jsx-no-undef': 2,
    'react/jsx-pascal-case': 2,
    'react/no-danger': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-sort-prop-types': 0,
    'react/jsx-sort-props': 0,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-unknown-property': 1,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 1,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'react/jsx-wrap-multilines': 1,
  },
  settings: {
    react: {
      // React version. "detect" automatically picks the version you have installed.
      version: 'detect',
    },
    'import/resolver': {
      webpack: {
        config: configFactory.createDefaultConfig(),
      },
    },
  },
};
