import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist", "node_modules", "coverage"] },

  // Applies to every config object below, including the plugin presets.
  { settings: { react: { version: "18.2" } } },

  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs["recommended-latest"],

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { "react-refresh": reactRefresh },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Off deliberately. The `prop-types` runtime shipped ~9 kB gzip of validation
      // machinery to every visitor of a static site whose props are all literal
      // build-time imports. Component contracts are documented with JSDoc instead.
      "react/prop-types": "off",
      // Kept ON deliberately: target="_blank" without rel="noreferrer" leaks the
      // opener reference and the referrer to every external site linked from here.
      "react/jsx-no-target-blank": ["error", { allowReferrer: false }],
    },
  },

  // Test files run under Vitest globals and touch Node APIs.
  {
    files: ["**/*.test.{js,jsx}", "src/test/**/*.{js,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.vitest },
    },
    rules: {
      // Throwaway harness components in tests don't need runtime prop validation.
      "react/prop-types": "off",
      // Test helpers are never hot-reloaded, so Fast Refresh constraints don't apply.
      "react-refresh/only-export-components": "off",
    },
  },

  // Build/tooling config files are Node, not browser.
  {
    files: ["*.config.js", "*.cjs", "scripts/**/*.{js,mjs}"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
