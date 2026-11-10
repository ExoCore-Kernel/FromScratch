let apiPromise;
let apiScriptLoaded = false;
let activeId = 0;
let queue = Promise.resolve();
let runtimePromise;

function asset(name) {
  return new URL('./compiler/' + name, self.location.href).href;
}
function kernelAsset(name) {
  const url = new URL('./linux/' + name, self.location.href);
  url.search = self.location.search;
  return url.href;
}
async function readBuffer(filename) {
  const response = await fetch(filename);
  if (!response.ok || response.headers.get('content-type')?.includes('text/html')) {
    throw new Error('Browser compiler asset missing: ' + filename + '. Run npm run setup:compiler and rebuild the site.');
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
      clang: asset('clang'),
      lld: asset('lld'),
      memfs: asset('memfs'),
      sysroot: asset('sysroot.tar'),
    });
    await api.ready;
    return api;
  })().catch(error => {
    apiPromise = null;
    throw error;
  });
  return apiPromise;
}

// The Linux process entry, user-space runtime and linker script are compiled when the site
// is built, not for every project. Only the user's generated C changes.
async function prepareRuntime(api) {
  runtimePromise ??= (async () => {
    const objects = ['boot.o', 'linux.o', 'runtime.o', 'extensions_runtime.o', 'text_style_runtime.o'];
    const names = [...objects, 'linker.ld'];
    const files = await Promise.all(names.map(name => readBuffer(kernelAsset(name))));
    names.forEach((name, index) => api.memfs.addFile(name, files[index]));
    return objects;
  })().catch(error => {
    runtimePromise = null;
    throw error;
  });
  return runtimePromise;
}

async function compile({id, type, source}) {
  activeId = id;
  try {
    const api = await getApi();
    const input = 'kernel-' + id + '.c';
    api.memfs.addFile(input, String(source ?? ''));
    const clang = await api.getModule(asset('clang'));
    const args = [
      'clang', '-cc1', type === 'build-elf' ? '-emit-obj' : '-S',
      ...api.clangCommonArgs,
      '-triple=x86_64-unknown-linux-gnu', '-ffreestanding', '-fno-builtin',
      '-disable-red-zone', '-mrelocation-model', 'static', '-O2',
      '-o', 'kernel-' + id + (type === 'build-elf' ? '.o' : '.S'),
      '-x', 'c', input,
    ];
    await api.run(clang, ...args);
    const output = args[args.indexOf('-o') + 1];
    const compiled = api.memfs.getFileContents(output);
    if (!compiled?.byteLength) throw new Error('Clang produced an empty output file.');

    if (type === 'compile') {
      self.postMessage({type: 'done', id, assembly: new TextDecoder().decode(compiled)});
      return;
    }

    const objects = await prepareRuntime(api);
    const linked = 'kernel-' + id + '.elf';
    const lld = await api.getModule(asset('lld'));
    await api.run(lld, 'ld.lld', '-m', 'elf_x86_64', '--build-id=none',
      '-static', '-z', 'max-page-size=4096', '-T', 'linker.ld',
      '-o', linked, ...objects, output);
    const elf = api.memfs.getFileContents(linked);
    if (!elf?.byteLength) throw new Error('LLD did not produce an ELF executable.');
    // Copy out of the WASM filesystem before posting/transferring the buffer.
    const result = new Uint8Array(elf).slice();
    self.postMessage({type: 'done', id, elf: result.buffer}, [result.buffer]);
  } catch (error) {
    self.postMessage({
      type: 'error',
      id,
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

self.onmessage = event => {
  const {type} = event.data ?? {};
  if (type !== 'compile' && type !== 'build-elf') return;
  queue = queue.then(() => compile(event.data));
};
