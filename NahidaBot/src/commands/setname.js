module.exports = {
  data: {
    name: 'setname',
    description: '設定稱呼',
    options: [ { name: 'name', type: 'STRING', required: true } ]
  },
  async execute(interaction) {
    const name = interaction.options.getString('name');
    const mm = require('../handlers/memoryManager');
    const mem = await mm.loadMemory(interaction.user.id, interaction.guildId);
    mem.nickname = name;
    await mm.saveMemory(interaction.user.id, interaction.guildId, mem);
    await interaction.reply(`好的，我以後會叫你 ${name}～`);
  }
};