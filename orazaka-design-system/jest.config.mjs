import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const kzUi = dirname(require.resolve("@krizaka/ui/package.json"));

/**
 * Standalone jest config for the design-system library (not a Next app, so `next/jest` cannot be used). SWC transforms
 * TSX with the automatic JSX runtime.
 *
 * @krizaka/ui ships ES modules behind an `import`-only export condition, which Jest (CommonJS, `require` condition)
 * does not resolve: its entries are mapped to their files, and SWC transforms them like the sources.
 *
 * @type {import('jest').Config}
 */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@krizaka/ui$": join(kzUi, "dist/index.js"),
    "^@krizaka/ui/(.*)$": join(kzUi, "dist/$1.js"),
  },
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: { syntax: "typescript", tsx: true },
          transform: { react: { runtime: "automatic" } },
        },
        module: { type: "commonjs" },
      },
    ],
  },
  transformIgnorePatterns: ["/node_modules/(?!@krizaka/ui/)"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/index.ts"],
};

export default config;
