import fs from 'fs';
import path from 'path';
export const emojis = JSON.parse(fs.readFileSync(path.join(process.cwd(),'data','emoji.json'),'utf-8'));
