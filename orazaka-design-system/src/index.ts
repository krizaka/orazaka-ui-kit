/**
 * @file index.ts
 * @description Public surface of `@krizaka/orazaka-design-system` — the Orazaka identity on the Krizaka platform:
 * the theme (`./theme.css`, --kz-* overrides; import it once at the app root, after `tailwindcss`), the product
 * composites, and the @krizaka/ui primitives re-exported so the apps importing them from here keep working.
 */

// ── Design tokens (framework-agnostic, from orazaka-shared) ─────────────────
// The token values for React Native and the CLI (the Orazaka orange of @krizaka/tokens/native). The web theme is
// theme.css (--kz-* roles).
export type { ThemeColors, ThemeName, Tokens } from "@krizaka/orazaka-shared";
export { radius, shadows, status, themes, tokens, typeScale } from "@krizaka/orazaka-shared";

// ── Class helpers ───────────────────────────────────────────────────────────
export { cn } from "@krizaka/ui/cn";

// ── Icon registry ───────────────────────────────────────────────────────────
export type { IconName } from "./icon";
export { Icon } from "./icon";

// ── Primitives from @krizaka/ui (re-exported) ───────────────────────────────
export type { BadgeProps, BadgeVariant, BadgeVariants } from "./components/Badge";
export { Badge, badgeVariants } from "./components/Badge";
export type { ButtonProps, ButtonVariants, IconButtonProps } from "./components/Button";
export { Button, buttonVariants, IconButton } from "./components/Button";
export type { InputProps } from "./components/Input";
export { Field, Input, Select, Textarea } from "./components/Input";
export type { SkeletonProps } from "./components/Skeleton";
export { Skeleton, SkeletonGroup, skeletonVariants } from "./components/Skeleton";

// ── 1.x APIs drawn by their @krizaka/ui primitive (deprecated, removed in 3.0) ──
// Card* → `Card.*` from @krizaka/ui/card · Dialog → `Dialog.*` from @krizaka/ui/dialog · ToastContainer → `Toaster` +
// `toast` from @krizaka/ui/toast. They keep the 1.x props and look; no markup of their own any more.
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/Card";
export type { DialogProps } from "./components/Dialog";
export { Dialog } from "./components/Dialog";
export type { ToastContainerProps, ToastItem, ToastVariant } from "./components/Toast";
export { ToastContainer } from "./components/Toast";

// ── Orazaka composites ──────────────────────────────────────────────────────
export type { ChatShowcaseLabels, ChatShowcaseProps } from "./components/ChatShowcase";
export { ChatShowcase } from "./components/ChatShowcase";
export type { CommandPaletteItem, CommandPaletteLabels, CommandPaletteProps } from "./components/CommandPalette";
export { CommandPalette } from "./components/CommandPalette";
export { SentinelMini } from "./components/SentinelMini";
