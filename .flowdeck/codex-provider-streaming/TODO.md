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

- [x] Reproduce the Codex-mode scan path with a deterministic fake `codex` executable that emits multiple `--json` JSONL events, including a final assistant message, and demonstrate the current single-document parsing failure.
  > The fake executable emits `thread.started` plus final `item.completed`/`agent_message`; parsing both lines as one document gives `Unexpected non-whitespace character after JSON at position 26`.
- [x] Update the Codex provider to consume the documented JSONL event stream, preserve the complete structured event sequence as raw provenance, and extract the final assistant response for entity/citation analysis.
  > `src/providers.ts` parses each nonblank JSONL event, stores the full array as `raw`, and analyzes the last completed `agent_message` text.
- [x] Add clear, non-sensitive progress feedback while a live Codex scan is in flight and a bounded, configurable timeout with an actionable error that leaves no partial JSONL scan records.
  > CLI writes `zoio: Codex scan in progress…`; `--timeout`/`ZOIO_CODEX_TIMEOUT_MS` default to 120000ms and failures occur before storage begins.
- [x] Cover successful JSONL parsing, malformed/no-final-message output, provider failures, and timeout behavior with deterministic tests that do not require a live Codex login.
  > `src/core.test.ts` uses executable fake Codex scripts; `npm test` passed all 6 tests without credentials.
- [x] Update CLI help and README guidance for Codex scan behavior, then run build, tests, lint, formatting checks, fixture smoke, and `git diff --check`; record evidence on this card.
  > Updated `README.md`, CLI help, and `FLOWDECK.md`; build, test, lint, format check, fixture smoke, and diff check all passed.

## HUMAN

- [x] Restore or provide the Zoio project source tree (including `package.json`, the Codex provider, and its tests); this workspace currently contains only `README.md`, `.flowdeck/`, and Git metadata, so no scan path can be reproduced or changed.
  > Resolved before this play: `package.json`, `src/providers.ts`, and `src/core.test.ts` were present in the workspace.

#### COMMENTS

- Fixture mode already verifies the CLI presentation, analysis, and local persistence. The defect is isolated to the live Codex adapter: `execFile` buffers completion without progress, while `codex exec --json` produces JSON Lines rather than a single JSON document.

- The required documentation check updated `README.md` with JSONL, progress, and timeout guidance, and updated `FLOWDECK.md` current state/known gaps.

- Live validation found Node's `execFile` leaves a piped stdin open. Codex treats that pipe as supplemental input and waits; the provider now closes it immediately and uses `--ephemeral` for one-off scans. A live `Porto hotel` scan then completed with five entities and five sources.

## OUTCOME

Codex scans now parse `codex exec --json` JSONL safely and retain every structured event in response provenance.
The final completed assistant message feeds entity and citation analysis; malformed, absent, failed, and timed-out responses stop before persistence.
CLI progress is non-sensitive, and the 120,000ms default can be changed with `--timeout MS` or `ZOIO_CODEX_TIMEOUT_MS`.
Six offline tests pass, including deterministic fake-executable coverage; fixture smoke output was written to `/private/tmp/zoio-fixture-smoke`.
The provider explicitly closes its empty stdin pipe and runs ephemeral Codex sessions, so a scan cannot block on nonexistent supplemental input.

<!-- next: Casual -->

<!-- next: Glinder -->
<!-- tokens 2026-09-07 play(Glinder): in=253139 out=7706 -->
