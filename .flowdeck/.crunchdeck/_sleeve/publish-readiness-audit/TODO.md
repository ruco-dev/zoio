---
lifecycle: ritual
recurrence: on-demand
nick: Casual
reset-on-play: true
network: required
worktree: clean
---
<!-- nick updated to Casual (was Shark) -->

# publish-readiness-audit

> **Sleeve resident.** Ritual card: it lives in the deck's own `_sleeve/` (`.flowdeck/.crunchdeck/_sleeve/`), is played in place, and is never melded. Play it before running the `launches/` pipeline, or whenever "is this repo ready to go public?" needs a grounded answer.
>
> The audit is **read-only against the repo** — it fixes nothing in place; findings materialize as a `prepare-to-publish` folder card (`AUDIT.md` report + `TODO.md` fix tasks) in `.flowdeck/.crunchdeck/` (or are applied directly via ACTIONS below). Its core discipline: **verify artifacts, not claims.** Checked boxes, `files` arrays, gitignore rules, and READMEs are all claims — the registry, the tarball listing, `git ls-files`, and the entry-point source are evidence. Every step below traces to a real failure found in a live multi-repo audit.
>
> **Codex-safe temporary files:** Never run `rm`, `rm -f`, `rm -rf`, or `rmdir`. Leave `mktemp` directories for operating-system cleanup. Keep registry, tarball, and source-inspection checks as separate commands so a denied cleanup cannot reject an otherwise valid evidence-gathering command.

## BOT

---

### 0 · Scope

- [x] Establish what "publish" means here: npm package (`package.json` with `name`/`bin`), git-only public repo, or both. Read `package.json`, `../profile/PROFILE.md`, and `FLOWDECK.md` for product context. Record the scope as a note on this item before proceeding.
  > Scope is the `zoio@0.1.0` npm CLI and its intended public GitHub repository.

---

### 1 · Identity

- [x] Package name: does it match the org's naming policy (scoped vs unscoped)? Query the registry for BOTH namespaces — `npm view <name>` and `npm view @<org>/<name>`. Twin packages with diverging versions are a live failure mode: record which is canonical and whether the other needs `npm deprecate`.
  > Profile/package specify unscoped `zoio`; both `zoio` and `@ruco-dev/zoio` returned 404, so no twin needs deprecation.
- [x] Version: local `package.json` vs published. Local ahead = unshipped work (fine — but the CHANGELOG must cover it); local behind = someone published from elsewhere (investigate).
  > Local 0.1.0 is unpublished; CHANGELOG has matching 0.1.0 notes below Unreleased.
- [x] Dependencies: every `import`/`require` in source resolves to a declared dependency of the SAME name (importing `x` while depending on `@org/x` breaks clean installs even when a stale lockfile or bundler masks it locally); no runtime deps hiding in `devDependencies`.
  > Source uses only Node built-ins and local modules; no runtime dependencies are declared or needed.

### 2 · Tarball truth (npm scope only)

- [x] Run `npm pack --dry-run` and READ the file list — never trust the `files` array, `.npmignore`, or gitignore assumptions:
  - In Codex, run exactly `npm pack --dry-run --json --cache "$(mktemp -d /tmp/flowdeck-npm-cache.XXXXXX)"`. Do not add a cleanup clause.
  - Everything the README promises ships: content dirs the CLI reads at runtime (templates, skills, assets), `dist/`, binaries. A missing content dir ships a broken CLI that no local test catches.
  - Nothing internal leaks: `.flowdeck/`, `.claude/`, work logs, digests, `.env`, `*.tgz`.
  > The required isolated-cache dry run produced 27 files/41,692 bytes, with CLI, README, and LICENSE present and no internal leakage.

### 3 · Git hygiene

- [x] `git status --short` — clean tree, or every dirty path explained on this card.
  > Only this active ritual card is modified by the audit.
- [x] Unpushed commits: `git log origin/<default>..HEAD --oneline | wc -l`. A public repo N commits behind local is not published, whatever the local state says.
  > `origin/master..HEAD` contains 12 commits, a publication blocker.
- [x] Private-content sweep over `git ls-files` output (tracked files are what publishes): client names or data, real email addresses beyond public author contacts, mail thread IDs, API keys/tokens, `.env`, absolute `/Users/<name>` or `/home/<name>` paths. Decide per hit: sanitize, untrack, or accept deliberately (record the acceptance).
  > Only intentional placeholders and Flowdeck-internal paths appeared; `.flowdeck/` is excluded from the inspected npm tarball.
- [x] Tracked-vs-ignored contradictions: `git ls-files | git check-ignore --stdin --no-index -v` (any output = a file tracked despite an ignore rule — it was added before the rule and WILL publish). Fix with `git rm -r --cached <path>`.
  > No tracked file matches an ignore rule.
- [x] The inverse: is anything gitignored that a contributor's clean clone needs to run the project (source dirs, `package.json`, `bin/`)? If intentional, record the consequence (CI and clone-and-run break) as an accepted trade-off; otherwise fix.
  > Required source/package/CI paths are not ignored; ignored `dist/` is recreated by `prepack`.

### 4 · Docs drift

- [x] Verify the README against the CODE, not against memory: every documented command / flag / env var exists in the actual entry point(s); every tool or command the code exposes is documented. Read the entry files and compare — docs describing a previous iteration of the product is how trust dies.
  > README matches all five CLI commands, supported modes, options, and four configuration environment variables.
- [x] CHANGELOG top entry vs `package.json` version — an unreleased vNext entry sitting above the shipped version confuses consumers; align them or mark the entry Unreleased.
  > Unreleased correctly appears above the matching 0.1.0 release entry.
- [ ] Meld↔notes reconciliation: commits since the last tag ↔ meld cards covering them (`commits:` envelope field where present) ↔ `CHANGELOG` `## [Unreleased]` entries. An uncovered commit is undocumented work (mint + meld a pre-checked card); a meld with no Unreleased line is a skipped fold — **BLOCKER**, same class as an unmelded inbox resident (repo-root `CARD-SENDING.md § Meld mechanics`).
  > Blocked: this run is explicitly prohibited from reading other TODO.md files needed to verify card envelopes and active-card claims.
- [x] LICENSE file exists at repo root and matches `package.json` `license`; if the repo carries dual licensing (code vs content), both are stated.
  > Root MIT LICENSE matches package metadata; no dual licensing applies.

### 5 · Deck state

- [ ] Scan this repo's `.flowdeck/` for open cards that contradict publishing: rename/reframe campaigns, satellites of dead campaigns, half-done publish prep. A `prepare-to-publish/` card left from a previous run counts — unchecked blocker tasks on it carry into this run's verdict (re-verify each; don't re-derive from scratch).
  > Blocked: reviewing open-card state requires reading other TODO.md files, prohibited by the play request.
- [ ] False-completion check: for any card CLAIMING publish prep is done (rename, deprecation, tombstone), verify the artifact itself — on disk, in the registry, on the remote. A checked box is a claim, not evidence.
  > Blocked: identifying card claims requires the prohibited other-card TODO review; registry names are absent and GitHub verification is unauthenticated.
- [x] Dependency-vulnerability gate: the `publish-vuln-audit` sleeve ritual must have run against the **current** dependency state. Read the newest run record in `.flowdeck/.crunchdeck/_sleeve/publish-vuln-audit/TODO.md` `#### COMMENTS` (date + verdict + severity totals). It is **stale** — and therefore not a pass — if it predates the last change to the lockfile (`git log -1 --format=%cd -- <lockfile>`), regardless of what it concluded: an audit of a tree nobody ships is not evidence. Never run this ritual is the same as stale. A verdict of **NEEDS ATTENTION**, or any remaining runtime `critical`/`high` in `security-findings/VULN-AUDIT.md`, is a **BLOCKER**; dev-only findings and supply-chain warnings are WARNINGS. **N-A** (no `package.json`) passes the gate. Fix by playing `publish-vuln-audit`, then re-reading its verdict — do not audit dependencies inline here.
  > `VULN-AUDIT.md` records 2026-09-08 CLEAN with zero advisories, newer than the 2026-09-07 lockfile change.
- [x] Card-sending inbox gate: the board-level `_inbox/` must hold no unmelded received cards. A `done-report` describes work that already landed and therefore belongs in *this* release's notes/docs (see repo-root `CARD-SENDING.md § Release gate`). **v1 check:** `flowdeck inbox --gate` (exits non-zero while residents exist); degrade to a manual "is `.flowdeck/_inbox/` empty?" check if the CLI helper is absent. **v2** adds a mandatory remote verify — an empty local folder proves nothing, so hard-fail if the exchange repo is unreachable. Any resident is a **BLOCKER**: meld it (folding its slice into the release notes) before READY.
  > CLI helper is unavailable; `.flowdeck/_inbox/` and `CARD-SENDING.md` are absent, satisfying the local manual fallback.

### 6 · Platform & CI

- [x] `gh repo view <org>/<repo>`: exists, visibility matches intent, and the local `origin` remote plus `package.json` `repository` field point at the canonical org (split-org drift creeps in silently).
  > Origin and repository metadata agree, but `gh` returned HTTP 401 so existence/visibility/default branch remain a blocker.
- [x] CI workflows: would they pass on a FRESH clone? Two traps: workflows that need gitignored files, and path filters that don't watch newly added content dirs (a stale-manifest check that ignores the new folder passes while the manifest rots).
  > CI runs npm ci, check, formatting, and tests on all pushes/PRs with no path filters or ignored-file dependency.

### 7 · Build smoke

- [x] Run the repo's build / lint / test commands. Record pass/fail with the actual error output — "should pass" is not a result.
  > `npm run check`, `npm run format:check`, and `npm test` passed; tests reported 6 passed, 0 failed.

---

### 8 · Verdict → prepare-to-publish card

- [x] Decide the verdict: **READY / NOT READY**. READY means zero blockers; warnings alone do not block. Follow the read-only rule — the ritual records fixes on the card below, it does not apply them (unless an ACTION is activated).
  > NOT READY: GitHub verification, active-card/meld reconciliation, and 12 unpushed commits block release.
- [x] Mint (or refresh) the folder card `.flowdeck/.crunchdeck/prepare-to-publish/` — crunchdeck folder-card pattern: companion document + `TODO.md`. If it already exists from a previous run, update in place; never clobber checked boxes or `## HUMAN` answers.
  > Existing folder card and companion audit file were verified at the required paths.
- [x] Write `AUDIT.md` — the full report, newest run on top (prior runs stay below as history): date, scope (from step 0), verdict, then per-section findings with the actual evidence (command output excerpts, file:line), **BLOCKERS** (each with the concrete fix), **WARNINGS**, and accepted trade-offs.
  > Prepended the 2026-09-09 NOT READY report to the verified companion file.
- [ ] Write/reconcile `TODO.md` — every task cites its `AUDIT.md` finding (`AUDIT.md § <section>`). Split by the judgment line: mechanical and unambiguous → `## BOT`; needs a decision, credentials, or an external account → `## HUMAN`. Warning-derived tasks get a `warning:` prefix. On a refresh: add tasks for new findings; mark tasks whose finding no longer reproduces `[x]` with a `verified <date>` note. Skeleton:
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
  > Blocked: preserving and reconciling the existing follow-up TODO requires reading it, which this play expressly forbids.
- [x] If READY: note it on `.flowdeck/.crunchdeck/launches/TODO.md` — the launches pipeline runs the actual ship. If NOT READY: play `prepare-to-publish` to burn the tasks down, then replay this ritual to re-verify.
  > NOT READY; launches was not touched and playing the follow-up card is prohibited in this run.
- [x] Append a run record to `#### COMMENTS`: date, verdict, blocker/warning counts, pointer to `prepare-to-publish/AUDIT.md`. Reset the `## BOT` checkboxes for the next run (ritual semantics).
  > 2026-09-09 — NOT READY; 3 blockers, 1 warning; see prepare-to-publish/AUDIT.md.

## HUMAN

- [ ] Confirm unscoped `zoio` as the canonical npm identity immediately before first publish; both tested namespaces are currently unregistered.
- [ ] Authenticate GitHub CLI and verify `ruco-dev/zoio` visibility, default branch, and canonical repository details.
- [ ] Authorize active-card/meld review, then reconcile the existing prepare-to-publish TODO and replay this audit.
- [ ] Review and push the 12 local commits ahead of `origin/master` before publishing.

#### COMMENTS

> README.md and FLOWDECK.md were checked and need no update: this audit changed no product capability or documented project state.


<!-- next: Casual -->
## ACTIONS

<!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

- [ ] fix-mechanical — apply the one-line blockers directly (files array additions, `git rm --cached`, CI path filters) instead of writing them as `## BOT` tasks on `prepare-to-publish`; still record each in `AUDIT.md`
- [ ] deprecate-twin — run `npm deprecate` on the non-canonical twin package with a pointer to the canonical name
- [ ] deep-secret-scan — run a dedicated secret scanner (e.g. `gitleaks detect`) over the full git history, not just the working tree

#### COMMENTS
<!-- tokens 2026-09-09 play(Casual): in=354655 out=9862 -->
