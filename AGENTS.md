# Working Rules: TrustPort Identity SDKs

## Strict Attribution & Commit Rules

- **NEVER** add `Co-authored-by: Claude <...>`, `Co-authored-by: ...`, or any AI co-authorship trailers to git commit messages or PR descriptions under any circumstances.
- **NEVER** mention "Claude", "Anthropic", or any AI assistant names in commit messages, author metadata, pull request titles/bodies, or contributor lists.
- All commits must strictly reflect only the human repository owner (DoctorVee Orjiani <emekaorjiani@gmail.com>).
- Never create git branches with `claude/` prefix.

## Quality & Development

- Test all SDK packages locally before pushing.
- All SOC 2 compliance gates (CVE scan via Trivy, secret checks, unit tests) must pass.
