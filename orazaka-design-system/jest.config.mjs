/**
 * Standalone jest config for the design-system library (not a Next app, so
 * `next/jest` cannot be used). SWC transforms TSX with the automatic JSX runtime.
 *
 * @type {import('jest').Config}
 */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: { syntax: "typescript", tsx: true },
          transform: { react: { runtime: "automatic" } },
        },
      },
    ],
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/index.ts"],
};

export default config;
