# Changelog

All notable changes to Zoio are documented in this file.

## [Unreleased]

### Changed

- The npm package identity is now `@ruco-dev/zoio`; the CLI command remains `zoio`.
- Added continuous integration for clean-clone checks, formatting, and tests.
- Excluded compiled test artifacts from the npm package.

## [0.1.0] - 2026-09-08

### Added

- TypeScript CLI commands for `scan`, `explore`, `batch`, `config`, and `version`.
- Local JSONL result storage, deterministic fixture scans, Codex CLI scans, and optional direct OpenAI scans.
- Entity and citation extraction, target visibility matching, and bounded query exploration.

### Notes

- Reconciled against the completed `create-mvp` and `codex-provider-streaming` delivery cards: these entries cover the CLI, providers, persistence, analysis, exploration, batch execution, and Codex JSONL handling shipped for 0.1.0.
- The only meld record is the `start` onboarding card, which contains no consumer-facing release change.
- Publication remains pending the human MVP-scope review tracked on `create-mvp` and repository verification; neither changes the implemented 0.1.0 feature list above.
