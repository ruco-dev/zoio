# deploy-readiness

## BOT

- [ ] Detect current repo and default branch
  $repo = Bash("gh repo view --json nameWithOwner,defaultBranchRef --jq '{repo: .nameWithOwner, branch: .defaultBranchRef.name}'")

- [ ] Check open PRs targeting the default branch
  $prs = Bash("gh pr list --base $(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name') --json number,title,url,reviewDecision,statusCheckRollup --state open")

- [ ] Check CI status on the default branch HEAD
  $ci = Bash("gh run list --branch $(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name') --limit 5 --json status,conclusion,name,url")

- [ ] Check commits since last tag
  $unreleased = Bash("git log $(git describe --tags --abbrev=0 2>/dev/null || echo '')..HEAD --oneline 2>/dev/null | head -20")

- [ ] Write DEPLOY-READINESS.md with a go / no-go verdict and supporting evidence — sections: CI Status, Open PRs, Unreleased Commits, Verdict
  for each $prs where reviewDecision = REVIEW_REQUIRED or reviewDecision = CHANGES_REQUESTED
    → add ## HUMAN item: PR #{{ pr.number }} blocks deploy — {{ pr.title }} {{ pr.url }}
  for each $ci where conclusion = failure or conclusion = cancelled
    → add ## HUMAN item: failing CI run blocks deploy — {{ run.name }} {{ run.url }}

- [ ] If no blockers found, add ## HUMAN item: ready to deploy — review DEPLOY-READINESS.md and run release steps

## HUMAN
