// require('dotenv').config();


// require('dotenv').config();
// const { Client, GatewayIntentBits } = require('discord.js');

// // 先初始化資料庫
// const database = require('./modules/database');
// database.init(); // 確保先執行初始化

// const { Client, GatewayIntentBits } = require('discord.js');
// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent, // 必要意圖
//     GatewayIntentBits.DirectMessages // 如果需要私訊功能
//   ]
// });


// const db = database.init();
// console.log('数据库表结构：', 
//   db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
// );


// // 初始化資料庫
// const database = require('./modules/database');
// database.init();

// client.on('ready', () => {
//   console.log(`【納西妲】已登入 => ${client.user.tag}`);
// });

// client.on('messageCreate', async message => {
//   require('./events/messageCreate')(client, message);
// });

// client.login(process.env.DISCORD_TOKEN);

// src/index.js

require('dotenv').config({ override: true });
console.log('【環境驗證】DISCORD_TOKEN:', 
  process.env.DISCORD_TOKEN ? '已存在' : '未找到！'
);

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// 正确初始化方式（database.js 已自初始化）
require('./modules/database'); // 此行确保数据库初始化

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`【调试】機器人已上線！用戶名：${client.user.tag}`);
  
  // 臨時測試頻道發送
const testChannel = client.channels.cache.get('1372264355210723463');
  if (testChannel) {
    testChannel.send('測試訊息').catch(console.error);
  } else {
    console.log('【錯誤】找不到測試頻道');
  }
});

// src/index.js
const db = require('./modules/database');
console.log('数据库表结构：', 
  db.prepare("SELECT sql FROM sqlite_master WHERE type='table'").all()
);

client.on('ready', () => {
  console.log(`【納西妲】已登入 => ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  require('./events/messageCreate')(client, message);
});

client.login(process.env.DISCORD_TOKEN);