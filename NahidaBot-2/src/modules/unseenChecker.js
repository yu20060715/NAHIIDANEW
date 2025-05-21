const { getConfig } = require('./configLoader');

module.exports = {
  checkUnseen: async (client) => {
    const channels = client.channels.cache
      .filter(c => c.type === 'GUILD_TEXT' && 
              !getConfig('blacklistChannels').includes(c.id));
    
    for (const [id, channel] of channels) {
      const messages = await channel.messages.fetch({ limit: 10 });
      const unReplied = messages.filter(m => 
        !m.author.bot && !m.reactions.cache.some(r => r.me)
      );
      
      if (unReplied.size > 0) {
        channel.send(`怎麼不理人家嘛～(戳手指) ${getRandomEmoji()}`);
      }
    }
  }
};