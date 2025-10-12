import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  // Allow CommonJS in .cjs utility scripts
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Global hardening rules
  {
    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
    },
    rules: {
      // Safer equality checks
      eqeqeq: ["error", "smart"],
      // Avoid accidental logs in production code
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Prefer const where possible
      "prefer-const": "warn",
      // JSX lists must have keys
      "react/jsx-key": "error",
      // TypeScript-focused: catch forgotten awaits
      "@typescript-eslint/no-floating-promises": "error",
      // Ignore unused vars that start with _ (common for placeholders)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];

export default eslintConfig;
