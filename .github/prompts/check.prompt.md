---
agent: build-engineer
description: Validate the repo structure, test configuration, workflow YAML, and git hygiene without editing files.
---

# check

## Before running

- project files may already exist,
- all earlier setup steps may have been applied,
- this is a read-only validation step.

## What it does

- checks project structure without changing files,
- validates the presence of required files and config entries,
- verifies that the entry file at `src/index.js` exists,
- verifies that `npm test` passes,
- validates that the generated artifact `build/hello.js` exists,
- validates the GitHub workflow YAML,
- checks git status for accidental inclusion of `build/`, `node_modules/`, or secret-like files.

## Files inspected

- repository root and project structure,
- `package.json`,
- `README.md`,
- `.gitignore`,
- `src/index.js`,
- Jest test files,
- `ci.sh`, `ci.bat`,
- `.github/workflows/ci.yml`,
- git status output

## Verification

The prompt must verify all of the following:

- project structure matches the expected minimal JavaScript app,
- `src/index.js` exists,
- `npm test` passes,
- the generated artifact `build/hello.js` exists,
- workflow YAML is present and valid,
- no secrets or sensitive data are committed in the repo,
- `build/` and `node_modules/` are not tracked unintentionally.

## Error message

If the repository does not meet the expected state, say:

> check failed: the project, workflow, or repo hygiene validation did not pass. Review the failing structure, build artifact, tests, or git status.

This message should name the failing area if known.

## Re-run safety

This command must be read-only and safe to execute multiple times. It must never modify files or git state.
