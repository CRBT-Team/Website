import { db } from '$lib/prisma';
import { formatError, rateLimitError } from './genericErrors';
import { rateLimit, rateLimitMap } from './rateLimits';
import type { APITokenData } from '.';
import { TokenTypes } from '@prisma/client';

export async function validateAccess(request: Request, extraProps?: Partial<APITokenData['data']>) {
	let isAuthorized = true;
	let error = null;

	if (!request.headers.has('Authorization')) {
		isAuthorized = false;
		error = formatError('You must provide an Authorization header');
	}

	const rawToken = (await db.token.findFirst({
		where: { token: request.headers.get('Authorization') || undefined }
	})) as APITokenData;

	if (!rawToken) {
		isAuthorized = false;
		error = formatError('Invalid token');
	}

	if (rawToken.type !== TokenTypes.API) {
		isAuthorized = false;
		error = formatError('You need to provide an valid API token');
	}

	if (!rawToken.token) {
		isAuthorized = false;
		error = formatError('Invalid token');
	}

	const decoded = decodeAPIToken(rawToken.token);

	if (!decoded) {
		isAuthorized = false;
		error = formatError('Invalid token');
	}

	if (extraProps) {
		const userId = extraProps.userId.replace('@me', rawToken.data.userId);
		if (userId && userId !== decoded.userId) {
			isAuthorized = false;
			error = formatError('Invalid token');
		}

		if (extraProps.guildId !== rawToken.data.guildId) {
			isAuthorized = false;
			error = formatError('This token is not valid for this guild');
		}
	}

	const rateLimited = rateLimit(rawToken.token);
	const rateLimitDetails = rateLimitMap.get(rawToken.token);

	if (rateLimited) {
		isAuthorized = false;
		error = rateLimitError(
			rateLimitDetails?.timeWindowMs - (Date.now() - rateLimitDetails?.lastRequestMs) || 0
		);
	}

	const tokenData = { ...rawToken.data, token: rawToken.token, ...decoded };

	return {
		isAuthorized,
		error,
		tokenData
	};
}

export const decodeAPIToken = (token: string) => {
	try {
		const [userId, iat, _] = token
			.split('.')
			.slice(0, 2)
			.map((str) => Buffer.from(str, 'base64').toString());

		return {
			userId,
			iat: parseInt(iat)
		};
	} catch (e) {
		return null;
	}
};
