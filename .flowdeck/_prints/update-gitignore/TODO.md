# create gitignore if not exist and check if it is proper

## BOT

- [ ] Check if `.gitignore` exists at repo root. If missing, create it with the entries listed in the tasks below. If it exists, proceed to the audit tasks.
- [ ] Verify the OS section of `.gitignore` includes `Thumbs.db` (Windows artifact). If missing, add it under the `# OS` block alongside `.DS_Store`.
- [ ] Verify the Node section includes `pnpm-debug.log*`. If missing, add it alongside `npm-debug.log*` and `yarn-debug.log*`.
- [ ] Verify the Node section includes a broad `*.log` catch-all. If missing, add it to the `# Node` block.
- [ ] Confirm `dist/` is NOT in `.gitignore` — it is intentionally tracked because `package.json` publishes it to npm (`"files": ["dist", "scaffold"]`). If it was accidentally added, remove it.
- [ ] Run `git status` and confirm no newly untracked files appear as a result of the `.gitignore` changes (i.e., no previously-tracked files are now being ignored).

## HUMAN
