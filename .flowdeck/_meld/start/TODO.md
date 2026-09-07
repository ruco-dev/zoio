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

# Start

> Your first work area. Add tasks for Claude under `## BOT`, tasks for yourself under `## HUMAN`.
> Notes on a task go on the line below, indented with `>`.
> For a new subject, create a new folder under `.flowdeck/`. For a subtask, create a subfolder here.

## BOT
- [x] Read `ROADMAP.md` and `SPEC.md`, than fill create-mvp card with the necessary human and bot actions
  > Replaced the placeholder with staged CLI, scan, storage, exploration, batch, testing, documentation, and owner-review tasks.
- [x] Read `AGENT.md` and fill in its `## Architecture` section with this project's real stack, structure, and conventions
  > Documented the planned TypeScript npm CLI, provider boundary, JSONL storage, bounded exploration, and MVP exclusions.
- [x] Fill in `AGENT.md`'s `## Current priorities` section with what matters most right now
  > Prioritized the CLI foundation, reliable OpenAI scan path, bounded exploration/batch, and local-first scope.

## HUMAN

- [ ] Once both BOT tasks above are checked, read the `## OUTCOME` section Claude appends below, then run `flowdeck discard start` — this card is a one-time onboarding exercise, not a recurring one

#### COMMENTS

Documentation check: updated `README.md` with the product description and `FLOWDECK.md` with the project vision and implementation gap.

## OUTCOME

The create-mvp card now decomposes the local-first TypeScript CLI into seven executable build stages.
It includes required owner decisions for package/license, API-key smoke testing, and MVP scope review.
Project context now records the provider boundary, JSONL storage model, exploration limits, and priorities.
README and FLOWDECK project state were updated to reflect the planned MVP and its current unimplemented status.

<!-- next: Shark -->
<!-- tokens 2026-09-07 play(Glinder): in=130214 out=3157 -->
