<!-- auto-generated -->
# osx_processes_get_process_priority

**Type:** `osx_processes_get_process_priority`

**Display label:** get process priority process id

**Kind:** number value

**Category:** Processes

## Arguments

- **process id** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_processes_get_process_priority(/* process id */)
```

## Runtime prototype

```c
uint64_t blockos_ext_processes_get_process_priority(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_get_process_priority(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
