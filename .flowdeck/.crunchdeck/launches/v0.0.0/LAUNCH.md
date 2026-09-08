# Launch: Zoio v0.0.0

**Package:** `zoio` (unscoped)
**Target date:** TBD — set after launch gates are green
**Owner:** TBD — repository maintainer
**Status:** Preparing first release

---

## Overview

> Zoio is a local-first CLI that measures which entities appear in AI-generated
> location-and-business answers and discovers related query space. It runs
> locally and stores portable JSONL evidence without an account, backend, or
> dashboard.

---

## Product

- [ ] First-release status verified: no applicable npm publication, git tag, or non-baseline release exists
- [ ] Published to npm as `zoio` at the approved version
- [ ] Version tag and CHANGELOG entry created for the approved release
- [ ] Clean-environment install and documented fixture quickstart verified
- [ ] Breaking-change assessment recorded (initial release expected; verify)

### Initial shipped-work summary

- TypeScript npm CLI with `scan`, `explore`, `batch`, `config`, and `version` commands.
- Local JSONL persistence for queries, responses, entities, citations, and runs.
- Fixture, local Codex CLI, and explicit direct OpenAI provider modes with credential boundaries.
- Entity/citation extraction, target visibility matching, bounded exploration, and CI-covered offline tests.

## Docs

- [ ] README reflects the released CLI API and install instructions
- [ ] Hosted documentation scope reviewed (none is currently in MVP scope)
- [ ] Documented fixture scan serves as a working example

## Distribution

- [ ] Launch post drafted using the PROFILE content angle
- [ ] Launch channels selected by the owner
- [ ] Dependent-product cross-links reviewed (none currently identified)

## Brand & Copy

- [x] One-liner pulled from PROFILE: “See how AI answers describe your business, straight from your terminal.”
- [ ] Logo / mark assets reviewed; decide whether an initial CLI-only release needs them

## Measurement

- [ ] North-star instrumentation plan recorded: time from `npm install -g zoio` to a saved structured visibility dataset
- [ ] Pre-launch baseline captured

## Go / No-Go

| Gate | Owner | Decision |
|---|---|---|
| Fresh vulnerability audit is CLEAN/FIXED | TBD — repository maintainer | Awaiting evidence |
| Publish-readiness audit is READY | TBD — repository maintainer | Awaiting evidence |
| Build, lint, test, and clean-install checks pass | TBD — repository maintainer | Awaiting evidence |
| All checklist sections green | TBD — repository maintainer | **Awaiting human decision — Go / No-Go** |

## Kill / Rollback Criteria

- **Rollback if:** the published CLI cannot install, build, or complete its documented fixture scan, or it exposes credentials in outputs.
- **How:** unpublish only when npm policy permits; otherwise publish a corrective patch, document the defect, and advise affected users to upgrade.

## Post-Launch Watch

| Window | Watch | Signal |
|---|---|---|
| First 48h | npm install and fixture-scan reports | Install failures or broken documented workflow |
| First 2 weeks | Time-to-first-saved-dataset feedback | Whether users reach a saved structured dataset in minutes |

## Open Questions

- [ ] TODO: Choose the approved initial publish version after first-release verification.
- [ ] TODO: Choose launch channels and whether an initial release needs logo/mark assets.
- [ ] TODO: Record Go or No-Go only after the child card's gates have fresh evidence.

