# Project

## Vision

Zoio is a local-first CLI that shows which businesses and entities appear in AI-generated answers for a location and business intent, then explores the related query space. It creates a portable dataset of responses, entities, citations, and visibility signals without requiring a Zoio account or backend.

## Current state

<!-- Bullet list of shipped capabilities. Update this after each meld. -->

- TypeScript npm CLI with `scan`, `explore`, `batch`, `config`, and `version` commands.
- Local JSONL scan persistence, deterministic fixture mode, a JSONL-aware Codex CLI mode with bounded timeout/progress, and optional direct OpenAI mode.
- Entity/citation extraction, target visibility matching, bounded exploration, and offline test coverage.
- Fresh-clone CI runs type checks, formatting checks, and the source test suite; npm packaging excludes compiled test artifacts.

## Known gaps

<!-- Open known issues or missing pieces. Update this after each meld. -->

- Live Codex and OpenAI scans require their respective local credentials; the offline suite uses a fake Codex executable for adapter coverage.
- Publish readiness remains blocked by GitHub repository verification and the human MVP-scope review on `create-mvp`; the initial release notes have been reconciled with active cards and meld history in `CHANGELOG.md`.
