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
  "settings": {
    "react": {
      "version": "16.4"
    }
  },
  "rules": {
    "react/prop-types": "warn",
    "react/no-deprecated": "warn",
    "react/jsx-filename-extension": "error",
    "no-unused-vars": "warn",
    "no-console": "warn",
    "prettier/prettier": [
      "error",
      {
        "semi": false,
        "singleQuote": true,
        "trailingComma": "es5"
      }
    ]
  }
};
