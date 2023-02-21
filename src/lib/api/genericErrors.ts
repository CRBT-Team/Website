import { json } from '@sveltejs/kit';
import { ZodError } from 'zod';

export function formatError(error: any, status = 500) {
	if (error instanceof ZodError) {
		return json(
			{
				error: error.name,
				...error
			},
			{ status: 400 }
		);
	}

	return json(typeof error === 'object' ? error : { error }, { status });
}

export const unauthorized = () => formatError('Unauthorized', 401);

export const badRequest = () => formatError('Bad Request', 400);

export const internalServerError = () => formatError('Internal Server Error', 500);

export const rateLimitError = (retryAfter: number) =>
	formatError(
		{
			error: 'Rate limited',
			retryAfter
		},
		429
	);

export const invalidBody = (missingProp: string | string[]) =>
	formatError(
		{
			error: 'Invalid body',
			details: `Missing ${
				typeof missingProp === 'string' ? 'property' : 'at least one property'
			}: ${typeof missingProp === 'string' ? missingProp : missingProp.join(', ')}`
		},
		400
	);
