# @krizaka/orazaka-design-system

The Orazaka identity on the Krizaka platform: the **Electric Blue** theme and its named themes as `--kz-*` token
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
`html.theme-<name>` — `custom` (Deep Violet), `cyberpunk` (Neon Matrix), `solarized` (Warm Parchment, light),
`krizaka` (Obsidian Razor, zero radius). A named theme also works as an island: `.theme-<name>` on
any element gives it that theme inside any page (as `.theme-dark` does for dark) — a theme picker draws real previews.
A theme is a set of token values, never a set of classes: components write
roles (`bg-surface-1`, `text-fg-secondary`, `border-border-subtle`, `bg-accent text-on-accent`, `text-danger`) and
read right in every theme.

| Role | Dark | Light |
| :--- | :--- | :--- |
| `--kz-accent` | `hsl(217 92% 60%)` | `hsl(217 92% 50%)` |
| `--kz-accent-hover` | `hsl(217 92% 66%)` | `hsl(217 88% 42%)` |
| `--kz-on-accent` | `hsl(240 6% 5%)` — 5.4:1 | white — 5.1:1 |
| surfaces, borders, text | the platform's (`@krizaka/tokens`, the krizaka.com values) | idem |

Every theme is tested at WCAG AA (`src/__tests__/theme.test.ts`): primary and secondary text ≥ 4.5:1 on every
surface, muted text ≥ 3:1, on-accent ≥ 4.5:1 on the accent and its hover, focus ring ≥ 3:1.

## Contents

| | |
| :--- | :--- |
| **Theme** | `theme.css`: the `--kz-*` overrides above, the named themes, the product tokens (`--orazaka-*`), the fluid type scale, the Orazaka layout classes (`glass-card`, `login-*`, `sentinel-*`…). |
| **Composites** | `ChatShowcase`, `SentinelMini`, `Icon` (the icon registry). |
| **Re-exported from `@krizaka/ui`** | `Button` (default variant `primary`, as in 1.x), `IconButton`, `buttonVariants`, `Badge` (`variant` → deprecated alias of `tone`), `badgeVariants`, `Input`, `Field`, `Textarea`, `Select`, `Skeleton` (`variant`, `width`, `height` deprecated), `skeletonVariants`, `cn`. New code imports them from `@krizaka/ui`. |
| **Kept here, tokenized** | `Card*`, `Dialog`, `ToastContainer`, `CommandPalette` — until their `@krizaka/ui` primitive ships (`card`, `dialog`, `toast`, `command`). |
| **Tokens** | `tokens`, `themes`, `radius`… re-exported from `@krizaka/orazaka-shared` (the 1.x values, for React Native and the CLI). |
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
