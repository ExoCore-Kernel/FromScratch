/* Browser compiler worker for FromScratch.
 *
 * The deployment workflow places the wasm-clang assets in /toolchain:
 * shared.js, clang, lld, memfs and sysroot.tar.
 */
let compilerPromise;

function asset(name) {
  return new URL(`toolchain/${name}`, self.location.href).href;
}

async function fetchBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load ${url}: HTTP ${response.status}`);
  return response.arrayBuffer();
}

async function loadCompiler() {
  if (compilerPromise) return compilerPromise;
  compilerPromise = (async () => {
    importScripts(asset('shared.js'));
    if (typeof API !== 'function') throw new Error('The wasm-clang API did not load.');
    return new API({
      clang: asset('clang'),
      lld: asset('lld'),
      memfs: asset('memfs'),
      sysroot: asset('sysroot.tar'),
      readBuffer: fetchBuffer,
      async compileStreaming(url) {
        const bytes = await fetchBuffer(url);
        return WebAssembly.compile(bytes);
      },
      hostWrite(text) {
        self.postMessage({type: 'log', text: String(text)});
      },
      showTiming: true,
    });
  })();
  return compilerPromise;
}

async function compileKernel(source) {
  const api = await loadCompiler();
  await api.ready;

  const input = '/kernel.c';
  const object = '/kernel.o';
  const output = '/kernel.elf';

  api.memfs.addFile(input, new TextEncoder().encode(source));

  const clang = await api.getModule(api.clangFilename);
  await api.run(
    clang,
    'clang',
    '-cc1',
    '-triple', 'x86_64-unknown-none-elf',
    '-emit-obj',
    '-ffreestanding',
    '-fno-stack-protector',
    '-fno-pic',
    '-mno-red-zone',
    '-O2',
    '-o', object,
    '-x', 'c',
    input,
  );

  const lld = await api.getModule(api.lldFilename);
  await api.run(
    lld,
    'ld.lld',
    '-m', 'elf_x86_64',
    '-nostdlib',
    '-static',
    '-z', 'max-page-size=0x1000',
    '-e', 'kernel_main',
    '-Ttext', '0x100000',
    '-o', output,
    object,
  );

  return Uint8Array.from(api.memfs.getFileContents(output));
}

self.addEventListener('message', async (event) => {
  const {type, id, source} = event.data ?? {};
  if (type !== 'compile') return;

  try {
    const bytes = await compileKernel(String(source ?? ''));
    self.postMessage({type: 'done', id, bytes: bytes.buffer}, [bytes.buffer]);
  } catch (error) {
    self.postMessage({
      type: 'error',
      id,
      message: error instanceof Error ? error.message : String(error),
    });
  }
});
