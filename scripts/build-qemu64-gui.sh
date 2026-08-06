#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/qemu64"
WORK="${RUNNER_TEMP:-/tmp}/fromscratch-qemu64-gui"
QEMU_REPO="https://github.com/ktock/qemu-wasm.git"
# Pinned head of ktock/qemu-wasm PR 21 (dev-e), which contains the maintained
# Emscripten host and WebAssembly TCG backend. The default master branch does not.
QEMU_REF="${QEMU_WASM_REF:-5a65998d47d78723115d1478a8a40f8d6d497f37}"

rm -rf "$WORK" "$OUT"
mkdir -p "$WORK" "$OUT"

echo "Fetching maintained QEMU WebAssembly backend: $QEMU_REF"
git init -q "$WORK/qemu"
git -C "$WORK/qemu" remote add origin "$QEMU_REPO"
git -C "$WORK/qemu" fetch --depth 1 origin "$QEMU_REF"
git -C "$WORK/qemu" checkout -q --detach FETCH_HEAD
SOURCE_SHA="$(git -C "$WORK/qemu" rev-parse HEAD)"
echo "QEMU source commit: $SOURCE_SHA"

echo "Initializing QEMU submodules required by Meson..."
git -C "$WORK/qemu" submodule sync --recursive
git -C "$WORK/qemu" -c protocol.version=2 submodule update --init --recursive --depth 1

QEMU_DOCKERFILE="$WORK/qemu/tests/docker/dockerfiles/emsdk-wasm32-cross.docker"
[[ -f "$QEMU_DOCKERFILE" ]] || {
  echo "Pinned QEMU WebAssembly source is missing its dependency Dockerfile." >&2
  exit 1
}
grep -q 'host_os=emscripten' "$WORK/qemu/configure" || {
  echo "Pinned QEMU source is missing the Emscripten configure patch." >&2
  exit 1
}
[[ -f "$WORK/qemu/configs/meson/emscripten.txt" ]] || {
  echo "Pinned QEMU source is missing configs/meson/emscripten.txt." >&2
  exit 1
}
[[ -d "$WORK/qemu/dtc" ]] || {
  echo "QEMU dtc submodule was not initialized." >&2
  exit 1
}

# zlib.net returns an HTML response in GitHub Actions. Use the same zlib release
# from its official GitHub tag while leaving the upstream dependency image intact.
python3 - "$QEMU_DOCKERFILE" <<'PY'
from pathlib import Path
import re
import sys

path = Path(sys.argv[1])
text = path.read_text()
pattern = re.compile(
    r"RUN curl -Ls https://zlib\.net/zlib-\$ZLIB_VERSION\.tar\.xz \| \\\n"
    r"\s*tar xJC /zlib --strip-components=1"
)
replacement = (
    "RUN curl -fL --retry 5 --retry-delay 2 "
    "https://github.com/madler/zlib/archive/refs/tags/v$ZLIB_VERSION.tar.gz | \\\n"
    "    tar xzC /zlib --strip-components=1"
)
text, count = pattern.subn(replacement, text, count=1)
if count != 1:
    raise SystemExit("Could not patch the upstream zlib download command")
path.write_text(text)
print("Patched upstream zlib source URL")
PY

cat > "$WORK/sdl2-config" <<'SDL'
#!/bin/sh
set -eu
case "${1:-}" in
  --version) echo "2.28.5" ;;
  --cflags) echo "-sUSE_SDL=2" ;;
  --libs|--static-libs) echo "-sUSE_SDL=2" ;;
  --prefix|--exec-prefix) echo "/emsdk/upstream/emscripten/cache/sysroot" ;;
  *) exit 0 ;;
esac
SDL
chmod +x "$WORK/sdl2-config"

cp "$ROOT/scripts/qemu64-container-build.sh" "$WORK/container-build.sh"
chmod +x "$WORK/container-build.sh"
bash -n "$WORK/container-build.sh"

cat > "$WORK/Dockerfile" <<'DOCKER'
FROM fromscratch-qemu-wasm-base
WORKDIR /builddeps
RUN npm install xterm-pty@0.10.1
RUN embuilder build sdl2
COPY sdl2-config /usr/local/bin/sdl2-config
COPY container-build.sh /usr/local/bin/fromscratch-build-qemu
RUN chmod +x /usr/local/bin/sdl2-config /usr/local/bin/fromscratch-build-qemu
WORKDIR /build
ENTRYPOINT ["/usr/local/bin/fromscratch-build-qemu"]
DOCKER

echo "Building official Emscripten dependency image..."
docker build --progress=plain \
  -t fromscratch-qemu-wasm-base \
  -f "$QEMU_DOCKERFILE" \
  "$WORK/qemu"

echo "Adding SDL2 browser display support..."
docker build --progress=plain \
  -t fromscratch-qemu-wasm-gui \
  "$WORK"

echo "Compiling SDL-enabled qemu-system-x86_64..."
# The source tree is disposable and must be writable: Meson may create or update
# fallback subproject state while configuring QEMU.
docker run --rm --init \
  -v "$WORK/qemu:/qemu" \
  -v "$OUT:/output" \
  fromscratch-qemu-wasm-gui

python3 - "$OUT" "$SOURCE_SHA" <<'PY'
from pathlib import Path
import hashlib
import json
import sys

root = Path(sys.argv[1])
source_sha = sys.argv[2]
required = [
    'out.js',
    'load-rom.js',
    'load-rom.data',
    'qemu-system-x86_64.wasm',
    'qemu-system-x86_64.worker.js',
]
for name in required:
    path = root / name
    if not path.is_file() or path.stat().st_size == 0:
        raise SystemExit(f'missing GUI QEMU runtime file: {name}')

files = []
for path in sorted(root.iterdir()):
    if path.is_file():
        data = path.read_bytes()
        files.append({
            'name': path.name,
            'bytes': len(data),
            'sha256': hashlib.sha256(data).hexdigest(),
        })

(root / 'runtime.json').write_text(json.dumps({
    'format': 'fromscratch-qemu64-runtime',
    'version': 12,
    'available': True,
    'gui': True,
    'displayBackend': 'sdl2-canvas',
    'sourceCommit': source_sha,
    'files': files,
}, indent=2) + '\n')
PY

echo "SDL-enabled QEMU-Wasm runtime built successfully:"
ls -lh "$OUT"
