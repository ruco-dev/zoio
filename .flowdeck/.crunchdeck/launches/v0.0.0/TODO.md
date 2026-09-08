---
lifecycle: one-shot
---

# launches/v0.0.0

## BOT

- [ ] Review `LAUNCH.md` for placeholder content. Update from `PROFILE.md` where possible.
- [ ] Flag any unresolved items to `## HUMAN`.

## HUMAN

## ACTIONS

<!-- Move any item to ## BOT (bot executes) or ## HUMAN (you handle it) to activate. -->

- [ ] npm-publish — run `npm publish` with the correct scope; confirm the package resolves from a clean install
- [ ] tag-release — create git tag vX.Y.Z, push tag and branch to remote
- [ ] update-docs — sync README and any hosted docs to reflect the shipped API
- [ ] draft-announce — draft a launch post using the content angle and one-liner from PROFILE
- [ ] capture-baseline — record the north-star metric value (defined in PROFILE) as a comment on this card before and after launch
- [ ] annotate-meld — add `**Released: vX.Y.Z**` to every untagged `_meld/` card `TODO.md` and commit

#### COMMENTS
