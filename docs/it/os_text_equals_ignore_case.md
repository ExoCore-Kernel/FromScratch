# os_text_equals_ignore_case

**Type:** os_text_equals_ignore_case

**Description:** Compares ASCII letters without treating uppercase e lowercase as different.

## Generated C Example

```c
blockos_string_equal_ignore_case(left, right)
```

## Runtime function

- Symbol: `blockos_string_equal_ignore_case`

- Implementation file: /Users/shsh/Documents/github/Blockly_os/FromScratch/kernel/runtime.c

```c

bool blockos_console_line_available(void) {
    blockos_console_poll_line();
    return console_input_ready;
}

const char *blockos_console_read_line(void) {
    blockos_console_poll_line();
    se (!console_input_ready) return "";

    console_input_ready = falso;
    console_input_length = 0u;
    return console_input_line;
}

bool blockos_string_equal_ignore_case(const char *left, const char *right) {
    se (left == NULL || right == NULL) return left == right;

    while (*left != '\0' && *right != '\0') {
        se (blockos_ascii_lower(*left) != blockos_ascii_lower(*right)) return falso;
        ++left;
        ++right;
    }

    return *left == '\0' && *right == '\0';
}

void blockos_console_set_cursor(uint32_t x, uint32_t y) {
    cursor_x = x < framebuffer_width ? x : framebuffer_width - 1u;
    cursor_y = y < framebuffer_height ? y : framebuffer_height - 1u;
```

## Composition example

```c
#include <stdint.h>
#include <stdbool.h>

void example(void) {
    blockos_string_equal_ignore_case(left, right)
}
```

## Recursion example

```c
static void recurse_example(int n) {
    se (n <= 0) return;
    blockos_string_equal_ignore_case(left, right)
    recurse_example(n-1);
}
```

## Notes

- This example shows how the blocco composes into generated C. Check runtime function prototypes before calling from kernel code.


> NOTE: traduzione automatica, verificare e adattare gli esempi.