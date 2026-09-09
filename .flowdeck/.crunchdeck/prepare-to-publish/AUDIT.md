# Publish readiness audit history

## 2026-09-09 — NOT READY

**Scope:** npm package `zoio@0.1.0` and its intended public GitHub repository.

### 1. Identity

- `package.json` and `.flowdeck/.crunchdeck/profile/PROFILE.md` identify unscoped `zoio` as the intended package. Both `npm view zoio --json` and `npm view @ruco-dev/zoio --json` returned registry 404, so neither namespace is published and there is no twin to deprecate.
- The local `0.1.0` has no published counterpart. `CHANGELOG.md` correctly puts `[Unreleased]` above `[0.1.0]`.
- `src/` imports only Node built-ins and local modules; `package.json` has no runtime dependencies, so there are no undeclared or misplaced runtime dependencies.

### 2. Tarball truth

- The required isolated-cache command `npm pack --dry-run --json --cache "$(mktemp -d /tmp/flowdeck-npm-cache.XXXXXX)"` passed. It ran `prepack`, reported 27 files and 41,692 bytes unpacked, and included `dist/cli.js`, `README.md`, `LICENSE`, and `package.json`.
- The inspected listing contains no `.flowdeck/`, `.claude/`, `.env`, `*.tgz`, test artifact, `node_modules`, or bundled dependency tree. Source maps ship with compiled output; they name only the corresponding `src/` paths.

### 3. Git hygiene

- An intermediate inspection showed a modified `.flowdeck/.crunchdeck/prepare-to-publish/TODO.md`, but it had cleared by final inspection without an audit edit; the final audit changes only add this report. The transient state is recorded as a workflow gotcha, not a release blocker.
- `origin/master..HEAD` contains two unpushed commits: `066300c` and `e96cd1d`, both publish-vulnerability-audit deck records. `git check-ignore` found no tracked-versus-ignored contradiction, and package, lockfile, source, scripts, and CI paths are not ignored.
- The targeted tracked-content sweep found no credential, client-data, or publishable absolute-home-path hit. Flowdeck and Claude internal files are tracked but excluded from the npm tarball.

### 4. Docs drift

- `README.md`, `src/cli.ts`, and `src/config.ts` agree on `scan`, `explore`, `batch`, `config`, and `version`; all documented modes, options, and four `ZOIO_*` variables exist. `LICENSE` is MIT and matches `package.json`; no dual licensing applies.
- There are no Git tags. Commit-to-meld-to-`[Unreleased]` reconciliation could not be performed because this ritual was explicitly prohibited from reading any other `TODO.md`; this remains a blocker.

### 5. Deck state

- `.flowdeck/.crunchdeck/security-findings/VULN-AUDIT.md` records a `2026-09-09 — CLEAN` result with zero advisories, newer than the lockfile's last commit (`2026-09-07`), so the vulnerability gate passes.
- `flowdeck inbox --gate` was not run by instruction; the permitted manual fallback found no `.flowdeck/_inbox/` directory. `CARD-SENDING.md` is absent.
- Open-card conflict and false-completion verification cannot be performed without reading other cards' `TODO.md` files; this is a blocker under the supplied audit constraint.

### 6. Platform & CI

- `origin` and `package.json.repository` both point to `https://github.com/ruco-dev/zoio.git`. `gh repo view ruco-dev/zoio` returned HTTP 401, so existence, visibility, default branch, and canonical metadata remain unverified; this is a blocker.
- `.github/workflows/ci.yml` runs `npm ci`, type checking, format checking, and tests on every push and pull request, with no path filters or dependency on ignored files.

### 7. Build smoke

- Passed: `npm run build`, `npm run lint`, `npm run format:check`, and `npm test`. Node reported 6 passing tests, 0 failures, in 2.12 s.

## BLOCKERS

1. Authenticate GitHub CLI and verify `ruco-dev/zoio`'s existence, intended visibility, default branch, and canonical metadata.
2. Authorize active-card and meld-to-notes review, then reconcile commits since the initial release state with `CHANGELOG.md`.
3. Review and push the two commits in `origin/master..HEAD` before publishing.

## WARNINGS

1. Confirm unscoped `zoio` immediately before the first publish: both the unscoped and `@ruco-dev/zoio` namespaces are currently unregistered.

## Accepted trade-offs

- Flowdeck and Claude operational files remain tracked but are excluded from the npm tarball.

## 2026-09-09 — NOT READY

**Scope:** npm package `zoio@0.1.0` and its intended public GitHub repository.

### 1. Identity

- `package.json` and `.flowdeck/.crunchdeck/profile/PROFILE.md` identify the unscoped `zoio` package. Both `npm view zoio --json` and `npm view @ruco-dev/zoio --json` returned 404, so neither namespace is published and there is no twin to deprecate.
- Local version `0.1.0` is unpublished. `CHANGELOG.md` has an `Unreleased` section above the matching `0.1.0` entry.
- `src/` imports only Node built-ins and local modules; there are no runtime dependencies and no undeclared package imports.

### 2. Tarball truth

- The required isolated-cache command succeeded: `npm pack --dry-run --json --cache \"$(mktemp -d /tmp/flowdeck-npm-cache.XXXXXX)\"`. It ran `prepack`, produced 27 files (41,692 bytes unpacked), and included `dist/cli.js`, `README.md`, `LICENSE`, and `package.json`.
- The inspected file list contains no `.flowdeck/`, `.claude/`, `.env`, `*.tgz`, or bundled dependency tree. Compiled test artifacts are excluded.

### 3. Git hygiene

- `git status --short` reports only this active ritual card. `origin/master..HEAD` contains 12 commits; they must be reviewed and pushed before publication.
- `git check-ignore` found no tracked-versus-ignored contradiction. Required source/package/CI files are not ignored; ignored `dist/` is regenerated by `prepack`.
- The targeted tracked-content scan found only intentional placeholders/template terminology and a Flowdeck-internal absolute path; the package tarball excludes `.flowdeck/`. No credential, client data, or publishable absolute home path was found.

### 4. Docs drift

- `README.md`, `src/cli.ts`, and `src/config.ts` agree on all five commands, three modes, the documented options, and four `ZOIO_*` environment variables. `LICENSE` is MIT and matches `package.json`; no dual license applies.
- The `Unreleased` heading correctly precedes `0.1.0`. No Git tag exists. The requested active-card/meld reconciliation cannot be verified without reading other `TODO.md` files, which this run was explicitly prohibited from doing; this is a blocker.

### 5. Deck state

- The current dependency audit is `2026-09-08 — CLEAN` with zero advisories, newer than the lockfile's latest commit (`2026-09-07`); the vulnerability gate passes.
- `flowdeck inbox --gate` is unavailable (`Unknown command: inbox`); the manual fallback found no `.flowdeck/_inbox/` directory. `CARD-SENDING.md` is absent.
- Open-card and false-completion review cannot be completed under the explicit prohibition on reading other `TODO.md` files; this is a blocker until a human authorizes that review.

### 6. Platform & CI

- `origin` and `package.json.repository` both name `https://github.com/ruco-dev/zoio.git`. `gh repo view ruco-dev/zoio` returned HTTP 401, so repository existence, visibility, and default branch remain unverified; this is a blocker.
- `.github/workflows/ci.yml` runs `npm ci`, check, format check, and tests on every push and pull request, with no path filters or dependency on ignored content.

### 7. Build smoke

- Passed: `npm run check`, `npm run format:check`, and `npm test`. The test command rebuilt the project; Node reported 6 passed, 0 failed (2.29 s).

## BLOCKERS

1. Authenticate GitHub CLI and verify `ruco-dev/zoio`'s existence, intended visibility, default branch, and canonical metadata.
2. Authorize active-card and meld-to-notes review, then reconcile all commits since the last tag with `CHANGELOG.md`.
3. Review and push the 12 commits in `origin/master..HEAD` before publishing.

## WARNINGS

1. Neither the unscoped nor scoped npm identity is reserved; confirm the unscoped identity immediately before the first publish.

## Accepted trade-offs

- Flowdeck-internal placeholder/path content is tracked but excluded from the npm tarball.

## 2026-09-07 — NOT READY

**Scope:** npm package `zoio@0.1.0` and its intended public GitHub repository. `package.json` defines the unscoped CLI package and binary; the required `PROFILE.md` naming-policy record is still absent.

### 1. Identity

- `npm view zoio --json` and `npm view @ruco-dev/zoio --json` both returned registry 404. Neither name is published, so there is no twin to deprecate; the intended canonical identity remains an unconfirmed human decision.
- The local version is `0.1.0` and unpublished. `CHANGELOG.md` remains absent.
- Source imports resolve only to Node built-ins or local modules. There are no runtime dependencies hidden in `devDependencies`.

### 2. Tarball truth

- `npm pack --dry-run --json --cache /private/tmp/zoio-npm-audit-cache-20260907` passed after `prepack`; it reports 30 files, 49,047 bytes unpacked, the `dist/cli.js` binary, `README.md`, and `LICENSE`, with no deck, environment, or tarball leakage.
- Warning: compiled test artifacts (`dist/core.test.{d.ts,js,js.map}`) are included because `dist/` is published wholesale.

### 3. Git hygiene

- The only dirty path is this active audit ritual card. `origin/master..HEAD` contains 20 commits, so the local release work is not on the remote public repository.
- No tracked-versus-ignored contradiction or sensitive tracked filename was found. The content sweep found only intentional template/this-audit placeholder email and credential terminology; no actual credential, client data, or absolute home path was found.
- Required source and package files are not ignored. `dist/` is ignored intentionally and is regenerated by `prepack`.

### 4. Docs drift

- `README.md` matches the implemented `scan`, `explore`, `batch`, `config`, and `version` commands, modes, documented options, and environment variables. `LICENSE` is MIT and matches `package.json`.
- **BLOCKER:** No `CHANGELOG.md` and no Git tag exist, so the initial release and its commits cannot be reconciled to consumer-facing notes. Active-card contents were not reviewed in this run, per the audit scope constraint.

### 5. Deck state

- The board-level `.flowdeck/_inbox/` is absent, satisfying the manual empty-inbox fallback; `CARD-SENDING.md` is absent.
- `security-findings/VULN-AUDIT.md` records a 2026-09-07 CLEAN run with zero advisories. The lockfile's latest commit is also 2026-09-07, so the vulnerability gate is current and passes.
- Active publish-conflict cards were not inspected; their review remains required before READY.

### 6. Platform & CI

- `origin` is `https://github.com/ruco-dev/zoio.git`; `package.json` still lacks a `repository` field.
- **BLOCKER:** `gh repo view ruco-dev/zoio` returned HTTP 401, so repository existence, visibility, default branch, and canonical alignment remain unverified.
- Warning: no `.github/workflows/` directory exists, so no fresh-clone CI workflow enforces the verified commands.

### 7. Build smoke

- Passed: `npm run build`, `npm run lint`, `npm run format:check`, and `npm test`; six tests passed, zero failed (1.64 s reported by Node).

## BLOCKERS

1. Decide and record the canonical npm identity in `.flowdeck/.crunchdeck/profile/PROFILE.md`.
2. Add and reconcile `CHANGELOG.md` for `0.1.0`, including the release commit/meld review.
3. Authenticate GitHub CLI, verify the canonical public repository, then add matching `repository` metadata.
4. Review active-card publish conflicts and push the 20 local commits before a public release.

## WARNINGS

1. No CI workflow runs the passing fresh-clone checks.
2. The package includes compiled test artifacts.

## Accepted trade-offs

None.

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
