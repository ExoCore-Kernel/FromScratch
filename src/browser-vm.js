let emulator = null;
let loaderPromise = null;
let loadAttempt = 0;
let serialText = '';

function assetUrl(path) {
  return new URL(path, document.baseURI).href;
}

async function ensureV64() {
  loaderPromise ??= import(/* @vite-ignore */ `${assetUrl('v64/build/libv86.mjs')}?attempt=${++loadAttempt}`)
    .then(module => {
      if (typeof module.V86 !== 'function') throw new Error('v64 did not expose its V86 API.');
      return module.V86;
    })
    .catch(error => {
      loaderPromise = null;
      throw new Error(`Could not load v64: ${error.message}. Press Run to retry.`);
    });
  return loaderPromise;
}

function prepareScreen(container) {
  container.replaceChildren();
  container.append(document.createElement('canvas'));
}

function imageOption(name, source, isDemo) {
  const image = typeof source === 'string' ? {url: source} : {buffer: source};
  const lower = name.toLowerCase();
  if (lower.endsWith('.iso')) return {cdrom: image, boot_order: 0x123};
  if (lower.endsWith('.elf') || lower.endsWith('.mb') || lower.endsWith('.multiboot')) return {multiboot: image};
  if (isDemo || lower.includes('floppy') || (
    (lower.endsWith('.img') || lower.endsWith('.bin')) && typeof source !== 'string' && source.byteLength <= 2097152
  )) return {fda: image, boot_order: 0x231};
  return {hda: image, boot_order: 0x132};
}

export async function bootBrowserVm({file = null, demoUrl = '', screenContainer, onStatus, onSerial, onError}) {
  await stopBrowserVm();
  onStatus?.('Loading v64 x86_64…');
  const V86 = await ensureV64();
  prepareScreen(screenContainer);
  serialText = '';
  const name = file?.name || demoUrl.split('/').at(-1) || 'boot.img';
  const source = file ? await file.arrayBuffer() : assetUrl(demoUrl);
  const vm = new V86({
    cpu_type: 'x86_64',
    machine_type: 'i440fx',
    cpu_cores: 1,
    cpu_worker: true,
    cpu_worker_url: assetUrl('v64/build/cpu-worker.js'),
    wasm_path: assetUrl('v64/build/v86.wasm'),
    wasm_fallback_path: assetUrl('v64/build/v86-fallback.wasm'),
    memory_size: 256 * 1024 * 1024,
    graphics_adapter: 'bochs_vga',
    graphics_adapter_path: assetUrl('v64/build/v86-bochs-vga.js'),
    vram_size: 16 * 1024 * 1024,
    screen: {container: screenContainer},
    bios: {url: assetUrl('v64/bios/seabios.bin')},
    vga_bios: {url: assetUrl('v64/bios/vgabios.bin')},
    acpi: true,
    qemu_compatible: true,
    net_device: {type: 'none'},
    audio_device: 'none',
    disable_speaker: true,
    autostart: true,
    ...imageOption(name, source, !file && demoUrl === 'web-demo.img'),
  });
  emulator = vm;
  vm.add_listener('serial0-output-byte', byte => {
    if (emulator !== vm) return;
    serialText += String.fromCharCode(byte & 255);
    onSerial?.(serialText);
  });
  vm.add_listener('emulator-started', () => {
    if (emulator === vm) onStatus?.(`Running locally in v64 · x86_64 · ${name}`);
  });
  vm.add_listener('emulator-stopped', () => {
    if (emulator === vm) onStatus?.('Web VM stopped');
  });
  await new Promise((resolve, reject) => {
    let ready = false;
    const fail = error => {
      if (emulator !== vm) return;
      clearTimeout(timeout);
      const failure = error instanceof Error ? error : new Error(String(error));
      if (ready) onError?.(failure);
      else reject(failure);
    };
    const timeout = setTimeout(() => fail(new Error('v64 initialization timed out. Press Run to retry.')), 60000);
    vm.add_listener('emulator-error', fail);
    vm.add_listener('download-error', event => fail(new Error(`Could not load ${event?.file_name || 'v64 media'}`)));
    vm.add_listener('download-progress', event => {
      if (emulator === vm && event?.lengthComputable && event.total) {
        onStatus?.(`Loading ${event.file_name || name} · ${Math.round(event.loaded / event.total * 100)}%`);
      }
    });
    vm.add_listener('emulator-ready', () => {
      clearTimeout(timeout);
      ready = true;
      if (emulator === vm) onStatus?.(`Ready in v64 · x86_64 · ${name} · click display for keyboard and mouse`);
      resolve();
    });
  }).catch(async error => {
    if (emulator === vm) await stopBrowserVm();
    throw error;
  });
  return {name};
}

export async function stopBrowserVm() {
  const vm = emulator;
  emulator = null;
  if (!vm) return;
  try { await vm.stop(); } catch {}
  try { await vm.destroy(); } catch {}
}

export function sendBrowserSerial(text) {
  if (!emulator) throw new Error('Start the Web VM first.');
  emulator.serial0_send(text);
}
