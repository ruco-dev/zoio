# Zoio

AI search visibility scanner and query discovery engine. Zoio scans AI answers by location and business type, then stores a portable local dataset.

## Install and develop

Zoio requires Node.js 20 or newer. To develop from a checkout:

```bash
npm install
npm run build
npm test
node dist/cli.js scan Porto hotel --mode fixture
```

For a global install after publishing, use `npm install -g @ruco-dev/zoio`, then run `zoio scan Porto hotel`.

Release notes are maintained in [CHANGELOG.md](CHANGELOG.md).

## Commands

```bash
# Deterministic, credential-free local smoke test
zoio scan Porto hotel --mode fixture --target "Example Hotel"

# Default live path: uses the locally authenticated Codex CLI
zoio scan Porto hotel --target "Hotel X"

# Codex scans show a short progress message and default to a two-minute timeout
zoio scan Porto hotel --timeout 180000

# Explicit direct OpenAI scan; the key stays only in the environment
OPENAI_API_KEY=... zoio scan Porto hotel --mode openai --model gpt-4.1-mini

# Discover related query space, bounded by depth and count
zoio explore Porto hotel --mode fixture --depth 1 --max-queries 20

# One independently traceable scan per LOCATION|BUSINESS row
zoio batch seeds.txt --mode fixture

zoio config
zoio version
```

`ZOIO_MODE`, `ZOIO_MODEL`, `ZOIO_OUTPUT_DIR`, and `ZOIO_CODEX_TIMEOUT_MS` configure defaults; command-line options take precedence. Valid modes are `fixture`, `codex` (the default), and `openai`.

Codex mode runs `codex exec --json`, which returns a JSON Lines event stream. Zoio retains the complete event sequence in `responses.jsonl` for provenance, analyzes the final assistant message, emits a non-sensitive in-flight progress message, and defaults to a 120,000ms timeout. Use `--timeout MS` or `ZOIO_CODEX_TIMEOUT_MS` to adjust it. Failed, malformed, or timed-out Codex calls stop before Zoio creates scan records.

## Local data and privacy

Each scan appends JSON Lines records to `./zoio-results/` by default (change with `--output` or `ZOIO_OUTPUT_DIR`):

- `queries.jsonl` — seed and discovered queries, depth, parent ID, and run ID
- `responses.jsonl` — prompt, response text, raw provider payload, timestamp, mode, and model
- `entities.jsonl` — normalized named recommendations, positions, and recommendation status
- `citations.jsonl` — URLs and domains found in responses
- `runs.jsonl` — per-query run provenance and target visibility result

Zoio has no account, backend, dashboard, or remote result storage. Raw provider payloads can contain the response text, so keep result directories private when appropriate. Credentials are never written to configuration or JSONL: a local Codex login is used only for `codex` mode, while `OPENAI_API_KEY` is read only for the explicit `openai` adapter.
