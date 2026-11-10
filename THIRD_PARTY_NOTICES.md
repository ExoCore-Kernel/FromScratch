# Third-party notices

- Blockly (Apache-2.0) and Vite (MIT).
- v64, derived from v86 (BSD-2-Clause): https://github.com/speedyHKjournalist/v64. The runtime, CPU worker, Bochs VGA plugin, SeaBIOS firmware and VGA BIOS are vendored from the local UTM-Web project. See `public/v64/LICENSE`, `public/v64/Readme.md`, and `public/v64/manifest.json` for the license, provenance and checksums.
- Classic Console bitmap data is adapted from Daniel Hepper's public-domain font8x8 collection: https://github.com/dhepper/font8x8. The original notice is retained in `kernel/default-font.h`.
- wasm-clang / LLVM (Apache-2.0 and LLVM notices): https://github.com/binji/wasm-clang. Compiler setup downloads the upstream license files into `public/compiler/` alongside the binaries.
- The optional legacy QEMU-Wasm/QEMU laboratory also uses xterm.js (MIT) and xterm-pty (MIT).

- Linux (GPL-2.0-only), distributed by Alpine Linux. The exact kernel package and SHA-256 are pinned in `config/linux.json`. The corresponding Alpine build recipe, patches and upstream source URLs are linked there. The license is retained in `licenses/Linux-GPL-2.0.txt` and copied into `public/linux/LICENSE` at setup; provenance is also published in `public/linux/manifest.json` and `public/linux/SOURCE.txt`. Kernel modules are from the same pinned package.
