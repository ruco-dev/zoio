---
lifecycle: one-shot
network: required
nick: Shark
---
<!-- nick updated to Shark (was none) -->

# Launch Zoio v0.0.0

> First-release work card. Complete the gates in order; do not publish until
> the human records **Go** and every required check is fresh and passing.

## BOT

- [x] Verify this is the first applicable release: inspect npm registry status,
  git tags, and release history. If a non-baseline publication or release is
  found, stop, record the evidence under `## HUMAN`, and direct the maintainer
  to `flowdeck play launches`.
  > `zoio` is unpublished (npm registry 404); local/remote tags and GitHub Releases are empty, so this is the first applicable release.
- [x] Inspect `package.json`, `FLOWDECK.md`, and `.flowdeck/.crunchdeck/PROFILE.md`;
  refresh `LAUNCH.md` with Zoio's package identity, product summary, owner, and
  north-star signal. Preserve the launch template's section order.
  > Refreshed `LAUNCH.md` with `zoio@0.1.0`, ruco-dev maintainer ownership, the local-first product summary, and the minutes-to-dataset north star.
- [x] Run the `publish-vuln-audit` ritual, then the `publish-readiness-audit`
  ritual. Record each verdict and freshness evidence in `LAUNCH.md`; stop if
  either verdict is not CLEAN/FIXED or READY, respectively.
  > 2026-09-08: `npm audit --json` returned zero advisories (CLEAN); readiness remains NOT READY because its recorded human blockers persist and this checkout lacks `tsc`, so the required `npm pack --dry-run` build smoke exits 127.
- [ ] Run `npm run build`, `npm run lint`, and `npm test`; record the commands,
  outcomes, and timestamps in `LAUNCH.md`. Do not proceed on a failure.
- [ ] Verify a clean-environment install and the documented fixture quickstart;
  record the exact commands and outcomes in `LAUNCH.md`.

## HUMAN

- [x] Choose **Go** or **No-Go** in `LAUNCH.md` after reviewing fresh gate and validation evidence. A Go decision authorizes activation of the dormant `publish` action below; a No-Go keeps publication blocked.
- [x] Resolve the current publish-readiness blockers, rerun the required rituals, and record a fresh READY verdict before resuming this launch card: reconcile `CHANGELOG.md` with the release history, authenticate and verify the GitHub repository, review active-card publish conflicts, and push the local release work.

#### COMMENTS

- The readiness report is fresh relative to `package-lock.json` but explicitly NOT READY; per the launch gate, build/lint/test and clean-install validation were not run.
- The 2026-09-08 audit command is CLEAN (0 advisories); `package-lock.json`, `VULN-AUDIT.md`, and `AUDIT.md` have matching 2026-09-08T13:50:33Z mtimes, but a new READY report cannot be produced until the readiness blockers and missing local build toolchain are resolved.
- Mandatory doc check: reviewed `README.md` and `FLOWDECK.md`; neither describes a completed release, so no documentation update is appropriate while this launch remains blocked.

## ACTIONS

- [ ] publish — Activate only after a recorded **Go** decision, fresh CLEAN/FIXED
  vulnerability and READY publish-readiness verdicts, and passing build, lint,
  and test evidence. Before publishing, recheck the intended npm package and
  version, run `npm publish`, verify the published package and global install,
  then update `LAUNCH.md` with evidence.

<!-- next: Shark -->
<!-- tokens 2026-09-08 play(Shark): in=180176 out=3350 -->
