import {bootBrowserVm} from './browser-vm.js';

let worker = null;
let nextId = 1;
const jobs = new Map();

const COMPILER_WORKER_VERSION = '2026-11-09-browser-iso-build-1';

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
      if (data.elf) job.resolve({elf: new Uint8Array(data.elf)});
      else if (typeof data.assembly === 'string') job.resolve({assembly: data.assembly});
      else job.reject(new Error('Compiler returned an unexpected result.'));
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

function sendCompilerJob(type, source, {onLog} = {}) {
  if (!browserCompilerSupported()) {
    throw new Error('Web Workers and WebAssembly are required.');
  }

  const id = nextId++;
  return new Promise((resolve, reject) => {
    jobs.set(id, {resolve, reject, onLog});
    ensureWorker().postMessage({type, id, source: String(source ?? '')});
  });
}

export function buildX86_64Elf(source, options = {}) {
  return sendCompilerJob('build-elf', source, options);
}

export function compileX86_64Assembly(source, options = {}) {
  return sendCompilerJob('compile', source, options);
}

export async function createBootableIso(elf) {
  const base = import.meta.env.BASE_URL;
  const [templateResponse, metadataResponse] = await Promise.all([
    fetch(`${base}browser-kernel/fromscratch-template.iso`, {cache: 'force-cache'}),
    fetch(`${base}browser-kernel/iso-template.json`, {cache: 'force-cache'}),
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
  if (kernel.byteLength < 64 || kernel[0] !== 0x7f || kernel[1] !== 0x45 || kernel[2] !== 0x4c || kernel[3] !== 0x46 ||
      kernel[4] !== 2 || kernel[5] !== 1 || kernel[16] !== 2 || kernel[18] !== 62) {
    throw new Error('The compiler did not produce a 64-bit x86 ELF executable.');
  }
  if (metadata.format !== 'fromscratch-iso-template' || metadata.templateBytes !== undefined && metadata.templateBytes < offset + slotSize) {
    throw new Error('The ISO template metadata does not match this build.');
  }
  if (kernel.byteLength > slotSize) {
    throw new Error(`kernel.elf is ${kernel.byteLength} bytes, larger than the ${slotSize}-byte browser ISO slot.`);
  }

  const iso = new Uint8Array(await templateResponse.arrayBuffer());
  if (offset + slotSize > iso.byteLength || (metadata.templateBytes && metadata.templateBytes !== iso.byteLength)) {
    throw new Error('The deployed ISO template is truncated or mismatched.');
  }
  const marker = new TextDecoder().decode(iso.subarray(offset, offset + 32));
  if (!marker.startsWith('FROMSCRATCH_KERNEL_SLOT_V1_')) {
    throw new Error('The ISO template kernel slot is missing.');
  }
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
