module.exports = {
  data: {
    name: 'remindme',
    description: '多少分鐘後提醒',
    options: [
      { name: 'minutes', type: 'INTEGER', required: true },
      { name: 'text', type: 'STRING', required: true }
    ]
  },
  async execute(interaction) {
    const mins = interaction.options.getInteger('minutes');
    const text = interaction.options.getString('text');
    setTimeout(() => {
      interaction.followUp(`提醒：${text}`);
    }, mins * 60000);
    await interaction.reply(`好的，${mins} 分鐘後提醒你：${text}`);
  }
};