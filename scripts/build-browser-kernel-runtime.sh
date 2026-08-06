#!/usr/bin/env bash
set -euo pipefail
BUILD="${1:-build/browser-reference}"; mkdir -p "$BUILD"
clang --target=x86_64-unknown-none-elf -ffreestanding -fno-stack-protector -fno-pic -mno-red-zone -Ikernel/include -c kernel/runtime.c -o "$BUILD/runtime.o"
clang --target=x86_64-unknown-none-elf -ffreestanding -fno-stack-protector -fno-pic -mno-red-zone -Ikernel/include -c kernel/extensions_runtime.c -o "$BUILD/extensions_runtime.o"
clang --target=x86_64-unknown-none-elf -ffreestanding -fno-stack-protector -fno-pic -mno-red-zone -c kernel/boot.S -o "$BUILD/boot.o"
