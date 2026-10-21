---
agent: build-engineer
description: Run the github-actions skill to create a multi-platform GitHub Actions workflow for push and pull_request on develop and master branches.
---

# create-actions

## Before running

- the local project scripts already work,
- `ci.sh` and `ci.bat` exist,
- the repo is a GitHub repository or is intended for GitHub Actions use.

## File to execute

- `.github/skills/github-actions/SKILL.md`

## What it does

- reads and follows `.github/skills/github-actions/SKILL.md`,
- creates `.github/workflows/ci.yml`,
- configures a CI job matrix for:
  - `ubuntu-latest`
  - `windows-latest`
  - `macos-latest`
- runs on `push` and `pull_request`,
- limits the workflow to `develop` and `master`,
- uses `actions/checkout`, `actions/setup-node` with Node 22, upload-artifact for `build/`, and the appropriate OS-specific script without any secrets.

## Files created

- `.github/workflows/ci.yml`

## Verification

Check that the YAML contains:

- `push` and `pull_request` triggers,
- branch filters for `develop` and `master`,
- a matrix with the three required operating systems,
- `actions/setup-node` with `node-version: 22`,
- `actions/upload-artifact` for the `build/` output,
- exact script calls for the current OS,
- no secret usage or token-based setup.

## Error message

If the workflow is invalid or incomplete, say:

> create-actions failed: GitHub Actions workflow is missing required matrix entries, branch triggers, OS-specific script calls, or artifact upload configuration.

## Re-run safety

The workflow should be idempotent and not duplicate jobs, steps, or trigger blocks when run again.
