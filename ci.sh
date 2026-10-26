#!/usr/bin/env bash
set -euo pipefail
npm install
npm test
npm run build
node build/hello.js
