const { getNicknameResponse, injectDynamicContent } = require('../modules/flirtManager');
const { t } = require('../modules/lang');
const db = require('../modules/database'); // 假設已在 index.js 初始化

// 獲取用戶自訂稱呼的正則表達式
function getNicknameRegex(userId) {
  const customName = db.prepare('SELECT custom_name FROM users WHERE id = ?').get(userId)?.custom_name;
  const baseRegex = /(納西妲|naxi|草神|寶貝|宝贝|小草神|小吉祥)/i;
  return customName ? new RegExp(`(${baseRegex.source}|${customName})`, 'i') : baseRegex;
}

// 處理訊息事件
module.exports = async (client, message) => {
  try {
    console.log(`[DEBUG] 收到訊息: ${message.content}`);

    // 排除機器人自身訊息
    if (message.author.bot) return;

    // 權限檢查
    if (message.channel.type === 'DM' || 
        (message.guild && message.channel.permissionsFor(message.guild.members.me)?.has('SendMessages'))) {
      // 通過權限檢查，繼續處理
    } else {
      console.log(`無權限在頻道 ${message.channel.name} 發送訊息`);
      return;
    }

    // 測試指令
    if (message.content === '!test') {
      return message.reply('測試回應成功！🎉');
    }

    // 獲取用戶設定
    const userConfig = db.prepare('SELECT * FROM users WHERE id = ?').get(message.author.id);

    // 稱呼觸發邏輯
    const nicknameRegex = getNicknameRegex(message.author.id);
    if (nicknameRegex.test(message.content)) {
      await message.channel.sendTyping(); // 顯示輸入中狀態
      const baseResponse = getNicknameResponse();
      const response = injectDynamicContent(baseResponse, {
        name: userConfig?.custom_name || '納西妲',
        emoji: true
      });
      await message.reply({
        content: t(response, userConfig?.lang || 'zh'),
        allowedMentions: { repliedUser: false } // 避免@用戶
      });
      return;
    }

    // 其他訊息處理邏輯（可選擴展）
    console.log('收到訊息事件', message.content);
    console.log('頻道權限:', message.channel.permissionsFor(message.guild?.members.me)?.toArray() || '無權限');

  } catch (error) {
    console.error('訊息處理錯誤:', error);
    // 可選：發送錯誤通知到特定頻道（需設定 errorChannel）
    // if (process.env.ERROR_CHANNEL) client.channels.cache.get(process.env.ERROR_CHANNEL)?.send(`錯誤: ${error.message}`);
  }
};