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
      // Disabled in flat config by default to avoid requiring full type information across all files
      // Re-enable per-project or per-file with typed linting when needed
      "@typescript-eslint/no-floating-promises": "off",
      // Ignore unused vars that start with _ (common for placeholders)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  // Scoped overrides: accept temporary 'any' in high-churn UI/provider code
  {
    files: [
      "src/components/providers/**/*.ts?(x)",
      "src/components/decor/**/*.ts?(x)",
      "src/app/log-book/[slug]/page.tsx",
      "src/components/ui/SquircleCard.tsx",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
