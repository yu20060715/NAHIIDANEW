module.exports = {
  data: {
    name: 'remindat',
    description: '在指定時間提醒',
    options: [
      { name: 'time', type: 'STRING', required: true },
      { name: 'text', type: 'STRING', required: true }
    ]
  },
  async execute(interaction) {
    const t = new Date(interaction.options.getString('time'));
    const text = interaction.options.getString('text');
    const delay = t.getTime() - Date.now();
    if (delay > 0) {
      setTimeout(() => interaction.followUp(`提醒：${text}`), delay);
      await interaction.reply(`已設定於 ${t.toLocaleString()} 提醒：${text}`);
    } else {
      await interaction.reply('時間已過，請輸入未來的時間喔！');
    }
  }
};