import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile} from 'node:fs/promises';

const destination = new URL('../public/compiler/', import.meta.url);
const revision = '648c4a89997a351eef75cdaec3ef5b89d4937dec';
// Upstream Git blob IDs pin the exact compiler, filesystem and headers.
const files = {
  clang: '3c0910b3ed586e50c5a7d8d597db94bb80991db7',
  lld: 'c1f29067d9b35cc8a5ca3c921cae419e36f99596',
  memfs: '21455235f3d627e9f749223c29ae0c454855fd40',
  'sysroot.tar': '29235cde546a96dd14ad09a77e6d6dbac0c7d1af',
  'shared.js': '2304ea301c2e1f1cf132340116ca9d5829c187cf',
  LICENSE: 'd645695673349e3947e8e5ae42332d0ac3164cd7',
  'LICENSE.llvm': '24806ab4c9eb291db4d28e159901f7a0901b9fd1',
};
function blobId(bytes) {
  return createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
}
try {
  await mkdir(destination, {recursive: true});
  for (const [name, expected] of Object.entries(files)) {
    const target = new URL(name, destination);
    try {
      if (blobId(await readFile(target)) === expected) continue;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    console.log(`Downloading browser compiler: ${name}`);
    const response = await fetch(`https://raw.githubusercontent.com/binji/wasm-clang/${revision}/${name}`, {
      signal: AbortSignal.timeout(300000),
    });
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (blobId(bytes) !== expected) throw new Error(`Checksum mismatch: ${name}`);
    await writeFile(target, bytes);
  }
  console.log('Browser compiler ready in public/compiler');
} catch (error) {
  console.error(`Compiler setup failed: ${error.message}. Run npm run setup:compiler to retry.`);
  process.exitCode = 1;
}
