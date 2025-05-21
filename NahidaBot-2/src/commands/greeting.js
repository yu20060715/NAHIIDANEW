const timeWords = ["呀", "喔", "呢～", "捏！"];
const periodMap = {
  morning: "早晨",
  afternoon: "下午",
  evening: "晚上"  
};

function getTimeResponse(date) {
  const hours = date.getHours();
  const period = hours < 12 ? 'morning' : 
    hours < 18 ? 'afternoon' : 'evening';
  
  return `欸～現在是${formatTime(date)} ${
    periodMap[period]
  }${timeWords[Math.floor(Math.random() * timeWords.length)]}`;
}

function formatTime(date) {
  // 轉換成範例：早上 9:05 AM
  return date.toLocaleTimeString('zh-TW', { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true 
  }).replace('上午', '早上').replace('下午', '');
}