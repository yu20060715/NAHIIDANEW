import { getFlirt } from '../libs/flirtLoader.js';
import { checkMention } from '../libs/schedulerHelper.js';

export const name = 'messageCreate';
export const once = false;

export async function execute(client, message) {
  if (message.author.bot) return;
  if (Math.random() < 0.01 || checkMention(message)) {
    await message.channel.send(getFlirt());
  }
}
