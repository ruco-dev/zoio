# Zoio — Roadmap

## Product Thesis

Zoio starts as a local developer tool for measuring AI search visibility and evolves into a cloud intelligence platform.

The product progression is:

> `zoio scan` measures one query.
>
> `zoio explore` discovers the surrounding query space.
>
> `zoio cloud` measures that space at scale.
>
> `Zoio SaaS` continuously monitors how visibility changes.

---

# Phase 0 — Local CLI MVP

### Goal

Prove that the underlying measurement workflow works without requiring a backend.

### Interface

```bash
zoio scan "Porto" "hotel"
zoio explore "Porto" "hotel"
zoio batch seeds.txt
```

### Deliverables

- npm package;
- CLI;
- provider abstraction;
- OpenAI provider;
- JSONL storage;
- entity extraction;
- citation extraction;
- target matching;
- basic visibility metrics.

### Distribution

Open source, preferably MIT.

### Success criterion

A developer can install Zoio and produce a useful local dataset within minutes.

---

# Phase 1 — Query Intelligence

### Goal

Make query discovery the core differentiator.

Pipeline:

```text
seed
 ↓
query
 ↓
response
 ↓
concept extraction
 ↓
query generation
 ↓
query graph
```

Store relationships such as:

```text
QUERY A
  ├── discovered → QUERY B
  ├── discovered → QUERY C
  └── discovered → QUERY D
```

Add:

```bash
zoio graph "Porto" "hotel"
```

Support graph exports such as JSON and GraphML.

### Strategic objective

Prove that Zoio can discover a useful semantic search space without a manually created keyword list.

---

# Phase 2 — Multi-Provider Benchmarking

### Goal

Turn Zoio from a single-provider scanner into an AI visibility benchmark.

Example:

```bash
zoio scan "Porto" "hotel" --provider openai
zoio scan "Porto" "hotel" --provider anthropic
zoio scan "Porto" "hotel" --provider google
```

Add:

```bash
zoio compare "Porto" "hotel"
```

Example output:

```text
                    OpenAI   Claude   Gemini
Hotel X              32%      21%      38%
Hotel Y              44%      51%      29%
Hotel Z              18%      13%      22%
Your brand           34%      27%      31%
```

### Strategic objective

Create a provider-neutral measure of AI visibility.

---

# Phase 3 — Zoio Cloud

### Goal

Introduce backend infrastructure only after the local engine has proven useful.

CLI flow:

```bash
zoio login
zoio cloud scan seeds.txt
```

### Cloud capabilities

- remote execution;
- job queues;
- retries;
- history;
- persistent storage;
- large query sets;
- API access;
- scheduled execution.

The CLI remains available and useful.

### Architectural principle

The local OSS CLI should not be crippled. Cloud should primarily sell scale, persistence, coordination, and intelligence rather than basic scanning capability.

---

# Phase 4 — Zoio SaaS

### Goal

Create the commercial product layer.

Core dashboard:

```text
ZOIO
────────────────────────────────────

AI Visibility

Porto / Hotels

Mention Rate       34.2%
Recommendation     21.7%
Citation Rate      18.4%

Trend              ↑ 6.2%

Competitors
────────────────────────────
Hotel A             42%
Hotel B             38%
Hotel C             31%
Your brand          34%
```

### Core SaaS capabilities

- projects;
- brands/entities;
- query collections;
- visibility history;
- provider comparisons;
- competitor tracking;
- scheduled scans;
- alerts;
- reports;
- team access;
- API keys.

### Query Universe

A key product view should expose the discovered query space:

```text
Porto / Hotel

1,248 queries discovered

├── locations
├── price
├── amenities
├── intent
├── audience
├── comparisons
└── recommendations
```

---

# Phase 5 — Intelligence Platform

### Goal

Move from monitoring to actionable intelligence.

Pipeline:

```text
Monitoring
   ↓
Visibility trends
   ↓
Competitor intelligence
   ↓
Query opportunities
   ↓
Recommendations
   ↓
Alerts
```

Example alert:

> Visibility dropped 14% this week for queries related to "hotels near Ribeira".

Another:

> A competitor appeared in 37 newly discovered queries where your brand was absent.

At this point, Zoio is no longer just a scanner. It becomes an intelligence platform for AI search.

---

# Open Source / Commercial Boundary

Recommended structure:

```text
zoio/
├── packages/
│   ├── cli/              # OSS
│   ├── core/             # OSS
│   └── schemas/          # OSS
│
├── apps/
│   └── cloud/            # future, private
│
└── docs/
```

### Open source

- CLI;
- schemas;
- local scanner;
- local storage;
- provider interfaces;
- baseline provider integrations;
- basic metrics;
- basic exploration.

### Proprietary

- hosted query execution at scale;
- advanced query discovery;
- advanced query graph algorithms;
- entity resolution;
- proprietary scoring;
- historical aggregate dataset;
- competitor intelligence;
- SaaS dashboard;
- monitoring infrastructure;
- enterprise features.

The OSS package should remain genuinely useful on its own.

---

# Suggested Release Sequence

```text
v0.1  Local scan
v0.2  Target tracking
v0.3  Batch scanning
v0.4  Query discovery
v0.5  Query graph
v0.6  Multi-provider
v0.7  Benchmarking
v0.8  Cloud execution
v0.9  Historical monitoring
v1.0  Zoio SaaS
```

The version numbers are indicative rather than commitments.

---

# Product Positioning Evolution

### Stage 1

> **AI visibility from the command line.**

### Stage 2

> **Explore the search space around any business intent.**

### Stage 3

> **Benchmark visibility across AI search providers.**

### Stage 4

> **Monitor AI search visibility at scale.**

### Stage 5

> **Intelligence infrastructure for AI search.**

---

# Guiding Principle

Do not build the SaaS first.

Build the smallest useful CLI, prove the query-discovery engine, accumulate a structured dataset, then add cloud scale and persistence around the proven core.

The CLI is the distribution channel. The query graph, entity intelligence, historical dataset, and scoring system become the commercial moat.
