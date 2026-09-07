---
lifecycle: one-shot
---

# prepare-to-publish

## BOT

- [ ] Add `repository` metadata matching the verified canonical GitHub repository. (AUDIT.md § 6)
- [ ] Add an initial `CHANGELOG.md` and reconcile its Unreleased/0.1.0 notes with release commits and meld records after the permitted card review. (AUDIT.md § 4)
- [ ] warning: Exclude compiled test artifacts from the published tarball while retaining the `zoio` binary and runtime modules. (AUDIT.md § 2)
- [ ] warning: Add a fresh-clone CI workflow that runs the declared checks, format check, and test suite. (AUDIT.md § 6)

## HUMAN

- [ ] Create the missing product profile and decide whether unscoped `zoio` or `@ruco-dev/zoio` is canonical; deprecate a twin only if one is later published. (AUDIT.md § 1)
- [ ] Authenticate `gh` and verify `ruco-dev/zoio` exists with the intended visibility and canonical default branch. (AUDIT.md § 6)
- [ ] Authorize review of the active cards' TODO contents to reconcile release commits, meld records, and publish conflicts. (AUDIT.md §§ 4–5)

#### COMMENTS

> 2026-09-07: Initial NOT READY audit; package build/test and vulnerability gate pass, but release metadata and platform verification remain blocked.
