/**
 * @jest-environment node
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * theme.css is the Orazaka identity as --kz-* overrides. These tests resolve every theme the way the browser does
 * (the @krizaka/tokens defaults, then this file's overrides) and hold each one to WCAG AA.
 */

const theme = readFileSync(join(__dirname, "..", "theme.css"), "utf8");
const platform = readFileSync(require.resolve("@krizaka/tokens/tokens.css"), "utf8");

type Declarations = Record<string, string>;

/** Top-level `selector { declarations }` blocks of a stylesheet (comments removed, nested at-rules skipped). */
function blocks(css: string): Map<string, Declarations> {
  const flat = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const out = new Map<string, Declarations>();
  for (const [, selector, body] of flat.matchAll(/([^{}@;]+)\{([^{}]*)\}/g)) {
    const key = selector.trim().replace(/\s+/g, " ");
    const declarations = Object.fromEntries(
      [...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
    );
    out.set(key, { ...out.get(key), ...declarations });
  }
  return out;
}

const kz = blocks(platform);
const own = blocks(theme);

function pick(map: Map<string, Declarations>, selector: string): Declarations {
  const found = map.get(selector);
  if (!found) throw new Error(`no block "${selector}"`);
  return found;
}

const NAMED = ["custom", "cyberpunk", "solarized", "krizaka"] as const;
const named = (name: string) => pick(own, `html.theme-${name}, html.${name}`);

const dark: Declarations = {
  ...pick(kz, ":root, .theme-dark"),
  ...pick(kz, ":root"),
  ...pick(own, ":root, .theme-dark"),
};
const light = { ...dark, ...pick(kz, "html.light"), ...pick(own, "html.light") } as Declarations;
const themes: Record<string, Declarations> = {
  dark,
  light,
  ...Object.fromEntries(NAMED.map((name) => [name, { ...(name === "solarized" ? light : dark), ...named(name) }])),
};

/** The value of a role, `var(--x)` references followed. */
function role(t: Declarations, name: string): string {
  const value = t[`--kz-${name}`];
  if (value === undefined) throw new Error(`--kz-${name} is not set`);
  const ref = value.match(/^var\(--kz-([\w-]+)\)$/);
  return ref ? role(t, ref[1]) : value;
}

/** hsl(h s% l%) / hsl(h, s%, l%) → [r, g, b] in 0..255. */
function rgb(value: string): number[] {
  const m = value.match(/^hsla?\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/);
  if (!m) throw new Error(`unparsed colour ${value}`);
  const [h, s, l] = [Number(m[1]), Number(m[2]) / 100, Number(m[3]) / 100];
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => v * 255);
}

function luminance(value: string): number {
  const [r, g, b] = rgb(value)
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe("theme.css — Electric Blue", () => {
  it("is the accent of the brief: hsl(217 92% 60%) dark, hsl(217 92% 50%) light", () => {
    expect(role(dark, "accent")).toBe("hsl(217 92% 60%)");
    expect(role(light, "accent")).toBe("hsl(217 92% 50%)");
  });

  it("keeps the platform surfaces (the krizaka.com values) and overrides only what is Orazaka's", () => {
    for (const name of ["surface-0", "surface-1", "surface-2", "surface-3", "text-primary", "text-muted"]) {
      expect(role(dark, name)).toBe(pick(kz, ":root, .theme-dark")[`--kz-${name}`]);
      expect(role(light, name)).toBe(pick(kz, "html.light")[`--kz-${name}`]);
    }
  });

  it.each(Object.keys(themes))("reads at WCAG AA in %s", (name) => {
    const t = themes[name];
    for (const surface of ["surface-0", "surface-1", "surface-2", "surface-3"].map((s) => role(t, s))) {
      expect(contrast(role(t, "text-primary"), surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(role(t, "text-secondary"), surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(role(t, "text-muted"), surface)).toBeGreaterThanOrEqual(3);
    }
    // The text and icons on the accent (primary button, sent bubble), at rest and on hover.
    expect(contrast(role(t, "on-accent"), role(t, "accent"))).toBeGreaterThanOrEqual(4.5);
    expect(contrast(role(t, "on-accent"), role(t, "accent-hover"))).toBeGreaterThanOrEqual(4.5);
    // The focus ring stands out from the page (non-text contrast).
    expect(contrast(role(t, "ring"), role(t, "surface-0"))).toBeGreaterThanOrEqual(3);
  });
});

describe("theme.css — mechanism", () => {
  const [roles, compat] = theme.split("2.x COMPATIBILITY");

  it("brings the platform layers first", () => {
    const code = theme.replace(/\/\*[\s\S]*?\*\//g, "");
    const imports = [...code.matchAll(/@import\s+"([^"]+)"/g)].map(([, path]) => path);
    expect(imports).toEqual(["@krizaka/tailwind", "@krizaka/ui/tailwind.css"]);
  });

  it("declares no variant and no `.dark` theme: dark on :root, html.light, html.theme-<name>", () => {
    expect(theme).not.toMatch(/@custom-variant/);
    expect([...own.keys()].some((selector) => /(^|[\s,])\.dark\b/.test(selector))).toBe(false);
    for (const name of NAMED) expect(named(name)["--kz-accent"]).toBeDefined();
  });

  it("writes roles only outside the compatibility block", () => {
    const declared = [...roles.matchAll(/^\s*(--[\w-]+)\s*:/gm)].map(([, name]) => name);
    const unprefixed = declared.filter(
      (name) => !/^--(kz|orazaka)-/.test(name) && !/^--text-(xs|sm|base|lg|xl|2xl|display)$/.test(name),
    );
    expect(unprefixed).toEqual([]);
  });

  it("maps every 1.x variable onto a role until 3.0", () => {
    const compatRoot = blocks(compat.slice(compat.indexOf("*/") + 2)).get(":root") ?? {};
    const legacy = [
      "surface-0", "surface-1", "surface-2", "surface-3",
      "border-subtle", "border-default", "border-strong",
      "text-primary", "text-secondary", "text-muted",
      "accent", "accent-hover", "accent-soft", "accent-glow",
      "status-success", "status-error", "status-warning",
      "radius-sm", "radius-md", "radius-lg", "radius-xl", "radius-full",
      "shadow-sm", "shadow-md", "shadow-lg",
      "space-card", "grid-color", "background", "foreground",
    ];
    for (const name of legacy) expect(compatRoot[`--${name}`]).toMatch(/^var\(--(kz|orazaka)-/);
    expect(compat).toMatch(/removed in 3\.0/);
  });
});
