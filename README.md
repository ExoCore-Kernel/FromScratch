# FromScratch / BlockOS Studio

FromScratch is a visual, block-based operating-system learning environment. It generates freestanding C, documents the implementation behind every block group, supports typed user-defined blocks and portable project files, and includes browser-local virtual-machine work.

## Important: restore the complete source first

An earlier file-by-file GitHub upload was interrupted, leaving the visible working tree incomplete. The repository now contains the complete verified v0.9 source archive in:

```text
.source-bootstrap/part00 … .source-bootstrap/part11
```

After cloning, restore it with:

```bash
bash RESTORE_SOURCE.sh
```

The script checks all twelve parts, verifies SHA-256
`6d2b709ec3a7fad9a99a073c16c7f55cfde6cb7a433a57658decc8d114e796ab`, and extracts the complete 49-file source tree. See `SOURCE_ARCHIVE.md` for manual instructions.

## Included in the verified source

- Blockly editor and the complete built-in block catalogue
- Freestanding x86_64 C generator
- Typed custom blocks and project import/export
- Learning Center with group and per-block implementation guides
- Kernel boot/runtime sources and native reference build scripts
- Word-command shell and graphical example projects
- Backend-free static web edition
- Browser WebAssembly Clang integration
- v86-based compatible x86 image runner
- Experimental x86_64 QEMU-Wasm laboratory
- GitHub Pages workflow

## Local development

```bash
bash RESTORE_SOURCE.sh
npm install
npm run check
npm run dev
```

The browser compiler currently emits x86_64 assembly. Creating a complete bootable ISO still needs the runtime/linking and packaging stage. The x86_64 browser runner also depends on optional upstream QEMU-Wasm runtime assets and is much slower than native QEMU.

## GitHub Pages

After restoring and committing the extracted source, open **Settings → Pages → Build and deployment** and select **GitHub Actions**. The Pages workflow prepares the demo, browser compiler assets, and VM runtime files before building the Vite site.

## License

See `LICENSE` and `THIRD_PARTY_NOTICES.md`.
