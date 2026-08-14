const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(repoRoot, 'src');
const docsRoot = path.join(repoRoot, 'docs');

function readFile(p){ try{return fs.readFileSync(p,'utf8')}catch(e){return null} }

function walkDir(dir, filelist=[]){
  const files = fs.readdirSync(dir);
  files.forEach(f=>{
    const full = path.join(dir,f);
    const stat = fs.statSync(full);
    if(stat.isDirectory()) walkDir(full, filelist);
    else filelist.push(full);
  });
  return filelist;
}

function extractTypesFromFile(content){
  const types = new Set();
  if(!content) return types;
  const re = /type\s*:\s*['\"]([a-zA-Z0-9_:\-]+)['\"]/g;
  let m; while((m=re.exec(content))){ types.add(m[1]); }
  return types;
}

function isBlockType(t){
  const ignore = new Set(['input_value','input_statement','field_dropdown','field_number','field_input','field_checkbox','field_angle','field_image','field_multilinetext','field_label']);
  if(ignore.has(t)) return false;
  // prefer os_ prefix or names with underscore
  if(t.startsWith('os_')) return true;
  if(t.includes('_') && !t.startsWith('field_') && !t.startsWith('input_')) return true;
  // include common non-prefixed like 'number' or 'text'?
  if(['number','text','boolean'].includes(t)) return true;
  return false;
}

function safeName(type){ return String(type).replace(/[^a-z0-9\-]+/gi,'_').replace(/^_+|_+$/g,'').toLowerCase(); }

function generatePlaceholderMD(type){
  const title = type;
  const json = JSON.stringify({type: type}, null, 2);
  let md = '# ' + title + '\n\n';
  md += '**Type:** ' + title + '\n\n';
  md += '**Auto-generated placeholder:** Nessuna documentazione disponibile; questa pagina è stata generata automaticamente.\n\n';
  md += '## JSON Definition\n\n';
  md += '```json\n' + json + '\n```\n';
  return md;
}

function main(){
  const files = walkDir(srcRoot).filter(f=>f.endsWith('.js'));
  const found = new Set();
  files.forEach(f=>{
    const c = readFile(f);
    extractTypesFromFile(c).forEach(t=>{ if(isBlockType(t)) found.add(t); });
  });

  const idxPath = path.join(docsRoot,'blocks-index.json');
  let indexed = [];
  if(fs.existsSync(idxPath)) indexed = JSON.parse(fs.readFileSync(idxPath,'utf8')).map(x=>x.type);

  const missing = [...found].filter(t=>!indexed.includes(t)).sort();
  console.log('Found', found.size, 'candidate block types in source.');
  console.log('Indexed (docs) contains', indexed.length, 'types.');
  console.log('Missing count:', missing.length);
  missing.forEach((m,i)=> console.log(`${i+1}. ${m}`));

  if(missing.length>0){
    const enDir = path.join(docsRoot,'en');
    const itDir = path.join(docsRoot,'it');
    if(!fs.existsSync(enDir)) fs.mkdirSync(enDir, {recursive:true});
    if(!fs.existsSync(itDir)) fs.mkdirSync(itDir, {recursive:true});
    missing.forEach((t,i)=>{
      const name = safeName(t);
      const fileEn = path.join(enDir, name + '.md');
      const fileIt = path.join(itDir, name + '.md');
      const mdEn = generatePlaceholderMD(t);
      const mdIt = mdEn + '\n\n> NOTE: traduzione automatica placeholder.';
      if(!fs.existsSync(fileEn)) fs.writeFileSync(fileEn, mdEn, 'utf8');
      if(!fs.existsSync(fileIt)) fs.writeFileSync(fileIt, mdIt, 'utf8');
      console.log('Generated placeholder for', t);
      // add to index
      indexed.push(t);
    });
    // rewrite blocks-index.json merging existing defs minimally
    const newIndex = indexed.map(t=>({type:t, tooltip:'(auto-generated)', file: safeName(t)+'.md'}));
    fs.writeFileSync(idxPath, JSON.stringify(newIndex, null, 2), 'utf8');
    console.log('Updated', idxPath);
  }
}

main();
