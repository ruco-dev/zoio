# crunchdeck-signal-github

## BOT

- [ ] Read `.crunchdeck/PROFILE.md` for competitor names and related projects. Read `.crunchdeck/ROADMAP.md` for current themes. If PROFILE doesn't exist, stop and note under `## HUMAN` to run `crunchdeck-init` first.

- [ ] Read the repos to watch from `## HUMAN` below.

- [ ] For each repo, fetch the last 3 releases: `gh api repos/<owner>/<repo>/releases --limit 3`. Extract version, date, and headline features.

- [ ] Compare each release against ROADMAP themes — flag if a competitor shipped something in a theme we have as "Next" or "Later".

- [ ] Append a row per notable release to the `## Signal` table in `.crunchdeck/BACKLOG.md`:
  - Signal: `<repo> v<version> — <key feature>`
  - Source: `github:<owner>/<repo>`
  - Date: release date
  - → Item: related candidate if a competitive gap is identified

- [ ] For any identified gap, add a candidate to `## Candidate Items` with Type: `market`.

- [ ] Commit: `git add .crunchdeck/BACKLOG.md && git commit -m "deck: signal — github releases {{ date }}"`.

## HUMAN

- [ ] Repos to watch (competitors, dependencies) — one per line as `owner/repo`:
  > _answer:_

#### COMMENTS
