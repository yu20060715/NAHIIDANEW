import { SlashCommandBuilder } from 'discord.js';
import { scheduleAt } from '../libs/schedulerHelper.js';

export const data = new SlashCommandBuilder()
  .setName('remindme')
  .setDescription('幾分鐘後提醒')
  .addIntegerOption(o=>o.setName('minutes').setDescription('分鐘').setRequired(true))
  .addStringOption(o=>o.setName('msg').setDescription('內容').setRequired(true));

export async function execute(interaction) {
  const m = interaction.options.getInteger('minutes');
  const msg = interaction.options.getString('msg');
  scheduleAt(interaction.channel, m, msg);
  await interaction.reply(`${m} 分鐘後提醒你`);
}
