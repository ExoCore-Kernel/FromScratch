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
    echo "Saved QEMU build diagnostics to public/qemu64/build-logs." >&2
  fi
  exit "$status"
}
trap copy_failure_logs EXIT

export EMCC_CFLAGS="--js-library=/builddeps/node_modules/xterm-pty/emscripten-pty.js"
export SDL2_CONFIG=/usr/local/bin/sdl2-config

command -v emconfigure
command -v emmake
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

# --enable-sdl is a required feature in QEMU configure: configure itself exits
# non-zero if SDL2 cannot be enabled. Do not check the legacy CONFIG_SDL key;
# current Meson-based QEMU versions no longer write that key to config-host.mak.
echo "QEMU configure completed with required SDL2 support."

emmake make -j"$(nproc)" qemu-system-x86_64

for generated in \
  qemu-system-x86_64.js \
  qemu-system-x86_64.wasm \
  qemu-system-x86_64.worker.js; do
  [[ -s "$generated" ]] || {
    echo "QEMU did not generate $generated" >&2
    find /build -maxdepth 3 -type f -name 'qemu-system-x86_64*' -ls >&2 || true
    exit 1
  }
done

rm -rf /pack-rom
mkdir -p /pack-rom
cp -a /qemu/pc-bios/. /pack-rom/
/emsdk/upstream/emscripten/tools/file_packager.py \
  load-rom.data --preload /pack-rom > load-rom.js

cp qemu-system-x86_64.js /output/out.js
cp qemu-system-x86_64.wasm /output/
cp qemu-system-x86_64.worker.js /output/
cp load-rom.js load-rom.data /output/

trap - EXIT
