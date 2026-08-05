# FromScratch / BlockOS Studio

FromScratch is a visual, block-based operating-system learning environment. It generates freestanding C, documents the implementation behind every block group, supports typed user-defined blocks and project files, and includes a browser-local x86 virtual machine.

## GitHub Pages edition

The deployed site is static: it uses no Express server, no WebSocket proxy and no remote build service. Project save/load, project import/export, generated C, dependency bundles and the Learning Center all run in the browser.

The **Run** panel embeds [v86](https://github.com/copy/v86), an x86 PC emulator that translates guest x86 code to WebAssembly. You can boot the included demo or choose a local `.iso`, `.img`, `.bin`, `.elf` or Multiboot image. Nothing is uploaded.

### Important architecture note

The existing BlockOS generator targets **x86_64**, while v86 currently does not implement 64-bit extensions. For now, the static site can:

- edit projects and generate x86_64 C entirely client-side;
- export a build bundle containing generated C and dependency files;
- boot 32-bit images directly in v86;
- boot an ISO produced by the local Raspberry Pi toolchain only if that ISO contains a 32-bit target.

The next major task is a browser-specific i386 compiler/runtime target. See the repository issue tracker.

## Local development

```bash
npm install
npm run dev
```

The GitHub Pages workflow downloads the pinned v86 release assets during deployment, builds the Vite site and publishes `dist/`.

## Legacy native builder

`server.mjs` and the `kernel/` sources remain in the repository as the native x86_64 build implementation and reference material. They are not used by the GitHub Pages deployment.

## License

FromScratch is distributed under the repository `LICENSE`. v86 is separately licensed under BSD-2-Clause; see `THIRD_PARTY_NOTICES.md`.

## Enabling Pages

Open **Settings → Pages → Build and deployment** and choose **GitHub Actions** if Pages has not been enabled for the repository yet. Private-repository Pages availability depends on the GitHub plan; making this repository public also makes the site publicly available.
