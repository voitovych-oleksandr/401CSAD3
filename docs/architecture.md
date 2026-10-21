# Architecture

## What problems this agent solves

The agent helps automate the creation of a minimal JavaScript project in a repeatable and safe way. It reduces setup mistakes when creating a Hello World application, wiring npm scripts, configuring Jest tests, creating CI workflow files, and validating the repository state.

It also enforces good engineering practices:

- no destructive git operations,
- no secret leakage,
- no unnecessary file overwrites,
- idempotent run behavior,
- verification before declaring success.

## Skills

The system is built from three skills:

### 1. project-scaffold

Responsible for creating the minimal JavaScript Hello World project, README, and `.gitignore` files. It validates that the entry file exists and that the application can be started.

### 2. build-and-test

Responsible for npm scripts, CommonJS module structure, Jest tests, CI helper scripts, and the build artifact `build/hello.js`.

### 3. github-actions

Responsible for creating a GitHub Actions workflow that runs on Ubuntu, Windows, and macOS, uses Node 22, and uploads the build artifact without any secrets.

## Commands

The command layer orchestrates the work:

- `git-init` — checks repo state and updates `.gitignore` safely.
- `create-project` — launches project scaffold logic.
- `create-build` — launches the build/test setup logic.
- `create-actions` — launches the CI workflow setup logic.
- `check` — validates structure, tests, artifact, YAML, and repo hygiene without modifying files.
- `init` — runs the full workflow in sequence and stops on the first error.

## Data passed between steps

The steps pass data through the repository state rather than a separate structured context object. The key state is carried by files such as `src/index.js`, `package.json`, `build/hello.js`, `.github/workflows/ci.yml`, `.gitignore`, and `README.md`, as well as by the results of `git status` and `npm test`.

## How init handles errors

`init` executes steps in order:

1. `git-init`
2. `create-project`
3. `create-build`
4. `create-actions`
5. `check`

If any step fails, `init` stops immediately and reports the failing step and reason. It does not continue to later steps. It also does not report success until the final `check` passes.

This ensures the workflow is deterministic and does not hide partial failures.

## File roles in the system

The client is VS Code with GitHub Copilot in Agent mode; the agent lives in `.github/agents`, prompts are in `.github/prompts`, and skills are in `.github/skills`.

| File | Role |
| --- | --- |
| `.github/agents/build-engineer.agent.md` | Defines the agent's responsibilities, safe operating rules, forbidden actions, and work order. |
| `.github/skills/project-scaffold/SKILL.md` | Creates the minimal JavaScript application scaffold and verifies the entry file and start command. |
| `.github/skills/build-and-test/SKILL.md` | Creates CommonJS logic, Jest tests, build scripts, and CI helper scripts. |
| `.github/skills/github-actions/SKILL.md` | Produces GitHub Actions configuration for multi-platform CI and artifact upload. |
| `.github/prompts/git-init.prompt.md` | Checks git state and maintains `.gitignore` safely. |
| `.github/prompts/create-project.prompt.md` | Invokes the scaffold skill and validates the project start command. |
| `.github/prompts/create-build.prompt.md` | Invokes the build/test skill and validates build output and tests. |
| `.github/prompts/create-actions.prompt.md` | Invokes the GitHub Actions skill and validates workflow configuration. |
| `.github/prompts/check.prompt.md` | Performs repository validation without changing files. |
| `.github/prompts/init.prompt.md` | Orchestrates the full setup flow and stops on the first error. |
| `README.md` | Human-readable project overview and startup instructions. |
| `.gitignore` | Excludes generated artifacts and local environment files. |
| `docs/architecture.md` | Explains the agent system, skills, commands, and error handling. |

## Summary

This architecture separates responsibilities between:

- agent policy,
- skill logic,
- prompt orchestration,
- validation,
- and documentation.

This keeps the system modular, safe, and easy to rerun.
