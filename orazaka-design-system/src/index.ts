/**
 * @file index.ts
 * @description Public surface of `@krizaka/orazaka-design-system` — the Orazaka identity on the Krizaka platform:
 * the theme (`./theme.css`, --kz-* overrides; import it once at the app root, after `tailwindcss`), the product
 * composites, and the @krizaka/ui primitives re-exported so the apps importing them from here keep working.
 */

// ── Design tokens (framework-agnostic, from orazaka-shared) ─────────────────
// The 1.x token values, kept for React Native and the CLI. The web theme is theme.css (--kz-* roles).
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

// ── Kept here, tokenized, until their @krizaka/ui primitive ships ───────────
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/Card";
export { CommandPalette } from "./components/CommandPalette";
export type { DialogProps } from "./components/Dialog";
export { Dialog } from "./components/Dialog";
export type { ToastItem, ToastVariant } from "./components/Toast";
export { ToastContainer } from "./components/Toast";

// ── Orazaka composites ──────────────────────────────────────────────────────
export type { ChatShowcaseLabels, ChatShowcaseProps } from "./components/ChatShowcase";
export { ChatShowcase } from "./components/ChatShowcase";
export { SentinelMini } from "./components/SentinelMini";
