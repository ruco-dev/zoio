# feeds

## BOT

- [ ] fetch the last 10 posts from each RSS feed listed in `rss.md`
- [ ] deduplicate: skip any post whose URL already appears in a DIGGEST card under `_meld/` or in the current `feeds/` column
- [ ] for each remaining post, score relevance to this project  — discard posts with no clear connection
- [ ] if no relevant posts remain, stop and add a note under `## HUMAN` explaining why no diggest was created
- [ ] from the relevant posts, select the top 5–10 most useful and fill `DIGGEST.md` using `_energy-cards/DIGGEST.md.template` as structure (one `## Post N` section per selected post)
- [ ] create a card `DIGGEST-aaaammddhhmm/` containing:
  - `TODO.md` with a single BOT task: `do the tasks defined in DIGGEST.md`
  - the completed `DIGGEST.md`

## HUMAN
