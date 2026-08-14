# os_comment

**Type:** os_comment

**Description:** Adds a C comment for people reading the generated source. It has no runtime effect.

## Generated C Example

```c
// explanation
```

## Composition example

```c
#include <stdint.h>
#include <stdbool.h>

void example(void) {
    // explanation
}
```

## Recursion example

```c
static void recurse_example(int n) {
    if (n <= 0) return;
    // explanation
    recurse_example(n-1);
}
```

## Notes

- This example shows how the block composes into generated C. Check runtime function prototypes before calling from kernel code.
