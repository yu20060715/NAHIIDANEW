module.exports = {
  data: {
    name: 'lang',
    description: '切換語言',
    options: [
      { name: 'lang', type: 'STRING', required: true, choices: [
        { name: '中文', value: 'zh' },
        { name: '英文', value: 'en' }
      ] }
    ]
  },
  async execute(interaction) {
    const lang = interaction.options.getString('lang');
    // 儲存至記憶
    const mem = await require('../handlers/memoryManager').loadMemory(interaction.user.id, interaction.guildId);
    mem.language = lang;
    await require('../handlers/memoryManager').saveMemory(interaction.user.id, interaction.guildId, mem);
    await interaction.reply(`已將語言切換為 ${lang}`);
  }
};