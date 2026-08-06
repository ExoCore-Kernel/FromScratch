self.importScripts('./compiler/shared.js');

let apiPromise;
let activeId = 0;

function asset(name) {
  return new URL(`./compiler/${name}`, self.location.href).href;
}

async function compileStreaming(filename) {
  const response = await fetch(filename);
  if (!response.ok) throw new Error(`Missing compiler asset: ${filename}`);
  return WebAssembly.compile(await response.arrayBuffer());
}

async function readBuffer(filename) {
  const response = await fetch(filename);
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

async function compileFreestandingC(api, id, source) {
  await api.ready;

  const input = `kernel-${id}.c`;
  const output = `kernel-${id}.S`;
  api.memfs.addFile(input, String(source ?? ''));

  const clang = await api.getModule(api.clangFilename);
  await api.run(
    clang,
    'clang',
    '-cc1',
    '-S',
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
    '-fno-stack-protector',
    '-mrelocation-model', 'static',
    '-mllvm', '--x86-asm-syntax=intel',
    '-O2',
    '-o', output,
    '-x', 'c',
    input,
  );

  const bytes = api.memfs.getFileContents(output);
  if (!bytes?.byteLength) throw new Error('Clang returned no assembly output.');
  return new TextDecoder().decode(new Uint8Array(bytes));
}

self.onmessage = async (event) => {
  const {type, id, source} = event.data ?? {};
  if (type !== 'compile') return;

  activeId = id;
  try {
    const api = await getApi();
    const assembly = await compileFreestandingC(api, id, source);
    self.postMessage({type: 'done', id, assembly});
  } catch (error) {
    self.postMessage({
      type: 'error',
      id,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
