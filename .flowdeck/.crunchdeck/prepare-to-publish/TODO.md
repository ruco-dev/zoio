---
lifecycle: one-shot
nick: Casual
---
<!-- nick updated to Casual (was none) -->

# prepare-to-publish

## BOT

- [x] Add `repository` metadata matching the verified canonical GitHub repository. (AUDIT.md § 6)
  > Added git metadata for the intended `https://github.com/ruco-dev/zoio.git`; GitHub verification remains tracked under HUMAN.
- [ ] Add an initial `CHANGELOG.md` and reconcile its Unreleased/0.1.0 notes with release commits and meld records after the permitted card review. (AUDIT.md § 4)
  > Verified `/Users/ruco/ruco-dev/pills-incubator/zoio/CHANGELOG.md` and passing checks; reconciliation remains blocked by this card's no-other-TODO rule.
- [x] warning: Exclude compiled test artifacts from the published tarball while retaining the `zoio` binary and runtime modules. (AUDIT.md § 2)
  > Excluded `dist/**/*.test.*`; dry-run tarball has 27 files and retains `dist/cli.js` plus runtime modules.
- [x] warning: Add a fresh-clone CI workflow that runs the declared checks, format check, and test suite. (AUDIT.md § 6)
  > Added GitHub Actions CI using Node 20, npm ci, check, format:check, and test.

## HUMAN

- [x] Create the missing product profile and decide whether unscoped `zoio` or `@ruco-dev/zoio` is canonical; deprecate a twin only if one is later published. (AUDIT.md § 1)
>_answer_: zoio

- [ ] Authenticate `gh` and verify `ruco-dev/zoio` exists with the intended visibility and canonical default branch. (AUDIT.md § 6)
>_kemps:_ Authenticate `gh`, then confirm `ruco-dev/zoio` is the intended public repository with `master` as its default branch and that its URL matches the `repository` metadata.

- [x] Authorize review of the active cards' TODO contents to reconcile release commits, meld records, and publish conflicts. (AUDIT.md §§ 4–5)
>_answer_: 

- [ ] Resolve the card-instruction conflict: authorize reading the named active cards' `TODO.md` files despite this card's prohibition, so the release-note reconciliation can finish.
>_kemps:_ Authorize a read-only review of the named active cards’ `TODO.md` files solely to reconcile `CHANGELOG.md`, meld records, and any publish conflicts; do not alter those cards during the review.

- [ ] Review and push the 20 local commits ahead of `origin/master` before publishing. (AUDIT.md § 3)
>_kemps:_ Review and push the one currently unpushed commit ahead of `origin/master` before publishing; the “20” count is stale according to the latest audit comment.

#### COMMENTS

> 2026-09-07: Refreshed NOT READY audit; six tests pass and the vulnerability gate is current, but release metadata, active-card review, GitHub verification, and 20 unpushed commits remain blockers.

#### COMMENTS

> 2026-09-08: The first dry run still included stale compiled tests; a negated npm files rule now excludes them reliably. README.md and FLOWDECK.md were updated for the changelog, CI, packaging, and remaining release blockers.

> 2026-09-08: `origin/master..HEAD` now has one commit (not 20); `npm run check`, `npm run format:check`, and `npm test` pass with six tests. README.md and FLOWDECK.md were reviewed and need no further update.

<!-- next: Casual -->
<!-- tokens 2026-09-08 kemps(Casual): in=85396 out=1518 -->
