const flirts = require('../data/flirt.json');

function getNicknameResponse() {
  const responses = flirts.special_nickname_response.responses;
  const response = responses[Math.floor(Math.random() * responses.length)];
  return injectEmojis(response);
}

function injectDynamicContent(text, variables) {
  return text
    .replace(/%\{emoji\}/g, () => getRandomEmoji())
    .replace(/%\{name\}/g, variables.name);
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
