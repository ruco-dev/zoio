import { createHash } from "node:crypto";
import type { QueryRecord } from "./types.js";

export function requireText(value: string | undefined, label: string): string {
  const clean = value?.trim();
  if (!clean) throw new Error(`${label} is required.`);
  return clean;
}
export function buildSeedQuery(location: string, business: string): string {
  return `What are the best ${business.trim()} options in ${location.trim()}? Include concise reasons and links to sources.`;
}
export function makeQuery(runId: string, location: string, business: string, depth = 0, parentId: string | null = null, query = buildSeedQuery(location, business), provenance?: string): QueryRecord {
  const id = `q_${createHash("sha256").update(`${runId}:${query}:${depth}`).digest("hex").slice(0, 12)}`;
  return { id, runId, location: requireText(location, "Location"), business: requireText(business, "Business"), query, depth, parentId, provenance };
}
