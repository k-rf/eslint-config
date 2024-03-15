/** @type { import("lint-staged").Config } */
const config = {
  "*.{tsx,ts}": [
    "bash -c 'bun typing'",
    "prettier --write",
    "eslint --cache --fix",
  ],
  "*.js": ["prettier --write", "eslint --cache --fix"],
  "*.json": ["prettier --write"],
};

module.exports = config;
