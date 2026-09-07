# Vulnerability audit history

## 2026-09-07 — NEEDS ATTENTION

- **Scope:** root npm package `zoio@0.1.0`; npm (`package-lock.json` v3); no workspaces; test command: `npm run build && node --test dist/**/*.test.js`.
- **Audit status:** `npm audit --json` ran against the tracked, clean lockfile but the registry advisory endpoint could not be resolved (`getaddrinfo ENOTFOUND registry.npmjs.org`). No advisory metadata or severity totals are available from this run.
- **Severity totals:** critical: unavailable; high: unavailable; moderate: unavailable; low: unavailable; info: unavailable.
- **Findings:** no individual advisories could be extracted because the audit endpoint was unavailable. The runtime dependency count is zero; the three declared dependencies are dev-only.
- **Outdated context:** `npm outdated --json` returned `{}`.
- **Published artifact:** `npm pack --dry-run --json` (with an isolated writable npm cache) lists only `LICENSE`, `README.md`, and `package.json`; it has no bundled dependencies, `node_modules/`, or vendor tree. The published-version check could not be performed because registry DNS is unavailable.
- **Supply-chain signals:** all lockfile resolutions use the npm registry; no non-registry sources were found. `esbuild` and `fsevents` have install scripts in the current lockfile; there is no prior successful run to diff. Direct-dependency registry metadata and any dedicated scanner results are unavailable/not configured.
- **Tier 2:** skipped — no audit finding or fix plan was available; no files were changed and tests were not run. `node_modules/` is absent, so the declared test command is not currently runnable.
- **Accepted risks:** none.

## 2026-09-07 — NEEDS ATTENTION

- **Scope:** root npm package `zoio@0.1.0`; npm; no workspaces; test command: `npm run build && node --test dist/**/*.test.js`.
- **Audit status:** blocked before `npm audit --json`: dependencies exist (`devDependencies`), but no `package-lock.json`, `npm-shrinkwrap.json`, `yarn.lock`, or `pnpm-lock.yaml` is present. An audit would resolve current latest matching versions rather than the dependency tree that ships.
- **Severity totals:** unavailable (reproducible declared-tree audit not run).
- **Finding:** BLOCKER — generate and commit the npm lockfile with `npm install`, then replay `publish-vuln-audit`.
- **Published artifact:** `npm pack --dry-run --json` lists only `LICENSE`, `README.md`, and `package.json`; no bundled dependencies, `node_modules/`, or vendor tree.
- **Runtime dependencies:** none declared; no dead runtime-dependency review is needed.
- **Tier 2:** skipped — no lockfile and therefore no eligible in-range audit finding. No files were changed.
- **Supply-chain signals:** not assessed because there is no resolved dependency tree. No dedicated scanner configuration was found.
- **Accepted risks:** none.
