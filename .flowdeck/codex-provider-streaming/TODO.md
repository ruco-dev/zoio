---
lifecycle: one-shot
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

# Fix Codex scan response handling

## BOT

- [ ] Reproduce the Codex-mode scan path with a deterministic fake `codex` executable that emits multiple `--json` JSONL events, including a final assistant message, and demonstrate the current single-document parsing failure.
- [ ] Update the Codex provider to consume the documented JSONL event stream, preserve the complete structured event sequence as raw provenance, and extract the final assistant response for entity/citation analysis.
- [ ] Add clear, non-sensitive progress feedback while a live Codex scan is in flight and a bounded, configurable timeout with an actionable error that leaves no partial JSONL scan records.
- [ ] Cover successful JSONL parsing, malformed/no-final-message output, provider failures, and timeout behavior with deterministic tests that do not require a live Codex login.
- [ ] Update CLI help and README guidance for Codex scan behavior, then run build, tests, lint, formatting checks, fixture smoke, and `git diff --check`; record evidence on this card.

## HUMAN

- [ ] Restore or provide the Zoio project source tree (including `package.json`, the Codex provider, and its tests); this workspace currently contains only `README.md`, `.flowdeck/`, and Git metadata, so no scan path can be reproduced or changed.

#### COMMENTS

- Fixture mode already verifies the CLI presentation, analysis, and local persistence. The defect is isolated to the live Codex adapter: `execFile` buffers completion without progress, while `codex exec --json` produces JSON Lines rather than a single JSON document.

- The required documentation check found `README.md` present but only containing the title; `FLOWDECK.md` is absent, so neither could be meaningfully updated for this card.

<!-- next: Glinder -->
<!-- tokens 2026-09-07 play(Glinder): in=107060 out=1399 -->
