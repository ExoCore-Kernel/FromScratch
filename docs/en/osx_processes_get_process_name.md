<!-- auto-generated -->
# osx_processes_get_process_name

**Type:** `osx_processes_get_process_name`

**Display label:** get process name process id

**Kind:** string value

**Category:** Processes

## Arguments

- **process id** (number) — input slot 1

## Generated C expression

```c
(const char *) blockos_ext_processes_get_process_name(/* process id */)
```

## Runtime prototype

```c
const char * blockos_ext_processes_get_process_name(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_get_process_name(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
