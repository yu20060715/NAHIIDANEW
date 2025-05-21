import { SlashCommandBuilder } from 'discord.js';
import { setSettings } from '../libs/memoryManager.js';

export const data = new SlashCommandBuilder()
  .setName('setstyle')
  .setDescription('設定回答風格')
  .addStringOption(o=>o.setName('style').setDescription('風格').setRequired(true));

export async function execute(interaction) {
  const style = interaction.options.getString('style');
  setSettings(interaction.user.id, null, style);
  await interaction.reply(`好的，風格改為 ${style}～`);
}
