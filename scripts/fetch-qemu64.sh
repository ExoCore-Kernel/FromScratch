#!/usr/bin/env bash
set -Eeuo pipefail

DEST="${1:-public/qemu64}"
BASE="https://ktock.github.io/qemu-wasm-demo/images/alpine-x86_64"
mkdir -p "$DEST"

# QEMU-Wasm is large. These files are fetched only in CI and are not committed.
# The loader is the upstream x86_64 browser build used by the Alpine demo.
for file in out.js out.wasm; do
  echo "Downloading QEMU-Wasm x86_64 $file"
  curl --fail --location --retry 3 --output "$DEST/$file" "$BASE/$file"
done

# Some upstream builds emit a split wasm binary or extra package data. Download
# those when present, but do not fail the build when the upstream build is a
# single-file package.
for optional in out.data out.worker.js; do
  curl --fail --location --retry 2 --output "$DEST/$optional" "$BASE/$optional" || rm -f "$DEST/$optional"
done

cat > "$DEST/NOTICE.txt" <<'NOTICE'
This directory is populated during deployment from ktock/qemu-wasm-demo.
QEMU-Wasm is an experimental QEMU port compiled with Emscripten. The downloaded
runtime is third-party software and is covered by its upstream licences.
NOTICE

echo "QEMU x86_64 browser runtime prepared in $DEST"
