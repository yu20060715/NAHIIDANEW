// src/modules/flirtManager.js
const flirts = require('../data/flirt.json');
const customFlirts = require('../replies/flirt.custom.json');

// 新增缺失的辅助函数
function getRandomEmoji() {
  const allEmojis = [
    ...flirts.general.flatMap(f => f.emojis),
    ...flirts.special_nickname_response.responses.flatMap(r => r.emojis)
  ];
  return allEmojis[Math.floor(Math.random() * allEmojis.length)] || '🌱';
}

function injectEmojis(response) {
  return response.text.replace(/%\{emoji\}/g, 
    response.emojis[Math.floor(Math.random() * response.emojis.length)]
  );
}

function getAllFlirts() {
  return {
    ...baseFlirts,
    custom: customFlirts
  };
}

function getNicknameResponse() {
  const responses = flirts.special_nickname_response.responses;
  const response = responses[Math.floor(Math.random() * responses.length)];
  return injectEmojis(response);
}

function injectDynamicContent(text, variables) {
  return text
    .replace(/%\{time\}/g, () => new Date().toLocaleTimeString('zh-TW'))
    .replace(/%\{name\}/g, variables.name)
    .replace(/%\{emoji\}/g, () => {
      const emojis = ['🌱', '✨', '🌸', '🍃'];
      return emojis[Math.floor(Math.random() * emojis.length)];
    });
}

function getRandomFlirt() {
  const pool = flirts.general.flatMap(entry => 
    Array(Math.floor(entry.weight * 10)).fill(entry)
  );
  const selected = pool[Math.floor(Math.random() * pool.length)];
  
  // 替換動態變量
  let text = selected.text;
  if (text.includes('%{random_emoji}')) {
    text = text.replace('%{random_emoji}', 
      selected.emojis[Math.floor(Math.random() * selected.emojis.length)]
    );
  }
  
  return text;
}
