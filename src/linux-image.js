// Linux uncompressed newc initramfs, shared by browser and native builders.
// Format: https://www.kernel.org/doc/html/latest/driver-api/early-userspace/buffer-format.html
const encoder = new TextEncoder();
const align = value => (value + 3) & ~3;
export const LINUX_CMDLINE = 'console=tty0 console=ttyS0,115200 rdinit=/init quiet loglevel=3 nokaslr mitigations=off';

export function createCpio(entries) {
  const files = [...entries, {name: 'TRAILER!!!', mode: 0, data: new Uint8Array()}];
  const records = files.map((file, index) => {
    if (!file.name || file.name.startsWith('/') || file.name.split('/').some(part => !part || part === '.' || part === '..') || file.name.includes('\0')) {
      throw new Error(`Invalid initramfs path: ${file.name}`);
    }
    const name = encoder.encode(file.name + '\0');
    const data = file.data instanceof Uint8Array ? file.data : encoder.encode(file.data ?? '');
    const fields = [index + 1, file.mode ?? 0o100644, 0, 0, 1, 0, data.length, 0, 0, file.major ?? 0, file.minor ?? 0, name.length, 0];
    const header = encoder.encode('070701' + fields.map(value => value.toString(16).padStart(8, '0')).join(''));
    const dataOffset = align(header.length + name.length);
    const bytes = new Uint8Array(align(dataOffset + data.length));
    bytes.set(header); bytes.set(name, header.length); bytes.set(data, dataOffset);
    return bytes;
  });
  const bytes = new Uint8Array(records.reduce((size, record) => size + record.length, 0));
  let offset = 0;
  for (const record of records) { bytes.set(record, offset); offset += record.length; }
  return bytes;
}

export function validateLinuxExecutable(elf) {
  if (!(elf instanceof Uint8Array) || elf.length < 64 || elf[0] !== 0x7f || elf[1] !== 0x45 || elf[2] !== 0x4c || elf[3] !== 0x46 || elf[4] !== 2 || elf[5] !== 1 || elf[16] !== 2 || elf[18] !== 62) {
    throw new Error('Expected a static x86_64 Linux ELF executable.');
  }
}

export function createProjectInitramfs(elf, assets = []) {
  validateLinuxExecutable(elf);
  validateProjectAssets(assets);
  const files = assets.map(asset => ({name: `assets/${asset.name}`, data: asset.bytes}));
  return createCpio([
    ...['dev', 'proc', 'sys', 'tmp', 'assets', 'run'].map(name => ({name, mode: name === 'tmp' ? 0o41777 : 0o40755})),
    {name: 'dev/console', mode: 0o20600, major: 5, minor: 1},
    {name: 'init', mode: 0o100755, data: elf},
    {name: 'assets/.manifest', data: assets.map(asset => asset.name).join('\n') + '\n'},
    ...files,
  ]);
}

export function combineInitramfs(drivers, project) {
  const bytes = new Uint8Array(align(drivers.length) + project.length);
  bytes.set(drivers); bytes.set(project, align(drivers.length));
  return bytes;
}

export function validateProjectAssets(assets) {
  if (!Array.isArray(assets) || assets.length > 64) throw new Error('A project supports at most 64 attached files.');
  const names = new Set();
  for (const asset of assets) {
    if (!/^[A-Za-z0-9_][A-Za-z0-9._-]{0,119}$/.test(asset.name) || names.has(asset.name) || asset.name === '.manifest') {
      throw new Error(`Invalid or duplicate asset name: ${asset.name}. Use letters, numbers, underscores, dots or dashes.`);
    }
    names.add(asset.name);
  }
}

export const LINUX_ISO_SIGNATURE = 'FROMSCRATCH_LINUX_INITRAMFS_V1_6B04DFF9';
export function patchLinuxIso(template, metadata, initrd) {
  const offset = metadata.initrdOffset, size = metadata.initrdSlotSize;
  if (metadata.format !== 'fromscratch-linux-iso-template' || metadata.version !== 1 ||
      !Number.isSafeInteger(offset) || !Number.isSafeInteger(size) || offset < 0 || size <= 0 ||
      metadata.templateBytes !== template.length || offset + size > template.length) {
    throw new Error('The Linux ISO template metadata is invalid or mismatched.');
  }
  if (initrd.length > size) throw new Error(`This initramfs exceeds the ${Math.floor(size / 1048576)} MiB browser ISO export slot. Reduce attachments or use Export build bundle.`);
  const signature = encoder.encode(LINUX_ISO_SIGNATURE);
  if (!signature.every((value, index) => template[offset + index] === value)) throw new Error('The Linux ISO initramfs slot is missing.');
  const iso = template.slice();
  iso.fill(0, offset, offset + size);
  iso.set(initrd, offset);
  return iso;
}
