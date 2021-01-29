/**
 * Stylelint config
 * @see https://stylelint.io/
 * @see https://stylelint.io/user-guide/example-config
 */
module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/double-slash-comment-whitespace-inside': 'always',
    'selector-combinator-space-after': 'always',
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-element-case': 'lower',
    'selector-type-case': 'lower',
    'selector-descendant-combinator-no-non-space': true,
    'number-leading-zero': 'always',
    'declaration-no-important': true,
    'number-no-trailing-zeros': true,
    'length-zero-no-unit': true,
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
