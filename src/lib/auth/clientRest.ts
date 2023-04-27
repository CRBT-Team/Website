import { Rest } from '@purplet/rest';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { getTokens } from './getTokens';

export async function getClientRest({
	cookies,
	locals,
	url
}: Partial<ServerLoadEvent>): Promise<Rest> {
	if (locals.rest && locals.rest instanceof Rest) return locals.rest;

	let access_token = cookies.get('access_token') || '',
		refresh_token = cookies.get('refresh_token') || '';

	if (refresh_token && !access_token) {
		const auth = await getTokens('refresh_token', refresh_token, url.host);

		access_token = auth.access_token;
		refresh_token = auth.refresh_token;
	}

	if (!access_token) throw redirect(302, '/login');

	console.log(access_token);

	return new Rest({
		token: access_token,
		tokenType: 'Bearer',
		version: '10'
	});
}
