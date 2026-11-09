let apiPromise;
let apiScriptLoaded = false;
let activeId = 0;
let queue = Promise.resolve();

function asset(name) {
  return new URL(`./compiler/${name}`, self.location.href).href;
}

async function readBuffer(filename) {
  const response = await fetch(filename);
  if (!response.ok || response.headers.get('content-type')?.includes('text/html')) {
    throw new Error('The browser compiler is missing. Run npm run setup:compiler and try again.');
  }
  return response.arrayBuffer();
}

function getApi() {
  apiPromise ??= (async () => {
    if (!apiScriptLoaded) {
      self.importScripts(asset('shared.js'));
      apiScriptLoaded = true;
    }
    const api = new API({
      readBuffer,
      compileStreaming: async filename => WebAssembly.compile(await readBuffer(filename)),
      hostWrite(text) { self.postMessage({type: 'log', id: activeId, text}); },
      clang: asset('clang'), lld: asset('lld'), memfs: asset('memfs'), sysroot: asset('sysroot.tar'),
    });
    await api.ready;
    return api;
  })().catch(error => {
    apiPromise = null;
    throw error;
  });
  return apiPromise;
}

async function compile({id, source}) {
  activeId = id;
  try {
    const api = await getApi();
    const input = `kernel-${id}.c`;
    const output = `kernel-${id}.S`;
    api.memfs.addFile(input, String(source ?? ''));
    const clang = await api.getModule(asset('clang'));
    // The upstream assembly helper hardcodes C++; kernels need C symbols and ABI.
    await api.run(clang, 'clang', '-cc1', '-S', ...api.clangCommonArgs,
      '-triple=x86_64-unknown-none-elf', '-ffreestanding', '-fno-builtin',
      '-disable-red-zone', '-mrelocation-model', 'static', '-O2', '-o', output, '-x', 'c', input);
    const bytes = api.memfs.getFileContents(output);
    if (!bytes?.byteLength) throw new Error('Clang returned no assembly output.');
    self.postMessage({type: 'done', id, assembly: new TextDecoder().decode(bytes)});
  } catch (error) {
    self.postMessage({type: 'error', id, message: error instanceof Error ? error.message : String(error)});
  }
}

self.onmessage = event => {
  if (event.data?.type !== 'compile') return;
  queue = queue.then(() => compile(event.data));
};
