#ifndef FROMSCRATCH_LINUX_H
#define FROMSCRATCH_LINUX_H
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

// Linux x86_64 syscall ABI. No host libc or dynamic loader is required in /init.
static inline long linux_call(long number, long a, long b, long c, long d, long e, long f) {
    register long r10 __asm__("r10") = d;
    register long r8 __asm__("r8") = e;
    register long r9 __asm__("r9") = f;
    long result;
    __asm__ volatile("syscall"
                     : "=a"(result)
                     : "a"(number), "D"(a), "S"(b), "d"(c), "r"(r10), "r"(r8), "r"(r9)
                     : "rcx", "r11", "memory");
    return result;
}
#define LINUX0(n) linux_call(n, 0, 0, 0, 0, 0, 0)
#define LINUX1(n, a) linux_call(n, (long)(a), 0, 0, 0, 0, 0)
#define LINUX2(n, a, b) linux_call(n, (long)(a), (long)(b), 0, 0, 0, 0)
#define LINUX3(n, a, b, c) linux_call(n, (long)(a), (long)(b), (long)(c), 0, 0, 0)
#define LINUX4(n, a, b, c, d) linux_call(n, (long)(a), (long)(b), (long)(c), (long)(d), 0, 0)
#define LINUX5(n, a, b, c, d, e)                                                                   \
    linux_call(n, (long)(a), (long)(b), (long)(c), (long)(d), (long)(e), 0)
struct linux_timespec {
    int64_t seconds, nanoseconds;
};
size_t linux_strlen(const char *text);
long linux_result(long result);
void linux_write_text(const char *text);
void linux_sleep_ms(uint64_t milliseconds);
uint64_t linux_monotonic_ns(void);
void *linux_map(size_t bytes);
void linux_unmap(void *memory, size_t bytes);
size_t linux_read_text(const char *path, char *buffer, size_t capacity);
void linux_shutdown(bool restart);
void linux_set_error(uint64_t code);
uint64_t linux_get_error(void);
#endif
