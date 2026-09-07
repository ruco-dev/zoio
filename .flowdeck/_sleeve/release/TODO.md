---
lifecycle: recurring
recurrence: on-demand
nick: Glinder
review: false
reset-on-play: false
permissions: standard
projects: []
params: {}
# model:
# skill:
# depends:
---

# release

## BOT

- [ ] Bump version in `package.json` (or equivalent manifest)
- [ ] Update CHANGELOG — add an entry for this version with a summary of changes
- [ ] Run tests — confirm all pass before tagging
- [ ] Commit: `git commit -m "chore: release vX.Y.Z"`
- [ ] Tag: `git tag vX.Y.Z`

## HUMAN

- [ ] What is the new version number?
  > _answer:_

- [ ] Are there any breaking changes or migration notes to include in the CHANGELOG?
  > _answer:_

- [ ] Run: `npm publish --access public` (or equivalent publish command) after local tests pass.

#### COMMENTS
