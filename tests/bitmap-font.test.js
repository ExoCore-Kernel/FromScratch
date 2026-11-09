import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createPsf, parsePsf, fontFromPixels} from '../src/bitmap-font.js';

test('PSF1 and PSF2 normalize glyphs without losing lowercase or multi-byte rows', async () => {
  const font = parsePsf(await readFile(new URL('../public/fonts/default.psf', import.meta.url)));
  assert.equal(font.width, 8);
  assert.notDeepEqual(font.bytes.subarray(32 + 65 * 8, 32 + 66 * 8), font.bytes.subarray(32 + 97 * 8, 32 + 98 * 8));
  const psf1 = new Uint8Array(4 + 256 * 16);
  psf1.set([0x36, 0x04, 0, 16]); psf1[4 + 65 * 16] = 0x81;
  const normalized = parsePsf(psf1);
  assert.equal(normalized.height, 16);
  assert.equal(normalized.bytes[32 + 65 * 16], 0x81);
  const wide = createPsf(9, 16, new Uint8Array(256 * 32).fill(0x80));
  assert.equal(parsePsf(wide).bytes.length, 32 + 256 * 32);
});

test('PSF Unicode tables map characters into their correct byte slots', () => {
  const base = createPsf(8, 8, new Uint8Array(256 * 8));
  base[32 + 7 * 8] = 0xf0;
  const bytes = new Uint8Array(base.length + 257);
  bytes.set(base); new DataView(bytes.buffer).setUint32(12, 1, true);
  let offset = base.length;
  for (let glyph = 0; glyph < 256; glyph++) {
    if (glyph === 7) bytes[offset++] = 65;
    bytes[offset++] = 0xff;
  }
  assert.equal(parsePsf(bytes).bytes[32 + 65 * 8], 0xf0);
});

test('truncated fonts, invalid sizes and invalid grids are rejected', async () => {
  const font = new Uint8Array(await readFile(new URL('../public/fonts/default.psf', import.meta.url)));
  assert.throws(() => parsePsf(font.subarray(0, 40)), /truncated/);
  assert.throws(() => parsePsf(new Uint8Array(16)), /PSF/);
  const invalid = font.slice(); new DataView(invalid.buffer).setUint32(28, 33, true);
  assert.throws(() => parsePsf(invalid), /32/);
  assert.throws(() => fontFromPixels(new Uint8Array(4), 1, 1, {columns: 16, rows: 16}), /divide evenly/);
});

test('glyph sheets support light, dark and transparent pixels with an ASCII offset', () => {
  const light = fontFromPixels(new Uint8Array([255, 255, 255, 255, 0, 0, 0, 255]), 2, 1, {columns: 2, rows: 1, firstCode: 65});
  assert.equal(light.bytes[32 + 65], 0x80);
  assert.equal(light.bytes[32 + 66], 0);
  const dark = fontFromPixels(new Uint8Array([255, 255, 255, 255, 0, 0, 0, 255]), 2, 1, {columns: 2, rows: 1, firstCode: 65, darkGlyphs: true});
  assert.equal(dark.bytes[32 + 65], 0);
  assert.equal(dark.bytes[32 + 66], 0x80);
  const alpha = fontFromPixels(new Uint8Array([0, 0, 0, 255, 255, 255, 255, 0]), 2, 1, {columns: 2, rows: 1, firstCode: 65});
  assert.equal(alpha.bytes[32 + 65], 0x80);
  assert.equal(alpha.bytes[32 + 66], 0);
});
