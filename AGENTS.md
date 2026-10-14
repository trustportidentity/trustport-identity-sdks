# Working Rules: TrustPort Identity SDKs

## Strict Attribution & Commit Rules

- **NEVER** add `Co-authored-by: Claude <...>`, `Co-authored-by: ...`, or any AI co-authorship trailers to git commit messages or PR descriptions under any circumstances.
- **NEVER** mention "Claude", "Anthropic", or any AI assistant names in commit messages, author metadata, pull request titles/bodies, or contributor lists.
- All commits must strictly reflect only the human repository owner (DoctorVee Orjiani <emekaorjiani@gmail.com>).
- Never create git branches with `claude/` prefix.

## Feature Branch Lifecycle & Cleanup Rules

- **Squash-Merged Branch Pruning**: All feature and fix PRs in this repository are squash-merged into `main`. Once a PR is merged into `main`, immediately delete the local branch (`git branch -D <branch>`) and prune remotes (`git remote prune origin` or `git push origin --delete <branch>`) to avoid branch confusion or working on diverged heads.
- **Verification Before Deletion**: Since GitHub squash-merges create a single new commit hash on `main`, native `git branch --merged main` may not list squash-merged branches. Always verify the PR commit on `main` (e.g. `git log --grep="#<PR_NUM>" main`) before pruning.
- **Never Keep Stale Branches**: Never keep old local feature branches around after their changes are in `main`. Always branch fresh from `main` (`git checkout -b <type>/<description> main`).

## Quality & Development

- Test all SDK packages locally before pushing.
- All SOC 2 compliance gates (CVE scan via Trivy, secret checks, unit tests) must pass.
