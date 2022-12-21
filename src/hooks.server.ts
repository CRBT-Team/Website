// import { getTokens } from '$lib/auth/getTokens';
// import { Rest } from '@purplet/rest';
import { error, json, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { request } = event;

	const allowedWebhookURLs = '/api/transactions/webhook';

	const forbidden =
		request.method === 'POST' &&
		request.headers.get('origin') !== event.url.origin &&
		(request.headers.get('content/type') === 'application/x-www-form-urlencoded' ||
			request.headers.get('content/type') === 'application/x-www-form-urlencoded');

	if (forbidden && !event.url.pathname.endsWith(allowedWebhookURLs)) {
		const csrf_error = error(
			403,
			`Cross-site ${event.request.method} form submissions are forbidden`
		);
		if (request.headers.get('accept') === 'application/json') {
			return json(csrf_error.body, { status: csrf_error.status });
		}
		return new Response(csrf_error.body.message, { status: csrf_error.status });
	}
	// let access_token = event.cookies.get('access_token') || '';
	// let refresh_token = event.cookies.get('refresh_token') || '';

	// if (refresh_token && !access_token) {
	//   const auth = await getTokens('refresh_token', refresh_token, event.url.host);

	//   if (auth.error) {
	//     access_token = null;
	//     refresh_token = null;
	//   } else {
	//     access_token = auth.access_token;
	//     refresh_token = auth.refresh_token;

	//     event.cookies.set('access_token', access_token, {
	//       path: '/',
	//       httpOnly: true,
	//       expires: new Date(Date.now() + auth.expires_in),
	//     });
	//     event.cookies.set('refresh_token', refresh_token, {
	//       path: '/',
	//       httpOnly: true,
	//       expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
	//     });
	//   }
	// }

	// if (access_token) {
	//   event.locals = {
	//     rest: new Rest({
	//       tokenType: 'Bearer',
	//       token: access_token,
	//     })
	//   }
	// }

	const response = await resolve(event);

	return response;
};
