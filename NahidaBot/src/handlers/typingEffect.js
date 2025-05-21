module.exports = {
  async sendWithTyping(channel, text) {
    await channel.sendTyping();
    const delay = Math.ceil(text.length/10) * 500;
    await new Promise(r => setTimeout(r, delay));
    return channel.send(text);
  }
};