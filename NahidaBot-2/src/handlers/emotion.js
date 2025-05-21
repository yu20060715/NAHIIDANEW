const templates = require('../replies/emotionTemplates.json');
module.exports = {
  classifyEmotion(text) {
    const t = text.toLowerCase();
    if (/累|疲勞/.test(t)) return 'tired';
    if (/失戀|難過/.test(t)) return 'breakup';
    if (/笨蛋|氣死/.test(t)) return 'angry';
    return null;
  },
  generateReply(key) {
    const arr = templates[key];
    return arr[Math.floor(Math.random() * arr.length)];
  }
};
