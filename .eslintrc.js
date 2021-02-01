module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    describe: 'readonly',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier', 'prettier/vue'],
  plugins: ['prettier', 'import'],
  rules: {
    // Import rules
    'import/order': 2,
    'import/first': 2,
    'import/exports-last': 0,
    'import/no-duplicates': 2,
    'import/default': 2,
    'import/newline-after-import': 2,
    'import/no-absolute-path': 2,
    'import/no-webpack-loader-syntax': 2,
    'import/no-self-import': 2,
    'import/no-cycle': 2,
    'import/no-useless-path-segments': 2,
    'import/no-relative-parent-imports': 2,
    'import/no-deprecated': 2,
    'import/no-mutable-exports': 2,
    'import/max-dependencies': [2, {max: 15}],
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    // Vue rules
    'vue/camelcase': 2,
    'vue/require-default-prop': 2,
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],

    // Eslint rules
    eqeqeq: ['error', 'always'],
    camelcase: 'error',
  },
};
