# crunchdeck-signal-web

## BOT

- [ ] Read `.crunchdeck/PROFILE.md` for product category, competitors, and core user pain. If it doesn't exist, stop and note under `## HUMAN` to run `crunchdeck-init` first.

- [ ] Derive 3–5 search queries from PROFILE.md: one for the product category, one per main competitor, one for the core user pain.

- [ ] Run each query. Scan for: new competitor features, community discussions (Reddit, HN, X), analyst takes, and trend signals.

- [ ] For each meaningful finding, append a row to the `## Signal` table in `.crunchdeck/BACKLOG.md`:
  - Signal: one-line insight
  - Source: `web:<domain>`
  - Date: today
  - → Item: candidate this signal suggests

- [ ] If any signal warrants a new candidate, add it to `## Candidate Items` with Type, Priority estimate, and Notes.

- [ ] Commit: `git add .crunchdeck/BACKLOG.md && git commit -m "deck: signal — web {{ date }}"`.

## HUMAN

#### COMMENTS
