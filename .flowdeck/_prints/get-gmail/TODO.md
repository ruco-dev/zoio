# get-gmail

## BOT

- [ ] check if `mcp__claude_ai_Gmail__label_thread` is available. if not, add a task to human to connect it

- [ ] use the Gmail MCP tools to fetch the 20 most recent threads (any label, any sender)

- [ ] for each thread, read the subject and snippet to assess relevance to this project 

- [ ] discard threads with no plausible connection (promotions, transactional receipts, shipping, social notifications)
 
 - [ ] The thread must fetch cover not only inbox only, but all labels including archived. Sent and spam should stay excluded either way.

- [ ] Check if a label with the name of this repo exists and create it if does not

- [ ] for each relevant thread, apply the {repo-name} label using `mcp__claude_ai_Gmail__label_thread`

- [ ] if no relevant threads remain, stop and create a new card named `gmail-digest-{YYYY-MM-DD}` in column `inbox` with a single `## HUMAN` note explaining why nothing was relevant

- [ ] otherwise, create a new card named `gmail-digest-{YYYY-MM-DD}` in column `inbox` using the `add-card` skill. The card body should contain a `## HUMAN` section listing each relevant thread (subject, sender, one-line relevance reason) and a count of discarded threads. Do not write anything back into this card.

