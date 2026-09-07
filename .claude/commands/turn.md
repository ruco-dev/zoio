You are playing a full turn in this flowdeck project.

Read `.flowdeck/AGENT.md` for project context (if it exists). Also read all `.flowdeck/.*/AGENT.md` files — each is an installed deck's agent instructions; follow them throughout this turn.

Walk `.flowdeck/` and collect every `TODO.md` that has at least one unchecked `- [ ]` item under `## BOT`. These are your hand. If there are no open cards, say so and stop.

## Assess the hand first

Before executing, read all cards and state your plan (a few lines):

1. **Prioritize** — decide play order. Most blocking or highest-leverage first.
2. **Discard** — identify cards that are duplicated or obsolete. For each, move unchecked BOT items to a `## DISCARDED` section with a one-line reason. Do not delete the card file.
3. **Combine** — identify cards with complementary tasks that are more efficient to execute together. Note the combination and work them in a single pass.

## Execute

For each card (or combined set), in your chosen order:
1. Complete every unchecked `- [ ]` item under `## BOT`
2. Immediately after successfully completing an item, mark that same task `- [x]` with a one-line note indented with `>`. Never leave successfully executed work unchecked; partial, failed, or blocked items remain `- [ ]` with the remaining work recorded.
3. Never claim a file or output was created, written, generated, saved, or emitted until you verify it exists at the concrete resolved path after the operation. Report that path (prefer an absolute output path). If absent, state that it was not created and keep the corresponding task unchecked.
4. If something needs the human, add `- [ ]` items under `## HUMAN`
5. Commit: `git add -A && git commit -m "deck: <short description>"`

## After the hand

Once all cards are played, do a holistic documentation pass:
- Check if any project docs (README, architecture notes, changelogs, cross-card insights) need updating based on changes made this turn — update what's out of date, leave the rest untouched
- Check if `.flowdeck/AGENT.md` needs updating based on what you learned — update it if so
- Final commit (only if anything changed): `git add -A && git commit -m "docs: post-turn"`
