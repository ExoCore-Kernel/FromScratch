# FromScratch / BlockOS Studio

FromScratch is a visual Linux operating-system learning environment. Blocks compile into a static x86_64 Linux program, which runs inside a real Linux guest in the bundled v64 emulator.

**Building and booting happen entirely in the browser.** A static host such as GitHub Pages serves the compiler, Linux kernel, drivers and runtime objects. No backend, remote compilation service or host Linux installation is required to use the Studio.

## Development and deployment

Site preparation requires Node.js 22+, `clang`, `tar`, GRUB, `xorriso` and mtools:

```bash
npm install
npm run dev
```

Open `http://localhost:5173/FromScratch/`. Setup verifies v64, downloads the pinned browser compiler (about 60 MB), and prepares the vendored Linux kernel and drivers. If those files need repair, setup downloads their checksum-verified Alpine kernel package (about 39 MB). Verified downloads are reused. Runtime C is compiled during site preparation, never by a backend during Studio use.

```bash
npm run setup:linux   # repair Linux assets and rebuild runtime objects
npm run build         # prepare everything and create dist/
```

Deploy the complete `dist/` directory, including `linux/`, `compiler/`, and `v64/`. GitHub Pages CI prepares these automatically. Kernel provenance and source links are pinned in `config/linux.json`; licensing is documented in `THIRD_PARTY_NOTICES.md`.

## Build and run Linux

Click **▶ Build and Run**. Clang and LLD run in a Web Worker and compile the generated C into a static Linux ELF. The browser creates a `newc` CPIO initramfs containing the program, graphics drivers, and project attachments. v64 boots the bundled Linux kernel directly with that initramfs.

Linux starts `/init` as PID 1. The runtime mounts `/dev`, `/proc`, `/sys`, and `/tmp`, loads the Linux Bochs graphics driver, and supervises the generated program in a child process. The **when Linux starts** block generates `blockos_main()`. Ending the program keeps the Linux supervisor alive.

**Compile** downloads Linux x86_64 assembly. **Project → Export ISO** packages the last successful build into a bootable Linux ISO entirely in the browser. Its initramfs slot supports up to 16 MiB; larger projects can use the native build bundle. **Choose ISO/IMG** still boots existing images.

## Linux blocks and older projects

Existing block IDs and project files remain importable. Console I/O uses Linux tty read/write/poll; graphics and bitmap fonts use `/dev/fb0` with ioctl/mmap. Memory allocation uses mmap/munmap. Filesystem blocks use real guest files and file descriptors. Processes use fork, signals and wait4. Time uses clock_gettime/nanosleep. UDP sockets use Linux networking, including loopback without an external NIC.

- **Linux file mode** supplies open flags: read only `0`, read/write `2`, create/replace `578`, create/append `1089`. Failed handles and byte counts return negative Linux errno represented in the 64-bit result; use a signed variable to inspect them. Debug blocks report the last errno.
- **Function address** names a basic **define custom function** block and supplies its address to **create process**. The child has a separate Linux address space. Process handles are real PIDs; waiting returns its exit code.
- **Sleep for 1 millisecond** yields through nanosleep. **Stop this program** exits the current process. Timer events use elapsed monotonic milliseconds and run cooperatively after the startup body finishes. A forever loop in that body prevents event dispatch.
- Attached files are included in browser builds at `/assets/<name>`, and retained in exported projects/build bundles. Filenames support letters, numbers, dots, dashes and underscores; duplicate names are rejected. `/tmp` and all guest file changes reset on reboot.
- Hardware-only blocks for interrupt tables, raw ports, control registers, page tables and unimplemented device models are removed from the toolbox. Imported projects containing them receive a migration error identifying the block. Linux owns these facilities; they are not simulated by the runtime.

Boot-stage, status and safe-mode values remain project settings. Software window blocks provide a small framebuffer drawing toolkit. External networking needs a configured emulated NIC; the default runner provides local loopback networking.

## Export a bootable ISO

Browser builds boot Linux directly. An optional native builder exports the same kernel and initramfs as a GRUB ISO:

```bash
npm run build:os -- "/path/to/fromscratch-build-bundle.json"
```

Export the bundle from **Project → Export build bundle**, then select `build/os/fromscratch-os.iso` using **Choose ISO/IMG**. Native ISO creation additionally requires `ld.lld`, GRUB, `xorriso` and mtools. On macOS the builder prefers `i686-elf-grub-mkrescue` for BIOS media; `GRUB_MKRESCUE` overrides this.

## Bitmap fonts

Use **Customize → Fonts & files** to import PSF1/PSF2 console fonts or PNG/BMP glyph sheets. Fonts are saved locally, exported with projects and embedded in the generated Linux program. Rebuild to apply changes. Glyphs can be 1–32 pixels wide/high; output remains byte-oriented ASCII.

## Checks

```bash
npm run check
npm run test:fonts
npm run test:text
npm run test:linux  # initramfs, migration, generator and Linux service integration
npm run test:os     # generated example boots from a Linux GRUB ISO
npm run build
# Optional browser test (requires puppeteer-core and Chrome):
node scripts/test-browser-build.mjs
```

Native integration tests require `qemu-system-x86_64`; the ISO test also requires the native ISO tools above. Set `CHROME_BIN` for a non-default Chrome location.

The optional QEMU-Wasm laboratory and native server remain available. Studio builds and boots use the browser path independently of them.
