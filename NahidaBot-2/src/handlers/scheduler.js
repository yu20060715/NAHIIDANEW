// src/handlers/scheduler.js
const cron = require('node-cron');
const { DateTime } = require('luxon');
const { makeFlirt } = require('./flirtHandler');

module.exports = {
  start(client) {
    const CHANNEL = process.env.FLIRT_CHANNEL_ID;
    const chance = pct => Math.random() < pct;

    // 單一 send 函式
    const send = async text => {
      try {
        const ch = await client.channels.fetch(CHANNEL);
        if (ch && ch.isText()) await ch.send(text);
      } catch (e) {
        console.error('排程發送失敗', e);
      }
    };

    // 每分鐘檢查
    cron.schedule('* * * * *', () => {
      const now = DateTime.local();
      const wd = now.weekday, h = now.hour, m = now.minute;

      if (wd <= 5 && h >= 9 && h <= 16 && m <= 10) {
        send(makeFlirt());
      } else if (chance(0.1)) {
        send(makeFlirt());
      }

      if (h === 7 && m < 60) send('早餐吃了嗎？🥪');
      if (h === 12 && m < 60) send('午餐吃飽了嗎？🍱');
      if (h >= 17 && h <= 19 && m === 0) send('晚餐吃什麼？🍜');
      if ((h === 21 && m >= 30) || (h === 22 && m < 60) || (h === 23 && m === 0))
        send('宵夜想吃什麼？🥪');
    });

    // 深夜上線提醒
    client.on('presenceUpdate', (oldP, newP) => {
      if ((!oldP || oldP.status === 'offline') && newP.status === 'online') {
        const hour = DateTime.local().hour;
        if (hour >= 23 || hour < 6) {
          newP.user.send('寶貝，該睡覺啦～不要太操勞自己喔💤').catch(() => {});
        }
      }
    });
  }
};
