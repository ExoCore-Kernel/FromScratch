# FromScratch / BlockOS Studio

FromScratch is a visual operating-system learning environment. It generates freestanding x86_64 C, compiles to assembly in the browser, and boots 32-bit and 64-bit images in the bundled v64 emulator.

## Development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:5173/FromScratch/`. Development and production builds verify the vendored v64 runtime and prepare the browser compiler automatically. The first compiler setup downloads approximately 60 MB; verified files are reused offline on later runs. To repair the compiler separately, run `npm run setup:compiler`.

The v64 engine was copied from the local UTM-Web project. Its upstream revision, build ID, and SHA-256 checksums are recorded in `public/v64/manifest.json`. The engine retains upstream filenames such as `libv86.mjs`, but runs with `cpu_type: 'x86_64'`, a CPU worker, and the v64 graphics adapter.

## Build and run an OS

Click **▶ Build and Run** to compile the blocks into a freestanding x86_64 ELF, insert it into the GRUB ISO template, and boot it immediately in the built-in v64 emulator. The Clang/LLD toolchain runs in a Web Worker, so your generated C stays in the browser. The first compiler download is relatively large. **Compile** still downloads assembly; **Choose ISO/IMG** still boots an existing image.

The site deployment must include the compiler and the bootable ISO template. `npm run dev` prepares the compiler; to generate the browser ISO runtime for a local checkout, install Clang, GRUB, xorriso and mtools, then run `bash scripts/build-browser-iso-template.sh`.

Browser-built ISOs currently embed the generated code and selected bitmap font but do not package attached OS files. To include attached files as GRUB modules, use **Project → Export build bundle** and the native toolchain:

1. Choose **Project → Export build bundle**.
2. Build it with the native toolchain:

   ```bash
   npm run build:os -- "/path/to/fromscratch-build-bundle.json"
   ```

3. In the Run panel, choose **Choose ISO/IMG** and select `build/os/fromscratch-os.iso`.

Native builds require `clang`, `ld.lld`, GRUB's `grub-mkrescue`, and `xorriso`. On macOS the builder prefers `i686-elf-grub-mkrescue` for BIOS-compatible media; Homebrew's `x86_64-elf-grub-mkrescue` creates UEFI-only media. Set `GRUB_MKRESCUE` to override the chosen command.

A small example is available under **Project → Import, export & examples → Load test OS**. Its repeatable native build/boot check runs without opening a QEMU window:

```bash
npm run test:os
npm run test:os -- --font public/fonts/default.psf
```

This writes the C source, project file, bootable ISO, and serial log to `build/test-os/`. The guest prints a greeting, checks `6 × 7 = 42`, then halts. To test assembly produced by the browser compiler, pass `--assembly "/path/to/blockos_kernel_x86_64.S"`.

## Bitmap fonts

Open **Customize → Fonts & files**. The built-in Classic Console font includes proper lowercase letters and punctuation. Import PSF1/PSF2 console fonts, or PNG/BMP glyph sheets, preview the result, then choose **Use this font**. A downloadable 16×16 glyph-sheet template is provided.

Image sheets use character-code order, left to right. Set columns, rows, and the first character code to match your sheet; use the dark-letter option for a light background. Transparent backgrounds are supported. Glyphs may be 1–32 pixels wide and high. Small fonts are displayed at 2×; fonts at least 12 pixels tall use 1×.

Selected fonts are saved locally, included in exported project files and build bundles, and embedded directly in generated C. Rebuild the OS image to apply a font; existing images retain their own fonts. The console currently prints byte-oriented ASCII; importing a Unicode font does not add UTF-8 rendering.

## Checks

```bash
npm run check
npm run test:fonts
npm run test:os
npm run build
```

The optional QEMU-Wasm laboratory and legacy native server remain in the repository. The main Studio runner uses v64.
