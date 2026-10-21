---
agent: build-engineer
description: Run the project-scaffold skill to create or update a minimal JavaScript Hello World project with README and .gitignore, then verify the src/index.js entry file and start command.
---

# create-project

## Before running

- working folder is the repository root,
- Node.js/npm is expected to be available for final validation,
- the project may already exist; the task should be idempotent and update only missing pieces.

## File to execute

- `.github/skills/project-scaffold/SKILL.md`

## What it does

- reads and follows `.github/skills/project-scaffold/SKILL.md`,
- creates or updates a minimal JavaScript Hello World project,
- adds a readable `README.md` only when missing,
- creates a basic `.gitignore` only when missing,
- ensures that the app has a valid entry file at `src/index.js`,
- verifies that there is a runnable `npm` command to start the app.

## Files created or updated

Typical output includes:

- `README.md` (only if missing; otherwise preserve existing content)
- `.gitignore` (only if missing; otherwise preserve existing content)
- `package.json`
- `src/index.js`

## Verification

Run and confirm:

```bash
npm run start
```

Expected result: the app prints a simple Hello World message and exits successfully without errors.

## Error message

If the scaffold is incomplete or invalid, say:

> create-project failed: project scaffold is not runnable; entry file or start command is missing or invalid.

Explain exactly which part failed: missing file, broken script, or invalid JavaScript.

## Re-run safety

This prompt must be safe to run repeatedly: if a project already exists, it should update only what is necessary and not duplicate files, scripts, or README content unnecessarily.
