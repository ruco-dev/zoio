import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { SearchResult, ScanMode } from "./types.js";

const execFileAsync = promisify(execFile);
export interface SearchProvider { search(query: string, model?: string): Promise<SearchResult> }
export class FixtureProvider implements SearchProvider {
  async search(query: string): Promise<SearchResult> {
    const text = `Recommended options for ${query}:\n1. Example Hotel — recommended for central location.\n2. Riverside House — a boutique choice.\nSources: https://example.com/porto-hotels and https://travel.example.org/guide`;
    return { text, prompt: query, raw: { fixture: true, text }, provider: "fixture", model: "fixture-v1", timestamp: new Date().toISOString() };
  }
}
export class CodexProvider implements SearchProvider {
  async search(query: string, model?: string): Promise<SearchResult> {
    const args = ["exec", "--skip-git-repo-check", "--json"];
    if (model) args.push("--model", model);
    args.push(`Answer this local research query with a short numbered recommendation list and source URLs: ${query}`);
    const { stdout } = await execFileAsync("codex", args, { maxBuffer: 5_000_000 });
    const raw = JSON.parse(stdout) as unknown;
    const text = extractCodexText(raw) || stdout;
    return { text, prompt: query, raw, provider: "codex", model, timestamp: new Date().toISOString() };
  }
}
function extractCodexText(raw: unknown): string {
  if (typeof raw === "object" && raw && "content" in raw && typeof (raw as { content?: unknown }).content === "string") return (raw as { content: string }).content;
  if (Array.isArray(raw)) return raw.map((entry) => typeof entry === "object" && entry && "text" in entry ? String((entry as { text: unknown }).text) : "").filter(Boolean).join("\n");
  return "";
}
export class OpenAIProvider implements SearchProvider {
  async search(query: string, model = "gpt-4.1-mini"): Promise<SearchResult> {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY is required for --mode openai.");
    const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model, input: query }) });
    if (!response.ok) throw new Error(`OpenAI request failed: ${response.status} ${await response.text()}`);
    const raw = await response.json() as { output_text?: string };
    return { text: raw.output_text ?? "", prompt: query, raw, provider: "openai", model, timestamp: new Date().toISOString() };
  }
}
export function providerFor(mode: ScanMode): SearchProvider { return mode === "fixture" ? new FixtureProvider() : mode === "codex" ? new CodexProvider() : new OpenAIProvider(); }
