---
lifecycle: ritual
recurrence: on-demand
network: required
---

# first-launch

> **Sleeve resident.** Use once to turn Crunchdeck’s `launches/v0.0.0/`
> bootstrap baseline into the product’s first real release. Run
> `flowdeck play first-launch` only when there is no previous shipped release.
> It mints the first versioned launch card; every later release uses
> `flowdeck play launches`.

## BOT

### 1 · Confirm this is the first release

- [x] Read `package.json` (when present), `FLOWDECK.md`, and `.flowdeck/.crunchdeck/profile/PROFILE.md`. Record product name, publish surface (npm, git-only, or both), canonical package name, owner, and north-star signal under `## HUMAN`.
  > Zoio is an npm-and-GitHub CLI (`zoio@0.1.0`), owned by the repository maintainer; its north star is actionable locally stored AI-visibility insights.
- [x] Inspect `.flowdeck/.crunchdeck/launches/`, git tags, and the npm registry when applicable. If any non-baseline version has already shipped, stop and direct the user to `flowdeck play launches`; do not create a second first-launch record.
  > Only the archived `v0.0.0` baseline exists, Git has no tags, and npm returned 404 for `zoio`; no prior shipment was found.
- [x] Confirm `launches/v0.0.0/` is an archived baseline. If it is absent, mint it from the LAUNCH template as an archived, non-release baseline; do not treat it as evidence of a shipment.
  > Verified `launches/v0.0.0/LAUNCH.md` has Status `Archived` and explicitly says it is not published or tagged.

### 2 · Establish the release gates

- [ ] Play `publish-vuln-audit`; read its newest run record and `security-findings/VULN-AUDIT.md`. A **NEEDS ATTENTION** verdict or unresolved runtime critical/high finding blocks the launch: surface the findings card and stop.
  > Not replayed: this ritual run explicitly prohibits Flowdeck subcommands; the newest recorded verdict is CLEAN with zero advisories.
- [ ] Play `publish-readiness-audit` after the vulnerability audit; read its newest run record and `prepare-to-publish/AUDIT.md`. If its verdict is not **READY**, surface `prepare-to-publish` and stop.
  > Blocked: the newest recorded readiness verdict is NOT READY; resolve the listed identity, changelog, GitHub verification, and active-card/push blockers before replaying the gates.
- [ ] Verify freshness: the vulnerability audit is not older than the latest lockfile change, and the readiness audit is later than the vulnerability audit. Rerun a stale gate before continuing.

### 3 · Mint the first real launch card

- [ ] Inspect the product version, latest tag, `CHANGELOG.md`, and `.flowdeck/_meld/` cards. Classify the initial shipped work as breaking, feature, or fix. If no release-worthy product exists, stop without minting a launch.
- [ ] Propose `v0.1.0` when no package version or release tag exists. If the product has a meaningful pre-existing version, preserve it as the proposed first release; surface any non-obvious version choice for `## HUMAN` rather than guessing.
- [ ] Create `.flowdeck/.crunchdeck/launches/vX.Y.Z/LAUNCH.md` from `_energy-cards/LAUNCH.md.template`. Set Status to **Preparing**, fill product/package/version/owner/target date, include the initial shipped-work summary, and copy brand copy and north-star from PROFILE.
- [ ] Create `.flowdeck/.crunchdeck/launches/vX.Y.Z/TODO.md` with `lifecycle: one-shot`, a BOT verification that LAUNCH.md has no unresolved placeholders, a HUMAN **Go / No-Go** checkbox, and an `## ACTIONS` `publish` action. The action must require Go, fresh gates, and passing build/lint/test evidence before updating versions/changelog, committing, tagging, pushing, and publishing (or pushing the tag for git-only products).
- [ ] Set the launch record’s Go / No-Go table to **Awaiting human decision**. Report the exact card path and proposed version under `## HUMAN`.

### 4 · Close the bootstrap ritual

- [ ] Append a run record under `#### COMMENTS`: date, gate verdicts, proposed version, and minted launch-card path. State that future releases use `flowdeck play launches`.

## HUMAN

- [ ] **Go / No-Go:** Review the first versioned launch record and choose Go before activating its `publish` action.
  > _decision:_
- [ ] **Release gate:** Resolve the NOT READY findings in `.flowdeck/.crunchdeck/prepare-to-publish/AUDIT.md`, then rerun the vulnerability and readiness audits in that order.
  > Current blockers: documented npm naming policy, reconciled `CHANGELOG.md`, authenticated GitHub repository verification and matching metadata, active-card review, and pushing local release work.

#### COMMENTS

- 2026-09-08: Existing vulnerability audit is CLEAN, but the latest readiness audit is NOT READY; first-launch stops before minting a versioned launch card. Future releases use `flowdeck play launches` after the first release is prepared.

<!-- next: Glinder -->

#### COMMENTS
<!-- tokens 2026-09-08 play(Glinder): in=211231 out=3918 -->
