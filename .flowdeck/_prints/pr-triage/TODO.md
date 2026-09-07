# pr-triage

## BOT

- [ ] Fetch all open PRs across repos for this GitHub owner/org
  $prs = Bash("OWNER=$(gh repo view --json owner --jq '.owner.login'); for repo in $(gh repo list \"$OWNER\" --source --no-archived --json name --jq '.[].name' --limit 50 2>/dev/null); do gh pr list --repo \"$OWNER/$repo\" --json number,title,createdAt,url,statusCheckRollup --state open 2>/dev/null | jq --arg r \"$OWNER/$repo\" '[.[] | .repo = $r]'; done | jq -s 'add // []'")

- [ ] Flag stale PRs (open ≥ 7 days) as HUMAN tasks
  for each $prs where age since createdAt ≥ 7 days
    → add ## HUMAN item: review or close {{ pr.repo }} #{{ pr.number }} — "{{ pr.title }}" {{ pr.url }}

- [ ] Flag PRs with CI failures as HUMAN tasks
  for each $prs where statusCheckRollup contains any failing check
    → add ## HUMAN item: fix CI on {{ pr.repo }} #{{ pr.number }} — "{{ pr.title }}" {{ pr.url }}

- [ ] If $prs is empty or all PRs are healthy, add ## HUMAN item: deck is clean — no stale or failing PRs

## HUMAN
