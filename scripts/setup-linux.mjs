import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {mkdir, readFile, writeFile, copyFile, mkdtemp, rm, readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {gunzipSync} from 'node:zlib';
import {createCpio, LINUX_CMDLINE, LINUX_ISO_SIGNATURE} from '../src/linux-image.js';

const root = fileURLToPath(new URL('../', import.meta.url));
export const linuxDirectory = join(root, 'public/linux');
const config = JSON.parse(await readFile(new URL('../config/linux.json', import.meta.url), 'utf8'));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export const linuxCompileFlags = ['--target=x86_64-linux-gnu', '-m64', '-ffreestanding', '-fno-builtin', '-fno-stack-protector', '-fno-pic', '-fno-pie', '-fno-unwind-tables', '-fno-asynchronous-unwind-tables', '-nostdinc', '-Ikernel/include', '-Ikernel', '-O2', '-Wall', '-Wextra', '-Werror=implicit-function-declaration'];
export function run(command, args, cwd = root) {
  const result = spawnSync(command, args, {cwd, encoding: 'utf8', timeout: 120000});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}
async function prepareIsoTemplate() {
  const kernelHash = sha256(await readFile(join(linuxDirectory, 'bzImage')));
  try {
    const metadata = JSON.parse(await readFile(join(linuxDirectory, 'iso-template.json'), 'utf8'));
    const template = await readFile(join(linuxDirectory, 'fromscratch-template.iso'));
    if (metadata.version === 1 && metadata.kernelSha256 === kernelHash && metadata.templateSha256 === sha256(template)) return;
  } catch (error) { if (error.code !== 'ENOENT' && !(error instanceof SyntaxError)) throw error; }
  const work = await mkdtemp(join(root, 'build/.linux-iso-'));
  try {
    const slotSize = 16 * 1024 * 1024;
    const placeholder = Buffer.alloc(slotSize, 0xa5);
    placeholder.write(LINUX_ISO_SIGNATURE);
    await mkdir(join(work, 'boot/grub'), {recursive: true});
    await copyFile(join(linuxDirectory, 'bzImage'), join(work, 'boot/bzImage'));
    await writeFile(join(work, 'boot/initramfs.cpio'), placeholder);
    await writeFile(join(work, 'boot/grub/grub.cfg'), `set timeout=0
set default=0
serial --unit=0 --speed=115200
terminal_output console serial
menuentry "FromScratch Linux" {
  linux /boot/bzImage ${LINUX_CMDLINE}
  initrd /boot/initramfs.cpio
  boot
}
`);
    const grub = process.env.GRUB_MKRESCUE || (process.platform === 'darwin' && spawnSync('i686-elf-grub-mkrescue', ['--version']).status === 0 ? 'i686-elf-grub-mkrescue' : 'grub-mkrescue');
    run(grub, ['-o', join(linuxDirectory, 'fromscratch-template.iso'), work]);
    const template = await readFile(join(linuxDirectory, 'fromscratch-template.iso'));
    const offset = template.indexOf(LINUX_ISO_SIGNATURE);
    if (offset < 0 || template.indexOf(LINUX_ISO_SIGNATURE, offset + 1) !== -1 || offset + slotSize > template.length) throw new Error('Linux ISO placeholder is invalid.');
    await writeFile(join(linuxDirectory, 'iso-template.json'), JSON.stringify({
      format: 'fromscratch-linux-iso-template', version: 1, kernelSha256: kernelHash,
      templateSha256: sha256(template), templateBytes: template.length, initrdOffset: offset, initrdSlotSize: slotSize,
    }, null, 2) + '\n');
  } finally { await rm(work, {recursive: true, force: true}); }
}
export async function setupLinux() {
  await mkdir(linuxDirectory, {recursive: true});
  await mkdir(join(root, 'build'), {recursive: true});
  let ready = false;
  try {
    const manifest = JSON.parse(await readFile(join(linuxDirectory, 'manifest.json'), 'utf8'));
    ready = manifest.packageSha256 === config.packageSha256;
    for (const name of ['bzImage', 'drivers.cpio']) {
      const bytes = await readFile(join(linuxDirectory, name));
      ready = ready && sha256(bytes) === manifest.files?.[name];
    }
  } catch (error) { if (error.code !== 'ENOENT' && !(error instanceof SyntaxError)) throw error; }
  if (!ready) {
    const cache = join(root, 'build/linux-package');
    await mkdir(cache, {recursive: true});
    const archive = join(cache, 'linux-virt.apk');
    let bytes;
    try { bytes = await readFile(archive); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (!bytes || sha256(bytes) !== config.packageSha256) {
      console.log(`Downloading pinned Linux ${config.version} kernel and drivers…`);
      const response = await fetch(config.packageUrl, {signal: AbortSignal.timeout(300000)});
      if (!response.ok) throw new Error(`Linux download: HTTP ${response.status}`);
      bytes = Buffer.from(await response.arrayBuffer());
      if (sha256(bytes) !== config.packageSha256) throw new Error('Linux package checksum mismatch.');
      await writeFile(archive, bytes);
    }
    const work = await mkdtemp(join(cache, '.extract-'));
    try {
      run('tar', ['-xzf', archive, '-C', work]);
      const moduleVersion = (await readdir(join(work, 'lib/modules')))[0];
      const modules = join(work, 'lib/modules', moduleVersion);
      const dependencies = new Map((await readFile(join(modules, 'modules.dep'), 'utf8')).trim().split('\n').map(line => {
        const [name, rest] = line.split(':'); return [name, rest.trim().split(/\s+/).filter(Boolean)];
      }));
      const ordered = new Set();
      function add(name) {
        if (ordered.has(name)) return;
        if (!dependencies.has(name)) throw new Error(`Linux driver not found: ${name}`);
        for (const dependency of dependencies.get(name)) add(dependency);
        ordered.add(name);
      }
      add('kernel/drivers/gpu/drm/tiny/bochs.ko.gz');
      const entries = [{name: 'drivers', mode: 0o40755}];
      for (const name of ordered) entries.push({name: `drivers/${name.split('/').at(-1).replace(/\.gz$/, '')}`, data: gunzipSync(await readFile(join(modules, name)))});
      entries.push({name: 'drivers/manifest', data: entries.slice(1).map(entry => '/' + entry.name).join('\n') + '\n'});
      await writeFile(join(linuxDirectory, 'drivers.cpio'), createCpio(entries));
      await copyFile(join(work, 'boot/vmlinuz-virt'), join(linuxDirectory, 'bzImage'));
      const files = {};
      for (const name of ['bzImage', 'drivers.cpio']) files[name] = sha256(await readFile(join(linuxDirectory, name)));
      await writeFile(join(linuxDirectory, 'manifest.json'), JSON.stringify({...config, files}, null, 2) + '\n');
    } finally { await rm(work, {recursive: true, force: true}); }
  }
  await prepareIsoTemplate();
  const published = JSON.parse(await readFile(join(linuxDirectory, 'manifest.json'), 'utf8'));
  await writeFile(join(linuxDirectory, 'manifest.json'), JSON.stringify({...config, files: published.files}, null, 2) + '\n');
  await copyFile(join(root, 'licenses/Linux-GPL-2.0.txt'), join(linuxDirectory, 'LICENSE'));
  await writeFile(join(linuxDirectory, 'SOURCE.txt'), `Linux ${config.version} (${config.license})\nKernel and patches: ${config.sourceUrl}\nUpstream: https://www.kernel.org/\n`);
  // Recompile the small user-space runtime whenever sources change.
  for (const unit of ['boot.S', 'linux.c', 'runtime.c', 'extensions_runtime.c', 'text_style_runtime.c']) {
    run('clang', [...linuxCompileFlags, '-c', `kernel/${unit}`, '-o', join(linuxDirectory, unit.replace(/\.[cS]$/, '.o'))]);
  }
  await copyFile(join(root, 'kernel/linker.ld'), join(linuxDirectory, 'linker.ld'));
  console.log(`Linux ${config.version} and user-space runtime ready in public/linux`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await setupLinux();
