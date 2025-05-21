// src/index.js
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs'), path = require('path');

const logger = require('../utils/logger');
const greeting = require('./handlers/greeting');
const memoryManager = require('./handlers/memoryManager');
const unseenChecker = require('./handlers/unseenChecker');
const scheduler = require('./handlers/scheduler');
const emotion = require('./handlers/emotion');
const llm = require('./handlers/llm');
const typing = require('./handlers/typingEffect');
const signin = require('./handlers/signin');
const voice = require('./handlers/voice/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences
  ]
});

// 載入 Slash Commands
client.commands = new Collection();
fs.readdirSync(path.join(__dirname, 'commands'))
  .filter(f => f.endsWith('.js'))
  .forEach(file => {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.data.name, cmd);
  });

// Ready 事件：只執行一次
client.once('ready', async () => {
  logger.info(`已登入：${client.user.tag}`);
  await greeting.handleGreeting(client);
  await unseenChecker.scan(client);
  scheduler.start(client);
  signin.scheduleDaily(client);
});

// 防重快取：處理過的訊息 ID，10 秒後自動清除
const messageCache = new Map();

// 唯一的 messageCreate 監聽器
client.on('messageCreate', async msg => {
  if (msg.author.bot) return;
  if (messageCache.has(msg.id)) return;
  messageCache.set(msg.id, true);
  setTimeout(() => messageCache.delete(msg.id), 10000);

  const mem = await memoryManager.loadMemory(msg.author.id, msg.guildId);
  let reply;
  try {
    const key = emotion.classifyEmotion(msg.content);
    if (key && (!mem.history || mem.history.length === 0)) {
      reply = emotion.generateReply(key);
    } else {
      reply = await llm.generateReply(msg.content, mem.history);
    }
  } catch (e) {
    console.error('LLM 呼叫錯誤:', e);
    reply = '對不起，暫時無法回應。';
  }

  await typing.sendWithTyping(msg.channel, reply);

  mem.history = mem.history || [];
  mem.history.push({ user: msg.content, bot: reply });
  mem.lastInteraction = new Date().toISOString();
  await memoryManager.saveMemory(msg.author.id, msg.guildId, mem);
});

// InteractionCreate 監聽器
client.on('interactionCreate', async inter => {
  if (!inter.isCommand()) return;
  const cmd = client.commands.get(inter.commandName);
  if (!cmd) return;
  try {
    await cmd.execute(inter, client);
  } catch (e) {
    logger.error(e);
    await inter.reply({ content: '發生錯誤', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
