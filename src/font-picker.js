import {parsePsf, fontFromPixels, drawFontPreview} from './bitmap-font.js';

export function installFontPicker({getFont, onChange}) {
  const input = document.querySelector('#bitmapFontFile');
  const options = document.querySelector('#fontImageOptions');
  const preview = document.querySelector('#fontPreview');
  const status = document.querySelector('#fontStatus');
  const summary = document.querySelector('#fontSummary');
  const apply = document.querySelector('#applyFontButton');
  let candidate = null;
  let attempt = 0;
  let defaultFont;

  async function refresh() {
    const selected = getFont();
    summary.textContent = selected ? `${selected.name} · ${selected.width}×${selected.height}` : 'Classic Console · built in · 8×8';
    try {
      defaultFont ??= parsePsf(await (await fetch(new URL('fonts/default.psf', document.baseURI))).arrayBuffer());
      if (!candidate) drawFontPreview(preview, selected || defaultFont);
    } catch (error) { status.textContent = `Could not load the font preview: ${error.message}`; }
  }

  async function readCandidate() {
    const current = ++attempt;
    candidate = null; apply.disabled = true;
    const file = input.files?.[0];
    if (!file) return;
    status.textContent = 'Reading font…';
    try {
      if (file.size > 2 * 1024 * 1024) throw new Error('Choose a font smaller than 2 MB.');
      const imageFile = /\.(png|bmp)$/i.test(file.name);
      options.hidden = !imageFile;
      let font;
      if (imageFile) {
        const bitmap = await createImageBitmap(file);
        try {
          if (bitmap.width * bitmap.height > 1024 * 1024) throw new Error('Font sheets may contain up to one million pixels.');
          const canvas = document.createElement('canvas');
          canvas.width = bitmap.width; canvas.height = bitmap.height;
          const context = canvas.getContext('2d', {willReadFrequently: true});
          context.drawImage(bitmap, 0, 0);
          font = fontFromPixels(context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height, {
            columns: Number(document.querySelector('#fontColumns').value),
            rows: Number(document.querySelector('#fontRows').value),
            firstCode: Number(document.querySelector('#fontFirstCode').value),
            darkGlyphs: document.querySelector('#fontDarkGlyphs').checked,
          });
        } finally { bitmap.close(); }
      } else font = parsePsf(await file.arrayBuffer());
      if (current !== attempt) return;
      candidate = {...font, name: file.name};
      drawFontPreview(preview, candidate);
      status.textContent = `${file.name} · ${font.width}×${font.height} pixels per glyph. Preview ready.`;
      apply.disabled = false;
    } catch (error) { if (current === attempt) status.textContent = error.message; }
  }

  input.addEventListener('change', readCandidate);
  options.addEventListener('change', readCandidate);
  apply.addEventListener('click', () => {
    if (!candidate) return;
    onChange(candidate);
    candidate = null; apply.disabled = true;
    refresh();
    status.textContent = 'Font saved in this project. Rebuild your OS image to see it in the guest.';
  });
  document.querySelector('#resetFontButton').addEventListener('click', () => {
    ++attempt; candidate = null; input.value = ''; apply.disabled = true; options.hidden = true;
    onChange(null); refresh();
    status.textContent = 'Classic Console restored. Rebuild your OS image to apply it.';
  });
  return {refresh};
}
