import { prisma } from '$lib/prisma';
import { formatError, rateLimitError, unauthorized } from './genericErrors';
import { rateLimit, rateLimitMap } from './rateLimits';
import type { APITokenData } from '.';
import { TokenTypes } from '@prisma/client';

export async function validateAccess(
	request: Request,
	extraProps?: Partial<APITokenData['data']>,
	checks?: {
		auth?: boolean;
		user?: boolean;
		guild?: boolean;
	}
) {
	checks = { auth: true, user: false, guild: false, ...checks };

	let isAuthorized = true;
	let error = null;

	if (checks.auth && !request.headers.has('Authorization')) {
		isAuthorized = false;
		error = formatError('You must provide an Authorization header');
	}

	const rawToken = (await prisma.token.findFirst({
		where: { token: request.headers.get('Authorization') || undefined }
	})) as APITokenData;

	if (checks.auth && !rawToken) {
		isAuthorized = false;
		error = formatError('Invalid token');
	}

	if (checks.auth && rawToken.type !== TokenTypes.API) {
		isAuthorized = false;
		error = formatError('You need to provide an valid API token');
	}

	if (checks.auth && !rawToken.token) {
		isAuthorized = false;
		error = formatError('Invalid token');
	}

	const decoded = decodeAPIToken(rawToken.token);

	if (checks.auth && !decoded) {
		isAuthorized = false;
		error = formatError('Invalid token');
	}

	if (extraProps) {
		const userId = extraProps.userId === '@me' ? rawToken.data.userId : extraProps.userId;

		if (checks.auth && userId && userId !== decoded.userId) {
			isAuthorized = false;
			error = formatError('Invalid token');
		}

		if (checks.auth && extraProps.guildId !== rawToken.data.guildId) {
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

	if (checks.guild && tokenData.guildId !== extraProps.guildId) {
		isAuthorized = false;
		error = unauthorized();
	}

	if (checks.user && tokenData.userId !== extraProps.userId) {
		isAuthorized = false;
		error = unauthorized();
	}

	return {
		isAuthorized,
		error,
		tokenData
	};
}

export function decodeAPIToken(token: string) {
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
}
