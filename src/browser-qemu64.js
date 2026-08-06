let moduleInstance = null;
let activeTerminal = null;
let activeSlave = null;
let runCounter = 0;

function runtimePath(name) {
  return new URL(`qemu64/${name}`, document.baseURI).href;
}

function ensureTerminalStyle() {
  if (document.querySelector('link[data-fromscratch-xterm]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.css';
  link.dataset.fromscratchXterm = 'true';
  document.head.append(link);
}

function loadClassicScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.addEventListener('load', () => resolve(script), {once: true});
    script.addEventListener('error', () => reject(new Error(`Could not load ${url}`)), {once: true});
    document.head.append(script);
  });
}

async function assertRuntimeAvailable() {
  const response = await fetch(runtimePath('runtime.json'), {cache: 'no-store'});
  if (!response.ok) {
    throw new Error(
      'The x86_64 QEMU-Wasm runtime was not deployed. Re-run the newest GitHub Pages workflow.',
    );
  }
  const metadata = await response.json();
  if (metadata?.available !== true) {
    throw new Error('The deployed x86_64 QEMU-Wasm runtime is incomplete.');
  }
  return metadata;
}

export function qemu64Supported() {
  return typeof WebAssembly !== 'undefined'
    && typeof Worker !== 'undefined'
    && typeof SharedArrayBuffer !== 'undefined'
    && window.crossOriginIsolated === true;
}

export async function startQemu64({
  file,
  terminal,
  memoryMb = 256,
  onStatus = () => {},
}) {
  if (!file) throw new Error('Choose a 64-bit ISO, raw disk image, or kernel image first.');
  if (!terminal) throw new Error('The QEMU terminal container is missing.');
  if (!qemu64Supported()) {
    throw new Error(
      'The 64-bit browser VM needs WebAssembly threads and cross-origin isolation. '
      + 'Close and reopen the Pages site after deployment; Safari may also need website data cleared.',
    );
  }

  await stopQemu64();
  await assertRuntimeAvailable();
  ensureTerminalStyle();
  onStatus('Loading QEMU-Wasm x86_64…');

  const [{Terminal}, {openpty}] = await Promise.all([
    import('https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/+esm'),
    import('https://cdn.jsdelivr.net/npm/xterm-pty@0.12.0/+esm'),
  ]);

  terminal.replaceChildren();
  const xterm = new Terminal({
    convertEol: true,
    cursorBlink: true,
    fontSize: window.matchMedia('(max-width: 760px)').matches ? 12 : 14,
    scrollback: 3000,
    theme: {background: '#020617', foreground: '#e2e8f0'},
  });
  xterm.open(terminal);
  xterm.writeln('FromScratch x86_64 VM');
  xterm.writeln('Preparing QEMU-Wasm and the generated ISO…');

  const {master, slave} = openpty();
  xterm.loadAddon(master);
  activeTerminal = xterm;
  activeSlave = slave;

  const lower = file.name.toLowerCase();
  const isIso = lower.endsWith('.iso');
  const isKernel = lower.endsWith('.elf') || lower.endsWith('.bin') || lower.endsWith('.kernel');
  const inputName = isKernel ? '/input/kernel' : '/input/image';
  const args = [
    '-nographic',
    '-M', 'pc',
    '-m', `${Math.max(64, Number(memoryMb) || 256)}M`,
    '-accel', 'tcg,tb-size=256',
    '-L', '/pack-rom/',
    '-nic', 'none',
    '-no-reboot',
  ];

  if (isKernel) {
    args.push('-kernel', inputName);
  } else if (isIso) {
    args.push(
      '-drive', `id=cd0,file=${inputName},format=raw,if=none,media=cdrom,readonly=on`,
      '-device', 'ide-cd,drive=cd0',
      '-boot', 'order=d,menu=off,strict=on',
    );
  } else {
    args.push('-drive', `file=${inputName},format=raw,if=ide,media=disk`);
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const runId = ++runCounter;
  const Module = {
    arguments: args,
    pty: slave,
    locateFile(path) {
      return runtimePath(path);
    },
    mainScriptUrlOrBlob: runtimePath('out.js'),
    preRun: [
      (mod) => {
        try { mod.FS.mkdir('/input'); } catch {}
        mod.FS.writeFile(inputName, bytes);
      },
    ],
    print(text) {
      slave.write(`${text}\n`);
    },
    printErr(text) {
      slave.write(`${text}\n`);
    },
    onRuntimeInitialized() {
      onStatus('QEMU-Wasm x86_64 started. Boot messages appear in the terminal.');
    },
  };

  // Emscripten's generated ROM loader is a classic script. Giving it this
  // exact Module object lets it add /pack-rom to the same virtual filesystem
  // that the QEMU factory later uses.
  globalThis.Module = Module;
  await loadClassicScript(`${runtimePath('load-rom.js')}?run=${runId}`);

  const runtimeUrl = `${runtimePath('out.js')}?run=${runId}`;
  const qemuModule = await import(/* @vite-ignore */ runtimeUrl);
  const initQemu = qemuModule.default;
  if (typeof initQemu !== 'function') throw new Error('QEMU-Wasm out.js did not export its module factory.');

  moduleInstance = await initQemu(Module);

  // Match the official QEMU-Wasm sample's PTY polling workaround.
  if (Module.TTY?.stream_ops?.poll && Module.pty) {
    const oldPoll = Module.TTY.stream_ops.poll;
    const pty = Module.pty;
    Module.TTY.stream_ops.poll = function poll(stream, timeout) {
      if (!pty.readable) return (pty.readable ? 1 : 0) | (pty.writable ? 4 : 0);
      return oldPoll.call(this, stream, timeout);
    };
  }

  return {xterm, module: moduleInstance};
}

export async function stopQemu64() {
  if (moduleInstance) {
    try { moduleInstance._emscripten_force_exit?.(0); } catch {}
  }
  try { activeTerminal?.dispose?.(); } catch {}
  moduleInstance = null;
  activeTerminal = null;
  activeSlave = null;
}

export function sendQemu64Input() {
  throw new Error('For the 64-bit QEMU VM, tap the terminal and type directly into it.');
}
