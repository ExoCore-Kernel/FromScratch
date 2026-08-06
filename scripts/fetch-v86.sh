#!/usr/bin/env bash
set -euo pipefail
DEST="public/v86"; mkdir -p "$DEST"
BASE="https://github.com/copy/v86/releases/download/v0.3.0"
curl -fL "$BASE/v86_all.zip" -o /tmp/v86.zip
unzip -jo /tmp/v86.zip 'build/libv86.js' 'build/v86.wasm' 'bios/seabios.bin' 'bios/vgabios.bin' -d "$DEST"
