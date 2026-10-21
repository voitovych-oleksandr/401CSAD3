---
agent: build-engineer
description: Run the build-and-test skill to configure npm scripts, add a Jest test for add(), and create CI helper scripts that build the app and run the tests.
---

# create-build

## Before running

- the basic project scaffold already exists,
- the project root is known,
- JavaScript project files are available for modification.

## File to execute

- `.github/skills/build-and-test/SKILL.md`

## What it does

- reads and follows `.github/skills/build-and-test/SKILL.md`,
- adds or updates npm scripts for `start`, `build`, and `test`,
- creates a simple `add(a, b)` function in CommonJS form,
- adds a Jest unit test such as `BasicAddition`,
- creates helper scripts `ci.sh` and `ci.bat`,
- ensures the project builds output into `build/hello.js` by copying the entry file with a Node shebang at the top.

## Files created or updated

- `package.json`
- `src/index.js`
- Jest test file
- `ci.sh`
- `ci.bat`
- `build/hello.js` after execution

## Verification

Run:

```bash
npm test
bash ci.sh
```

On Windows:

```bat
ci.bat
```

Expected result:

- tests pass,
- the build artifact `build/hello.js` exists,
- `node build/hello.js` runs successfully.

## Error message

If validation fails, say:

> create-build failed: build or test validation did not succeed; check package scripts, Jest setup, or artifact output.

This message should include the failing command and the relevant root cause if known.

## Re-run safety

This prompt must not duplicate scripts, overwrite unrelated files, or create repeated test entries. Re-running must converge to the same working state.
