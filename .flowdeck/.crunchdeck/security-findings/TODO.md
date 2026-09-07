---
lifecycle: one-shot
---

# security-findings

> Minted by the `publish-vuln-audit` sleeve ritual. Evidence lives in `VULN-AUDIT.md`; every task below cites its finding. Replaying the ritual refreshes the report and reconciles this card.

## BOT

## HUMAN

- [ ] Generate and commit a reproducible npm dependency tree with `npm install`, then replay `publish-vuln-audit`. This creates `package-lock.json`; without it, `npm audit --json` would audit newly resolved versions rather than what ships. (VULN-AUDIT.md § 2026-09-07 — NEEDS ATTENTION)
  > _answer:_

#### COMMENTS

> 2026-09-07: Missing lockfile is a release blocker, not an advisory severity finding.
