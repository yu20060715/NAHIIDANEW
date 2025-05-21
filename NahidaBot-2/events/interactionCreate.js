export const name = 'interactionCreate';
export const once = false;

export async function execute(client, interaction) {
  if (!interaction.isCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (cmd) await cmd.execute(interaction);
}
