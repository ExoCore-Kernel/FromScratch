#!/usr/bin/env bash
set -Eeuo pipefail

DEST="public/qemu64"
BASE="${QEMU64_BASE_URL:-https://ktock.github.io/qemu-wasm-demo/images/alpine-x86_64}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

rm -rf "$DEST"
mkdir -p "$DEST"

echo "Mirroring official QEMU-Wasm x86_64 runtime from: $BASE"

fetch_required() {
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

# The official qemu-wasm-demo create-images.sh publishes exactly these files
# for the x86_64 runtime. Do not infer the ROM package name from Emscripten's
# generated loader: some versions contain the internal name
# `datafile_load-rom.data`, while the deployed file is `load-rom.data`.
fetch_required out.js
fetch_required load-rom.js
fetch_required load-rom.data
fetch_required qemu-system-x86_64.wasm
fetch_required qemu-system-x86_64.worker.js

# Make aliases for any generated filenames referenced by the Emscripten loader.
# This covers builds where load-rom.js asks for datafile_load-rom.data, or where
# out.js uses a different generated Wasm/worker basename. The aliases contain
# the same official bytes and prevent runtime 404s without guessing remote URLs.
python3 - "$DEST" <<'PY'
from pathlib import Path
import re
import shutil
import sys

root = Path(sys.argv[1])
load_rom = root / 'load-rom.js'
out_js = root / 'out.js'

canonical = {
    '.data': root / 'load-rom.data',
    '.wasm': root / 'qemu-system-x86_64.wasm',
    '.worker.js': root / 'qemu-system-x86_64.worker.js',
}

patterns = [
    r"[\"']([^\"']+?\.worker\.js)(?:\?[^\"']*)?[\"']",
    r"[\"']([^\"']+?\.wasm)(?:\?[^\"']*)?[\"']",
    r"[\"']([^\"']+?\.data)(?:\?[^\"']*)?[\"']",
]

references = set()
for source in (load_rom, out_js):
    text = source.read_text(errors='ignore')
    for pattern in patterns:
        references.update(re.findall(pattern, text))

for reference in sorted(references):
    name = Path(reference.split('?', 1)[0]).name
    if not name or name in {path.name for path in canonical.values()}:
        continue

    if name.endswith('.worker.js'):
        source = canonical['.worker.js']
    elif name.endswith('.wasm'):
        source = canonical['.wasm']
    elif name.endswith('.data'):
        source = canonical['.data']
    else:
        continue

    destination = root / name
    if destination.exists():
        continue
    shutil.copyfile(source, destination)
    print(f"  compatibility alias: {name} -> {source.name}")
PY

for required in \
  out.js \
  load-rom.js \
  load-rom.data \
  qemu-system-x86_64.wasm \
  qemu-system-x86_64.worker.js; do
  test -s "$DEST/$required" || {
    echo "Required QEMU-Wasm runtime asset is missing or empty: $required" >&2
    exit 1
  }
done

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
    'version': 16,
    'available': True,
    'gui': True,
    'displayBackend': 'sdl2-canvas',
    'source': sys.argv[2],
    'files': files,
}
(root / 'runtime.json').write_text(json.dumps(metadata, indent=2) + '\n')
PY

echo "QEMU-Wasm x86_64 runtime mirrored successfully:"
ls -lh "$DEST"
