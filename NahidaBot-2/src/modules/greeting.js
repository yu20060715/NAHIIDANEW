const SunCalc = require('suncalc');

function getGreeting() {
  const now = new Date();
  const { sunrise, sunset } = SunCalc.getTimes(now, 25.0329, 121.5654);
  
  const greetings = {
    dawn: ["要早安了嗎～還是再睡一下下？🌙", "晨曦的光...唔...(揉眼睛)"],
    day: ["今天也要一起學習喔！📚", "陽光真好呢～想出去散步嗎？☀️"],
    night: ["夜晚的智慧在閃耀呢～✨", "該休息了...但是想再陪陪你～"]  
  };

  if (now < sunrise) return random(greetings.dawn);
  if (now > sunset) return random(greetings.night);
  return random(greetings.day);
}