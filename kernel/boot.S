/* Linux x86_64 process entry; the kernel supplies the user stack. */
.section .text
.global _start
.type _start, @function
_start:
    xor %rbp, %rbp
    and $-16, %rsp
    call blockos_linux_start
    ud2
.section .note.GNU-stack,"",@progbits
