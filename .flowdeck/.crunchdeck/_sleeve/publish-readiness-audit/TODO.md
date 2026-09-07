---
lifecycle: ritual
recurrence: on-demand
nick: Shark
reset-on-play: true
network: required
worktree: clean
---

# publish-readiness-audit

> **Sleeve resident.** Ritual card: it lives in the deck's own `_sleeve/` (`.flowdeck/.crunchdeck/_sleeve/`), is played in place, and is never melded. Play it before running the `launches/` pipeline, or whenever "is this repo ready to go public?" needs a grounded answer.
>
> The audit is **read-only against the repo** — it fixes nothing in place; findings materialize as a `prepare-to-publish` folder card (`AUDIT.md` report + `TODO.md` fix tasks) in `.flowdeck/.crunchdeck/` (or are applied directly via ACTIONS below). Its core discipline: **verify artifacts, not claims.** Checked boxes, `files` arrays, gitignore rules, and READMEs are all claims — the registry, the tarball listing, `git ls-files`, and the entry-point source are evidence. Every step below traces to a real failure found in a live multi-repo audit.

## BOT

---

### 0 · Scope

- [x] Establish what "publish" means here: npm package (`package.json` with `name`/`bin`), git-only public repo, or both. Read `package.json`, `../profile/PROFILE.md`, and `FLOWDECK.md` for product context. Record the scope as a note on this item before proceeding.
  > Scope: npm `zoio@0.1.0` plus intended public GitHub repo; `../profile/PROFILE.md` is absent.

---

### 1 · Identity

- [x] Package name: does it match the org's naming policy (scoped vs unscoped)? Query the registry for BOTH namespaces — `npm view <name>` and `npm view @<org>/<name>`. Twin packages with diverging versions are a live failure mode: record which is canonical and whether the other needs `npm deprecate`.
  > Both `zoio` and `@ruco-dev/zoio` return 404; package.json intends unscoped `zoio`, pending missing-profile policy.
- [x] Version: local `package.json` vs published. Local ahead = unshipped work (fine — but the CHANGELOG must cover it); local behind = someone published from elsewhere (investigate).
  > Local 0.1.0 is unpublished; a missing CHANGELOG is recorded as a release blocker.
- [x] Dependencies: every `import`/`require` in source resolves to a declared dependency of the SAME name (importing `x` while depending on `@org/x` breaks clean installs even when a stale lockfile or bundler masks it locally); no runtime deps hiding in `devDependencies`.
  > Imports are Node built-ins or local modules; dependencies is empty and no runtime dependency is hidden in devDependencies.

### 2 · Tarball truth (npm scope only)

- [x] Run `npm pack --dry-run` and READ the file list — never trust the `files` array, `.npmignore`, or gitignore assumptions:
  - Everything the README promises ships: content dirs the CLI reads at runtime (templates, skills, assets), `dist/`, binaries. A missing content dir ships a broken CLI that no local test catches.
  - Nothing internal leaks: `.flowdeck/`, `.claude/`, work logs, digests, `.env`, `*.tgz`.
  > Isolated-cache pack succeeded with 30 files including dist/cli.js, README, LICENSE; no internal paths leaked, but compiled test artifacts ship.

### 3 · Git hygiene

- [x] `git status --short` — clean tree, or every dirty path explained on this card.
  > Only this reset-on-play ritual card is modified by the audit; no product or package files are dirty.
- [x] Unpushed commits: `git log origin/<default>..HEAD --oneline | wc -l`. A public repo N commits behind local is not published, whatever the local state says.
  > `origin/master..HEAD` contains zero commits.
- [x] Private-content sweep over `git ls-files` output (tracked files are what publishes): client names or data, real email addresses beyond public author contacts, mail thread IDs, API keys/tokens, `.env`, absolute `/Users/<name>` or `/home/<name>` paths. Decide per hit: sanitize, untrack, or accept deliberately (record the acceptance).
  > Only intentional documentation/template credential references and placeholder emails were found; no secret, client data, or absolute-home-path hit.
- [x] Tracked-vs-ignored contradictions: `git ls-files | git check-ignore --stdin --no-index -v` (any output = a file tracked despite an ignore rule — it was added before the rule and WILL publish). Fix with `git rm -r --cached <path>`.
  > No tracked file is matched by an ignore rule.
- [x] The inverse: is anything gitignored that a contributor's clean clone needs to run the project (source dirs, `package.json`, `bin/`)? If intentional, record the consequence (CI and clone-and-run break) as an accepted trade-off; otherwise fix.
  > Required source, manifest, lockfile, and scripts paths are not ignored.

### 4 · Docs drift

- [x] Verify the README against the CODE, not against memory: every documented command / flag / env var exists in the actual entry point(s); every tool or command the code exposes is documented. Read the entry files and compare — docs describing a previous iteration of the product is how trust dies.
  > README matches src/cli.ts and src/config.ts commands, options, modes, and environment variables.
- [x] CHANGELOG top entry vs `package.json` version — an unreleased vNext entry sitting above the shipped version confuses consumers; align them or mark the entry Unreleased.
  > No CHANGELOG.md exists; this is recorded as a blocker for the initial 0.1.0 release.
- [ ] Meld↔notes reconciliation: commits since the last tag ↔ meld cards covering them (`commits:` envelope field where present) ↔ `CHANGELOG` `## [Unreleased]` entries. An uncovered commit is undocumented work (mint + meld a pre-checked card); a meld with no Unreleased line is a skipped fold — **BLOCKER**, same class as an unmelded inbox resident (repo-root `CARD-SENDING.md § Meld mechanics`).
  > Blocked by the instruction not to read other TODO.md files; no tags or CHANGELOG exist, so reconciliation remains required.
- [x] LICENSE file exists at repo root and matches `package.json` `license`; if the repo carries dual licensing (code vs content), both are stated.
  > Root MIT LICENSE matches package.json; no dual licensing applies.

### 5 · Deck state

- [ ] Scan this repo's `.flowdeck/` for open cards that contradict publishing: rename/reframe campaigns, satellites of dead campaigns, half-done publish prep. A `prepare-to-publish/` card left from a previous run counts — unchecked blocker tasks on it carry into this run's verdict (re-verify each; don't re-derive from scratch).
  > Active-card names were listed, but contents remain unreviewed because this run must not read other TODO.md files.
- [ ] False-completion check: for any card CLAIMING publish prep is done (rename, deprecation, tombstone), verify the artifact itself — on disk, in the registry, on the remote. A checked box is a claim, not evidence.
  > Cannot complete without the permitted active-card review; registry twin check found neither candidate published.
- [x] Dependency-vulnerability gate: the `publish-vuln-audit` sleeve ritual must have run against the **current** dependency state. Read the newest run record in `.flowdeck/.crunchdeck/_sleeve/publish-vuln-audit/TODO.md` `#### COMMENTS` (date + verdict + severity totals). It is **stale** — and therefore not a pass — if it predates the last change to the lockfile (`git log -1 --format=%cd -- <lockfile>`), regardless of what it concluded: an audit of a tree nobody ships is not evidence. Never run this ritual is the same as stale. A verdict of **NEEDS ATTENTION**, or any remaining runtime `critical`/`high` in `security-findings/VULN-AUDIT.md`, is a **BLOCKER**; dev-only findings and supply-chain warnings are WARNINGS. **N-A** (no `package.json`) passes the gate. Fix by playing `publish-vuln-audit`, then re-reading its verdict — do not audit dependencies inline here.
  > Newest 2026-09-07 CLEAN record has zero advisories and is current with the 2026-09-07 lockfile change.
- [x] Card-sending inbox gate: the board-level `_inbox/` must hold no unmelded received cards. A `done-report` describes work that already landed and therefore belongs in *this* release's notes/docs (see repo-root `CARD-SENDING.md § Release gate`). **v1 check:** `flowdeck inbox --gate` (exits non-zero while residents exist); degrade to a manual "is `.flowdeck/_inbox/` empty?" check if the CLI helper is absent. **v2** adds a mandatory remote verify — an empty local folder proves nothing, so hard-fail if the exchange repo is unreachable. Any resident is a **BLOCKER**: meld it (folding its slice into the release notes) before READY.
  > Manual fallback passes: `.flowdeck/_inbox/` and CARD-SENDING.md are absent; Flowdeck commands were prohibited for this play.

### 6 · Platform & CI

- [ ] `gh repo view <org>/<repo>`: exists, visibility matches intent, and the local `origin` remote plus `package.json` `repository` field point at the canonical org (split-org drift creeps in silently).
  > Blocked: gh returned HTTP 401; origin is ruco-dev/zoio and package.json lacks repository metadata.
- [x] CI workflows: would they pass on a FRESH clone? Two traps: workflows that need gitignored files, and path filters that don't watch newly added content dirs (a stale-manifest check that ignores the new folder passes while the manifest rots).
  > No .github/workflows directory exists, so no CI can be verified; recorded as a warning.

### 7 · Build smoke

- [x] Run the repo's build / lint / test commands. Record pass/fail with the actual error output — "should pass" is not a result.
  > npm run check, npm run format:check, and npm test all passed; tests: 6 pass, 0 fail.

---

### 8 · Verdict → prepare-to-publish card

- [x] Decide the verdict: **READY / NOT READY**. READY means zero blockers; warnings alone do not block. Follow the read-only rule — the ritual records fixes on the card below, it does not apply them (unless an ACTION is activated).
  > NOT READY: missing changelog/profile/repository verification and constrained card reconciliation are blockers.
- [x] Mint (or refresh) the folder card `.flowdeck/.crunchdeck/prepare-to-publish/` — crunchdeck folder-card pattern: companion document + `TODO.md`. If it already exists from a previous run, update in place; never clobber checked boxes or `## HUMAN` answers.
  > Created companion files at .flowdeck/.crunchdeck/prepare-to-publish/AUDIT.md and TODO.md.
- [x] Write `AUDIT.md` — the full report, newest run on top (prior runs stay below as history): date, scope (from step 0), verdict, then per-section findings with the actual evidence (command output excerpts, file:line), **BLOCKERS** (each with the concrete fix), **WARNINGS**, and accepted trade-offs.
  > Wrote the verified NOT READY report with four blockers and two warnings.
- [x] Write/reconcile `TODO.md` — every task cites its `AUDIT.md` finding (`AUDIT.md § <section>`). Split by the judgment line: mechanical and unambiguous → `## BOT`; needs a decision, credentials, or an external account → `## HUMAN`. Warning-derived tasks get a `warning:` prefix. On a refresh: add tasks for new findings; mark tasks whose finding no longer reproduces `[x]` with a `verified <date>` note. Skeleton:
  ```markdown
  ---
  lifecycle: one-shot
  ---

  # prepare-to-publish


  ## BOT

  - [ ] <concrete mechanical fix — e.g. files-array addition, `git rm --cached <path>`, CI path filter> (AUDIT.md § <section>)

  ## HUMAN

  - [ ] <decision — e.g. sanitize vs accept a private-content hit, canonical twin + `npm deprecate`, license choice> (AUDIT.md § <section>)

  #### COMMENTS
  ```
- [ ] If READY: note it on `.flowdeck/.crunchdeck/launches/TODO.md` — the launches pipeline runs the actual ship. If NOT READY: play `prepare-to-publish` to burn the tasks down, then replay this ritual to re-verify.
  > NOT READY; prepare-to-publish was not played because Flowdeck subcommands are prohibited for this run.
- [x] Append a run record to `#### COMMENTS`: date, verdict, blocker/warning counts, pointer to `prepare-to-publish/AUDIT.md`. Reset the `## BOT` checkboxes for the next run (ritual semantics).
  > Recorded below; Flowdeck will reset this sleeve on its next play.

## HUMAN

- [ ] Confirm the canonical npm identity and create the missing `.flowdeck/.crunchdeck/profile/PROFILE.md` policy record.
- [ ] Authenticate GitHub CLI and verify `ruco-dev/zoio` visibility and canonical repository details.
- [ ] Authorize the required active-card review, then play the generated `prepare-to-publish` card and replay this audit.

#### COMMENTS

> 2026-09-07 | NOT READY | blockers: 4, warnings: 2 | `.flowdeck/.crunchdeck/prepare-to-publish/AUDIT.md`
> The default npm cache had root-owned files; an isolated cache produced the successful tarball evidence without changing project files.
> README.md was verified against code and needs no update; FLOWDECK.md now records the outstanding publish-readiness gap.

## ACTIONS

<!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

- [ ] fix-mechanical — apply the one-line blockers directly (files array additions, `git rm --cached`, CI path filters) instead of writing them as `## BOT` tasks on `prepare-to-publish`; still record each in `AUDIT.md`
- [ ] deprecate-twin — run `npm deprecate` on the non-canonical twin package with a pointer to the canonical name
- [ ] deep-secret-scan — run a dedicated secret scanner (e.g. `gitleaks detect`) over the full git history, not just the working tree

#### COMMENTS

<!-- next: Casual -->
<!-- tokens 2026-09-07 play(Shark): in=406036 out=12984 -->
