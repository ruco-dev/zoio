import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const write = process.argv.includes("--write");
const roots = ["src", "scripts"];
const files = [];
for (const root of roots) for (const name of await readdir(root)) if (name.endsWith(".ts") || name.endsWith(".mjs")) files.push(join(root, name));
let invalid = false;
for (const file of files) { const input = await readFile(file, "utf8"); const formatted = `${input.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").replace(/\n*$/, "")}\n`; if (input !== formatted) { invalid = true; if (write) await writeFile(file, formatted); else console.error(`Needs formatting: ${file}`); } }
if (invalid && !write) process.exitCode = 1;
