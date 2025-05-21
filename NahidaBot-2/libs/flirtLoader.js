import fs from 'fs';
import path from 'path';
const list = JSON.parse(fs.readFileSync(path.join(process.cwd(),'data','flirt.json'),'utf-8'));
export function getFlirt() {
  const tot = list.reduce((s,i)=>s+(i.weight||1),0);
  let r = Math.random()*tot;
  for (const it of list) {
    r -= (it.weight||1);
    if (r <= 0) return it.text + (it.emojis?it.emojis.join(''):'');
  }
  return list[0].text;
}
