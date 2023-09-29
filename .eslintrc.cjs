module.exports = {
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: { // add this object
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
    plugins: ["@typescript-eslint"],
    root: true,
    rules: {
        "semi": ["error", "never"],
        "no-trailing-spaces": 2,
        "quotes": ["error", "double"],
        "curly": ["error", "all"],
        "@typescript-eslint/no-inferrable-types": "off",
    }
};
