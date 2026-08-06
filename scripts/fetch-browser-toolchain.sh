#!/usr/bin/env bash
set -euo pipefail
DEST="public/compiler"; mkdir -p "$DEST"
BASE="https://binji.github.io/wasm-clang"
for FILE in clang lld memfs sysroot.tar shared.js; do curl -fL --retry 4 "$BASE/$FILE" -o "$DEST/$FILE"; done
