const cron = require('node-cron');
const axios = require('axios');
module.exports = {
  scheduleDaily(client) {
    cron.schedule('0 4 * * *', async () => {
      try {
        const res = await axios.post('https://api.mihoyo.com/signin', null, { headers:{ cookie: process.env.MIHOYO_COOKIE } });
        const channel = client.channels.cache.find(c=>c.isText());
        channel.send(`簽到結果：${res.data.message}`);
      } catch {
        // 忽略錯誤
      }
    });
  }
};