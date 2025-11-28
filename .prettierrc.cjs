module.exports = {
  tabWidth: 2,
  printWidth: 80,
  semi: true,
  singleQuote: true,
  bracketSameLine: true,
  arrowParens: "avoid",
  singleAttributePerLine: true,
  
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@core/(.*)$",
    "^@server/(.*)$",
    "^@ui/(.*)$",
    "^[./]"
  ],
  importOrderSortSpecifiers: true,
};