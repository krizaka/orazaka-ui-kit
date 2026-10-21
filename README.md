<!-- krizaka-header -->
<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/krizaka/.github/main/profile/assets/orazaka-dark.svg">
  <img src="https://raw.githubusercontent.com/krizaka/.github/main/profile/assets/orazaka-light.svg" alt="Orazaka" width="96">
</picture>

# Orazaka UI Kit

**The AI that never leaves home.**

@krizaka/orazaka-shared (TypeScript types, Zod schemas, design tokens) and @krizaka/orazaka-design-system (React components, Tailwind preset, theme, icon registry) for Next.js and React Native apps.

[![CI](https://github.com/krizaka/orazaka-ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/krizaka/orazaka-ui-kit/actions/workflows/ci.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/krizaka/orazaka-ui-kit/badge)](https://scorecard.dev/viewer/?uri=github.com/krizaka/orazaka-ui-kit)
[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Orazaka](https://img.shields.io/badge/part%20of-Orazaka-f67e23)](https://github.com/krizaka/orazaka#repositories)
[![Docs](https://img.shields.io/badge/docs-krizaka.com-f67e23)](https://www.krizaka.com/en/products/orazaka)

[Documentation](https://www.krizaka.com/en/products/orazaka) · [Website](https://www.krizaka.com) · [Krizaka on GitHub](https://github.com/krizaka)

</div>
<!-- /krizaka-header -->

**Layer:** Foundation — reusable by any Krizaka application · **Versions:** `@krizaka/orazaka-shared` 1.2.0, `@krizaka/orazaka-design-system` 3.0.0 · **License:** Apache-2.0 ·
part of the [Orazaka platform](https://github.com/krizaka/orazaka) by [Krizaka](https://krizaka.com)

## What it provides

| Package | Role |
|:---|:---|
| `@krizaka/orazaka-shared` | Framework-agnostic TypeScript types, Zod schemas and **design tokens** — consumed by web, mobile and CLI — the job contract (`JobSchema`, `JobPageSchema`) included. The `dark` and `light` themes are the Orazaka orange of `@krizaka/tokens/native` (held to it by `test/tokens.parity.test.mjs`); text on the accent is `onAccent`. |
| `@krizaka/orazaka-design-system` | The Orazaka identity on the Krizaka platform: the Orazaka Orange theme and its named themes (Electric Blue is the named theme `electric`) as `--kz-*` overrides (`theme.css`), the product composites (`ChatShowcase`, `SentinelMini`, icon registry), the [`@krizaka/ui`](https://github.com/krizaka/krizaka-ui) primitives re-exported. See [its README](orazaka-design-system/README.md) and [CHANGELOG](orazaka-design-system/CHANGELOG.md). |

## Use it

```bash
npm install @krizaka/orazaka-shared @krizaka/orazaka-design-system
```

```ts
// next.config.ts
transpilePackages: ["@krizaka/orazaka-design-system", "@krizaka/orazaka-shared", "@krizaka/ui"],
```

```css
/* the app's global stylesheet — theme.css brings @krizaka/tailwind and the @krizaka/ui sources */
@import "tailwindcss";
@import "@krizaka/orazaka-design-system/theme.css";
```

Themes: dark by default, `html.light`, `html.theme-<name>` (`custom`, `cyberpunk`, `solarized`, `krizaka`).

Rules: no React component in `orazaka-shared`; no component duplicated between apps — it belongs
here.

## Position in the platform

| | |
|:---|:---|
| Depends on | _none — this repository is a root of the dependency graph._ |
| Used by | [`orazaka-web-client`](https://github.com/krizaka/orazaka-web-client) (with its operator console) · [`orazaka-mobile-client`](https://github.com/krizaka/orazaka-mobile-client) |
| Workspace path | `orazaka-apps/ui/orazaka-ui-kit` |

## Build

**Inside the Orazaka workspace** (npm workspaces link `@krizaka/*` packages from source):

```bash
git clone https://github.com/krizaka/orazaka.git && cd orazaka
node scripts/workspace.mjs clone
cd orazaka-apps/ui && npm install
```

**Standalone**: `npm install` — both packages are on the public npm registry, no token needed.

Requirements: Node.js 22+.

Check the design system: `npm run check --workspace=@krizaka/orazaka-design-system` (lint + `krizaka-ratchet`,
type-check, Jest, publint).

## Release

Each package carries its own version (`orazaka-shared/package.json`, `orazaka-design-system/package.json`); the
changes of the design system are in its [CHANGELOG](orazaka-design-system/CHANGELOG.md).

```bash
git tag v<version> && git push origin v<version>   # CI publishes @krizaka/* to npm with provenance
```

The tag runs `node scripts/workspace.mjs publish orazaka-ui-kit` (in [`krizaka/orazaka`](https://github.com/krizaka/orazaka)),
which publishes **both** packages: a package whose version is already on npm makes that step fail. When CI cannot
publish (trusted publishing not configured, or an unchanged package), publish the changed package from an up-to-date
`main` inside the workspace:

```bash
cd orazaka-apps/ui && npm install
npx npm@11 publish --workspace=@krizaka/orazaka-design-system --access public
```

## Governance

This repository follows the Orazaka governance contract — [AGENTS.md](https://github.com/krizaka/orazaka/blob/main/AGENTS.md)
in the workspace is normative; the local [AGENTS.md](AGENTS.md) only scopes it to this repository.

## License

Apache License 2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE).

---

<sub>A Krizaka product · [krizaka.com](https://www.krizaka.com) · Apache-2.0</sub>
