.set MB2_MAGIC, 0xE85250D6
.set MB2_ARCH, 0
.set MB2_LENGTH, multiboot_header_end - multiboot_header
.set MB2_CHECKSUM, -(MB2_MAGIC + MB2_ARCH + MB2_LENGTH)

.section .multiboot,"a"
.align 8
multiboot_header:
.long MB2_MAGIC
.long MB2_ARCH
.long MB2_LENGTH
.long MB2_CHECKSUM

/* Request a 1024x768 32-bit framebuffer from GRUB. */
.short 5
.short 0
.long 20
.long 1024
.long 768
.long 32
.align 8

.short 0
.short 0
.long 8
multiboot_header_end:

.section .bss
.align 4096
pml4_table:
.skip 4096
pdpt_table:
.skip 4096
page_directories:
.skip 16384

.align 16
stack_bottom:
.skip 65536
stack_top:

.section .data
.align 8
multiboot_info_pointer:
.quad 0

.section .rodata
.align 8
gdt64:
.quad 0x0000000000000000
.quad 0x00AF9A000000FFFF
gdt64_end:
gdt64_pointer:
.word gdt64_end - gdt64 - 1
.quad gdt64

.section .text
.code32
.global _start
.type _start, @function
.extern blockos_runtime_init
.extern kernel_main
_start:
    cli
    movl %ebx, multiboot_info_pointer
    movl $stack_top, %esp
    xorl %ebp, %ebp

    /* Clear the paging structures. */
    movl $pml4_table, %edi
    xorl %eax, %eax
    movl $(4096 + 4096 + 16384) / 4, %ecx
    rep stosl

    /* PML4[0] -> PDPT. */
    movl $pdpt_table, %eax
    orl $0x3, %eax
    movl %eax, pml4_table

    /* PDPT entries 0..3 -> four page directories. */
    xorl %ecx, %ecx
1:
    movl %ecx, %eax
    shll $12, %eax
    addl $page_directories, %eax
    orl $0x3, %eax
    movl %eax, pdpt_table(,%ecx,8)
    incl %ecx
    cmpl $4, %ecx
    jne 1b

    /* Identity-map the first 4 GiB using 2 MiB pages. */
    xorl %ecx, %ecx
2:
    movl %ecx, %eax
    shll $21, %eax
    orl $0x83, %eax
    movl %eax, page_directories(,%ecx,8)
    movl $0, page_directories+4(,%ecx,8)
    incl %ecx
    cmpl $2048, %ecx
    jne 2b

    movl $pml4_table, %eax
    movl %eax, %cr3

    movl %cr4, %eax
    orl $(1 << 5), %eax
    movl %eax, %cr4

    movl $0xC0000080, %ecx
    rdmsr
    orl $(1 << 8), %eax
    wrmsr

    movl %cr0, %eax
    orl $(1 << 31), %eax
    movl %eax, %cr0

    lgdt gdt64_pointer
    ljmp $0x08, $long_mode_start

.code64
long_mode_start:
    movw $0, %ax
    movw %ax, %ds
    movw %ax, %es
    movw %ax, %ss
    movw %ax, %fs
    movw %ax, %gs
    leaq stack_top(%rip), %rsp
    xorq %rbp, %rbp
    movq multiboot_info_pointer(%rip), %rdi
    call blockos_runtime_init
    call kernel_main
3:
    cli
    hlt
    jmp 3b
.size _start, . - _start
