const fs = require('fs');
const path = require('path');

// Paths relative to this script
const repoRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(repoRoot, 'src');
const outRoot = path.join(repoRoot, 'docs');

const blockJsFiles = [
  path.join(srcRoot, 'blocks', 'event-blocks.js'),
  path.join(srcRoot, 'blocks', 'os-blocks.js'),
  path.join(srcRoot, 'blocks', 'text-style-blocks.js'),
  path.join(srcRoot, 'custom-blocks.js')
];

function readFileSafe(p){ try { return fs.readFileSync(p,'utf8'); } catch(e){ return null; } }

function extractJsonArrays(js){
  const arr = [];
  const re = /Blockly\.defineBlocksWithJsonArray\s*\(\s*(\[([\s\S]*?)\])\s*\)/g;
  let m; while((m=re.exec(js))){ try{ const obj = Function('return '+m[1])(); if(Array.isArray(obj)) arr.push(...obj);}catch(e){} }
  return arr;
}

function extractAssignedBlocks(js){
  const out = [];
  const re = /Blockly\.Blocks\[['\"]([^'"\]]+)['\"]\]\s*=\s*(\{[\s\S]*?\});/g;
  let m; while((m=re.exec(js))){ try{ const obj = Function('return '+m[2])(); obj._type = m[1]; out.push(obj);}catch(e){} }
  return out;
}

function safeName(type){ return String(type).replace(/[^a-z0-9\-]+/gi,'_').replace(/^_+|_+$/g,'').toLowerCase(); }

function ensureDir(p){ if(!fs.existsSync(p)) fs.mkdirSync(p, { recursive:true }); }

function translateToIt(text){
  if(!text) return text;
  // very small heuristic translation for common UI phrases; otherwise return original with a note
  const map = {
    'block':'blocco','blocks':'blocchi','repeat':'ripeti','if':'se','else':'altrimenti','and':'e','or':'o'
  };
  return text.replace(/\b(blocks|block|repeat|if|else|and|or)\b/gi, (m)=>map[m.toLowerCase()] || m) + '\n\n> NOTE: traduzione automatica, verificare';
}

function mdForBlock(b, lang){
  const title = b.type || b._type || b.name || 'unknown_block';
  const tooltip = b.tooltip || b.def && b.def.tooltip || '';
  const message0 = b.message0 || (b.def && b.def.message0) || '';
  const args = b.args0 || (b.def && b.def.args0) || b.arguments || [];
  const json = JSON.stringify(b.def || b, null, 2);
  let md = `# ${title}\n\n`;
  md += `**Type:** ${title}\n\n`;
  if(message0) md += `**Usage / Message:**\n\n${message0}\n\n`;
  if(tooltip) md += `**Tooltip:** ${tooltip}\n\n`;
  if(args && args.length){
    md += `**Fields / Arguments:**\n\n`;
    args.forEach((a, i)=>{
      md += `- **${a.name||('arg'+i)}**: ${a.type||a.check||JSON.stringify(a)}\n`;
    });
    md += '\n';
  }
  md += `## JSON Definition\n\n\n\n`;
  md += '```json\n'+json+'\n```\n';
  md += '\n---\n';
  md += '\n## Example\n\n';
  md += '```c\n// Esempio di utilizzo del blocco nel generatore C (se applicabile)\n// TODO: aggiungere esempi specifici\n```\n';
  if(lang==='it') md = translateToIt(md);
  return md;
}

function main(){
  ensureDir(outRoot);
  ensureDir(path.join(outRoot,'en'));
  ensureDir(path.join(outRoot,'it'));

  const index = [];
  blockJsFiles.forEach(p=>{
    const js = readFileSafe(p);
    if(!js) return;
    const arrays = extractJsonArrays(js);
    arrays.forEach(a=>{
      if(a && typeof a==='object'){
        a.forEach(def=>{
          const type = def.type || def.name || def.message0 || '(json_block)';
          const entry = { type, def };
          index.push(entry);
        });
      }
    });
    const assigned = extractAssignedBlocks(js);
    assigned.forEach(def=>{
      const type = def._type || def.type || def.name || '(assigned_block)';
      index.push({ type, def });
    });
  });

  // dedupe by type keeping first
  const seen = new Set();
  const uniq = [];
  index.forEach(x=>{ const t = x.type; if(!seen.has(t)){ seen.add(t); uniq.push(x); } });

  uniq.forEach(b=>{
    const name = safeName(b.type || b.def.type || b.def._type || 'block');
    const fileEn = path.join(outRoot,'en', name + '.md');
    const fileIt = path.join(outRoot,'it', name + '.md');
    const mdEn = mdForBlock({type:b.type, def:b.def, message0:b.def && b.def.message0, args0:b.def && b.def.args0, tooltip:b.def && b.def.tooltip}, 'en');
    const mdIt = mdForBlock({type:b.type, def:b.def, message0:b.def && b.def.message0, args0:b.def && b.def.args0, tooltip:b.def && b.def.tooltip}, 'it');
    fs.writeFileSync(fileEn, mdEn, 'utf8');
    fs.writeFileSync(fileIt, mdIt, 'utf8');
    // index metadata
    const meta = { type: b.type, file_en: path.relative(outRoot, fileEn), file_it: path.relative(outRoot, fileIt), tooltip: b.def && b.def.tooltip || '' };
    // store def JSON for programmatic use
    meta.def = b.def;
    fs.writeFileSync(path.join(outRoot, 'blocks-index.json'), JSON.stringify(uniq.map(u=>({type:u.type, tooltip:u.def && u.def.tooltip||'', file: safeName(u.type)+'.md', def:u.def})), null, 2), 'utf8');
  });

  // write a simple README index
  const idxEn = '# Index — Blocks (English)\n\n' + uniq.map(u=>`- [${u.type}](./en/${safeName(u.type)}.md)`).join('\n');
  const idxIt = '# Indice — Blocchi (Italiano)\n\n' + uniq.map(u=>`- [${u.type}](./it/${safeName(u.type)}.md)`).join('\n');
  fs.writeFileSync(path.join(outRoot,'en','_index.md'), idxEn, 'utf8');
  fs.writeFileSync(path.join(outRoot,'it','_index.md'), idxIt, 'utf8');

  console.log('Generated', uniq.length, 'block docs into', outRoot);
}

main();
