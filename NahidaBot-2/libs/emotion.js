import fs from 'fs';
import path from 'path';
import Sentiment from 'sentiment';
const s = new Sentiment();
const templates = JSON.parse(fs.readFileSync(path.join(process.cwd(),'data','emotionTemplates.json'),'utf-8'));
export function analyzeMood(text) { return s.analyze(text).score; }
export function getComfortResponse(score) {
  const arr = templates.filter(t=>t.threshold<=score);
  return arr.length?arr[Math.floor(Math.random()*arr.length)].response:'人家不知道該說什麼…';
}
