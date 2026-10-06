import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

/**
 * Lint for the design system.
 *
 * This package had none — its `lint` script was `tsc --noEmit`, which type-checks and counts
 * nothing. That is why `icon.tsx` reached 841 lines against a documented 250-line cap without a
 * single warning: the rule existed in AGENTS.md §8 and in three other workspaces' configs, and the
 * one package holding the violation was not linted at all.
 */
export default defineConfig([
  globalIgnores(["dist/**", "node_modules/**", "coverage/**"]),
  // Parser only — no rule presets. The one rule this package needs is a line count, and pulling a
  // recommended set here would fail the build on unrelated style the package never opted into.
  { files: ["**/*.{ts,tsx}"], languageOptions: { parser: tseslint.parser } },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "max-lines": ["error", { max: 250, skipBlankLines: false, skipComments: false }],
    },
  },
  {
    // Data registries are exempt, and the exemption is narrow by construction: a `*.registry.tsx`
    // may hold as much data as it likes and nothing else. A registry that grows a component stops
    // being a registry, and the rule below is what says so (AGENTS.md §8).
    files: ["**/*.registry.tsx", "**/*.registry.ts"],
    rules: {
      "max-lines": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "FunctionDeclaration",
          message:
            "A *.registry file holds data only — it is exempt from the 250-line cap on that condition. Move the component to its own file.",
        },
      ],
    },
  },
]);
