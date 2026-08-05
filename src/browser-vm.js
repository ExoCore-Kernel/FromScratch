let emulator = null;
let loaderPromise = null;
let serialText = '';

function assetUrl(path) {
  return new URL(path, document.baseURI).href;
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-v86-loader="${url}"]`);
    if (existing) {
      if (window.V86) resolve();
      else existing.addEventListener('load', resolve, {once: true});
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
  if (!window.V86) throw new Error('The v86 library loaded but did not expose window.V86.');
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
  canvas.setAttribute('aria-label', 'v86 emulated display');
  container.append(text, canvas);
}

function imageOption(name, bufferOrUrl) {
  const image = typeof bufferOrUrl === 'string' ? {url: bufferOrUrl} : {buffer: bufferOrUrl};
  const lower = name.toLowerCase();
  if (lower.endsWith('.iso')) return {cdrom: image};
  if (lower.endsWith('.elf') || lower.endsWith('.mb') || lower.endsWith('.multiboot')) return {multiboot: image};
  if (lower.endsWith('.img') && typeof bufferOrUrl !== 'string' && bufferOrUrl.byteLength <= 2 * 1024 * 1024) return {fda: image};
  if (lower.endsWith('.img') && typeof bufferOrUrl === 'string' && lower.includes('floppy')) return {fda: image};
  if (lower.endsWith('.bin') && typeof bufferOrUrl !== 'string' && bufferOrUrl.byteLength <= 2 * 1024 * 1024) return {fda: image};
  return {hda: image};
}

export async function bootBrowserVm({file = null, demoUrl = '', screenContainer, onStatus, onSerial}) {
  await stopBrowserVm();
  const V86 = await ensureV86();
  prepareScreen(screenContainer);
  serialText = '';

  const name = file?.name || demoUrl.split('/').at(-1) || 'boot.img';
  const source = file ? await file.arrayBuffer() : assetUrl(demoUrl);
  const disk = imageOption(name, source);

  onStatus?.(`Loading ${name} in the browser…`);
  emulator = new V86({
    wasm_path: assetUrl('v86/v86.wasm'),
    memory_size: 128 * 1024 * 1024,
    vga_memory_size: 16 * 1024 * 1024,
    screen_container: screenContainer,
    bios: {url: assetUrl('v86/seabios.bin')},
    vga_bios: {url: assetUrl('v86/vgabios.bin')},
    autostart: true,
    disable_speaker: false,
    ...disk,
  });

  emulator.add_listener('download-progress', (event) => {
    if (!event?.lengthComputable || !event.total) return;
    const percent = Math.round((event.loaded / event.total) * 100);
    onStatus?.(`Loading ${event.file_name || name} · ${percent}%`);
  });
  emulator.add_listener('emulator-ready', () => onStatus?.(`Ready · ${name} · click the display for keyboard and mouse`));
  emulator.add_listener('emulator-started', () => onStatus?.(`Running locally in v86 · ${name}`));
  emulator.add_listener('emulator-stopped', () => onStatus?.('Web VM stopped'));
  emulator.add_listener('serial0-output-byte', (byte) => {
    serialText += String.fromCharCode(byte & 0xff);
    onSerial?.(serialText);
  });

  return {name};
}

export async function stopBrowserVm() {
  if (!emulator) return;
  try { emulator.stop(); } catch {}
  try { await emulator.destroy?.(); } catch {}
  emulator = null;
}

export function sendBrowserSerial(text) {
  if (!emulator) throw new Error('Start the Web VM first.');
  emulator.serial0_send(text);
}

export function browserVmRunning() {
  return emulator !== null;
}
