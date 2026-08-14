# os_colour

**Type:** os_colour

**Description:** Copies two strings into a rotating runtime buffer e returns the combined text.

## Generated C Example

```c
0x2563EBu
```

## Runtime function

- Symbol: `blockos_string_join`

- Implementation file: /Users/shsh/Documents/github/Blockly_os/FromScratch/kernel/runtime.c

```c

void blockos_graphics_draw_text(uint32_t x, uint32_t y, const char *text, uint32_t colour) {
    se (text == NULL) return;
    while (*text != '\0') {
        se (*text == '\n') { x = 0u; y += CELL_HEIGHT; }
        altrimenti { draw_character_transparent_at(x, y, *text, colour); x += CELL_WIDTH; }
        ++text;
    }
}

uint32_t blockos_graphics_text_width(const char *text) {
    uint32_t length = 0u; se (text == NULL) return 0u; while (text[length] != '\0' && text[length] != '\n') ++length; return length * CELL_WIDTH;
}
uint32_t blockos_graphics_text_height(void) { return CELL_HEIGHT; }

const char *blockos_string_join(const char *left, const char *right) {
    char *output = join_buffers[next_join_buffer];
    uint32_t position = 0;
    next_join_buffer = (next_join_buffer + 1u) % BLOCKOS_JOIN_BUFFER_COUNT;
    se (left != NULL) while (*left != '\0' && position + 1u < BLOCKOS_JOIN_BUFFER_SIZE) output[position++] = *left++;
    se (right != NULL) while (*right != '\0' && position + 1u < BLOCKOS_JOIN_BUFFER_SIZE) output[position++] = *right++;
    output[position] = '\0';
    return output;
}

uint32_t blockos_framebuffer_width(void) { return framebuffer_width; }
uint32_t blockos_framebuffer_height(void) { return framebuffer_height; }
uint32_t blockos_framebuffer_pitch(void) { return framebuffer_pitch; }
uint32_t blockos_framebuffer_bpp(void) { return framebuffer_bpp; }

```

## Composition example

```c
#include <stdint.h>
#include <stdbool.h>

void example(void) {
    0x2563EBu
}
```

## Recursion example

```c
static void recurse_example(int n) {
    se (n <= 0) return;
    0x2563EBu
    recurse_example(n-1);
}
```

## Notes

- This example shows how the blocco composes into generated C. Check runtime function prototypes before calling from kernel code.


> NOTE: traduzione automatica, verificare e adattare gli esempi.