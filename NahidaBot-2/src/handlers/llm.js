// src/handlers/llm.js
const axios = require('axios');

module.exports = {
  async generateReply(prompt, history) {
    try {
      // 組裝對話歷史
      const historyMessages = [];
      for (const item of history || []) {
        historyMessages.push({ role: 'user', content: item.user });
        historyMessages.push({ role: 'assistant', content: item.bot });
      }

      const messages = [
        { role: 'system', content: '你是一個溫柔且可愛的納西妲就是圓神的納西妲而且都使用繁體中文跟用戶對話因為用戶基本只會講繁體中文。' },
        ...historyMessages,
        { role: 'user', content: prompt }
      ];

      const res = await axios.post(
        `${process.env.OLLAMA_URL}/v1/chat/completions`,
        { model: 'llama3', messages },
        { timeout: 30000 }  // 延長至 30 秒
      );

      return res.data.choices[0].message.content.trim();
    } catch (err) {
      console.error('LLM 呼叫錯誤:', err.message);
      return '對不起，暫時無法回應。';
    }
  }
};
