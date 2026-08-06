#!/usr/bin/env bash
set -euo pipefail

DEST="public/v86"
PACKAGE="node_modules/v86"
VERSION="0.5.424"
mkdir -p "$DEST"

find_asset() {
  local name="$1"
  local candidate
  for candidate in \
    "$PACKAGE/build/$name" \
    "$PACKAGE/$name" \
    "$PACKAGE/bios/$name" \
    "$PACKAGE/build/bios/$name"; do
    if [[ -f "$candidate" ]]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done
  return 1
}

copy_required_asset() {
  local name="$1"
  local source
  if ! source="$(find_asset "$name")"; then
    echo "Missing required v86 package asset: $name" >&2
    echo "Installed package contents:" >&2
    find "$PACKAGE" -maxdepth 3 -type f | sort | sed -n '1,120p' >&2 || true
    exit 1
  fi
  cp "$source" "$DEST/$name"
}

download_bios() {
  local name="$1"
  local output="$DEST/$name"
  local url

  if source="$(find_asset "$name" 2>/dev/null)"; then
    cp "$source" "$output"
    return 0
  fi

  for url in \
    "https://copy.sh/v86/bios/$name" \
    "https://cdn.jsdelivr.net/npm/v86@${VERSION}/bios/$name" \
    "https://unpkg.com/v86@${VERSION}/bios/$name"; do
    echo "Trying $url"
    if curl -fL --retry 3 --connect-timeout 20 "$url" -o "$output.tmp"; then
      if [[ -s "$output.tmp" ]]; then
        mv "$output.tmp" "$output"
        return 0
      fi
    fi
    rm -f "$output.tmp"
  done

  echo "Unable to obtain required v86 BIOS asset: $name" >&2
  exit 1
}

copy_required_asset "libv86.js"
copy_required_asset "v86.wasm"
download_bios "seabios.bin"
download_bios "vgabios.bin"

for file in libv86.js v86.wasm seabios.bin vgabios.bin; do
  if [[ ! -s "$DEST/$file" ]]; then
    echo "Prepared v86 asset is missing or empty: $DEST/$file" >&2
    exit 1
  fi
done

echo "Prepared v86 browser assets:"
ls -lh "$DEST/libv86.js" "$DEST/v86.wasm" "$DEST/seabios.bin" "$DEST/vgabios.bin"
