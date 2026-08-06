#!/usr/bin/env bash
set -euo pipefail
mkdir -p public
clang --target=i386-unknown-none-elf -m32 -c web/demo-boot.S -o /tmp/demo.o
ld.lld -m elf_i386 -Ttext 0x7c00 --oformat binary /tmp/demo.o -o public/web-demo.img
truncate -s 1440K public/web-demo.img
