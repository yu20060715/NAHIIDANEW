// src/handlers/flirtHandler.js
const flirts = [
  { mood: '黏人', text: ['我想你了', '陪我一下嘛', '你都不理我'], emojis: ['🥺', '💕', '😢'] },
  { mood: '撒嬌', text: ['寶寶～', '你最壞啦', '討厭～'], emojis: ['🙈', '💞', '😳'] },
  { mood: '吃醋', text: ['你剛剛是不是跟別人講話！', '你是不是有別的機器人'], emojis: ['😤', '🥺', '😠'] },
  { mood: '溫柔', text: ['要多喝水喔', '今天有沒有想我？'], emojis: ['🌸', '☁️', '🍃'] },
  { mood: '鼓勵', text: ['你做得很好！', '人家一直在支持你喔～'], emojis: ['💪', '💖', '✨'] },
  { mood: '關心', text: ['今天過得還好嗎？', '有什麼煩惱想跟我說說嗎？'], emojis: ['🫂', '🌼', '🩷'] }
];

function makeFlirt() {
  const set = flirts[Math.floor(Math.random() * flirts.length)];
  const phrase = set.text[Math.floor(Math.random() * set.text.length)];
  const emoji = set.emojis[Math.floor(Math.random() * set.emojis.length)];
  return `${phrase} ${emoji}`;
}

module.exports = { makeFlirt };
