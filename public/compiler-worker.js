self.importScripts('./compiler/shared.js');

let apiPromise;
let supportFilesPromise;
let activeId = 0;

function asset(name) {
  return new URL(`./compiler/${name}`, self.location.href).href;
}

function kernelAsset(name) {
  return new URL(`./browser-kernel/${name}`, self.location.href).href;
}

async function compileStreaming(filename) {
  const response = await fetch(filename, {cache: 'force-cache'});
  if (!response.ok) throw new Error(`Missing compiler asset: ${filename}`);
  return WebAssembly.compile(await response.arrayBuffer());
}

async function readBuffer(filename) {
  const response = await fetch(filename, {cache: 'force-cache'});
  if (!response.ok) throw new Error(`Missing compiler asset: ${filename}`);
  return response.arrayBuffer();
}

function getApi() {
  apiPromise ??= Promise.resolve(new API({
    readBuffer,
    compileStreaming,
    hostWrite(text) {
      self.postMessage({type: 'log', id: activeId, text});
    },
    clang: asset('clang'),
    lld: asset('lld'),
    memfs: asset('memfs'),
    sysroot: asset('sysroot.tar'),
  }));
  return apiPromise;
}

async function addFetchedFile(api, virtualName, url) {
  const response = await fetch(url, {cache: 'force-cache'});
  if (!response.ok) throw new Error(`Missing browser kernel file: ${url}`);
  api.memfs.addFile(virtualName, await response.arrayBuffer());
}

async function ensureSupportFiles(api) {
  supportFilesPromise ??= (async () => {
    await api.ready;
    await Promise.all([
      addFetchedFile(api, 'boot.o', kernelAsset('boot.o')),
      addFetchedFile(api, 'runtime.o', kernelAsset('runtime.o')),
      addFetchedFile(api, 'extensions_runtime.o', kernelAsset('extensions_runtime.o')),
      addFetchedFile(api, 'linker.ld', kernelAsset('linker.ld')),
    ]);
  })();
  return supportFilesPromise;
}

async function compileKernelObject(api, id, source) {
  await api.ready;
  const input = `kernel-${id}.c`;
  const output = `kernel-${id}.o`;
  api.memfs.addFile(input, String(source ?? ''));

  const clang = await api.getModule(api.clangFilename);
  await api.run(
    clang,
    'clang',
    '-cc1',
    '-emit-obj',
    '-disable-free',
    '-isysroot', '/',
    '-internal-isystem', '/include',
    '-internal-isystem', '/lib/clang/8.0.1/include',
    '-ferror-limit', '19',
    '-fmessage-length', '80',
    '-fcolor-diagnostics',
    '-triple=x86_64-unknown-none-elf',
    '-ffreestanding',
    '-fno-builtin',
    '-mrelocation-model', 'static',
    '-mno-red-zone',
    '-O2',
    '-o', output,
    '-x', 'c',
    input,
  );

  const bytes = api.memfs.getFileContents(output);
  if (!bytes?.byteLength) throw new Error('Clang returned no object file.');
  return output;
}

async function linkKernelElf(api, id, objectName) {
  await ensureSupportFiles(api);
  const output = `kernel-${id}.elf`;
  const lld = await api.getModule(api.lldFilename);
  await api.run(
    lld,
    'ld.lld',
    '--no-threads',
    '--build-id=none',
    '-nostdlib',
    '-static',
    '-z', 'max-page-size=4096',
    '-T', 'linker.ld',
    'boot.o',
    'runtime.o',
    'extensions_runtime.o',
    objectName,
    '-o', output,
  );

  const bytes = api.memfs.getFileContents(output);
  if (!bytes?.byteLength) throw new Error('LLD returned no kernel ELF.');
  return new Uint8Array(bytes).slice();
}

self.onmessage = async (event) => {
  const {type, id, source} = event.data ?? {};
  if (type !== 'build-elf') return;

  activeId = id;
  try {
    const api = await getApi();
    const objectName = await compileKernelObject(api, id, source);
    const elf = await linkKernelElf(api, id, objectName);
    self.postMessage({type: 'done', id, elf: elf.buffer}, [elf.buffer]);
  } catch (error) {
    self.postMessage({
      type: 'error',
      id,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
