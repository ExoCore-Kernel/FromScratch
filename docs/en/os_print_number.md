# os_print_number

**Type:** os_print_number

**Description:** Converts a signed integer to decimal characters and prints it.

## Generated C Example

```c
screen_print_i64((int64_t)value);
```

## Runtime function

- Symbol: `screen_print_i64`

- Implementation file: /Users/shsh/Documents/github/Blockly_os/FromScratch/kernel/extensions_runtime.c

```c
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
```

**Included headers:**

- stdbool.h
- stddef.h
- stdint.h

## Composition example

```c
#include <stdint.h>
#include <stdbool.h>

void example(void) {
    screen_print_i64((int64_t)value);
}
```

## Recursion example

```c
static void recurse_example(int n) {
    if (n <= 0) return;
    screen_print_i64((int64_t)value);
    recurse_example(n-1);
}
```

## Notes

- This example shows how the block composes into generated C. Check runtime function prototypes before calling from kernel code.
