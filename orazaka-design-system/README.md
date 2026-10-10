# @krizaka/orazaka-design-system

The Orazaka identity on the Krizaka platform: the **Orazaka Orange** theme (the Orazaka brand of `@krizaka/tokens`)
and its named themes as `--kz-*` token
overrides, the product composites, and the [`@krizaka/ui`](https://github.com/krizaka/krizaka-ui) primitives
re-exported. Part of [orazaka-ui-kit](https://github.com/krizaka/orazaka-ui-kit).

## Install

```bash
npm install @krizaka/orazaka-design-system && npm install -D tailwindcss
```

React 19, Next.js ≥ 15, Tailwind CSS v4. The package ships its TypeScript sources: add it to `transpilePackages`.

```ts
// next.config.ts
transpilePackages: ["@krizaka/orazaka-design-system", "@krizaka/orazaka-shared", "@krizaka/ui"],
```

The app's global stylesheet — `theme.css` brings the platform layers (`@krizaka/tailwind`, `@krizaka/ui/tailwind.css`)
itself:

```css
@import "tailwindcss";
@import "@krizaka/orazaka-design-system/theme.css";
```

## Themes

One mechanism, the organisation's: **dark** is the default (`:root`), **light** is `html.light`, a **named theme** is
`html.theme-<name>` — `electric` (Electric Blue, the 2.x identity), `custom` (Deep Violet), `cyberpunk` (Neon Matrix), `solarized` (Warm Parchment, light),
`krizaka` (Obsidian Razor, zero radius). A named theme also works as an island: `.theme-<name>` on
any element gives it that theme inside any page (as `.theme-dark` does for dark) — a theme picker draws real previews.
A theme is a set of token values, never a set of classes: components write
roles (`bg-surface-1`, `text-fg-secondary`, `border-border-subtle`, `bg-accent text-on-accent`, `text-danger`) and
read right in every theme.

| Role | Dark | Light |
| :--- | :--- | :--- |
| `--kz-accent` | `hsl(26 92% 55%)` #f67e23 | `hsl(26 90.5% 37.1%)` #b45309 (the mark's deep stop) |
| `--kz-accent-hover` | `hsl(26 92% 62%)` | `hsl(26 90% 31%)` |
| `--kz-on-accent` | `hsl(240 6% 5%)` — 7.4:1 | white — 5.1:1 |
| `--kz-accent-text` (`text-fg-accent`) | `hsl(26 92% 60%)` | `hsl(26 90% 32%)` |
| `--kz-accent-2` | `#f59e0b` (the mark's light stop) | `hsl(32 95% 33%)` |
| `--kz-info` | blue `hsl(217 92% 60%)` — an orange "info" would read as a warning | `hsl(217 92% 50%)` |
| surfaces, borders, text | the platform's (`@krizaka/tokens`, the krizaka.com values) | idem |

These values are **not declared here**: `theme.css` imports `@krizaka/tokens/brands/orazaka.css`, the Orazaka brand of
the Krizaka brand system (`@krizaka/tokens`, `BRAND.md`) — the orange of the Orazaka mark. A change of colour is made
there, released, then adopted.

Every theme is tested at WCAG AA (`src/__tests__/theme.test.ts`): primary and secondary text ≥ 4.5:1 on every
surface, muted text ≥ 3:1, on-accent ≥ 4.5:1 on the accent and its hover, the accent as text ≥ 4.5:1 on every
surface, focus ring ≥ 3:1.

## Contents

| | |
| :--- | :--- |
| **Theme** | `theme.css`: the `--kz-*` overrides above, the named themes, the product tokens (`--orazaka-*`), the fluid type scale, the Orazaka layout classes (`glass-card`, `login-*`, `sentinel-*`…). |
| **Composites** | `ChatShowcase`, `SentinelMini`, `Icon` (the icon registry), `CommandPalette` (the ⌘K palette on `CommandDialog` from `@krizaka/ui/command`: entries and words as props, `onNavigate`). |
| **Re-exported from `@krizaka/ui`** | `Button` (default variant `primary`, as in 1.x), `IconButton`, `buttonVariants`, `Badge` (`variant` → deprecated alias of `tone`), `badgeVariants`, `Input`, `Field`, `Textarea`, `Select`, `Skeleton` (`variant`, `width`, `height` deprecated), `skeletonVariants`, `cn`. New code imports them from `@krizaka/ui`. |
| **Deprecated 1.x APIs** | `Card*`, `Dialog`, `ToastContainer` keep their 1.x props and look but are drawn by the `@krizaka/ui` primitive (`card`, `dialog`, `toast`) — no markup of their own. New code writes `Card.*`, `Dialog.*`, `Toaster` + `toast` from `@krizaka/ui`. **Removed in 3.0**, with the 1.x defaults of `CommandPalette` (English words, 1.x routes). |
| **Tokens** | `tokens`, `themes`, `radius`… re-exported from `@krizaka/orazaka-shared` (for React Native and the CLI: the same Orazaka orange as `theme.css`, from `@krizaka/tokens/native`). |
| **2.x compatibility** | The 1.x variables (`--surface-1`, `--accent`, `--text-primary`…), their utilities (`text-text-primary`, `bg-card-bg`, `bg-status-success`…) and the 1.x theme classes (`html.dark`, `html.cyberpunk`…) are mapped onto the roles, for the apps not yet migrated. **Removed in 3.0.** |

A product variant extends a primitive, it never copies it:

```ts
import { buttonVariants } from "@krizaka/ui/button";
import { tv } from "tailwind-variants";

export const orazakaButton = tv({ extend: buttonVariants, variants: { variant: { glow: "shadow-lg shadow-accent/30" } } });
```

## Develop

```bash
npm run check      # eslint (+ krizaka-ratchet at zero), type-check, Jest, publint
```

Apache-2.0 · Part of [Krizaka](https://www.krizaka.com).
