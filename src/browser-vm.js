let emulator = null;
let loaderPromise = null;
let serialText = '';
let activeBackend = 'none';

function assetUrl(path) {
  return new URL(path, document.baseURI).href;
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const old = document.querySelector(`script[data-v86-loader="${url}"]`);
    if (old) {
      if (window.V86) resolve();
      else old.addEventListener('load', resolve, {once: true});
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.dataset.v86Loader = url;
    script.addEventListener('load', resolve, {once: true});
    script.addEventListener('error', () => reject(new Error(`Could not load ${url}`)), {once: true});
    document.head.append(script);
  });
}

async function ensureV86() {
  if (window.V86) return window.V86;
  loaderPromise ??= loadScript(assetUrl('v86/libv86.js'));
  await loaderPromise;
  if (!window.V86) throw new Error('v86 loaded without exposing window.V86.');
  return window.V86;
}

function prepareScreen(container) {
  container.replaceChildren();
  const text = document.createElement('div');
  text.style.whiteSpace = 'pre';
  text.style.font = '14px monospace';
  text.style.lineHeight = '14px';
  const canvas = document.createElement('canvas');
  canvas.style.display = 'none';
  container.append(text, canvas);
}

function imageOption(name, source) {
  const image = typeof source === 'string' ? {url: source} : {buffer: source};
  const lower = name.toLowerCase();
  if (lower.endsWith('.iso')) return {cdrom: image, boot_order: 0x123};
  if (lower.endsWith('.elf') || lower.endsWith('.mb') || lower.endsWith('.multiboot')) {
    return {multiboot: image};
  }
  if ((lower.endsWith('.img') || lower.endsWith('.bin'))
      && typeof source !== 'string'
      && source.byteLength <= 2097152) {
    return {fda: image, boot_order: 0x231};
  }
  if (lower.includes('floppy')) return {fda: image, boot_order: 0x231};
  return {hda: image, boot_order: 0x132};
}

function isGeneratedX86_64Image(name) {
  const lower = String(name ?? '').toLowerCase();
  return lower.includes('fromscratch-blockos-x86_64')
    || lower.includes('blockos_kernel_x86_64')
    || lower.endsWith('.x86_64.iso');
}

export async function bootBrowserVm({
  file = null,
  demoUrl = '',
  screenContainer,
  onStatus,
  onSerial,
}) {
  await stopBrowserVm();

  const name = file?.name || demoUrl.split('/').at(-1) || 'boot.img';

  if (file && isGeneratedX86_64Image(name)) {
    activeBackend = 'qemu64';
    onSerial?.('Starting the 64-bit QEMU-Wasm terminal…\n');
    const {startQemu64} = await import('./browser-qemu64.js');
    await startQemu64({
      file,
      terminal: screenContainer,
      memoryMb: 256,
      onStatus,
    });
    onSerial?.(
      'The generated x86_64 ISO is running in QEMU-Wasm. '
      + 'Tap the terminal to interact with serial input.\n',
    );
    return {name, backend: 'qemu64'};
  }

  activeBackend = 'v86';
  const V86 = await ensureV86();
  prepareScreen(screenContainer);
  serialText = '';
  const source = file ? await file.arrayBuffer() : assetUrl(demoUrl);

  emulator = new V86({
    wasm_path: assetUrl('v86/v86.wasm'),
    memory_size: 134217728,
    vga_memory_size: 16777216,
    screen_container: screenContainer,
    bios: {url: assetUrl('v86/seabios.bin')},
    vga_bios: {url: assetUrl('v86/vgabios.bin')},
    autostart: true,
    disable_speaker: false,
    ...imageOption(name, source),
  });

  emulator.add_listener('download-progress', (event) => {
    if (event?.lengthComputable && event.total) {
      onStatus?.(`Loading ${event.file_name || name} · ${Math.round(event.loaded / event.total * 100)}%`);
    }
  });
  emulator.add_listener('emulator-ready', () => {
    onStatus?.(`Ready · ${name} · click display for keyboard and mouse`);
  });
  emulator.add_listener('emulator-started', () => onStatus?.(`Running locally in v86 · ${name}`));
  emulator.add_listener('emulator-stopped', () => onStatus?.('Web VM stopped'));
  emulator.add_listener('serial0-output-byte', (byte) => {
    serialText += String.fromCharCode(byte & 255);
    onSerial?.(serialText);
  });

  return {name, backend: 'v86'};
}

export async function stopBrowserVm() {
  if (activeBackend === 'qemu64') {
    const {stopQemu64} = await import('./browser-qemu64.js');
    await stopQemu64();
  }

  if (emulator) {
    try { emulator.stop(); } catch {}
    try { await emulator.destroy?.(); } catch {}
  }

  emulator = null;
  activeBackend = 'none';
}

export async function sendBrowserSerial(text) {
  if (activeBackend === 'qemu64') {
    const {sendQemu64Input} = await import('./browser-qemu64.js');
    return sendQemu64Input(text);
  }
  if (!emulator) throw new Error('Start the Web VM first.');
  emulator.serial0_send(text);
}
