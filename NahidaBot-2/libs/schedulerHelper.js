import { getFlirt } from './flirtLoader.js';
import dayjs from 'dayjs';
export function sendFlirt() {
  // TODO: 根據白名單發送 getFlirt()
}
export function greetTimeJobs() {
  const h = dayjs().hour();
  const msgs = {
    8: '早餐時間～吃點東西🍞',
    12: '午餐時間～吃飽了沒🍱',
    18: '晚餐時間～吃飯飯🍛',
    21: '宵夜時間～要不要吃宵夜🌙',
    1: '太晚了～該睡覺啦💤'
  };
  const m = msgs[h]||null;
  if (m) sendFlirt(m);
}
export function scheduleAt(ch, m, msg) {
  setTimeout(()=>ch.send(msg), m*60000);
}
export function scheduleOn(ch, ts, msg) {
  const d = dayjs(ts);
  const diff = d.diff(dayjs());
  if (diff>0) setTimeout(()=>ch.send(msg), diff);
}
export function checkMention(msg) {
  return msg.mentions.users.has(msg.client.user.id);
}
