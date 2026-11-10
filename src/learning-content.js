import {extensionCategories} from './blocks/block-catalog.js';

const coreCategories = [
  {
    name: 'Linux program',
    colour: 275,
    blocks: [
      {type: 'os_start', label: 'when Linux starts', kind: 'statement', args: [], generatedC: 'void blockos_main(void) {\n    /* connected blocks */\n}', description: 'Defines the startup function called in a Linux process supervised by /init.'},
      {type: 'os_halt', label: 'stop this program', kind: 'cmd', args: [], generatedC: 'cpu_halt();', sourceSymbol: 'cpu_halt', description: 'Exits this Linux process. The Linux supervisor keeps the guest alive.'},
      {type: 'os_wait_interrupt', label: 'sleep for 1 millisecond', kind: 'cmd', args: [], generatedC: 'cpu_wait_for_interrupt();', sourceSymbol: 'cpu_wait_for_interrupt', description: 'Sleeps using Linux nanosleep, allowing Linux to schedule other processes.'},
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
      {type: 'os_linux_file_flags', label: 'Linux file mode', kind: 'num', args: [], generatedC: '2 | 64 | 512', description: 'Select Linux open flags for reading, updating, replacing or appending a file.'},
      {type: 'os_asset_count', label: 'asset count', kind: 'num', args: [], generatedC: 'blockos_asset_count()', sourceSymbol: 'blockos_asset_count', description: 'Returns the number of files packaged in /assets in the Linux initramfs.'},
      {type: 'os_asset_name', label: 'asset name', kind: 'text', args: [{name: 'index', type: 'Number'}], generatedC: 'blockos_asset_name(index)', sourceSymbol: 'blockos_asset_name', description: 'Returns the filename of an attached project file.'},
      {type: 'os_asset_size', label: 'asset size', kind: 'num', args: [{name: 'index', type: 'Number'}], generatedC: 'blockos_asset_size(index)', sourceSymbol: 'blockos_asset_size', description: 'Returns an uploaded file size in bytes.'},
      {type: 'os_print_asset_text', label: 'print asset text', kind: 'cmd', args: [{name: 'index', type: 'Number'}], generatedC: 'blockos_print_asset_text(index);', sourceSymbol: 'blockos_print_asset_text', description: 'Prints an uploaded file as text. Binary files may contain unreadable bytes or embedded zeroes.'},
    ],
  },
  {
    name: 'Custom functions',
    colour: 290,
    blocks: [
      {type: 'os_function_address', label: 'function address', kind: 'num', args: [], generatedC: '(uint64_t)(uintptr_t)&my_function', description: 'Pass the address of a basic custom function to the create process block.'},
      {type: 'os_function_def', label: 'define custom function', kind: 'statement', args: [], generatedC: 'static void my_block(void) {\n    /* definition blocks */\n}', description: 'Creates a reusable generated C function. Typed custom blocks add formal parameters and typed reporter blocks.'},
      {type: 'os_function_call', label: 'run custom function', kind: 'cmd', args: [], generatedC: 'my_block();', description: 'Calls a generated custom function. Arguments are evaluated before entering the function.'},
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
  'Linux program': {
    tooltip: 'Learn how Linux starts the generated program, schedules it, and manages its exit.',
    level: 'Starter', runtimeKind: 'Linux user space',
    overview: ['The browser compiles blocks into a static x86_64 Linux executable and packages it as /init in an initramfs.', 'Linux starts /init as PID 1. A small supervisor mounts /dev, /proc, /sys and /tmp, then forks a process that runs blockos_main.'],
    prerequisites: ['C functions', 'Processes and system calls'],
    concepts: ['Linux boot', 'PID 1', 'User space', 'Sleeping and process exit'],
    implementation: 'The start block generates blockos_main. Sleep calls nanosleep; stop calls exit. Linux owns interrupts, drivers and process isolation.',
    cExample: 'void blockos_main(void) {\n    screen_print_line("Hello Linux");\n}',
    safety: 'A forever loop prevents later blocks and cooperative events from running. Sleep between polls.',
    exercise: 'Print a greeting, sleep, then stop the program while the Linux supervisor stays alive.',
  },
  'Screen basics': {
    tooltip: 'Learn framebuffer coordinates, colour values, text rendering, and the cost of changing pixels.',
    level: 'Starter',
    runtimeKind: 'Hardware-backed',
    overview: [
      'The framebuffer is a region of memory whose bytes are displayed as pixels. The runtime opens /dev/fb0, reads its Linux fbdev metadata with ioctl, and maps the pixels with mmap.',
      'Drawing is immediate-mode: a write changes framebuffer memory. Large fills touch many pixels, so redrawing a whole screen for a tiny cursor movement wastes a large amount of CPU time.',
    ],
    prerequisites: ['x/y coordinates', 'RGB hexadecimal colours', 'Arrays and memory addresses'],
    concepts: ['Framebuffer pitch', 'Pixel bounds and clipping', 'Bitmap-font text', 'Dirty rectangles and partial redraws'],
    implementation: 'Basic blocks call runtime.c framebuffer functions. Each pixel address is calculated from y × pitch plus x × bytes-per-pixel. Higher graphics blocks add clipping, region copies, saved regions, and back buffering.',
    cExample: 'uint32_t *pixel = (uint32_t *)(framebuffer + y * pitch + x * 4);\n*pixel = colour;',
    safety: 'Never write beyond the framebuffer dimensions. An unchecked pixel write can corrupt other memory in the process.',
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
    implementation: 'Literal blocks compile inline. String operations and serial line input call runtime helpers with fixed-size user-space buffers.',
    cExample: 'if (blockos_console_line_available()) {\n    const char *command = blockos_console_read_line();\n}',
    safety: 'A returned text pointer may refer to a shared runtime buffer. Copy it before storing it for a long time.',
    exercise: 'Build a command parser that compares input with help and uptime without caring about letter case.',
  },
  'Math & logic': {
    tooltip: 'Learn integer arithmetic, comparisons, Boolean logic, overflow, and short-circuit evaluation.',
    level: 'Starter',
    runtimeKind: 'Generated inline',
    overview: ['Math and logic blocks become C expressions. The result is calculated when the surrounding command executes.', 'Generated programs use fixed-width integers. Values can overflow, signed and unsigned comparisons differ, and division by zero is invalid.'],
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
    tooltip: 'Learn how project attachments become Linux files in /assets.',
    level: 'Intermediate', runtimeKind: 'Linux initramfs files',
    overview: ['Attached files are packaged into the initramfs in the browser. Linux extracts them into /assets at boot.', 'Asset blocks list and map these files. Filesystem blocks can open them by path, including binary and empty files.'],
    prerequisites: ['File paths', 'Byte lengths'],
    concepts: ['CPIO initramfs', 'Linux files', 'Read-only mappings', 'Binary data'],
    implementation: 'The runtime reads /assets/.manifest to preserve attachment order, then opens and maps each file through Linux.',
    cExample: 'uint32_t count = blockos_asset_count();\nconst char *name = blockos_asset_name(0);',
    safety: 'Respect asset sizes when reading binary data. Initramfs and /tmp changes are lost when the guest restarts.',
    exercise: 'Attach a text file, print its name and size, then open /assets/your-file.txt using a filesystem block.',
  },
  'Custom functions': {
    tooltip: 'Learn reusable functions, typed parameters, custom types, generated declarations, and call-stack behaviour.',
    level: 'Intermediate',
    runtimeKind: 'Generated inline',
    overview: ['A custom block is a real generated C function with a definition block, call block, and typed argument reporters.', 'Arguments are passed by value. Pointer arguments copy an address, while text arguments copy a pointer rather than the whole string.'],
    prerequisites: ['Variables and types', 'Function calls', 'Parameters versus local variables'],
    concepts: ['Function declarations', 'Arguments and return control', 'Call stack', 'Custom typedefs'],
    implementation: 'The generator emits a prototype before blockos_main and a static function body assembled from the definition workspace.',
    cExample: 'static void draw_label(const char *text, int64_t x, int64_t y) {\n    blockos_graphics_draw_text(x, y, text, 0xFFFFFFu);\n}',
    safety: 'Recursive custom blocks can exhaust the process stack. Avoid deep or unbounded recursion.',
    exercise: 'Create a typed draw button block with x, y, width, height, label, and colour arguments.',
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
  "Linux services": [
    "Linux shutdown, restart, hostname and boot metadata.",
    "Intermediate",
    "Linux service",
    [
      "Kernel services"
    ],
    "reboot, sethostname, uname, /proc/cmdline and CLOCK_MONOTONIC provide real guest services. Status, boot stage and safe mode remain project settings.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Check that hostname changes appear in the diagnostic blocks."
  ],
  "CPU": [
    "Linux CPU identity, affinity and scheduling.",
    "Intermediate",
    "Linux service",
    [
      "CPU"
    ],
    "CPUID provides vendor and brand. sched_getaffinity counts available CPUs, getcpu reports the current CPU, and sched_yield yields execution. Privileged register and interrupt operations are unavailable.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Print the CPU brand and available processor count."
  ],
  "Memory allocation": [
    "Memory allocation backed by Linux mmap and munmap.",
    "Intermediate",
    "Linux service",
    [
      "Kernel heap"
    ],
    "Each allocation is an anonymous zero-filled mapping. Resize allocates a new mapping and preserves its contents. Allocation sizes and ownership are tracked in the process.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Allocate memory, resize it, then free it."
  ],
  "Processes": [
    "Real Linux process creation, signals, priorities and exit codes.",
    "Intermediate",
    "Linux service",
    [
      "Processes"
    ],
    "Create forks the process and runs the supplied function address in the child. Process handles are PIDs. wait4 collects child exit status; kill sends signals. Setting names is limited to the current process. Terminating another process sends SIGTERM; its exit status follows Linux signal semantics.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Create a child, wait for it, and inspect its exit status."
  ],
  "Timers and clock": [
    "Linux monotonic time, wall time and sleeping.",
    "Intermediate",
    "Linux service",
    [
      "Timers and clock"
    ],
    "clock_gettime reads clocks and nanosleep waits without busy loops. One tick is one millisecond. Wall-clock updates call clock_settime. Cooperative timer events use elapsed monotonic time.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Sleep for 100 milliseconds and measure the elapsed monotonic time."
  ],
  "Console input": [
    "Linux tty input from the Studio serial console.",
    "Intermediate",
    "Linux service",
    [
      "Keyboard and mouse"
    ],
    "poll checks for available bytes and read consumes input. The Linux tty is configured for raw input. Use command-line blocks to collect full lines. Mouse and raw scan-code models are unavailable.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Send a command from the Run panel and print the received line."
  ],
  "Graphics": [
    "Software rendering on the Linux framebuffer.",
    "Intermediate",
    "Linux service",
    [
      "Graphics"
    ],
    "Linux loads its Bochs DRM driver and exposes /dev/fb0. ioctl queries the display; mmap exposes pixels to the process. Clipping, sprites, saved regions and back buffers operate on this mapping.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Draw a rectangle and update only the changed region."
  ],
  "Text and windows": [
    "User-space text drawing and simple software windows.",
    "Intermediate",
    "Linux service",
    [
      "Text and windows"
    ],
    "Text and window primitives draw into the Linux framebuffer. Window records are a small drawing toolkit rather than desktop processes or a window server.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Draw a labelled panel and move it."
  ],
  "Filesystems": [
    "Linux file descriptors, directories, mounts and I/O.",
    "Intermediate",
    "Linux service",
    [
      "Filesystems"
    ],
    "open/read/write/lseek/close operate on real guest files. Flags use Linux values: read only 0, read/write 2, create 64, truncate 512, append 1024. Handles and I/O results return negative errno on failure; view them as signed integers. getdents64 enumerates directories without . and ... /tmp and /assets are reset at boot.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Write more than 4096 bytes into /tmp, seek back, and read them."
  ],
  "Networking": [
    "Linux UDP sockets and local guest networking.",
    "Intermediate",
    "Linux service",
    [
      "Networking"
    ],
    "socket/bind/sendto/recvfrom/close use the Linux network stack. Initialization brings loopback up. IPv4 addresses use numeric host order, for example 0x7f000001 for 127.0.0.1. Sockets are nonblocking; no pending packet returns -11 (EAGAIN). External networking requires an emulated NIC and configuration.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Send a UDP message between two ports on 127.0.0.1."
  ],
  "Debug and information": [
    "Guest diagnostics, Linux errno and kernel version.",
    "Intermediate",
    "Linux service",
    [
      "Debug and information"
    ],
    "Runtime calls record the most recent Linux errno. Clear it explicitly before checking a new operation. uname reports the actual Linux kernel release and architecture. Assertions log failures in the generated program.",
    "// See the generated block call below.",
    "Validate paths, sizes and handles. Guest changes are local to this VM.",
    "Open a missing file and inspect errno 2."
  ]
};

for (const [name, data] of Object.entries(extensionGuides)) {
  const [summary, level, runtimeKind, concepts, implementation, cExample, safety, exercise] = data;
  guideData[name] = {
    tooltip: `Learn ${summary.charAt(0).toLowerCase()}${summary.slice(1)}`,
    level,
    runtimeKind,
    overview: [summary, `Generated blocks run in Linux user space. Linux manages the kernel and hardware.`],
    prerequisites: level === 'Starter'
      ? ['Values, variables, and control flow', 'Reading generated C']
      : ['Pointers and fixed-width integers', 'Linux processes and memory safety', 'Reading generated C'],
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
    description: `${block.kind === 'cmd' ? 'Performs' : 'Returns'} the “${block.label}” capability through the FromScratch Linux runtime.`,
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

export const learningCategories = [...coreCategories.filter(category => category.name !== 'Notes'), ...extensionLearningCategories, coreCategories.find(category => category.name === 'Notes')]
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
  if (!category) return `${import.meta.env?.BASE_URL ?? '/'}learn.html`;
  return `${import.meta.env?.BASE_URL ?? '/'}learn.html?topic=${encodeURIComponent(category)}&block=${encodeURIComponent(type)}`;
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
