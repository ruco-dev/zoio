import { execFile } from "node:child_process";
import type { SearchResult, ScanMode } from "./types.js";

export interface SearchProvider { search(query: string, model?: string): Promise<SearchResult> }
export interface CodexProviderOptions { executable?: string; timeoutMs?: number; onProgress?: (message: string) => void }
function runCodex(executable: string, args: string[], timeoutMs: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = execFile(executable, args, { maxBuffer: 5_000_000, timeout: timeoutMs }, (error, stdout) => error ? reject(error) : resolve(stdout));
    // `codex exec` reads piped stdin in addition to a prompt argument. execFile
    // creates that pipe but leaves it open, so explicitly signal that Zoio has
    // no supplemental input instead of making the scan wait for a timeout.
    child.stdin?.end();
  });
}
export class FixtureProvider implements SearchProvider {
  async search(query: string): Promise<SearchResult> {
    const text = `Recommended options for ${query}:\n1. Example Hotel — recommended for central location.\n2. Riverside House — a boutique choice.\nSources: https://example.com/porto-hotels and https://travel.example.org/guide`;
    return { text, prompt: query, raw: { fixture: true, text }, provider: "fixture", model: "fixture-v1", timestamp: new Date().toISOString() };
  }
}
export class CodexProvider implements SearchProvider {
  constructor(private readonly options: CodexProviderOptions = {}) {}
  async search(query: string, model?: string): Promise<SearchResult> {
    // A scan is an independent query, not a resumable coding session. Ephemeral
    // mode avoids loading or updating local rollout state and prevents local
    // session/plugin state from delaying a one-off CLI scan.
    const args = ["exec", "--skip-git-repo-check", "--ephemeral", "--json"];
    if (model) args.push("--model", model);
    args.push(`Answer this local research query with a short numbered recommendation list and source URLs: ${query}`);
    const timeoutMs = this.options.timeoutMs ?? 120_000;
    this.options.onProgress?.("Codex scan in progress…");
    let stdout: string;
    try {
      stdout = await runCodex(this.options.executable ?? "codex", args, timeoutMs);
    } catch (error) {
      const timedOut = error instanceof Error && ("killed" in error || "signal" in error) && ((error as NodeJS.ErrnoException & { killed?: boolean }).killed || (error as NodeJS.ErrnoException & { signal?: string }).signal === "SIGTERM");
      if (timedOut) throw new Error(`Codex scan timed out after ${timeoutMs}ms. Increase --timeout or ZOIO_CODEX_TIMEOUT_MS and try again.`);
      const detail = error instanceof Error ? error.message : String(error);
      throw new Error(`Codex scan failed before a response was saved: ${detail}`);
    }
    const raw = parseCodexEvents(stdout);
    const text = extractCodexText(raw);
    if (!text) throw new Error("Codex scan produced no final assistant message; no scan records were saved.");
    return { text, prompt: query, raw, provider: "codex", model, timestamp: new Date().toISOString() };
  }
}
export function parseCodexEvents(stdout: string): unknown[] {
  const lines = stdout.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) throw new Error("Codex scan returned an empty JSONL event stream; no scan records were saved.");
  return lines.map((line, index) => {
    try { return JSON.parse(line) as unknown; }
    catch { throw new Error(`Codex scan returned malformed JSONL at event ${index + 1}; no scan records were saved.`); }
  });
}
export function extractCodexText(events: unknown[]): string {
  for (const event of [...events].reverse()) {
    if (!event || typeof event !== "object") continue;
    const item = (event as { item?: unknown }).item;
    if (!item || typeof item !== "object") continue;
    const candidate = item as { type?: unknown; text?: unknown; content?: unknown };
    if (candidate.type === "agent_message" && typeof candidate.text === "string") return candidate.text;
    if (candidate.type === "agent_message" && typeof candidate.content === "string") return candidate.content;
  }
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
export function providerFor(mode: ScanMode, codexOptions?: CodexProviderOptions): SearchProvider { return mode === "fixture" ? new FixtureProvider() : mode === "codex" ? new CodexProvider(codexOptions) : new OpenAIProvider(); }
