#!/usr/bin/env bash
set -euo pipefail

DEST="public/v86"
PACKAGE="node_modules/v86"
mkdir -p "$DEST"

required=(
  "$PACKAGE/build/libv86.js"
  "$PACKAGE/build/v86.wasm"
  "$PACKAGE/bios/seabios.bin"
  "$PACKAGE/bios/vgabios.bin"
)

for file in "${required[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required v86 package file: $file" >&2
    echo "Run npm install before scripts/fetch-v86.sh." >&2
    exit 1
  fi
done

cp "$PACKAGE/build/libv86.js" "$DEST/libv86.js"
cp "$PACKAGE/build/v86.wasm" "$DEST/v86.wasm"
cp "$PACKAGE/bios/seabios.bin" "$DEST/seabios.bin"
cp "$PACKAGE/bios/vgabios.bin" "$DEST/vgabios.bin"

echo "Prepared v86 browser assets from the official npm package."
