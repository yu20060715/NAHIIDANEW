import fetch from 'node-fetch';

/**
 * 對輸入關鍵字進行網路搜尋並回傳文字摘要。
 * 這裡示範使用一個假的搜尋 API endpoint，
 * 你可以替換成實際的搜尋引擎或 SerpAPI、Google Custom Search 等。
 */
export async function webSearch(query) {
  // 範例：呼叫一個 mock 搜尋 API
  const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`搜尋失敗：${response.status}`);
  }
  const data = await response.json();
  // 假設回傳格式 { summary: "..." }
  return data.summary ?? '抱歉，找不到相關結果。';
}

/**
 * 其它 LLM 相關函式（如 Ollama）都可以繼續往下擴充
 */
export async function chatWithLLM(prompt) {
  // 如果你有 Ollama 在跑，呼叫示例：
  // const res = await fetch(`${process.env.OLLAMA_URL}/v1/complete`, { ... })
  return `LLM 回應：${prompt}`; // stub
}
