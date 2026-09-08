---
lifecycle: one-shot
---

# prepare-to-publish

## BOT

- [x] Add `repository` metadata matching the verified canonical GitHub repository. (AUDIT.md § 6)
  > Added git metadata for the intended `https://github.com/ruco-dev/zoio.git`; GitHub verification remains tracked under HUMAN.
- [ ] Add an initial `CHANGELOG.md` and reconcile its Unreleased/0.1.0 notes with release commits and meld records after the permitted card review. (AUDIT.md § 4)
  > Added CHANGELOG.md with draft Unreleased and 0.1.0 notes; reconciliation awaits the authorized active-card review.
- [x] warning: Exclude compiled test artifacts from the published tarball while retaining the `zoio` binary and runtime modules. (AUDIT.md § 2)
  > Excluded `dist/**/*.test.*`; dry-run tarball has 27 files and retains `dist/cli.js` plus runtime modules.
- [x] warning: Add a fresh-clone CI workflow that runs the declared checks, format check, and test suite. (AUDIT.md § 6)
  > Added GitHub Actions CI using Node 20, npm ci, check, format:check, and test.

## HUMAN

- [x] Create the missing product profile and decide whether unscoped `zoio` or `@ruco-dev/zoio` is canonical; deprecate a twin only if one is later published. (AUDIT.md § 1)
>_answer_: zoio

- [ ] Authenticate `gh` and verify `ruco-dev/zoio` exists with the intended visibility and canonical default branch. (AUDIT.md § 6)

- [x] Authorize review of the active cards' TODO contents to reconcile release commits, meld records, and publish conflicts. (AUDIT.md §§ 4–5)

- [ ] Review and push the 20 local commits ahead of `origin/master` before publishing. (AUDIT.md § 3)

#### COMMENTS

> 2026-09-07: Refreshed NOT READY audit; six tests pass and the vulnerability gate is current, but release metadata, active-card review, GitHub verification, and 20 unpushed commits remain blockers.

#### COMMENTS

> 2026-09-08: The first dry run still included stale compiled tests; a negated npm files rule now excludes them reliably. README.md and FLOWDECK.md were updated for the changelog, CI, packaging, and remaining release blockers.

<!-- next: Casual -->
<!-- tokens 2026-09-08 play(Glinder): in=283175 out=5125 -->
