// src/handlers/unseenChecker.js
const { ChannelType } = require('discord.js');

module.exports = {
  async scan(client) {
    const replied = new Set();

    for (const guild of client.guilds.cache.values()) {
      for (const channel of guild.channels.cache.values()) {
        if (channel.type !== ChannelType.GuildText) continue;
        try {
          const messages = await channel.messages.fetch({ limit: 50 });
          const unseen = messages.filter(m => m.mentions.has(client.user));

          for (const msg of unseen.values()) {
            if (replied.has(msg.id)) continue;
            replied.add(msg.id);
            await msg.channel.send('抱歉剛剛離線，現在回覆你囉～');
          }
        } catch (err) {
          console.error('UnseenChecker 發生錯誤：', err);
        }
      }
    }
  }
};
