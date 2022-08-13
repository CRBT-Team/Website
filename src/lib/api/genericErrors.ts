export const formatError = (
	error: string,
	status = 500,
	details?: string | Object
): {
	status: number;
	body: {
		error: string;
		[key: string]: any;
	};
} => ({
	status,
	body: {
		error,
		...(details ? (typeof details === 'object' ? details : { details }) : {})
	}
});

export const unauthorized = formatError('Unauthorized', 401);

export const badRequest = formatError('Bad Request', 400);

export const internalServerError = formatError('Internal Server Error', 500);

export const rateLimitError = (retryAfter: number) =>
	formatError('Rate limited', 429, { retryAfter });

export const invalidBody = (missingProp: string) => ({
	status: 400,
	body: {
		error: 'Invalid body',
		details: `Missing property: ${missingProp}`
	}
});
