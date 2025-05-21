export const name = 'typingStart';
export const once = false;

export async function execute(client, typing) {
  typing.channel.sendTyping();
}
