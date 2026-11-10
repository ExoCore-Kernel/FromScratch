import {createProjectInitramfs, combineInitramfs, patchLinuxIso} from './linux-image.js';

let worker = null;
let nextId = 1;
const jobs = new Map();

const COMPILER_WORKER_VERSION = '2026-11-10-linux-1';

function ensureWorker() {
  if (worker) return worker;

  const workerUrl = `${import.meta.env.BASE_URL}compiler-worker.js?v=${encodeURIComponent(COMPILER_WORKER_VERSION)}`;
  worker = new Worker(workerUrl, {name: 'fromscratch-linux-builder'});

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

async function fetchLinuxAsset(name) {
  const response = await fetch(`${import.meta.env.BASE_URL}linux/${name}?v=${COMPILER_WORKER_VERSION}`);
  if (!response.ok || response.headers.get('content-type')?.includes('text/html')) {
    throw new Error(`Linux asset ${name} is unavailable. Run npm run setup:linux and rebuild the site.`);
  }
  return new Uint8Array(await response.arrayBuffer());
}

export async function buildLinuxImage(source, options = {}) {
  const [{elf}, kernel, drivers] = await Promise.all([
    buildX86_64Elf(source, options), fetchLinuxAsset('bzImage'), fetchLinuxAsset('drivers.cpio'),
  ]);
  if (kernel.length < 0x206 || kernel[0x202] !== 0x48 || kernel[0x203] !== 0x64 || kernel[0x204] !== 0x72 || kernel[0x205] !== 0x53) {
    throw new Error('The deployed Linux kernel has an invalid boot header.');
  }
  const initrd = combineInitramfs(drivers, createProjectInitramfs(elf, options.assets ?? []));
  return {elf, kernel, initrd};
}

export function stopBrowserCompiler() {
  worker?.terminate();
  worker = null;
  for (const job of jobs.values()) job.reject(new Error('Compilation cancelled.'));
  jobs.clear();
}

export async function createBootableIso(initrd) {
  const [template, metadataBytes] = await Promise.all([
    fetchLinuxAsset('fromscratch-template.iso'), fetchLinuxAsset('iso-template.json'),
  ]);
  return patchLinuxIso(template, JSON.parse(new TextDecoder().decode(metadataBytes)), initrd);
}
