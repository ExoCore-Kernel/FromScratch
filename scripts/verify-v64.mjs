import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';

const root = new URL('../public/v64/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('manifest.json', root), 'utf8'));
for (const [name, expected] of Object.entries(manifest.sha256)) {
  const bytes = await readFile(new URL(name, root));
  if (createHash('sha256').update(bytes).digest('hex') !== expected) {
    throw new Error(`v64 checksum mismatch: ${name}`);
  }
}
console.log(`v64 runtime verified: ${manifest.build_commit}`);
