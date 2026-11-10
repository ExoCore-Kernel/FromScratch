import {spawnSync} from 'node:child_process';
import {mkdir, mkdtemp, rm, writeFile, copyFile, readFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {setupLinux, linuxDirectory, linuxCompileFlags, run} from './setup-linux.mjs';
import {createProjectInitramfs, combineInitramfs, LINUX_CMDLINE} from '../src/linux-image.js';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function buildKernelImage({source, assembly = null, assets = [], directory = 'build/os', createIso = true}) {
  const build = resolve(root, directory);
  await mkdir(build, {recursive: true});
  await setupLinux();
  await writeFile(join(build, 'program.c'), source);
  run('clang', [...linuxCompileFlags, '-c', assembly || join(build, 'program.c'), '-o', join(build, 'program.o')]);
  const elf = join(build, 'fromscratch-init.elf');
  run('ld.lld', ['-m', 'elf_x86_64', '--build-id=none', '-static', '-z', 'max-page-size=4096', '-T', 'kernel/linker.ld', '-o', elf,
    ...['boot.o', 'linux.o', 'runtime.o', 'extensions_runtime.o', 'text_style_runtime.o'].map(name => join(linuxDirectory, name)), join(build, 'program.o')]);
  const initrd = join(build, 'initramfs.cpio');
  const project = createProjectInitramfs(new Uint8Array(await readFile(elf)), assets.map(asset => ({name: asset.name, bytes: asset.bytes || Buffer.from(asset.dataBase64, 'base64')})));
  await writeFile(initrd, combineInitramfs(await readFile(join(linuxDirectory, 'drivers.cpio')), project));
  const kernel = join(build, 'bzImage');
  await copyFile(join(linuxDirectory, 'bzImage'), kernel);
  const result = {elf, kernel, initrd, directory: build};
  if (!createIso) return result;
  const media = await mkdtemp(join(build, '.iso-'));
  try {
    await mkdir(join(media, 'boot/grub'), {recursive: true});
    await copyFile(kernel, join(media, 'boot/bzImage'));
    await copyFile(initrd, join(media, 'boot/initramfs.cpio'));
    await writeFile(join(media, 'boot/grub/grub.cfg'), `set timeout=0
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
    const iso = join(build, 'fromscratch-os.iso');
    run(grub, ['-o', iso, media]);
    return {...result, iso};
  } finally { await rm(media, {recursive: true, force: true}); }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const filename = process.argv[2];
  if (!filename) throw new Error('Usage: npm run build:os -- /path/to/fromscratch-build-bundle.json [output-directory]');
  const bundle = JSON.parse(await readFile(filename, 'utf8'));
  if (bundle.format !== 'fromscratch-build-bundle' || bundle.target !== 'x86_64-linux' || typeof bundle.generatedC !== 'string') throw new Error('Export a new Linux build bundle from the Studio.');
  const result = await buildKernelImage({source: bundle.generatedC, assets: bundle.files || [], directory: process.argv[3] || 'build/os'});
  console.log(`Built ${result.iso}\nChoose ISO/IMG in the Studio to boot Linux.`);
}
