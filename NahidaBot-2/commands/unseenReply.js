import { SlashCommandBuilder } from 'discord.js';
import { checkUnseen } from '../libs/unseenChecker.js';

export const data = new SlashCommandBuilder()
  .setName('unseen')
  .setDescription('手動未讀檢查');

export async function execute(interaction) {
  const r = await checkUnseen(interaction.client);
  await interaction.reply(r);
}
