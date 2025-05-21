const ms = require('ms');

function parseDuration(input) {
  const units = {
    '秒': 's', '分鐘': 'm', '小時': 'h', 
    '天': 'd', '週': 'w'
  };
  const cleaned = input.replace(
    /(\d+)\s*([\u4e00-\u9fa5]+)/g, 
    (_, n, unit) => `${n}${units[unit] || unit}`
  );
  return ms(cleaned) || ms('1h');
}

module.exports = {
  execute: (user, text, duration) => {
    const milliseconds = parseDuration(duration);
    // 排程邏輯...
  }
};