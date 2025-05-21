module.exports = {
  data: {
    name: 'setstyle',
    description: '設定語氣風格',
    options: [ { name: 'style', type: 'STRING', required: true } ]
  },
  async execute(interaction) {
    const style = interaction.options.getString('style');
    const mm = require('../handlers/memoryManager');
    const mem = await mm.loadMemory(interaction.user.id, interaction.guildId);
    mem.style = style;
    await mm.saveMemory(interaction.user.id, interaction.guildId, mem);
    await interaction.reply(`已設定語氣風格為 ${style}`);
  }
};