const { t } = require('../modules/lang');
const db = require('../modules/database');
const { nicknamePattern } = require('../config/regexPatterns');
const FlirtGenerator = require('../modules/flirtGenerator');
const logger = require('../utils/logger');

// 獲取用戶自訂稱呼的正則表達式
function getNicknameRegex(userId) {
  try {
    const stmt = db.prepare('SELECT custom_name FROM users WHERE id = ?');
    const result = stmt.get(userId);
    const customName = result?.custom_name;
    
    const baseRegex = /(納西妲|naxi|草神|寶貝|宝贝|小草神|小吉祥|nahida)/i;
    return customName ? 
      new RegExp(`\\b(${baseRegex.source}|${customName})\\b`, 'i') :
      baseRegex;
  } catch (error) {
    logger.error('獲取暱稱正則失敗:', error);
    return /(納西妲|naxi|nahida)/i; // 返回默認值
  }
}

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    try {
      // 排除機器人自身訊息
      if (message.author.bot) return;

      logger.debug(`收到訊息 [${message.channel.type}] ${message.author.tag}: ${message.content}`);

      // 權限檢查 (DM 頻道直接允許)
      if (message.channel.type !== 'DM') {
        const permissions = message.channel.permissionsFor(message.guild.members.me);
        if (!permissions?.has('SendMessages')) {
          logger.warn(`無權限在頻道 #${message.channel.name} 發送訊息`);
          return;
        }
      }

      // 測試指令
      if (message.content === '!test') {
        await message.reply('測試回應成功！🎉');
        return;
      }

      // --- 稱呼觸發邏輯 ---
      const nicknameRegex = getNicknameRegex(message.author.id);
      const isNicknameCalled = nicknameRegex.test(message.content);
      
      if (isNicknameCalled) {
        logger.debug(`觸發稱呼: ${message.content}`);
        
        // 顯示輸入中狀態
        await message.channel.sendTyping();
        
        // 獲取用戶設定
        const userStmt = db.prepare('SELECT * FROM users WHERE id = ?');
        const userConfig = userStmt.get(message.author.id) || {};
        
        // 生成回應
        const baseFlirt = FlirtGenerator.getRandomFlirt();
        const response = t(baseFlirt, userConfig.lang || 'zh')
          .replace(/{name}/g, userConfig.custom_name || '納西妲')
          + ` <@${message.author.id}>`;

        // 延遲模擬思考
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        await message.reply({
          content: response,
          allowedMentions: { repliedUser: false }
        });
        return;
      }

      // --- 其他訊息處理邏輯 (範例) ---
      if (message.content.toLowerCase().includes('早安')) {
        await message.reply('早安呀～今天要一起喝咖啡嗎? ☕');
      }

    } catch (error) {
      logger.error('訊息處理嚴重錯誤:', error);
      // 嘗試發送錯誤通知
      try {
        await message.channel.send('嗚...人家好像有點當機了 >_<');
      } catch (fallbackError) {
        logger.error('連錯誤訊息都發送失敗:', fallbackError);
      }
    }
  });
};