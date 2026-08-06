#!/usr/bin/env bash
set -euo pipefail
DEST="public/qemu64"; mkdir -p "$DEST"
URL="${QEMU64_ARCHIVE_URL:-https://github.com/ktock/qemu-wasm-demo/releases/latest/download/alpine-x86_64-runtime.tar.gz}"
if curl -fL --retry 3 "$URL" -o /tmp/qemu64.tar.gz; then tar -xzf /tmp/qemu64.tar.gz -C "$DEST" --strip-components=1 || tar -xzf /tmp/qemu64.tar.gz -C "$DEST"; else echo "Optional QEMU64 runtime unavailable" > "$DEST/README.txt"; fi
