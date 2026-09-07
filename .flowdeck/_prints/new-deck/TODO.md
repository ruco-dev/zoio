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

# new-deck

## BOT

- [ ] Read `## HUMAN` for the deck name. If not provided, stop and ask for it under `## HUMAN`.

- [ ] Validate the deck name is kebab-case. If not, stop and note the issue under `## HUMAN`.

- [ ] Check that `decks/{{DECK_NAME}}/` does not already exist. If it does, stop and report the conflict — do not overwrite.

- [ ] Create `decks/{{DECK_NAME}}/manifest.json`:
  ```json
  {
    "name": "{{DECK_NAME}}",
    "version": "0.1.0",
    "blueprints": [
      "{{DECK_NAME}}-init"
    ],
    "energyCards": [],
    "sleeveCards": []
  }
  ```

- [ ] Create `decks/{{DECK_NAME}}/blueprints/{{DECK_NAME}}-init/TODO.md`:
  ```markdown
  # {{DECK_NAME}}-init

  ## BOT

  - [ ] Check if `.flowdeck/.{{DECK_NAME}}/` already exists. If it does, stop and note under `## HUMAN` that {{DECK_NAME}} is already initialized.

  - [ ] Read `FLOWDECK.md` for project name. Fall back to `package.json` name if not found.

  - [ ] Create `.flowdeck/.{{DECK_NAME}}/`.

  - [ ] Add `.*` to `.flowdeck/.flowdeckignore` if not already present.

  - [ ] Scaffold `.flowdeck/.{{DECK_NAME}}/README.md` with a one-paragraph description of this deck.

  - [ ] Commit: `git add .flowdeck/.{{DECK_NAME}} && git commit -m "deck: init {{DECK_NAME}}"`.

  ## HUMAN

  #### COMMENTS
  ```

- [ ] Create `decks/{{DECK_NAME}}/energy-cards/.gitkeep`.

- [ ] Create `decks/{{DECK_NAME}}/AGENT-section.md`:
  ```markdown
  ## {{DECK_NAME}}

  The `.flowdeck/.{{DECK_NAME}}/` directory holds {{DECK_NAME}} cards.

  <!-- Describe the card types and their structure here. -->

  **Blueprints:**
  - `{{DECK_NAME}}-init` — scaffold `.flowdeck/.{{DECK_NAME}}/` in this project
  ```

- [ ] If `decks/DECKS.md` exists, append a row to the `## Available Decks` table:
  ```
  | [`{{DECK_NAME}}`]({{DECK_NAME}}/) | <!-- description --> | `{{DECK_NAME}}-init` |
  ```

- [ ] Commit: `git add decks/{{DECK_NAME}} && git commit -m "deck: scaffold {{DECK_NAME}}"` (include `decks/DECKS.md` in the commit if it was updated).

## HUMAN

- [ ] Deck name (kebab-case):
  > _answer:_

#### COMMENTS
