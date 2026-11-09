# Classic Console bitmap font

`default.psf`, `atlas-template.bmp`, and `kernel/default-font.h` are derived from Daniel Hepper's public-domain `font8x8_basic.h`: https://github.com/dhepper/font8x8

The bitmap includes distinct uppercase/lowercase ASCII and punctuation. The PSF2 file uses MSB-first rows and 256 glyph slots; slots 128–255 use the question-mark fallback. The BMP template lays out those slots left to right in a 16×16 grid, with light glyphs on black.

Custom fonts may use PSF1 or PSF2 (including Unicode maps), or PNG/BMP sheets with configurable grid size and first character code. The OS currently prints byte-oriented ASCII; importing a Unicode font does not add UTF-8 text rendering.
