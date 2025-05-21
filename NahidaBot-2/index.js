import dotenv from 'dotenv';
dotenv.config();

import 'dotenv/config';
import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

const commandsPath = path.join(process.cwd(), 'commands');
for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))) {
  const mod = await import(pathToFileURL(path.join(commandsPath, file)));
  if (mod.data && mod.execute) client.commands.set(mod.data.name, mod);
}

const eventsPath = path.join(process.cwd(), 'events');
for (const file of fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'))) {
  const mod = await import(pathToFileURL(path.join(eventsPath, file)));
  if (mod.name && mod.execute) {
    if (mod.once) client.once(mod.name, (...args) => mod.execute(client, ...args));
    else client.on(mod.name, (...args) => mod.execute(client, ...args));
  }
}

await import(pathToFileURL(path.join(process.cwd(), 'scheduler.js')));

client.login(process.env.DISCORD_TOKEN);