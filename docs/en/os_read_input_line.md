# os_read_input_line

**Type:** os_read_input_line

**Description:** Returns the latest completed serial line and marks it as consumed.

## Generated C Example

```c
blockos_console_read_line()
```

## Runtime function

- Symbol: `blockos_console_read_line`

- Implementation file: /Users/shsh/Documents/github/Blockly_os/FromScratch/kernel/runtime.c

```c

        if ((uint8_t)value < 32u) continue;

        if (console_input_length + 1u < BLOCKOS_INPUT_LINE_SIZE) {
            console_input_line[console_input_length++] = value;
            display_character(value);
        }
    }
}

bool blockos_console_line_available(void) {
    blockos_console_poll_line();
    return console_input_ready;
}

const char *blockos_console_read_line(void) {
    blockos_console_poll_line();
    if (!console_input_ready) return "";

    console_input_ready = false;
    console_input_length = 0u;
    return console_input_line;
}

bool blockos_string_equal_ignore_case(const char *left, const char *right) {
    if (left == NULL || right == NULL) return left == right;

    while (*left != '\0' && *right != '\0') {
        if (blockos_ascii_lower(*left) != blockos_ascii_lower(*right)) return false;
        ++left;
```

## Composition example

```c
#include <stdint.h>
#include <stdbool.h>

void example(void) {
    blockos_console_read_line()
}
```

## Recursion example

```c
static void recurse_example(int n) {
    if (n <= 0) return;
    blockos_console_read_line()
    recurse_example(n-1);
}
```

## Notes

- This example shows how the block composes into generated C. Check runtime function prototypes before calling from kernel code.
