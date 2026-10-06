# Orazaka UI Kit

> @krizaka/orazaka-shared (TypeScript types, Zod schemas, design tokens) and @krizaka/orazaka-design-system (React components, Tailwind preset, theme, icon registry) for Next.js and React Native apps.

**Layer:** Foundation — reusable by any Krizaka application · **Version:** `1.0.0-SNAPSHOT` · **License:** Apache-2.0 ·
part of the [Orazaka platform](https://github.com/krizaka/orazaka) by [Krizaka](https://krizaka.com)

## What it provides

| Package | Role |
|:---|:---|
| `@krizaka/orazaka-shared` | Framework-agnostic TypeScript types, Zod schemas and **design tokens** — consumed by web, mobile and CLI. |
| `@krizaka/orazaka-design-system` | Web React components, Tailwind preset, theme (`theme.css`), centralized Lucide icon registry. |

## Use it

```bash
echo "@krizaka:registry=https://npm.pkg.github.com" >> .npmrc
npm install @krizaka/orazaka-shared @krizaka/orazaka-design-system
```

```ts
// next.config.ts
transpilePackages: ["@krizaka/orazaka-design-system", "@krizaka/orazaka-shared"],
```

Rules: no React component in `orazaka-shared`; no component duplicated between apps — it belongs
here.

## Position in the platform

| | |
|:---|:---|
| Depends on | _none — this repository is a root of the dependency graph._ |
| Used by | [`orazaka-web-client`](https://github.com/krizaka/orazaka-web-client) · [`orazaka-web-admin`](https://github.com/krizaka/orazaka-web-admin) · [`orazaka-mobile-client`](https://github.com/krizaka/orazaka-mobile-client) |
| Workspace path | `orazaka-apps/ui/orazaka-ui-kit` |

## Build

**Inside the Orazaka workspace** (npm workspaces link `@krizaka/*` packages from source):

```bash
git clone https://github.com/krizaka/orazaka.git && cd orazaka
node scripts/workspace.mjs clone
cd orazaka-apps/ui && npm install
```

**Standalone**: add `@krizaka:registry=https://npm.pkg.github.com` to `.npmrc`, then `npm install`.

Requirements: Node.js 22+.

## Governance

This repository follows the Orazaka governance contract — [AGENTS.md](https://github.com/krizaka/orazaka/blob/main/AGENTS.md)
in the workspace is normative; the local [AGENTS.md](AGENTS.md) only scopes it to this repository.

## License

Apache License 2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE).
