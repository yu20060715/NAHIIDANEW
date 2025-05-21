const cron = require('node-cron');
const { ChannelType } = require('discord.js');
const FlirtGenerator = require('../modules/flirtGenerator');

module.exports = (client) => {
  // 每天早上9點撒嬌
  cron.schedule('0 9 * * *', () => {
    client.guilds.cache.forEach(guild => {
      const channel = guild.systemChannel;
      if (channel && channel.type === ChannelType.GuildText) {
        channel.send(FlirtGenerator.getRandomFlirt());
      }
    });
  });

  // 每小時檢查用餐時間
  cron.schedule('0 7,12,17,21 * * *', () => {
    const now = new Date();
    const hour = now.getHours();
    let message;

    if (hour === 7) message = '早安～記得吃早餐喔 🍳';
    else if (hour === 12) message = '午休時間到！要好好吃飯～ 🍱';
    else if (hour === 17) message = '晚餐想吃什麼呀？我幫你找食譜～ 🥘';
    else if (hour === 21) message = '宵夜時間到囉～但別吃太撐啦 😋';

    client.channels.cache.forEach(ch => {
      if (ch.type === ChannelType.GuildText) ch.send(message);
    });
  });
};