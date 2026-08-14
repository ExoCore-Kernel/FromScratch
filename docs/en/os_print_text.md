# os_print_text

**Type:** os_print_text

**Description:** Draws a string using the built-in framebuffer console and then advances to a new line.

## Generated C Example

```c
screen_print_line(text);
```

## Runtime function

- Symbol: `screen_print_line`

- Implementation file: /Users/shsh/Documents/github/Blockly_os/FromScratch/kernel/runtime.c

```c
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
```

## Composition example

```c
#include <stdint.h>
#include <stdbool.h>

void example(void) {
    screen_print_line(text);
}
```

## Recursion example

```c
static void recurse_example(int n) {
    if (n <= 0) return;
    screen_print_line(text);
    recurse_example(n-1);
}
```

## Notes

- This example shows how the block composes into generated C. Check runtime function prototypes before calling from kernel code.
