const { getNicknameResponse, injectDynamicContent } = require('../modules/flirtManager');
const { t } = require('../modules/lang');
const db = require('../modules/database'); // 直接引用已初始化的实例

// 稱呼觸發正則強化版（包含用戶自訂稱呼）
function getNicknameRegex(userId) {
  const customName = db.prepare('SELECT custom_name FROM users WHERE id = ?').get(userId)?.custom_name;
  const baseRegex = /(納西妲|naxi|草神|寶貝|宝贝|小草神|小吉祥)/i;
  return customName ? 
    new RegExp(`(${baseRegex.source}|${customName})`, 'i') : 
    baseRegex;
}

module.exports = async (client, message) => {
  try {
    // 排除機器人自身訊息 & 權限檢查
    if (message.author.bot) return;
    if (!message.channel.permissionsFor(message.guild?.members.me).has('SendMessages')) return;

    // 獲取用戶設定
    const db = require('../modules/database'); // 直接引用已初始化的實例

// 修改查詢方式
  const userConfig = db
  .prepare('SELECT * FROM users WHERE id = ?')
  .get(message.author.id);

    // 稱呼觸發邏輯
    const nicknameRegex = getNicknameRegex(message.author.id);
    if (nicknameRegex.test(message.content)) {
      await message.channel.sendTyping();  // 顯示輸入中狀態
      
      const baseResponse = getNicknameResponse();
      const response = injectDynamicContent(baseResponse, {
        name: userConfig?.custom_name || '納西妲',
        emoji: true
      });
      
      message.reply({
        content: t(response, userConfig?.lang || 'zh'),
        allowedMentions: { repliedUser: false }  // 避免@用戶
      });
      return;
    }

    // 其他訊息處理邏輯...

  } catch (error) {
    console.error('訊息處理錯誤:', error);
    // 可選：發送錯誤通知到特定頻道
  }
};