import type { Citation, Entity, TargetMatch } from "./types.js";
export const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
export function extractEntities(text: string, queryId: string, business: string): Entity[] {
  const entities: Entity[] = [];
  for (const match of text.matchAll(/^\s*(\d+)[.)]\s*([^—\n:]+)(?:[—:](.*))?$/gm)) {
    const name = match[2].trim();
    if (name.length > 1) entities.push({ queryId, name, normalizedName: normalize(name), type: business, position: Number(match[1]), mentioned: true, recommended: /recommend|best|choice/i.test(match[0]) });
  }
  return entities;
}
export function extractCitations(text: string, queryId: string): Citation[] {
  return [...new Set(text.match(/https?:\/\/[^\s)]+/g) ?? [])].map((url) => ({ queryId, url, domain: new URL(url).hostname }));
}
export function matchTarget(target: string, entities: Entity[], citations: Citation[]): TargetMatch {
  const needle = normalize(target); const entity = entities.find((item) => item.normalizedName.includes(needle) || needle.includes(item.normalizedName));
  return { target, mentioned: Boolean(entity), recommended: Boolean(entity?.recommended), cited: citations.some((item) => normalize(item.url).includes(needle)), position: entity?.position };
}
export function discoverConcepts(text: string, location: string, business: string): string[] {
  const ignored = new Set([location.toLowerCase(), business.toLowerCase(), "what", "include", "concise", "reasons", "links", "recommended", "options", "sources", "example"]);
  return [...new Set((text.match(/\b[A-Z][a-z]{3,}\b/g) ?? []).map((word) => word.toLowerCase()).filter((word) => !ignored.has(word)))].slice(0, 8);
}
