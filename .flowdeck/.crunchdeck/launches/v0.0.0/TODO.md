---
lifecycle: one-shot
network: required
---

# Launch Zoio v0.0.0

> First-release work card. Complete the gates in order; do not publish until
> the human records **Go** and every required check is fresh and passing.

## BOT

- [ ] Verify this is the first applicable release: inspect npm registry status,
  git tags, and release history. If a non-baseline publication or release is
  found, stop, record the evidence under `## HUMAN`, and direct the maintainer
  to `flowdeck play launches`.
- [ ] Inspect `package.json`, `FLOWDECK.md`, and `.flowdeck/.crunchdeck/PROFILE.md`;
  refresh `LAUNCH.md` with Zoio's package identity, product summary, owner, and
  north-star signal. Preserve the launch template's section order.
- [ ] Run the `publish-vuln-audit` ritual, then the `publish-readiness-audit`
  ritual. Record each verdict and freshness evidence in `LAUNCH.md`; stop if
  either verdict is not CLEAN/FIXED or READY, respectively.
- [ ] Run `npm run build`, `npm run lint`, and `npm test`; record the commands,
  outcomes, and timestamps in `LAUNCH.md`. Do not proceed on a failure.
- [ ] Verify a clean-environment install and the documented fixture quickstart;
  record the exact commands and outcomes in `LAUNCH.md`.

## HUMAN

- [ ] Choose **Go** or **No-Go** in `LAUNCH.md` after reviewing fresh gate and
  validation evidence. A Go decision authorizes activation of the dormant
  `publish` action below; a No-Go keeps publication blocked.

#### COMMENTS

## ACTIONS

- [ ] publish — Activate only after a recorded **Go** decision, fresh CLEAN/FIXED
  vulnerability and READY publish-readiness verdicts, and passing build, lint,
  and test evidence. Before publishing, recheck the intended npm package and
  version, run `npm publish`, verify the published package and global install,
  then update `LAUNCH.md` with evidence.

