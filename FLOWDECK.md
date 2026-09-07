# Project

## Vision

Zoio is a local-first CLI that shows which businesses and entities appear in AI-generated answers for a location and business intent, then explores the related query space. It creates a portable dataset of responses, entities, citations, and visibility signals without requiring a Zoio account or backend.

## Current state

<!-- Bullet list of shipped capabilities. Update this after each meld. -->

- TypeScript npm CLI with `scan`, `explore`, `batch`, `config`, and `version` commands.
- Local JSONL scan persistence, deterministic fixture mode, a JSONL-aware Codex CLI mode with bounded timeout/progress, and optional direct OpenAI mode.
- Entity/citation extraction, target visibility matching, bounded exploration, and offline test coverage.

## Known gaps

<!-- Open known issues or missing pieces. Update this after each meld. -->

- Live Codex and OpenAI scans require their respective local credentials; the offline suite uses a fake Codex executable for adapter coverage.
- Publish readiness remains blocked by missing release notes and repository metadata/verification; the current audit is tracked in `.flowdeck/.crunchdeck/prepare-to-publish/`.
