import { validateAccess } from '$lib/api';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;
};
