/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'es5',
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always',
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  endOfLine: 'lf',
};

export default prettierConfig;
