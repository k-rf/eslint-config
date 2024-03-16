// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import pluginCspell from "@cspell/eslint-plugin";
import eslint from "@eslint/js";
import configPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginSonarJs from "eslint-plugin-sonarjs";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tsEslint from "typescript-eslint";

import type { ConfigWithExtends } from "typescript-eslint";

/**
 * import に関するルール
 */
export const importRules: ConfigWithExtends = {
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  plugins: {
    import: pluginImport,
    "unused-imports": pluginUnusedImports,
  },
  rules: {
    ...pluginImport.configs["recommended"].rules,
    ...pluginImport.configs["typescript"].rules,

    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: false },
      },
    ],
    "import/namespace": ["error", { allowComputed: true }],

    "unused-imports/no-unused-imports": "error",
  },
};

/**
 * TypeScript に関するルール
 */
export const tsRules: ConfigWithExtends = {
  plugins: {
    "@cspell": pluginCspell,
    sonarjs: pluginSonarJs,
  },
  rules: {
    ...pluginSonarJs.configs["recommended"].rules,
    ...pluginCspell.configs["recommended"].rules,
    ...configPrettier.rules,

    "object-shorthand": ["error", "never"],

    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "none" },
    ],
  },
};

/**
 * テストファイルに関するルール
 */
export const specRules: ConfigWithExtends = {
  files: ["**/*.spec.{,c,m}{j,t}s{,x}"],
  plugins: {
    sonarjs: pluginSonarJs,
  },
  rules: {
    "sonarjs/no-duplicate-string": "off",
  },
};

export const eslintConfig = tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{,c,m}js"],
    extends: [tsEslint.configs.disableTypeChecked],
  },
  importRules,
  tsRules,
  specRules,
);

export default eslintConfig;
