#!/usr/bin/env bash
set -Eeuo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$ROOT/public/examples"
clang -m32 -c -x assembler-with-cpp "$ROOT/web/demo-boot.S" -o "$TMP/demo.o"
ld.lld -m elf_i386 -Ttext 0x7c00 --oformat binary "$TMP/demo.o" -o "$TMP/demo.bin"
python3 - "$TMP/demo.bin" "$ROOT/public/examples/fromscratch-web-demo.img" <<'PY'
from pathlib import Path
import sys
boot = Path(sys.argv[1]).read_bytes()
if len(boot) != 512 or boot[510:512] != b'\x55\xaa':
    raise SystemExit(f'Expected a 512-byte boot sector, got {len(boot)} bytes')
Path(sys.argv[2]).write_bytes(boot + bytes(1_474_560 - len(boot)))
PY
