#!/usr/bin/env node
/**
 * Generates missing markdown documentation in BOTH English and Italian for
 * every block defined in the FromScratch source.
 *
 * Existing files (with real, hand-edited content) are skipped so we never
 * overwrite human work. Newly generated files are written with a header that
 * marks them as auto-generated.
 *
 * The script also rewrites docs/blocks-index.json so the manual page can find
 * every block.
 */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(repoRoot, 'src');
const docsRoot = path.join(repoRoot, 'docs');
const enDir = path.join(docsRoot, 'en');
const itDir = path.join(docsRoot, 'it');

// ---------------------------------------------------------------------------
// Block discovery
// ---------------------------------------------------------------------------

const blockJsFiles = [
  path.join(srcRoot, 'blocks', 'os-blocks.js'),
  path.join(srcRoot, 'blocks', 'event-blocks.js'),
  path.join(srcRoot, 'blocks', 'text-style-blocks.js'),
];

// Hand-edited "core" files keep their existing (real) content; the script
// only generates EN/IT docs for blocks that have no real file yet. We detect
// a real file by the absence of the auto-generated marker.
const AUTO_GEN_MARKER = '<!-- auto-generated -->';

function readFile(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

function extractJsonArrays(js) {
  const arr = [];
  const re = /Blockly\.defineBlocksWithJsonArray\s*\(\s*(\[([\s\S]*?)\])\s*\)/g;
  let m;
  while ((m = re.exec(js))) {
    try {
      // eslint-disable-next-line no-new-func
      const obj = Function('return ' + m[1])();
      if (Array.isArray(obj)) arr.push(...obj);
    } catch { /* ignore */ }
  }
  return arr;
}

function labelFromMessage0(message0) {
  if (!message0) return '';
  return String(message0)
    .replace(/%\d+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function argTypeLabel(t) {
  if (t === 'String') return {en: 'string', it: 'stringa'};
  if (t === 'Number') return {en: 'number', it: 'numero'};
  if (t === 'Boolean') return {en: 'boolean', it: 'booleano'};
  return {en: String(t).toLowerCase(), it: String(t).toLowerCase()};
}

function kindText(kind, lang) {
  if (lang === 'it') {
    if (kind === 'cmd') return 'comando';
    if (kind === 'num') return 'numero';
    if (kind === 'bool') return 'booleano';
    if (kind === 'text') return 'stringa';
  }
  if (kind === 'cmd') return 'statement (command)';
  if (kind === 'num') return 'number value';
  if (kind === 'bool') return 'boolean value';
  if (kind === 'text') return 'string value';
  return String(kind);
}

function gatherBlocks() {
  const found = new Map();
  for (const file of blockJsFiles) {
    const txt = readFile(file);
    if (!txt) continue;
    const json = extractJsonArrays(txt);
    for (const def of json) {
      if (!def.type) continue;
      found.set(def.type, {type: def.type, def, source: path.relative(repoRoot, file)});
    }
  }
  return found;
}

function gatherExtensionBlocks() {
  // block-catalog.js exports an `extensionCategories` array of {name, colour,
  // blocks: [...]}. Each block entry contains the same metadata used by
  // Blockly's JSON-array defineBlocks, so we synthesise the matching
  // Blockly-style definition here.
  const file = path.join(srcRoot, 'blocks', 'block-catalog.js');
  const txt = readFile(file);
  if (!txt) return new Map();

  // The catalog is exported as a const at module top-level. We pull the array
  // literal out of the file by looking for `export const extensionCategories = [`.
  const marker = 'export const extensionCategories = ';
  const idx = txt.indexOf(marker);
  if (idx === -1) return new Map();
  const start = txt.indexOf('[', idx);
  if (start === -1) return new Map();

  // Walk brackets to find the matching close.
  let depth = 0;
  let end = -1;
  for (let i = start; i < txt.length; i++) {
    const ch = txt[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  if (end === -1) return new Map();

  let categories;
  try {
    // eslint-disable-next-line no-new-func
    categories = Function('return ' + txt.slice(start, end))();
  } catch { return new Map(); }
  if (!Array.isArray(categories)) return new Map();

  const out = new Map();
  for (const cat of categories) {
    if (!cat || !Array.isArray(cat.blocks)) continue;
    for (const b of cat.blocks) {
      if (!b.type) continue;
      const args = b.args || [];
      const def = {
        ...b,
        category: cat.name,
        colour: cat.colour,
        // os-blocks.js builds the Blockly message0 from `label` + each
        // `args[i].name` plus a positional `%N` slot marker. Replicate it
        // here so the markdown shows the same display label.
        message0: [b.label, ...args.map((a, i) => `${a.name} %${i + 1}`)].join(' '),
        args0: args.map((a, i) => ({
          type: 'input_value',
          name: `ARG${i}`,
          check: a.type,
        })),
      };
      if (b.kind === 'cmd') {
        def.previousStatement = null;
        def.nextStatement = null;
      } else {
        def.output = b.kind === 'num' ? 'Number' : b.kind === 'bool' ? 'Boolean' : 'String';
      }
      out.set(b.type, {type: b.type, def, source: path.relative(repoRoot, file)});
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Markdown generation
// ---------------------------------------------------------------------------

function buildMarkdown(block, lang) {
  const def = block.def;
  const type = block.type;
  const label = labelFromMessage0(def.message0) || type;
  const tooltip = def.tooltip || '';
  const isIt = lang === 'it';

  const lines = [];
  lines.push(AUTO_GEN_MARKER);
  lines.push(`# ${type}`);
  lines.push('');
  lines.push(`**Type:** \`${type}\``);
  lines.push('');
  lines.push(isIt ? `**Etichetta visualizzata:** ${label}` : `**Display label:** ${label}`);
  lines.push('');

  const kind = def.kind;
  const output = def.output;
  if (kind) {
    lines.push(isIt
      ? `**Tipo blocco:** ${kindText(kind, 'it')}`
      : `**Kind:** ${kindText(kind, 'en')}`);
    lines.push('');
  } else if (output) {
    lines.push(isIt
      ? `**Restituisce:** ${argTypeLabel(output).it}`
      : `**Returns:** ${argTypeLabel(output).en}`);
    lines.push('');
  }

  if (tooltip) {
    lines.push(isIt ? `**Descrizione:** ${tooltip}` : `**Description:** ${tooltip}`);
    lines.push('');
  }

  if (def.category) {
    lines.push(isIt
      ? `**Categoria:** ${def.category}`
      : `**Category:** ${def.category}`);
    lines.push('');
  }

  // Inputs
  if (Array.isArray(def.args) && def.args.length) {
    lines.push(isIt ? '## Argomenti' : '## Arguments');
    lines.push('');
    def.args.forEach((arg, i) => {
      const t = argTypeLabel(arg.type);
      const argName = arg.name || `ARG${i}`;
      lines.push(isIt
        ? `- **${argName}** (${t.it}) — slot di input ${i + 1}`
        : `- **${argName}** (${t.en}) — input slot ${i + 1}`);
    });
    lines.push('');
  }

  // Runtime / generated C example
  const cName = def.cName || `blockos_ext_${type}`;
  const returnType = output === 'String' ? 'const char *'
    : output === 'Boolean' ? 'bool'
    : output === 'Number' ? 'uint64_t'
    : (kind === 'num' ? 'uint64_t'
      : kind === 'bool' ? 'bool'
      : kind === 'text' ? 'const char *'
      : 'void');

  if (kind === 'cmd' || (!output && def.previousStatement !== undefined)) {
    lines.push(isIt ? '## Chiamata C generata' : '## Generated C call');
    lines.push('');
    lines.push('```c');
    const argList = (def.args || []).map((a) => '/* ' + (a.name || '?') + ' */').join(', ');
    lines.push(`${cName}(${argList});`);
    lines.push('```');
    lines.push('');
  } else {
    lines.push(isIt ? '## Espressione C generata' : '## Generated C expression');
    lines.push('');
    lines.push('```c');
    const argList = (def.args || []).map((a) => '/* ' + (a.name || '?') + ' */').join(', ');
    lines.push(`(${returnType}) ${cName}(${argList})`);
    lines.push('```');
    lines.push('');
  }

  // Runtime declaration
  lines.push(isIt ? '## Prototipo runtime' : '## Runtime prototype');
  lines.push('');
  const protoArgs = (def.args || []).map((a) => {
    if (a.type === 'String') return 'const char *';
    if (a.type === 'Boolean') return 'bool';
    return 'uint64_t';
  }).join(', ');
  lines.push('```c');
  lines.push(`${returnType} ${cName}(${protoArgs || 'void'});`);
  lines.push('```');
  lines.push('');

  // Composition example
  lines.push(isIt ? '## Esempio di composizione' : '## Composition example');
  lines.push('');
  lines.push('```c');
  lines.push('void kernel_main(void) {');
  if (kind === 'cmd' || (!output && def.previousStatement !== undefined)) {
    const argList = (def.args || []).map(() => '0').join(', ');
    lines.push(`    ${cName}(${argList});`);
  } else {
    const argList = (def.args || []).map(() => '0').join(', ');
    lines.push(`    uint64_t result = ${cName}(${argList});`);
    lines.push('    (void)result;');
  }
  lines.push('}');
  lines.push('```');
  lines.push('');

  // Notes
  lines.push(isIt ? '## Note' : '## Notes');
  lines.push('');
  if (isIt) {
    lines.push("- Questo blocco fa parte dello strato di funzionalità del runtime BlockOS x86_64.");
    lines.push('- Il runtime è fornito come kernel di partenza; alcune funzionalità mappano dispositivi virtuali in QEMU.');
    lines.push("- L'etichetta visualizzata è generata dal template `message0` del blocco.");
  } else {
    lines.push('- This block is part of the BlockOS x86_64 runtime capability layer.');
    lines.push('- The runtime is provided as a starting kernel; some capabilities map to virtual devices in QEMU.');
    lines.push('- The display label is generated from the block `message0` template.');
  }
  lines.push('');

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Index generation
// ---------------------------------------------------------------------------

function buildIndex(blocks) {
  const sorted = [...blocks.values()].sort((a, b) => a.type.localeCompare(b.type));
  return sorted.map((b) => ({
    type: b.type,
    label: labelFromMessage0(b.def.message0) || b.type,
    category: b.def.category || null,
    colour: typeof b.def.colour === 'number' ? b.def.colour : null,
    tooltip: b.def.tooltip || '',
    file_en: `${b.type}.md`,
    file_it: `${b.type}.md`,
  }));
}

function buildIndexMarkdown(blocks, lang) {
  const isIt = lang === 'it';
  const sorted = [...blocks.values()].sort((a, b) => {
    const la = labelFromMessage0(a.def.message0) || a.type;
    const lb = labelFromMessage0(b.def.message0) || b.type;
    return la.localeCompare(lb);
  });
  const lines = [];
  lines.push(isIt ? '# Indice — Blocchi (Italiano)' : '# Index — Blocks (English)');
  lines.push('');
  if (isIt) lines.push("> Documentazione generata automaticamente. Le etichette corrispondono a quelle mostrate nell'editor.");
  lines.push('');
  for (const b of sorted) {
    const label = labelFromMessage0(b.def.message0) || b.type;
    const dir = isIt ? './it' : './en';
    lines.push(`- **${label}** — [${b.type}](${dir}/${b.type}.md)${b.def.category ? ` _(${b.def.category})_` : ''}`);
  }
  lines.push('');
  if (isIt) lines.push('> NOTA: traduzione automatica, verificare e adattare gli esempi.');
  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function safeName(type) {
  return String(type).replace(/[^a-z0-9\-]+/gi, '_').replace(/^_+|_+$/g, '').toLowerCase();
}

function main() {
  if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, {recursive: true});
  if (!fs.existsSync(itDir)) fs.mkdirSync(itDir, {recursive: true});

  const core = gatherBlocks();
  const ext = gatherExtensionBlocks();
  const all = new Map([...core, ...ext]);

  console.log(`Discovered ${all.size} block types (${core.size} core, ${ext.size} extension).`);

  let generatedEn = 0;
  let generatedIt = 0;
  let skippedEn = 0;
  let skippedIt = 0;

  for (const block of all.values()) {
    const fileEn = path.join(enDir, `${safeName(block.type)}.md`);
    const fileIt = path.join(itDir, `${safeName(block.type)}.md`);

    const existingEn = readFile(fileEn);
    const existingIt = readFile(fileIt);

    const enIsPlaceholder = !existingEn || existingEn.includes(AUTO_GEN_MARKER);
    const itIsPlaceholder = !existingIt || existingIt.includes(AUTO_GEN_MARKER);

    if (enIsPlaceholder) {
      fs.writeFileSync(fileEn, buildMarkdown(block, 'en'), 'utf8');
      generatedEn++;
    } else {
      skippedEn++;
    }
    if (itIsPlaceholder) {
      fs.writeFileSync(fileIt, buildMarkdown(block, 'it'), 'utf8');
      generatedIt++;
    } else {
      skippedIt++;
    }
  }

  console.log(`Wrote ${generatedEn} EN files (skipped ${skippedEn} hand-edited).`);
  console.log(`Wrote ${generatedIt} IT files (skipped ${skippedIt} hand-edited).`);

  // Update index.json
  const idx = buildIndex(all);
  fs.writeFileSync(path.join(docsRoot, 'blocks-index.json'), JSON.stringify(idx, null, 2), 'utf8');
  console.log(`Wrote docs/blocks-index.json with ${idx.length} entries.`);

  // Update index markdown
  fs.writeFileSync(path.join(enDir, '_index.md'), buildIndexMarkdown(all, 'en'), 'utf8');
  fs.writeFileSync(path.join(itDir, '_index.md'), buildIndexMarkdown(all, 'it'), 'utf8');
  console.log('Wrote _index.md in en/ and it/.');
}

main();
