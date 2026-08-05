#!/usr/bin/env bash
set -Eeuo pipefail

# v86 publishes a rolling release under the tag "latest". The workflow records the release metadata in its logs.
V86_TAG="latest"
API="https://api.github.com/repos/copy/v86/releases/tags/${V86_TAG}"
DEST="public/v86"
mkdir -p "$DEST"

release_json="$(curl -fsSL -H 'Accept: application/vnd.github+json' "$API")"
for name in libv86.js v86.wasm seabios.bin vgabios.bin; do
  url="$(jq -r --arg name "$name" '.assets[] | select(.name == $name) | .browser_download_url' <<<"$release_json" | head -n1)"
  if [[ -z "$url" || "$url" == "null" ]]; then
    echo "Missing v86 release asset: $name" >&2
    echo "Available assets:" >&2
    jq -r '.assets[].name' <<<"$release_json" >&2
    exit 1
  fi
  echo "Downloading $name"
  curl -fL --retry 3 "$url" -o "$DEST/$name"
done

curl -fsSL https://raw.githubusercontent.com/copy/v86/master/LICENSE -o "$DEST/LICENSE-v86.txt"
