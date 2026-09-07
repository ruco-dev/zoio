---
lifecycle: one-shot
---

# security-findings

> Minted by the `publish-vuln-audit` sleeve ritual. Evidence lives in `VULN-AUDIT.md`; every task below cites its finding. Replaying the ritual refreshes the report and reconciles this card.

## BOT

- [x] Reconcile the resolved registry/lockfile blockers and verify the clean-source package. (VULN-AUDIT.md § 2026-09-07 — CLEAN)
  > Verified 2026-09-07: `prepack` recreates `dist/`, the clean-source tarball contains all 30 expected files, tests pass 6/6, and the follow-up audit has zero advisories.

## HUMAN

- [x] Make the clean-source package contain its declared `dist/cli.js` binary—recommended starting point: `npm pkg set 'scripts.prepack=npm run build'`, then repeat the clean `git archive HEAD` install-and-pack check. This changes `package.json`, so it remains a human publish decision. (VULN-AUDIT.md § 2026-09-07 — CLEAN, Published artifact)
  > Authorized by the request to continue; implemented and verified 2026-09-07.

- [x] Run `npm audit --json` from an environment that can resolve `registry.npmjs.org`, then replay `publish-vuln-audit`; this blocks a reproducible advisory assessment but requires no manifest change. (VULN-AUDIT.md § 2026-09-07 — NEEDS ATTENTION)
  > Verified 2026-09-07: registry audit completed with zero advisories.

- [x] Generate and commit a reproducible npm dependency tree with `npm install`, then replay `publish-vuln-audit`. This creates `package-lock.json`; without it, `npm audit --json` would audit newly resolved versions rather than what ships. (VULN-AUDIT.md § 2026-09-07 — NEEDS ATTENTION)
  > Verified 2026-09-07: tracked `package-lock.json` exists and the audit completed.

#### COMMENTS

> 2026-09-07: Missing lockfile is a release blocker, not an advisory severity finding.
>
> 2026-09-07: Prior network and lockfile blockers are resolved. A clean-source package check found the declared `dist/cli.js` is still absent without an explicit build lifecycle.
>
> 2026-09-07: Added and verified `prepack: npm run build`; the clean-source packaging warning is resolved.
