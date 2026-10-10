# orazaka-ui-kit — Governance scope (agent-neutral)

> This repository is one component of the **Orazaka platform**. The normative contract is
> [`AGENTS.md`](https://github.com/krizaka/orazaka/blob/main/AGENTS.md) at the root of the Orazaka workspace
> ([`krizaka/orazaka`](https://github.com/krizaka/orazaka)), together with its `.agent/rules/*`. When this repository
> is cloned inside the workspace (`orazaka-apps/ui/orazaka-ui-kit`), that contract is loaded first and applies
> without exception. **No rule lives here** — this file only scopes it.

## Scope of this repository

- **Role:** @krizaka/orazaka-shared (TypeScript types, Zod schemas, design tokens) and @krizaka/orazaka-design-system (React components, Tailwind preset, theme, icon registry) for Next.js and React Native apps.
- **Layer:** Foundation — reusable by any Krizaka application
- **Depends on:** nothing — never on another repository's Tier-3 implementation (AGENTS.md §2, [SEAM-002]).
- **Workspace path:** `orazaka-apps/ui/orazaka-ui-kit`

## Design-system rules (`@krizaka/orazaka-design-system`, same as the Orochia kit)

- **The theme is token values.** `theme.css` overrides the `--kz-*` roles of `@krizaka/tokens` (dark on `:root`,
  `html.light`, `html.theme-<name>`); product tokens are prefixed `--orazaka-*`. Every theme is tested at WCAG AA
  (`src/__tests__/theme.test.ts`) — a new theme or value passes it.
- **No primitive here.** Button, badge, field, skeleton… come from [`@krizaka/ui`](https://github.com/krizaka/krizaka-ui)
  and are re-exported. A missing primitive is a pull request there, never a local copy. In order: a token
  (`theme.css`), a variant (`tv({ extend })`) or a `className`, a composite that **composes** primitives.
  The 1.x `Card*`, `Dialog`, `ToastContainer` are deprecated adapters drawn by `@krizaka/ui` (card, dialog, toast),
  removed in 3.0; `CommandPalette` is a composite on `@krizaka/ui/command`.
- **Roles only**: no raw palette colour, no `light:` / `dark:`, no `[var(--…)]`, no template string in `className`
  (`@krizaka/config` lint, `lint-ratchet.json` at zero). `className` is merged with `cn()`: the override wins.
- **No app dependency**: components receive data **and words** through props (no i18n, no fetching). The 1.x
  defaults of `CommandPalette` (English words and routes, used only when no `labels` / `commands` are passed) are the
  known exception, removed in 3.0; it navigates with `next/navigation` unless given `onNavigate`.
- The 1.x variables in `theme.css` (the "2.x compatibility" block) are for the apps not yet migrated: never use them
  in this package; they are removed in 3.0.

## Definition of done

1. `npm run validate` (or `lint` + `build`) is green inside the workspace (`orazaka-apps/ui`) — for the design system,
   `npm run check` (lint + ratchet, type-check, Jest, publint) — and `orazaka-web-client` / `orazaka-web-admin` still
   build against it.
2. No hard-coded colors, 250-line cap per component, types only from `@krizaka/orazaka-shared` (AGENTS.md §8).
