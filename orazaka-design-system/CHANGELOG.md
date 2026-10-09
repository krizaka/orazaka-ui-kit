# Changelog

All notable changes to `@krizaka/orazaka-design-system`. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions: [Semantic Versioning](https://semver.org/).

## [2.1.0] — 2026-10-09

### Added

- A named theme also works as an **island**: `.theme-custom`, `.theme-cyberpunk`, `.theme-solarized`, `.theme-krizaka` on
  any element give it that theme inside any page — as `.theme-dark` does for dark. A theme picker draws its previews
  with the roles (`bg-surface-1`, `bg-accent`…) inside the island and shows the real tokens. `html.theme-<name>` stays
  the first selector, so it still outweighs `html.light` on the root.

## [2.0.0] — 2026-10-09

The kit becomes a theme and a set of composites on the Krizaka platform (`@krizaka/tokens`, `@krizaka/tailwind`,
`@krizaka/ui` 2). No export is removed: every primitive is re-exported, and the 1.x variables stay mapped until 3.0.

### Changed

- `theme.css` is the **Electric Blue** identity expressed as `--kz-*` role overrides, on the organisation's mechanism:
  dark by default on `:root` (and `.theme-dark`), light on `html.light`, a named theme on `html.theme-<name>`
  (`custom`, `cyberpunk`, `solarized`, `krizaka`). It imports `@krizaka/tailwind` and `@krizaka/ui/tailwind.css`
  itself: the app keeps two lines (`tailwindcss`, then this `theme.css`).
- The accent is the brief's — `hsl(217 92% 60%)` dark, `hsl(217 92% 50%)` light (was amber `hsl(38 92% 50%)`); the
  surfaces, borders and text are the platform's (the krizaka.com values).
- **Contrast adjustments (WCAG AA, tested):** white on the dark accent reads 3.6:1, so the dark accent carries
  near-black text (`--kz-on-accent: hsl(240 6% 5%)`, 5.4:1) and its hover lightens to `hsl(217 92% 66%)` (6.6:1); the
  same holds for the dark named themes and solarized. Solarized text is darker (primary `hsl(192 14% 25%)`, secondary
  `hsl(192 14% 32%)`, muted `hsl(186 5% 42%)` — the 1.x primary read 3.7:1); krizaka muted text is `hsl(210 8% 46%)`
  (was 2.5:1). Named-theme hovers lighten instead of darkening.
- `Button`, `Badge`, `Input`, `Skeleton` are the `@krizaka/ui` primitives. `Button` keeps `primary` as its default
  variant; sizes follow the primitive (`lg` is `h-12`, `icon` is `h-10 w-10`); `ref` is a prop (React 19). `Badge` is
  the platform badge (uppercase, `tone`, `dot`, `pulse`). `Skeleton` keeps `rect` as its default shape.
- `Card*`, `Dialog`, `ToastContainer`, `CommandPalette`, `ChatShowcase` are tokenized: roles only (`bg-surface-1`,
  `text-fg-secondary`, `border-border-subtle`, `text-success` / `text-danger` / `text-warning`), no `[var(--…)]`, no
  `dark:`, no raw palette colour, `cn()` instead of template strings — a `className` override now wins.
- The 1.x `@custom-variant` declarations are gone: `dark:` comes from `@krizaka/tailwind` (`:root:not(.light)`).
- Lint: the four UI rules of `@krizaka/config` (strict) and `krizaka-ratchet` at zero; `check` = lint, type-check, Jest,
  publint (`validate` runs it).
- The theme's own idle and entrance animations stop under `prefers-reduced-motion`.

### Added

- `IconButton`, `buttonVariants`, `badgeVariants`, `Field`, `Textarea`, `Select`, `skeletonVariants`, `cn`, the
  `BadgeVariant` and `ButtonVariants` types.
- Product tokens `--orazaka-accent-glow`, `--orazaka-grid-color`, `--orazaka-space-card`, `--orazaka-space-section`.
- `src/__tests__/theme.test.ts`: every theme resolved over the `@krizaka/tokens` defaults and held to WCAG AA.

### Deprecated

- `Badge` `variant` → `tone` (`default` → `neutral`).
- `Skeleton` `variant` → `shape`; `width` / `height` → a `className` or `style`.
- The **2.x compatibility block** of `theme.css` — the unprefixed 1.x variables (`--surface-*`, `--accent*`,
  `--text-*`, `--border-*`, `--status-*`, `--radius-*`, `--shadow-*`, `--background`, `--card-*`, `--input-*`…), their
  utilities (`text-text-primary`, `bg-card-bg`, `bg-status-success`…) and the 1.x theme classes (`html.custom`,
  `html.cyberpunk`, `html.solarized`, `html.krizaka`). **Removed in 3.0.**

### Removed

- From `theme.css`: the light-on-`:root` / dark-on-`.dark` mechanism and its `prefers-color-scheme` block, the
  `--accent-h/-s/-l` channels, the `@custom-variant` declarations.

### Not changed

- `@krizaka/orazaka-shared` (types, Zod schemas, tokens) — its `themes` keep the 1.x values for React Native and the
  CLI. It is CommonJS and `@krizaka/tokens` is ESM-only, so it cannot import the platform tokens yet; the mobile
  migration does it.
