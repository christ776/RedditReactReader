module.exports = {
  "env": {
    "browser": true
  },
  parser: "babel-eslint",
  extends: "airbnb",
    "rules": {
      "react/jsx-filename-extension": 0,
      "comma-dangle": ["error", "never"]
    },
  plugins: ["react", "jsx-a11y", "import"]
};
