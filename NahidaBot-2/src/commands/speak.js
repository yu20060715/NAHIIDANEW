module.exports = {
  data: {
    name: 'speak',
    description: '在語音頻道播放文字',
    options: [ { name: 'text', type: 'STRING', required: true } ]
  },
  async execute(interaction) {
    // 已在 voice handler 處理，這裡可保留空
    await interaction.reply('正在播放語音...');
  }
};