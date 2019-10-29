module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser":true,
    "node": true
  },
  "rules": {
    "semi": 'off',
    "react/prefer-stateless-function": "off",
    "prefer-rest-params": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "space-before-function-paren": ["error", "always"],
    "linebreak-style": [0, "error", "windows"]
  }
}