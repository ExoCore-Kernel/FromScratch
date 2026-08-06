#!/usr/bin/env bash
set -Eeuo pipefail

copy_failure_logs() {
  local status=$?
  if (( status != 0 )); then
    mkdir -p /output/build-logs
    cp -f /build/config.log /output/build-logs/ 2>/dev/null || true
    cp -rf /build/meson-logs /output/build-logs/ 2>/dev/null || true
    cp -rf /build/meson-info /output/build-logs/ 2>/dev/null || true
    cp -f /build/config-host.mak /output/build-logs/ 2>/dev/null || true
    ninja -C /build -t targets all > /output/build-logs/ninja-targets.txt 2>&1 || true
    find /build -maxdepth 4 -type f -name 'qemu-system-x86_64*' -ls > /output/build-logs/generated-files.txt 2>&1 || true
    echo "Saved QEMU build diagnostics to public/qemu64/build-logs." >&2
  fi
  exit "$status"
}
trap copy_failure_logs EXIT

export EMCC_CFLAGS="--js-library=/builddeps/node_modules/xterm-pty/emscripten-pty.js"
export SDL2_CONFIG=/usr/local/bin/sdl2-config

command -v emconfigure
command -v emmake
command -v ninja
command -v sdl2-config
emcc --version | head -n 1
sdl2-config --version

cd /build
emconfigure /qemu/configure \
  --static \
  --disable-tools \
  --disable-docs \
  --disable-fdt \
  --target-list=x86_64-softmmu \
  --enable-sdl \
  --disable-opengl \
  --with-coroutine=fiber

echo "QEMU configure completed with required SDL2 support."
echo "Building the Meson default target set through Ninja..."
emmake ninja -C /build -j"$(nproc)"

find_generated() {
  local name="$1"
  find /build -type f -name "$name" -print -quit
}

JS_FILE="$(find_generated 'qemu-system-x86_64.js')"
WASM_FILE="$(find_generated 'qemu-system-x86_64.wasm')"
WORKER_FILE="$(find_generated 'qemu-system-x86_64.worker.js')"

for pair in \
  "JavaScript launcher:$JS_FILE" \
  "WebAssembly module:$WASM_FILE" \
  "worker script:$WORKER_FILE"; do
  label="${pair%%:*}"
  path="${pair#*:}"
  [[ -n "$path" && -s "$path" ]] || {
    echo "QEMU did not generate its $label." >&2
    find /build -maxdepth 4 -type f -name 'qemu-system-x86_64*' -ls >&2 || true
    exit 1
  }
done

echo "Generated QEMU files:"
ls -lh "$JS_FILE" "$WASM_FILE" "$WORKER_FILE"

rm -rf /pack-rom
mkdir -p /pack-rom
cp -a /qemu/pc-bios/. /pack-rom/
/emsdk/upstream/emscripten/tools/file_packager.py \
  load-rom.data --preload /pack-rom > load-rom.js

cp "$JS_FILE" /output/out.js
cp "$WASM_FILE" /output/qemu-system-x86_64.wasm
cp "$WORKER_FILE" /output/qemu-system-x86_64.worker.js
cp load-rom.js load-rom.data /output/

trap - EXIT
