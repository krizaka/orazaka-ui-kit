/**
 * @file tokens/index.ts
 * @description Framework-agnostic design tokens — the single source of truth for
 * Orazaka's visual language (AGENTS.md §8). Consumed by `orazaka-design-system`
 * (web, which mirrors these as CSS custom properties in `theme.css`), by the
 * mobile client (React Native, which has no CSS), and by the CLI.
 *
 * These are plain values: no React, no CSS, no framework coupling.
 */

/**
 * Per-theme colour roles, as CSS colour strings React Native also reads (`#rrggbb`, `rgba()`, `hsl()`).
 * The roles are those of `@krizaka/tokens` (surface, border, text, accent, on-accent, accent-text): text on the
 * accent is `onAccent` — near-black on the dark Orazaka orange, white on the light one — never a fixed white.
 */
export interface ThemeColors {
  readonly surface0: string;
  readonly surface1: string;
  readonly surface2: string;
  readonly surface3: string;
  readonly borderSubtle: string;
  readonly borderDefault: string;
  readonly borderStrong: string;
  readonly textPrimary: string;
  readonly textSecondary: string;
  readonly textMuted: string;
  readonly accent: string;
  readonly accentHover: string;
  /** Text and icons drawn on the accent. */
  readonly onAccent: string;
  /** The accent used as text (links, active labels): ≥ 4.5:1 on every surface. */
  readonly accentText: string;
}

/** All themes shipped by the design system: the two modes, then the named themes. */
export type ThemeName =
  | "light"
  | "dark"
  | "electric"
  | "custom"
  | "cyberpunk"
  | "solarized"
  | "krizaka";

/**
 * Theme colour matrix. `dark` and `light` are the Krizaka platform surfaces with the **Orazaka brand** (the orange of
 * the Orazaka mark), copied from `@krizaka/tokens/native` (`themes` + `brands.orazaka`) — this package is CommonJS and
 * cannot import that ES module, so `test/tokens.parity.test.mjs` fails the build the day the two disagree. The named
 * themes mirror `orazaka-design-system/theme.css`; `electric` is the 1.x blue identity, kept as a choice.
 */
export const themes: Readonly<Record<ThemeName, ThemeColors>> = {
  light: {
    surface0: "#fafafa",
    surface1: "#ffffff",
    surface2: "#f1f1f3",
    surface3: "#e4e4e7",
    borderSubtle: "rgba(0,0,0,0.06)",
    borderDefault: "rgba(0,0,0,0.1)",
    borderStrong: "rgba(0,0,0,0.16)",
    textPrimary: "#18181b",
    textSecondary: "#64646d",
    textMuted: "#808089",
    accent: "#b45309",
    accentHover: "#964608",
    onAccent: "#ffffff",
    accentText: "#9b4808",
  },
  dark: {
    surface0: "#0c0c0e",
    surface1: "#161618",
    surface2: "#1f1f23",
    surface3: "#2a2a2d",
    borderSubtle: "rgba(255,255,255,0.06)",
    borderDefault: "rgba(255,255,255,0.1)",
    borderStrong: "rgba(255,255,255,0.16)",
    textPrimary: "#f5f5f5",
    textSecondary: "#a0a0a7",
    textMuted: "#73737d",
    accent: "#f67e23",
    accentHover: "#f79245",
    onAccent: "#0c0c0e",
    accentText: "#f78c3b",
  },
  electric: {
    surface0: "hsl(240, 6%, 5%)",
    surface1: "hsl(240, 5%, 9%)",
    surface2: "hsl(240, 5%, 13%)",
    surface3: "hsl(240, 4%, 17%)",
    borderSubtle: "hsla(0, 0%, 100%, 0.06)",
    borderDefault: "hsla(0, 0%, 100%, 0.10)",
    borderStrong: "hsla(0, 0%, 100%, 0.16)",
    textPrimary: "hsl(0, 0%, 96%)",
    textSecondary: "hsl(240, 4%, 64%)",
    textMuted: "hsl(240, 4%, 47%)",
    accent: "hsl(217, 92%, 60%)",
    accentHover: "hsl(217, 92%, 66%)",
    onAccent: "hsl(240, 6%, 5%)",
    accentText: "hsl(217, 92%, 68%)",
  },
  custom: {
    surface0: "hsl(270, 100%, 2%)",
    surface1: "hsl(260, 50%, 6%)",
    surface2: "hsl(260, 30%, 10%)",
    surface3: "hsl(260, 24%, 14%)",
    borderSubtle: "hsla(0, 0%, 100%, 0.08)",
    borderDefault: "hsla(0, 0%, 100%, 0.12)",
    borderStrong: "hsla(0, 0%, 100%, 0.18)",
    textPrimary: "hsl(220, 14%, 96%)",
    textSecondary: "hsl(262, 83%, 76%)",
    textMuted: "hsl(240, 5%, 46%)",
    accent: "hsl(271, 91%, 65%)",
    accentHover: "hsl(271, 91%, 72%)",
    onAccent: "hsl(240, 6%, 5%)",
    accentText: "hsl(271, 91%, 72%)",
  },
  cyberpunk: {
    surface0: "hsl(272, 100%, 2%)",
    surface1: "hsl(275, 63%, 8%)",
    surface2: "hsl(272, 55%, 11%)",
    surface3: "hsl(272, 48%, 15%)",
    borderSubtle: "hsla(163, 100%, 50%, 0.12)",
    borderDefault: "hsla(296, 100%, 50%, 0.25)",
    borderStrong: "hsla(163, 100%, 50%, 0.35)",
    textPrimary: "hsl(163, 100%, 50%)",
    textSecondary: "hsl(163, 100%, 75%)",
    textMuted: "hsl(163, 33%, 36%)",
    accent: "hsl(296, 100%, 50%)",
    accentHover: "hsl(296, 100%, 60%)",
    onAccent: "hsl(240, 6%, 5%)",
    accentText: "hsl(296, 100%, 66%)",
  },
  solarized: {
    surface0: "hsl(44, 87%, 94%)",
    surface1: "hsl(44, 52%, 87%)",
    surface2: "hsl(44, 38%, 84%)",
    surface3: "hsl(44, 30%, 81%)",
    borderSubtle: "hsla(0, 0%, 0%, 0.06)",
    borderDefault: "hsla(186, 5%, 60%, 0.35)",
    borderStrong: "hsla(186, 5%, 60%, 0.50)",
    textPrimary: "hsl(192, 14%, 25%)",
    textSecondary: "hsl(192, 14%, 32%)",
    textMuted: "hsl(186, 5%, 42%)",
    accent: "hsl(205, 71%, 49%)",
    accentHover: "hsl(205, 71%, 55%)",
    onAccent: "hsl(240, 6%, 5%)",
    accentText: "hsl(205, 80%, 32%)",
  },
  krizaka: {
    surface0: "hsl(240, 18%, 4%)",
    surface1: "hsl(240, 14%, 7%)",
    surface2: "hsl(240, 10%, 11%)",
    surface3: "hsl(240, 8%, 15%)",
    borderSubtle: "hsla(210, 40%, 80%, 0.06)",
    borderDefault: "hsla(210, 40%, 80%, 0.10)",
    borderStrong: "hsla(210, 40%, 80%, 0.18)",
    textPrimary: "hsl(210, 20%, 92%)",
    textSecondary: "hsl(210, 12%, 60%)",
    textMuted: "hsl(210, 8%, 46%)",
    accent: "hsl(210, 60%, 55%)",
    accentHover: "hsl(210, 60%, 62%)",
    onAccent: "hsl(240, 6%, 5%)",
    accentText: "hsl(210, 60%, 66%)",
  },
};

/** Border-radius scale (px). Krizaka theme overrides these to 0 on the web. */
export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  full: "9999px",
} as const;

/** Fluid type scale (clamp expressions for the web; raw rem mid-points elsewhere). */
export const typeScale = {
  xs: "clamp(0.6875rem, 0.65rem + 0.15vw, 0.75rem)",
  sm: "clamp(0.8125rem, 0.77rem + 0.18vw, 0.875rem)",
  base: "clamp(0.875rem, 0.83rem + 0.2vw, 1rem)",
  lg: "clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)",
  xl: "clamp(1.5rem, 1.3rem + 0.8vw, 2rem)",
  "2xl": "clamp(1.75rem, 1.5rem + 1vw, 2.5rem)",
  display: "clamp(2rem, 1.6rem + 1.6vw, 3rem)",
} as const;

/** Elevation shadow scale. */
export const shadows = {
  xs: "0 1px 2px hsla(0, 0%, 0%, 0.05)",
  sm: "0 1px 3px hsla(0, 0%, 0%, 0.08), 0 1px 2px hsla(0, 0%, 0%, 0.04)",
  md: "0 4px 12px hsla(0, 0%, 0%, 0.08), 0 2px 4px hsla(0, 0%, 0%, 0.04)",
  lg: "0 8px 24px hsla(0, 0%, 0%, 0.10), 0 4px 8px hsla(0, 0%, 0%, 0.04)",
} as const;

/** Status colors (theme-independent), from `@krizaka/tokens/native`. */
export const status = {
  success: "#10b77f",
  error: "#ef4343",
  warning: "#f59f0a",
} as const;

/** The complete token bundle — the single source consumed across web/mobile/cli. */
export const tokens = {
  themes,
  radius,
  typeScale,
  shadows,
  status,
} as const;

export type Tokens = typeof tokens;
