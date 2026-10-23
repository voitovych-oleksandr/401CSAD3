---
name: build-and-test
description: Set up npm scripts, a CommonJS add function, Jest tests, and CI helper scripts that build the app and run the tests.
---

# Build and Test

## When to use this skill

Use this skill when the project already exists as a minimal JavaScript app and needs to be hardened with:

- npm scripts for `start`, `build`, and `test`,
- a small function to test,
- Jest unit tests,
- local validation scripts for CI-like execution,
- output generation into a `build` folder.

This is the step after the initial project scaffold and before GitHub Actions automation.

## Inputs

The agent expects:

- a project name, for example: `hello-world-app`
- a JavaScript project root
- an entry file at `src/index.js`
- optionally a preferred build artifact name like `hello`

Example input:

```text
projectName: hello-world-app
entryFile: src/index.js
artifactName: hello
```

## What it creates

This skill creates or updates:

- `package.json` with npm scripts:
  - `start`
  - `build`
  - `test`
- `src/index.js` with a CommonJS function such as `add(a, b)`,
- a Jest test file such as `tests/basicAddition.test.js`,
- a local build output folder such as `build/`,
- `ci.sh` for Linux/macOS,
- `ci.bat` for Windows,
- a generated artifact `build/hello.js` created by copying the entry file and prepending `#!/usr/bin/env node`.

The expected functional example is:

```js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

And the corresponding test:

```js
const { add } = require('../src/index.js');

test('BasicAddition', () => {
  expect(add(2, 3)).toBe(5);
});
```

## Required behavior

The agent must:

- configure Jest properly for the project,
- ensure unit tests can be executed via `npm test`,
- use CommonJS (`require` and `module.exports`) and do not add `"type": "module"`,
- create a build command that produces `build/hello.js` from the entry file,
- ensure both `ci.sh` and `ci.bat` perform the same validation flow,
- keep shell scripts simple and explicit,
- in `ci.bat`, call every `npm` command with `call` because Windows resolves `npm` as a `.cmd` file,
- after each command in `ci.bat`, check `ERRORLEVEL` immediately and exit with a non-zero code if the command fails.

## Verification checklist

The agent must validate with real commands:

```bash
npm test
node build/hello.js
bash ci.sh
```

On Windows, validate:

```bat
node build\hello.js
ci.bat
```

Expected result:

- all tests pass,
- the build artifact `build/hello.js` exists,
- executing `node build/hello.js` prints the same line as `npm run start`,
- the output from `ci.bat` includes the Jest test summary and the line `Hello, World!`.

## Expected build artifact

The project should create an output file named `build/hello.js` after the build step. It should be a copy of the entry file with a shebang at the top:

```js
#!/usr/bin/env node
```

This is the verification point that proves the project is buildable and testable end-to-end.

## If something goes wrong

If the build or tests fail, check:

- `package.json` scripts are spelled correctly,
- Jest is installed and configured,
- the `add` function is exported correctly using CommonJS,
- the test file matches the expected pattern and naming,
- the CI scripts call the same commands as local validation,
- the build process writes `build/hello.js` to the correct directory.

If the test fails, inspect the exact error message and fix the underlying root cause rather than hiding the failure.

## Completion criteria

This skill is complete only when:

- `npm test` passes,
- the project can build through the configured script,
- the output file `build/hello.js` is produced,
- both `ci.sh` and `ci.bat` run successfully in their respective environments,
- the commands were actually executed and the results were checked.
