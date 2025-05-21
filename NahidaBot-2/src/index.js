const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // 必要意圖
    GatewayIntentBits.DirectMessages // 如果需要私訊功能
  ]
});

// 初始化資料庫
const database = require('./modules/database');
database.init();

client.on('ready', () => {
  console.log(`【納西妲】已登入 => ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  require('./events/messageCreate')(client, message);
});

client.login(process.env.DISCORD_TOKEN);