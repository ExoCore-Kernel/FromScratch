let moduleInstance = null;
let activeTerminal = null;
let activeSlave = null;
let runCounter = 0;

function runtimePath(name) {
  return new URL(`qemu64/${name}`, document.baseURI).href;
}

function isIosLike() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function environmentProblems() {
  const problems = [];
  if (!window.isSecureContext) problems.push('the page is not a secure HTTPS context');
  if (typeof WebAssembly === 'undefined') problems.push('WebAssembly is unavailable');
  if (typeof Worker === 'undefined') problems.push('Web Workers are unavailable');
  if (!navigator.serviceWorker?.controller) problems.push('the COOP/COEP service worker is not controlling this page yet');
  if (window.crossOriginIsolated !== true) problems.push('crossOriginIsolated is false');
  if (typeof SharedArrayBuffer === 'undefined') problems.push('SharedArrayBuffer is unavailable');
  return problems;
}

function ensureTerminalStyle() {
  if (document.querySelector('link[data-fromscratch-xterm]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.css';
  link.dataset.fromscratchXterm = 'true';
  link.crossOrigin = 'anonymous';
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
      `The x86_64 QEMU-Wasm runtime was not deployed (HTTP ${response.status}). `
      + 'Open GitHub Actions and rerun the newest Pages workflow.',
    );
  }
  const metadata = await response.json();
  if (metadata?.available !== true) {
    throw new Error('The deployed x86_64 QEMU-Wasm runtime reports that it is incomplete.');
  }

  const names = new Set((metadata.files ?? []).map((entry) => entry.name));
  const required = [
    'out.js',
    'load-rom.js',
    'load-rom.data',
    'qemu-system-x86_64.wasm',
    'qemu-system-x86_64.worker.js',
  ];
  const missing = required.filter((name) => !names.has(name));
  if (missing.length) {
    throw new Error(`The deployed QEMU-Wasm runtime is missing: ${missing.join(', ')}`);
  }
  return metadata;
}

export function qemu64Supported() {
  return environmentProblems().length === 0;
}

export async function startQemu64({
  file,
  terminal,
  memoryMb = 256,
  onStatus = () => {},
}) {
  if (!file) throw new Error('Choose a 64-bit ISO, raw disk image, or kernel image first.');
  if (!terminal) throw new Error('The QEMU terminal container is missing.');

  const problems = environmentProblems();
  if (problems.length) {
    throw new Error(
      `The 64-bit browser VM is not ready: ${problems.join('; ')}. `
      + 'After the newest Pages deployment, fully close this tab and open the site again so the service worker can reload it in isolated mode.',
    );
  }

  await stopQemu64();
  onStatus('Checking the deployed QEMU-Wasm runtime…');
  await assertRuntimeAvailable();
  ensureTerminalStyle();

  onStatus('Loading the browser terminal…');
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
  xterm.writeln('Cross-origin isolation: ready');
  xterm.writeln(`Image: ${file.name} (${Math.ceil(file.size / 1024)} KiB)`);
  if (isIosLike()) {
    xterm.writeln('Warning: the current upstream QEMU-Wasm build is very memory-heavy on iPhone/iPad.');
    xterm.writeln('A Mac or desktop browser is recommended if iOS closes the tab during startup.');
  }
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
      onStatus('QEMU-Wasm x86_64 started. BIOS, GRUB and kernel messages appear below.');
    },
  };

  try {
    onStatus('Loading the QEMU BIOS and VGA ROM package…');
    globalThis.Module = Module;
    await loadClassicScript(`${runtimePath('load-rom.js')}?run=${runId}`);

    onStatus('Loading the QEMU x86_64 WebAssembly module…');
    const runtimeUrl = `${runtimePath('out.js')}?run=${runId}`;
    const qemuModule = await import(/* @vite-ignore */ runtimeUrl);
    const initQemu = qemuModule.default;
    if (typeof initQemu !== 'function') {
      throw new Error('QEMU-Wasm out.js did not export its Emscripten module factory.');
    }

    onStatus('Starting the x86_64 virtual machine…');
    moduleInstance = await initQemu(Module);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    xterm.writeln('');
    xterm.writeln(`BOOT RUNTIME ERROR: ${message}`);
    throw new Error(`QEMU-Wasm startup failed: ${message}`);
  }

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
