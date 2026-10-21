---
agent: build-engineer
description: Run the full repository setup pipeline in order: git-init, create-project, create-build, create-actions, then validate with check. Stop immediately on first failure.
---

# init

## Before running

- repository root is available,
- the agent is allowed to perform the full setup flow in sequence,
- the user expects a safe, repeatable initialization process without destructive actions.

## Files to execute in order

This prompt orchestrates the following files sequentially:

1. `.github/prompts/git-init.prompt.md`
2. `.github/prompts/create-project.prompt.md`
3. `.github/prompts/create-build.prompt.md`
4. `.github/prompts/create-actions.prompt.md`
5. `.github/prompts/check.prompt.md`

The corresponding skill files used by the steps are:

- `.github/skills/project-scaffold/SKILL.md`
- `.github/skills/build-and-test/SKILL.md`
- `.github/skills/github-actions/SKILL.md`

## What it does

This is the main orchestration prompt. It must run the sequential steps above in order and stop at the first failed step.

The agent must stop at the first failed step and report exactly what failed before continuing.

## Required behavior

- run each sub-step in sequence,
- do not skip the final `check`,
- do not claim success before `check` passes,
- do not continue after a failing stage,
- keep repeated runs safe and idempotent,
- avoid duplicate files, duplicate config values, or repeated script entries,
- if `README.md` or `.gitignore` already exist, preserve them and add only missing content.

## Files created or updated

Depending on state, the sequence may create or update:

- `.gitignore`
- `README.md`
- `package.json`
- `src/index.js`
- Jest test file
- `ci.sh`
- `ci.bat`
- `.github/workflows/ci.yml`
- `build/hello.js`

## Verification

Only after the last step is executed successfully should the agent report completion.

The final `check` must confirm:

- project structure is present,
- `src/index.js` exists,
- `npm test` passes,
- `build/hello.js` exists,
- workflow YAML is valid,
- `build/` and `node_modules/` are not unintentionally tracked,
- no secrets or credentials are exposed.

## Error message

If any step fails, stop immediately and report:

> init failed at <step-name>: <reason>

Example:

> init failed at create-build: Jest test did not pass or build artifact was not generated.

Do not say the initialization succeeded until `check` passes.

## Re-run safety

This prompt must be rerunnable without breaking the repo. If a previous step already completed, the agent must continue from the current valid state instead of duplicating files or commands.
