import {bootBrowserVm} from './browser-vm.js';

let worker = null;
let nextId = 1;
const jobs = new Map();

const COMPILER_WORKER_VERSION = '2026-08-07-styled-text-runtime-1';

function ensureWorker() {
  if (worker) return worker;

  const workerUrl = `${import.meta.env.BASE_URL}compiler-worker.js?v=${encodeURIComponent(COMPILER_WORKER_VERSION)}`;
  worker = new Worker(workerUrl, {name: 'fromscratch-x86_64-kernel-builder'});

  worker.onmessage = (event) => {
    const data = event.data ?? {};
    const job = jobs.get(data.id);

    if (data.type === 'log') {
      job?.onLog?.(String(data.text ?? ''));
      return;
    }

    if (!job) return;
    jobs.delete(data.id);

    if (data.type === 'done') {
      job.resolve({elf: new Uint8Array(data.elf)});
    } else {
      job.reject(new Error(data.message || 'Browser kernel build failed.'));
    }
  };

  worker.onerror = (event) => {
    const error = new Error(event.message || 'Compiler worker crashed.');
    for (const job of jobs.values()) job.reject(error);
    jobs.clear();
    worker?.terminate();
    worker = null;
  };

  return worker;
}

export function browserCompilerSupported() {
  return typeof Worker !== 'undefined' && typeof WebAssembly !== 'undefined';
}

export function buildX86_64Elf(source, {onLog} = {}) {
  if (!browserCompilerSupported()) {
    throw new Error('Web Workers and WebAssembly are required.');
  }

  const id = nextId++;
  return new Promise((resolve, reject) => {
    jobs.set(id, {resolve, reject, onLog});
    ensureWorker().postMessage({type: 'build-elf', id, source: String(source ?? '')});
  });
}

export const compileX86_64Assembly = buildX86_64Elf;

export async function createBootableIso(elf) {
  const base = import.meta.env.BASE_URL;
  const templateVersion = `v=${encodeURIComponent(COMPILER_WORKER_VERSION)}`;
  const [templateResponse, metadataResponse] = await Promise.all([
    fetch(`${base}browser-kernel/fromscratch-template.iso?${templateVersion}`, {cache: 'no-store'}),
    fetch(`${base}browser-kernel/iso-template.json?${templateVersion}`, {cache: 'no-store'}),
  ]);
  if (!templateResponse.ok) throw new Error(`ISO template is unavailable (HTTP ${templateResponse.status}).`);
  if (!metadataResponse.ok) throw new Error(`ISO metadata is unavailable (HTTP ${metadataResponse.status}).`);

  const metadata = await metadataResponse.json();
  const kernel = elf instanceof Uint8Array ? elf : new Uint8Array(elf);
  const offset = Number(metadata.kernelOffset);
  const slotSize = Number(metadata.kernelSlotSize);
  if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(slotSize) || offset < 0 || slotSize <= 0) {
    throw new Error('The deployed ISO template metadata is invalid.');
  }
  if (kernel.byteLength > slotSize) {
    throw new Error(`kernel.elf is ${kernel.byteLength} bytes, larger than the ${slotSize}-byte browser ISO slot.`);
  }

  const iso = new Uint8Array(await templateResponse.arrayBuffer());
  if (offset + slotSize > iso.byteLength) throw new Error('The deployed ISO template is truncated.');
  iso.fill(0, offset, offset + slotSize);
  iso.set(kernel, offset);
  return iso;
}

export async function buildBootableIso(source, options = {}) {
  const {elf} = await buildX86_64Elf(source, options);
  const iso = await createBootableIso(elf);
  return {elf, iso};
}

export function stopBrowserCompiler() {
  worker?.terminate();
  worker = null;
  for (const job of jobs.values()) job.reject(new Error('Compilation cancelled.'));
  jobs.clear();
}

function downloadBytes(name, bytes, type) {
  const blob = new Blob([bytes], {type});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MiB`;
}

function installIsoPipelineUi() {
  const codeOutput = document.querySelector('#codeOutput');
  const compileButton = document.querySelector('#compileButton');
  const exportButton = document.querySelector('#exportIsoButton');
  const runButtons = [document.querySelector('#buildRunButton'), document.querySelector('#runAgainButton')].filter(Boolean);
  const runOutput = document.querySelector('#runOutput');
  const runStatus = document.querySelector('#runStatus');
  const statusText = document.querySelector('#statusText');
  const qemuScreen = document.querySelector('#qemuScreen');
  const runInput = document.querySelector('#runInput');
  const stopRunButton = document.querySelector('#stopRunButton');
  const sendInputButton = document.querySelector('#sendInputButton');
  if (!codeOutput || !compileButton || !exportButton || !runOutput || !runStatus || !qemuScreen) return;

  async function build() {
    runOutput.textContent = '';
    const result = await buildBootableIso(codeOutput.textContent ?? '', {
      onLog(text) {
        runOutput.textContent += text;
        runOutput.scrollTop = runOutput.scrollHeight;
      },
    });
    runOutput.textContent += `\n✔ Linked kernel.elf (${formatBytes(result.elf.byteLength)})`;
    runOutput.textContent += `\n✔ Created bootable GRUB ISO (${formatBytes(result.iso.byteLength)})\n`;
    return result;
  }

  compileButton.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    compileButton.disabled = true;
    runStatus.textContent = 'Compiling C and linking x86_64 ELF…';
    try {
      const {elf} = await buildX86_64Elf(codeOutput.textContent ?? '', {
        onLog(text) { runOutput.textContent += text; },
      });
      downloadBytes('blockos_kernel_x86_64.elf', elf, 'application/x-elf');
      runStatus.textContent = `Built kernel.elf · ${formatBytes(elf.byteLength)}`;
      statusText.textContent = 'x86_64 ELF build succeeded';
    } catch (error) {
      runStatus.textContent = 'ELF build failed';
      runOutput.textContent += `\n${error instanceof Error ? error.message : String(error)}`;
    } finally {
      compileButton.disabled = false;
    }
  }, true);

  exportButton.textContent = 'Export ISO';
  exportButton.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    exportButton.disabled = true;
    runStatus.textContent = 'Building bootable ISO entirely in this browser…';
    try {
      const {iso} = await build();
      downloadBytes('FromScratch-BlockOS-x86_64.iso', iso, 'application/x-iso9660-image');
      runStatus.textContent = `Exported bootable ISO · ${formatBytes(iso.byteLength)}`;
      statusText.textContent = 'Bootable ISO exported';
    } catch (error) {
      runStatus.textContent = 'ISO build failed';
      runOutput.textContent += `\n${error instanceof Error ? error.message : String(error)}`;
    } finally {
      exportButton.disabled = false;
    }
  }, true);

  for (const button of runButtons) {
    button.textContent = '▶ Build ISO & Run';
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      for (const item of runButtons) item.disabled = true;
      runStatus.textContent = 'Compiling, linking and creating ISO…';
      try {
        const {iso} = await build();
        const file = new File([iso], 'FromScratch-BlockOS-x86_64.iso', {type: 'application/x-iso9660-image'});
        await bootBrowserVm({
          file,
          screenContainer: qemuScreen,
          onStatus(message) { runStatus.textContent = message; },
          onSerial(text) { runOutput.textContent = text || '[No serial output yet.]'; },
        });
        if (runInput) runInput.disabled = false;
        if (stopRunButton) stopRunButton.disabled = false;
        if (sendInputButton) sendInputButton.disabled = false;
        statusText.textContent = 'Generated ISO is running locally';
      } catch (error) {
        runStatus.textContent = 'Build or boot failed';
        runOutput.textContent += `\n${error instanceof Error ? error.message : String(error)}`;
      } finally {
        for (const item of runButtons) item.disabled = false;
      }
    }, true);
  }
}

if (typeof document !== 'undefined') setTimeout(installIsoPipelineUi, 0);
