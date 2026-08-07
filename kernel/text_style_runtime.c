#include <stddef.h>
#include <stdint.h>

void screen_set_pixel(int32_t x, int32_t y, uint32_t colour);
uint32_t blockos_framebuffer_width(void);
uint32_t blockos_framebuffer_height(void);
uint8_t port_read8(uint16_t port);
void port_write8(uint16_t port, uint8_t value);

#define COM1 0x3F8u
#define GLYPH_WIDTH 5u
#define GLYPH_HEIGHT 7u

static uint32_t text_size = 2u;
static uint32_t text_colour = 0xF8FAFCu;
static uint32_t text_font = 0u;
static uint32_t text_location = 0u;
static uint32_t text_line_offset;

static void serial_char(char value) {
    while ((port_read8(COM1 + 5u) & 0x20u) == 0u) __asm__ volatile("pause");
    port_write8(COM1, (uint8_t)value);
}

static void serial_text(const char *text) {
    if (text == NULL) return;
    while (*text != '\0') serial_char(*text++);
}

static uint8_t glyph_row(char character, uint32_t row) {
    static const uint8_t digits[10][7] = {
        {14,17,19,21,25,17,14},{4,12,4,4,4,4,14},{14,17,1,2,4,8,31},{30,1,1,14,1,1,30},{2,6,10,18,31,2,2},{31,16,16,30,1,1,30},{14,16,16,30,17,17,14},{31,1,2,4,8,8,8},{14,17,17,14,17,17,14},{14,17,17,15,1,1,14}
    };
    static const uint8_t letters[26][7] = {
        {14,17,17,31,17,17,17},{30,17,17,30,17,17,30},{14,17,16,16,16,17,14},{30,17,17,17,17,17,30},{31,16,16,30,16,16,31},{31,16,16,30,16,16,16},{14,17,16,23,17,17,15},{17,17,17,31,17,17,17},{14,4,4,4,4,4,14},{7,2,2,2,18,18,12},{17,18,20,24,20,18,17},{16,16,16,16,16,16,31},{17,27,21,21,17,17,17},{17,25,21,19,17,17,17},{14,17,17,17,17,17,14},{30,17,17,30,16,16,16},{14,17,17,17,21,18,13},{30,17,17,30,20,18,17},{15,16,16,14,1,1,30},{31,4,4,4,4,4,4},{17,17,17,17,17,17,14},{17,17,17,17,17,10,4},{17,17,17,21,21,21,10},{17,17,10,4,10,17,17},{17,17,10,4,4,4,4},{31,1,2,4,8,16,31}
    };
    if (row >= 7u) return 0u;
    if (character >= '0' && character <= '9') return digits[(uint32_t)(character - '0')][row];
    if (character >= 'a' && character <= 'z') character = (char)(character - 'a' + 'A');
    if (character >= 'A' && character <= 'Z') return letters[(uint32_t)(character - 'A')][row];
    switch (character) {
        case ' ': return 0;
        case '.': return row == 6u ? 4u : 0u;
        case ',': return row == 5u ? 4u : row == 6u ? 8u : 0u;
        case ':': return (row == 2u || row == 5u) ? 4u : 0u;
        case ';': return row == 2u ? 4u : row == 5u ? 4u : row == 6u ? 8u : 0u;
        case '!': return row < 5u ? 4u : row == 6u ? 4u : 0u;
        case '?': { static const uint8_t q[7]={14,17,1,2,4,0,4}; return q[row]; }
        case '-': return row == 3u ? 14u : 0u;
        case '_': return row == 6u ? 31u : 0u;
        case '+': return row == 3u ? 31u : (row == 1u || row == 2u || row == 4u || row == 5u) ? 4u : 0u;
        case '/': return (uint8_t)(1u << (4u - ((row * 5u) / 7u)));
        case '\\': return (uint8_t)(1u << ((row * 5u) / 7u));
        case '(': return (row == 0u || row == 6u) ? 2u : 4u;
        case ')': return (row == 0u || row == 6u) ? 8u : 4u;
        case '[': return (row == 0u || row == 6u) ? 6u : 4u;
        case ']': return (row == 0u || row == 6u) ? 12u : 4u;
        case '=': return (row == 2u || row == 4u) ? 31u : 0u;
        case '<': return row < 3u ? (uint8_t)(1u << (row + 1u)) : row == 3u ? 16u : (uint8_t)(1u << (7u - row));
        case '>': return row < 3u ? (uint8_t)(16u >> row) : row == 3u ? 1u : (uint8_t)(1u << (row - 4u));
        case '#': return (row == 2u || row == 4u) ? 31u : 10u;
        case '*': return row == 2u ? 21u : row == 3u ? 14u : row == 4u ? 21u : 0u;
        case '\'': return row < 2u ? 4u : 0u;
        case '"': return row < 2u ? 10u : 0u;
        default: return (row == 0u || row == 6u) ? 31u : 17u;
    }
}

static uint32_t cell_width(void) {
    uint32_t spacing = text_font == 2u ? 0u : text_size;
    return GLYPH_WIDTH * text_size + spacing;
}

static uint32_t cell_height(void) {
    return (GLYPH_HEIGHT + 1u) * text_size;
}

static uint32_t text_width(const char *text) {
    uint32_t count = 0u;
    if (text == NULL) return 0u;
    while (text[count] != '\0' && text[count] != '\n') ++count;
    return count * cell_width();
}

static void fill_pixel_block(uint32_t x, uint32_t y, uint32_t width, uint32_t height) {
    for (uint32_t py = 0; py < height; ++py)
        for (uint32_t px = 0; px < width; ++px)
            screen_set_pixel((int32_t)(x + px), (int32_t)(y + py), text_colour);
}

static void draw_character(uint32_t x, uint32_t y, char character) {
    for (uint32_t row = 0; row < GLYPH_HEIGHT; ++row) {
        uint8_t bits = glyph_row(character, row);
        for (uint32_t column = 0; column < GLYPH_WIDTH; ++column) {
            if ((bits & (1u << (GLYPH_WIDTH - 1u - column))) == 0u) continue;
            uint32_t px = x + column * text_size;
            uint32_t py = y + row * text_size;
            fill_pixel_block(px, py, text_size, text_size);
            if (text_font == 1u) {
                uint32_t extra = text_size > 1u ? (text_size / 2u) : 1u;
                fill_pixel_block(px + extra, py, text_size, text_size);
            }
        }
    }
}

static void anchored_position(const char *text, uint32_t *x, uint32_t *y) {
    uint32_t width = blockos_framebuffer_width();
    uint32_t height = blockos_framebuffer_height();
    uint32_t line_width = text_width(text);
    uint32_t line_height = cell_height();
    uint32_t margin = 8u;
    uint32_t column = text_location % 3u;
    uint32_t row = text_location / 3u;

    if (column == 0u) *x = margin;
    else if (column == 1u) *x = width > line_width ? (width - line_width) / 2u : 0u;
    else *x = width > line_width + margin ? width - line_width - margin : 0u;

    if (row == 0u) *y = margin + text_line_offset;
    else if (row == 1u) *y = (height > line_height ? (height - line_height) / 2u : 0u) + text_line_offset;
    else {
        uint32_t base = height > line_height + margin ? height - line_height - margin : 0u;
        *y = base + text_line_offset;
    }
}

void blockos_text_set_size(uint32_t size) {
    if (size < 1u) size = 1u;
    if (size > 8u) size = 8u;
    text_size = size;
    text_line_offset = 0u;
}

void blockos_text_set_colour(uint32_t colour) {
    text_colour = colour & 0x00FFFFFFu;
}

void blockos_text_set_font(uint32_t font) {
    text_font = font <= 2u ? font : 0u;
    text_line_offset = 0u;
}

void blockos_text_set_location(uint32_t location) {
    text_location = location <= 8u ? location : 0u;
    text_line_offset = 0u;
}

void blockos_text_print_line(const char *text) {
    if (text == NULL) return;
    uint32_t x = 0u;
    uint32_t y = 0u;
    anchored_position(text, &x, &y);

    const char *cursor = text;
    uint32_t draw_x = x;
    while (*cursor != '\0') {
        if (*cursor == '\n') {
            y += cell_height();
            draw_x = x;
        } else {
            draw_character(draw_x, y, *cursor);
            draw_x += cell_width();
        }
        ++cursor;
    }

    serial_text(text);
    serial_char('\n');
    text_line_offset += cell_height();
}
