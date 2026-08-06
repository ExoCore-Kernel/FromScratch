let worker = null;
let nextId = 1;
const jobs = new Map();

const COMPILER_WORKER_VERSION = '2026-08-06-c-fix-2';

function ensureWorker() {
  if (worker) return worker;

  const workerUrl = `${import.meta.env.BASE_URL}compiler-worker.js?v=${encodeURIComponent(COMPILER_WORKER_VERSION)}`;
  worker = new Worker(workerUrl, {name: 'fromscratch-x86_64-c-compiler'});

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
      job.resolve({assembly: String(data.assembly ?? '')});
    } else {
      job.reject(new Error(data.message || 'Browser compilation failed.'));
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

export function compileX86_64Assembly(source, {onLog} = {}) {
  if (!browserCompilerSupported()) {
    throw new Error('Web Workers and WebAssembly are required.');
  }

  const id = nextId++;
  return new Promise((resolve, reject) => {
    jobs.set(id, {resolve, reject, onLog});
    ensureWorker().postMessage({type: 'compile', id, source: String(source ?? '')});
  });
}

export function stopBrowserCompiler() {
  worker?.terminate();
  worker = null;
  for (const job of jobs.values()) job.reject(new Error('Compilation cancelled.'));
  jobs.clear();
}
