import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getTokens } from '$lib/auth/getTokens';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const errors = url.searchParams.get('errors');

	if (!code || errors) {
		return Response.redirect('/', 302);
	}

	const res = await getTokens('authorization_code', code, url.host);

	console.log(res);

	if (res.error) {
		throw error(500, res.error);
	}

	cookies.set('access_token', res.access_token, {
		path: '/',
		httpOnly: true,
		expires: new Date(Date.now() + res.expires_in)
	});

	cookies.set('refresh_token', res.refresh_token, {
		path: '/',
		httpOnly: true,
		expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
	});

	throw redirect(301, '/dashboard');
};
