/**
 * @file index.ts
 * @description Public surface of `orazaka-design-system` — the shared web
 * component layer consumed by `orazaka-web-client` and `orazaka-web-admin`
 * (AGENTS.md §8). Components reference the theme via CSS custom properties
 * declared in `./theme.css`; import that stylesheet once at the app root.
 *
 * Design tokens are re-exported from `orazaka-shared` (the framework-agnostic
 * single source); `theme.css` is their web manifestation.
 */

// ── Design tokens (re-exported from the framework-agnostic source) ──────────
export {
  tokens,
  themes,
  radius,
  typeScale,
  shadows,
  status,
} from "@krizaka/orazaka-shared";
export type { Tokens, ThemeColors, ThemeName } from "@krizaka/orazaka-shared";

// ── Icon registry ───────────────────────────────────────────────────────────
export { Icon } from "./icon";
export type { IconName } from "./icon";

// ── Components ───────────────────────────────────────────────────────────────
export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/Card";

export { Badge } from "./components/Badge";
export type { BadgeProps } from "./components/Badge";

export { Dialog } from "./components/Dialog";
export type { DialogProps } from "./components/Dialog";

export { Input } from "./components/Input";
export type { InputProps } from "./components/Input";

export { Skeleton, SkeletonGroup } from "./components/Skeleton";
export type { SkeletonProps } from "./components/Skeleton";

export { ToastContainer } from "./components/Toast";
export type { ToastItem, ToastVariant } from "./components/Toast";

export { CommandPalette } from "./components/CommandPalette";

export { SentinelMini } from "./components/SentinelMini";

export { ChatShowcase } from "./components/ChatShowcase";
export type { ChatShowcaseProps, ChatShowcaseLabels } from "./components/ChatShowcase";
