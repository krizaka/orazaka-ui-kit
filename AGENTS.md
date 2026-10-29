# orazaka-ui-kit — Governance scope (agent-neutral)

> This repository is one component of the **Orazaka platform**. The normative contract is
> [`AGENTS.md`](https://github.com/krizaka/orazaka/blob/main/AGENTS.md) at the root of the Orazaka workspace
> ([`krizaka/orazaka`](https://github.com/krizaka/orazaka)), together with its `.agent/rules/*`. When this repository
> is cloned inside the workspace (`orazaka-apps/ui/orazaka-ui-kit`), that contract is loaded first and applies
> without exception. **No platform rule lives here** — this file scopes it and holds only the design system's own rules and its documentation contract.

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
  Since 3.0 the 1.x adapters (`Card*`, `Dialog`, `ToastContainer`) are gone: apps compose `Card.*`, `Dialog.*`,
  `Toaster` + `toast` from `@krizaka/ui`. `CommandPalette` is a composite on `@krizaka/ui/command`.
- **Roles only**: no raw palette colour, no `light:` / `dark:`, no `[var(--…)]`, no template string in `className`
  (`@krizaka/config` lint, `lint-ratchet.json` at zero). `className` is merged with `cn()`: the override wins.
- **No app dependency**: components receive data **and words** through props (no i18n, no fetching) — `CommandPalette`
  requires its `commands` and `labels` since 3.0; it navigates with `next/navigation` unless given `onNavigate`.
- `theme.css` declares roles and `--orazaka-*` tokens only: the 1.x variables and theme classes left in 3.0.

- **A persona, not an admin**: examples, showcases and recordings speak as a named person with a real need (Eric,
  finance lead) in a believable fictional workspace — never an admin account or an internal label (the registry test
  refuses "admin" in an example).

## The documentation of a component is written here

krizaka.com/docs/orazaka/ui (Overview, Foundations, one page per component) is **generated from this repository** at
every build of the site — the site holds no page, demo or prop table of the kit. A new or changed component of
`@krizaka/orazaka-design-system` comes with:

- a `src/components/<name>.meta.ts` (typed by `src/meta.ts`): summary, **why it exists above Krizaka UI**, status
  (`deprecated` with `since` / `use` / `removedIn` — a deprecated component keeps its page, marked "deprecated → use X"),
  category, when to use / not, best practices, accessibility, the `@krizaka/ui` primitives it is built on
  (`builtOn: ["ui/command"]`), related (`ui/<name>` or a kit component), its imports;
- its named examples, `orazaka-design-system/registry/examples/<name>/<example>.tsx` (≤ 40 lines, a realistic product
  scenario with a persona, importing `@krizaka/orazaka-design-system` as an app does);
- a JSDoc on every prop.

The foundations read `src/theme.css` and `@krizaka/tokens` (roles, both modes, named themes, contrasts, type scale) and
`foundations.meta.ts` (names, uses, the product rules — each quoted from the contract that states it, never invented).
`npm run registry` writes `registry/*.json` (git-ignored, published); `scripts/registry.test.mjs` fails when an exported
component has no meta, an example is missing, a prop has no description, a reference does not resolve or a theme falls
below AA.

## Definition of done

1. `npm run validate` (or `lint` + `build`) is green inside the workspace (`orazaka-apps/ui`) — for the design system,
   `npm run check` (lint + ratchet, type-check, Jest + the registry test, registry, publint) — and `orazaka-web-client` (its operator console included) still
   builds against it.
2. No hard-coded colors, 250-line cap per component, types only from `@krizaka/orazaka-shared` (AGENTS.md §8).
3. A new or changed component has its `meta.ts`, its examples and its props' JSDoc (above).
4. The change ships with its tests — a unit test for logic, a render test for a component, an end-to-end test for a
   route or a flow; a fix starts with a failing test that reproduces the bug. CI runs them and must be green; no test =
   not done (workspace [`AGENTS.md` §9](https://github.com/krizaka/orazaka/blob/main/AGENTS.md#9-testing)).

**Repository layout:** the root follows [krizaka/.github `docs/standards/repo-layout.md`](https://github.com/krizaka/.github/blob/main/docs/standards/repo-layout.md); the CI guard `check-repo-layout` fails on a stray root file, and a justified extra is declared in `.repo-layout.json` with its why.

## 9. Anti-slop (ADR-015)

What a model tends to write and the code does not need. Each line points at the rule that refuses it
([ADR-015](https://github.com/krizaka/.github/blob/main/docs/adr/ADR-015-ai-code-audit-measured-and-enforced.md), [docs/standards/guards.md](https://github.com/krizaka/.github/blob/main/docs/standards/guards.md)).

1. **No defensive null on `@NullMarked` code.** No `Objects.requireNonNull` or `if (x == null)` on a value the type already
   guarantees. Enforced by NullAway at compile time; a new package is `@NullMarked` (ArchUnit).
2. **A closed set is a type.** An enum, a sealed interface or an `as const` object, never a string compared by hand;
   strategies are a `Map<Kind, Strategy>` built once at startup. Enforced by PMD / ArchUnit (Java) and `no-enum-string-compare` (ast-grep).
3. **HTTP in Java is a DTO record, `@Valid` and `ProblemDetail`.** No `Map.of("error", …)`, no entity in a response, one
   `@RestControllerAdvice` per service. Enforced by ArchUnit.
4. **No `*Utils`, `*Helper` or `*Manager`.** Name the thing by what it does (§4). Enforced by ArchUnit (ADR-015 §5).
5. **`?.` and `??` in TypeScript**, not a chain of `&&` or a ternary on null. The target rules are `@typescript-eslint/prefer-optional-chain` and `prefer-nullish-coalescing`; they are not in `@krizaka/config` yet.
6. **The build is the judge.** Compile, lint and test before every push; `krizaka-edit-check` runs on each edit (below) and
   NullAway and ArchUnit run at pre-push and in CI. A rule is never silenced to get green.

**The edit hook.** Every repository adds this to `.claude/settings.json`. After each `Edit` or `Write`, the one file is
checked in under 10 s: ESLint with the repository's config for TypeScript, PMD with the Krizaka rules for Java (never Maven).
A finding comes back to the agent (exit 2); a timeout is silent.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "npx --yes -p @krizaka/config krizaka-edit-check", "timeout": 10 }]
      }
    ]
  }
}
```

In a TypeScript repository that already depends on `@krizaka/config`, use `npx --no-install krizaka-edit-check` (no download).
