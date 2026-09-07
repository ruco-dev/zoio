# Project Context

> The selected agent reads this file at the start of every `play` and `turn`. Keep it updated with decisions, constraints, and preferences that should inform all work in this project.
>
> The deck is `.flowdeck/`. Columns are folders inside it. Cards are `TODO.md` files.

<!-- flowdeck:protocol:start -->
<!-- Flowdeck protocol (Commands · Piles · Backlog health) is injected by the CLI. Run `flowdeck protocol` to view. -->
<!-- flowdeck:protocol:end -->

## Architecture

- Zoio is a local-first, open-source npm CLI for measuring how entities appear in AI-generated answers and for discovering related query space.
- The MVP will use Node.js and TypeScript, with the `zoio` executable exposing `scan`, `explore`, `batch`, `config`, and `version` commands.
- Keep command parsing and terminal presentation at the CLI boundary; place the scan orchestration, deterministic query builder, extraction, target matching, and exploration queue in testable core modules.
- Define scan modes behind a small `search(query)` interface: `fixture` for deterministic offline tests, `codex` for the pocket default live path through local `codex exec`, and optional `openai` for direct API scans. Record the mode, prompt, raw response, timestamp, and Codex CLI/model metadata when available. Keep credentials local and never write them to outputs: Codex login authorizes only Codex mode, while `OPENAI_API_KEY` authorizes only the direct API adapter.
- Persist every run locally under `./zoio-results/` as JSONL for queries, responses, entities, citations, and runs; preserve raw provider responses alongside derived data.
- Exploration is bounded by depth and query-count limits, and stores parent/provenance links for every discovered query. No backend, account, database, or dashboard belongs in the MVP.

## Tool Binding

> Advanced: cards can declare tool dependencies (`### TOOLS`) and bind their output to `$var`s in `## BOT` — see README "Tool Binding (advanced)" for the full grammar.

## Preferences

<!-- Coding style, commit format, naming conventions.
     Fill this in — the agent will follow these without being reminded each time.
     Leave blank and the agent guesses. -->

## Current priorities

- Establish the TypeScript npm CLI foundation and the local JSONL run model.
- Deliver the Codex-assisted pocket `scan` path first, including entity/citation extraction and target visibility; retain an optional direct OpenAI adapter for controlled scans.
- Add bounded `explore` and traceable `batch` execution only after scan storage and output are covered by tests.
- Keep the MVP installable in minutes, private by default, and explicitly free of cloud or dashboard scope.

## Piles

<!-- flowdeck:piles:start -->
| Pile | Purpose |
|------|---------|
| `_meld/` | Shipped cards — completed and merged |
| `_discard/` | Cancelled or abandoned cards |
| `_frozen/` | Blocked cards — each has a `FREEZE.md` with an unfreeze signal |
| `_stock/` | Backlog — cards not yet ready to play |
| `_prints/` | reusable card prints — not cards, not played |
| `_energy-cards/` | mdblu templates and prompts — not cards, not played |
| `_sleeve/` | immortal instrument cards — played in place, never melded |
<!-- flowdeck:piles:end -->

## crunchdeck

The `.flowdeck/.crunchdeck/` directory is a product management deck. Each asset is a card — a folder with a document and a `TODO.md` that drives work on it.

**Standing cards (created by `crunchdeck-init`):**
- `.flowdeck/.crunchdeck/crunchdeck-inbox/` — `TODO.md` — finding cards forwarded from emaildeck / gitdeck / webdeck, awaiting routing
- `.flowdeck/.crunchdeck/profile/` — `PROFILE.md` + `TODO.md` — product identity: one-liner, elevator pitch, north-star, market lane
- `.flowdeck/.crunchdeck/backlog/` — `BACKLOG.md` + `TODO.md` — candidate items promoted from inbox
- `.flowdeck/.crunchdeck/roadmap/` — `ROADMAP.md` + `TODO.md` — committed themes by horizon (Now / Next / Later)
- `.flowdeck/.crunchdeck/launches/` — `TODO.md` — recurring release pipeline (`<!-- lifecycle: recurring -->`); auto-resets after each play, never melds

**Created per-instance:**
- `.flowdeck/.crunchdeck/_decisions/ADR-XXXX/` — `ADR-XXXX.md` + `TODO.md` — architectural and product decisions
- `.flowdeck/.crunchdeck/launches/vX.Y.Z/` — `LAUNCH.md` + `TODO.md` — per-launch operational checklists (created by the launches pipeline card)
- `.flowdeck/.crunchdeck/prepare-to-publish/` — `AUDIT.md` + `TODO.md` — publish blockers as bot/human fix tasks (minted by the `publish-readiness-audit` sleeve ritual)
- `.flowdeck/.crunchdeck/security-findings/` — `VULN-AUDIT.md` + `TODO.md` — dependency vulnerabilities as bot/human fix tasks (minted by the `publish-vuln-audit` sleeve ritual)

**Sleeve rituals (in `.flowdeck/.crunchdeck/_sleeve/`, played in place, never melded):**
- `crunchdeck-init` — install/repair scaffold; replay converges the working tree
- `publish-readiness-audit` — read-only pre-flight before going public: registry identity, tarball truth, git hygiene, docs drift, deck state (incl. the card-sending inbox gate — the board-level `_inbox/` must hold no unmelded received cards, `flowdeck inbox --gate`), CI, build smoke. Findings mint/refresh the `prepare-to-publish` folder card (`AUDIT.md` + bot/human fix tasks); READY verdict hands off to `launches/`. Play before every release
- `publish-vuln-audit` — dependency-vulnerability audit, played **before** `publish-readiness-audit` (which gates on its freshness — a run older than the last lockfile change does not count). Always audits read-only; **may** apply `npm audit fix` (never `--force`) when the change is lockfile-only and in-range and the host declares a test command, reverting on test failure; hard-stops to `## HUMAN` for `--force`, major bumps, no-fix-available advisories, and direct-dependency range changes. Never edits `package.json`. Verdict CLEAN / FIXED / NEEDS ATTENTION / N-A mints the `security-findings` folder card (`VULN-AUDIT.md` + fix tasks)

**Pipeline:** emaildeck / gitdeck / webdeck (`send-to-crunchdeck`) → `crunchdeck-inbox/` → Backlog / Roadmap / Decision → flowdeck cards

**To play a crunchdeck card**, read the `TODO.md` in the relevant folder and execute its `## BOT` tasks, writing changes to the companion document in the same folder.

### Triggers

Act on these without waiting to be asked:

- **Architectural or product decision made** — open an ADR immediately: `flowdeck blueprint use crunchdeck-adr <slug>`, fill it with the decision, rationale, and rejected alternatives.
- **Release being prepared** — play `publish-vuln-audit`, then `publish-readiness-audit`; on READY, play `.flowdeck/.crunchdeck/launches/TODO.md`; it infers the version from untagged meld cards and scaffolds the launch folder.
- **Open question resolved into a significant choice** — if reversing it would cost meaningful time or money, it warrants an ADR.

Surface the created file path under `## HUMAN` so the human can review.

### Protocol: Undocumented Work

Before implementing any non-trivial change — new capability, changed behavior, user-visible fix, or architectural decision:

1. **Offer a card first**: "This looks like it warrants a flowdeck card — want me to create one before starting?"
2. **If declined**, implement the work.
3. **After implementation**, if no card was created: "I implemented this without a card. Want me to write and meld it now so it's tracked for the next release?" If yes, create the card with tasks pre-marked `[x]` and move it to `_meld/` with today's timestamp.

A change is non-trivial if it would appear in a CHANGELOG: new feature, changed behavior, fixed bug, or significant refactor. Small edits, typo fixes, and config tweaks do not need cards.
