---
name: github-actions
description: Add a GitHub Actions CI workflow for a JavaScript project that runs on Ubuntu, Windows, and macOS, uses Node 22, uploads build artifacts, and invokes the project CI scripts without any secrets.
---

# GitHub Actions

## When to use this skill

Use this skill when the project already has working local scripts and you need automated validation in GitHub:

- the project uses npm scripts and CI scripts,
- you want repeatable checks in pull requests and pushes,
- the repository should validate the same project on multiple operating systems,
- you need a minimal workflow without secrets or extra infrastructure.

This skill should be used after the build/test setup is already working locally.

## Inputs

The agent expects:

- a repository root
- a project that already has `ci.sh` and `ci.bat`
- target branch names such as `develop` and `master`

Example input:

```text
branches: [develop, master]
platforms: [ubuntu-latest, windows-latest, macos-latest]
ciScript: ci.sh / ci.bat
```

## What it creates

This skill creates:

- `.github/workflows/ci.yml`

The workflow must:

- run on `push` and `pull_request`
- target `develop` and `master`
- define a job matrix with three OS values:
  - `ubuntu-latest`
  - `windows-latest`
  - `macos-latest`
- use only safe, standard actions
- run `checkout`, `setup-node` with `node-version: 22`, then the appropriate CI script for the current OS
- upload the `build/` output with `actions/upload-artifact@v4` after the tests/build stage completes

No secrets, no token usage, and no hidden environment configuration are allowed.

## Required behavior

The workflow must include:

- `actions/checkout@v4`
- `actions/setup-node@v4` with `node-version: 22`
- a matrix strategy for the three operating systems
- a conditional run:
  - Linux/macOS: `bash ci.sh`
  - Windows: `ci.bat`
- `actions/upload-artifact@v4` with `path: build/`

The workflow should remain minimal and readable.

## Verification checklist

The agent should verify that:

1. the workflow file exists at `.github/workflows/ci.yml`,
2. the trigger includes both `push` and `pull_request`,
3. branch filters include `develop` and `master`,
4. the matrix includes all three operating systems,
5. `actions/setup-node` uses Node 22,
6. the workflow uploads `build/` as an artifact,
7. the script invocation matches the host OS,
8. the workflow does not reference secrets or protected variables.

## If something goes wrong

If the workflow fails, check:

- the repository branch names match exactly,
- the CI scripts are present in the root and executable,
- the Windows runner uses the correct shell and script extension,
- the Node version is compatible with the project,
- the build output is generated as `build/hello.js`,
- there are no secret references or hidden environment assumptions,
- the workflow is not trying to execute unsupported commands for a platform.

The most common issue is a mismatch between the shell used in the workflow and the script format expected by the OS.

## Completion criteria

This skill is complete only when:

- `.github/workflows/ci.yml` is present,
- the matrix includes the required OS values,
- triggers cover the required branches,
- the workflow invokes the local validation scripts without any secrets,
- Node 22 is configured,
- the `build/` directory is uploaded as a GitHub artifact,
- the workflow is designed to run in GitHub Actions and reflects the actual project scripts.
