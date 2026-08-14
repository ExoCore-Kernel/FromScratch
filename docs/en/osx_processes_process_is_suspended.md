<!-- auto-generated -->
# osx_processes_process_is_suspended

**Type:** `osx_processes_process_is_suspended`

**Display label:** process is suspended process id

**Kind:** boolean value

**Category:** Processes

## Arguments

- **process id** (number) — input slot 1

## Generated C expression

```c
(bool) blockos_ext_processes_process_is_suspended(/* process id */)
```

## Runtime prototype

```c
bool blockos_ext_processes_process_is_suspended(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_process_is_suspended(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
