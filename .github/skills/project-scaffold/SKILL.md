---
name: project-scaffold
description: Create a minimal JavaScript Hello World project scaffold with a README and a basic .gitignore, then verify the src/index.js entry file and runnable command.
---

# Project Scaffold

## When to use this skill

Use this skill when you need to start a new JavaScript project from scratch and want a very small but valid scaffold:

- the repo has no runnable app yet,
- you need a plain Hello World project,
- you want a minimal README and initial .gitignore,
- you need a reproducible starting structure before adding tests or CI.

This is the first step before build/test automation.

## Inputs

The agent expects:

- a target language, for example: `javascript`
- a project name, for example: `hello-world-app`
- an optional working directory or repository root

Example input:

```text
language: javascript
projectName: hello-world-app
```

## What it creates

This skill creates a minimal project structure such as:

- `README.md`
- `.gitignore`
- `package.json`
- `src/index.js`

If `README.md` or `.gitignore` already exist, do not overwrite them; add only the missing content needed for the scaffold.

The project must be a simple JavaScript Hello World application that can be started with a clear npm command.

## Required behavior

The agent must:

- initialize the project with a minimal JavaScript setup,
- create a visible Hello World message in `src/index.js`,
- add a runnable command such as `npm run start`,
- keep the structure compact and easy to understand,
- write a readable README describing how to run the app,
- preserve existing `README.md` and `.gitignore` files instead of replacing them.

## Verification checklist

After creating the project, the agent must verify:

1. the entry file at `src/index.js` exists,
2. the file contains the expected Hello World logic,
3. `package.json` exposes a working run command,
4. the command can be executed successfully with Node.js.

Example validation:

```bash
npm run start
```

Expected result: the console prints a simple greeting such as `Hello, World!`.

## If something goes wrong

If validation fails, check the following:

- Node.js and npm are installed and available on PATH,
- the script name in `package.json` matches the command used,
- the entry file exists in `src/index.js`,
- the file is valid JavaScript and has no syntax errors,
- the project name or path was not accidentally mistyped,
- existing `README.md` or `.gitignore` were not overwritten unintentionally.

If the entry file is missing, create it first. If the command is wrong, fix the npm script before claiming the scaffold is ready.

## Completion criteria

This skill is complete only when:

- the project has a valid entry file at `src/index.js`,
- the README explains how to run it,
- `.gitignore` is present,
- a working start command exists,
- the command was actually run and confirmed to work.
