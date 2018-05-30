module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  "env": {
    "browser": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "rules": {
    "react/prop-types": "warn",
    "react/no-deprecated": "warn",
    "no-unused-vars": "warn",
    "no-console": "warn"
  }
};
