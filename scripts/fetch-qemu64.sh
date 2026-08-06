#!/usr/bin/env bash
set -Eeuo pipefail

DEST="public/qemu64"
BASE="${QEMU64_BASE_URL:-https://ktock.github.io/qemu-wasm-demo/images/alpine-x86_64}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

rm -rf "$DEST"
mkdir -p "$DEST"

echo "Mirroring official QEMU-Wasm x86_64 runtime from: $BASE"

fetch() {
  local relative="$1"
  local output="$DEST/$relative"
  mkdir -p "$(dirname "$output")"
  echo "  -> $relative"
  curl --compressed -fL --retry 4 --retry-delay 2 "$BASE/$relative" -o "$output"
  test -s "$output" || {
    echo "Downloaded QEMU asset is empty: $relative" >&2
    exit 1
  }
}

# These two JavaScript files reveal the names of the generated Wasm, worker and
# Emscripten data package files. The ROM loader is needed so QEMU can find BIOS
# files under /pack-rom/ without shipping an Alpine guest image.
fetch out.js
fetch load-rom.js

python3 - "$DEST/out.js" "$DEST/load-rom.js" > "$WORK/assets.txt" <<'PY'
from pathlib import Path
import re
import sys

assets = set()
patterns = [
    r"[\"']([^\"']+?\.wasm)[\"']",
    r"[\"']([^\"']+?\.worker\.js)[\"']",
    r"[\"']([^\"']+?\.data)[\"']",
    r"[\"']([^\"']+?\.mem)[\"']",
]
for file_name in sys.argv[1:]:
    text = Path(file_name).read_text(errors='ignore')
    for pattern in patterns:
        for match in re.findall(pattern, text):
            clean = match.split('?', 1)[0].lstrip('./')
            if clean.startswith(('http://', 'https://', '/')):
                clean = clean.rsplit('/', 1)[-1]
            if clean and '/' not in clean:
                assets.add(clean)

# Current official builds use these names. Keeping them as fallbacks makes the
# mirror script survive minifier changes that obscure literal strings.
assets.update({
    'qemu-system-x86_64.wasm',
    'qemu-system-x86_64.worker.js',
})

for asset in sorted(assets):
    print(asset)
PY

while IFS= read -r asset; do
  [[ -n "$asset" ]] || continue
  if ! curl --compressed -fL --retry 4 --retry-delay 2 "$BASE/$asset" -o "$DEST/$asset"; then
    # Some builds do not use a separate worker or use a differently named
    # fallback. Only fail immediately for assets actually referenced by the
    # downloaded loader code.
    if grep -Fq "$asset" "$DEST/out.js" "$DEST/load-rom.js"; then
      echo "Required QEMU-Wasm asset could not be downloaded: $asset" >&2
      exit 1
    fi
    rm -f "$DEST/$asset"
    echo "Optional asset not present in this official build: $asset"
  fi
done < "$WORK/assets.txt"

WASM_FILE="$(find "$DEST" -maxdepth 1 -type f -name '*.wasm' -print -quit)"
DATA_FILE="$(find "$DEST" -maxdepth 1 -type f -name '*.data' -print -quit)"

[[ -n "$WASM_FILE" && -s "$WASM_FILE" ]] || {
  echo "No QEMU x86_64 WebAssembly binary was mirrored." >&2
  exit 1
}
[[ -n "$DATA_FILE" && -s "$DATA_FILE" ]] || {
  echo "No QEMU ROM data package was mirrored. load-rom.js cannot create /pack-rom/." >&2
  exit 1
}

python3 - "$DEST" "$BASE" <<'PY'
from pathlib import Path
import hashlib
import json
import sys

root = Path(sys.argv[1])
files = []
for path in sorted(root.iterdir()):
    if not path.is_file():
        continue
    data = path.read_bytes()
    files.append({
        'name': path.name,
        'bytes': len(data),
        'sha256': hashlib.sha256(data).hexdigest(),
    })
metadata = {
    'format': 'fromscratch-qemu64-runtime',
    'version': 1,
    'available': True,
    'source': sys.argv[2],
    'files': files,
}
(root / 'runtime.json').write_text(json.dumps(metadata, indent=2) + '\n')
PY

echo "QEMU-Wasm x86_64 runtime mirrored successfully:"
ls -lh "$DEST"
