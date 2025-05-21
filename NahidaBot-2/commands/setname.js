import { SlashCommandBuilder } from 'discord.js';
import { setSettings } from '../libs/memoryManager.js';

export const data = new SlashCommandBuilder()
  .setName('setname')
  .setDescription('設定你的稱呼')
  .addStringOption(o=>o.setName('name').setDescription('稱呼').setRequired(true));

export async function execute(interaction) {
  const name = interaction.options.getString('name');
  setSettings(interaction.user.id, name, null);
  await interaction.reply(`好的，我會叫你 ${name}～`);
}
