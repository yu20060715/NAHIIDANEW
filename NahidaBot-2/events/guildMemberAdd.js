export const name = 'guildMemberAdd';
export const once = false;

export async function execute(client, member) {
  const ch = member.guild.systemChannel;
  if (ch) ch.send(`歡迎 ${member.user} 加入！`);
}
