import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { extractCitations, extractEntities, matchTarget } from "./analysis.js";
import { loadConfig } from "./config.js";
import { scan } from "./core.js";
import { buildSeedQuery } from "./query.js";

test("buildSeedQuery is deterministic", () => assert.equal(buildSeedQuery("Porto", "hotel"), buildSeedQuery("Porto", "hotel")));
test("extracts recommendations, citations, and targets", () => { const text = "1. Hotel Azul — recommended option\nhttps://hotel-azul.example"; const entities = extractEntities(text, "q1", "hotel"); const citations = extractCitations(text, "q1"); assert.equal(entities[0].recommended, true); assert.equal(citations[0].domain, "hotel-azul.example"); assert.deepEqual(matchTarget("Hotel Azul", entities, citations), { target: "Hotel Azul", mentioned: true, recommended: true, cited: true, position: 1 }); });
test("fixture scan persists all JSONL records", async () => { const outputDir = await mkdtemp(join(tmpdir(), "zoio-")); const result = await scan("Porto", "hotel", loadConfig({ mode: "fixture", outputDir })); assert.equal(result.entities.length, 2); for (const file of ["queries.jsonl", "responses.jsonl", "entities.jsonl", "citations.jsonl", "runs.jsonl"]) assert.ok((await readFile(join(outputDir, file), "utf8")).length > 0); });
