import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Disable problematic React hooks rules for performance optimizations
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
      // Allow unescaped entities for better readability
      "react/no-unescaped-entities": "off",
      // Allow any type for utility functions
      "@typescript-eslint/no-explicit-any": "off",
      // Allow custom fonts in layout
      "@next/next/no-page-custom-font": "off",
      // Allow img elements for 3D gallery
      "@next/next/no-img-element": "off",
      // Allow unused vars with underscore prefix
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    }
  }
]);

export default eslintConfig;
