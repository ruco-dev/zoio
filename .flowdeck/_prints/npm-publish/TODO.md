# npm-publish

## BOT

---

### Determine version

- [ ] Check the last published git tag (`git describe --tags --abbrev=0`) and summarise commits since then
- [ ] Infer bump level — `feat:` → minor, `fix:` → patch, `BREAKING CHANGE` / `!` → major; use HUMAN override if set
- [ ] Bump `version` in `package.json` to the resolved version

### Validate package

- [ ] Scan source files for hardcoded version strings that should track `package.json`
- [ ] Confirm `files` in `package.json` (or `.npmignore`) includes only what should ship — no secrets, no dev artefacts
- [ ] Run tests — all must pass before continuing
- [ ] Run `npm run build` — build must compile clean with no errors

### Pre-publish review

- [ ] Confirm the resolved version is not already published: run `npm view {package}@{version} version` — if it returns a version (not an error), abort and report to HUMAN
- [ ] Run `npm pack --dry-run` — paste the tarball listing as a note here (file count, packed / unpacked size, every included path)
- [ ] Add a new entry to `CHANGELOG.md` for the bumped version, summarising the changes

### Hand off

- [ ] Print the exact commands for HUMAN to run (output only — no git or npm actions):
  ```
  npm publish
  git tag v{version}
  git push --tags
  ```


## HUMAN

- [ ] Bump level override (leave blank to let BOT infer): ___

- [ ] Run publish:
  ```
  npm publish
  git tag v{version}
  git push --tags
  ```
