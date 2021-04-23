module.exports = {
  extends: [
    'stylelint-config-standard',
  ],

  ignoreFiles: "./src/assets/scss/vendor/**",

  syntax: 'scss',

  rules: {
    "at-rule-no-unknown": [ true, {
      "ignoreAtRules": [
        "mixin",
        "content",
        "include",
        "for",
        "if",
        "else",
        "else if",
        "font-face",
        "only",
        "media"
      ]
    }],
    "media-feature-name-no-unknown": true,
    "at-rule-empty-line-before": [
      "always",
      {
        "except": [
          "blockless-after-same-name-blockless",
          "first-nested"
        ],
        "ignore": [
          "after-comment"
        ]
      }
    ],
    "declaration-block-single-line-max-declarations": 100,
    "selector-pseudo-element-colon-notation": "single",
  }
}
