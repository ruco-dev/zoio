# Publish readiness audit history

## 2026-09-07 — NOT READY

**Scope:** npm package `zoio@0.1.0` and its intended public GitHub repository. `package.json` supplies the unscoped npm identity and CLI binary; `PROFILE.md` is absent, so no documented scoped-vs-unscoped policy could be verified.

### 1. Identity

- `npm view zoio` and `npm view @ruco-dev/zoio` both returned registry 404. The local unscoped name is the intended canonical identity because `package.json` names it `zoio`; neither namespace has a published twin to deprecate.
- Local version is `0.1.0`; it has not been published. There is no `CHANGELOG.md`, so the initial release has no consumer-facing release notes.
- Source imports only Node built-ins and local modules. `dependencies` is empty and all declared packages are development-only; no undeclared runtime dependency was found.

### 2. Tarball truth

- `NPM_CONFIG_CACHE=/private/tmp/zoio-npm-audit-cache npm pack --dry-run --json` succeeded after `prepack` built the package. The tarball has 30 files (49,047 bytes unpacked), including `dist/cli.js`, `README.md`, and `LICENSE`; it contains no `.flowdeck/`, `.claude/`, `.env`, or tarball file.
- Warning: `dist/core.test.{d.ts,js,js.map}` ships because all of `dist/` is included. It is harmless but unnecessary release payload.

### 3. Git hygiene

- `git status --short` reports only the ritual card modified by this audit. `origin/master..HEAD` has zero commits.
- No tracked file contradicted an ignore rule. The targeted tracked-content sweep found only intentional documentation/template references to credential names and placeholder email addresses; no credential, client data, or absolute home path was found.
- Required clean-clone paths (`src`, `package.json`, `package-lock.json`, and `scripts`) are not ignored.

### 4. Docs drift

- `README.md` documents every CLI command (`scan`, `explore`, `batch`, `config`, `version`), supported modes, options, and the four environment variables exposed by `src/cli.ts` and `src/config.ts`.
- **BLOCKER:** `CHANGELOG.md` is absent, so `0.1.0` cannot be reconciled with release notes or the pre-tag commit/meld history. There are no Git tags. The audit was restricted from reading other cards' `TODO.md` files, so their commit-envelope reconciliation requires a follow-up review.
- `LICENSE` is MIT and matches `package.json`'s `MIT` declaration. No dual licensing applies.

### 5. Deck state

- Active card directories are `codex-patch-boundary`, `codex-provider-streaming`, and `create-mvp`; their TODO contents were intentionally not read under this run's constraint, so publication-conflict status is not verified.
- No board-level `.flowdeck/_inbox/` exists, which satisfies the manual empty-inbox fallback. `CARD-SENDING.md` is absent.
- The newest vulnerability-audit record is `2026-09-07 | CLEAN | critical: 0, high: 0, moderate: 0, low: 0, info: 0`; the lockfile's latest commit is also 2026-09-07, so the vulnerability gate passes. `security-findings/VULN-AUDIT.md` records no remaining runtime high/critical advisory.

### 6. Platform & CI

- `origin` is `https://github.com/ruco-dev/zoio.git`, but `package.json` has no `repository` field.
- **BLOCKER:** `gh repo view ruco-dev/zoio` returned `HTTP 401: Bad credentials`, so repository existence, visibility, default branch, and canonical-org alignment are unverified.
- Warning: `.github/workflows/` does not exist, so there is no fresh-clone CI workflow to inspect or enforce the passing checks.

### 7. Build smoke

- Passed: `npm run check`; `npm run format:check`; `npm test` (6 passed, 0 failed). The test command builds first and completed in 1.79 seconds.

## BLOCKERS

1. Add and reconcile `CHANGELOG.md` for the initial `0.1.0` release; review commits and meld records that the constrained audit could not read.
2. Establish the package naming policy in the missing product profile and confirm that unscoped `zoio` is the publish identity.
3. Authenticate `gh`, verify the canonical repository/visibility, then add matching `repository` metadata to `package.json`.
4. Review active card contents for contradictory publish work before declaring READY.

## WARNINGS

1. No CI workflow exists for the passing fresh-clone checks.
2. The tarball includes compiled test artifacts.

## Accepted trade-offs

None.
