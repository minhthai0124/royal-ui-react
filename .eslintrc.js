module.exports = {
  extends: [
    'eslint-config-react-app',
    'standard',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
    'eslint:recommended'
  ],
  plugins: ['flowtype', 'react', 'prettier', 'standard'],
  rules: {
    'jsx-a11y/href-no-hash': 'off',
    'react/no-string-refs': 'off',
    'no-console': 'off',
    // "prettier/prettier": [
    //   "warn",
    //   {
    // "arrowParens": "avoid",
    // "semi": false,
    // "trailingComma": "none",
    // "endOfLine": "lf",
    // "tabWidth": 2,
    // "printWidth": 80,
    // "useTabs": false,
    // "jsxSingleQuote": true,
    // "singleQuote": true
    //   }
    // ]
  }
}
