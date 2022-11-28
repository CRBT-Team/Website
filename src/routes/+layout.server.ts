import { getTokens } from '$lib/auth/getTokens';
import { Rest } from '@purplet/rest';
import type { APIUser } from 'discord-api-types/v10';
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
    return {
      user: null,
    }

  const rest = (locals.rest ?? new Rest({
    token: access_token,
    tokenType: 'Bearer'
  })) as Rest;

  const user: APIUser = locals?.user || await rest.user.getCurrentUser();

  return {
    user
  }
};