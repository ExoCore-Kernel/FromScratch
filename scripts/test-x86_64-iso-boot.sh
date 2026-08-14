#!/usr/bin/env bash
set -Eeuo pipefail
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
mkdir -p "$WORK/iso/boot/grub"

cat > "$WORK/smoke.c" <<'C'
void screen_print_line(const char *text);
void kernel_main(void) {
    screen_print_line("FROMSCRATCH_NATIVE_QEMU_BOOT_OK");
}
C

COMMON=(--target=x86_64-unknown-none-elf -ffreestanding -fno-stack-protector -fno-pic -mno-red-zone -Ikernel/include)
clang "${COMMON[@]}" -c kernel/runtime.c -o "$WORK/runtime.o"
clang "${COMMON[@]}" -c kernel/extensions_runtime.c -o "$WORK/extensions_runtime.o"
clang "${COMMON[@]}" -c kernel/text_style_runtime.c -o "$WORK/text_style_runtime.o"
clang "${COMMON[@]}" -c "$WORK/smoke.c" -o "$WORK/smoke.o"
clang --target=x86_64-unknown-none-elf -ffreestanding -fno-stack-protector -fno-pic -mno-red-zone -c kernel/boot.S -o "$WORK/boot.o"

# Use only linker flags supported by the Ubuntu runner's ld.lld. The browser
# compiler's wasm LLD accepts --no-threads, but the native CI linker may not.
ld.lld --build-id=none -nostdlib -static -z max-page-size=4096 -T kernel/linker.ld \
  "$WORK/boot.o" "$WORK/runtime.o" "$WORK/extensions_runtime.o" "$WORK/text_style_runtime.o" "$WORK/smoke.o" \
  -o "$WORK/iso/boot/kernel.elf"

test -s "$WORK/iso/boot/kernel.elf"
file "$WORK/iso/boot/kernel.elf"

cat > "$WORK/iso/boot/grub/grub.cfg" <<'CFG'
set timeout=0
set default=0
serial --unit=0 --speed=115200 --word=8 --parity=no --stop=1
terminal_input serial
terminal_output serial
menuentry "FromScratch smoke" {
    multiboot2 /boot/kernel.elf
    boot
}
CFG

grub-mkrescue -o "$WORK/smoke.iso" "$WORK/iso" >/dev/null 2>&1
test -s "$WORK/smoke.iso"

set +e
timeout 12s qemu-system-x86_64 \
  -m 128M -machine pc -vga std -display none -serial stdio -monitor none \
  -cdrom "$WORK/smoke.iso" -boot d -no-reboot -no-shutdown \
  >"$WORK/qemu.log" 2>&1
status=$?
set -e
cat "$WORK/qemu.log"

grep -q 'FROMSCRATCH_NATIVE_QEMU_BOOT_OK' "$WORK/qemu.log" || {
  echo "Native QEMU never reached kernel_main (qemu exit $status)." >&2
  exit 1
}
echo "Native x86_64 GRUB ISO boot smoke test passed."
