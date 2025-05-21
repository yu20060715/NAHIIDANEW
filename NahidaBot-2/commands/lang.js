import { SlashCommandBuilder } from 'discord.js';
import { setLocale } from '../libs/i18n.js';

export const data = new SlashCommandBuilder()
  .setName('lang')
  .setDescription('切換語系')
  .addStringOption(o => o.setName('locale').setDescription('zh/en').setRequired(true)
    .addChoices({ name: '中文', value: 'zh' }, { name: 'English', value: 'en' }));

export async function execute(interaction) {
  const l = interaction.options.getString('locale');
  setLocale(l);
  await interaction.reply(`已切換至 ${l}`);
}
