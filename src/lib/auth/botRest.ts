import { DISCORD_TOKEN } from '$env/static/private';
import { Rest } from '@purplet/rest';

export const botRest = new Rest({
  token: DISCORD_TOKEN
});
