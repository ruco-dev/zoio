# .flowdeck/

This is a flowdeck deck. Columns are folders inside it; cards are `TODO.md` files. See
`AGENT.md` for project-specific context and the full command protocol, and
`../FLOWDECK.md` for the living project document.

## Execution mode and models

Flowdeck defaults to Claude for compatibility. Select a provider with `flowdeck mode codex` or `flowdeck mode claude`, then verify it with `flowdeck check`.

Every flowdeck command plays a card using one of four model aliases:

| Alias | Claude default | Codex default | Use for |
|-------|----------------|---------------|---------|
| `Casual` | `claude-haiku-4-5-20251001` | provider default | Mechanical, well-defined tasks |
| `Glinder` | `claude-sonnet-5` | provider default | Moderate coding work |
| `Shark` | `claude-opus-4-8` | provider default | Complex reasoning or architecture |
| `Wale` | `claude-fable-5` | provider default | Hardest, most ambiguous work |

Commands default to an alias unless overridden:

| Command | Default alias |
|---------|----------------|
| `play`, `flash`, `meld`, `round`, `hand`, `freeze` | `Glinder` |
| `blank`, `reviewer` | `Casual` |
| `deal`, `kemps`, `orchestrator` | `Shark` |

**Override order:** `--model` flag > card frontmatter `model:` > card frontmatter `nick:` >
this project's `.flowdeck/agents.json` > `~/.flowdeck/agents.json` > the built-in defaults above.

To change a model for every card in this project, edit (or create) `.flowdeck/agents.json`. Values may remain legacy Claude strings or use provider maps:

```json
{
  "aliases": { "Shark": { "claude": "claude-opus-5", "codex": "your-codex-model" } },
  "commands": { "deal": "Shark" }
}
```

To change it for every flowdeck project on this machine instead, put the same shape in
`~/.flowdeck/agents.json`. Run `flowdeck agents` to see what's actually resolved here.
