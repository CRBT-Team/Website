import { botRest } from '$lib/auth/botRest';
import { getTokens } from '$lib/auth/getTokens';
import { Rest } from '@purplet/rest';
import { redirect } from '@sveltejs/kit';
import { PermissionFlagsBits, type APIUser, type RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies, url }) => {
  let access_token = cookies.get('access_token') || '',
    refresh_token = cookies.get('refresh_token') || '';

  if (refresh_token && !access_token) {
    const auth = await getTokens('refresh_token', refresh_token, url.host);

    access_token = auth.access_token;
    refresh_token = auth.refresh_token;
  }

  if (!access_token)
    throw redirect(302, '/login')

  const rest = (locals.rest ?? new Rest({
    token: access_token,
    tokenType: 'Bearer'
  })) as Rest;

  const botGuilds: RESTGetAPICurrentUserGuildsResult = await botRest.user.getCurrentUserGuilds();

  const user: APIUser = locals?.user || await rest.user.getCurrentUser();

  const guilds: RESTGetAPICurrentUserGuildsResult = locals?.guilds || (await rest.user.getCurrentUserGuilds())
    .filter((guild) => (BigInt(guild.permissions) & PermissionFlagsBits.ManageGuild) && botGuilds.find((g) => g.id === guild.id));

  console.log(Object.keys(locals));

  locals = { ...locals, rest, user, guilds };

  return {
    user,
    guilds: guilds.sort((a, b) => a.name.localeCompare(b.name)),
  };
};