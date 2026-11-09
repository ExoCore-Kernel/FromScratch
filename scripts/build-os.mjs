import {spawnSync} from 'node:child_process';
import {mkdir, mkdtemp, rm, writeFile, copyFile, readFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const flags = [
  '--target=x86_64-unknown-none-elf', '-m64', '-mcmodel=kernel', '-mno-red-zone',
  '-mno-mmx', '-mno-sse', '-mno-sse2', '-ffreestanding', '-fno-stack-protector',
  '-fno-pic', '-fno-pie', '-fno-builtin', '-fno-asynchronous-unwind-tables',
  '-fno-unwind-tables', '-nostdinc', '-Wall', '-Wextra', '-Werror=implicit-function-declaration',
  '-Ikernel/include',
];
function run(command, args) {
  const result = spawnSync(command, args, {cwd: root, encoding: 'utf8', timeout: 60000});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed:\n${result.stdout}\n${result.stderr}`);
}

export async function buildKernelImage({source, assembly = null, assets = [], directory = 'build/os'}) {
  const build = resolve(root, directory);
  await mkdir(build, {recursive: true});
  if (assets.length > 64) throw new Error('A kernel supports at most 64 attached files.');
  await writeFile(join(build, 'kernel.c'), source);
  for (const [input, output] of [['kernel/boot.S', 'boot.o'], ['kernel/runtime.c', 'runtime.o'],
    ['kernel/extensions_runtime.c', 'extensions.o'], [assembly || join(build, 'kernel.c'), 'kernel.o']]) {
    run('clang', [...flags, '-c', input, '-o', join(build, output)]);
  }
  const elf = join(build, 'blockos.elf');
  run('ld.lld', ['-m', 'elf_x86_64', '-nostdlib', '-T', 'kernel/linker.ld', '-o', elf,
    ...['boot.o', 'runtime.o', 'extensions.o', 'kernel.o'].map(name => join(build, name))]);
  const media = await mkdtemp(join(build, '.iso-'));
  try {
    await mkdir(join(media, 'boot/grub'), {recursive: true});
    await copyFile(elf, join(media, 'boot/blockos.elf'));
    const modules = [];
    const names = new Set();
    for (const asset of assets) {
      if (!/^[A-Za-z0-9_][A-Za-z0-9._-]{0,119}$/.test(asset.name) || names.has(asset.name)) throw new Error(`Invalid or duplicate asset name: ${asset.name}`);
      names.add(asset.name);
      await mkdir(join(media, 'assets'), {recursive: true});
      await writeFile(join(media, 'assets', asset.name), Buffer.from(asset.dataBase64, 'base64'));
      modules.push(`  module2 /assets/${asset.name} ${asset.name}`);
    }
    await writeFile(join(media, 'boot/grub/grub.cfg'), `set timeout=0
  set default=0
  serial --unit=0 --speed=115200
  terminal_output console serial
  insmod all_video
  menuentry "FromScratch OS" {
    set gfxmode=1024x768x32
    set gfxpayload=keep
    multiboot2 /boot/blockos.elf
  ${modules.join('\n')}
    boot
  }
  `);
    // Homebrew's x86_64-elf-grub makes UEFI-only media; SeaBIOS needs i386-pc.
    const grub = process.env.GRUB_MKRESCUE || (process.platform === 'darwin' &&
      spawnSync('i686-elf-grub-mkrescue', ['--version']).status === 0 ? 'i686-elf-grub-mkrescue' : 'grub-mkrescue');
    const iso = join(build, 'fromscratch-os.iso');
    run(grub, ['-o', iso, media]);
    return {iso, elf, directory: build};
  } finally { await rm(media, {recursive: true, force: true}); }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const filename = process.argv[2];
  if (!filename) throw new Error('Usage: npm run build:os -- /path/to/fromscratch-build-bundle.json [output-directory]');
  const bundle = JSON.parse(await readFile(filename, 'utf8'));
  if (bundle.format !== 'fromscratch-build-bundle' || typeof bundle.generatedC !== 'string') throw new Error('Choose a build bundle exported from the Studio.');
  const result = await buildKernelImage({source: bundle.generatedC, assets: bundle.files || [], directory: process.argv[3] || 'build/os'});
  console.log(`Built ${result.iso}\nOpen the Studio, choose ISO/IMG, and select this image to run it in v64.`);
}
