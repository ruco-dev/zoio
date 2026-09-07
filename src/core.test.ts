import assert from "node:assert/strict";
import test from "node:test";
import { chmod, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { extractCitations, extractEntities, matchTarget } from "./analysis.js";
import { loadConfig } from "./config.js";
import { scan } from "./core.js";
import { buildSeedQuery } from "./query.js";
import { CodexProvider } from "./providers.js";

async function fakeCodex(script: string): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), "zoio-codex-"));
  const executable = join(directory, "codex");
  await writeFile(executable, `#!/usr/bin/env node\n${script}`, "utf8");
  await chmod(executable, 0o755);
  return executable;
}

test("buildSeedQuery is deterministic", () => assert.equal(buildSeedQuery("Porto", "hotel"), buildSeedQuery("Porto", "hotel")));
test("extracts recommendations, citations, and targets", () => { const text = "1. Hotel Azul — recommended option\nhttps://hotel-azul.example"; const entities = extractEntities(text, "q1", "hotel"); const citations = extractCitations(text, "q1"); assert.equal(entities[0].recommended, true); assert.equal(citations[0].domain, "hotel-azul.example"); assert.deepEqual(matchTarget("Hotel Azul", entities, citations), { target: "Hotel Azul", mentioned: true, recommended: true, cited: true, position: 1 }); });
test("fixture scan persists all JSONL records", async () => { const outputDir = await mkdtemp(join(tmpdir(), "zoio-")); const result = await scan("Porto", "hotel", loadConfig({ mode: "fixture", outputDir })); assert.equal(result.entities.length, 2); for (const file of ["queries.jsonl", "responses.jsonl", "entities.jsonl", "citations.jsonl", "runs.jsonl"]) assert.ok((await readFile(join(outputDir, file), "utf8")).length > 0); });
test("Codex provider reads JSONL and keeps every event as raw provenance", async () => {
  const executable = await fakeCodex(`console.log(JSON.stringify({ type: "thread.started", thread_id: "t1" })); console.log(JSON.stringify({ type: "item.completed", item: { type: "agent_message", text: "1. Hotel Azul — central\\nhttps://hotel-azul.example" } }));`);
  const progress: string[] = []; const result = await new CodexProvider({ executable, onProgress: (message) => progress.push(message) }).search("Porto hotels");
  assert.equal(result.text, "1. Hotel Azul — central\nhttps://hotel-azul.example"); assert.deepEqual(result.raw, [{ type: "thread.started", thread_id: "t1" }, { type: "item.completed", item: { type: "agent_message", text: "1. Hotel Azul — central\nhttps://hotel-azul.example" } }]); assert.deepEqual(progress, ["Codex scan in progress…"]);
});
test("Codex provider rejects malformed JSONL and streams without a final assistant message", async () => {
  const malformed = await fakeCodex(`console.log("not json");`);
  await assert.rejects(new CodexProvider({ executable: malformed }).search("q"), /malformed JSONL/);
  const noMessage = await fakeCodex(`console.log(JSON.stringify({ type: "turn.completed" }));`);
  await assert.rejects(new CodexProvider({ executable: noMessage }).search("q"), /no final assistant message/);
});
test("Codex provider reports executable failures and bounded timeouts", async () => {
  const failure = await fakeCodex(`process.stderr.write("not logged in"); process.exit(2);`);
  await assert.rejects(new CodexProvider({ executable: failure }).search("q"), /failed before a response was saved/);
  const slow = await fakeCodex(`setTimeout(() => console.log(JSON.stringify({ type: "item.completed", item: { type: "agent_message", text: "late" } })), 500);`);
  await assert.rejects(new CodexProvider({ executable: slow, timeoutMs: 20 }).search("q"), /timed out after 20ms/);
});
