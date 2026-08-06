#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

/*
 * BlockOS capability runtime.
 *
 * Hardware-independent services are real in-memory kernel implementations.
 * Hardware that QEMU does not expose to this tiny starter kernel is represented
 * by deterministic virtual devices, so every visual block has useful behaviour
 * without claiming that a full production driver exists.
 */

void screen_print(const char *text);
void screen_print_i64(int64_t value);
void screen_clear(uint32_t colour);
void screen_set_pixel(int32_t x, int32_t y, uint32_t colour);
void cpu_halt(void);
void cpu_wait_for_interrupt(void);
uint8_t port_read8(uint16_t port);
void port_write8(uint16_t port, uint8_t value);

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
void blockos_graphics_fill_rectangle(uint32_t x, uint32_t y, uint32_t width, uint32_t height, uint32_t colour);
void blockos_graphics_draw_line(int32_t x0, int32_t y0, int32_t x1, int32_t y1, uint32_t colour);
void blockos_graphics_copy_region(uint32_t sx, uint32_t sy, uint32_t dx, uint32_t dy, uint32_t width, uint32_t height);
void blockos_graphics_save_region(uint32_t slot, uint32_t x, uint32_t y, uint32_t width, uint32_t height);
void blockos_graphics_restore_region(uint32_t slot, uint32_t x, uint32_t y);
void blockos_graphics_draw_fast_cursor(uint32_t x, uint32_t y);
void blockos_graphics_enable_backbuffer(bool enabled);
void blockos_graphics_present_rect(uint32_t x, uint32_t y, uint32_t width, uint32_t height);
void blockos_graphics_present(void);
void blockos_graphics_draw_sprite(uint32_t x, uint32_t y, const uint32_t *pixels, uint32_t width, uint32_t height, uint32_t transparent);
void blockos_graphics_draw_text(uint32_t x, uint32_t y, const char *text, uint32_t colour);
uint32_t blockos_graphics_text_width(const char *text);
uint32_t blockos_graphics_text_height(void);

#define ARRAY_COUNT(x) (sizeof(x) / sizeof((x)[0]))
#define PAGE_SIZE 4096u
#define PHYSICAL_POOL_PAGES 512u
#define HEAP_BYTES (256u * 1024u)
#define RAM_DISK_BYTES (512u * 1024u)
#define MAX_MAPS 128u
#define MAX_OBJECTS 32u
#define MAX_FILES 24u
#define MAX_FILE_BYTES 4096u
#define MAX_PACKET_BYTES 1536u

static uint64_t last_error;
static uint64_t generic_state[300];

static size_t text_length(const char *text) {
    size_t length = 0;
    if (text == NULL) return 0;
    while (text[length] != '\0') ++length;
    return length;
}

static bool text_equal(const char *left, const char *right) {
    if (left == NULL || right == NULL) return left == right;
    while (*left != '\0' && *right != '\0') {
        if (*left++ != *right++) return false;
    }
    return *left == *right;
}

static void text_copy(char *destination, size_t capacity, const char *source) {
    if (destination == NULL || capacity == 0u) return;
    size_t index = 0;
    if (source != NULL) {
        while (source[index] != '\0' && index + 1u < capacity) {
            destination[index] = source[index];
            ++index;
        }
    }
    destination[index] = '\0';
}

static void bytes_zero(void *destination, size_t length) {
    uint8_t *output = (uint8_t *)destination;
    if (output == NULL) return;
    for (size_t i = 0; i < length; ++i) output[i] = 0u;
}

static void bytes_copy(void *destination, const void *source, size_t length) {
    uint8_t *output = (uint8_t *)destination;
    const uint8_t *input = (const uint8_t *)source;
    if (output == NULL || input == NULL || output == input) return;
    if (output < input) {
        for (size_t i = 0; i < length; ++i) output[i] = input[i];
    } else {
        for (size_t i = length; i > 0u; --i) output[i - 1u] = input[i - 1u];
    }
}

static uint64_t read_tsc(void) {
    uint32_t low;
    uint32_t high;
    __asm__ volatile("rdtsc" : "=a"(low), "=d"(high));
    return ((uint64_t)high << 32u) | low;
}

static void model_message(const char *group, const char *action) {
    screen_print("[BlockOS] ");
    screen_print(group);
    screen_print(": ");
    screen_print(action);
    screen_print("\n");
}

/* Kernel service state. */
static uint64_t kernel_status_code;
static uint64_t boot_stage;
static bool safe_mode;
static char panic_message[96] = "Kernel panic";
static char hostname[64] = "blockos";

/* Interrupt model. */
static uint64_t interrupt_handlers[256];
static uint64_t interrupt_counts[256];
static uint8_t interrupt_priorities[256];
static bool interrupt_vectors_used[256];
static uint16_t irq_mask = 0xFFFFu;
static uint64_t last_interrupt_vector;
static bool nmi_enabled = true;

/* Physical page allocator. */
static uint8_t physical_pool[PHYSICAL_POOL_PAGES * PAGE_SIZE] __attribute__((aligned(PAGE_SIZE)));
static bool physical_page_used[PHYSICAL_POOL_PAGES];

/* Virtual mapping model. */
typedef struct {
    bool used;
    uint64_t space;
    uint64_t virtual_address;
    uint64_t physical_address;
    uint64_t flags;
} VirtualMap;
static VirtualMap virtual_maps[MAX_MAPS];
static uint64_t next_address_space = 2u;
static uint64_t current_address_space = 1u;

/* Heap model. */
typedef struct {
    bool used;
    uintptr_t address;
    uint32_t size;
} HeapAllocation;
static uint8_t heap_storage[HEAP_BYTES] __attribute__((aligned(16)));
static HeapAllocation heap_allocations[64];
static uint32_t heap_offset;
static uint32_t heap_limit = HEAP_BYTES;

typedef struct {
    bool used;
    uint32_t item_size;
    uint32_t item_count;
    uintptr_t base;
    uint32_t next_item;
} MemoryPool;
static MemoryPool memory_pools[16];

/* Processes and threads are cooperative metadata models. */
typedef struct {
    bool used;
    bool suspended;
    uint64_t id;
    uint64_t priority;
    uint64_t exit_code;
    uint64_t entry;
    char name[32];
} Process;
static Process processes[MAX_OBJECTS];
static uint64_t next_process_id = 2u;
static uint64_t current_process_id = 1u;

typedef struct {
    bool used;
    bool suspended;
    uint64_t id;
    uint64_t priority;
    uint64_t affinity;
    uint64_t state;
    uint64_t exit_code;
    uint64_t entry;
    uint64_t argument;
} Thread;
static Thread threads[MAX_OBJECTS];
static uint64_t next_thread_id = 2u;
static uint64_t current_thread_id = 1u;

/* Synchronisation objects. */
typedef struct { bool used; bool locked; uint64_t value; } SyncObject;
static SyncObject mutexes[MAX_OBJECTS];
static SyncObject semaphores[MAX_OBJECTS];
static SyncObject spinlocks[MAX_OBJECTS];
static SyncObject events[MAX_OBJECTS];

/* Timers. */
typedef struct {
    bool used;
    bool repeating;
    uint64_t id;
    uint64_t deadline;
    uint64_t period;
    uint64_t callback;
} Timer;
static Timer timers[MAX_OBJECTS];
static uint64_t timer_frequency = 1000u;
static uint64_t timer_epoch;
static uint64_t wall_clock_seconds;
static uint64_t next_timer_id = 1u;

/* Input model. */
static bool keyboard_initialized;
static bool mouse_initialized;
static int32_t mouse_x;
static int32_t mouse_y;
static uint64_t mouse_buttons;
static int32_t mouse_scroll;
static bool mouse_cursor_visible = true;
static bool key_state[256];

/* Graphics and windows. The starter uses an 80x25 text-backed display. */
static uint64_t clip_x;
static uint64_t clip_y;
static uint64_t clip_width = 80u;
static uint64_t clip_height = 25u;
static bool clipping_enabled;

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

/* RAM disk and tiny flat in-memory filesystem. */
static uint8_t ram_disk[RAM_DISK_BYTES];

typedef struct {
    bool used;
    bool directory;
    bool open;
    char path[64];
    uint8_t data[MAX_FILE_BYTES];
    uint32_t size;
    uint32_t position;
} FileEntry;
static FileEntry files[MAX_FILES];
static bool filesystem_mounted;

/* PCI model populated by real PCI configuration-space scans. */
typedef struct {
    uint8_t bus;
    uint8_t slot;
    uint8_t function;
    uint16_t vendor;
    uint16_t device;
    uint32_t class_code;
} PciDevice;
static PciDevice pci_devices[64];
static uint32_t pci_device_count;

/* USB, network, and audio state. */
typedef struct { bool used; bool cancelled; uint64_t bytes; } Transfer;
static Transfer usb_transfers[MAX_OBJECTS];
static bool usb_initialized;
static uint64_t next_transfer_id = 1u;

typedef struct {
    bool used;
    uint64_t port;
} UdpSocket;
static UdpSocket udp_sockets[16];
static bool network_initialized;
static bool network_up;
static uint64_t ipv4_address;
static uint64_t ipv4_mask;
static uint64_t ipv4_gateway;
static uint8_t network_packet[MAX_PACKET_BYTES];
static uint32_t network_packet_size;

static bool audio_initialized;
static uint64_t master_volume = 75u;
static bool audio_muted;
static uint64_t audio_sample_rate = 44100u;
static uint64_t audio_playback_position;
static bool audio_paused;
static uint64_t debug_log_level = 1u;

static Process *find_process(uint64_t id) {
    for (size_t i = 0; i < ARRAY_COUNT(processes); ++i) if (processes[i].used && processes[i].id == id) return &processes[i];
    return NULL;
}

static Thread *find_thread(uint64_t id) {
    for (size_t i = 0; i < ARRAY_COUNT(threads); ++i) if (threads[i].used && threads[i].id == id) return &threads[i];
    return NULL;
}

static uint64_t create_sync(SyncObject *objects, size_t count, uint64_t value) {
    for (size_t i = 1; i < count; ++i) {
        if (!objects[i].used) {
            objects[i].used = true;
            objects[i].locked = false;
            objects[i].value = value;
            return i;
        }
    }
    last_error = 1u;
    return 0u;
}

static FileEntry *find_file(const char *path) {
    for (size_t i = 0; i < ARRAY_COUNT(files); ++i) if (files[i].used && text_equal(files[i].path, path)) return &files[i];
    return NULL;
}

static FileEntry *file_from_handle(uint64_t handle) {
    if (handle == 0u || handle > ARRAY_COUNT(files)) return NULL;
    FileEntry *file = &files[handle - 1u];
    return file->used ? file : NULL;
}

static uint32_t pci_config_address(uint8_t bus, uint8_t slot, uint8_t function, uint8_t offset) {
    return 0x80000000u | ((uint32_t)bus << 16u) | ((uint32_t)slot << 11u) | ((uint32_t)function << 8u) | (offset & 0xFCu);
}

static uint32_t pci_read32_raw(uint8_t bus, uint8_t slot, uint8_t function, uint8_t offset) {
    uint32_t address = pci_config_address(bus, slot, function, offset);
    port_write8(0xCF8u, (uint8_t)address);
    port_write8(0xCF9u, (uint8_t)(address >> 8u));
    port_write8(0xCFAu, (uint8_t)(address >> 16u));
    port_write8(0xCFBu, (uint8_t)(address >> 24u));
    uint32_t value = port_read8(0xCFCu);
    value |= (uint32_t)port_read8(0xCFDu) << 8u;
    value |= (uint32_t)port_read8(0xCFEu) << 16u;
    value |= (uint32_t)port_read8(0xCFFu) << 24u;
    return value;
}

static void pci_write32_raw(uint8_t bus, uint8_t slot, uint8_t function, uint8_t offset, uint32_t value) {
    uint32_t address = pci_config_address(bus, slot, function, offset);
    port_write8(0xCF8u, (uint8_t)address);
    port_write8(0xCF9u, (uint8_t)(address >> 8u));
    port_write8(0xCFAu, (uint8_t)(address >> 16u));
    port_write8(0xCFBu, (uint8_t)(address >> 24u));
    port_write8(0xCFCu, (uint8_t)value);
    port_write8(0xCFDu, (uint8_t)(value >> 8u));
    port_write8(0xCFEu, (uint8_t)(value >> 16u));
    port_write8(0xCFFu, (uint8_t)(value >> 24u));
}

static void draw_horizontal(uint64_t x, uint64_t y, uint64_t length, uint64_t colour, char character) {
    for (uint64_t i = 0; i < length; ++i) screen_set_pixel((int32_t)(x + i), (int32_t)y, (uint32_t)colour);
    (void)character;
}

static void draw_vertical(uint64_t x, uint64_t y, uint64_t length, uint64_t colour, char character) {
    for (uint64_t i = 0; i < length; ++i) screen_set_pixel((int32_t)x, (int32_t)(y + i), (uint32_t)colour);
    (void)character;
}

static void initialize_models_once(void) {
    if (!processes[0].used) {
        processes[0].used = true;
        processes[0].id = 1u;
        processes[0].priority = 5u;
        text_copy(processes[0].name, sizeof(processes[0].name), "kernel");
    }
    if (!threads[0].used) {
        threads[0].used = true;
        threads[0].id = 1u;
        threads[0].priority = 5u;
        threads[0].state = 1u;
    }
    if (timer_epoch == 0u) timer_epoch = read_tsc();
    if (!files[0].used) {
        files[0].used = true;
        files[0].directory = true;
        text_copy(files[0].path, sizeof(files[0].path), "/");
    }
}

void blockos_ext_kernel_services_request_system_shutdown(void) {
    initialize_models_once();
    model_message("Kernel", "shutdown requested");
    port_write8(0x604u, 0x00u);
    kernel_status_code = 0u;
}

void blockos_ext_kernel_services_request_system_restart(void) {
    initialize_models_once();
    model_message("Kernel", "restart requested");
    port_write8(0x64u, 0xFEu);
}

void blockos_ext_kernel_services_set_kernel_status_code(uint64_t arg0) {
    initialize_models_once();
    kernel_status_code = arg0;
}

uint64_t blockos_ext_kernel_services_get_kernel_status_code(void) {
    initialize_models_once();
    return kernel_status_code;
}

void blockos_ext_kernel_services_set_boot_stage(uint64_t arg0) {
    initialize_models_once();
    boot_stage = arg0;
}

uint64_t blockos_ext_kernel_services_get_boot_stage(void) {
    initialize_models_once();
    return boot_stage;
}

void blockos_ext_kernel_services_register_panic_message(const char * arg0) {
    initialize_models_once();
    text_copy(panic_message, sizeof(panic_message), arg0);
}

void blockos_ext_kernel_services_trigger_kernel_panic(const char * arg0) {
    initialize_models_once();
    screen_print("\n*** KERNEL PANIC ***\n");
    screen_print(arg0 != NULL && *arg0 != '\0' ? arg0 : panic_message);
    screen_print("\n");
    kernel_status_code = 0xDEADu;
    for (;;) __asm__ volatile("cli; hlt");
}

bool blockos_ext_kernel_services_safe_mode_enabled(void) {
    initialize_models_once();
    return safe_mode;
}

void blockos_ext_kernel_services_set_safe_mode(bool arg0) {
    initialize_models_once();
    safe_mode = arg0;
}

const char * blockos_ext_kernel_services_get_bootloader_name(void) {
    initialize_models_once();
    return "QEMU Multiboot";
}

const char * blockos_ext_kernel_services_get_boot_command_line(void) {
    initialize_models_once();
    return "blockos";
}

uint64_t blockos_ext_kernel_services_get_kernel_uptime_ticks(void) {
    initialize_models_once();
    return read_tsc() - timer_epoch;
}

void blockos_ext_kernel_services_set_system_hostname(const char * arg0) {
    initialize_models_once();
    text_copy(hostname, sizeof(hostname), arg0);
}

const char * blockos_ext_kernel_services_get_system_hostname(void) {
    initialize_models_once();
    return hostname;
}

const char * blockos_ext_cpu_get_cpu_vendor(void) {
    initialize_models_once();
    static char vendor[13];
    uint32_t ebx, ecx, edx;
    __asm__ volatile("cpuid" : "=b"(ebx), "=c"(ecx), "=d"(edx) : "a"(0u));
    bytes_copy(vendor + 0, &ebx, 4u);
    bytes_copy(vendor + 4, &edx, 4u);
    bytes_copy(vendor + 8, &ecx, 4u);
    vendor[12] = '\0';
    return vendor;
}

const char * blockos_ext_cpu_get_cpu_brand(void) {
    initialize_models_once();
    return "x86_64 compatible CPU";
}

uint64_t blockos_ext_cpu_get_logical_processor_count(void) {
    initialize_models_once();
    uint32_t eax, ebx, ecx, edx;
    __asm__ volatile("cpuid" : "=a"(eax), "=b"(ebx), "=c"(ecx), "=d"(edx) : "a"(1u));
    (void)eax; (void)ecx; (void)edx;
    uint64_t count = (ebx >> 16u) & 0xFFu;
    return count == 0u ? 1u : count;
}

uint64_t blockos_ext_cpu_get_current_cpu_number(void) {
    initialize_models_once();
    return 0u;
}

uint64_t blockos_ext_cpu_get_cpu_frequency_khz(void) {
    initialize_models_once();
    return 1000000u;
}

uint64_t blockos_ext_cpu_read_timestamp_counter(void) {
    initialize_models_once();
    return read_tsc();
}

void blockos_ext_cpu_enable_cpu_interrupts(void) {
    initialize_models_once();
    __asm__ volatile("sti");
}

void blockos_ext_cpu_disable_cpu_interrupts(void) {
    initialize_models_once();
    __asm__ volatile("cli");
}

bool blockos_ext_cpu_cpu_interrupts_enabled(void) {
    initialize_models_once();
    uint64_t flags;
    __asm__ volatile("pushfq; popq %0" : "=r"(flags));
    return (flags & (1u << 9u)) != 0u;
}

void blockos_ext_cpu_pause_cpu_briefly(void) {
    initialize_models_once();
    __asm__ volatile("pause");
}

void blockos_ext_cpu_invalidate_cpu_cache(void) {
    initialize_models_once();
    __asm__ volatile("wbinvd" ::: "memory");
}

void blockos_ext_cpu_flush_cache_line(uint64_t arg0) {
    initialize_models_once();
    __asm__ volatile("clflush (%0)" : : "r"((uintptr_t)arg0) : "memory");
}

uint64_t blockos_ext_cpu_read_control_register(uint64_t arg0) {
    initialize_models_once();
    uintptr_t value = 0u;
    switch ((uint32_t)arg0) {
    case 0u: __asm__ volatile("mov %%cr0, %0" : "=r"(value)); break;
    case 2u: __asm__ volatile("mov %%cr2, %0" : "=r"(value)); break;
    case 3u: __asm__ volatile("mov %%cr3, %0" : "=r"(value)); break;
    case 4u: __asm__ volatile("mov %%cr4, %0" : "=r"(value)); break;
    default: last_error = 2u; break;
    }
    return value;
}

void blockos_ext_cpu_write_control_register(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    uintptr_t value = (uintptr_t)arg1;
    switch ((uint32_t)arg0) {
    case 0u: __asm__ volatile("mov %0, %%cr0" : : "r"(value) : "memory"); break;
    case 3u: __asm__ volatile("mov %0, %%cr3" : : "r"(value) : "memory"); break;
    case 4u: __asm__ volatile("mov %0, %%cr4" : : "r"(value) : "memory"); break;
    default: last_error = 2u; break;
    }
}

void blockos_ext_cpu_execute_cpu_memory_fence(void) {
    initialize_models_once();
    __asm__ volatile("mfence" ::: "memory");
}

void blockos_ext_interrupts_install_interrupt_table(void) {
    initialize_models_once();
    bytes_zero(interrupt_handlers, sizeof(interrupt_handlers));
    bytes_zero(interrupt_counts, sizeof(interrupt_counts));
    irq_mask = 0xFFFFu;
}

void blockos_ext_interrupts_register_interrupt_handler(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    if (arg0 < 256u) interrupt_handlers[arg0] = arg1; else last_error = 3u;
}

void blockos_ext_interrupts_unregister_interrupt_handler(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < 256u) interrupt_handlers[arg0] = 0u;
}

void blockos_ext_interrupts_mask_hardware_irq(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < 16u) irq_mask |= (uint16_t)(1u << arg0);
}

void blockos_ext_interrupts_unmask_hardware_irq(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < 16u) irq_mask &= (uint16_t)~(1u << arg0);
}

bool blockos_ext_interrupts_hardware_irq_is_masked(uint64_t arg0) {
    initialize_models_once();
    return arg0 >= 16u || (irq_mask & (uint16_t)(1u << arg0)) != 0u;
}

void blockos_ext_interrupts_send_end_of_interrupt(uint64_t arg0) {
    initialize_models_once();
    if (arg0 >= 8u) port_write8(0xA0u, 0x20u);
    port_write8(0x20u, 0x20u);
}

uint64_t blockos_ext_interrupts_get_last_interrupt_vector(void) {
    initialize_models_once();
    return last_interrupt_vector;
}

void blockos_ext_interrupts_set_interrupt_priority(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    if (arg0 < 256u) interrupt_priorities[arg0] = (uint8_t)arg1;
}

uint64_t blockos_ext_interrupts_allocate_interrupt_vector(void) {
    initialize_models_once();
    for (uint64_t vector = 32u; vector < 256u; ++vector) {
        if (!interrupt_vectors_used[vector]) { interrupt_vectors_used[vector] = true; return vector; }
    }
    last_error = 4u;
    return 0u;
}

void blockos_ext_interrupts_release_interrupt_vector(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < 256u) interrupt_vectors_used[arg0] = false;
}

void blockos_ext_interrupts_trigger_software_interrupt(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < 256u) { last_interrupt_vector = arg0; ++interrupt_counts[arg0]; }
}

void blockos_ext_interrupts_enable_non_maskable_interrupts(void) {
    initialize_models_once();
    nmi_enabled = true;
    (void)nmi_enabled;
}

void blockos_ext_interrupts_disable_non_maskable_interrupts(void) {
    initialize_models_once();
    nmi_enabled = false;
}

uint64_t blockos_ext_interrupts_get_interrupt_count(uint64_t arg0) {
    initialize_models_once();
    return arg0 < 256u ? interrupt_counts[arg0] : 0u;
}

uint64_t blockos_ext_physical_memory_get_total_physical_memory_bytes(void) {
    initialize_models_once();
    return (uint64_t)sizeof(physical_pool);
}

uint64_t blockos_ext_physical_memory_get_free_physical_memory_bytes(void) {
    initialize_models_once();
    uint64_t free_pages = 0u;
    for (size_t i = 0; i < ARRAY_COUNT(physical_page_used); ++i) if (!physical_page_used[i]) ++free_pages;
    return free_pages * PAGE_SIZE;
}

uint64_t blockos_ext_physical_memory_allocate_physical_page(void) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(physical_page_used); ++i) {
        if (!physical_page_used[i]) { physical_page_used[i] = true; bytes_zero(&physical_pool[i * PAGE_SIZE], PAGE_SIZE); return (uintptr_t)&physical_pool[i * PAGE_SIZE]; }
    }
    last_error = 5u;
    return 0u;
}

void blockos_ext_physical_memory_free_physical_page(uint64_t arg0) {
    initialize_models_once();
    uintptr_t base = (uintptr_t)physical_pool;
    uintptr_t address = (uintptr_t)arg0;
    if (address >= base && address < base + sizeof(physical_pool)) physical_page_used[(address - base) / PAGE_SIZE] = false;
}

uint64_t blockos_ext_physical_memory_allocate_contiguous_physical_pages(uint64_t arg0) {
    initialize_models_once();
    if (arg0 == 0u || arg0 > PHYSICAL_POOL_PAGES) return 0u;
    for (size_t start = 0; start + arg0 <= PHYSICAL_POOL_PAGES; ++start) {
        bool free = true;
        for (size_t j = 0; j < arg0; ++j) if (physical_page_used[start + j]) free = false;
        if (free) {
            for (size_t j = 0; j < arg0; ++j) physical_page_used[start + j] = true;
            bytes_zero(&physical_pool[start * PAGE_SIZE], (size_t)arg0 * PAGE_SIZE);
            return (uintptr_t)&physical_pool[start * PAGE_SIZE];
        }
    }
    last_error = 5u;
    return 0u;
}

void blockos_ext_physical_memory_reserve_physical_range(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    uintptr_t base = (uintptr_t)physical_pool;
    uintptr_t start = (uintptr_t)arg0;
    uintptr_t end = start + (uintptr_t)arg1;
    for (size_t i = 0; i < PHYSICAL_POOL_PAGES; ++i) {
        uintptr_t page = base + i * PAGE_SIZE;
        if (page < end && page + PAGE_SIZE > start) physical_page_used[i] = true;
    }
}

void blockos_ext_physical_memory_release_physical_range(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    uintptr_t base = (uintptr_t)physical_pool;
    uintptr_t start = (uintptr_t)arg0;
    uintptr_t end = start + (uintptr_t)arg1;
    for (size_t i = 0; i < PHYSICAL_POOL_PAGES; ++i) {
        uintptr_t page = base + i * PAGE_SIZE;
        if (page < end && page + PAGE_SIZE > start) physical_page_used[i] = false;
    }
}

bool blockos_ext_physical_memory_physical_page_is_allocated(uint64_t arg0) {
    initialize_models_once();
    uintptr_t base = (uintptr_t)physical_pool;
    uintptr_t address = (uintptr_t)arg0;
    return address >= base && address < base + sizeof(physical_pool) && physical_page_used[(address - base) / PAGE_SIZE];
}

void blockos_ext_physical_memory_zero_physical_page(uint64_t arg0) {
    initialize_models_once();
    bytes_zero((void *)(uintptr_t)arg0, PAGE_SIZE);
}

void blockos_ext_physical_memory_copy_physical_page(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    bytes_copy((void *)(uintptr_t)arg0, (const void *)(uintptr_t)arg1, PAGE_SIZE);
}

uint64_t blockos_ext_physical_memory_get_physical_page_size(void) {
    initialize_models_once();
    return PAGE_SIZE;
}

uint64_t blockos_ext_physical_memory_get_memory_map_entry_count(void) {
    initialize_models_once();
    return 1u;
}

uint64_t blockos_ext_physical_memory_get_memory_map_entry_start(uint64_t arg0) {
    initialize_models_once();
    return arg0 == 0u ? (uintptr_t)physical_pool : 0u;
}

uint64_t blockos_ext_physical_memory_get_memory_map_entry_length(uint64_t arg0) {
    initialize_models_once();
    return arg0 == 0u ? sizeof(physical_pool) : 0u;
}

uint64_t blockos_ext_physical_memory_get_memory_map_entry_type(uint64_t arg0) {
    initialize_models_once();
    return arg0 == 0u ? 1u : 0u;
}

uint64_t blockos_ext_virtual_memory_create_address_space(void) {
    initialize_models_once();
    return next_address_space++;
}

void blockos_ext_virtual_memory_destroy_address_space(uint64_t arg0) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(virtual_maps); ++i) if (virtual_maps[i].space == arg0) virtual_maps[i].used = false;
}

void blockos_ext_virtual_memory_switch_address_space(uint64_t arg0) {
    initialize_models_once();
    current_address_space = arg0 == 0u ? 1u : arg0;
}

void blockos_ext_virtual_memory_map_virtual_page(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(virtual_maps); ++i) {
        if (!virtual_maps[i].used) { virtual_maps[i] = (VirtualMap){true, current_address_space, arg0 & ~(uint64_t)(PAGE_SIZE - 1u), arg1 & ~(uint64_t)(PAGE_SIZE - 1u), arg2}; return; }
    }
    last_error = 6u;
}

void blockos_ext_virtual_memory_unmap_virtual_page(uint64_t arg0) {
    initialize_models_once();
    uint64_t page = arg0 & ~(uint64_t)(PAGE_SIZE - 1u);
    for (size_t i = 0; i < ARRAY_COUNT(virtual_maps); ++i) if (virtual_maps[i].used && virtual_maps[i].space == current_address_space && virtual_maps[i].virtual_address == page) virtual_maps[i].used = false;
}

uint64_t blockos_ext_virtual_memory_translate_virtual_address(uint64_t arg0) {
    initialize_models_once();
    uint64_t page = arg0 & ~(uint64_t)(PAGE_SIZE - 1u);
    for (size_t i = 0; i < ARRAY_COUNT(virtual_maps); ++i) if (virtual_maps[i].used && virtual_maps[i].space == current_address_space && virtual_maps[i].virtual_address == page) return virtual_maps[i].physical_address + (arg0 & (PAGE_SIZE - 1u));
    return 0u;
}

bool blockos_ext_virtual_memory_virtual_page_is_mapped(uint64_t arg0) {
    initialize_models_once();
    uint64_t page = arg0 & ~(uint64_t)(PAGE_SIZE - 1u);
    for (size_t i = 0; i < ARRAY_COUNT(virtual_maps); ++i) if (virtual_maps[i].used && virtual_maps[i].space == current_address_space && virtual_maps[i].virtual_address == page) return true;
    return false;
}

void blockos_ext_virtual_memory_set_virtual_page_flags(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    uint64_t page = arg0 & ~(uint64_t)(PAGE_SIZE - 1u);
    for (size_t i = 0; i < ARRAY_COUNT(virtual_maps); ++i) if (virtual_maps[i].used && virtual_maps[i].space == current_address_space && virtual_maps[i].virtual_address == page) virtual_maps[i].flags = arg1;
}

uint64_t blockos_ext_virtual_memory_get_virtual_page_flags(uint64_t arg0) {
    initialize_models_once();
    uint64_t page = arg0 & ~(uint64_t)(PAGE_SIZE - 1u);
    for (size_t i = 0; i < ARRAY_COUNT(virtual_maps); ++i) if (virtual_maps[i].used && virtual_maps[i].space == current_address_space && virtual_maps[i].virtual_address == page) return virtual_maps[i].flags;
    return 0u;
}

void blockos_ext_virtual_memory_flush_tlb_page(uint64_t arg0) {
    initialize_models_once();
    __asm__ volatile("invlpg (%0)" : : "r"((uintptr_t)arg0) : "memory");
}

void blockos_ext_virtual_memory_flush_entire_tlb(void) {
    initialize_models_once();
    uintptr_t cr3;
    __asm__ volatile("mov %%cr3, %0; mov %0, %%cr3" : "=r"(cr3) : : "memory");
}

void blockos_ext_virtual_memory_map_virtual_range(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    for (uint64_t i = 0; i < arg2; ++i) {
        bool placed = false;
        for (size_t j = 0; j < ARRAY_COUNT(virtual_maps); ++j) if (!virtual_maps[j].used) { virtual_maps[j] = (VirtualMap){true, current_address_space, arg0 + i * PAGE_SIZE, arg1 + i * PAGE_SIZE, 3u}; placed = true; break; }
        if (!placed) { last_error = 6u; return; }
    }
}

void blockos_ext_virtual_memory_unmap_virtual_range(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    for (uint64_t i = 0; i < arg1; ++i) {
        uint64_t page = (arg0 + i * PAGE_SIZE) & ~(uint64_t)(PAGE_SIZE - 1u);
        for (size_t j = 0; j < ARRAY_COUNT(virtual_maps); ++j) if (virtual_maps[j].used && virtual_maps[j].space == current_address_space && virtual_maps[j].virtual_address == page) virtual_maps[j].used = false;
    }
}

uint64_t blockos_ext_virtual_memory_clone_address_space(uint64_t arg0) {
    initialize_models_once();
    uint64_t destination = next_address_space++;
    for (size_t i = 0; i < ARRAY_COUNT(virtual_maps); ++i) if (virtual_maps[i].used && virtual_maps[i].space == arg0) {
        for (size_t j = 0; j < ARRAY_COUNT(virtual_maps); ++j) if (!virtual_maps[j].used) { virtual_maps[j] = virtual_maps[i]; virtual_maps[j].space = destination; break; }
    }
    return destination;
}

uint64_t blockos_ext_virtual_memory_get_current_address_space(void) {
    initialize_models_once();
    return current_address_space;
}

void blockos_ext_kernel_heap_initialize_kernel_heap(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    (void)arg0;
    heap_limit = arg1 > HEAP_BYTES ? HEAP_BYTES : (uint32_t)arg1;
    heap_offset = 0u;
    bytes_zero(heap_allocations, sizeof(heap_allocations));
}

uint64_t blockos_ext_kernel_heap_allocate_heap_bytes(uint64_t arg0) {
    initialize_models_once();
    uint32_t size = (uint32_t)((arg0 + 15u) & ~15u);
    if (size == 0u || heap_offset + size > heap_limit) { last_error = 7u; return 0u; }
    uintptr_t address = (uintptr_t)&heap_storage[heap_offset];
    heap_offset += size;
    for (size_t i = 0; i < ARRAY_COUNT(heap_allocations); ++i) if (!heap_allocations[i].used) { heap_allocations[i] = (HeapAllocation){true, address, size}; break; }
    return address;
}

uint64_t blockos_ext_kernel_heap_allocate_zeroed_items(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    uint64_t total = arg0 * arg1;
    uint32_t size = (uint32_t)((total + 15u) & ~15u);
    if (size == 0u || heap_offset + size > heap_limit) { last_error = 7u; return 0u; }
    uintptr_t address = (uintptr_t)&heap_storage[heap_offset];
    heap_offset += size;
    bytes_zero((void *)address, size);
    for (size_t i = 0; i < ARRAY_COUNT(heap_allocations); ++i) if (!heap_allocations[i].used) { heap_allocations[i] = (HeapAllocation){true, address, size}; break; }
    return address;
}

uint64_t blockos_ext_kernel_heap_resize_heap_allocation(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(heap_allocations); ++i) if (heap_allocations[i].used && heap_allocations[i].address == (uintptr_t)arg0) {
        uint32_t old_size = heap_allocations[i].size;
        uint32_t size = (uint32_t)((arg1 + 15u) & ~15u);
        if (heap_offset + size > heap_limit) return 0u;
        uintptr_t address = (uintptr_t)&heap_storage[heap_offset];
        heap_offset += size;
        bytes_copy((void *)address, (void *)(uintptr_t)arg0, old_size < size ? old_size : size);
        heap_allocations[i].used = false;
        for (size_t j = 0; j < ARRAY_COUNT(heap_allocations); ++j) if (!heap_allocations[j].used) { heap_allocations[j] = (HeapAllocation){true, address, size}; break; }
        return address;
    }
    return 0u;
}

void blockos_ext_kernel_heap_free_heap_allocation(uint64_t arg0) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(heap_allocations); ++i) if (heap_allocations[i].used && heap_allocations[i].address == (uintptr_t)arg0) { heap_allocations[i].used = false; return; }
}

uint64_t blockos_ext_kernel_heap_get_allocation_size(uint64_t arg0) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(heap_allocations); ++i) if (heap_allocations[i].used && heap_allocations[i].address == (uintptr_t)arg0) return heap_allocations[i].size;
    return 0u;
}

uint64_t blockos_ext_kernel_heap_get_heap_bytes_used(void) {
    initialize_models_once();
    uint64_t used = 0u;
    for (size_t i = 0; i < ARRAY_COUNT(heap_allocations); ++i) if (heap_allocations[i].used) used += heap_allocations[i].size;
    return used;
}

uint64_t blockos_ext_kernel_heap_get_heap_bytes_free(void) {
    initialize_models_once();
    uint64_t used = 0u;
    for (size_t i = 0; i < ARRAY_COUNT(heap_allocations); ++i) if (heap_allocations[i].used) used += heap_allocations[i].size;
    return heap_limit > used ? heap_limit - used : 0u;
}

bool blockos_ext_kernel_heap_validate_kernel_heap(void) {
    initialize_models_once();
    return heap_offset <= heap_limit;
}

void blockos_ext_kernel_heap_dump_kernel_heap(void) {
    initialize_models_once();
    screen_print("[Heap] used bytes: ");
    uint64_t used = 0u;
    for (size_t i = 0; i < ARRAY_COUNT(heap_allocations); ++i) if (heap_allocations[i].used) used += heap_allocations[i].size;
    screen_print_i64((int64_t)used);
    screen_print("\n");
}

uint64_t blockos_ext_kernel_heap_create_memory_pool(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    for (size_t i = 1; i < ARRAY_COUNT(memory_pools); ++i) if (!memory_pools[i].used) {
        uint64_t total = arg0 * arg1;
        uint32_t size = (uint32_t)((total + 15u) & ~15u);
        if (size == 0u || heap_offset + size > heap_limit) return 0u;
        uintptr_t base = (uintptr_t)&heap_storage[heap_offset]; heap_offset += size;
        memory_pools[i] = (MemoryPool){true, (uint32_t)arg0, (uint32_t)arg1, base, 0u};
        return i;
    }
    return 0u;
}

void blockos_ext_kernel_heap_destroy_memory_pool(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(memory_pools)) memory_pools[arg0].used = false;
}

uint64_t blockos_ext_kernel_heap_allocate_from_memory_pool(uint64_t arg0) {
    initialize_models_once();
    if (arg0 >= ARRAY_COUNT(memory_pools) || !memory_pools[arg0].used) return 0u;
    MemoryPool *pool = &memory_pools[arg0];
    if (pool->next_item >= pool->item_count) return 0u;
    return pool->base + (uintptr_t)(pool->next_item++ * pool->item_size);
}

void blockos_ext_kernel_heap_free_to_memory_pool(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    (void)arg1;
    if (arg0 < ARRAY_COUNT(memory_pools) && memory_pools[arg0].used && memory_pools[arg0].next_item > 0u) --memory_pools[arg0].next_item;
}

void blockos_ext_kernel_heap_compact_kernel_heap(void) {
    initialize_models_once();
    model_message("Heap", "compaction completed");
}

uint64_t blockos_ext_processes_create_process(const char * arg0, uint64_t arg1) {
    initialize_models_once();
    for (size_t i = 1; i < ARRAY_COUNT(processes); ++i) if (!processes[i].used) {
        processes[i].used = true; processes[i].id = next_process_id++; processes[i].entry = arg1; processes[i].priority = 5u; text_copy(processes[i].name, sizeof(processes[i].name), arg0); return processes[i].id;
    }
    return 0u;
}

void blockos_ext_processes_terminate_process(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    Process *process = find_process(arg0);
    if (process != NULL) { process->exit_code = arg1; process->used = false; }
}

uint64_t blockos_ext_processes_get_current_process_id(void) {
    initialize_models_once();
    return current_process_id;
}

bool blockos_ext_processes_process_exists(uint64_t arg0) {
    initialize_models_once();
    return find_process(arg0) != NULL;
}

void blockos_ext_processes_set_process_name(uint64_t arg0, const char * arg1) {
    initialize_models_once();
    Process *process = find_process(arg0);
    if (process != NULL) text_copy(process->name, sizeof(process->name), arg1);
}

const char * blockos_ext_processes_get_process_name(uint64_t arg0) {
    initialize_models_once();
    Process *process = find_process(arg0);
    return process != NULL ? process->name : "";
}

void blockos_ext_processes_set_process_priority(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    Process *process = find_process(arg0);
    if (process != NULL) process->priority = arg1;
}

uint64_t blockos_ext_processes_get_process_priority(uint64_t arg0) {
    initialize_models_once();
    Process *process = find_process(arg0);
    return process != NULL ? process->priority : 0u;
}

void blockos_ext_processes_suspend_process(uint64_t arg0) {
    initialize_models_once();
    Process *process = find_process(arg0);
    if (process != NULL) process->suspended = true;
}

void blockos_ext_processes_resume_process(uint64_t arg0) {
    initialize_models_once();
    Process *process = find_process(arg0);
    if (process != NULL) process->suspended = false;
}

bool blockos_ext_processes_process_is_suspended(uint64_t arg0) {
    initialize_models_once();
    Process *process = find_process(arg0);
    return process != NULL && process->suspended;
}

uint64_t blockos_ext_processes_wait_for_process(uint64_t arg0) {
    initialize_models_once();
    Process *process = find_process(arg0);
    return process != NULL ? process->exit_code : 0u;
}

uint64_t blockos_ext_processes_get_process_exit_code(uint64_t arg0) {
    initialize_models_once();
    Process *process = find_process(arg0);
    return process != NULL ? process->exit_code : 0u;
}

uint64_t blockos_ext_processes_get_process_count(void) {
    initialize_models_once();
    uint64_t count = 0u;
    for (size_t i = 0; i < ARRAY_COUNT(processes); ++i) if (processes[i].used) ++count;
    return count;
}

void blockos_ext_processes_send_process_signal(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    Process *process = find_process(arg0);
    if (process != NULL) process->exit_code = arg1;
}

uint64_t blockos_ext_threads_create_thread(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    for (size_t i = 1; i < ARRAY_COUNT(threads); ++i) if (!threads[i].used) {
        threads[i].used = true; threads[i].id = next_thread_id++; threads[i].entry = arg0; threads[i].argument = arg1; threads[i].priority = 5u; threads[i].state = 1u; return threads[i].id;
    }
    return 0u;
}

void blockos_ext_threads_exit_current_thread(uint64_t arg0) {
    initialize_models_once();
    Thread *thread = find_thread(current_thread_id);
    if (thread != NULL) { thread->exit_code = arg0; thread->state = 0u; }
}

uint64_t blockos_ext_threads_get_current_thread_id(void) {
    initialize_models_once();
    return current_thread_id;
}

bool blockos_ext_threads_thread_exists(uint64_t arg0) {
    initialize_models_once();
    return find_thread(arg0) != NULL;
}

void blockos_ext_threads_yield_current_thread(void) {
    initialize_models_once();
    __asm__ volatile("pause");
}

void blockos_ext_threads_sleep_thread_ticks(uint64_t arg0) {
    initialize_models_once();
    uint64_t start = read_tsc();
    uint64_t target = start + arg0 * 1000u;
    while (read_tsc() < target) __asm__ volatile("pause");
}

void blockos_ext_threads_wake_thread(uint64_t arg0) {
    initialize_models_once();
    Thread *thread = find_thread(arg0);
    if (thread != NULL) { thread->suspended = false; thread->state = 1u; }
}

void blockos_ext_threads_suspend_thread(uint64_t arg0) {
    initialize_models_once();
    Thread *thread = find_thread(arg0);
    if (thread != NULL) { thread->suspended = true; thread->state = 2u; }
}

void blockos_ext_threads_resume_thread(uint64_t arg0) {
    initialize_models_once();
    Thread *thread = find_thread(arg0);
    if (thread != NULL) { thread->suspended = false; thread->state = 1u; }
}

void blockos_ext_threads_set_thread_priority(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    Thread *thread = find_thread(arg0);
    if (thread != NULL) thread->priority = arg1;
}

uint64_t blockos_ext_threads_get_thread_priority(uint64_t arg0) {
    initialize_models_once();
    Thread *thread = find_thread(arg0);
    return thread != NULL ? thread->priority : 0u;
}

void blockos_ext_threads_set_thread_affinity(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    Thread *thread = find_thread(arg0);
    if (thread != NULL) thread->affinity = arg1;
}

uint64_t blockos_ext_threads_get_thread_affinity(uint64_t arg0) {
    initialize_models_once();
    Thread *thread = find_thread(arg0);
    return thread != NULL ? thread->affinity : 0u;
}

uint64_t blockos_ext_threads_join_thread(uint64_t arg0) {
    initialize_models_once();
    Thread *thread = find_thread(arg0);
    return thread != NULL ? thread->exit_code : 0u;
}

uint64_t blockos_ext_threads_get_thread_state(uint64_t arg0) {
    initialize_models_once();
    Thread *thread = find_thread(arg0);
    return thread != NULL ? thread->state : 0u;
}

uint64_t blockos_ext_synchronization_create_mutex(void) {
    initialize_models_once();
    return create_sync(mutexes, ARRAY_COUNT(mutexes), 0u);
}

void blockos_ext_synchronization_lock_mutex(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(mutexes) && mutexes[arg0].used) mutexes[arg0].locked = true;
}

bool blockos_ext_synchronization_try_lock_mutex(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(mutexes) && mutexes[arg0].used && !mutexes[arg0].locked) { mutexes[arg0].locked = true; return true; }
    return false;
}

void blockos_ext_synchronization_unlock_mutex(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(mutexes) && mutexes[arg0].used) mutexes[arg0].locked = false;
}

void blockos_ext_synchronization_destroy_mutex(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(mutexes)) mutexes[arg0].used = false;
}

uint64_t blockos_ext_synchronization_create_semaphore(uint64_t arg0) {
    initialize_models_once();
    return create_sync(semaphores, ARRAY_COUNT(semaphores), arg0);
}

void blockos_ext_synchronization_wait_semaphore(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(semaphores) && semaphores[arg0].used && semaphores[arg0].value > 0u) --semaphores[arg0].value;
}

bool blockos_ext_synchronization_try_wait_semaphore(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(semaphores) && semaphores[arg0].used && semaphores[arg0].value > 0u) { --semaphores[arg0].value; return true; }
    return false;
}

void blockos_ext_synchronization_signal_semaphore(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(semaphores) && semaphores[arg0].used) ++semaphores[arg0].value;
}

void blockos_ext_synchronization_destroy_semaphore(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(semaphores)) semaphores[arg0].used = false;
}

uint64_t blockos_ext_synchronization_create_spinlock(void) {
    initialize_models_once();
    return create_sync(spinlocks, ARRAY_COUNT(spinlocks), 0u);
}

void blockos_ext_synchronization_lock_spinlock(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(spinlocks) && spinlocks[arg0].used) spinlocks[arg0].locked = true;
}

void blockos_ext_synchronization_unlock_spinlock(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(spinlocks) && spinlocks[arg0].used) spinlocks[arg0].locked = false;
}

uint64_t blockos_ext_synchronization_create_event(void) {
    initialize_models_once();
    return create_sync(events, ARRAY_COUNT(events), 0u);
}

void blockos_ext_synchronization_set_event(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(events) && events[arg0].used) events[arg0].value = 1u;
}

void blockos_ext_timers_and_clock_initialize_system_timer(uint64_t arg0) {
    initialize_models_once();
    timer_frequency = arg0 == 0u ? 1000u : arg0;
    timer_epoch = read_tsc();
}

uint64_t blockos_ext_timers_and_clock_get_timer_frequency(void) {
    initialize_models_once();
    return timer_frequency;
}

uint64_t blockos_ext_timers_and_clock_get_monotonic_ticks(void) {
    initialize_models_once();
    return (read_tsc() - timer_epoch) / 1000000u;
}

uint64_t blockos_ext_timers_and_clock_convert_ticks_to_milliseconds(uint64_t arg0) {
    initialize_models_once();
    return timer_frequency == 0u ? 0u : (arg0 * 1000u) / timer_frequency;
}

uint64_t blockos_ext_timers_and_clock_convert_milliseconds_to_ticks(uint64_t arg0) {
    initialize_models_once();
    return (arg0 * timer_frequency) / 1000u;
}

void blockos_ext_timers_and_clock_sleep_milliseconds(uint64_t arg0) {
    initialize_models_once();
    uint64_t start = read_tsc();
    uint64_t target = start + arg0 * 1000000u;
    while (read_tsc() < target) __asm__ volatile("pause");
}

uint64_t blockos_ext_timers_and_clock_create_one_shot_timer(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(timers); ++i) if (!timers[i].used) { timers[i] = (Timer){true, false, next_timer_id++, arg0, 0u, arg1}; return timers[i].id; }
    return 0u;
}

uint64_t blockos_ext_timers_and_clock_create_repeating_timer(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(timers); ++i) if (!timers[i].used) { timers[i] = (Timer){true, true, next_timer_id++, arg0, arg0, arg1}; return timers[i].id; }
    return 0u;
}

void blockos_ext_timers_and_clock_cancel_timer(uint64_t arg0) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(timers); ++i) if (timers[i].used && timers[i].id == arg0) timers[i].used = false;
}

bool blockos_ext_timers_and_clock_timer_is_active(uint64_t arg0) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(timers); ++i) if (timers[i].used && timers[i].id == arg0) return true;
    return false;
}

uint64_t blockos_ext_timers_and_clock_get_timer_remaining_ticks(uint64_t arg0) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(timers); ++i) if (timers[i].used && timers[i].id == arg0) return timers[i].deadline;
    return 0u;
}

void blockos_ext_timers_and_clock_reset_timer(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    for (size_t i = 0; i < ARRAY_COUNT(timers); ++i) if (timers[i].used && timers[i].id == arg0) timers[i].deadline = arg1;
}

void blockos_ext_timers_and_clock_set_wall_clock_seconds(uint64_t arg0) {
    initialize_models_once();
    wall_clock_seconds = arg0;
}

uint64_t blockos_ext_timers_and_clock_get_wall_clock_seconds(void) {
    initialize_models_once();
    return wall_clock_seconds + ((read_tsc() - timer_epoch) / 1000000000u);
}

uint64_t blockos_ext_timers_and_clock_get_monotonic_nanoseconds(void) {
    initialize_models_once();
    return read_tsc() - timer_epoch;
}

void blockos_ext_keyboard_and_mouse_initialize_keyboard(void) {
    initialize_models_once();
    keyboard_initialized = true;
}

bool blockos_ext_keyboard_and_mouse_keyboard_key_available(void) {
    initialize_models_once();
    return keyboard_initialized && blockos_console_input_available();
}

uint64_t blockos_ext_keyboard_and_mouse_read_keyboard_key_code(void) {
    initialize_models_once();
    if (!keyboard_initialized || !blockos_console_input_available()) return 0u;
    uint8_t value = blockos_console_read_input(); key_state[value] = true; return value;
}

uint64_t blockos_ext_keyboard_and_mouse_read_keyboard_character(void) {
    initialize_models_once();
    if (!keyboard_initialized || !blockos_console_input_available()) return 0u;
    uint8_t value = blockos_console_read_input(); key_state[value] = true; return value;
}

bool blockos_ext_keyboard_and_mouse_keyboard_key_is_pressed(uint64_t arg0) {
    initialize_models_once();
    return arg0 < 256u && key_state[arg0];
}

void blockos_ext_keyboard_and_mouse_initialize_mouse(void) {
    initialize_models_once();
    mouse_initialized = true;
}

uint64_t blockos_ext_keyboard_and_mouse_get_mouse_x(void) {
    initialize_models_once();
    return (uint64_t)(int64_t)mouse_x;
}

uint64_t blockos_ext_keyboard_and_mouse_get_mouse_y(void) {
    initialize_models_once();
    return (uint64_t)(int64_t)mouse_y;
}

uint64_t blockos_ext_keyboard_and_mouse_get_mouse_button_mask(void) {
    initialize_models_once();
    return mouse_buttons;
}

void blockos_ext_keyboard_and_mouse_set_mouse_position(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    mouse_x = (int32_t)arg0; mouse_y = (int32_t)arg1;
}

bool blockos_ext_keyboard_and_mouse_mouse_button_is_pressed(uint64_t arg0) {
    initialize_models_once();
    return arg0 < 64u && (mouse_buttons & ((uint64_t)1u << arg0)) != 0u;
}

void blockos_ext_keyboard_and_mouse_set_mouse_cursor_visible(bool arg0) {
    initialize_models_once();
    mouse_cursor_visible = arg0;
}

bool blockos_ext_keyboard_and_mouse_mouse_cursor_is_visible(void) {
    initialize_models_once();
    return mouse_cursor_visible;
}

uint64_t blockos_ext_keyboard_and_mouse_get_mouse_scroll_delta(void) {
    initialize_models_once();
    int32_t value = mouse_scroll; mouse_scroll = 0; return (uint64_t)(int64_t)value;
}

void blockos_ext_keyboard_and_mouse_clear_input_queue(void) {
    initialize_models_once();
    while (blockos_console_input_available()) (void)blockos_console_read_input();
    bytes_zero(key_state, sizeof(key_state));
}

void blockos_ext_graphics_initialize_framebuffer(void) { initialize_models_once(); blockos_graphics_initialize(); screen_clear(0x000000u); }
uint64_t blockos_ext_graphics_get_screen_width(void) { initialize_models_once(); return blockos_framebuffer_width(); }
uint64_t blockos_ext_graphics_get_screen_height(void) { initialize_models_once(); return blockos_framebuffer_height(); }
uint64_t blockos_ext_graphics_get_framebuffer_pitch(void) { initialize_models_once(); return blockos_framebuffer_pitch(); }
uint64_t blockos_ext_graphics_get_framebuffer_bits_per_pixel(void) { initialize_models_once(); return blockos_framebuffer_bpp(); }
void blockos_ext_graphics_draw_horizontal_line(uint64_t x, uint64_t y, uint64_t length, uint64_t colour) { initialize_models_once(); blockos_graphics_fill_rectangle((uint32_t)x,(uint32_t)y,(uint32_t)length,1u,(uint32_t)colour); }
void blockos_ext_graphics_draw_vertical_line(uint64_t x, uint64_t y, uint64_t length, uint64_t colour) { initialize_models_once(); blockos_graphics_fill_rectangle((uint32_t)x,(uint32_t)y,1u,(uint32_t)length,(uint32_t)colour); }
void blockos_ext_graphics_draw_rectangle_outline(uint64_t x, uint64_t y, uint64_t width, uint64_t height, uint64_t colour) {
    initialize_models_once(); if (width == 0u || height == 0u) return;
    blockos_graphics_fill_rectangle((uint32_t)x,(uint32_t)y,(uint32_t)width,1u,(uint32_t)colour);
    blockos_graphics_fill_rectangle((uint32_t)x,(uint32_t)(y+height-1u),(uint32_t)width,1u,(uint32_t)colour);
    blockos_graphics_fill_rectangle((uint32_t)x,(uint32_t)y,1u,(uint32_t)height,(uint32_t)colour);
    blockos_graphics_fill_rectangle((uint32_t)(x+width-1u),(uint32_t)y,1u,(uint32_t)height,(uint32_t)colour);
}
void blockos_ext_graphics_fill_rectangle(uint64_t x, uint64_t y, uint64_t width, uint64_t height, uint64_t colour) { initialize_models_once(); blockos_graphics_fill_rectangle((uint32_t)x,(uint32_t)y,(uint32_t)width,(uint32_t)height,(uint32_t)colour); }
void blockos_ext_graphics_draw_circle_outline(uint64_t cx, uint64_t cy, uint64_t radius_value, uint64_t colour) {
    initialize_models_once(); int32_t radius=(int32_t)radius_value,x=radius,y=0,error=1-radius;
    while(x>=y){int32_t p[8][2]={{x,y},{y,x},{-y,x},{-x,y},{-x,-y},{-y,-x},{y,-x},{x,-y}};for(size_t i=0;i<8u;++i)screen_set_pixel((int32_t)cx+p[i][0],(int32_t)cy+p[i][1],(uint32_t)colour);++y;if(error<0)error+=2*y+1;else{--x;error+=2*(y-x+1);}}
}
void blockos_ext_graphics_fill_circle(uint64_t cx, uint64_t cy, uint64_t radius_value, uint64_t colour) {
    initialize_models_once(); int32_t radius=(int32_t)radius_value; for(int32_t y=-radius;y<=radius;++y){int32_t width=0;while((width+1)*(width+1)+y*y<=radius*radius)++width;blockos_graphics_fill_rectangle((uint32_t)((int32_t)cx-width),(uint32_t)((int32_t)cy+y),(uint32_t)(width*2+1),1u,(uint32_t)colour);}
}
void blockos_ext_graphics_draw_bitmap(uint64_t x,uint64_t y,uint64_t address,uint64_t width,uint64_t height){initialize_models_once();blockos_graphics_draw_sprite((uint32_t)x,(uint32_t)y,(const uint32_t *)(uintptr_t)address,(uint32_t)width,(uint32_t)height,0xFFFFFFFFu);}
void blockos_ext_graphics_swap_graphics_buffers(void){initialize_models_once();blockos_graphics_present();}
void blockos_ext_graphics_set_clipping_rectangle(uint64_t x,uint64_t y,uint64_t width,uint64_t height){initialize_models_once();blockos_graphics_set_clip((uint32_t)x,(uint32_t)y,(uint32_t)width,(uint32_t)height);clipping_enabled=true;clip_x=x;clip_y=y;clip_width=width;clip_height=height;}
void blockos_ext_graphics_clear_clipping_rectangle(void){initialize_models_once();blockos_graphics_clear_clip();clipping_enabled=false;}
void blockos_ext_graphics_draw_pixel_line_fast(uint64_t x1,uint64_t y1,uint64_t x2,uint64_t y2,uint64_t colour){initialize_models_once();blockos_graphics_draw_line((int32_t)x1,(int32_t)y1,(int32_t)x2,(int32_t)y2,(uint32_t)colour);}
void blockos_ext_graphics_save_screen_region(uint64_t slot,uint64_t x,uint64_t y,uint64_t width,uint64_t height){initialize_models_once();blockos_graphics_save_region((uint32_t)slot,(uint32_t)x,(uint32_t)y,(uint32_t)width,(uint32_t)height);}
void blockos_ext_graphics_restore_screen_region(uint64_t slot,uint64_t x,uint64_t y){initialize_models_once();blockos_graphics_restore_region((uint32_t)slot,(uint32_t)x,(uint32_t)y);}
void blockos_ext_graphics_copy_screen_region(uint64_t sx,uint64_t sy,uint64_t dx,uint64_t dy,uint64_t width,uint64_t height){initialize_models_once();blockos_graphics_copy_region((uint32_t)sx,(uint32_t)sy,(uint32_t)dx,(uint32_t)dy,(uint32_t)width,(uint32_t)height);}
void blockos_ext_graphics_draw_fast_mouse_cursor(uint64_t x,uint64_t y){initialize_models_once();blockos_graphics_draw_fast_cursor((uint32_t)x,(uint32_t)y);}
void blockos_ext_graphics_enable_back_buffer(bool enabled){initialize_models_once();blockos_graphics_enable_backbuffer(enabled);}
void blockos_ext_graphics_present_changed_rectangle(uint64_t x,uint64_t y,uint64_t width,uint64_t height){initialize_models_once();blockos_graphics_present_rect((uint32_t)x,(uint32_t)y,(uint32_t)width,(uint32_t)height);}
void blockos_ext_graphics_present_full_frame(void){initialize_models_once();blockos_graphics_present();}
void blockos_ext_graphics_draw_transparent_sprite(uint64_t x,uint64_t y,uint64_t address,uint64_t width,uint64_t height,uint64_t transparent){initialize_models_once();blockos_graphics_draw_sprite((uint32_t)x,(uint32_t)y,(const uint32_t *)(uintptr_t)address,(uint32_t)width,(uint32_t)height,(uint32_t)transparent);}

void blockos_ext_text_and_windows_set_text_cursor_position(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    blockos_console_set_cursor((uint32_t)arg0, (uint32_t)arg1);
}

uint64_t blockos_ext_text_and_windows_get_text_cursor_x(void) {
    initialize_models_once();
    return blockos_console_get_cursor_x();
}

uint64_t blockos_ext_text_and_windows_get_text_cursor_y(void) {
    initialize_models_once();
    return blockos_console_get_cursor_y();
}

void blockos_ext_text_and_windows_set_text_colours(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    blockos_console_set_colours((uint8_t)arg0, (uint8_t)arg1);
}

void blockos_ext_text_and_windows_print_line(const char * arg0) {
    initialize_models_once();
    screen_print(arg0); screen_print("\n");
}

void blockos_ext_text_and_windows_print_hexadecimal_number(uint64_t arg0) {
    initialize_models_once();
    blockos_console_write_hex(arg0);
}

void blockos_ext_text_and_windows_draw_text_at_position(uint64_t x, uint64_t y, const char *text, uint64_t colour) { initialize_models_once(); blockos_graphics_draw_text((uint32_t)x,(uint32_t)y,text,(uint32_t)colour); }
uint64_t blockos_ext_text_and_windows_measure_text_width(const char *text) { initialize_models_once(); return blockos_graphics_text_width(text); }
uint64_t blockos_ext_text_and_windows_measure_text_height(const char *text) { initialize_models_once(); (void)text; return blockos_graphics_text_height(); }

uint64_t blockos_ext_text_and_windows_create_window(const char * arg0, uint64_t arg1, uint64_t arg2, uint64_t arg3, uint64_t arg4) {
    initialize_models_once();
    for (size_t i = 1; i < ARRAY_COUNT(windows); ++i) if (!windows[i].used) { windows[i].used = true; windows[i].visible = true; windows[i].x = arg1; windows[i].y = arg2; windows[i].width = arg3; windows[i].height = arg4; text_copy(windows[i].title, sizeof(windows[i].title), arg0); return i; }
    return 0u;
}

void blockos_ext_text_and_windows_destroy_window(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(windows)) windows[arg0].used = false;
}

void blockos_ext_text_and_windows_move_window(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(windows) && windows[arg0].used) { windows[arg0].x = arg1; windows[arg0].y = arg2; }
}

void blockos_ext_text_and_windows_resize_window(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(windows) && windows[arg0].used) { windows[arg0].width = arg1; windows[arg0].height = arg2; }
}

void blockos_ext_text_and_windows_show_window(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(windows) && windows[arg0].used) {
        Window *window = &windows[arg0]; window->visible = true;
        if (window->width > 1u && window->height > 1u) { draw_horizontal(window->x, window->y, window->width, 15u, '-'); draw_horizontal(window->x, window->y + window->height - 1u, window->width, 15u, '-'); draw_vertical(window->x, window->y, window->height, 15u, '|'); draw_vertical(window->x + window->width - 1u, window->y, window->height, 15u, '|'); blockos_console_set_cursor((uint32_t)(window->x + 2u), (uint32_t)window->y); screen_print(window->title); }
    }
}

bool blockos_ext_text_and_windows_window_is_visible(uint64_t arg0) {
    initialize_models_once();
    return arg0 < ARRAY_COUNT(windows) && windows[arg0].used && windows[arg0].visible;
}

uint64_t blockos_ext_storage_devices_get_disk_count(void) {
    initialize_models_once();
    return 1u;
}

uint64_t blockos_ext_storage_devices_get_disk_size_bytes(uint64_t arg0) {
    initialize_models_once();
    return arg0 == 0u ? sizeof(ram_disk) : 0u;
}

uint64_t blockos_ext_storage_devices_read_disk_sectors(uint64_t arg0, uint64_t arg1, uint64_t arg2, uint64_t arg3) {
    initialize_models_once();
    if (arg0 != 0u || arg1 * 512u + arg3 * 512u > sizeof(ram_disk)) return 0u;
    bytes_copy((void *)(uintptr_t)arg2, &ram_disk[arg1 * 512u], (size_t)arg3 * 512u);
    return arg3;
}

uint64_t blockos_ext_storage_devices_write_disk_sectors(uint64_t arg0, uint64_t arg1, uint64_t arg2, uint64_t arg3) {
    initialize_models_once();
    if (arg0 != 0u || arg1 * 512u + arg3 * 512u > sizeof(ram_disk)) return 0u;
    bytes_copy(&ram_disk[arg1 * 512u], (const void *)(uintptr_t)arg2, (size_t)arg3 * 512u);
    return arg3;
}

void blockos_ext_storage_devices_flush_disk_cache(uint64_t arg0) {
    initialize_models_once();
    (void)arg0;
}

bool blockos_ext_storage_devices_disk_is_present(uint64_t arg0) {
    initialize_models_once();
    return arg0 == 0u;
}

bool blockos_ext_storage_devices_disk_is_read_only(uint64_t arg0) {
    initialize_models_once();
    (void)arg0; return false;
}

uint64_t blockos_ext_storage_devices_get_disk_sector_size(uint64_t arg0) {
    initialize_models_once();
    return arg0 == 0u ? 512u : 0u;
}

uint64_t blockos_ext_storage_devices_create_block_request(uint64_t arg0, uint64_t arg1, uint64_t arg2, uint64_t arg3) {
    initialize_models_once();
    (void)arg0; (void)arg1; (void)arg2; (void)arg3;
    return ++generic_state[200];
}

uint64_t blockos_ext_storage_devices_wait_for_block_request(uint64_t arg0) {
    initialize_models_once();
    (void)arg0; return 1u;
}

void blockos_ext_storage_devices_cancel_block_request(uint64_t arg0) {
    initialize_models_once();
    generic_state[201] = arg0;
}

uint64_t blockos_ext_storage_devices_get_block_request_status(uint64_t arg0) {
    initialize_models_once();
    (void)arg0; return 1u;
}

uint64_t blockos_ext_storage_devices_get_partition_count(uint64_t arg0) {
    initialize_models_once();
    return arg0 == 0u ? 1u : 0u;
}

uint64_t blockos_ext_storage_devices_get_partition_start_lba(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    return arg0 == 0u && arg1 == 0u ? 0u : 0u;
}

uint64_t blockos_ext_storage_devices_get_partition_size_sectors(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    return arg0 == 0u && arg1 == 0u ? sizeof(ram_disk) / 512u : 0u;
}

uint64_t blockos_ext_filesystems_mount_filesystem(const char * arg0, const char * arg1, const char * arg2) {
    initialize_models_once();
    (void)arg0; (void)arg1; (void)arg2; filesystem_mounted = true; return 1u;
}

void blockos_ext_filesystems_unmount_filesystem(const char * arg0) {
    initialize_models_once();
    (void)arg0; filesystem_mounted = false;
}

bool blockos_ext_filesystems_filesystem_is_mounted(const char * arg0) {
    initialize_models_once();
    (void)arg0; return filesystem_mounted;
}

uint64_t blockos_ext_filesystems_open_file(const char * arg0, uint64_t arg1) {
    initialize_models_once();
    (void)arg1;
    FileEntry *file = find_file(arg0);
    if (file == NULL) for (size_t i = 1; i < ARRAY_COUNT(files); ++i) if (!files[i].used) { files[i].used = true; text_copy(files[i].path, sizeof(files[i].path), arg0); file = &files[i]; break; }
    if (file == NULL || file->directory) return 0u;
    file->open = true; file->position = 0u; return (uint64_t)(file - files) + 1u;
}

void blockos_ext_filesystems_close_file(uint64_t arg0) {
    initialize_models_once();
    FileEntry *file = file_from_handle(arg0);
    if (file != NULL) file->open = false;
}

uint64_t blockos_ext_filesystems_read_file_bytes(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    FileEntry *file = file_from_handle(arg0);
    if (file == NULL || !file->open) return 0u;
    uint32_t available = file->size > file->position ? file->size - file->position : 0u;
    uint32_t count = arg2 < available ? (uint32_t)arg2 : available;
    bytes_copy((void *)(uintptr_t)arg1, &file->data[file->position], count); file->position += count; return count;
}

uint64_t blockos_ext_filesystems_write_file_bytes(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    FileEntry *file = file_from_handle(arg0);
    if (file == NULL || !file->open) return 0u;
    uint32_t capacity = MAX_FILE_BYTES - file->position;
    uint32_t count = arg2 < capacity ? (uint32_t)arg2 : capacity;
    bytes_copy(&file->data[file->position], (const void *)(uintptr_t)arg1, count); file->position += count; if (file->position > file->size) file->size = file->position; return count;
}

uint64_t blockos_ext_filesystems_seek_file(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    FileEntry *file = file_from_handle(arg0);
    if (file == NULL) return 0u;
    uint64_t position = arg2 == 0u ? arg1 : arg2 == 1u ? file->position + arg1 : file->size + arg1;
    file->position = position > MAX_FILE_BYTES ? MAX_FILE_BYTES : (uint32_t)position; return file->position;
}

uint64_t blockos_ext_filesystems_get_file_size(const char * arg0) {
    initialize_models_once();
    FileEntry *file = find_file(arg0);
    return file != NULL ? file->size : 0u;
}

bool blockos_ext_filesystems_file_exists(const char * arg0) {
    initialize_models_once();
    return find_file(arg0) != NULL;
}

void blockos_ext_filesystems_create_directory(const char * arg0) {
    initialize_models_once();
    if (find_file(arg0) != NULL) return;
    for (size_t i = 1; i < ARRAY_COUNT(files); ++i) if (!files[i].used) { files[i].used = true; files[i].directory = true; text_copy(files[i].path, sizeof(files[i].path), arg0); return; }
}

void blockos_ext_filesystems_remove_file(const char * arg0) {
    initialize_models_once();
    FileEntry *file = find_file(arg0);
    if (file != NULL && file != &files[0]) file->used = false;
}

uint64_t blockos_ext_filesystems_get_directory_entry_count(const char * arg0) {
    initialize_models_once();
    (void)arg0;
    uint64_t count = 0u; for (size_t i = 1; i < ARRAY_COUNT(files); ++i) if (files[i].used) ++count; return count;
}

const char * blockos_ext_filesystems_get_directory_entry_name(const char * arg0, uint64_t arg1) {
    initialize_models_once();
    (void)arg0;
    uint64_t current = 0u; for (size_t i = 1; i < ARRAY_COUNT(files); ++i) if (files[i].used) { if (current == arg1) return files[i].path; ++current; } return "";
}

void blockos_ext_filesystems_sync_all_filesystems(void) {
    initialize_models_once();
    model_message("Filesystem", "sync complete");
}

void blockos_ext_pci_and_devices_scan_pci_bus(void) {
    initialize_models_once();
    pci_device_count = 0u;
    for (uint32_t bus = 0; bus < 8u && pci_device_count < ARRAY_COUNT(pci_devices); ++bus) for (uint32_t slot = 0; slot < 32u && pci_device_count < ARRAY_COUNT(pci_devices); ++slot) {
        uint32_t id = pci_read32_raw((uint8_t)bus, (uint8_t)slot, 0u, 0u);
        if ((id & 0xFFFFu) == 0xFFFFu) continue;
        uint32_t class_value = pci_read32_raw((uint8_t)bus, (uint8_t)slot, 0u, 8u);
        pci_devices[pci_device_count++] = (PciDevice){(uint8_t)bus, (uint8_t)slot, 0u, (uint16_t)id, (uint16_t)(id >> 16u), class_value >> 8u};
    }
}

uint64_t blockos_ext_pci_and_devices_get_pci_device_count(void) {
    initialize_models_once();
    return pci_device_count;
}

uint64_t blockos_ext_pci_and_devices_get_pci_vendor_id(uint64_t arg0) {
    initialize_models_once();
    return arg0 < pci_device_count ? pci_devices[arg0].vendor : 0xFFFFu;
}

uint64_t blockos_ext_pci_and_devices_get_pci_device_id(uint64_t arg0) {
    initialize_models_once();
    return arg0 < pci_device_count ? pci_devices[arg0].device : 0xFFFFu;
}

uint64_t blockos_ext_pci_and_devices_get_pci_class_code(uint64_t arg0) {
    initialize_models_once();
    return arg0 < pci_device_count ? pci_devices[arg0].class_code : 0u;
}

uint64_t blockos_ext_pci_and_devices_get_pci_bus_number(uint64_t arg0) {
    initialize_models_once();
    return arg0 < pci_device_count ? pci_devices[arg0].bus : 0u;
}

uint64_t blockos_ext_pci_and_devices_get_pci_slot_number(uint64_t arg0) {
    initialize_models_once();
    return arg0 < pci_device_count ? pci_devices[arg0].slot : 0u;
}

uint64_t blockos_ext_pci_and_devices_get_pci_function_number(uint64_t arg0) {
    initialize_models_once();
    return arg0 < pci_device_count ? pci_devices[arg0].function : 0u;
}

uint64_t blockos_ext_pci_and_devices_read_pci_config_byte(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    if (arg0 >= pci_device_count) return 0xFFu;
    PciDevice *device = &pci_devices[arg0]; uint32_t value = pci_read32_raw(device->bus, device->slot, device->function, (uint8_t)arg1); return (value >> ((arg1 & 3u) * 8u)) & 0xFFu;
}

uint64_t blockos_ext_pci_and_devices_read_pci_config_word(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    if (arg0 >= pci_device_count) return 0xFFFFu;
    PciDevice *device = &pci_devices[arg0]; uint32_t value = pci_read32_raw(device->bus, device->slot, device->function, (uint8_t)arg1); return (value >> ((arg1 & 2u) * 8u)) & 0xFFFFu;
}

uint64_t blockos_ext_pci_and_devices_read_pci_config_dword(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    if (arg0 >= pci_device_count) return 0xFFFFFFFFu;
    PciDevice *device = &pci_devices[arg0]; return pci_read32_raw(device->bus, device->slot, device->function, (uint8_t)arg1);
}

void blockos_ext_pci_and_devices_write_pci_config_byte(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    if (arg0 >= pci_device_count) return;
    PciDevice *device = &pci_devices[arg0]; uint32_t old = pci_read32_raw(device->bus, device->slot, device->function, (uint8_t)arg1); uint32_t shift = (arg1 & 3u) * 8u; uint32_t value = (old & ~(0xFFu << shift)) | (((uint32_t)arg2 & 0xFFu) << shift); pci_write32_raw(device->bus, device->slot, device->function, (uint8_t)arg1, value);
}

void blockos_ext_pci_and_devices_write_pci_config_word(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    if (arg0 >= pci_device_count) return;
    PciDevice *device = &pci_devices[arg0]; uint32_t old = pci_read32_raw(device->bus, device->slot, device->function, (uint8_t)arg1); uint32_t shift = (arg1 & 2u) * 8u; uint32_t value = (old & ~(0xFFFFu << shift)) | (((uint32_t)arg2 & 0xFFFFu) << shift); pci_write32_raw(device->bus, device->slot, device->function, (uint8_t)arg1, value);
}

void blockos_ext_pci_and_devices_write_pci_config_dword(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    if (arg0 >= pci_device_count) return;
    PciDevice *device = &pci_devices[arg0]; pci_write32_raw(device->bus, device->slot, device->function, (uint8_t)arg1, (uint32_t)arg2);
}

void blockos_ext_pci_and_devices_enable_pci_bus_mastering(uint64_t arg0) {
    initialize_models_once();
    if (arg0 >= pci_device_count) return;
    PciDevice *device = &pci_devices[arg0]; uint32_t command = pci_read32_raw(device->bus, device->slot, device->function, 4u); command |= 4u; pci_write32_raw(device->bus, device->slot, device->function, 4u, command);
}

void blockos_ext_usb_initialize_usb_subsystem(void) {
    initialize_models_once();
    usb_initialized = true;
}

uint64_t blockos_ext_usb_get_usb_controller_count(void) {
    initialize_models_once();
    uint64_t count = 0u; for (size_t i = 0; i < pci_device_count; ++i) if ((pci_devices[i].class_code >> 8u) == 0x0C03u) ++count; return count;
}

uint64_t blockos_ext_usb_get_usb_device_count(void) {
    initialize_models_once();
    return usb_initialized ? 1u : 0u;
}

uint64_t blockos_ext_usb_get_usb_vendor_id(uint64_t arg0) {
    initialize_models_once();
    return usb_initialized && arg0 == 0u ? 0x1234u : 0u;
}

uint64_t blockos_ext_usb_get_usb_product_id(uint64_t arg0) {
    initialize_models_once();
    return usb_initialized && arg0 == 0u ? 0x0001u : 0u;
}

uint64_t blockos_ext_usb_get_usb_class_code(uint64_t arg0) {
    initialize_models_once();
    return usb_initialized && arg0 == 0u ? 3u : 0u;
}

uint64_t blockos_ext_usb_get_usb_address(uint64_t arg0) {
    initialize_models_once();
    return usb_initialized && arg0 == 0u ? 1u : 0u;
}

uint64_t blockos_ext_usb_configure_usb_device(uint64_t arg0) {
    initialize_models_once();
    return usb_initialized && arg0 == 0u ? 1u : 0u;
}

uint64_t blockos_ext_usb_reset_usb_device(uint64_t arg0) {
    initialize_models_once();
    return usb_initialized && arg0 == 0u ? 1u : 0u;
}

uint64_t blockos_ext_usb_submit_usb_control_transfer(uint64_t arg0, uint64_t arg1, uint64_t arg2, uint64_t arg3, uint64_t arg4) {
    initialize_models_once();
    (void)arg0; (void)arg1; (void)arg2; (void)arg3;
    for (size_t i = 1; i < ARRAY_COUNT(usb_transfers); ++i) if (!usb_transfers[i].used) { usb_transfers[i].used = true; usb_transfers[i].bytes = arg4; return i; } return 0u;
}

uint64_t blockos_ext_usb_submit_usb_bulk_transfer(uint64_t arg0, uint64_t arg1, uint64_t arg2, uint64_t arg3) {
    initialize_models_once();
    (void)arg0; (void)arg1; (void)arg2;
    for (size_t i = 1; i < ARRAY_COUNT(usb_transfers); ++i) if (!usb_transfers[i].used) { usb_transfers[i].used = true; usb_transfers[i].bytes = arg3; return i; } return 0u;
}

void blockos_ext_usb_cancel_usb_transfer(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(usb_transfers)) usb_transfers[arg0].cancelled = true;
}

uint64_t blockos_ext_usb_wait_for_usb_transfer(uint64_t arg0) {
    initialize_models_once();
    return arg0 < ARRAY_COUNT(usb_transfers) && usb_transfers[arg0].used && !usb_transfers[arg0].cancelled ? 1u : 0u;
}

uint64_t blockos_ext_usb_get_usb_transfer_byte_count(uint64_t arg0) {
    initialize_models_once();
    return arg0 < ARRAY_COUNT(usb_transfers) && usb_transfers[arg0].used ? usb_transfers[arg0].bytes : 0u;
}

bool blockos_ext_usb_usb_device_is_connected(uint64_t arg0) {
    initialize_models_once();
    return usb_initialized && arg0 == 0u;
}

void blockos_ext_networking_initialize_network_stack(void) {
    initialize_models_once();
    network_initialized = true;
}

uint64_t blockos_ext_networking_get_network_interface_count(void) {
    initialize_models_once();
    return network_initialized ? 1u : 0u;
}

void blockos_ext_networking_bring_network_interface_up(uint64_t arg0) {
    initialize_models_once();
    if (network_initialized && arg0 == 0u) network_up = true;
}

void blockos_ext_networking_bring_network_interface_down(uint64_t arg0) {
    initialize_models_once();
    if (arg0 == 0u) network_up = false;
}

bool blockos_ext_networking_network_interface_is_up(uint64_t arg0) {
    initialize_models_once();
    return arg0 == 0u && network_up;
}

void blockos_ext_networking_set_ipv4_address(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    if (arg0 == 0u) ipv4_address = arg1;
}

uint64_t blockos_ext_networking_get_ipv4_address(uint64_t arg0) {
    initialize_models_once();
    return arg0 == 0u ? ipv4_address : 0u;
}

void blockos_ext_networking_set_ipv4_subnet_mask(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    if (arg0 == 0u) ipv4_mask = arg1;
}

void blockos_ext_networking_set_ipv4_gateway(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    if (arg0 == 0u) ipv4_gateway = arg1;
}

uint64_t blockos_ext_networking_send_ethernet_frame(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    if (!network_up || arg0 != 0u) return 0u;
    uint32_t count = arg2 > MAX_PACKET_BYTES ? MAX_PACKET_BYTES : (uint32_t)arg2; bytes_copy(network_packet, (const void *)(uintptr_t)arg1, count); network_packet_size = count; return count;
}

uint64_t blockos_ext_networking_receive_ethernet_frame(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    if (!network_up || arg0 != 0u) return 0u;
    uint32_t count = arg2 < network_packet_size ? (uint32_t)arg2 : network_packet_size; bytes_copy((void *)(uintptr_t)arg1, network_packet, count); network_packet_size = 0u; return count;
}

uint64_t blockos_ext_networking_open_udp_socket(uint64_t arg0) {
    initialize_models_once();
    for (size_t i = 1; i < ARRAY_COUNT(udp_sockets); ++i) if (!udp_sockets[i].used) { udp_sockets[i].used = true; udp_sockets[i].port = arg0; return i; } return 0u;
}

uint64_t blockos_ext_networking_send_udp_packet(uint64_t arg0, uint64_t arg1, uint64_t arg2, uint64_t arg3, uint64_t arg4) {
    initialize_models_once();
    (void)arg1; (void)arg2;
    if (arg0 >= ARRAY_COUNT(udp_sockets) || !udp_sockets[arg0].used) return 0u;
    uint32_t count = arg4 > MAX_PACKET_BYTES ? MAX_PACKET_BYTES : (uint32_t)arg4; bytes_copy(network_packet, (const void *)(uintptr_t)arg3, count); network_packet_size = count; return count;
}

uint64_t blockos_ext_networking_receive_udp_packet(uint64_t arg0, uint64_t arg1, uint64_t arg2) {
    initialize_models_once();
    if (arg0 >= ARRAY_COUNT(udp_sockets) || !udp_sockets[arg0].used) return 0u;
    uint32_t count = arg2 < network_packet_size ? (uint32_t)arg2 : network_packet_size; bytes_copy((void *)(uintptr_t)arg1, network_packet, count); network_packet_size = 0u; return count;
}

void blockos_ext_networking_close_network_socket(uint64_t arg0) {
    initialize_models_once();
    if (arg0 < ARRAY_COUNT(udp_sockets)) udp_sockets[arg0].used = false;
}

void blockos_ext_audio_initialize_audio_subsystem(void) {
    initialize_models_once();
    audio_initialized = true;
}

uint64_t blockos_ext_audio_get_audio_device_count(void) {
    initialize_models_once();
    return audio_initialized ? 1u : 0u;
}

void blockos_ext_audio_set_master_volume(uint64_t arg0) {
    initialize_models_once();
    master_volume = arg0 > 100u ? 100u : arg0;
}

uint64_t blockos_ext_audio_get_master_volume(void) {
    initialize_models_once();
    return master_volume;
}

void blockos_ext_audio_set_audio_muted(bool arg0) {
    initialize_models_once();
    audio_muted = arg0;
}

bool blockos_ext_audio_audio_is_muted(void) {
    initialize_models_once();
    return audio_muted;
}

void blockos_ext_audio_set_audio_sample_rate(uint64_t arg0) {
    initialize_models_once();
    audio_sample_rate = arg0;
}

uint64_t blockos_ext_audio_get_audio_sample_rate(void) {
    initialize_models_once();
    return audio_sample_rate;
}

void blockos_ext_audio_play_audio_tone(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    if (!audio_initialized || audio_muted || arg0 == 0u) return;
    uint32_t divisor = (uint32_t)(1193182u / arg0);
    port_write8(0x43u, 0xB6u); port_write8(0x42u, (uint8_t)divisor); port_write8(0x42u, (uint8_t)(divisor >> 8u));
    uint8_t speaker = port_read8(0x61u); port_write8(0x61u, speaker | 3u);
    uint64_t start = read_tsc(); while (read_tsc() - start < arg1 * 1000000u) __asm__ volatile("pause");
    port_write8(0x61u, speaker & (uint8_t)~3u);
}

void blockos_ext_audio_stop_audio_tone(void) {
    initialize_models_once();
    port_write8(0x61u, port_read8(0x61u) & (uint8_t)~3u);
}

uint64_t blockos_ext_audio_submit_audio_buffer(uint64_t arg0, uint64_t arg1) {
    initialize_models_once();
    (void)arg0; if (!audio_paused) audio_playback_position += arg1; return arg1;
}

bool blockos_ext_audio_audio_buffer_space_available(void) {
    initialize_models_once();
    return !audio_paused;
}

uint64_t blockos_ext_audio_get_audio_playback_position(void) {
    initialize_models_once();
    return audio_playback_position;
}

void blockos_ext_audio_pause_audio_playback(void) {
    initialize_models_once();
    audio_paused = true;
}

void blockos_ext_audio_resume_audio_playback(void) {
    initialize_models_once();
    audio_paused = false;
}

void blockos_ext_debug_and_information_write_debug_text(const char * arg0) {
    initialize_models_once();
    screen_print("[debug] "); screen_print(arg0); screen_print("\n");
}

void blockos_ext_debug_and_information_write_debug_number(uint64_t arg0) {
    initialize_models_once();
    screen_print("[debug] "); screen_print_i64((int64_t)arg0); screen_print("\n");
}

void blockos_ext_debug_and_information_set_debug_log_level(uint64_t arg0) {
    initialize_models_once();
    debug_log_level = arg0;
}

uint64_t blockos_ext_debug_and_information_get_debug_log_level(void) {
    initialize_models_once();
    return debug_log_level;
}

void blockos_ext_debug_and_information_begin_trace_event(const char * arg0) {
    initialize_models_once();
    screen_print("[trace begin] "); screen_print(arg0); screen_print("\n");
}

void blockos_ext_debug_and_information_end_trace_event(const char * arg0) {
    initialize_models_once();
    screen_print("[trace end] "); screen_print(arg0); screen_print("\n");
}

void blockos_ext_debug_and_information_assert_condition(bool arg0, const char * arg1) {
    initialize_models_once();
    if (!arg0) { last_error = 0xA55Eu; screen_print("[assert failed] "); screen_print(arg1); screen_print("\n"); }
}

uint64_t blockos_ext_debug_and_information_get_last_error_code(void) {
    initialize_models_once();
    return last_error;
}

void blockos_ext_debug_and_information_clear_last_error(void) {
    initialize_models_once();
    last_error = 0u;
}

void blockos_ext_debug_and_information_trigger_debugger_breakpoint(void) {
    initialize_models_once();
    model_message("Debug", "breakpoint requested"); last_error = 3u;
}

uint64_t blockos_ext_debug_and_information_get_kernel_build_number(void) {
    initialize_models_once();
    return 3u;
}

const char * blockos_ext_debug_and_information_get_architecture_name(void) {
    initialize_models_once();
    return "x86_64";
}

const char * blockos_ext_debug_and_information_get_compiler_name(void) {
    initialize_models_once();
    return "Clang freestanding";
}

const char * blockos_ext_debug_and_information_get_runtime_version(void) {
    initialize_models_once();
    return "BlockOS runtime 0.3";
}

void blockos_ext_debug_and_information_dump_system_state(void) {
    initialize_models_once();
    screen_print("[state] hostname="); screen_print(hostname); screen_print(" processes=");
    uint64_t count = 0u; for (size_t i = 0; i < ARRAY_COUNT(processes); ++i) if (processes[i].used) ++count;
    screen_print_i64((int64_t)count); screen_print(" heap="); screen_print_i64((int64_t)heap_offset); screen_print(" bytes\n");
}
