/**
 * Stylelint config
 * @see https://stylelint.io/
 * @see https://stylelint.io/user-guide/example-config
 */
module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  rules: {
    // Prettier rules
    'prettier/prettier': true,

    // SCSS rules
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/double-slash-comment-whitespace-inside': 'always',

    // Base Stylelint rules
    'selector-combinator-space-after': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'number-leading-zero': 'always',
    'declaration-no-important': true,
    'number-no-trailing-zeros': true,
    'length-zero-no-unit': true,
    'function-name-case': 'lower',
    'color-hex-case': 'lower',
    'unit-case': 'lower',
    'value-keyword-case': 'lower',
    'property-case': 'lower',
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-element-case': 'lower',
    'selector-type-case': 'lower',
    'media-feature-name-case': 'lower',
    'at-rule-name-case': 'lower',
    'rule-empty-line-before': [
      'always',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
};
