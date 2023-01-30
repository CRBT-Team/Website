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

	const response = await resolve(event);

	return response;
};
