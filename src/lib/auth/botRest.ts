import 'dotenv/config';
import { Rest } from '@purplet/rest';

export const botRest = new Rest({
  token: process.env.DISCORD_TOKEN
});
