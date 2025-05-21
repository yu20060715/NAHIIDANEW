import { SlashCommandBuilder } from 'discord.js';
import { scheduleOn } from '../libs/schedulerHelper.js';

export const data = new SlashCommandBuilder()
  .setName('remindat')
  .setDescription('指定時間提醒')
  .addStringOption(o=>o.setName('time').setDescription('YYYY-MM-DD HH:mm').setRequired(true))
  .addStringOption(o=>o.setName('msg').setDescription('內容').setRequired(true));

export async function execute(interaction) {
  const t = interaction.options.getString('time');
  const msg = interaction.options.getString('msg');
  scheduleOn(interaction.channel, t, msg);
  await interaction.reply(`已設定於 ${t} 提醒`);
}
