const MAX_DIMENSION = 32;

function validateFont(width, height, count) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 ||
      width > MAX_DIMENSION || height > MAX_DIMENSION || count < 128 || count > 65536) {
    throw new Error('Use a font with at least 128 glyphs, each between 1×1 and 32×32 pixels.');
  }
}

export function createPsf(width, height, glyphs, count = 256) {
  validateFont(width, height, count);
  const glyphSize = Math.ceil(width / 8) * height;
  if (glyphs.length !== glyphSize * count) throw new Error('Incomplete font bitmap.');
  const bytes = new Uint8Array(32 + glyphs.length);
  const header = new DataView(bytes.buffer);
  [0x864ab572, 0, 32, 0, count, glyphSize, height, width].forEach((value, index) => header.setUint32(index * 4, value, true));
  bytes.set(glyphs, 32);
  return bytes;
}

export function parsePsf(input) {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  if (bytes.length > 2 * 1024 * 1024) throw new Error('Font files must be smaller than 2 MB.');
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let width, height, count, glyphSize, offset, unicode;
  const psf1 = bytes[0] === 0x36 && bytes[1] === 0x04;
  if (psf1 && bytes.length >= 4) {
    width = 8; height = bytes[3]; count = bytes[2] & 1 ? 512 : 256;
    glyphSize = height; offset = 4; unicode = Boolean(bytes[2] & 6);
  } else if (bytes.length >= 32 && view.getUint32(0, true) === 0x864ab572) {
    if (view.getUint32(4, true) !== 0) throw new Error('Unsupported PSF version.');
    offset = view.getUint32(8, true); unicode = Boolean(view.getUint32(12, true) & 1);
    count = view.getUint32(16, true); glyphSize = view.getUint32(20, true);
    height = view.getUint32(24, true); width = view.getUint32(28, true);
    if (offset < 32) throw new Error('Invalid PSF header.');
  } else throw new Error('Choose a PSF1/PSF2 font or a PNG/BMP glyph sheet.');
  validateFont(width, height, count);
  const rowBytes = Math.ceil(width / 8);
  if (glyphSize < rowBytes * height || offset + count * glyphSize > bytes.length) throw new Error('The PSF file is truncated or has invalid glyph sizes.');
  const mapping = Array.from({length: 256}, (_, code) => code < count ? code : 63);
  if (unicode) {
    let position = offset + count * glyphSize;
    for (let glyph = 0; glyph < count && position < bytes.length; glyph++) {
      if (psf1) {
        let sequence = false;
        while (position + 1 < bytes.length) {
          const code = view.getUint16(position, true); position += 2;
          if (code === 0xffff) break;
          if (code === 0xfffe) sequence = true;
          if (!sequence && code < 256) mapping[code] = glyph;
        }
      } else {
        const start = position;
        while (position < bytes.length && bytes[position] !== 0xff) position++;
        const entry = bytes.subarray(start, position++);
        const separator = entry.indexOf(0xfe);
        const text = new TextDecoder().decode(separator < 0 ? entry : entry.subarray(0, separator));
        for (const character of text) {
          const code = character.codePointAt(0);
          if (code < 256) mapping[code] = glyph;
        }
      }
    }
  }
  const normalized = new Uint8Array(rowBytes * height * 256);
  mapping.forEach((glyph, code) => normalized.set(bytes.subarray(offset + glyph * glyphSize, offset + glyph * glyphSize + rowBytes * height), code * rowBytes * height));
  return {width, height, count: 256, bytes: createPsf(width, height, normalized)};
}

export function fontFromPixels(pixels, imageWidth, imageHeight, {columns = 16, rows = 16, firstCode = 0, darkGlyphs = false} = {}) {
  if (![columns, rows, firstCode].every(Number.isInteger) || columns < 1 || rows < 1 || columns * rows > 256 ||
      firstCode < 0 || firstCode + columns * rows > 256 || imageWidth % columns || imageHeight % rows) {
    throw new Error('The sheet must divide evenly into a grid of up to 256 glyphs, in character-code order.');
  }
  const width = imageWidth / columns, height = imageHeight / rows;
  validateFont(width, height, 256);
  if (pixels.length !== imageWidth * imageHeight * 4) throw new Error('Incomplete image pixels.');
  const rowBytes = Math.ceil(width / 8);
  const glyphs = new Uint8Array(256 * rowBytes * height);
  let transparent = false;
  for (let index = 3; index < pixels.length; index += 4) if (pixels[index] < 128) { transparent = true; break; }
  for (let glyph = 0; glyph < columns * rows; glyph++) {
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const index = (((Math.floor(glyph / columns) * height + y) * imageWidth) + glyph % columns * width + x) * 4;
      const light = (pixels[index] * 0.2126 + pixels[index + 1] * 0.7152 + pixels[index + 2] * 0.0722) >= 128;
      const filled = pixels[index + 3] >= 128 && (transparent || (darkGlyphs ? !light : light));
      if (filled) glyphs[(firstCode + glyph) * height * rowBytes + y * rowBytes + (x >> 3)] |= 0x80 >> (x & 7);
    }
  }
  return {width, height, count: 256, bytes: createPsf(width, height, glyphs)};
}

export function drawFontPreview(canvas, font) {
  const context = canvas.getContext('2d');
  const scale = font.height < 12 ? 2 : 1;
  const lines = ['Hello from FromScratch!', 'Aa Bb Cc 0123456789', 'The quick brown fox jumps.'];
  canvas.width = Math.max(480, (font.width + 1) * scale * 28 + 32);
  canvas.height = (font.height + 3) * scale * lines.length + 32;
  context.fillStyle = '#111827'; context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#f8fafc';
  const rowBytes = Math.ceil(font.width / 8);
  lines.forEach((line, row) => [...line].forEach((character, column) => {
    const base = 32 + character.charCodeAt(0) * rowBytes * font.height;
    for (let y = 0; y < font.height; y++) for (let x = 0; x < font.width; x++) {
      if (font.bytes[base + y * rowBytes + (x >> 3)] & (0x80 >> (x & 7))) context.fillRect(16 + (column * (font.width + 1) + x) * scale, 16 + (row * (font.height + 3) + y) * scale, scale, scale);
    }
  }));
}
