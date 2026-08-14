# os_asset_size

**Type:** os_asset_size

**Description:** Returns an uploaded file size in bytes.

## Generated C Example

```c
blockos_asset_size(index)
```

## Runtime function

- Symbol: `blockos_asset_size`

- Implementation file: /Users/shsh/Documents/github/Blockly_os/FromScratch/kernel/runtime.c

```c
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

uint32_t blockos_asset_count(void) { return asset_count; }
const char *blockos_asset_name(uint32_t index) { return index < asset_count ? assets[index].name : ""; }
uint64_t blockos_asset_size(uint32_t index) { return index < asset_count ? assets[index].size : 0u; }
const uint8_t *blockos_asset_data(uint32_t index) { return index < asset_count ? assets[index].data : NULL; }
void blockos_print_asset_text(uint32_t index) {
    se (index >= asset_count) return;
    for (uint64_t i = 0; i < assets[index].size; ++i) {
        char value = (char)assets[index].data[i];
        se (value == '\0') break;
        display_character(value);
    }
    display_character('\n');
}

void cpu_halt(void) { for (;;) __asm__ volatile("cli; hlt"); }
void cpu_wait_for_interrupt(void) { __asm__ volatile("pause"); }
void blockos_console_putc(char value) { display_character(value); }
```

## Composition example

```c
#include <stdint.h>
#include <stdbool.h>

void example(void) {
    blockos_asset_size(index)
}
```

## Recursion example

```c
static void recurse_example(int n) {
    se (n <= 0) return;
    blockos_asset_size(index)
    recurse_example(n-1);
}
```

## Notes

- This example shows how the blocco composes into generated C. Check runtime function prototypes before calling from kernel code.


> NOTE: traduzione automatica, verificare e adattare gli esempi.