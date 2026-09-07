# crunchdeck-init

## BOT

- [ ] Read `FLOWDECK.md` for product name and description. Fall back to `package.json` name/description if not found.

- [ ] Check if `.crunchdeck/` already exists. If it does, stop and note under `## HUMAN` that crunchdeck is already initialized.

- [ ] Create `.crunchdeck/profile/`, `.crunchdeck/backlog/`, `.crunchdeck/roadmap/`, `.crunchdeck/decisions/`, `.crunchdeck/launches/`.

- [ ] Scaffold `.crunchdeck/profile/PROFILE.md` from `_energy-cards/PROFILE.md.template` — substitute `{{PRODUCT_NAME}}`, `{{DATE}}`, and `{{PROMPT}}` from context.

- [ ] Create `.crunchdeck/profile/TODO.md`:
  ```
  # profile

  ## BOT

  - [ ] Read current `PROFILE.md` and any recent changes in `../backlog/BACKLOG.md` and `../roadmap/ROADMAP.md`.
  - [ ] Update `PROFILE.md` if any of these changed: one-liner, elevator pitch, north-star metric, market lane, tagline candidates.
  - [ ] Flag any remaining `{{PLACEHOLDER}}` values to `## HUMAN`.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Scaffold `.crunchdeck/backlog/BACKLOG.md` from `_energy-cards/BACKLOG.md.template` — substitute `{{PRODUCT_NAME}}` and `{{DATE}}`.

- [ ] Create `.crunchdeck/backlog/TODO.md`:
  ```
  # backlog

  ## BOT

  - [ ] **Email signals** — search Gmail for threads from the last 14 days related to this product: user feedback, competitor mentions, feature requests. For each qualifying thread, add a row to `BACKLOG.md` Signal table.

  - [ ] **Web signals** — read `../profile/PROFILE.md` for product category and competitors. Run 3–5 searches. Add findings to `BACKLOG.md` Signal table.

  - [ ] **GitHub release signals** — read `## HUMAN` for repos to watch. Fetch last 3 releases per repo via `gh api repos/<owner>/<repo>/releases --limit 3`. Compare against `../roadmap/ROADMAP.md` themes. Add notable releases to `BACKLOG.md` Signal table.

  - [ ] Review P0/P1 candidates not yet in `../roadmap/ROADMAP.md` — surface them under `## HUMAN` for promotion decision.

  ## HUMAN

  - [ ] GitHub repos to watch (owner/repo, one per line):
    > _answer:_

  #### COMMENTS
  ```

- [ ] Scaffold `.crunchdeck/roadmap/ROADMAP.md` from `_energy-cards/ROADMAP.md.template` — substitute `{{PRODUCT_NAME}}`, `{{DATE}}`, and `{{OWNER}}` from `git config user.name`.

- [ ] Create `.crunchdeck/roadmap/TODO.md`:
  ```
  # roadmap

  ## BOT

  - [ ] Read `../backlog/BACKLOG.md` Promotion Log for newly promoted items not yet in `ROADMAP.md`.
  - [ ] Add promoted items to the correct horizon (Now / Next / Later) with outcome, hypothesis, and metric tracing to PROFILE north-star.
  - [ ] Check if any "Now" items have shipped — update Status.
  - [ ] Verify cross-product dependencies are still current.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Add `.crunchdeck/` to `.gitignore` if not already present.

- [ ] Commit: `git add -A && git commit -m "deck: init crunchdeck"`.

## HUMAN

#### COMMENTS
