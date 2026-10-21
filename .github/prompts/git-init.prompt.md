---
agent: build-engineer
description: Initialize repository hygiene by checking the git state, creating or updating .gitignore without duplicates, and showing git status.
---

# git-init

## Before running

- Repository root is available.
- Git is initialized or can be checked safely.
- No destructive action is required.

## What it does

- checks whether the repository exists and what its current git state is,
- reads the current `.gitignore` if present,
- adds required ignore entries for local build artifacts and dependencies without duplicating lines,
- keeps existing repository rules unchanged unless needed,
- runs `git status` and reports the result clearly.

## Files created or updated

- `.gitignore` if missing or incomplete
- no project source files are created by this prompt

## Required protections

- never remove existing entries,
- never rewrite history,
- never force-push,
- never delete files as part of cleanup,
- never add secrets or credentials to `.gitignore` comments or output.

## Verification

After running, confirm:

- `.gitignore` exists or is updated,
- entries such as `node_modules/` and `build/` are present exactly once,
- `git status` was executed and reviewed,
- the repository remains safe and repeatable on re-run.

## Error message

If something fails, say:

> git-init failed: repository state could not be checked or `.gitignore` could not be updated safely.

Include the specific reason, such as missing repo, unreadable file, or invalid git state.

## Re-run safety

This command must be idempotent: running it again must not duplicate ignore entries or break the repository state.
