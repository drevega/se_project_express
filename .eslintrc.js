module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "no-console": ["warn", { allow: ["error"] }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
