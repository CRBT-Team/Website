import { getTokens } from '$lib/auth/getTokens';
import { Rest } from '@purplet/rest';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  let access_token = event.cookies.get('access_token') || '';
  let refresh_token = event.cookies.get('refresh_token') || '';

  if (refresh_token && !access_token) {
    const auth = await getTokens('refresh_token', refresh_token, event.url.host);

    if (auth.error) {
      access_token = null;
      refresh_token = null;
    } else {
      access_token = auth.access_token;
      refresh_token = auth.refresh_token;

      event.cookies.set('access_token', access_token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + auth.expires_in),
      });
      event.cookies.set('refresh_token', refresh_token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    }
  }

  if (access_token) {
    event.locals = {
      rest: new Rest({
        tokenType: 'Bearer',
        token: access_token,
      })
    }
  }

  const response = await resolve(event);

  return response;
};