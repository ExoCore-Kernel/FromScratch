#include "linux.h"

static uint64_t last_error;
size_t linux_strlen(const char *text) {
    size_t size = 0;
    if (text)
        while (text[size])
            ++size;
    return size;
}
long linux_result(long result) {
    if (result < 0 && result >= -4095)
        last_error = (uint64_t)-result;
    return result;
}
void linux_set_error(uint64_t code) { last_error = code; }
uint64_t linux_get_error(void) { return last_error; }
void linux_write_text(const char *text) {
    size_t size = linux_strlen(text);
    while (size) {
        long count = LINUX3(1, 1, text, size);
        if (count == -4)
            continue;
        if (count <= 0) {
            linux_result(count);
            break;
        }
        text += count;
        size -= (size_t)count;
    }
}
void linux_sleep_ms(uint64_t milliseconds) {
    struct linux_timespec request = {(int64_t)(milliseconds / 1000u),
                                     (int64_t)(milliseconds % 1000u) * 1000000};
    struct linux_timespec remaining;
    while (LINUX2(35, &request, &remaining) == -4)
        request = remaining;
}
uint64_t linux_monotonic_ns(void) {
    struct linux_timespec time = {0, 0};
    linux_result(LINUX2(228, 1, &time));
    return (uint64_t)time.seconds * 1000000000u + (uint64_t)time.nanoseconds;
}
void *linux_map(size_t bytes) {
    long memory = linux_result(linux_call(9, 0, (long)bytes, 3, 0x22, -1, 0));
    return memory < 0 && memory >= -4095 ? NULL : (void *)(uintptr_t)memory;
}
void linux_unmap(void *memory, size_t bytes) {
    if (memory)
        linux_result(LINUX2(11, memory, bytes));
}
size_t linux_read_text(const char *path, char *buffer, size_t capacity) {
    if (!capacity)
        return 0;
    long fd = linux_result(LINUX3(2, path, 0, 0));
    size_t size = 0;
    if (fd >= 0) {
        while (size + 1 < capacity) {
            long count = LINUX3(0, fd, buffer + size, capacity - size - 1);
            if (count == -4)
                continue;
            if (count <= 0) {
                linux_result(count);
                break;
            }
            size += (size_t)count;
        }
        LINUX1(3, fd);
    }
    buffer[size] = '\0';
    return size;
}
void linux_shutdown(bool restart) {
    LINUX0(162); // sync
    linux_result(LINUX4(169, 0xfee1dead, 672274793, restart ? 0x1234567 : 0x4321fedc, 0));
}

static void load_graphics_drivers(void) {
    static char manifest[4096];
    linux_read_text("/drivers/manifest", manifest, sizeof(manifest));
    char *name = manifest;
    for (char *cursor = manifest; *cursor; ++cursor) {
        if (*cursor != '\n')
            continue;
        *cursor = '\0';
        long fd = LINUX3(2, name, 0, 0);
        if (fd >= 0) {
            long result = LINUX3(313, fd, "", 0); // finit_module
            if (result < 0 && result != -17) {
                linux_result(result);
                linux_write_text("[Linux] driver failed: ");
                linux_write_text(name);
                linux_write_text("\n");
            }
            LINUX1(3, fd);
        }
        name = cursor + 1;
    }
}

void blockos_runtime_init(void);
void blockos_main(void);

void blockos_linux_start(void) {
    // PID 1 mounts the guest filesystems and supervises the block program.
    LINUX5(165, "devtmpfs", "/dev", "devtmpfs", 0, 0);
    LINUX5(165, "proc", "/proc", "proc", 0, 0);
    LINUX5(165, "sysfs", "/sys", "sysfs", 0, 0);
    LINUX5(165, "tmpfs", "/tmp", "tmpfs", 0, "mode=1777");
    long console = LINUX3(2, "/dev/ttyS0", 2, 0);
    if (console < 0)
        console = LINUX3(2, "/dev/console", 2, 0);
    if (console >= 0)
        for (long fd = 0; fd <= 2; ++fd)
            if (console != fd)
                LINUX2(33, console, fd);
    // Raw serial input: commands are echoed and edited by the block console.
    struct {
        uint32_t input, output, control, local;
        uint8_t line, chars[19];
    } termios;
    if (LINUX3(16, 0, 0x5401, &termios) == 0) {
        termios.input &= ~(256u | 1024u | 64u);
        termios.output &= ~1u;
        termios.local &= ~(2u | 8u | 1u);
        termios.chars[5] = 0;
        termios.chars[6] = 1;
        LINUX3(16, 0, 0x5402, &termios);
    }
    load_graphics_drivers();
    long child = linux_result(LINUX0(57)); // fork
    if (child == 0) {
        blockos_runtime_init();
        blockos_main();
        linux_write_text("[FromScratch Linux] program finished\n");
        LINUX1(60, 0);
    }
    if (child < 0)
        linux_write_text("[FromScratch Linux] cannot start block program\n");
    for (;;) {
        int status = 0;
        long pid = LINUX4(61, -1, &status, 0, 0);
        if (pid == child && status)
            linux_write_text("[FromScratch Linux] block program exited with an error\n");
        if (pid < 0)
            linux_sleep_ms(100);
    }
}
