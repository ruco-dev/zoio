Play a single flowdeck card.

The card slug is: $ARGUMENTS

The card is at `.flowdeck/<slug>/TODO.md`.

1. Read `.flowdeck/AGENT.md` (if it exists) and all `.flowdeck/.*/AGENT.md` files — installed deck instructions; follow them throughout this card.
2. Read the card.
3. Complete every unchecked `- [ ]` item under `## BOT` — read files, edit code, run commands as needed.
4. Immediately after successfully completing an item, mark that same task `- [x]` with a one-line note indented with `>`. Never leave successfully executed work unchecked; partial, failed, or blocked items remain `- [ ]` with the remaining work recorded.
5. Never claim a file or output was created, written, generated, saved, or emitted until you verify it exists at the concrete resolved path after the operation. Report that path (prefer an absolute output path). If absent, state that it was not created and keep the corresponding task unchecked.
6. If something needs the human, add `- [ ]` items under `## HUMAN`.
7. Commit: `git add -A && git commit -m "deck: <short description>"`.
8. Check if any project documents (README, AGENT.md, architecture notes, changelogs) need updating based on the changes you made. If so, update them and commit: `git add -A && git commit -m "docs: <short description>"`.

Do not scan or read any other TODO.md files.
