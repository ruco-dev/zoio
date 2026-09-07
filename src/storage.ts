import { mkdir, appendFile } from "node:fs/promises";
import { join } from "node:path";
import type { Citation, Entity, QueryRecord, SearchResult } from "./types.js";
export class JsonlStore {
  constructor(private readonly outputDir: string) {}
  async append(file: string, record: unknown): Promise<void> { await mkdir(this.outputDir, { recursive: true }); await appendFile(join(this.outputDir, file), `${JSON.stringify(record)}\n`, "utf8"); }
  async saveScan(query: QueryRecord, search: SearchResult, entities: Entity[], citations: Citation[]): Promise<void> {
    await this.append("queries.jsonl", query); await this.append("responses.jsonl", { queryId: query.id, ...search });
    for (const entity of entities) await this.append("entities.jsonl", entity); for (const citation of citations) await this.append("citations.jsonl", citation);
  }
}
