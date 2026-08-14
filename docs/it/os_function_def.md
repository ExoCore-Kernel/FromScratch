# os_function_def

**Type:** os_function_def

**Description:** Runs the x86 IN instruction. Reading the wrong port can return meaningless data o interfere with hardware.

## Generated C Example

```c
static void my_block(void) {\n    /* definition blocchi */\n}
```

## Runtime function

- Symbol: `port_read8`

- Implementation file: /Users/shsh/Documents/github/Blockly_os/FromScratch/kernel/extensions_runtime.c

```c
/*
 * BlockOS capability runtime.
 *
 * Hardware-independent services are real in-memory kernel implementations.
 * Hardware that QEMU does not expose to this tiny starter kernel is represented
 * by deterministic virtual devices, so every visual blocco has useful behaviour
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
```

## Composition example

```c
#include <stdint.h>
#include <stdbool.h>

void example(void) {
    static void my_block(void) {\n    /* definition blocchi */\n}
}
```

## Recursion example

```c
static void recurse_example(int n) {
    se (n <= 0) return;
    static void my_block(void) {\n    /* definition blocchi */\n}
    recurse_example(n-1);
}
```

## Notes

- This example shows how the blocco composes into generated C. Check runtime function prototypes before calling from kernel code.


> NOTE: traduzione automatica, verificare e adattare gli esempi.