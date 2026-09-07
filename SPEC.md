# Zoio

> AI search visibility scanner and query discovery engine.

## 1. Vision

Zoio is a CLI tool for measuring how businesses, brands, and entities appear in AI-generated answers when a user searches about a specific **location + business type**.

The user provides two independent concepts:

```bash
zoio scan "Porto" "hotel"
```

Zoio turns those inputs into an initial query, queries an AI provider, stores the response, and identifies:

- mentioned entities;
- recommended businesses;
- relative position;
- citations and sources;
- target-entity presence;
- relevant concepts discovered from the response.

An optional exploration mode recursively discovers related queries from previous responses.

---

# 2. MVP Objective

The MVP must answer:

> **When someone asks an AI system about this type of business in this location, who appears?**

Optionally:

> **What related searches naturally emerge from those answers?**

The MVP is **not** intended to be:

- an SEO platform;
- a web crawler;
- a full ranking system;
- a content-generation tool;
- a dashboard;
- a multi-user SaaS.

---

# 3. Primary Interface

## 3.1 Direct scan

```bash
zoio scan "Porto" "hotel"
```

Behavior:

1. Build the initial query from the two arguments.
2. Query the configured provider.
3. Store the response.
4. Extract entities.
5. Identify businesses.
6. Store citations/sources.
7. Display a concise terminal summary.

Example:

```text
ZOIO
────────────────────────────────────

Location: Porto
Business: hotel
Query: hotéis no Porto

Entities detected: 17
Businesses: 8
Sources: 7
```

---

# 4. Target / Brand Tracking

The scan may specify a target entity:

```bash
zoio scan "Porto" "hotel" --target "Hotel X"
```

The result must distinguish:

- `mentioned`
- `recommended`
- `cited`

Example:

```text
Target: Hotel X
Mentioned: YES
Recommended: YES
Position: 4
```

or:

```text
Target: Hotel X
Mentioned: NO
```

---

# 5. Query Discovery

The exploration mode is:

```bash
zoio explore "Porto" "hotel"
```

The initial response is analyzed for relevant concepts.

For example, a response may surface:

- Ribeira;
- Baixa;
- Foz;
- boutique;
- economy;
- airport.

These concepts can produce related queries such as:

```text
hotel na Ribeira Porto
hotel na Baixa Porto
hotel na Foz Porto
hotel boutique Porto
hotel económico Porto
hotel perto do aeroporto Porto
```

Each discovered query should record its provenance:

```json
{
  "query": "hotel na Foz Porto",
  "depth": 1,
  "parent": "hotel no Porto",
  "reason": "location discovered in response"
}
```

---

# 6. Exploration Limits

The MVP must prevent unbounded recursion.

Defaults:

```text
depth: 1
max_queries: 20
```

Example:

```bash
zoio explore "Porto" "hotel" --depth 2 --max-queries 50
```

Model:

```text
depth 0  → seed query
depth 1  → concepts discovered in seed response
depth 2  → concepts discovered in depth-1 responses
```

---

# 7. Batch Mode

Input file:

```text
Porto|hotel
Porto|restaurant
Coimbra|hotel
Lisbon|hotel
Braga|restaurant
```

Command:

```bash
zoio batch seeds.txt
```

Each line represents:

```text
LOCATION|BUSINESS
```

Batch jobs must remain independently traceable.

---

# 8. Output Format

The primary MVP format is JSONL.

Suggested structure:

```text
results/
├── queries.jsonl
├── responses.jsonl
├── entities.jsonl
├── citations.jsonl
└── runs.jsonl
```

### queries.jsonl

```json
{
  "id": "q_001",
  "location": "Porto",
  "business": "hotel",
  "query": "hotéis no Porto",
  "depth": 0,
  "parent_id": null
}
```

### responses.jsonl

```json
{
  "query_id": "q_001",
  "mode": "codex",
  "model": "...",
  "response": "...",
  "timestamp": "..."
}
```

### entities.jsonl

```json
{
  "query_id": "q_001",
  "name": "Hotel X",
  "type": "hotel",
  "position": 4,
  "mentioned": true,
  "recommended": true
}
```

### citations.jsonl

```json
{
  "query_id": "q_001",
  "url": "...",
  "domain": "...",
  "title": "..."
}
```

---

# 9. Provider Abstraction

The core must abstract the AI provider.

Conceptual interface:

```python
class Provider:
    def search(self, query: str) -> Response:
        ...
```

The MVP supports three execution modes:

| Mode | Purpose | Authentication |
| --- | --- | --- |
| `fixture` | Deterministic automated tests and offline smoke tests | None |
| `codex` | Pocket, conversational scans through the locally installed Codex CLI | Existing Codex CLI login |
| `openai` | Controlled direct API scans | `OPENAI_API_KEY` |

`codex` is the default live mode for the pocket MVP. It runs the generated query through local `codex exec` with a constrained prompt that returns structured scan data. It must save the raw response, generated prompt, timestamp, Codex CLI version, selected model when available, and `mode: "codex"` alongside derived results. Codex mode must be presented as Codex-assisted research, not as a reproducible API benchmark: model availability, system instructions, and enabled tools may affect its answer.

`fixture` implements the same interface with saved responses. The automated test suite and default offline smoke-test path use it and require neither network access nor credentials.

`openai` remains an explicit, optional adapter for controlled live scans. It reads `OPENAI_API_KEY` only from the local environment; the key is never written to configuration or result files. Codex CLI login must not be used as an OpenAI API credential.

Future providers may include:

- Anthropic;
- Google;
- Perplexity.

Provider-specific code must stay behind the provider interface.

Credentials must come from environment variables and must never be written to result files.

---

# 10. Initial Query Generation

The transformation:

```text
"Porto" + "hotel"
```

to:

```text
"hotéis no Porto"
```

should be deterministic in the MVP.

Do not use an LLM to generate the initial seed query.

LLM usage begins when needed for response interpretation and query discovery.

---

# 11. Entity Extraction

Responses should be analyzed for:

- businesses;
- hotels;
- restaurants;
- brands;
- locations;
- other relevant entities.

Example:

```json
{
  "name": "Hotel X",
  "type": "hotel",
  "context": "recommended",
  "position": 3
}
```

The original response must always be preserved. The system must never store only the model's interpretation.

---

# 12. Entity Normalization

The same entity may appear as:

```text
Hotel X
Hotel X Porto
Hotel X - Porto
hotel-x.com
```

The MVP should provide basic normalization using:

- normalized name;
- display name;
- domain.

Advanced entity resolution is deferred.

---

# 13. Target Matching

For a target such as:

```bash
--target "Hotel X"
```

Zoio must determine:

- whether it was mentioned;
- whether it was recommended;
- its position, where meaningful.

Matching should consider the name, domain, and simple name variants. It should not rely exclusively on exact string matching.

---

# 14. Terminal Output

Output should be readable and compact.

Example:

```text
$ zoio scan "Porto" "hotel" --target "Hotel X"

ZOIO
────────────────────────────────────

Query
  hotéis no Porto

Provider
  OpenAI

Entities
  12 detected
  8 businesses

Target
  Hotel X

  Mentioned      YES
  Recommended   YES
  Position      4

Sources
  7

Saved
  results/runs/2026-09-07T01-32-10.json
```

---

# 15. CLI Commands

MVP commands:

```bash
zoio scan <location> <business>
zoio explore <location> <business>
zoio batch <file>
zoio config
zoio version
```

Future commands:

```bash
zoio report
zoio compare
zoio monitor
zoio graph
```

---

# 16. Configuration

Suggested config file:

```text
~/.zoio/config.toml
```

Example:

```toml
mode = "codex"
model = "..."
output = "./zoio-results"
```

Environment variables take precedence over local configuration.

---

# 17. Storage

The MVP is local-first.

Default output:

```text
./zoio-results/
```

No database, server, account, or dashboard is required.

JSONL is sufficient for the MVP.

This makes the CLI useful as a genuinely open-source local tool.

---

# 18. Privacy

By default:

- no result should be uploaded to Zoio servers;
- no Zoio account is required;
- provider API keys remain local;
- Codex login is used only by `codex` mode and is never read, copied, or stored by Zoio;
- results are stored on the local filesystem.

Cloud execution is introduced later.

---

# 19. Basic Metrics

### Mention Rate

```text
queries with target mentioned
──────────────────────────────
queries executed
```

### Recommendation Rate

```text
queries where target was recommended
────────────────────────────────────
queries executed
```

### Citation Rate

```text
queries where target/domain was cited
──────────────────────────────────────
queries executed
```

### Average Position

Average target position when the target appears in an ordered list.

---

# 20. Reproducibility

Every run should store:

- timestamp;
- provider;
- model;
- query;
- relevant prompt/instructions;
- response.

The system must support comparisons between runs.

AI responses must be treated as non-deterministic unless the provider explicitly guarantees otherwise.

---

# 21. Architecture

```text
                    CLI
                     │
                     ▼
                ┌─────────┐
                │ Scanner │
                └────┬────┘
                     │
             ┌───────┴────────┐
             ▼                ▼
        Query Builder     Provider
                              │
                              ▼
                           Response
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
             Entity Extractor      Citation Extractor
                    │                   │
                    └─────────┬─────────┘
                              ▼
                         Local Storage
```

Exploration adds a query queue and discovery loop:

```text
Response
   │
   ▼
Discovery Engine
   │
   ▼
Query Queue
   │
   ▼
Provider
   │
   ▼
Response
   │
   └──────► Discovery Engine
```

---

# 22. Out of Scope for MVP

Do not build:

- React application;
- dashboard;
- authentication;
- billing;
- multi-tenancy;
- PostgreSQL;
- team management;
- crawler;
- keyword database;
- Google Search Console integration;
- WordPress integration;
- PDF reports;
- competitor dashboard;
- scheduled cloud execution.

The MVP should be installable and usable in minutes.

---

# 23. MVP Success Criteria

The MVP is complete when the following works:

```bash
npm install -g zoio
zoio scan "Porto" "hotel" --target "Hotel X"
```

and:

```bash
zoio explore "Porto" "hotel" --depth 2 --max-queries 50
```

produces a structured dataset containing:

- queries;
- responses;
- entities;
- citations;
- target visibility;
- query relationships.

No Zoio backend should be required.

---

# 24. Core Principle

Zoio is not primarily a keyword generator.

> **Zoio observes and explores the search space around an intent.**

The query is only the entry point.

The strategic asset built over time is the dataset of responses, entities, queries, citations, and relationships between them.
