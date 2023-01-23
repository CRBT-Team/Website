import 'dotenv/config';
import { Rest } from '@purplet/rest';
import '@purplet/polyfill';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const rest = new Rest({
	token: process.env.DISCORD_TOKEN
});

const commands = await rest.applicationCommand.getGlobalApplicationCommands({
	applicationId: '595731552709771264'
});

writeFileSync(`${resolve('src/lib')}/commands.json`, JSON.stringify(commands, null, 2), 'utf-8');
