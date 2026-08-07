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
    cp -f /tmp/qemu-glib-abi.c /output/build-logs/ 2>/dev/null || true
    pkg-config --debug glib-2.0 > /output/build-logs/pkg-config-glib-debug.txt 2>&1 || true
    ninja -C /build -t targets all > /output/build-logs/ninja-targets.txt 2>&1 || true
    find /build -maxdepth 4 -type f -name 'qemu-system-x86_64*' -ls > /output/build-logs/generated-files.txt 2>&1 || true
    echo "Saved QEMU build diagnostics to public/qemu64/build-logs." >&2
  fi
  exit "$status"
}
trap copy_failure_logs EXIT

TARGET=/builddeps/target
TARGET_PKGCONFIG="$TARGET/lib/pkgconfig"

# Never let Meson or pkg-config fall back to Ubuntu's native x86_64 GLib,
# pixman, zlib or libffi. QEMU is a wasm32 cross build and every dependency
# discovered through pkg-config must come from the Emscripten target prefix.
export PKG_CONFIG_LIBDIR="$TARGET_PKGCONFIG"
export PKG_CONFIG_PATH="$TARGET_PKGCONFIG"
export EM_PKG_CONFIG_PATH="$TARGET_PKGCONFIG"
unset PKG_CONFIG_SYSROOT_DIR || true
export CPATH="$TARGET/include${CPATH:+:$CPATH}"
export LIBRARY_PATH="$TARGET/lib${LIBRARY_PATH:+:$LIBRARY_PATH}"
export SDL2_CONFIG=/usr/local/bin/sdl2-config

cat > /tmp/wasm32-pkg-config <<'PKG'
#!/bin/sh
set -eu
export PKG_CONFIG_LIBDIR=/builddeps/target/lib/pkgconfig
export PKG_CONFIG_PATH=/builddeps/target/lib/pkgconfig
unset PKG_CONFIG_SYSROOT_DIR || true
exec /usr/bin/pkg-config --static "$@"
PKG
chmod +x /tmp/wasm32-pkg-config
export PKG_CONFIG=/tmp/wasm32-pkg-config

# QEMU is linked with PROXY_TO_PTHREAD by the upstream WebAssembly port. SDL
# therefore renders from a worker thread and needs OffscreenCanvas support.
export EMCC_CFLAGS="--js-library=/builddeps/node_modules/xterm-pty/emscripten-pty.js -sOFFSCREENCANVAS_SUPPORT=1"

command -v emconfigure
command -v emmake
command -v ninja
command -v sdl2-config
command -v pkg-config
emcc --version | head -n 1
sdl2-config --version

# Fast dependency and ABI preflight. This catches a host/target pkg-config mixup
# in seconds instead of waiting for QEMU's full Meson feature scan.
for package in glib-2.0 pixman-1 zlib libffi; do
  /tmp/wasm32-pkg-config --exists "$package" || {
    echo "Missing Emscripten target pkg-config package: $package" >&2
    exit 1
  }
  pcdir="$(/tmp/wasm32-pkg-config --variable=pcfiledir "$package")"
  case "$pcdir" in
    "$TARGET_PKGCONFIG"*) ;;
    *)
      echo "$package resolved outside the Emscripten target prefix: $pcdir" >&2
      exit 1
      ;;
  esac
  echo "$package: $(/tmp/wasm32-pkg-config --modversion "$package") from $pcdir"
done

GLIB_CFLAGS="$(/tmp/wasm32-pkg-config --cflags glib-2.0)"
case "$GLIB_CFLAGS" in
  *'/usr/include/glib-2.0'*|*'/usr/lib/x86_64-linux-gnu'*)
    echo "Host GLib leaked into wasm32 CFLAGS: $GLIB_CFLAGS" >&2
    exit 1
    ;;
esac

cat > /tmp/qemu-glib-abi.c <<'C'
#include <stddef.h>
#include <glib.h>
_Static_assert(sizeof(size_t) == GLIB_SIZEOF_SIZE_T,
               "wasm32 size_t does not match target GLib");
int main(void) { return 0; }
C
# shellcheck disable=SC2086
emcc -c /tmp/qemu-glib-abi.c $GLIB_CFLAGS -o /tmp/qemu-glib-abi.o
echo "Emscripten GLib ABI preflight passed."

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

echo "QEMU configure completed with target GLib, SDL2 and OffscreenCanvas support."
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

grep -q 'OffscreenCanvas' "$JS_FILE" || {
  echo "Generated QEMU launcher does not contain OffscreenCanvas support." >&2
  exit 1
}

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
