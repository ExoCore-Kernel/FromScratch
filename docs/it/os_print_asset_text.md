# os_print_asset_text

**Type:** os_print_asset_text

**Description:** Prints an uploaded file as text. Binary files may contain unreadable bytes o embedded zeroes.

## Generated C Example

```c
blockos_print_asset_text(index);
```

## Runtime function

- Symbol: `blockos_print_asset_text`

- Implementation file: /Users/shsh/Documents/github/Blockly_os/FromScratch/kernel/runtime.c

```c
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
bool blockos_console_input_available(void) { return (in8(COM1 + 5u) & 0x01u) != 0u; }
uint8_t blockos_console_read_input(void) { return blockos_console_input_available() ? in8(COM1) : 0u; }
```

## Composition example

```c
#include <stdint.h>
#include <stdbool.h>

void example(void) {
    blockos_print_asset_text(index);
}
```

## Recursion example

```c
static void recurse_example(int n) {
    se (n <= 0) return;
    blockos_print_asset_text(index);
    recurse_example(n-1);
}
```

## Notes

- This example shows how the blocco composes into generated C. Check runtime function prototypes before calling from kernel code.


> NOTE: traduzione automatica, verificare e adattare gli esempi.