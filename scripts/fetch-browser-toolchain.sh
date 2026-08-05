#!/usr/bin/env bash
set -Eeuo pipefail

DEST="${1:-public/toolchain}"
BASE="https://binji.github.io/wasm-clang"
mkdir -p "$DEST"

for file in shared.js clang lld memfs sysroot.tar; do
  echo "Downloading wasm-clang/$file"
  curl --fail --location --retry 3 --output "$DEST/$file" "$BASE/$file"
done

cat > "$DEST/NOTICE.txt" <<'NOTICE'
The files in this directory are downloaded during the GitHub Pages build from
https://binji.github.io/wasm-clang and are not authored by FromScratch.
wasm-clang is alpha/demo software based on LLVM, Clang, LLD and WASI.
See THIRD_PARTY_NOTICES.md and the upstream repository for licensing details.
NOTICE

echo "Browser compiler assets prepared in $DEST"
