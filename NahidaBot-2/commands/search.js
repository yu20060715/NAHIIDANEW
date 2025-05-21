import { SlashCommandBuilder } from 'discord.js';
import { webSearch } from '../libs/llm.js';

export const data = new SlashCommandBuilder()
  .setName('search')
  .setDescription('網路搜尋摘要')
  .addStringOption(o=>o.setName('q').setDescription('關鍵字').setRequired(true));

export async function execute(interaction) {
  const q = interaction.options.getString('q');
  await interaction.deferReply();
  const r = await webSearch(q);
  await interaction.editReply(r);
}
