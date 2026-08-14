<!-- auto-generated -->
# osx_processes_wait_for_process

**Type:** `osx_processes_wait_for_process`

**Display label:** wait for process process id

**Kind:** number value

**Category:** Processes

## Arguments

- **process id** (number) — input slot 1

## Generated C expression

```c
(uint64_t) blockos_ext_processes_wait_for_process(/* process id */)
```

## Runtime prototype

```c
uint64_t blockos_ext_processes_wait_for_process(uint64_t);
```

## Composition example

```c
void kernel_main(void) {
    uint64_t result = blockos_ext_processes_wait_for_process(0);
    (void)result;
}
```

## Notes

- This block is part of the BlockOS x86_64 runtime capability layer.
- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.
- The display label is generated from the block `message0` template.
