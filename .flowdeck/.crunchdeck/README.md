# crunchdeck — Zoio

Product management layer powered by [crunchdeck](https://github.com/ruco-dev/crunchdeck) + [flowdeck](https://github.com/ruco-dev/flowdeck). Initialized 2026-09-08.

Each document lives inside a card folder alongside a `TODO.md`. This directory sits at `.flowdeck/.crunchdeck/` and is excluded from `flowdeck turn` — play cards explicitly: `flowdeck play .crunchdeck/profile`.

## profile/

`PROFILE.md` is the slow-changing identity layer and single source of truth for the product's one-liner, elevator pitch, north-star metric, market lane, and taglines.

## backlog/ and roadmap/

`BACKLOG.md` is the curated, unscheduled strategic inventory. `ROADMAP.md` contains committed Now, Next, and Later outcomes that trace back to the profile’s north-star metric.

## _decisions/

`_decisions/ADR-XXXX/` records significant architectural and product decisions and their rejected alternatives.

## launches/ and stats/

`launches/vX.Y.Z/` holds per-release gates. `STATS.md` is a lightweight ledger for package operating metrics.

## Pipeline

```
emaildeck / gitdeck / webdeck → crunchdeck-inbox/ → Backlog / Roadmap / Decision → flowdeck cards / GitHub Issues
```
