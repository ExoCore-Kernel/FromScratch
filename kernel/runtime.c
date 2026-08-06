#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#define COM1 0x3F8u
#define FONT_SCALE 2u
#define GLYPH_WIDTH 5u
#define GLYPH_HEIGHT 7u
#define CELL_WIDTH ((GLYPH_WIDTH + 1u) * FONT_SCALE)
#define CELL_HEIGHT ((GLYPH_HEIGHT + 1u) * FONT_SCALE)
#define BLOCKOS_JOIN_BUFFER_COUNT 8u
#define BLOCKOS_JOIN_BUFFER_SIZE 256u
#define MAX_ASSETS 64u
#define BLOCKOS_GRAPHICS_MAX_WIDTH 1024u
#define BLOCKOS_GRAPHICS_MAX_HEIGHT 768u
#define BLOCKOS_REGION_SLOTS 8u
#define BLOCKOS_REGION_MAX_WIDTH 64u
#define BLOCKOS_REGION_MAX_HEIGHT 64u
#define BLOCKOS_INPUT_LINE_SIZE 256u

struct multiboot_tag {
    uint32_t type;
    uint32_t size;
};

struct multiboot_tag_framebuffer {
    uint32_t type;
    uint32_t size;
    uint64_t address;
    uint32_t pitch;
    uint32_t width;
    uint32_t height;
    uint8_t bits_per_pixel;
    uint8_t framebuffer_type;
    uint16_t reserved;
};

struct multiboot_tag_module {
    uint32_t type;
    uint32_t size;
    uint32_t module_start;
    uint32_t module_end;
    char command_line[];
};

struct blockos_asset {
    const char *name;
    const uint8_t *data;
    uint64_t size;
};

static volatile uint32_t *framebuffer;
static uint32_t framebuffer_width = 1024u;
static uint32_t framebuffer_height = 768u;
static uint32_t framebuffer_pitch = 4096u;
static uint8_t framebuffer_bpp = 32u;
static uint32_t foreground_colour = 0xF8FAFCu;
static uint32_t background_colour = 0x111827u;
static uint32_t cursor_x;
static uint32_t cursor_y;
static struct blockos_asset assets[MAX_ASSETS];
static uint32_t asset_count;
static char join_buffers[BLOCKOS_JOIN_BUFFER_COUNT][BLOCKOS_JOIN_BUFFER_SIZE];
static uint32_t next_join_buffer;
static uint32_t unimplemented_reports;
static uint32_t graphics_backbuffer[BLOCKOS_GRAPHICS_MAX_WIDTH * BLOCKOS_GRAPHICS_MAX_HEIGHT];
static bool graphics_backbuffer_enabled;
static bool graphics_clip_enabled;
static uint32_t graphics_clip_x;
static uint32_t graphics_clip_y;
static uint32_t graphics_clip_width;
static uint32_t graphics_clip_height;
struct blockos_saved_region {
    bool valid;
    uint32_t width;
    uint32_t height;
    uint32_t pixels[BLOCKOS_REGION_MAX_WIDTH * BLOCKOS_REGION_MAX_HEIGHT];
};
static struct blockos_saved_region saved_regions[BLOCKOS_REGION_SLOTS];
static char console_input_line[BLOCKOS_INPUT_LINE_SIZE];
static uint32_t console_input_length;
static bool console_input_ready;

void blockos_unimplemented(const char *name);
void screen_clear(uint32_t colour);

static inline void out8(uint16_t port, uint8_t value) {
    __asm__ volatile("outb %0, %1" : : "a"(value), "Nd"(port));
}

static inline uint8_t in8(uint16_t port) {
    uint8_t value;
    __asm__ volatile("inb %1, %0" : "=a"(value) : "Nd"(port));
    return value;
}

static void serial_initialize(void) {
    out8(COM1 + 1u, 0x00u);
    out8(COM1 + 3u, 0x80u);
    out8(COM1 + 0u, 0x03u);
    out8(COM1 + 1u, 0x00u);
    out8(COM1 + 3u, 0x03u);
    out8(COM1 + 2u, 0xC7u);
    out8(COM1 + 4u, 0x0Bu);
}

static void serial_character(char character) {
    while ((in8(COM1 + 5u) & 0x20u) == 0u) __asm__ volatile("pause");
    out8(COM1, (uint8_t)character);
}

static void serial_text(const char *text) {
    if (text == NULL) return;
    while (*text != '\0') serial_character(*text++);
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

static bool graphics_point_is_visible(uint32_t x, uint32_t y) {
    if (x >= framebuffer_width || y >= framebuffer_height) return false;
    if (!graphics_clip_enabled) return true;
    return x >= graphics_clip_x && y >= graphics_clip_y
        && x < graphics_clip_x + graphics_clip_width
        && y < graphics_clip_y + graphics_clip_height;
}

static volatile uint32_t *graphics_row(uint32_t y) {
    if (graphics_backbuffer_enabled) return &graphics_backbuffer[y * framebuffer_width];
    return (volatile uint32_t *)((uintptr_t)framebuffer + (uint64_t)y * framebuffer_pitch);
}

static void put_pixel(uint32_t x, uint32_t y, uint32_t colour) {
    if (framebuffer == NULL || framebuffer_bpp != 32u || !graphics_point_is_visible(x, y)) return;
    graphics_row(y)[x] = colour & 0x00FFFFFFu;
}

static uint32_t get_pixel(uint32_t x, uint32_t y) {
    if (framebuffer == NULL || framebuffer_bpp != 32u || x >= framebuffer_width || y >= framebuffer_height) return 0u;
    return graphics_row(y)[x] & 0x00FFFFFFu;
}

static void fill_rectangle(uint32_t x, uint32_t y, uint32_t width, uint32_t height, uint32_t colour) {
    if (framebuffer == NULL || framebuffer_bpp != 32u || width == 0u || height == 0u) return;
    uint32_t min_x = x;
    uint32_t min_y = y;
    uint32_t max_x = x + width > framebuffer_width ? framebuffer_width : x + width;
    uint32_t max_y = y + height > framebuffer_height ? framebuffer_height : y + height;
    if (graphics_clip_enabled) {
        if (min_x < graphics_clip_x) min_x = graphics_clip_x;
        if (min_y < graphics_clip_y) min_y = graphics_clip_y;
        uint32_t clip_max_x = graphics_clip_x + graphics_clip_width;
        uint32_t clip_max_y = graphics_clip_y + graphics_clip_height;
        if (max_x > clip_max_x) max_x = clip_max_x;
        if (max_y > clip_max_y) max_y = clip_max_y;
    }
    if (min_x >= max_x || min_y >= max_y) return;
    colour &= 0x00FFFFFFu;
    for (uint32_t py = min_y; py < max_y; ++py) {
        volatile uint32_t *row = graphics_row(py);
        for (uint32_t px = min_x; px < max_x; ++px) row[px] = colour;
    }
}

static void draw_character_at(uint32_t x, uint32_t y, char character, uint32_t colour) {
    fill_rectangle(x, y, CELL_WIDTH, CELL_HEIGHT, background_colour);
    for (uint32_t row = 0; row < GLYPH_HEIGHT; ++row) {
        uint8_t bits = glyph_row(character, row);
        for (uint32_t column = 0; column < GLYPH_WIDTH; ++column) {
            if ((bits & (1u << (GLYPH_WIDTH - 1u - column))) == 0u) continue;
            fill_rectangle(x + column * FONT_SCALE, y + row * FONT_SCALE, FONT_SCALE, FONT_SCALE, colour);
        }
    }
}

static void draw_character_transparent_at(uint32_t x, uint32_t y, char character, uint32_t colour) {
    for (uint32_t row = 0; row < GLYPH_HEIGHT; ++row) {
        uint8_t bits = glyph_row(character, row);
        for (uint32_t column = 0; column < GLYPH_WIDTH; ++column) {
            if ((bits & (1u << (GLYPH_WIDTH - 1u - column))) == 0u) continue;
            fill_rectangle(x + column * FONT_SCALE, y + row * FONT_SCALE, FONT_SCALE, FONT_SCALE, colour);
        }
    }
}

static void scroll_framebuffer(void) {
    if (framebuffer == NULL || framebuffer_height <= CELL_HEIGHT) return;
    uint32_t rows_to_copy = framebuffer_height - CELL_HEIGHT;
    for (uint32_t y = 0; y < rows_to_copy; ++y) {
        volatile uint32_t *destination = (volatile uint32_t *)((uintptr_t)framebuffer + (uint64_t)y * framebuffer_pitch);
        volatile uint32_t *source = (volatile uint32_t *)((uintptr_t)framebuffer + (uint64_t)(y + CELL_HEIGHT) * framebuffer_pitch);
        for (uint32_t x = 0; x < framebuffer_width; ++x) destination[x] = source[x];
    }
    fill_rectangle(0, rows_to_copy, framebuffer_width, CELL_HEIGHT, background_colour);
    cursor_y = rows_to_copy;
}

static void display_character(char character) {
    serial_character(character);
    if (character == '\r') { cursor_x = 0; return; }
    if (character == '\n') {
        cursor_x = 0;
        cursor_y += CELL_HEIGHT;
        if (cursor_y + CELL_HEIGHT > framebuffer_height) scroll_framebuffer();
        return;
    }
    if (character == '\b') {
        if (cursor_x >= CELL_WIDTH) cursor_x -= CELL_WIDTH;
        draw_character_at(cursor_x, cursor_y, ' ', foreground_colour);
        return;
    }
    if (cursor_x + CELL_WIDTH > framebuffer_width) {
        cursor_x = 0;
        cursor_y += CELL_HEIGHT;
    }
    if (cursor_y + CELL_HEIGHT > framebuffer_height) scroll_framebuffer();
    draw_character_at(cursor_x, cursor_y, character, foreground_colour);
    cursor_x += CELL_WIDTH;
}

static void parse_multiboot(uint64_t multiboot_address) {
    if (multiboot_address == 0u) return;
    uint8_t *cursor = (uint8_t *)(uintptr_t)(multiboot_address + 8u);
    for (;;) {
        struct multiboot_tag *tag = (struct multiboot_tag *)cursor;
        if (tag->type == 0u) break;
        if (tag->type == 8u && tag->size >= sizeof(struct multiboot_tag_framebuffer)) {
            struct multiboot_tag_framebuffer *info = (struct multiboot_tag_framebuffer *)tag;
            framebuffer = (volatile uint32_t *)(uintptr_t)info->address;
            framebuffer_pitch = info->pitch;
            framebuffer_width = info->width;
            framebuffer_height = info->height;
            framebuffer_bpp = info->bits_per_pixel;
        } else if (tag->type == 3u && asset_count < MAX_ASSETS) {
            struct multiboot_tag_module *module = (struct multiboot_tag_module *)tag;
            assets[asset_count].name = module->command_line;
            assets[asset_count].data = (const uint8_t *)(uintptr_t)module->module_start;
            assets[asset_count].size = (uint64_t)module->module_end - module->module_start;
            ++asset_count;
        }
        cursor += (tag->size + 7u) & ~7u;
    }
}

void blockos_runtime_init(uint64_t multiboot_address) {
    serial_initialize();
    parse_multiboot(multiboot_address);
    cursor_x = 0;
    cursor_y = 0;
    screen_clear(background_colour);
    serial_text("[BlockOS x86_64] boot successful\n");
}

void screen_clear(uint32_t colour) {
    background_colour = colour & 0x00FFFFFFu;
    fill_rectangle(0, 0, framebuffer_width, framebuffer_height, background_colour);
    cursor_x = 0;
    cursor_y = 0;
    serial_text("\x1b[2J\x1b[H");
}

void screen_print(const char *text) {
    if (text == NULL) return;
    while (*text != '\0') display_character(*text++);
}

void screen_print_line(const char *text) {
    screen_print(text);
    display_character('\n');
}

void screen_print_i64(int64_t value) {
    char digits[24];
    uint32_t count = 0;
    uint64_t magnitude;
    if (value < 0) {
        display_character('-');
        magnitude = (uint64_t)(-(value + 1)) + 1u;
    } else magnitude = (uint64_t)value;
    do {
        digits[count++] = (char)('0' + (magnitude % 10u));
        magnitude /= 10u;
    } while (magnitude != 0u && count < sizeof(digits));
    while (count > 0u) display_character(digits[--count]);
}

void screen_set_pixel(int32_t x, int32_t y, uint32_t colour) {
    if (x < 0 || y < 0) return;
    put_pixel((uint32_t)x, (uint32_t)y, colour & 0x00FFFFFFu);
}

void blockos_graphics_initialize(void) {
    graphics_backbuffer_enabled = false;
    graphics_clip_enabled = false;
}

void blockos_graphics_set_clip(uint32_t x, uint32_t y, uint32_t width, uint32_t height) {
    graphics_clip_x = x;
    graphics_clip_y = y;
    graphics_clip_width = width;
    graphics_clip_height = height;
    graphics_clip_enabled = width != 0u && height != 0u;
}

void blockos_graphics_clear_clip(void) { graphics_clip_enabled = false; }
void blockos_graphics_fill_rectangle(uint32_t x, uint32_t y, uint32_t width, uint32_t height, uint32_t colour) { fill_rectangle(x, y, width, height, colour); }

void blockos_graphics_draw_line(int32_t x0, int32_t y0, int32_t x1, int32_t y1, uint32_t colour) {
    int32_t dx = x1 >= x0 ? x1 - x0 : x0 - x1;
    int32_t sx = x0 < x1 ? 1 : -1;
    int32_t dy_abs = y1 >= y0 ? y1 - y0 : y0 - y1;
    int32_t dy = -dy_abs;
    int32_t sy = y0 < y1 ? 1 : -1;
    int32_t error = dx + dy;
    for (;;) {
        if (x0 >= 0 && y0 >= 0) put_pixel((uint32_t)x0, (uint32_t)y0, colour);
        if (x0 == x1 && y0 == y1) break;
        int32_t twice = error * 2;
        if (twice >= dy) { error += dy; x0 += sx; }
        if (twice <= dx) { error += dx; y0 += sy; }
    }
}

void blockos_graphics_copy_region(uint32_t sx, uint32_t sy, uint32_t dx, uint32_t dy, uint32_t width, uint32_t height) {
    if (framebuffer == NULL || width == 0u || height == 0u) return;
    if (sx >= framebuffer_width || sy >= framebuffer_height || dx >= framebuffer_width || dy >= framebuffer_height) return;
    if (sx + width > framebuffer_width) width = framebuffer_width - sx;
    if (dx + width > framebuffer_width) width = framebuffer_width - dx;
    if (sy + height > framebuffer_height) height = framebuffer_height - sy;
    if (dy + height > framebuffer_height) height = framebuffer_height - dy;
    if (dy > sy) {
        for (uint32_t row_index = height; row_index > 0u; --row_index) {
            uint32_t row = row_index - 1u;
            volatile uint32_t *source = graphics_row(sy + row);
            volatile uint32_t *destination = graphics_row(dy + row);
            if (dx > sx) for (uint32_t col = width; col > 0u; --col) destination[dx + col - 1u] = source[sx + col - 1u];
            else for (uint32_t col = 0; col < width; ++col) destination[dx + col] = source[sx + col];
        }
    } else {
        for (uint32_t row = 0; row < height; ++row) {
            volatile uint32_t *source = graphics_row(sy + row);
            volatile uint32_t *destination = graphics_row(dy + row);
            if (dx > sx) for (uint32_t col = width; col > 0u; --col) destination[dx + col - 1u] = source[sx + col - 1u];
            else for (uint32_t col = 0; col < width; ++col) destination[dx + col] = source[sx + col];
        }
    }
}

void blockos_graphics_save_region(uint32_t slot, uint32_t x, uint32_t y, uint32_t width, uint32_t height) {
    if (slot >= BLOCKOS_REGION_SLOTS || x >= framebuffer_width || y >= framebuffer_height) return;
    if (width > BLOCKOS_REGION_MAX_WIDTH) width = BLOCKOS_REGION_MAX_WIDTH;
    if (height > BLOCKOS_REGION_MAX_HEIGHT) height = BLOCKOS_REGION_MAX_HEIGHT;
    if (x + width > framebuffer_width) width = framebuffer_width - x;
    if (y + height > framebuffer_height) height = framebuffer_height - y;
    struct blockos_saved_region *region = &saved_regions[slot];
    region->width = width; region->height = height; region->valid = true;
    for (uint32_t py = 0; py < height; ++py)
        for (uint32_t px = 0; px < width; ++px)
            region->pixels[py * BLOCKOS_REGION_MAX_WIDTH + px] = get_pixel(x + px, y + py);
}

void blockos_graphics_restore_region(uint32_t slot, uint32_t x, uint32_t y) {
    if (slot >= BLOCKOS_REGION_SLOTS || !saved_regions[slot].valid) return;
    struct blockos_saved_region *region = &saved_regions[slot];
    for (uint32_t py = 0; py < region->height; ++py)
        for (uint32_t px = 0; px < region->width; ++px)
            if (x + px < framebuffer_width && y + py < framebuffer_height)
                put_pixel(x + px, y + py, region->pixels[py * BLOCKOS_REGION_MAX_WIDTH + px]);
}

void blockos_graphics_draw_fast_cursor(uint32_t x, uint32_t y) {
    for (uint32_t row = 0; row < 16u; ++row) {
        uint32_t length = row + 1u;
        if (length > 12u) length = 12u;
        for (uint32_t col = 0; col < length; ++col) {
            bool edge = col == 0u || col + 1u == length || row == 0u || row == 15u;
            put_pixel(x + col, y + row, edge ? 0x020617u : 0xFFFFFFu);
        }
    }
    fill_rectangle(x + 5u, y + 13u, 5u, 12u, 0x020617u);
    fill_rectangle(x + 6u, y + 14u, 3u, 10u, 0xFFFFFFu);
    blockos_graphics_draw_line((int32_t)x + 9, (int32_t)y + 22, (int32_t)x + 14, (int32_t)y + 28, 0x020617u);
    blockos_graphics_draw_line((int32_t)x + 8, (int32_t)y + 22, (int32_t)x + 12, (int32_t)y + 27, 0xFFFFFFu);
}

void blockos_graphics_enable_backbuffer(bool enabled) {
    if (enabled == graphics_backbuffer_enabled) return;
    if (enabled) {
        if (framebuffer_width > BLOCKOS_GRAPHICS_MAX_WIDTH || framebuffer_height > BLOCKOS_GRAPHICS_MAX_HEIGHT) return;
        for (uint32_t y = 0; y < framebuffer_height; ++y) {
            volatile uint32_t *source = (volatile uint32_t *)((uintptr_t)framebuffer + (uint64_t)y * framebuffer_pitch);
            for (uint32_t x = 0; x < framebuffer_width; ++x) graphics_backbuffer[y * framebuffer_width + x] = source[x];
        }
        graphics_backbuffer_enabled = true;
    } else {
        for (uint32_t y = 0; y < framebuffer_height; ++y) {
            volatile uint32_t *destination = (volatile uint32_t *)((uintptr_t)framebuffer + (uint64_t)y * framebuffer_pitch);
            for (uint32_t x = 0; x < framebuffer_width; ++x) destination[x] = graphics_backbuffer[y * framebuffer_width + x];
        }
        graphics_backbuffer_enabled = false;
    }
}

void blockos_graphics_present_rect(uint32_t x, uint32_t y, uint32_t width, uint32_t height) {
    if (!graphics_backbuffer_enabled || framebuffer == NULL) return;
    uint32_t max_x = x + width > framebuffer_width ? framebuffer_width : x + width;
    uint32_t max_y = y + height > framebuffer_height ? framebuffer_height : y + height;
    for (uint32_t py = y; py < max_y; ++py) {
        volatile uint32_t *destination = (volatile uint32_t *)((uintptr_t)framebuffer + (uint64_t)py * framebuffer_pitch);
        for (uint32_t px = x; px < max_x; ++px) destination[px] = graphics_backbuffer[py * framebuffer_width + px];
    }
}

void blockos_graphics_present(void) { blockos_graphics_present_rect(0u, 0u, framebuffer_width, framebuffer_height); }

void blockos_graphics_draw_sprite(uint32_t x, uint32_t y, const uint32_t *pixels, uint32_t width, uint32_t height, uint32_t transparent) {
    if (pixels == NULL) return;
    transparent &= 0x00FFFFFFu;
    for (uint32_t py = 0; py < height; ++py)
        for (uint32_t px = 0; px < width; ++px) {
            uint32_t colour = pixels[py * width + px] & 0x00FFFFFFu;
            if (colour != transparent) put_pixel(x + px, y + py, colour);
        }
}

void blockos_graphics_draw_text(uint32_t x, uint32_t y, const char *text, uint32_t colour) {
    if (text == NULL) return;
    while (*text != '\0') {
        if (*text == '\n') { x = 0u; y += CELL_HEIGHT; }
        else { draw_character_transparent_at(x, y, *text, colour); x += CELL_WIDTH; }
        ++text;
    }
}

uint32_t blockos_graphics_text_width(const char *text) {
    uint32_t length = 0u; if (text == NULL) return 0u; while (text[length] != '\0' && text[length] != '\n') ++length; return length * CELL_WIDTH;
}
uint32_t blockos_graphics_text_height(void) { return CELL_HEIGHT; }

const char *blockos_string_join(const char *left, const char *right) {
    char *output = join_buffers[next_join_buffer];
    uint32_t position = 0;
    next_join_buffer = (next_join_buffer + 1u) % BLOCKOS_JOIN_BUFFER_COUNT;
    if (left != NULL) while (*left != '\0' && position + 1u < BLOCKOS_JOIN_BUFFER_SIZE) output[position++] = *left++;
    if (right != NULL) while (*right != '\0' && position + 1u < BLOCKOS_JOIN_BUFFER_SIZE) output[position++] = *right++;
    output[position] = '\0';
    return output;
}

uint32_t blockos_framebuffer_width(void) { return framebuffer_width; }
uint32_t blockos_framebuffer_height(void) { return framebuffer_height; }
uint32_t blockos_framebuffer_pitch(void) { return framebuffer_pitch; }
uint32_t blockos_framebuffer_bpp(void) { return framebuffer_bpp; }

uint32_t blockos_asset_count(void) { return asset_count; }
const char *blockos_asset_name(uint32_t index) { return index < asset_count ? assets[index].name : ""; }
uint64_t blockos_asset_size(uint32_t index) { return index < asset_count ? assets[index].size : 0u; }
const uint8_t *blockos_asset_data(uint32_t index) { return index < asset_count ? assets[index].data : NULL; }
void blockos_print_asset_text(uint32_t index) {
    if (index >= asset_count) return;
    for (uint64_t i = 0; i < assets[index].size; ++i) {
        char value = (char)assets[index].data[i];
        if (value == '\0') break;
        display_character(value);
    }
    display_character('\n');
}

void cpu_halt(void) { for (;;) __asm__ volatile("cli; hlt"); }
void cpu_wait_for_interrupt(void) { __asm__ volatile("pause"); }
void blockos_console_putc(char value) { display_character(value); }
bool blockos_console_input_available(void) { return (in8(COM1 + 5u) & 0x01u) != 0u; }
uint8_t blockos_console_read_input(void) { return blockos_console_input_available() ? in8(COM1) : 0u; }
static char blockos_ascii_lower(char value) {
    if (value >= 'A' && value <= 'Z') return (char)(value - 'A' + 'a');
    return value;
}

static void blockos_console_poll_line(void) {
    if (console_input_ready) return;

    while (blockos_console_input_available()) {
        char value = (char)blockos_console_read_input();

        if (value == '\r' || value == '\n') {
            if (console_input_length == 0u) continue;
            console_input_line[console_input_length] = '\0';
            console_input_ready = true;
            display_character('\n');
            return;
        }

        if (value == '\b' || (uint8_t)value == 127u) {
            if (console_input_length > 0u) --console_input_length;
            continue;
        }

        if ((uint8_t)value < 32u) continue;

        if (console_input_length + 1u < BLOCKOS_INPUT_LINE_SIZE) {
            console_input_line[console_input_length++] = value;
            display_character(value);
        }
    }
}

bool blockos_console_line_available(void) {
    blockos_console_poll_line();
    return console_input_ready;
}

const char *blockos_console_read_line(void) {
    blockos_console_poll_line();
    if (!console_input_ready) return "";

    console_input_ready = false;
    console_input_length = 0u;
    return console_input_line;
}

bool blockos_string_equal_ignore_case(const char *left, const char *right) {
    if (left == NULL || right == NULL) return left == right;

    while (*left != '\0' && *right != '\0') {
        if (blockos_ascii_lower(*left) != blockos_ascii_lower(*right)) return false;
        ++left;
        ++right;
    }

    return *left == '\0' && *right == '\0';
}

void blockos_console_set_cursor(uint32_t x, uint32_t y) {
    cursor_x = x < framebuffer_width ? x : framebuffer_width - 1u;
    cursor_y = y < framebuffer_height ? y : framebuffer_height - 1u;
}
uint32_t blockos_console_get_cursor_x(void) { return cursor_x; }
uint32_t blockos_console_get_cursor_y(void) { return cursor_y; }
void blockos_console_set_colours(uint8_t foreground, uint8_t background) {
    static const uint32_t palette[16] = {0x000000,0x0000AA,0x00AA00,0x00AAAA,0xAA0000,0xAA00AA,0xAA5500,0xAAAAAA,0x555555,0x5555FF,0x55FF55,0x55FFFF,0xFF5555,0xFF55FF,0xFFFF55,0xFFFFFF};
    foreground_colour = palette[foreground & 15u];
    background_colour = palette[background & 15u];
}
void blockos_console_write_hex(uint64_t value) {
    static const char digits[] = "0123456789ABCDEF";
    display_character('0'); display_character('x');
    bool started = false;
    for (int shift = 60; shift >= 0; shift -= 4) {
        uint8_t digit = (uint8_t)((value >> (uint32_t)shift) & 15u);
        if (digit != 0u || started || shift == 0) { started = true; display_character(digits[digit]); }
    }
}
void blockos_console_draw_cell(uint32_t x, uint32_t y, char value, uint8_t colour) {
    (void)colour;
    draw_character_at(x * CELL_WIDTH, y * CELL_HEIGHT, value, foreground_colour);
}
uint8_t port_read8(uint16_t port) { return in8(port); }
void port_write8(uint16_t port, uint8_t value) { out8(port, value); }
void blockos_unimplemented(const char *name) {
    if (unimplemented_reports >= 24u) return;
    ++unimplemented_reports;
    serial_text("[BlockOS model] "); serial_text(name); serial_text(" used\n");
}

static uint64_t unsigned_divide(uint64_t numerator, uint64_t denominator, uint64_t *remainder) {
    uint64_t quotient = 0;
    uint64_t current = 0;
    if (denominator == 0u) {
        if (remainder != NULL) *remainder = numerator;
        return 0;
    }
    for (int bit = 63; bit >= 0; --bit) {
        current = (current << 1u) | ((numerator >> (uint32_t)bit) & 1u);
        if (current >= denominator) {
            current -= denominator;
            quotient |= (uint64_t)1u << (uint32_t)bit;
        }
    }
    if (remainder != NULL) *remainder = current;
    return quotient;
}

uint64_t __udivdi3(uint64_t numerator, uint64_t denominator) {
    return unsigned_divide(numerator, denominator, NULL);
}

uint64_t __umoddi3(uint64_t numerator, uint64_t denominator) {
    uint64_t remainder = 0;
    (void)unsigned_divide(numerator, denominator, &remainder);
    return remainder;
}

int64_t __divdi3(int64_t numerator, int64_t denominator) {
    bool negative = (numerator < 0) != (denominator < 0);
    uint64_t left = numerator < 0 ? (uint64_t)(-(numerator + 1)) + 1u : (uint64_t)numerator;
    uint64_t right = denominator < 0 ? (uint64_t)(-(denominator + 1)) + 1u : (uint64_t)denominator;
    uint64_t value = unsigned_divide(left, right, NULL);
    return negative ? -(int64_t)value : (int64_t)value;
}

int64_t __moddi3(int64_t numerator, int64_t denominator) {
    uint64_t remainder = 0;
    uint64_t left = numerator < 0 ? (uint64_t)(-(numerator + 1)) + 1u : (uint64_t)numerator;
    uint64_t right = denominator < 0 ? (uint64_t)(-(denominator + 1)) + 1u : (uint64_t)denominator;
    (void)unsigned_divide(left, right, &remainder);
    return numerator < 0 ? -(int64_t)remainder : (int64_t)remainder;
}

void *memcpy(void *destination, const void *source, size_t length) {
    uint8_t *output = (uint8_t *)destination;
    const uint8_t *input = (const uint8_t *)source;
    for (size_t i = 0; i < length; ++i) output[i] = input[i];
    return destination;
}

void *memmove(void *destination, const void *source, size_t length) {
    uint8_t *output = (uint8_t *)destination;
    const uint8_t *input = (const uint8_t *)source;
    if (output < input) {
        for (size_t i = 0; i < length; ++i) output[i] = input[i];
    } else if (output > input) {
        for (size_t i = length; i > 0u; --i) output[i - 1u] = input[i - 1u];
    }
    return destination;
}

void *memset(void *destination, int value, size_t length) {
    uint8_t *output = (uint8_t *)destination;
    for (size_t i = 0; i < length; ++i) output[i] = (uint8_t)value;
    return destination;
}
