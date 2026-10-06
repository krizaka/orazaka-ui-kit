/**
 * @file tokens/index.ts
 * @description Framework-agnostic design tokens — the single source of truth for
 * Orazaka's visual language (AGENTS.md §8). Consumed by `orazaka-design-system`
 * (web, which mirrors these as CSS custom properties in `theme.css`), by the
 * mobile client (React Native, which has no CSS), and by the CLI.
 *
 * These are plain values: no React, no CSS, no framework coupling.
 */

/** Per-theme semantic color slots (HSL strings). */
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
}

/** All themes shipped by the design system. */
export type ThemeName =
  | "light"
  | "dark"
  | "custom"
  | "cyberpunk"
  | "solarized"
  | "krizaka";

/** Theme color matrix — mirrored by `orazaka-design-system/theme.css`. */
export const themes: Readonly<Record<ThemeName, ThemeColors>> = {
  light: {
    surface0: "hsl(210, 40%, 98%)",
    surface1: "hsl(0, 0%, 100%)",
    surface2: "hsl(210, 40%, 96%)",
    surface3: "hsl(214, 32%, 91%)",
    borderSubtle: "hsla(0, 0%, 0%, 0.06)",
    borderDefault: "hsla(0, 0%, 0%, 0.10)",
    borderStrong: "hsla(0, 0%, 0%, 0.16)",
    textPrimary: "hsl(222, 47%, 11%)",
    textSecondary: "hsl(215, 16%, 47%)",
    textMuted: "hsl(215, 16%, 65%)",
    accent: "hsl(38, 92%, 50%)",
    accentHover: "hsl(38, 88%, 44%)",
  },
  dark: {
    surface0: "hsl(240, 6%, 3%)",
    surface1: "hsl(240, 5%, 7%)",
    surface2: "hsl(240, 5%, 12%)",
    surface3: "hsl(240, 4%, 15%)",
    borderSubtle: "hsla(0, 0%, 100%, 0.06)",
    borderDefault: "hsla(0, 0%, 100%, 0.10)",
    borderStrong: "hsla(0, 0%, 100%, 0.16)",
    textPrimary: "hsl(0, 0%, 98%)",
    textSecondary: "hsl(240, 4%, 66%)",
    textMuted: "hsl(240, 4%, 34%)",
    accent: "hsl(38, 92%, 50%)",
    accentHover: "hsl(38, 88%, 44%)",
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
    accentHover: "hsl(271, 87%, 59%)",
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
    accentHover: "hsl(296, 100%, 44%)",
  },
  solarized: {
    surface0: "hsl(44, 87%, 94%)",
    surface1: "hsl(44, 52%, 87%)",
    surface2: "hsl(44, 38%, 84%)",
    surface3: "hsl(44, 30%, 81%)",
    borderSubtle: "hsla(0, 0%, 0%, 0.06)",
    borderDefault: "hsla(186, 5%, 60%, 0.35)",
    borderStrong: "hsla(186, 5%, 60%, 0.50)",
    textPrimary: "hsl(192, 14%, 40%)",
    textSecondary: "hsl(192, 11%, 45%)",
    textMuted: "hsl(186, 5%, 60%)",
    accent: "hsl(205, 71%, 49%)",
    accentHover: "hsl(205, 71%, 43%)",
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
    textMuted: "hsl(210, 8%, 38%)",
    accent: "hsl(210, 60%, 55%)",
    accentHover: "hsl(210, 60%, 49%)",
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

/** Status colors (theme-independent). */
export const status = {
  success: "hsl(160, 84%, 39%)",
  error: "hsl(0, 84%, 60%)",
  warning: "hsl(38, 92%, 50%)",
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
