#!/usr/bin/env bash
set -Eeuo pipefail
trap 'code=$?; echo "ISO template build failed at line $LINENO with exit code $code" >&2; exit "$code"' ERR

OUT="public/browser-kernel"
WORK="$(mktemp -d)"
ISO_ROOT="$WORK/iso"
PLACEHOLDER_SIZE=$((4 * 1024 * 1024))
SIGNATURE="FROMSCRATCH_KERNEL_SLOT_V1_6B04DFF9"
trap 'rm -rf "$WORK"' EXIT

for tool in clang grub-mkrescue xorriso mformat python3; do
  command -v "$tool" >/dev/null || {
    echo "Missing required tool: $tool" >&2
    exit 1
  }
done

mkdir -p "$OUT" "$ISO_ROOT/boot/grub"

echo "Compiling fixed x86_64 browser runtime objects..."
clang --target=x86_64-unknown-none-elf -ffreestanding -fno-stack-protector \
  -fno-pic -mno-red-zone -Ikernel/include -c kernel/runtime.c -o "$OUT/runtime.o"
clang --target=x86_64-unknown-none-elf -ffreestanding -fno-stack-protector \
  -fno-pic -mno-red-zone -Ikernel/include -c kernel/extensions_runtime.c -o "$OUT/extensions_runtime.o"
clang --target=x86_64-unknown-none-elf -ffreestanding -fno-stack-protector \
  -fno-pic -mno-red-zone -Ikernel/include -c kernel/text_style_runtime.c -o "$OUT/text_style_runtime.o"
clang --target=x86_64-unknown-none-elf -ffreestanding -fno-stack-protector \
  -fno-pic -mno-red-zone -c kernel/boot.S -o "$OUT/boot.o"
cp kernel/linker.ld "$OUT/linker.ld"

python3 - "$ISO_ROOT/boot/kernel.elf" "$PLACEHOLDER_SIZE" "$SIGNATURE" <<'PY'
from pathlib import Path
import sys
path = Path(sys.argv[1])
size = int(sys.argv[2])
signature = sys.argv[3].encode('ascii')
if len(signature) > 128:
    raise SystemExit('signature too long')
data = bytearray([0xA5]) * size
data[:len(signature)] = signature
data[len(signature):128] = b'\0' * (128 - len(signature))
path.write_bytes(data)
PY

cat > "$ISO_ROOT/boot/grub/grub.cfg" <<'CFG'
set timeout=0
set default=0

serial --unit=0 --speed=115200 --word=8 --parity=no --stop=1
terminal_input console serial
terminal_output console serial

menuentry "FromScratch BlockOS" {
    echo "Loading FromScratch x86_64 kernel..."
    multiboot2 /boot/kernel.elf
    echo "Starting kernel..."
    boot
}
CFG

echo "Creating GRUB ISO template..."
grub-mkrescue -o "$OUT/fromscratch-template.iso" "$ISO_ROOT"

test -s "$OUT/fromscratch-template.iso" || {
  echo "grub-mkrescue did not produce a non-empty ISO" >&2
  exit 1
}

python3 - "$OUT/fromscratch-template.iso" "$OUT/iso-template.json" "$PLACEHOLDER_SIZE" "$SIGNATURE" <<'PY'
from pathlib import Path
import hashlib, json, sys
iso_path = Path(sys.argv[1])
meta_path = Path(sys.argv[2])
slot_size = int(sys.argv[3])
signature = sys.argv[4].encode('ascii')
data = iso_path.read_bytes()
offset = data.find(signature)
if offset < 0:
    raise SystemExit('kernel placeholder was not found in generated ISO')
if data.find(signature, offset + 1) >= 0:
    raise SystemExit('kernel placeholder signature is not unique')
if offset + slot_size > len(data):
    raise SystemExit('kernel placeholder extends past the ISO')
meta = {
    'format': 'fromscratch-iso-template',
    'version': 3,
    'kernelOffset': offset,
    'kernelSlotSize': slot_size,
    'templateBytes': len(data),
    'sha256': hashlib.sha256(data).hexdigest(),
    'bootTarget': 'x86_64-multiboot2',
    'serialConsole': 'COM1 115200 8N1',
}
meta_path.write_text(json.dumps(meta, indent=2) + '\n')
print(f'Browser ISO template: {len(data)} bytes; kernel slot at {offset}, {slot_size} bytes')
PY

ls -lh "$OUT/runtime.o" "$OUT/extensions_runtime.o" "$OUT/text_style_runtime.o" "$OUT/boot.o" \
  "$OUT/linker.ld" "$OUT/fromscratch-template.iso" "$OUT/iso-template.json"
