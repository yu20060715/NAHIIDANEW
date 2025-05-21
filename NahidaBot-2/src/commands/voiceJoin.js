module.exports = {
  data: { name: 'joinvc', description: '讓機器人加入語音頻道' },
  async execute(interaction) {
    // 已在 voice handler 處理，這裡可保留空
    await interaction.reply('正在加入語音頻道...');
  }
};