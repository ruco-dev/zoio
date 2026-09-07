export type ScanMode = "fixture" | "codex" | "openai";

export interface ZoioConfig { outputDir: string; mode: ScanMode; model?: string }
export interface QueryRecord { id: string; runId: string; location: string; business: string; query: string; depth: number; parentId: string | null; provenance?: string }
export interface SearchResult { text: string; prompt: string; raw: unknown; model?: string; provider: string; timestamp: string }
export interface Entity { queryId: string; name: string; normalizedName: string; type: string; position: number; mentioned: boolean; recommended: boolean }
export interface Citation { queryId: string; url: string; domain: string; title?: string }
export interface ScanResult { query: QueryRecord; search: SearchResult; entities: Entity[]; citations: Citation[]; target?: TargetMatch }
export interface TargetMatch { target: string; mentioned: boolean; recommended: boolean; cited: boolean; position?: number }
