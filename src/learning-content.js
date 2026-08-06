import {extensionCategories} from './blocks/block-catalog.js';

const coreCategories = [
  {
    name: 'Kernel basics',
    colour: 275,
    blocks: [
      {type: 'os_start', label: 'when kernel starts', kind: 'statement', args: [], generatedC: 'void kernel_main(void) {\n    /* connected blocks */\n}', description: 'Defines the one kernel entry point called after the boot code has prepared the x86_64 environment.'},
      {type: 'os_halt', label: 'halt CPU', kind: 'cmd', args: [], generatedC: 'cpu_halt();', sourceSymbol: 'cpu_halt', description: 'Stops execution with the x86 HLT instruction. The machine remains halted until an interrupt or reset, depending on interrupt state.'},
      {type: 'os_wait_interrupt', label: 'wait for interrupt', kind: 'cmd', args: [], generatedC: 'cpu_wait_for_interrupt();', sourceSymbol: 'cpu_wait_for_interrupt', description: 'Puts the processor into a low-work wait state until an interrupt arrives.'},
    ],
  },
  {
    name: 'Screen basics',
    colour: 165,
    blocks: [
      {type: 'os_print_text', label: 'print text', kind: 'cmd', args: [{name: 'text', type: 'String'}], generatedC: 'screen_print_line(text);', sourceSymbol: 'screen_print_line', description: 'Draws a string using the built-in framebuffer console and then advances to a new line.'},
      {type: 'os_print_number', label: 'print number', kind: 'cmd', args: [{name: 'value', type: 'Number'}], generatedC: 'screen_print_i64((int64_t)value);', sourceSymbol: 'screen_print_i64', description: 'Converts a signed integer to decimal characters and prints it.'},
      {type: 'os_clear_screen', label: 'clear screen with colour', kind: 'cmd', args: [{name: 'colour', type: 'Number'}], generatedC: 'screen_clear((uint32_t)colour);', sourceSymbol: 'screen_clear', description: 'Fills the complete framebuffer with one RGB colour and resets the text cursor.'},
      {type: 'os_set_pixel', label: 'set pixel', kind: 'cmd', args: [{name: 'x', type: 'Number'}, {name: 'y', type: 'Number'}, {name: 'colour', type: 'Number'}], generatedC: 'screen_set_pixel((int32_t)x, (int32_t)y, (uint32_t)colour);', sourceSymbol: 'screen_set_pixel', description: 'Writes one pixel after checking the framebuffer boundaries and active clipping rectangle.'},
      {type: 'os_colour', label: 'colour', kind: 'num', args: [], generatedC: '0x2563EBu', description: 'Compiles a six-digit RGB colour into a 24-bit integer value.'},
    ],
  },
  {
    name: 'Flow',
    colour: 120,
    blocks: [
      {type: 'os_forever', label: 'forever', kind: 'statement', args: [], generatedC: 'for (;;) {\n    /* body */\n}', description: 'Generates an infinite C loop. It will monopolise the current execution path unless its body waits, yields, or returns control through a scheduler.'},
      {type: 'os_while', label: 'while', kind: 'statement', args: [{name: 'condition', type: 'Boolean'}], generatedC: 'while (condition) {\n    /* body */\n}', description: 'Repeats its body while a Boolean expression remains true.'},
      {type: 'os_if', label: 'if', kind: 'statement', args: [{name: 'condition', type: 'Boolean'}], generatedC: 'if (condition) {\n    /* body */\n}', description: 'Runs its body once when the condition is true.'},
      {type: 'os_repeat', label: 'repeat times', kind: 'statement', args: [{name: 'count', type: 'Number'}], generatedC: 'for (uint64_t i = 0; i < (uint64_t)count; ++i) {\n    /* body */\n}', description: 'Generates a counted loop with a private 64-bit loop index.'},
    ],
  },
  {
    name: 'Values',
    colour: 45,
    blocks: [
      {type: 'os_text', label: 'text', kind: 'text', args: [], generatedC: '"Hello"', description: 'Creates a constant, null-terminated C string.'},
      {type: 'os_join_text', label: 'join text', kind: 'text', args: [{name: 'left', type: 'String'}, {name: 'right', type: 'String'}], generatedC: 'blockos_string_join(left, right)', sourceSymbol: 'blockos_string_join', description: 'Copies two strings into a rotating runtime buffer and returns the combined text.'},
      {type: 'os_text_equals_ignore_case', label: 'text equals ignoring case', kind: 'bool', args: [{name: 'left', type: 'String'}, {name: 'right', type: 'String'}], generatedC: 'blockos_string_equal_ignore_case(left, right)', sourceSymbol: 'blockos_string_equal_ignore_case', description: 'Compares ASCII letters without treating uppercase and lowercase as different.'},
      {type: 'os_input_line_available', label: 'input command line available', kind: 'bool', args: [], generatedC: 'blockos_console_line_available()', sourceSymbol: 'blockos_console_line_available', description: 'Polls the serial input queue and reports whether a complete newline-terminated command is ready.'},
      {type: 'os_read_input_line', label: 'read input command line', kind: 'text', args: [], generatedC: 'blockos_console_read_line()', sourceSymbol: 'blockos_console_read_line', description: 'Returns the latest completed serial line and marks it as consumed.'},
      {type: 'os_number', label: 'number', kind: 'num', args: [], generatedC: '42', description: 'Creates an integer literal.'},
      {type: 'os_boolean', label: 'true or false', kind: 'bool', args: [], generatedC: 'true', description: 'Creates a C Boolean literal.'},
    ],
  },
  {
    name: 'Math & logic',
    colour: 220,
    blocks: [
      {type: 'os_math', label: 'arithmetic expression', kind: 'num', args: [{name: 'a', type: 'Number'}, {name: 'b', type: 'Number'}], generatedC: 'a + b', description: 'Generates integer arithmetic. Division by zero and overflow must be prevented by the program.'},
      {type: 'os_compare', label: 'compare values', kind: 'bool', args: [{name: 'a', type: 'Any'}, {name: 'b', type: 'Any'}], generatedC: 'a == b', description: 'Generates a C comparison and returns true or false.'},
      {type: 'os_logic', label: 'and/or', kind: 'bool', args: [{name: 'a', type: 'Boolean'}, {name: 'b', type: 'Boolean'}], generatedC: 'a && b', description: 'Combines conditions with short-circuit Boolean logic.'},
      {type: 'os_not', label: 'not', kind: 'bool', args: [{name: 'value', type: 'Boolean'}], generatedC: '!value', description: 'Inverts a Boolean condition.'},
    ],
  },
  {
    name: 'Variables',
    colour: 330,
    blocks: [
      {type: 'os_var_declare', label: 'create variable', kind: 'cmd', args: [{name: 'initial value', type: 'Typed value'}], generatedC: 'uint64_t counter = 0;', description: 'Declares a local C variable in the current function or block scope.'},
      {type: 'os_var_set', label: 'set variable', kind: 'cmd', args: [{name: 'value', type: 'Typed value'}], generatedC: 'counter = value;', description: 'Assigns a new value to a named variable.'},
      {type: 'os_var_get', label: 'get variable', kind: 'num', args: [], generatedC: 'counter', description: 'Reads a named variable. Its socket type follows the selected C type.'},
    ],
  },
  {
    name: 'Files & dependencies',
    colour: 25,
    blocks: [
      {type: 'os_asset_count', label: 'asset count', kind: 'num', args: [], generatedC: 'blockos_asset_count()', sourceSymbol: 'blockos_asset_count', description: 'Returns the number of files GRUB loaded as Multiboot modules.'},
      {type: 'os_asset_name', label: 'asset name', kind: 'text', args: [{name: 'index', type: 'Number'}], generatedC: 'blockos_asset_name(index)', sourceSymbol: 'blockos_asset_name', description: 'Returns the boot-module command-line name for an uploaded file.'},
      {type: 'os_asset_size', label: 'asset size', kind: 'num', args: [{name: 'index', type: 'Number'}], generatedC: 'blockos_asset_size(index)', sourceSymbol: 'blockos_asset_size', description: 'Returns an uploaded file size in bytes.'},
      {type: 'os_print_asset_text', label: 'print asset text', kind: 'cmd', args: [{name: 'index', type: 'Number'}], generatedC: 'blockos_print_asset_text(index);', sourceSymbol: 'blockos_print_asset_text', description: 'Prints an uploaded file as text. Binary files may contain unreadable bytes or embedded zeroes.'},
    ],
  },
  {
    name: 'Custom functions',
    colour: 290,
    blocks: [
      {type: 'os_function_def', label: 'define custom function', kind: 'statement', args: [], generatedC: 'static void my_block(void) {\n    /* definition blocks */\n}', description: 'Creates a reusable generated C function. Typed custom blocks add formal parameters and typed reporter blocks.'},
      {type: 'os_function_call', label: 'run custom function', kind: 'cmd', args: [], generatedC: 'my_block();', description: 'Calls a generated custom function. Arguments are evaluated before entering the function.'},
    ],
  },
  {
    name: 'Hardware basics (unsafe)',
    colour: 10,
    blocks: [
      {type: 'os_port_read8', label: 'read 8-bit I/O port', kind: 'num', args: [{name: 'port', type: 'Number'}], generatedC: 'port_read8((uint16_t)port)', sourceSymbol: 'port_read8', description: 'Runs the x86 IN instruction. Reading the wrong port can return meaningless data or interfere with hardware.'},
      {type: 'os_port_write8', label: 'write 8-bit I/O port', kind: 'cmd', args: [{name: 'port', type: 'Number'}, {name: 'value', type: 'Number'}], generatedC: 'port_write8((uint16_t)port, (uint8_t)value);', sourceSymbol: 'port_write8', description: 'Runs the x86 OUT instruction. Incorrect writes can freeze the VM or place devices into an unexpected state.'},
    ],
  },
  {
    name: 'Notes',
    colour: 60,
    blocks: [
      {type: 'os_comment', label: 'comment', kind: 'cmd', args: [], generatedC: '// explanation', description: 'Adds a C comment for people reading the generated source. It has no runtime effect.'},
    ],
  },
];

const guideData = {
  'Kernel basics': {
    tooltip: 'Learn how boot code reaches kernel_main, why a kernel must idle safely, and what HLT does.',
    level: 'Starter',
    runtimeKind: 'Hardware-backed',
    overview: [
      'A bootloader does not launch an operating system in the same way an operating system launches an app. GRUB loads the kernel image, the assembly entry code establishes a known CPU state, and BlockOS eventually calls kernel_main.',
      'The kernel entry function normally initialises memory, interrupts, devices, and higher-level services before entering an idle loop or scheduler. Returning from kernel_main is not useful because there is no parent program waiting for it.',
    ],
    prerequisites: ['C functions and call flow', 'The difference between boot firmware, bootloader, and kernel', 'Why a freestanding program has no normal operating-system services'],
    concepts: ['One entry point', 'CPU halt versus shutdown', 'Interrupt-driven idle loops', 'Boot-time initialisation order'],
    implementation: 'The start block generates kernel_main directly. The halt and wait blocks call small runtime wrappers around x86 HLT. Waiting with interrupts enabled allows the CPU to resume when a timer, keyboard, or other interrupt arrives.',
    cExample: 'void kernel_main(void) {\n    initialise_subsystems();\n    for (;;) {\n        cpu_wait_for_interrupt();\n    }\n}',
    safety: 'Do not disable interrupts and then wait for an interrupt unless you deliberately want the CPU to remain halted.',
    exercise: 'Print three boot-stage messages, then enter an interrupt-waiting idle loop.',
  },
  'Screen basics': {
    tooltip: 'Learn framebuffer coordinates, colour values, text rendering, and the cost of changing pixels.',
    level: 'Starter',
    runtimeKind: 'Hardware-backed',
    overview: [
      'The framebuffer is a region of memory whose bytes are displayed as pixels. BlockOS receives its address, width, height, pitch, and bits-per-pixel from the boot environment.',
      'Drawing is immediate-mode: a write changes framebuffer memory. Large fills touch many pixels, so redrawing a whole screen for a tiny cursor movement wastes a large amount of CPU time.',
    ],
    prerequisites: ['x/y coordinates', 'RGB hexadecimal colours', 'Arrays and memory addresses'],
    concepts: ['Framebuffer pitch', 'Pixel bounds and clipping', 'Bitmap-font text', 'Dirty rectangles and partial redraws'],
    implementation: 'Basic blocks call runtime.c framebuffer functions. Each pixel address is calculated from y × pitch plus x × bytes-per-pixel. Higher graphics blocks add clipping, region copies, saved regions, and back buffering.',
    cExample: 'uint32_t *pixel = (uint32_t *)(framebuffer + y * pitch + x * 4);\n*pixel = colour;',
    safety: 'Never write beyond the framebuffer dimensions. An unchecked pixel write can corrupt unrelated kernel memory.',
    exercise: 'Draw a coloured panel once, then animate a small marker by restoring only its previous rectangle.',
  },
  'Flow': {
    tooltip: 'Learn how visual loops and conditions become C control flow, including why one forever loop can block everything after it.',
    level: 'Starter',
    runtimeKind: 'Generated inline',
    overview: [
      'Flow blocks decide the order in which one execution path runs. They do not automatically create background work or additional threads.',
      'An infinite loop never reaches the block connected after it. Concurrent behaviour requires a scheduler, interrupts, or explicit cooperative tasks rather than several forever loops placed one after another.',
    ],
    prerequisites: ['Boolean conditions', 'Execution order', 'Variables that change over time'],
    concepts: ['Sequential execution', 'Finite and infinite loops', 'Nested control flow', 'Cooperative yielding'],
    implementation: 'These blocks generate ordinary C if, while, and for statements. The compiler does not insert scheduling points automatically.',
    cExample: 'for (;;) {\n    poll_devices();\n    scheduler_yield();\n}',
    safety: 'A tight loop without waiting or yielding can consume an entire emulated CPU and make the interface appear frozen.',
    exercise: 'Create a loop that checks input, performs one small update, and waits briefly before repeating.',
  },
  'Values': {
    tooltip: 'Learn text buffers, numeric values, Boolean values, serial command lines, and why types must match.',
    level: 'Starter',
    runtimeKind: 'Mixed',
    overview: [
      'A socket type describes the C representation expected by a block. Text is a pointer to null-terminated characters, while uptime ticks are an integer, so a number cannot connect directly to a text-only socket.',
      'Line-input blocks collect serial bytes until Enter is received. This is different from reading a single key or raw byte.',
    ],
    prerequisites: ['Basic data types', 'ASCII text', 'The difference between a value and a command'],
    concepts: ['Static socket type checking', 'String lifetime', 'Line buffering', 'Explicit number-to-text conversion'],
    implementation: 'Literal blocks compile inline. String operations and serial line input call runtime helpers with fixed-size kernel buffers.',
    cExample: 'if (blockos_console_line_available()) {\n    const char *command = blockos_console_read_line();\n}',
    safety: 'A returned text pointer may refer to a shared runtime buffer. Copy it before storing it for a long time.',
    exercise: 'Build a command parser that compares input with help and uptime without caring about letter case.',
  },
  'Math & logic': {
    tooltip: 'Learn integer arithmetic, comparisons, Boolean logic, overflow, and short-circuit evaluation.',
    level: 'Starter',
    runtimeKind: 'Generated inline',
    overview: ['Math and logic blocks become C expressions. The result is calculated when the surrounding command executes.', 'The kernel uses fixed-width integers. Values can overflow, signed and unsigned comparisons differ, and division by zero is invalid.'],
    prerequisites: ['Arithmetic order', 'True and false', 'Signed versus unsigned numbers'],
    concepts: ['Operator precedence', 'Short-circuit and/or', 'Integer overflow', 'Guarding division'],
    implementation: 'The generator adds parentheses and C operators. No floating-point runtime is currently required.',
    cExample: 'bool valid = divisor != 0 && (value / divisor) > 10;',
    safety: 'Check divisors, array indexes, dimensions, and memory sizes before arithmetic is used as an address or allocation length.',
    exercise: 'Clamp an x coordinate so it always remains between 0 and the screen width minus one.',
  },
  'Variables': {
    tooltip: 'Learn storage, scope, C types, assignment, and how shared variables become race conditions.',
    level: 'Starter',
    runtimeKind: 'Generated inline',
    overview: ['A variable names a storage location. Its type determines its size, interpretation, and valid Blockly connections.', 'Variables declared inside a generated function are local. When multiple threads can access shared state, ordinary reads and writes may need locks or atomic operations.'],
    prerequisites: ['Values and types', 'Function scope', 'Basic memory concepts'],
    concepts: ['Declaration versus assignment', 'Local scope', 'Integer widths', 'Shared mutable state'],
    implementation: 'Variable blocks generate C declarations, assignments, and identifiers. BlockOS sanitises names so they are valid C identifiers.',
    cExample: 'uint64_t frame_number = 0;\nframe_number = frame_number + 1;',
    safety: 'Choosing a type that is too small can wrap values. Sharing a variable across future real threads requires synchronization.',
    exercise: 'Track mouse x and y in signed variables and clamp both to the framebuffer bounds.',
  },
  'Files & dependencies': {
    tooltip: 'Learn how files are embedded into the boot ISO as Multiboot modules and accessed without a filesystem.',
    level: 'Intermediate',
    runtimeKind: 'Bootloader-backed',
    overview: ['Uploaded files are copied into the ISO and listed as GRUB Multiboot modules. The bootloader places each file in memory and supplies its address, size, and name to the kernel.', 'This is not yet the same as opening a file from a disk filesystem. The data is read-only boot-time memory.'],
    prerequisites: ['Memory addresses and byte lengths', 'Bootloader modules', 'Text versus binary data'],
    concepts: ['ISO contents', 'Multiboot modules', 'Read-only embedded assets', 'Later filesystem migration'],
    implementation: 'runtime.c parses Multiboot tags and records module start/end addresses. Asset blocks query that table.',
    cExample: 'uint32_t count = blockos_asset_count();\nconst char *name = blockos_asset_name(0);',
    safety: 'Do not assume an asset contains null-terminated text. Always respect its byte size when parsing binary data.',
    exercise: 'Upload a configuration text file, print its name and size, then display its contents.',
  },
  'Custom functions': {
    tooltip: 'Learn reusable functions, typed parameters, custom types, generated declarations, and call-stack behaviour.',
    level: 'Intermediate',
    runtimeKind: 'Generated inline',
    overview: ['A custom block is a real generated C function with a definition block, call block, and typed argument reporters.', 'Arguments are passed by value. Pointer arguments copy an address, while text arguments copy a pointer rather than the whole string.'],
    prerequisites: ['Variables and types', 'Function calls', 'Parameters versus local variables'],
    concepts: ['Function declarations', 'Arguments and return control', 'Call stack', 'Custom typedefs'],
    implementation: 'The generator emits a prototype before kernel_main and a static function body assembled from the definition workspace.',
    cExample: 'static void draw_label(const char *text, int64_t x, int64_t y) {\n    blockos_graphics_draw_text(x, y, text, 0xFFFFFFu);\n}',
    safety: 'Recursive custom blocks can exhaust the small kernel stack. Avoid deep or unbounded recursion.',
    exercise: 'Create a typed draw button block with x, y, width, height, label, and colour arguments.',
  },
  'Hardware basics (unsafe)': {
    tooltip: 'Learn x86 port-mapped I/O, device registers, polling, and why incorrect hardware access can freeze the VM.',
    level: 'Advanced',
    runtimeKind: 'Hardware-backed',
    overview: ['Some x86 devices expose registers through a separate I/O-port address space. IN reads a port and OUT writes one.', 'A port number has meaning only when the chipset or device specification assigns it. There is no safety layer between the kernel and the hardware.'],
    prerequisites: ['Hexadecimal numbers', 'Device registers', 'x86 privilege levels'],
    concepts: ['Port-mapped I/O', 'Status and data registers', 'Polling loops', 'Hardware timing'],
    implementation: 'runtime.c uses inline x86 assembly for inb and outb. QEMU emulates the selected legacy devices.',
    cExample: 'uint8_t status;\n__asm__ volatile ("inb %1, %0" : "=a"(status) : "Nd"(0x64));',
    safety: 'Use these blocks only with a verified device specification and preferably inside QEMU. Wrong writes can hang the guest.',
    exercise: 'Read the PS/2 controller status register and document each tested status bit.',
  },
  'Notes': {
    tooltip: 'Learn how comments document assumptions, invariants, hardware references, and unfinished implementation work.',
    level: 'Starter',
    runtimeKind: 'No runtime code',
    overview: ['Comments explain why code exists, especially where low-level behaviour is not obvious.', 'Good kernel comments record hardware references, locking requirements, units, ownership, and assumptions rather than repeating the block label.'],
    prerequisites: ['None'],
    concepts: ['Intent', 'Invariants', 'Units and ownership', 'TODO versus completed behaviour'],
    implementation: 'Note blocks emit C line comments and have no effect on the compiled machine code.',
    cExample: '// The PS/2 status port must be checked before reading data.',
    safety: 'Do not use comments to hide uncertainty. Mark simulated, incomplete, or unsafe behaviour clearly.',
    exercise: 'Add comments describing the coordinate system and dirty-rectangle assumptions in the desktop project.',
  },
};

const extensionGuides = {
  'Kernel services': ['Kernel-wide state, panic handling, boot metadata, safe mode, and shutdown requests.', 'Intermediate', 'Learning model', ['Boot stages', 'Panic paths', 'Global kernel state', 'Orderly shutdown'], 'The capability runtime stores kernel service state in fixed in-memory structures. Shutdown and restart requests are represented for learning; a production kernel would use ACPI, chipset reset registers, or firmware interfaces.', 'static uint64_t boot_stage;\nvoid set_boot_stage(uint64_t stage) { boot_stage = stage; }', 'Triggering a panic intentionally stops normal operation. Save diagnostic state before halting.', 'Track each subsystem through named boot stages and print the stage during a simulated panic.'],
  'CPU': ['Processor identity, counters, interrupt state, cache operations, and control-register concepts.', 'Advanced', 'Mixed hardware/model', ['CPUID', 'Timestamp counter', 'Interrupt flag', 'Cache coherency'], 'Identity and timestamp operations can use real x86 instructions. Some cache and control operations are simplified because unrestricted use would be unsafe in a teaching kernel.', 'uint32_t eax, ebx, ecx, edx;\n__asm__ volatile ("cpuid" : "=a"(eax), "=b"(ebx), "=c"(ecx), "=d"(edx) : "a"(0));', 'Disabling interrupts or changing control registers can immediately crash the kernel.', 'Display CPU vendor, brand, processor count, and timestamp counter on a diagnostics page.'],
  'Interrupts': ['Interrupt descriptor tables, vectors, IRQ masking, handlers, priorities, and end-of-interrupt signalling.', 'Advanced', 'Learning model', ['IDT entries', 'Exceptions versus IRQs', 'PIC/APIC acknowledgement', 'Interrupt-safe code'], 'The current capability layer models handler registration and vector state. A complete implementation needs assembly stubs that save registers, an IDT loaded with lidt, and PIC or APIC routing.', 'struct idt_entry idt[256];\n__asm__ volatile ("lidt %0" : : "m"(idtr));', 'An incorrect handler or missing end-of-interrupt signal can cause crashes or interrupt storms.', 'Design a timer interrupt path and list exactly which registers the assembly stub must preserve.'],
  'Physical memory': ['Page frames, allocation bitmaps, reserved regions, and physical-address ownership.', 'Advanced', 'Learning model', ['4 KiB pages', 'Memory maps', 'Free lists/bitmaps', 'Contiguous allocation'], 'The teaching runtime uses a bounded page pool. A real kernel would parse the boot memory map, reserve kernel/modules/framebuffer ranges, and maintain one bit or metadata record per physical page.', '#define PAGE_SIZE 4096\nvoid *frame = allocate_page();', 'Never free memory you do not own, and never allocate pages containing the kernel, boot data, or devices.', 'Sketch a bitmap allocator and reserve the framebuffer and kernel image ranges.'],
  'Virtual memory': ['Page tables, mappings, permissions, address spaces, TLB invalidation, and page faults.', 'Advanced', 'Learning model', ['Virtual-to-physical translation', 'Four-level x86_64 tables', 'Page permissions', 'TLB'], 'The capability layer records mappings as a learning model. Real x86_64 virtual memory requires PML4/PDPT/PD/PT entries and CR3 management.', 'pte = physical | PAGE_PRESENT | PAGE_WRITABLE;\n__asm__ volatile ("invlpg (%0)" : : "r"(virtual_address) : "memory");', 'Incorrect mappings can expose memory, execute data, or triple-fault the CPU.', 'Map one read/write page, explain every page-table index, then unmap and invalidate it.'],
  'Kernel heap': ['Dynamic allocation, free blocks, alignment, fragmentation, and allocator metadata.', 'Advanced', 'In-memory implementation', ['Bump allocators', 'Free lists', 'Alignment', 'Fragmentation'], 'The teaching runtime owns a fixed kernel heap and tracks allocations in bounded metadata. A production allocator would add coalescing, size classes, corruption checks, and synchronization.', 'void *memory = heap_allocate(bytes, alignment);', 'Heap corruption often appears far from the original bug. Validate sizes and ownership before freeing.', 'Allocate differently sized objects, free them in another order, and inspect fragmentation.'],
  'Processes': ['Independent programs, address spaces, resources, lifecycle, signals, and exit status.', 'Advanced', 'Learning model', ['Process control blocks', 'Isolation', 'Parent/child lifecycle', 'Resource ownership'], 'Current process blocks update process records but do not yet load separate executables or switch address spaces. A real process needs its own page-table root and at least one runnable thread.', 'typedef struct {\n    uint64_t pid;\n    uint64_t cr3;\n    thread_t *main_thread;\n} process_t;', 'Do not describe the current model as isolation: all generated code still runs in one kernel address space.', 'Design the fields needed in a process control block and explain which are shared with its threads.'],
  'Threads': ['Runnable execution contexts, stacks, scheduling, sleeping, yielding, priorities, affinity, joining, and races.', 'Advanced', 'Learning model—not concurrent yet', ['Thread control blocks', 'Private stacks', 'Saved registers', 'Scheduler queues', 'Race conditions'], 'Current Thread blocks maintain thread records and demonstrate lifecycle APIs, but create thread does not yet switch stacks or run the entry address. Real concurrency needs a context-switch routine, timer-driven or cooperative scheduler, runnable queues, and synchronization.', 'typedef struct {\n    uint64_t rsp;\n    uint64_t registers[8];\n    uint8_t state;\n    uint8_t *stack;\n} thread_t;\n\nvoid schedule(void) {\n    thread_t *next = pick_next_runnable();\n    context_switch(current, next);\n}', 'Two threads touching the same framebuffer, allocator, or queue can corrupt state unless access is coordinated. Never hold a blocking mutex inside an interrupt handler.', 'Build a cooperative scheduler design with two task functions. Mark exactly where each task yields and what state must be saved.'],
  'Synchronization': ['Mutexes, semaphores, spinlocks, events, ownership, waiting, and deadlocks.', 'Advanced', 'Learning model', ['Critical sections', 'Atomic operations', 'Blocking versus spinning', 'Deadlock order'], 'The teaching runtime models synchronization object state. A real mutex must atomically acquire ownership and put waiting threads to sleep; a spinlock normally uses x86 atomic exchange or compare-and-swap.', 'while (__atomic_exchange_n(&lock, 1, __ATOMIC_ACQUIRE)) {\n    __asm__ volatile ("pause");\n}', 'Never sleep while holding a spinlock. Define one global lock order to avoid deadlocks.', 'Protect a shared log buffer and explain why a mutex is better than a spinlock for a long operation.'],
  'Timers and clock': ['Hardware timer ticks, monotonic time, delays, deadlines, periodic callbacks, and time conversion.', 'Intermediate', 'Mixed hardware/model', ['Monotonic clocks', 'Tick frequency', 'Busy wait versus sleep', 'Timer queues'], 'Timestamp reads can use the x86 TSC. A full scheduler clock needs a calibrated periodic interrupt such as APIC timer, HPET, or PIT and a queue of sleeping threads.', 'uint64_t deadline = now_ticks() + delay;\nwhile (now_ticks() < deadline) cpu_pause();', 'Busy waits waste CPU time. Use sleeping deadlines after a real scheduler exists.', 'Measure how many timestamp-counter ticks occur during a known QEMU delay and discuss calibration limits.'],
  'Keyboard and mouse': ['Controller status, scan codes, mouse packets, button state, movement, and input queues.', 'Intermediate', 'Hardware-backed in QEMU', ['PS/2 status/data ports', 'Scan-code decoding', 'Three-byte mouse packets', 'Event queues'], 'The desktop example polls the emulated PS/2 controller. A stronger design handles IRQ1/IRQ12, decodes packets into events, and lets applications consume a queue.', 'if (port_read8(0x64) & 1) {\n    uint8_t byte = port_read8(0x60);\n    input_queue_push(byte);\n}', 'Controller bytes can belong to either keyboard or mouse. Check status bits and packet synchronisation.', 'Convert raw mouse packets into clamped x/y coordinates and button events.'],
  'Graphics': ['Framebuffer drawing, clipping, primitives, sprites, saved regions, dirty rectangles, and back buffers.', 'Intermediate', 'Hardware-backed framebuffer', ['Pitch-aware pixels', 'Clipping', 'Dirty rectangles', 'Double buffering'], 'Graphics blocks call real framebuffer routines. Fast cursor movement saves and restores a small region instead of redrawing the complete desktop. Back-buffer operations draw off-screen and copy only changed rectangles to the visible framebuffer.', 'save_region(0, old_x, old_y, 18, 30);\nrestore_region(0, old_x, old_y);\ndraw_cursor(new_x, new_y);', 'Validate dimensions and pointer-backed bitmap sizes. Copying overlapping regions requires direction-aware memory movement.', 'Animate a window by presenting only the union of its old and new rectangles.'],
  'Text and windows': ['Text cells, fonts, cursor positions, window rectangles, z-order concepts, and UI composition.', 'Intermediate', 'Framebuffer-backed learning UI', ['Bitmap fonts', 'Layout', 'Window state', 'Damage regions'], 'Text drawing uses a bitmap font over framebuffer pixels. Window blocks model rectangles and properties; a complete compositor would track z-order, visibility, clipping, input focus, and damage.', 'draw_text(window.x + 8, window.y + 24, title, colour);', 'Redrawing overlapping windows without clipping or damage tracking causes flicker and wasted work.', 'Create two overlapping windows and calculate which rectangles must be repainted when the front window moves.'],
  'Storage devices': ['Block devices, sectors, reads/writes, capacity, flushing, and virtual disk behaviour.', 'Advanced', 'Virtual learning device', ['512-byte sectors', 'Block addressing', 'Read/write queues', 'Flush semantics'], 'The teaching runtime exposes deterministic storage state rather than a complete AHCI/NVMe driver. Real hardware needs PCI discovery, DMA buffers, command queues, and interrupt completion.', 'read_sectors(device, lba, count, buffer);', 'A wrong LBA or buffer length can corrupt data or memory. Writes should be tested on disposable images.', 'Define a block-read request structure and validate its end LBA against capacity.'],
  'Filesystems': ['Paths, directories, file handles, metadata, reads/writes, and filesystem consistency.', 'Advanced', 'In-memory learning filesystem', ['Path lookup', 'Directory entries', 'File offsets', 'On-disk consistency'], 'The runtime provides a bounded in-memory filesystem model. A disk filesystem would translate file offsets into blocks and protect metadata updates against partial writes.', 'file_t *file = fs_open("/config.txt");\nfs_read(file, buffer, length);', 'Validate paths and lengths. Never trust on-disk metadata before checking bounds and structure.', 'Design the lookup steps for /system/config.txt and state which locks each step needs.'],
  'PCI and devices': ['PCI configuration space, vendor/device IDs, BARs, capability lists, and driver matching.', 'Advanced', 'Mixed hardware/model', ['Bus/device/function addressing', 'Configuration registers', 'Base address registers', 'Driver binding'], 'PCI discovery reads configuration space and matches IDs to drivers. The learning runtime models devices; QEMU hardware can later be enumerated through legacy configuration ports or ECAM.', 'uint32_t id = pci_read32(bus, device, function, 0x00);', 'BAR probing temporarily writes all ones and must restore the original value. Incorrect configuration writes can disable a device.', 'Enumerate one PCI bus and print vendor/device IDs without changing any registers.'],
  'USB': ['Host controllers, devices, endpoints, descriptors, transfers, and enumeration.', 'Advanced', 'Learning model', ['Descriptors', 'Control endpoint zero', 'Transfer rings', 'Device addresses'], 'USB is driven by a host controller such as xHCI. A real stack must initialise controller rings, enumerate ports, request descriptors, assign addresses, and configure endpoints.', 'usb_control_transfer(device, GET_DESCRIPTOR, buffer, length);', 'USB data is untrusted external input. Validate every descriptor length before following it.', 'Write the enumeration sequence from port reset through SET_CONFIGURATION.'],
  'Networking': ['Frames, packets, addresses, checksums, queues, protocols, and network-device drivers.', 'Advanced', 'Virtual learning network', ['Ethernet frames', 'ARP', 'IPv4', 'UDP/TCP', 'Receive queues'], 'The runtime provides deterministic packet operations for learning. Real networking begins with a NIC driver, DMA descriptor rings, interrupts, and strict parsing of untrusted packets.', 'if (frame_length >= sizeof(ethernet_header_t)) {\n    handle_ethernet_frame(frame, frame_length);\n}', 'Treat every packet length and field as hostile. Bounds-check before reading protocol headers.', 'Parse an Ethernet frame and reject packets shorter than the declared IPv4 header length.'],
  'Audio': ['Sample formats, channels, buffers, playback timing, mixing, and audio-device control.', 'Advanced', 'Virtual learning audio', ['PCM samples', 'Sample rate', 'Ring buffers', 'Underruns'], 'The teaching runtime models playback state. Real output requires a PCI audio driver, DMA buffer descriptors, interrupts, and a mixer that keeps the device supplied with samples.', 'mix_samples(output, voices, frame_count);\naudio_submit(output, frame_count);', 'Incorrect sample counts or DMA addresses can read beyond buffers. Keep interrupt-time mixing bounded.', 'Generate a short square-wave buffer and calculate its period for a chosen sample rate.'],
  'Debug and information': ['Logging, assertions, counters, error state, diagnostics, and inspecting kernel behaviour.', 'Starter', 'Mixed', ['Serial logs', 'Assertions', 'Error codes', 'Observability'], 'Debug blocks record information through screen, serial, and in-memory state. Low-level debugging is most useful when messages include time, subsystem, state, and a clear failure reason.', 'debug_log("[timer] tick received");\nassert(page_address % 4096 == 0);', 'Logging from interrupt or lock-sensitive paths must not block or recursively acquire the same lock.', 'Create a debug log custom block that prefixes each line with uptime and subsystem name.'],
};

for (const [name, data] of Object.entries(extensionGuides)) {
  const [summary, level, runtimeKind, concepts, implementation, cExample, safety, exercise] = data;
  guideData[name] = {
    tooltip: `Learn ${summary.charAt(0).toLowerCase()}${summary.slice(1)}`,
    level,
    runtimeKind,
    overview: [summary, `This guide separates the current BlockOS teaching implementation from the additional mechanisms a production kernel would require.`],
    prerequisites: level === 'Starter'
      ? ['Values, variables, and control flow', 'Reading generated C']
      : ['Pointers and fixed-width integers', 'Kernel execution and memory safety', 'Reading generated C'],
    concepts,
    implementation,
    cExample,
    safety,
    exercise,
  };
}

const extensionLearningCategories = extensionCategories.map((category) => ({
  ...category,
  blocks: category.blocks.map((block) => ({
    ...block,
    description: `${block.kind === 'cmd' ? 'Performs' : 'Returns'} the “${block.label}” capability through the BlockOS runtime layer.`,
    generatedC: makeExtensionCall(block),
    sourceSymbol: block.cName,
  })),
}));

function sampleArgument(argument, index) {
  if (argument.type === 'String') return index === 0 ? '"text"' : `"${argument.name}"`;
  if (argument.type === 'Boolean') return 'true';
  return argument.name.replace(/[^A-Za-z0-9_]/g, '_') || `value_${index + 1}`;
}

function makeExtensionCall(block) {
  const argumentsText = (block.args ?? []).map(sampleArgument).join(', ');
  const call = `${block.cName}(${argumentsText})`;
  if (block.kind === 'cmd') return `${call};`;
  return call;
}

export const learningCategories = [...coreCategories.slice(0, 9), ...extensionLearningCategories, coreCategories[9]]
  .map((category) => ({...category, guide: guideData[category.name]}));

export function normalizeCategoryName(value) {
  return String(value ?? '').replace(/\s+\(\d+\)\s*$/, '').trim();
}

export const learningCategoryMap = new Map(
  learningCategories.map((category) => [category.name, {...category, guide: guideData[category.name]}]),
);

export const blockCategoryMap = new Map();
for (const category of learningCategories) {
  for (const block of category.blocks) blockCategoryMap.set(block.type, category.name);
}

export function categoryForBlock(type) {
  return blockCategoryMap.get(type) ?? (String(type).startsWith('os_custom_') ? 'Custom functions' : null);
}

export function categoryTooltip(name) {
  return learningCategoryMap.get(normalizeCategoryName(name))?.guide?.tooltip
    ?? 'Open the BlockOS Learning Center for this group.';
}

export function blockHelpUrl(type) {
  const category = categoryForBlock(type);
  if (!category) return '/learn.html';
  return `/learn.html?topic=${encodeURIComponent(category)}&block=${encodeURIComponent(type)}`;
}

export function blockResultLabel(block) {
  if (block.kind === 'cmd' || block.kind === 'statement') return 'Command/statement';
  if (block.kind === 'bool') return 'Boolean';
  if (block.kind === 'text') return 'Text';
  return 'Number';
}

export function customBlockCategory() {
  const raw = localStorage.getItem('blockos-custom-block-specs-v1');
  let specs = [];
  try { specs = JSON.parse(raw ?? '[]'); } catch {}
  return {
    name: 'Custom functions',
    specs: Array.isArray(specs) ? specs : [],
  };
}
