import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';

export const data = new SlashCommandBuilder()
  .setName('signin')
  .setDescription('米哈遊簽到');

export async function execute(interaction) {
  const res = await fetch('https://api-takumi.mihoyo.com/event/bbs_sign_reward/sign', {
    headers: { cookie: process.env.MIHOYO_COOKIE }
  });
  const j = await res.json();
  await interaction.reply(`簽到：${j.message||JSON.stringify(j)}`);
}
