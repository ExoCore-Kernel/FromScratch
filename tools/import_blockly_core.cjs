const fs = require('fs');
const path = require('path');
const https = require('https');

const repoRoot = path.resolve(__dirname, '..');
const docsRoot = path.join(repoRoot, 'docs');
const enDir = path.join(docsRoot,'en'); if(!fs.existsSync(enDir)) fs.mkdirSync(enDir,{recursive:true});

const files = [
  'logic.js','loops.js','math.js','text.js','lists.js','colour.js','variables.js','procedures.js','procedures_defreturn.js','procedures_defnoreturn.js','procedures_callnoreturn.js','procedures_callreturn.js'
];

function fetch(url){
  return new Promise((resolve,reject)=>{
    https.get(url,res=>{
      if(res.statusCode!==200){ reject(new Error('status '+res.statusCode)); return; }
      let data=''; res.on('data',c=>data+=c); res.on('end',()=>resolve(data));
    }).on('error',reject);
  });
}

async function run(){
  const base = 'https://raw.githubusercontent.com/google/blockly/master/blocks/';
  const types = [];
  for(const f of files){
    try{
      const txt = await fetch(base + f);
      // extract types from defineBlocksWithJsonArray or Blockly.Blocks assignments
      const reJson = /Blockly\.defineBlocksWithJsonArray\s*\(\s*(\[([\s\S]*?)\])\s*\)/g;
      let m; while((m=reJson.exec(txt))){
        try{ const arr = eval(m[1]); arr.forEach(def=>{ if(def && def.type) types.push({type:def.type, def}); }); }catch(e){}
      }
      const reAssign = /Blockly\.Blocks\[['\"]([^'\"]+)['\"]\]\s*=\s*(\{[\s\S]*?\});/g;
      while((m=reAssign.exec(txt))){ try{ const def = eval('(' + m[2] + ')'); types.push({type:m[1], def}); }catch(e){} }
    }catch(e){ console.error('Failed to fetch', f, e.message); }
  }
  // dedupe
  const seen = new Set(); const uniq = []; for(const t of types){ if(!seen.has(t.type)){ seen.add(t.type); uniq.push(t); } }
  console.log('Imported', uniq.length, 'core block types');
  // generate placeholder MD with simple C mapping heuristics
  for(const b of uniq){
    const name = b.type.replace(/[^a-z0-9\-]+/gi,'_').toLowerCase();
    const md = '# ' + b.type + '\n\n**Imported core Blockly block**\n\n';
    md += 'Definition JSON:\n\n```json\n' + JSON.stringify(b.def,null,2) + '\n```\n\n';
    // simple mapping
    let gen = '// no C mapping available';
    if(b.type.includes('math')) gen = 'a + b';
    if(b.type.includes('text')) gen = '"text"';
    if(b.type.includes('logic')) gen = 'a && b';
    md += '## Example C mapping\n\n```c\n' + gen + '\n```\n';
    fs.writeFileSync(path.join(enDir, name + '.md'), md, 'utf8');
  }
  console.log('Wrote core MD into', enDir);
}

run().catch(e=>{ console.error(e); process.exit(1); });
