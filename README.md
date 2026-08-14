# FromScratch / BlockOS Studio

FromScratch is a backend-free visual operating-system learning environment. It generates freestanding x86_64 C, includes detailed implementation guides, typed custom blocks, portable project files, browser-local compilation to x86_64 assembly, a v86 runner, and an optional QEMU-Wasm x86_64 laboratory.

## Development

```bash
npm install
npm run check
npm run dev
```

The browser compiler currently emits assembly. Packaging a bootable ISO still needs a linker/runtime packaging step; native reference scripts and the legacy Pi server are included.

##This is unofficial implementation of FromScratch
References: https://exocore-kernel.github.io/FromScratch/index.html