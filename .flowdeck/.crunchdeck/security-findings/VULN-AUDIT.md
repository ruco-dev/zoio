# Vulnerability audit history

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
