# Profile: Zoio

**Package:** zoio
**Tier:** open infrastructure
**Status:** Phase 0 — Local CLI MVP (pre-release)
**Updated:** 2026-09-08

---

## Overview

> Zoio is a local-first CLI that measures how AI systems answer "where should I go / who should I hire" questions for a given location and business type, and discovers the surrounding space of related questions — without requiring an account, a backend, or a dashboard.

---

## One-liner

See how AI answers describe your business, straight from your terminal.

## Elevator Pitch

Zoio is an open-source command-line tool that scans AI-generated answers for a location and business type (e.g. "Porto" + "hotel"), then extracts who gets mentioned, recommended, and cited. Unlike SaaS AI-visibility dashboards, it runs locally, stores results as plain JSONL on your own disk, and needs no Zoio account. Its core differentiator is exploration: it recursively discovers the related queries an AI response implies (neighborhoods, price tiers, use cases), building a query graph instead of relying on a hand-built keyword list.

## Success Signal

**North star:** Time from `npm install -g zoio` to a saved, structured visibility dataset for a real query (target: minutes, not hours) — the MVP succeeds if a developer can run `zoio scan` and `zoio explore` and get queries, responses, entities, and citations they can immediately inspect or script against.

## Core Features

- `zoio scan <location> <business>` — one deterministic query → provider response → extracted entities, businesses, and citations, with an optional `--target` brand match (mentioned / recommended / cited / position)
- `zoio explore <location> <business>` — recursive query discovery from response concepts, bounded by `--depth` and `--max-queries`
- `zoio batch <file>` — independently traceable scans across a `LOCATION|BUSINESS` list
- Pluggable provider layer: `fixture` (offline/deterministic tests), `codex` (default live mode via local Codex CLI login), `openai` (explicit API key from environment only)
- Local JSONL storage (`queries`, `responses`, `entities`, `citations`, `runs`) with no server, account, or database
- Basic visibility metrics: mention rate, recommendation rate, citation rate, average position

## Market Lane & Differentiation

| Competitor / Category | What they do | How Zoio differs |
|---|---|---|
| Profound | Enterprise AI-visibility SaaS: hosted dashboards, deep analytics, sales-led pricing | Zoio is a free, open-source CLI you run yourself — no seat, no sales call, no enterprise gate |
| Otterly.ai / Peec AI | Mid-market/entry AI-search monitoring SaaS: brand mention tracking, share-of-voice dashboards | Zoio has no dashboard or hosted account by default; results are a portable local dataset you own and can script against |
| Semrush / Ahrefs (AI-visibility add-ons) | Traditional SEO suites bolting AI-answer tracking onto existing keyword/backlink platforms | Zoio isn't an SEO suite extension — it's purpose-built for AI-answer measurement and query-space discovery, not keyword rank tracking |
| Manually prompting ChatGPT/Perplexity and eyeballing results | Ad hoc, unstructured, not reproducible or comparable over time | Zoio structures every scan (query, response, entities, citations, target status) into a reproducible, comparable JSONL record |

**The edge in one line:** Zoio is the open-source, local-first CLI for AI visibility — own your dataset, discover the query space automatically, pay nothing until you need cloud scale.

## Tagline Candidates

- "AI visibility from the command line."
- "See who AI recommends before your customers ask."
- "Explore the search space around any business intent."

## Messaging

| Context | Copy |
|---|---|
| npm / README header | AI search visibility scanner and query discovery engine — scan a location and business type, get a structured local dataset back. |
| Website hero | Stop guessing how AI describes your business. Scan it, in your terminal, in minutes. |
| One-sentence (canonical above) | See how AI answers describe your business, straight from your terminal. |
| Objection → response | "Isn't this just another AI-SEO dashboard?" → No account, no server: it's an MIT-licensed CLI that writes plain JSONL to your own disk, so you can inspect, version, or pipe the data anywhere. |

## Content Angle

Every AI-visibility tool right now asks you to trust a hosted dashboard and hand over a seat fee before you've seen a single result. Zoio's launch story is the opposite bet: `npm install -g zoio`, run one scan, and you have a real structured dataset — queries, entities, citations, target position — on your own machine in minutes, before any conversation about cloud or pricing.

## Open Questions

- [ ] TODO: Which second live provider ships first after `codex`/`openai` — Anthropic, Google, or Perplexity — and does that decision live in the roadmap or wait for user demand?
- [ ] TODO: How aggressive should entity normalization get in the MVP before it risks false-positive brand matches?
- [ ] TODO: What triggers the OSS/cloud split in practice (Phase 3) — a specific scale threshold, a specific missing capability, or a fixed timeline?
- [ ] TODO: Pricing model shape for Zoio Cloud/SaaS — usage-based, seat-based, or hybrid — is undecided.

---