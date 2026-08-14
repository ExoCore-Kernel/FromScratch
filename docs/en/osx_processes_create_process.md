<!-- auto-generated -->
# osx_processes_create_process

**Type:** `osx_processes_create_process`

**Display label:** create process name entry address

**Kind:** number value

**Category:** Processes

## Arguments

- **name** (string) — input slot 1
- **entry address** (number) — input slot 2

## Generated C expression

```c
(uint64_t) blockos_ext_processes_create_process(/* name */, /* entry address */)
```

## Runtime prototype

```c
uint64_t blockos_ext_processes_create_process(const char *, uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_create_process(0, 0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
