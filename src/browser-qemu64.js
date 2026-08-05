let moduleInstance = null;
let loadedImageUrl = null;

function revokeImageUrl() {
  if (loadedImageUrl) URL.revokeObjectURL(loadedImageUrl);
  loadedImageUrl = null;
}

function runtimePath(name) {
  return new URL(`qemu64/${name}`, document.baseURI).href;
}

export function qemu64Supported() {
  return typeof WebAssembly !== 'undefined' && typeof Worker !== 'undefined';
}

export async function startQemu64({file, terminal, memoryMb = 256, onStatus = () => {}}) {
  if (!file) throw new Error('Choose a 64-bit ISO, raw disk image, or kernel image first.');
  if (!qemu64Supported()) throw new Error('This browser cannot run QEMU WebAssembly.');

  await stopQemu64();
  onStatus('Loading the 64-bit QEMU WebAssembly runtime…');

  const [{Terminal}, {openpty}, initQemu] = await Promise.all([
    import('https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/+esm'),
    import('https://cdn.jsdelivr.net/npm/xterm-pty@0.12.0/+esm'),
    import(runtimePath('out.js')).then((module) => module.default),
  ]);

  terminal.replaceChildren();
  const xterm = new Terminal({convertEol: true, cursorBlink: true, fontSize: 14});
  xterm.open(terminal);
  const {master, slave} = openpty();
  xterm.loadAddon(master);

  revokeImageUrl();
  loadedImageUrl = URL.createObjectURL(file);

  const extension = file.name.toLowerCase();
  const isIso = extension.endsWith('.iso');
  const isKernel = extension.endsWith('.elf') || extension.endsWith('.bin') || extension.endsWith('.kernel');

  const args = [
    '-nographic',
    '-M', 'pc',
    '-m', `${Math.max(64, Number(memoryMb) || 256)}M`,
    '-accel', 'tcg,tb-size=256',
    '-L', '/pack-rom/',
    '-nic', 'none',
  ];

  if (isKernel) {
    args.push('-kernel', '/input/kernel');
  } else {
    args.push('-drive', `file=/input/image,format=${isIso ? 'raw' : 'raw'},if=${isIso ? 'none' : 'ide'},media=${isIso ? 'cdrom' : 'disk'}`);
    if (isIso) {
      args.push('-device', 'ide-cd,drive=cd0');
      args[args.length - 3] = '-drive';
      args[args.length - 2] = 'id=cd0,file=/input/image,format=raw,if=none,media=cdrom';
      args.push('-boot', 'd');
    }
  }

  const imageBytes = new Uint8Array(await file.arrayBuffer());
  const Module = {
    arguments: args,
    pty: slave,
    locateFile(path) {
      return runtimePath(path);
    },
    preRun: [
      (mod) => {
        try { mod.FS.mkdir('/input'); } catch {}
        mod.FS.writeFile(isKernel ? '/input/kernel' : '/input/image', imageBytes);
      },
    ],
    print(text) { slave.write(`${text}\n`); },
    printErr(text) { slave.write(`${text}\n`); },
    onRuntimeInitialized() { onStatus('QEMU x86_64 started.'); },
  };

  moduleInstance = await initQemu(Module);
  return {xterm, module: moduleInstance};
}

export async function stopQemu64() {
  if (moduleInstance) {
    try { moduleInstance._emscripten_force_exit?.(0); } catch {}
  }
  moduleInstance = null;
  revokeImageUrl();
}
