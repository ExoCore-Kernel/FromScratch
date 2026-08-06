#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/qemu64"
WORK="${RUNNER_TEMP:-/tmp}/fromscratch-qemu64-gui"
QEMU_REPO="https://github.com/ktock/qemu-wasm.git"
QEMU_REF="${QEMU_WASM_REF:-master}"

rm -rf "$WORK" "$OUT"
mkdir -p "$WORK" "$OUT"

echo "Cloning QEMU-Wasm source..."
git clone --depth 1 --branch "$QEMU_REF" "$QEMU_REPO" "$WORK/qemu"

DOCKERFILE="$WORK/qemu/Dockerfile"
[[ -f "$DOCKERFILE" ]] || {
  echo "QEMU Emscripten Dockerfile was not found at: $DOCKERFILE" >&2
  exit 1
}

python3 - "$DOCKERFILE" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text()
old_candidates = (
    'RUN curl -Ls https://zlib.net/zlib-$ZLIB_VERSION.tar.xz | tar xJC /zlib --strip-components=1',
    'RUN curl -Ls https://zlib.net/fossils/zlib-$ZLIB_VERSION.tar.xz | tar xJC /zlib --strip-components=1',
)
new = (
    'RUN curl -fL --retry 5 --retry-delay 2 '
    'https://github.com/madler/zlib/archive/refs/tags/v$ZLIB_VERSION.tar.gz '
    '| tar xzC /zlib --strip-components=1'
)
for old in old_candidates:
    if old in text:
        text = text.replace(old, new)
        break
else:
    raise SystemExit('Expected upstream zlib download command was not found')
path.write_text(text)
print('Patched zlib source download to the official GitHub tag archive')
PY

echo "Building QEMU Emscripten base image from $DOCKERFILE..."
docker build --progress=plain -t fromscratch-qemu-wasm-base -f "$DOCKERFILE" "$WORK/qemu"

cat > "$WORK/Dockerfile" <<'DOCKER'
FROM fromscratch-qemu-wasm-base
WORKDIR /builddeps
RUN npm install xterm-pty@0.10.1
RUN embuilder build sdl2
WORKDIR /build
RUN command -v emconfigure && command -v emmake && command -v embuilder && command -v meson
CMD ["sleep", "infinity"]
DOCKER

echo "Adding SDL2 to the QEMU-Wasm build image..."
docker build --progress=plain -t fromscratch-qemu-wasm-gui "$WORK"

echo "Configuring and compiling SDL-enabled qemu-system-x86_64..."
docker run --rm --name fromscratch-qemu-gui \
  -v "$WORK/qemu:/qemu:ro" \
  -v "$OUT:/output" \
  fromscratch-qemu-wasm-gui bash -lc '
set -Eeuo pipefail
export EMCC_CFLAGS="-sUSE_SDL=2 --js-library=/builddeps/node_modules/xterm-pty/emscripten-pty.js"
COMMON_FLAGS="-O3 -g0 -Wno-error=unused-command-line-argument -matomics -mbulk-memory -DNDEBUG -DG_DISABLE_ASSERT -D_GNU_SOURCE -pthread -sPROXY_TO_PTHREAD=1 -sFORCE_FILESYSTEM -sALLOW_TABLE_GROWTH -sTOTAL_MEMORY=2300MB -sWASM_BIGINT -sMALLOC=emmalloc -sUSE_SDL=2 -sEXPORT_ES6=1"

cat > /tmp/emscripten-cross.ini <<EOF
[host_machine]
system = 'emscripten'
cpu_family = 'wasm32'
cpu = 'wasm32'
endian = 'little'

[binaries]
c = 'emcc'
cpp = 'em++'
ar = 'emar'
ranlib = 'emranlib'
strip = 'emstrip'
pkg-config = 'pkg-config'
EOF

MESON_REAL="$(command -v meson)"
mkdir -p /tmp/meson-bin
cat > /tmp/meson-bin/meson <<EOF
#!/usr/bin/env bash
set -Eeuo pipefail
echo "MESON WRAPPER: \$*" >&2
if [[ "\${1:-}" == "setup" ]]; then
  exec "$MESON_REAL" "\$@" --cross-file=/tmp/emscripten-cross.ini
fi
exec "$MESON_REAL" "\$@"
EOF
chmod +x /tmp/meson-bin/meson
export PATH="/tmp/meson-bin:$PATH"
export MESON="/tmp/meson-bin/meson"

echo "Meson wrapper selected: $MESON"
"$MESON" --version
cat /tmp/emscripten-cross.ini

emconfigure /qemu/configure \
  --static \
  --target-list=x86_64-softmmu \
  --without-default-features \
  --enable-system \
  --enable-sdl \
  --disable-opengl \
  --with-coroutine=fiber \
  --extra-cflags="$COMMON_FLAGS" \
  --extra-cxxflags="$COMMON_FLAGS" \
  --extra-ldflags="$COMMON_FLAGS -sEXPORTED_RUNTIME_METHODS=getTempRet0,setTempRet0,addFunction,removeFunction,TTY,FS"

emmake make -j"$(nproc)" qemu-system-x86_64

mkdir -p /pack-rom
cp /qemu/pc-bios/{bios-256k.bin,vgabios-stdvga.bin,kvmvapic.bin,linuxboot_dma.bin,efi-virtio.rom} /pack-rom/
/emsdk/upstream/emscripten/tools/file_packager.py load-rom.data --preload /pack-rom > load-rom.js

if [[ -s qemu-system-x86_64.js ]]; then
  cp qemu-system-x86_64.js /output/out.js
elif [[ -s qemu-system-x86_64 ]]; then
  cp qemu-system-x86_64 /output/out.js
else
  echo "QEMU JavaScript launcher was not generated." >&2
  find . -maxdepth 2 -type f -name "*qemu-system-x86_64*" -ls >&2 || true
  exit 1
fi
cp qemu-system-x86_64.wasm /output/
cp qemu-system-x86_64.worker.js /output/
cp load-rom.js load-rom.data /output/
'

python3 - "$OUT" "$QEMU_REF" <<'PY'
from pathlib import Path
import hashlib, json, sys
root = Path(sys.argv[1])
required = ['out.js', 'load-rom.js', 'load-rom.data', 'qemu-system-x86_64.wasm', 'qemu-system-x86_64.worker.js']
for name in required:
    path = root / name
    if not path.is_file() or path.stat().st_size == 0:
        raise SystemExit(f'missing GUI QEMU runtime file: {name}')
files = []
for path in sorted(root.iterdir()):
    if path.is_file():
        data = path.read_bytes()
        files.append({'name': path.name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
(root / 'runtime.json').write_text(json.dumps({
    'format': 'fromscratch-qemu64-runtime',
    'version': 10,
    'available': True,
    'gui': True,
    'displayBackend': 'sdl2-canvas',
    'sourceRef': sys.argv[2],
    'files': files,
}, indent=2) + '\n')
PY

echo "SDL-enabled QEMU-Wasm runtime built:"
ls -lh "$OUT"
