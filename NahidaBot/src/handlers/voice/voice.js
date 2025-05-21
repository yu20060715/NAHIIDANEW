const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const tts = require('discord-tts');
module.exports = {
  async joinVc(interaction) {
    const ch = interaction.member.voice.channel;
    if (!ch) return interaction.reply('請先加入語音頻道');
    joinVoiceChannel({ channelId: ch.id, guildId: ch.guild.id, adapterCreator: ch.guild.voiceAdapterCreator });
    await interaction.reply('已加入語音頻道');
  },
  async speak(interaction) {
    const text = interaction.options.getString('text');
    const ch = interaction.member.voice.channel;
    if (!ch) return interaction.reply('請先加入語音頻道');
    const conn = joinVoiceChannel({ channelId: ch.id, guildId: ch.guild.id, adapterCreator: ch.guild.voiceAdapterCreator });
    const player = createAudioPlayer();
    const resource = createAudioResource(tts.getVoiceStream(text));
    player.play(resource);
    conn.subscribe(player);
    await interaction.reply('正在播放語音');
  }
};