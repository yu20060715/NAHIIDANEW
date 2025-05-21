import fs from 'fs';
import path from 'path';
const file = path.join(process.cwd(),'data','flirt.json');
const arr = JSON.parse(fs.readFileSync(file,'utf-8'));
for (let i=0;i<30;i++){
  arr.push({ text: `撒嬌句子${i}`, weight:1, emojis:["😊"] });
}
fs.writeFileSync(file, JSON.stringify(arr,null,2));
console.log('Flirt.json 擴充完成');
