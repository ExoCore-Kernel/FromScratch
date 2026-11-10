#include "linux.h"

// Linux services and user-space framebuffer drawing for visual blocks.
void screen_print(const char *text);
void screen_print_i64(int64_t value);
void screen_clear(uint32_t colour);
void screen_set_pixel(int32_t x, int32_t y, uint32_t colour);
void cpu_halt(void);
void cpu_wait_for_interrupt(void);

void blockos_console_putc(char value);
bool blockos_console_input_available(void);
uint8_t blockos_console_read_input(void);
void blockos_console_set_cursor(uint32_t x, uint32_t y);
uint32_t blockos_console_get_cursor_x(void);
uint32_t blockos_console_get_cursor_y(void);
void blockos_console_set_colours(uint8_t foreground, uint8_t background);
void blockos_console_write_hex(uint64_t value);
void blockos_console_draw_cell(uint32_t x, uint32_t y, char value, uint8_t colour);
uint32_t blockos_framebuffer_width(void);
uint32_t blockos_framebuffer_height(void);
uint32_t blockos_framebuffer_pitch(void);
uint32_t blockos_framebuffer_bpp(void);
void blockos_graphics_initialize(void);
void blockos_graphics_set_clip(uint32_t x, uint32_t y, uint32_t width, uint32_t height);
void blockos_graphics_clear_clip(void);
void blockos_graphics_fill_rectangle(uint32_t x, uint32_t y, uint32_t width, uint32_t height,
                                     uint32_t colour);
void blockos_graphics_draw_line(int32_t x0, int32_t y0, int32_t x1, int32_t y1, uint32_t colour);
void blockos_graphics_copy_region(uint32_t sx, uint32_t sy, uint32_t dx, uint32_t dy,
                                  uint32_t width, uint32_t height);
void blockos_graphics_save_region(uint32_t slot, uint32_t x, uint32_t y, uint32_t width,
                                  uint32_t height);
void blockos_graphics_restore_region(uint32_t slot, uint32_t x, uint32_t y);
void blockos_graphics_draw_fast_cursor(uint32_t x, uint32_t y);
void blockos_graphics_enable_backbuffer(bool enabled);
void blockos_graphics_present_rect(uint32_t x, uint32_t y, uint32_t width, uint32_t height);
void blockos_graphics_present(void);
void blockos_graphics_draw_sprite(uint32_t x, uint32_t y, const uint32_t *pixels, uint32_t width,
                                  uint32_t height, uint32_t transparent);
void blockos_graphics_draw_text(uint32_t x, uint32_t y, const char *text, uint32_t colour);
uint32_t blockos_graphics_text_width(const char *text);
uint32_t blockos_graphics_text_height(void);

#define ARRAY_COUNT(x) (sizeof(x) / sizeof((x)[0]))
static void text_copy(char *destination, size_t capacity, const char *source) {
    if (destination == NULL || capacity == 0u)
        return;
    size_t index = 0;
    if (source != NULL) {
        while (source[index] != '\0' && index + 1u < capacity) {
            destination[index] = source[index];
            ++index;
        }
    }
    destination[index] = '\0';
}

typedef struct {
    bool used;
    bool visible;
    uint64_t x;
    uint64_t y;
    uint64_t width;
    uint64_t height;
    char title[32];
} Window;
static Window windows[16];

static void draw_horizontal(uint64_t x, uint64_t y, uint64_t length, uint64_t colour,
                            char character) {
    for (uint64_t i = 0; i < length; ++i)
        screen_set_pixel((int32_t)(x + i), (int32_t)y, (uint32_t)colour);
    (void)character;
}

static void draw_vertical(uint64_t x, uint64_t y, uint64_t length, uint64_t colour,
                          char character) {
    for (uint64_t i = 0; i < length; ++i)
        screen_set_pixel((int32_t)x, (int32_t)(y + i), (uint32_t)colour);
    (void)character;
}

void blockos_ext_graphics_initialize_framebuffer(void) {
    blockos_graphics_initialize();
    screen_clear(0x000000u);
}
uint64_t blockos_ext_graphics_get_screen_width(void) { return blockos_framebuffer_width(); }
uint64_t blockos_ext_graphics_get_screen_height(void) { return blockos_framebuffer_height(); }
uint64_t blockos_ext_graphics_get_framebuffer_pitch(void) { return blockos_framebuffer_pitch(); }
uint64_t blockos_ext_graphics_get_framebuffer_bits_per_pixel(void) {
    return blockos_framebuffer_bpp();
}
void blockos_ext_graphics_draw_horizontal_line(uint64_t x, uint64_t y, uint64_t length,
                                               uint64_t colour) {
    blockos_graphics_fill_rectangle((uint32_t)x, (uint32_t)y, (uint32_t)length, 1u,
                                    (uint32_t)colour);
}
void blockos_ext_graphics_draw_vertical_line(uint64_t x, uint64_t y, uint64_t length,
                                             uint64_t colour) {
    blockos_graphics_fill_rectangle((uint32_t)x, (uint32_t)y, 1u, (uint32_t)length,
                                    (uint32_t)colour);
}
void blockos_ext_graphics_draw_rectangle_outline(uint64_t x, uint64_t y, uint64_t width,
                                                 uint64_t height, uint64_t colour) {
    if (width == 0u || height == 0u)
        return;
    blockos_graphics_fill_rectangle((uint32_t)x, (uint32_t)y, (uint32_t)width, 1u,
                                    (uint32_t)colour);
    blockos_graphics_fill_rectangle((uint32_t)x, (uint32_t)(y + height - 1u), (uint32_t)width, 1u,
                                    (uint32_t)colour);
    blockos_graphics_fill_rectangle((uint32_t)x, (uint32_t)y, 1u, (uint32_t)height,
                                    (uint32_t)colour);
    blockos_graphics_fill_rectangle((uint32_t)(x + width - 1u), (uint32_t)y, 1u, (uint32_t)height,
                                    (uint32_t)colour);
}
void blockos_ext_graphics_fill_rectangle(uint64_t x, uint64_t y, uint64_t width, uint64_t height,
                                         uint64_t colour) {
    blockos_graphics_fill_rectangle((uint32_t)x, (uint32_t)y, (uint32_t)width, (uint32_t)height,
                                    (uint32_t)colour);
}
void blockos_ext_graphics_draw_circle_outline(uint64_t cx, uint64_t cy, uint64_t radius_value,
                                              uint64_t colour) {
    int32_t radius = (int32_t)radius_value, x = radius, y = 0, error = 1 - radius;
    while (x >= y) {
        int32_t p[8][2] = {{x, y}, {y, x}, {-y, x}, {-x, y}, {-x, -y}, {-y, -x}, {y, -x}, {x, -y}};
        for (size_t i = 0; i < 8u; ++i)
            screen_set_pixel((int32_t)cx + p[i][0], (int32_t)cy + p[i][1], (uint32_t)colour);
        ++y;
        if (error < 0)
            error += 2 * y + 1;
        else {
            --x;
            error += 2 * (y - x + 1);
        }
    }
}
void blockos_ext_graphics_fill_circle(uint64_t cx, uint64_t cy, uint64_t radius_value,
                                      uint64_t colour) {
    int32_t radius = (int32_t)radius_value;
    for (int32_t y = -radius; y <= radius; ++y) {
        int32_t width = 0;
        while ((width + 1) * (width + 1) + y * y <= radius * radius)
            ++width;
        blockos_graphics_fill_rectangle((uint32_t)((int32_t)cx - width),
                                        (uint32_t)((int32_t)cy + y), (uint32_t)(width * 2 + 1), 1u,
                                        (uint32_t)colour);
    }
}
void blockos_ext_graphics_draw_bitmap(uint64_t x, uint64_t y, uint64_t address, uint64_t width,
                                      uint64_t height) {
    blockos_graphics_draw_sprite((uint32_t)x, (uint32_t)y, (const uint32_t *)(uintptr_t)address,
                                 (uint32_t)width, (uint32_t)height, 0xFFFFFFFFu);
}
void blockos_ext_graphics_swap_graphics_buffers(void) { blockos_graphics_present(); }
void blockos_ext_graphics_set_clipping_rectangle(uint64_t x, uint64_t y, uint64_t width,
                                                 uint64_t height) {
    blockos_graphics_set_clip((uint32_t)x, (uint32_t)y, (uint32_t)width, (uint32_t)height);
}
void blockos_ext_graphics_clear_clipping_rectangle(void) { blockos_graphics_clear_clip(); }
void blockos_ext_graphics_draw_pixel_line_fast(uint64_t x1, uint64_t y1, uint64_t x2, uint64_t y2,
                                               uint64_t colour) {
    blockos_graphics_draw_line((int32_t)x1, (int32_t)y1, (int32_t)x2, (int32_t)y2,
                               (uint32_t)colour);
}
void blockos_ext_graphics_save_screen_region(uint64_t slot, uint64_t x, uint64_t y, uint64_t width,
                                             uint64_t height) {
    blockos_graphics_save_region((uint32_t)slot, (uint32_t)x, (uint32_t)y, (uint32_t)width,
                                 (uint32_t)height);
}
void blockos_ext_graphics_restore_screen_region(uint64_t slot, uint64_t x, uint64_t y) {
    blockos_graphics_restore_region((uint32_t)slot, (uint32_t)x, (uint32_t)y);
}
void blockos_ext_graphics_copy_screen_region(uint64_t sx, uint64_t sy, uint64_t dx, uint64_t dy,
                                             uint64_t width, uint64_t height) {
    blockos_graphics_copy_region((uint32_t)sx, (uint32_t)sy, (uint32_t)dx, (uint32_t)dy,
                                 (uint32_t)width, (uint32_t)height);
}
void blockos_ext_graphics_draw_fast_mouse_cursor(uint64_t x, uint64_t y) {
    blockos_graphics_draw_fast_cursor((uint32_t)x, (uint32_t)y);
}
void blockos_ext_graphics_enable_back_buffer(bool enabled) {
    blockos_graphics_enable_backbuffer(enabled);
}
void blockos_ext_graphics_present_changed_rectangle(uint64_t x, uint64_t y, uint64_t width,
                                                    uint64_t height) {
    blockos_graphics_present_rect((uint32_t)x, (uint32_t)y, (uint32_t)width, (uint32_t)height);
}
void blockos_ext_graphics_present_full_frame(void) { blockos_graphics_present(); }
void blockos_ext_graphics_draw_transparent_sprite(uint64_t x, uint64_t y, uint64_t address,
                                                  uint64_t width, uint64_t height,
                                                  uint64_t transparent) {
    blockos_graphics_draw_sprite((uint32_t)x, (uint32_t)y, (const uint32_t *)(uintptr_t)address,
                                 (uint32_t)width, (uint32_t)height, (uint32_t)transparent);
}

void blockos_ext_text_and_windows_set_text_cursor_position(uint64_t arg0, uint64_t arg1) {
    blockos_console_set_cursor((uint32_t)arg0, (uint32_t)arg1);
}

uint64_t blockos_ext_text_and_windows_get_text_cursor_x(void) {
    return blockos_console_get_cursor_x();
}

uint64_t blockos_ext_text_and_windows_get_text_cursor_y(void) {
    return blockos_console_get_cursor_y();
}

void blockos_ext_text_and_windows_set_text_colours(uint64_t arg0, uint64_t arg1) {
    blockos_console_set_colours((uint8_t)arg0, (uint8_t)arg1);
}

void blockos_ext_text_and_windows_print_line(const char *arg0) {
    screen_print(arg0);
    screen_print("\n");
}

void blockos_ext_text_and_windows_print_hexadecimal_number(uint64_t arg0) {
    blockos_console_write_hex(arg0);
}

void blockos_ext_text_and_windows_draw_text_at_position(uint64_t x, uint64_t y, const char *text,
                                                        uint64_t colour) {
    blockos_graphics_draw_text((uint32_t)x, (uint32_t)y, text, (uint32_t)colour);
}
uint64_t blockos_ext_text_and_windows_measure_text_width(const char *text) {
    return blockos_graphics_text_width(text);
}
uint64_t blockos_ext_text_and_windows_measure_text_height(const char *text) {
    (void)text;
    return blockos_graphics_text_height();
}

uint64_t blockos_ext_text_and_windows_create_window(const char *arg0, uint64_t arg1, uint64_t arg2,
                                                    uint64_t arg3, uint64_t arg4) {
    for (size_t i = 1; i < ARRAY_COUNT(windows); ++i)
        if (!windows[i].used) {
            windows[i].used = true;
            windows[i].visible = true;
            windows[i].x = arg1;
            windows[i].y = arg2;
            windows[i].width = arg3;
            windows[i].height = arg4;
            text_copy(windows[i].title, sizeof(windows[i].title), arg0);
            return i;
        }
    return 0u;
}

void blockos_ext_text_and_windows_destroy_window(uint64_t arg0) {
    if (arg0 < ARRAY_COUNT(windows))
        windows[arg0].used = false;
}

void blockos_ext_text_and_windows_move_window(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    if (arg0 < ARRAY_COUNT(windows) && windows[arg0].used) {
        windows[arg0].x = arg1;
        windows[arg0].y = arg2;
    }
}

void blockos_ext_text_and_windows_resize_window(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    if (arg0 < ARRAY_COUNT(windows) && windows[arg0].used) {
        windows[arg0].width = arg1;
        windows[arg0].height = arg2;
    }
}

void blockos_ext_text_and_windows_show_window(uint64_t arg0) {
    if (arg0 < ARRAY_COUNT(windows) && windows[arg0].used) {
        Window *window = &windows[arg0];
        window->visible = true;
        if (window->width > 1u && window->height > 1u) {
            draw_horizontal(window->x, window->y, window->width, 15u, '-');
            draw_horizontal(window->x, window->y + window->height - 1u, window->width, 15u, '-');
            draw_vertical(window->x, window->y, window->height, 15u, '|');
            draw_vertical(window->x + window->width - 1u, window->y, window->height, 15u, '|');
            blockos_console_set_cursor((uint32_t)(window->x + 2u), (uint32_t)window->y);
            screen_print(window->title);
        }
    }
}

bool blockos_ext_text_and_windows_window_is_visible(uint64_t arg0) {
    return arg0 < ARRAY_COUNT(windows) && windows[arg0].used && windows[arg0].visible;
}

// Linux system services. Boot-stage and safe-mode values belong to the project.
static uint64_t project_status, boot_stage;
static bool safe_mode;
void blockos_ext_kernel_services_request_system_shutdown(void) { linux_shutdown(false); }
void blockos_ext_kernel_services_request_system_restart(void) { linux_shutdown(true); }
void blockos_ext_kernel_services_set_kernel_status_code(uint64_t value) { project_status = value; }
uint64_t blockos_ext_kernel_services_get_kernel_status_code(void) { return project_status; }
void blockos_ext_kernel_services_set_boot_stage(uint64_t value) { boot_stage = value; }
uint64_t blockos_ext_kernel_services_get_boot_stage(void) { return boot_stage; }
bool blockos_ext_kernel_services_safe_mode_enabled(void) { return safe_mode; }
void blockos_ext_kernel_services_set_safe_mode(bool value) { safe_mode = value; }
const char *blockos_ext_kernel_services_get_bootloader_name(void) { return "Linux boot protocol"; }
const char *blockos_ext_kernel_services_get_boot_command_line(void) {
    static char text[2048];
    linux_read_text("/proc/cmdline", text, sizeof(text));
    return text;
}
uint64_t blockos_ext_kernel_services_get_kernel_uptime_ticks(void) {
    return linux_monotonic_ns() / 1000000u;
}
void blockos_ext_kernel_services_set_system_hostname(const char *text) {
    linux_result(LINUX2(170, text, linux_strlen(text)));
}
struct linux_utsname {
    char system[65], node[65], release[65], version[65], machine[65], domain[65];
};
static struct linux_utsname system_info;
const char *blockos_ext_kernel_services_get_system_hostname(void) {
    linux_result(LINUX1(63, &system_info));
    return system_info.node;
}

const char *blockos_ext_cpu_get_cpu_vendor(void) {
    static union {
        uint32_t words[4];
        char text[16];
    } vendor;
    uint32_t a, b, c, d;
    __asm__ volatile("cpuid" : "=a"(a), "=b"(b), "=c"(c), "=d"(d) : "a"(0u), "c"(0u));
    vendor.words[0] = b;
    vendor.words[1] = d;
    vendor.words[2] = c;
    vendor.words[3] = 0;
    return vendor.text;
}
const char *blockos_ext_cpu_get_cpu_brand(void) {
    static union {
        uint32_t words[13];
        char text[52];
    } brand;
    uint32_t a, b, c, d;
    __asm__ volatile("cpuid" : "=a"(a), "=b"(b), "=c"(c), "=d"(d) : "a"(0x80000000u), "c"(0u));
    if (a < 0x80000004u)
        return blockos_ext_cpu_get_cpu_vendor();
    for (uint32_t i = 0; i < 3; ++i)
        __asm__ volatile("cpuid"
                         : "=a"(brand.words[i * 4]), "=b"(brand.words[i * 4 + 1]),
                           "=c"(brand.words[i * 4 + 2]), "=d"(brand.words[i * 4 + 3])
                         : "a"(0x80000002u + i), "c"(0u));
    return brand.text;
}
uint64_t blockos_ext_cpu_get_logical_processor_count(void) {
    uint64_t mask[16] = {0}, count = 0;
    long bytes = linux_result(LINUX3(204, 0, sizeof(mask), mask));
    if (bytes < 0)
        return 0;
    for (size_t i = 0; i < sizeof(mask) / sizeof(mask[0]); ++i) {
        uint64_t bits = mask[i];
        while (bits) {
            count += bits & 1;
            bits >>= 1;
        }
    }
    return count;
}
uint64_t blockos_ext_cpu_get_current_cpu_number(void) {
    uint32_t cpu = 0;
    linux_result(LINUX3(309, &cpu, 0, 0));
    return cpu;
}
uint64_t blockos_ext_cpu_read_timestamp_counter(void) {
    uint32_t lo, hi;
    __asm__ volatile("rdtsc" : "=a"(lo), "=d"(hi));
    return ((uint64_t)hi << 32) | lo;
}
void blockos_ext_cpu_pause_cpu_briefly(void) { linux_result(LINUX0(24)); }
void blockos_ext_cpu_execute_cpu_memory_fence(void) { __asm__ volatile("mfence" ::: "memory"); }

// Allocations use anonymous Linux mappings and retain sizes for resize/free.
typedef struct {
    void *address;
    size_t size;
} Allocation;
static Allocation allocations[256];
static Allocation *allocation(uint64_t address) {
    for (size_t i = 0; i < ARRAY_COUNT(allocations); ++i)
        if (address && allocations[i].address == (void *)(uintptr_t)address)
            return &allocations[i];
    return NULL;
}
uint64_t blockos_ext_kernel_heap_allocate_heap_bytes(uint64_t size) {
    if (!size || size > 0x40000000u) {
        linux_set_error(22);
        return 0;
    }
    for (size_t i = 0; i < ARRAY_COUNT(allocations); ++i)
        if (!allocations[i].address) {
            void *address = linux_map(size);
            if (!address)
                return 0;
            allocations[i] = (Allocation){address, size};
            return (uint64_t)(uintptr_t)address;
        }
    linux_set_error(12);
    return 0;
}
uint64_t blockos_ext_kernel_heap_allocate_zeroed_items(uint64_t count, uint64_t size) {
    if (size && count > 0x40000000u / size) {
        linux_set_error(12);
        return 0;
    }
    return blockos_ext_kernel_heap_allocate_heap_bytes(count * size);
}
void blockos_ext_kernel_heap_free_heap_allocation(uint64_t address) {
    Allocation *entry = allocation(address);
    if (!entry) {
        if (address)
            linux_set_error(22);
        return;
    }
    linux_unmap(entry->address, entry->size);
    entry->address = NULL;
}
uint64_t blockos_ext_kernel_heap_get_allocation_size(uint64_t address) {
    Allocation *entry = allocation(address);
    return entry ? entry->size : 0;
}
uint64_t blockos_ext_kernel_heap_resize_heap_allocation(uint64_t address, uint64_t size) {
    if (!address)
        return blockos_ext_kernel_heap_allocate_heap_bytes(size);
    Allocation *entry = allocation(address);
    if (!entry) {
        linux_set_error(22);
        return 0;
    }
    if (!size) {
        blockos_ext_kernel_heap_free_heap_allocation(address);
        return 0;
    }
    uint64_t result = blockos_ext_kernel_heap_allocate_heap_bytes(size);
    if (!result)
        return 0;
    uint8_t *target = (uint8_t *)(uintptr_t)result;
    const uint8_t *source = entry->address;
    for (size_t i = 0; i < size && i < entry->size; ++i)
        target[i] = source[i];
    blockos_ext_kernel_heap_free_heap_allocation(address);
    return result;
}
uint64_t blockos_ext_kernel_heap_get_heap_bytes_used(void) {
    uint64_t used = 0;
    for (size_t i = 0; i < ARRAY_COUNT(allocations); ++i)
        if (allocations[i].address)
            used += allocations[i].size;
    return used;
}
bool blockos_ext_kernel_heap_validate_kernel_heap(void) {
    for (size_t i = 0; i < ARRAY_COUNT(allocations); ++i)
        if (allocations[i].address && !allocations[i].size)
            return false;
    return true;
}
void blockos_ext_kernel_heap_dump_kernel_heap(void) {
    screen_print("[Linux mmap] bytes allocated: ");
    screen_print_i64(blockos_ext_kernel_heap_get_heap_bytes_used());
    screen_print("\n");
}

// Directory enumeration uses getdents64, excludes . and .., and checks records.
static bool text_equal(const char *a, const char *b) {
    if (!a || !b)
        return a == b;
    while (*a && *a == *b) {
        ++a;
        ++b;
    }
    return *a == *b;
}
static uint64_t directory_entries(const char *path, uint64_t index, char *name, size_t capacity,
                                  bool numeric_only) {
    long fd = linux_result(LINUX3(2, path, 0x10000, 0));
    if (fd < 0)
        return 0;
    char buffer[4096] __attribute__((aligned(8)));
    uint64_t count = 0;
    long bytes;
    while ((bytes = linux_result(LINUX3(217, fd, buffer, sizeof(buffer)))) > 0) {
        for (long offset = 0; offset < bytes;) {
            struct entry {
                uint64_t inode;
                int64_t next;
                uint16_t size;
                uint8_t type;
                char name[];
            };
            struct entry *entry = (struct entry *)(buffer + offset);
            if (entry->size < 20 || offset + entry->size > bytes) {
                linux_set_error(5);
                LINUX1(3, fd);
                return count;
            }
            bool include = !text_equal(entry->name, ".") && !text_equal(entry->name, "..");
            if (numeric_only)
                for (const char *p = entry->name; *p; ++p)
                    if (*p < '0' || *p > '9')
                        include = false;
            if (include) {
                if (name && count == index)
                    text_copy(name, capacity, entry->name);
                ++count;
            }
            offset += entry->size;
        }
    }
    LINUX1(3, fd);
    return count;
}
uint64_t blockos_ext_filesystems_mount_filesystem(const char *device, const char *path,
                                                  const char *type) {
    return linux_result(LINUX5(165, device, path, type, 0, 0)) == 0;
}
void blockos_ext_filesystems_unmount_filesystem(const char *path) {
    linux_result(LINUX2(166, path, 0));
}
bool blockos_ext_filesystems_filesystem_is_mounted(const char *path) {
    static char mounts[16384];
    linux_read_text("/proc/mounts", mounts, sizeof(mounts));
    for (char *p = mounts; *p;) {
        while (*p && *p != ' ')
            ++p;
        if (!*p)
            break;
        char *start = ++p;
        while (*p && *p != ' ')
            ++p;
        char end = *p;
        *p = 0;
        bool match = text_equal(start, path);
        *p = end;
        if (match)
            return true;
        while (*p && *p != '\n')
            ++p;
        if (*p)
            ++p;
    }
    return false;
}
uint64_t blockos_ext_filesystems_open_file(const char *path, uint64_t flags) {
    return (uint64_t)linux_result(LINUX3(2, path, flags, 0644));
}
void blockos_ext_filesystems_close_file(uint64_t fd) { linux_result(LINUX1(3, fd)); }
uint64_t blockos_ext_filesystems_read_file_bytes(uint64_t fd, uint64_t buffer, uint64_t size) {
    return (uint64_t)linux_result(LINUX3(0, fd, buffer, size));
}
uint64_t blockos_ext_filesystems_write_file_bytes(uint64_t fd, uint64_t buffer, uint64_t size) {
    return (uint64_t)linux_result(LINUX3(1, fd, buffer, size));
}
uint64_t blockos_ext_filesystems_seek_file(uint64_t fd, uint64_t offset, uint64_t mode) {
    return (uint64_t)linux_result(LINUX3(8, fd, offset, mode));
}
uint64_t blockos_ext_filesystems_get_file_size(const char *path) {
    long fd = linux_result(LINUX3(2, path, 0, 0));
    if (fd < 0)
        return 0;
    long size = linux_result(LINUX3(8, fd, 0, 2));
    LINUX1(3, fd);
    return size < 0 ? 0 : (uint64_t)size;
}
bool blockos_ext_filesystems_file_exists(const char *path) { return LINUX2(21, path, 0) == 0; }
void blockos_ext_filesystems_create_directory(const char *path) {
    linux_result(LINUX2(83, path, 0755));
}
void blockos_ext_filesystems_remove_file(const char *path) { linux_result(LINUX1(87, path)); }
uint64_t blockos_ext_filesystems_get_directory_entry_count(const char *path) {
    return directory_entries(path, 0, NULL, 0, false);
}
const char *blockos_ext_filesystems_get_directory_entry_name(const char *path, uint64_t index) {
    static char name[256];
    name[0] = 0;
    directory_entries(path, index, name, sizeof(name), false);
    return name;
}
void blockos_ext_filesystems_sync_all_filesystems(void) { linux_result(LINUX0(162)); }

// Process handles are real Linux PIDs. A create block forks a function address.
static struct {
    uint64_t pid, code;
} exited[64];
static size_t next_exit;
static void process_path(char *buffer, size_t capacity, uint64_t pid, const char *file) {
    char digits[24];
    size_t count = 0, pos = 0;
    do {
        digits[count++] = (char)('0' + pid % 10);
        pid /= 10;
    } while (pid);
    const char *prefix = "/proc/";
    while (*prefix && pos + 1 < capacity)
        buffer[pos++] = *prefix++;
    while (count && pos + 1 < capacity)
        buffer[pos++] = digits[--count];
    if (pos + 1 < capacity)
        buffer[pos++] = '/';
    while (*file && pos + 1 < capacity)
        buffer[pos++] = *file++;
    buffer[pos] = 0;
}
uint64_t blockos_ext_processes_create_process(const char *name, uint64_t entry) {
    if (!entry) {
        linux_set_error(22);
        return 0;
    }
    long pid = linux_result(LINUX0(57));
    if (pid == 0) {
        LINUX2(157, 15, name);
        ((void (*)(void))(uintptr_t)entry)();
        LINUX1(60, 0);
    }
    return pid < 0 ? 0 : (uint64_t)pid;
}
void blockos_ext_processes_terminate_process(uint64_t pid, uint64_t code) {
    if (pid == (uint64_t)LINUX0(39))
        LINUX1(60, code);
    else
        linux_result(LINUX2(62, pid, 15));
}
uint64_t blockos_ext_processes_get_current_process_id(void) { return (uint64_t)LINUX0(39); }
bool blockos_ext_processes_process_exists(uint64_t pid) { return LINUX2(62, pid, 0) == 0; }
void blockos_ext_processes_set_process_name(uint64_t pid, const char *name) {
    if (pid == (uint64_t)LINUX0(39))
        linux_result(LINUX2(157, 15, name));
    else
        linux_set_error(1);
}
const char *blockos_ext_processes_get_process_name(uint64_t pid) {
    static char name[64];
    char path[64];
    process_path(path, sizeof(path), pid, "comm");
    size_t size = linux_read_text(path, name, sizeof(name));
    if (size && name[size - 1] == '\n')
        name[size - 1] = 0;
    return name;
}
void blockos_ext_processes_set_process_priority(uint64_t pid, uint64_t priority) {
    linux_result(LINUX3(141, 0, pid, (int64_t)priority));
}
uint64_t blockos_ext_processes_get_process_priority(uint64_t pid) {
    long result = linux_result(LINUX2(140, 0, pid));
    return result < 0 ? 0 : (uint64_t)(20 - result);
}
void blockos_ext_processes_suspend_process(uint64_t pid) { linux_result(LINUX2(62, pid, 19)); }
void blockos_ext_processes_resume_process(uint64_t pid) { linux_result(LINUX2(62, pid, 18)); }
bool blockos_ext_processes_process_is_suspended(uint64_t pid) {
    char path[64], state[512];
    process_path(path, sizeof(path), pid, "status");
    linux_read_text(path, state, sizeof(state));
    for (char *p = state; *p; ++p)
        if (p[0] == 'S' && p[1] == 't' && p[2] == 'a' && p[3] == 't' && p[4] == 'e' &&
            p[5] == ':') {
            p += 6;
            while (*p == ' ' || *p == '\t')
                ++p;
            return *p == 'T' || *p == 't';
        }
    return false;
}
uint64_t blockos_ext_processes_wait_for_process(uint64_t pid) {
    int status = 0;
    long result;
    do {
        result = LINUX4(61, pid, &status, 0, 0);
    } while (result == -4);
    if (linux_result(result) < 0)
        return (uint64_t)-1;
    uint64_t code = (status & 127) ? 128 + (status & 127) : (status >> 8) & 255;
    exited[next_exit++ % 64] = (typeof(exited[0])){pid, code};
    return code;
}
uint64_t blockos_ext_processes_get_process_exit_code(uint64_t pid) {
    for (size_t i = 0; i < 64; ++i)
        if (exited[i].pid == pid)
            return exited[i].code;
    linux_set_error(10);
    return (uint64_t)-1;
}
uint64_t blockos_ext_processes_get_process_count(void) {
    return directory_entries("/proc", 0, NULL, 0, true);
}
void blockos_ext_processes_send_process_signal(uint64_t pid, uint64_t signal) {
    linux_result(LINUX2(62, pid, signal));
}

uint64_t blockos_ext_timers_and_clock_get_timer_frequency(void) { return 1000; }
uint64_t blockos_ext_timers_and_clock_get_monotonic_ticks(void) {
    return linux_monotonic_ns() / 1000000u;
}
uint64_t blockos_ext_timers_and_clock_convert_ticks_to_milliseconds(uint64_t ticks) {
    return ticks;
}
uint64_t blockos_ext_timers_and_clock_convert_milliseconds_to_ticks(uint64_t ms) { return ms; }
void blockos_ext_timers_and_clock_sleep_milliseconds(uint64_t ms) { linux_sleep_ms(ms); }
void blockos_ext_timers_and_clock_set_wall_clock_seconds(uint64_t seconds) {
    struct linux_timespec time = {(int64_t)seconds, 0};
    linux_result(LINUX2(227, 0, &time));
}
uint64_t blockos_ext_timers_and_clock_get_wall_clock_seconds(void) {
    struct linux_timespec time = {0, 0};
    linux_result(LINUX2(228, 0, &time));
    return time.seconds;
}
uint64_t blockos_ext_timers_and_clock_get_monotonic_nanoseconds(void) {
    return linux_monotonic_ns();
}

void blockos_ext_keyboard_and_mouse_initialize_keyboard(
    void) { /* Linux tty initialized before the program. */ }
bool blockos_ext_keyboard_and_mouse_keyboard_key_available(void) {
    return blockos_console_input_available();
}
uint64_t blockos_ext_keyboard_and_mouse_read_keyboard_key_code(void) {
    return blockos_console_read_input();
}
uint64_t blockos_ext_keyboard_and_mouse_read_keyboard_character(void) {
    return blockos_console_read_input();
}
void blockos_ext_keyboard_and_mouse_clear_input_queue(void) {
    while (blockos_console_input_available())
        blockos_console_read_input();
}

// UDP sockets use Linux networking; loopback works without an emulated NIC.
struct sockaddr_in {
    uint16_t family, port;
    uint32_t address;
    uint8_t padding[8];
};
static uint16_t network16(uint64_t value) {
    return (uint16_t)(((value & 255) << 8) | ((value >> 8) & 255));
}
static uint32_t network32(uint64_t value) {
    return ((value & 255) << 24) | ((value & 0xff00) << 8) | ((value >> 8) & 0xff00) |
           ((value >> 24) & 255);
}
void blockos_ext_networking_initialize_network_stack(void) {
    long fd = LINUX3(41, 2, 2, 0);
    if (fd < 0) {
        linux_result(fd);
        return;
    }
    struct {
        char name[16];
        uint16_t flags;
        uint8_t rest[22];
    } request = {{'l', 'o', 0}, 0, {0}};
    if (LINUX3(16, fd, 0x8913, &request) == 0) {
        request.flags |= 1;
        linux_result(LINUX3(16, fd, 0x8914, &request));
    }
    LINUX1(3, fd);
}
uint64_t blockos_ext_networking_get_network_interface_count(void) {
    return directory_entries("/sys/class/net", 0, NULL, 0, false);
}
uint64_t blockos_ext_networking_open_udp_socket(uint64_t port) {
    long fd = linux_result(LINUX3(41, 2, 2 | 0x800, 0));
    if (fd < 0)
        return (uint64_t)-1;
    struct sockaddr_in address = {2, network16(port), 0, {0}};
    if (linux_result(LINUX3(49, fd, &address, sizeof(address))) < 0) {
        LINUX1(3, fd);
        return (uint64_t)-1;
    }
    return fd;
}
uint64_t blockos_ext_networking_send_udp_packet(uint64_t fd, uint64_t ip, uint64_t port,
                                                uint64_t buffer, uint64_t length) {
    struct sockaddr_in address = {2, network16(port), network32(ip), {0}};
    return (uint64_t)linux_result(
        linux_call(44, fd, buffer, length, 0, (long)&address, sizeof(address)));
}
uint64_t blockos_ext_networking_receive_udp_packet(uint64_t fd, uint64_t buffer, uint64_t size) {
    return (uint64_t)linux_result(linux_call(45, fd, buffer, size, 0, 0, 0));
}
void blockos_ext_networking_close_network_socket(uint64_t fd) { linux_result(LINUX1(3, fd)); }

static uint64_t debug_level;
void blockos_ext_debug_and_information_write_debug_text(const char *text) {
    screen_print("[debug] ");
    screen_print(text);
    screen_print("\n");
}
void blockos_ext_debug_and_information_write_debug_number(uint64_t value) {
    screen_print("[debug] ");
    screen_print_i64(value);
    screen_print("\n");
}
void blockos_ext_debug_and_information_set_debug_log_level(uint64_t level) { debug_level = level; }
uint64_t blockos_ext_debug_and_information_get_debug_log_level(void) { return debug_level; }
void blockos_ext_debug_and_information_begin_trace_event(const char *name) {
    screen_print("[trace begin] ");
    screen_print(name);
    screen_print("\n");
}
void blockos_ext_debug_and_information_end_trace_event(const char *name) {
    screen_print("[trace end] ");
    screen_print(name);
    screen_print("\n");
}
void blockos_ext_debug_and_information_assert_condition(bool condition, const char *message) {
    if (!condition) {
        linux_set_error(22);
        blockos_ext_debug_and_information_write_debug_text(message);
    }
}
uint64_t blockos_ext_debug_and_information_get_last_error_code(void) { return linux_get_error(); }
void blockos_ext_debug_and_information_clear_last_error(void) { linux_set_error(0); }
const char *blockos_ext_debug_and_information_get_architecture_name(void) {
    linux_result(LINUX1(63, &system_info));
    return system_info.machine;
}
const char *blockos_ext_debug_and_information_get_compiler_name(void) {
    return "Clang Linux x86_64";
}
const char *blockos_ext_debug_and_information_get_runtime_version(void) {
    linux_result(LINUX1(63, &system_info));
    return system_info.release;
}
void blockos_ext_debug_and_information_dump_system_state(void) {
    screen_print("[Linux] ");
    screen_print(blockos_ext_debug_and_information_get_runtime_version());
    screen_print(" hostname=");
    screen_print(blockos_ext_kernel_services_get_system_hostname());
    screen_print("\n");
}
