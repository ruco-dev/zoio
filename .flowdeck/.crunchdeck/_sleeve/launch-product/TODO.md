---
lifecycle: ritual
recurrence: on-demand
network: required
---

# launch-product

> **Sleeve resident.** The single entry point for a Crunchdeck release. Play
> `flowdeck play launch-product` when the intent is “ship this product.” This
> ritual orchestrates the security and publish-readiness gates, then creates
> one versioned launch card. It never publishes merely because the gates pass:
> publishing requires the explicit `publish` action and a human Go decision.

## BOT

### 1 · Establish release intent

- [ ] Read `package.json` (when present), `FLOWDECK.md`, and `.flowdeck/.crunchdeck/profile/PROFILE.md`. Record the product, publish surface (npm, git-only, or both), canonical package name, and the product north-star signal under `## HUMAN`.
- [ ] Refuse to run a second active launch: inspect `.flowdeck/.crunchdeck/launches/` for a non-archived `vX.Y.Z/LAUNCH.md` whose `TODO.md` has unchecked tasks. If one exists, link it under `## HUMAN` and stop. Do not create a competing launch record.

### 2 · Gate the release

- [ ] Play `publish-vuln-audit` and read its newest run record plus `.flowdeck/.crunchdeck/security-findings/VULN-AUDIT.md`. A **NEEDS ATTENTION** verdict or any unresolved runtime critical/high finding is a blocker: surface the existing findings card and stop.
- [ ] Play `publish-readiness-audit` after the vulnerability audit. Read its newest run record and `.flowdeck/.crunchdeck/prepare-to-publish/AUDIT.md`. If its verdict is not **READY**, surface the `prepare-to-publish` card and stop. Do not reimplement either audit in this ritual.
- [ ] Verify the two gate records are current: vulnerability audit is not older than the latest lockfile change; readiness audit is later than the vulnerability audit. If either is stale, rerun the stale gate before continuing.

### 3 · Prepare one launch record

- [ ] Inspect the latest git tag, `package.json` version, `CHANGELOG.md`, and untagged `.flowdeck/_meld/` cards. Classify release work as breaking, feature, or fix; infer the next version (major/minor/patch) and write the evidence under `## HUMAN`. If no release-worthy work exists, stop without minting a launch.
- [ ] Create `.flowdeck/.crunchdeck/launches/vX.Y.Z/LAUNCH.md` from `_energy-cards/LAUNCH.md.template`. Populate product, package, owner, target date, release version, and shipped-work summary from the evidence above. Copy one-liner/tagline and north-star from PROFILE; do not invent brand copy.
- [ ] Create `.flowdeck/.crunchdeck/launches/vX.Y.Z/TODO.md` with `lifecycle: one-shot`, a `## BOT` section that verifies the generated record has no unresolved placeholders, and a `## HUMAN` section containing an explicit Go / No-Go decision checkbox. Add an `## ACTIONS` `publish` item that links back to this ritual’s publish contract.
- [ ] Update the launch record’s Go / No-Go table to **Awaiting human decision**. Report the exact launch-card path and proposed version under `## HUMAN`.

### 4 · Close the ritual

- [ ] Append a `#### COMMENTS` run record: date, gate verdicts, proposed version, and launch-card path. Reset the ritual’s `## BOT` checks for its next play.

## HUMAN

- [ ] **Go / No-Go:** Review the generated `launches/vX.Y.Z/LAUNCH.md` and choose Go before activating `publish`.
  > _decision:_

## ACTIONS

<!-- Move an item to ## BOT only after the launch card records a human Go decision. -->

- [ ] publish — Read the selected `launches/vX.Y.Z/LAUNCH.md` and confirm its Go / No-Go decision is **Go**. Re-run the project build, lint, and tests; abort on any failure. Re-check `git status`, the package version, and the latest tag for drift since gate approval. Update `package.json` and `CHANGELOG.md` to the approved version, commit `release: vX.Y.Z`, tag it, push the commit and tag, verify npm authentication with `npm whoami`, then `npm publish` only for an npm release. Record actual command output and the released version in the launch card, mark its checklist items, update affected README/API docs, and add `**Released: vX.Y.Z**` to the source meld cards. If the publish surface is git-only, push the approved tag and record the release URL instead. Never publish when the Go decision, fresh gate records, or build evidence is missing.

#### COMMENTS
