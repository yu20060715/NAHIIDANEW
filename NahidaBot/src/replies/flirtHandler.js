// src/handlers/flirtHandler.js
import fs from 'fs';
import path from 'path';

// 嘗試讀自訂詞庫
let custom = {};
try {
  custom = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../replies/flirt.custom.json'), 'utf-8')
  );
} catch { /* no custom file */ }

// 內建 fallback 資料
const defaultData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../replies/flirt.json'), 'utf-8')
);
const basePhrases = custom.basePhrases || [
  // 請確保這裡至少有 10 條
  "想你","好想見你","抱抱","等你","想聽你聲音","想和你撒嬌"
];
const suffixes = custom.suffixes || ["～","嘛","…","？","❤","🥺"];
const emojiMap = custom.emojiMap || {
  default: ["😊","😘","🥰","💚","😚"],
  shy: ["😳","🤭","🥺","🙈"],
  attention: ["😔","😢","🥺","😿"]
};

/** 隨機取元素 */
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 產生一句撒嬌語
 * @param {string} category default/shy/attention
 */
export function makeFlirt(category = 'default') {
  // 先看 custom 的 list，有就用；沒有就 fallback 到 original JSON
  const list = defaultData[category] || defaultData['default'];
  // 隨機 pick 一條已有人手寫的句子
  let text;
  if (Math.random() < 0.3) {
    // 30% 機率直接 pick 原本 JSON 裡的
    text = rand(list);
  } else {
    // 70% 機率動態組合
    const phrase = rand(basePhrases);
    const suffix = rand(suffixes);
    const emojis = emojiMap[category] || emojiMap.default;
    const emoji = rand(emojis);
    text = `${phrase}${suffix}${emoji}`;
  }
  return text;
}
