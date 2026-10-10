// The design tokens of @krizaka/orazaka-shared are a copy: this package is CommonJS (React Native and the CLI read it)
// and cannot import the ES module @krizaka/tokens/native. This test holds the copy to its source — the Krizaka
// platform surfaces with the Orazaka brand — in both modes. Run after `npm run build` (it reads dist/).
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { brands, themes as platform } from "@krizaka/tokens/native";

const { themes, status } = createRequire(import.meta.url)("../dist/index.js");

/** The roles of the platform theme that the shared theme carries under the same name. */
const PLATFORM_ROLES = [
  "surface0", "surface1", "surface2", "surface3",
  "borderSubtle", "borderDefault", "borderStrong",
  "textPrimary", "textSecondary", "textMuted",
];
/** The roles the Orazaka brand sets. */
const BRAND_ROLES = ["accent", "accentHover", "onAccent", "accentText"];

for (const mode of ["dark", "light"]) {
  test(`${mode}: the platform surfaces, borders and text of @krizaka/tokens`, () => {
    for (const role of PLATFORM_ROLES) assert.equal(themes[mode][role], platform[mode][role], `${mode}.${role}`);
  });

  test(`${mode}: the Orazaka brand accent of @krizaka/tokens (orange, never the 1.x blue or amber)`, () => {
    for (const role of BRAND_ROLES) assert.equal(themes[mode][role], brands.orazaka[mode][role], `${mode}.${role}`);
  });
}

test("status colours are the platform's", () => {
  assert.equal(status.success, platform.dark.success);
  assert.equal(status.error, platform.dark.danger);
  assert.equal(status.warning, platform.dark.warning);
});

test("every theme names every role", () => {
  const roles = Object.keys(themes.dark).sort();
  for (const [name, theme] of Object.entries(themes)) assert.deepEqual(Object.keys(theme).sort(), roles, name);
});
