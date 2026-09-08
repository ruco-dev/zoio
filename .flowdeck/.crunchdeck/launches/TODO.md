---
lifecycle: recurring
---

# launches

## BOT

---

### Determine version

- [ ] List existing launch folders under `.flowdeck/.crunchdeck/launches/` — find the highest vX.Y.Z. If none, start at v0.1.0.
- [ ] Scan `.flowdeck/_meld/` for card `TODO.md` files that do not contain a `**Released:**` line — these represent work completed since the last release.
- [ ] Classify each untagged meld card as: **feature** (new capability), **fix** (bug or regression), **breaking** (incompatible change). Surface the full list as a note before proceeding.
- [ ] Infer bump level — any breaking → major, any feature → minor, fixes only → patch. Use HUMAN override if set.
- [ ] Resolve the new version string (e.g. `v1.3.0`).

---

### Update repo

- [ ] Set `version` in `package.json` to the resolved version (no `v` prefix).
- [ ] Update `CHANGELOG.md`: prepend a new `## [vX.Y.Z] — YYYY-MM-DD` section. Group entries under `### Breaking Changes`, `### Features`, and `### Fixes` as appropriate. Create `CHANGELOG.md` if it does not exist.

---

### Scaffold launch record

- [ ] Create `.flowdeck/.crunchdeck/launches/vX.Y.Z/`.
- [ ] Scaffold `LAUNCH.md` from `_energy-cards/LAUNCH.md.template` — substitute product name from `PROFILE.md`, version, today's date, and owner from `git config user.name`. Pre-fill shipped items from the classified meld cards.
- [ ] Create `launches/vX.Y.Z/TODO.md`:
  ```
  ---
  lifecycle: one-shot
  ---

  # launches/vX.Y.Z

  ## BOT

  - [ ] Read LAUNCH.md — flag any TBDs under ## HUMAN.

  ## HUMAN

  #### COMMENTS
  ```

---

### Ship

- [ ] Commit: `git add package.json CHANGELOG.md && git commit -m "release: vX.Y.Z"`.
- [ ] Tag: `git tag vX.Y.Z && git push origin HEAD --tags`.
- [ ] Resolve npm auth:
  - If `NPM_TOKEN` is already in the environment (`echo $NPM_TOKEN` is non-empty), use it directly.
  - Otherwise, if `.env` exists and contains `NPM_TOKEN`, load it: `set -a && source .env && set +a`.
  - Ensure `.npmrc` in the project root contains `//registry.npmjs.org/:_authToken=${NPM_TOKEN}` — add the line if missing (do not commit it; add `.npmrc` to `.gitignore` if not already present).
  - Run `npm whoami` to confirm auth. If it fails, stop and surface the error under `## HUMAN` with instructions to set `NPM_TOKEN` in the environment or `.env`.
- [ ] Publish: `npm publish`.

---

### Close out

- [ ] Update `README.md`: diff the CHANGELOG entry against the current README — update any sections that describe the CLI API, template list, command syntax, or version references to match what shipped.
- [ ] Add `**Released: vX.Y.Z**` to every untagged `_meld/` card `TODO.md`.
- [ ] Commit: `git add .flowdeck/ && git commit -m "deck: annotate meld → vX.Y.Z"`.
- [ ] Surface the released version, CHANGELOG entry, and npm publish output under `## HUMAN`.

## HUMAN

#### COMMENTS
