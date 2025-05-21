// src/handlers/greeting.js
const flirt = require('../replies/flirt.json');

module.exports = {
  async handleGreeting(client) {
    try {
      const chId = process.env.GREETING_CHANNEL_ID;
      const channel = chId
        ? client.channels.cache.get(chId)
        : client.channels.cache.find(c => c.isText());

      if (!channel) {
        console.warn('[WARN] 找不到問候頻道，跳過問候訊息。');
        return;
      }

      const hour = new Date().getHours();
      const prefix = hour < 12 ? '早安' : hour < 18 ? '午安' : '晚安';

      const reminders = Array.isArray(flirt.reminder) ? flirt.reminder : [];
      if (reminders.length === 0) {
        console.warn('[WARN] flirt.reminder 沒有內容，略過問候。');
        return;
      }

      const msg = `${prefix}～${reminders[Math.floor(Math.random() * reminders.length)]}`;
      await channel.send(msg);
      console.log(`[INFO] 已發送問候：${msg}`);
    } catch (e) {
      console.error('[ERROR] 發送問候失敗：', e);
    }
  }
};
