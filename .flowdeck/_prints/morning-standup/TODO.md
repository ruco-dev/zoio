# morning-standup

## BOT

- [ ] Fetch overnight commits across all source repos (since midnight local time)
  $commits = Bash("OWNER=$(gh repo view --json owner --jq '.owner.login'); SINCE=$(date -u -v-1d '+%Y-%m-%dT%H:%M:%SZ' 2>/dev/null || date -u -d 'yesterday' '+%Y-%m-%dT%H:%M:%SZ'); for repo in $(gh repo list \"$OWNER\" --source --no-archived --json name --jq '.[].name' --limit 50 2>/dev/null); do gh api repos/$OWNER/$repo/commits --jq --arg r \"$OWNER/$repo\" '[.[] | select(.commit.author.date >= \"'$SINCE'\") | {repo: $r, sha: .sha[:7], message: .commit.message | split(\"\n\")[0], author: .commit.author.name}]' 2>/dev/null; done | jq -s 'add // []'")

- [ ] Fetch all open PRs waiting for review
  $prs = Bash("OWNER=$(gh repo view --json owner --jq '.owner.login'); for repo in $(gh repo list \"$OWNER\" --source --no-archived --json name --jq '.[].name' --limit 50 2>/dev/null); do gh pr list --repo \"$OWNER/$repo\" --json number,title,url,reviewDecision,statusCheckRollup --state open 2>/dev/null | jq --arg r \"$OWNER/$repo\" '[.[] | .repo = $r]'; done | jq -s 'add // []'")

- [ ] Write standup summary to STANDUP.md (create or overwrite) — sections: Shipped Yesterday, Open PRs, Failing CI
  for each $prs where statusCheckRollup contains any failing check
    → add ## HUMAN item: fix CI on {{ pr.repo }} #{{ pr.number }} — {{ pr.url }}
  for each $prs where reviewDecision = CHANGES_REQUESTED
    → add ## HUMAN item: address review feedback on {{ pr.repo }} #{{ pr.number }} — {{ pr.url }}

- [ ] If nothing shipped and no open PRs, add ## HUMAN item: quiet overnight — confirm priorities for today

## HUMAN
