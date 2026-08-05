let worker = null;
let nextId = 1;
const jobs = new Map();

function workerUrl() {
  return new URL('compiler-worker.js', document.baseURI);
}

function ensureWorker() {
  if (worker) return worker;
  worker = new Worker(workerUrl());
  worker.addEventListener('message', (event) => {
    const data = event.data ?? {};
    if (data.type === 'log') {
      for (const job of jobs.values()) job.onLog?.(String(data.text ?? ''));
      return;
    }
    const job = jobs.get(data.id);
    if (!job) return;
    jobs.delete(data.id);
    if (data.type === 'done') job.resolve(new Uint8Array(data.bytes));
    else job.reject(new Error(data.message || 'Browser compilation failed.'));
  });
  worker.addEventListener('error', (event) => {
    const error = new Error(event.message || 'The browser compiler worker crashed.');
    for (const job of jobs.values()) job.reject(error);
    jobs.clear();
    worker?.terminate();
    worker = null;
  });
  return worker;
}

export function browserCompilerSupported() {
  return typeof Worker !== 'undefined' && typeof WebAssembly !== 'undefined';
}

export function browserCompilerIsolationReady() {
  return window.crossOriginIsolated && typeof SharedArrayBuffer !== 'undefined';
}

export function compileX86_64Kernel(source, {onLog} = {}) {
  if (!browserCompilerSupported()) throw new Error('This browser does not support Web Workers and WebAssembly.');
  if (!browserCompilerIsolationReady()) {
    throw new Error('The compiler needs cross-origin isolation. Reload once so the GitHub Pages service worker can enable SharedArrayBuffer.');
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
