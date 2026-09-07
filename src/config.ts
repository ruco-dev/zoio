import { resolve } from "node:path";
import type { ScanMode, ZoioConfig } from "./types.js";

const modes: ScanMode[] = ["fixture", "codex", "openai"];
export function loadConfig(overrides: Partial<ZoioConfig> = {}): ZoioConfig {
  const mode = (overrides.mode ?? process.env.ZOIO_MODE ?? "codex") as ScanMode;
  if (!modes.includes(mode)) throw new Error(`Unknown mode: ${mode}. Use fixture, codex, or openai.`);
  return {
    outputDir: resolve(overrides.outputDir ?? process.env.ZOIO_OUTPUT_DIR ?? "zoio-results"),
    mode,
    model: overrides.model ?? process.env.ZOIO_MODEL
  };
}
