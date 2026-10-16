// @krizaka/ui, @krizaka/tailwind and @krizaka/tokens ship together (tailwind and ui are peers of each other, pinned to
// the same release line). A package that declares one of them on an older major makes npm hoist the old copy to the
// workspace root, where `@import "@krizaka/tailwind"` (theme.css) then resolves a tailwind whose own imports
// (`@krizaka/ui/motion.css`) are not installed next to it: every app build fails (orazaka-web-client main, 2026-10-16).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), "utf8"));
const major = (range) => Number(/(\d+)\./.exec(range)[1]);

test("the design system declares @krizaka/ui, tailwind and tokens on the same major", () => {
  const { dependencies: d } = read("../package.json");
  assert.equal(major(d["@krizaka/tailwind"]), major(d["@krizaka/ui"]), "tailwind vs ui");
  assert.equal(major(d["@krizaka/tokens"]), major(d["@krizaka/ui"]), "tokens vs ui");
});

test("orazaka-shared's @krizaka/tokens is on the design system's major", () => {
  const ds = read("../package.json").dependencies["@krizaka/tokens"];
  const shared = read("../../orazaka-shared/package.json").devDependencies["@krizaka/tokens"];
  assert.equal(major(shared), major(ds));
});
