import { randomUUID } from "node:crypto";
import { extractCitations, extractEntities, matchTarget } from "./analysis.js";
import { providerFor } from "./providers.js";
import { makeQuery } from "./query.js";
import { JsonlStore } from "./storage.js";
import type { ZoioConfig, ScanResult } from "./types.js";
export async function scan(location: string, business: string, config: ZoioConfig, target?: string, depth = 0, parentId: string | null = null, query?: string, runId = `run_${randomUUID()}`, onProgress?: (message: string) => void): Promise<ScanResult> {
  const record = makeQuery(runId, location, business, depth, parentId, query); const search = await providerFor(config.mode, { timeoutMs: config.codexTimeoutMs, onProgress }).search(record.query, config.model);
  const entities = extractEntities(search.text, record.id, business); const citations = extractCitations(search.text, record.id); const result = { query: record, search, entities, citations, target: target ? matchTarget(target, entities, citations) : undefined };
  const store = new JsonlStore(config.outputDir); await store.saveScan(record, search, entities, citations); await store.append("runs.jsonl", { runId, mode: config.mode, model: search.model, timestamp: search.timestamp, queryId: record.id, target: result.target }); return result;
}
