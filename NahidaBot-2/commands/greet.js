import { SlashCommandBuilder } from 'discord.js';
import dayjs from 'dayjs';

export const data = new SlashCommandBuilder()
  .setName('greet')
  .setDescription('查看當前問候時間');

export async function execute(interaction) {
  const h = dayjs().hour();
  let m;
  if (h < 12) m = `早安～現在是 ${h} 點`;
  else if (h < 18) m = `午安～現在是 ${h} 點`;
  else m = `晚安～現在是 ${h} 點`;
  await interaction.reply({ content: m, ephemeral: true });
}
