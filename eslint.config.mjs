import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";

import globals from "globals";

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
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
);
