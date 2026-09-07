# crunchdeck-signal-email

## BOT

- [ ] Read `.crunchdeck/PROFILE.md` for product name and competitors. If it doesn't exist, stop and note under `## HUMAN` to run `crunchdeck-init` first.

- [ ] Check if `mcp__claude_ai_Gmail__search_threads` is available. If not, add a `## HUMAN` item to connect Gmail MCP and stop.

- [ ] Search Gmail for the last 14 days: threads mentioning the product name, competitor names from PROFILE.md, and core user pain keywords. Exclude transactional and promotional threads.

- [ ] For each relevant thread, assess: user pain, competitor move, market trend, or request pattern. Discard noise.

- [ ] For each qualifying thread, append a row to the `## Signal` table in `.crunchdeck/BACKLOG.md`:
  - Signal: one-line insight
  - Source: `email`
  - Date: thread date
  - → Item: candidate this signal points to (add to `## Candidate Items` if new)

- [ ] Commit: `git add .crunchdeck/BACKLOG.md && git commit -m "deck: signal — email {{ date }}"`.

## HUMAN

#### COMMENTS
