#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { loadConfig } from "./config.js";
import { discoverConcepts } from "./analysis.js";
import { scan } from "./core.js";
import { requireText, buildSeedQuery } from "./query.js";

interface Options { mode?: "fixture" | "codex" | "openai"; model?: string; outputDir?: string; target?: string; depth?: number; maxQueries?: number }
function parse(args: string[]): { positional: string[]; options: Options } {
  const positional: string[] = []; const options: Options = {};
  for (let index = 0; index < args.length; index += 1) { const value = args[index]; if (!value.startsWith("--")) { positional.push(value); continue; } const next = args[++index];
    if (value === "--mode") options.mode = next as Options["mode"]; else if (value === "--model") options.model = next; else if (value === "--output") options.outputDir = next; else if (value === "--target") options.target = next; else if (value === "--depth") options.depth = Number(next); else if (value === "--max-queries") options.maxQueries = Number(next); else throw new Error(`Unknown option: ${value}`);
  } return { positional, options };
}
function print(result: Awaited<ReturnType<typeof scan>>): void { console.log(`ZOIO\n${"─".repeat(36)}\nQuery: ${result.query.query}\nMode: ${result.search.provider}\nEntities: ${result.entities.length}\nSources: ${result.citations.length}`); if (result.target) console.log(`Target: ${result.target.target}\nMentioned: ${result.target.mentioned ? "YES" : "NO"}${result.target.position ? `\nPosition: ${result.target.position}` : ""}`); }
async function explore(location: string, business: string, options: Options): Promise<void> {
  const config = loadConfig(options); const max = options.maxQueries ?? 20; const depth = options.depth ?? 1; if (!Number.isInteger(depth) || depth < 0 || !Number.isInteger(max) || max < 1) throw new Error("--depth must be 0+ and --max-queries must be 1+.");
  const queue: Array<{ query?: string; depth: number; parentId: string | null }> = [{ depth: 0, parentId: null }]; const seen = new Set<string>(); let completed = 0;
  while (queue.length && completed < max) { const item = queue.shift()!; const result = await scan(location, business, config, undefined, item.depth, item.parentId, item.query); if (seen.has(result.query.query)) continue; seen.add(result.query.query); completed += 1; print(result);
    if (item.depth < depth) for (const concept of discoverConcepts(result.search.text, location, business)) { const next = `${business} in ${concept} ${location}`; if (!seen.has(next)) queue.push({ query: next, depth: item.depth + 1, parentId: result.query.id }); }
  } console.log(`Explored ${completed} queries (limit ${max}, depth ${depth}).`);
}
async function batch(path: string, options: Options): Promise<void> {
  const rows = (await readFile(path, "utf8")).split(/\r?\n/).filter(Boolean); let entities = 0; let mentioned = 0; let recommended = 0;
  for (const [index, row] of rows.entries()) { const [location, business, ...extra] = row.split("|").map((part) => part.trim()); if (!location || !business || extra.length) throw new Error(`Invalid batch row ${index + 1}; expected LOCATION|BUSINESS.`); const result = await scan(location, business, loadConfig(options), options.target); entities += result.entities.length; mentioned += Number(result.target?.mentioned); recommended += Number(result.target?.recommended); print(result); }
  const denominator = rows.length || 1; console.log(`Batch metrics: scans=${rows.length} entities=${entities}${options.target ? ` targetMentionRate=${((mentioned / denominator) * 100).toFixed(1)}% targetRecommendationRate=${((recommended / denominator) * 100).toFixed(1)}%` : ""}`);
}
async function main(): Promise<void> { const [command, ...rest] = process.argv.slice(2); if (command === "version") return void console.log("zoio 0.1.0"); if (command === "config") return void console.log(JSON.stringify(loadConfig(), null, 2)); if (!command || ["--help", "help"].includes(command)) return void console.log("Usage: zoio <scan|explore|batch|config|version> ...\nscan LOCATION BUSINESS [--mode fixture|codex|openai] [--target NAME] [--model MODEL] [--output DIR]");
  const { positional, options } = parse(rest); if (command === "scan") { const [location, business] = positional; print(await scan(requireText(location, "Location"), requireText(business, "Business"), loadConfig(options), options.target)); return; } if (command === "explore") { await explore(requireText(positional[0], "Location"), requireText(positional[1], "Business"), options); return; } if (command === "batch") { await batch(requireText(positional[0], "Batch file"), options); return; } throw new Error(`Unknown command: ${command}`); }
main().catch((error: unknown) => { console.error(`zoio: ${error instanceof Error ? error.message : String(error)}`); process.exitCode = 1; });
export { parse, buildSeedQuery };
