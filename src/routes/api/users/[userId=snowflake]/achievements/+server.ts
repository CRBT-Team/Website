import { formatError } from '$lib/api/genericErrors';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return formatError(
		{
			error: 'Deprecated'
		},
		410
	);
};
