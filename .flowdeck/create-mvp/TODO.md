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

# create-mvp

## BOT

- [x] Scaffold the publishable TypeScript npm CLI
  > Added the package, executable, strict TypeScript build, formatting/lint/test scripts, MIT license, and development workflow.
  > Add package metadata, the `zoio` executable, strict TypeScript configuration, lint/format and test commands, and a documented local development workflow.
- [x] Implement configuration, domain contracts, and deterministic query construction
  > Added typed contracts, environment/config precedence, validation, and repeatable seed-query construction.
  > Support config defaults plus environment-variable precedence, validate CLI inputs, and build seed queries without LLM generation.
- [x] Implement scan modes and the pocket scan pipeline
  > Added fixture, local Codex CLI, and explicit OpenAI adapters with prompt, raw response, model, timestamp, and provider metadata.
  > Add deterministic `fixture` mode for offline smoke tests, `codex` mode that invokes the locally authenticated Codex CLI and returns structured scan data, and optional direct `openai` mode. Preserve response/prompt/model/timestamp metadata and mode-specific provenance without writing credentials to results.
- [x] Add local JSONL storage and scan analysis
  > Persisted query, response, entity, citation, and run records while extracting recommendations, citations, and target signals.
  > Write queries, responses, entities, citations, and runs beneath the configurable local output directory; extract/normalize entities, citations, recommendations, positions, and target matches.
- [x] Ship `zoio scan` with compact terminal output and tests
  > Shipped compact scan output and three offline tests for query generation, extraction/target matching, and JSONL persistence.
  > Support location, business, target, mode/model and output options; use `codex` as the pocket live default, retain deterministic fixtures for offline smoke tests, and cover query generation, persistence, extraction, and target matching without live API calls.
- [x] Implement bounded exploration and batch execution
  > Added depth/count-bounded provenance-aware exploration, independently traceable `LOCATION|BUSINESS` batches, and aggregate target metrics.
  > Add `explore` depth/max-query controls and provenance-aware query queue, plus independently traceable `LOCATION|BUSINESS` batch rows and aggregate visibility metrics.
- [x] Finalize user-facing documentation and release validation
  > Documented install, configuration, privacy, examples, and JSONL schema; build, typecheck, tests, and fixture smoke runs pass.
  > Document installation, configuration, examples, privacy/local-data behavior, JSONL schema, and run all declared checks before requesting release review.

## HUMAN

- [x] Choose the npm package name and confirm MIT as the distribution license
  > The roadmap prefers MIT, but the package name and final license text need owner approval before publishing.
  > _answer_: zoio, MIT
  
- [x] Authenticate Codex locally; optionally provide an OpenAI API key for controlled direct scans
  > Pocket live scans use an existing local Codex CLI login. The normal test suite and default offline smoke test use deterministic fixtures and need no credentials. To exercise the direct OpenAI adapter, set `OPENAI_API_KEY` only in the local environment; do not add it to repository files or result datasets.
- [x] Review MVP scope before release
  > Confirm that Codex-assisted pocket scans, fixture-based testing, optional direct OpenAI scans, JSONL output, scan/explore/batch, and basic metrics are sufficient; cloud and dashboard work remain deferred.

#### COMMENTS

- The offline validation used fixture mode and wrote verified JSONL streams under `/private/tmp/zoio-smoke`; live credentials were not exercised.

## OUTCOME

Built the publishable TypeScript Zoio CLI and its `scan`, `explore`, `batch`, `config`, and `version` commands.
Added local JSONL persistence with five streams plus fixture, Codex CLI, and optional direct OpenAI providers.
Implemented extraction, target visibility, bounded exploration, batch provenance, and three deterministic offline tests.
Use `npm run build && node dist/cli.js scan Porto hotel --mode fixture` for a credential-free smoke run.

<!-- next: Glinder -->
<!-- tokens 2026-09-07 play(Glinder): in=598461 out=11322 -->
