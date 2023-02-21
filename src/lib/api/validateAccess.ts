import { prisma } from '$lib/prisma';
import { formatError } from './genericErrors';
import { rateLimit, rateLimitMap } from './rateLimits';
import { errors, type APITokenData } from '.';
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

	let errorMessage: ReturnType<typeof formatError> | null = null;

	if (checks.auth && !request.headers.get('Authorization')) {
		errorMessage = formatError('You must provide an Authorization header');
	}

	const rawToken = (await prisma.token.findFirst({
		where: { token: request.headers.get('Authorization') }
	})) as APITokenData;

	if (checks.auth && (!rawToken || !rawToken.token || rawToken.type !== TokenTypes.API)) {
		errorMessage = formatError('Invalid token');
	}

	const decoded = decodeAPIToken(rawToken.token);

	if (checks.auth && !decoded) {
		errorMessage = formatError('Invalid token');
	}

	if (extraProps) {
		const userId = extraProps.userId === '@me' ? rawToken.data.userId : extraProps.userId;

		if (checks.user && userId && userId !== decoded.userId) {
			errorMessage = errors.unauthorized();
		}

		if (checks.guild && extraProps.guildId !== rawToken.data.guildId) {
			errorMessage = errors.unauthorized();
		}
	}

	const rateLimited = rateLimit(rawToken.token);
	const rateLimitDetails = rateLimitMap.get(rawToken.token);

	if (rateLimited) {
		errorMessage = errors.rateLimitError(
			rateLimitDetails?.timeWindowMs - (Date.now() - rateLimitDetails?.lastRequestMs) || 0
		);
	}

	const tokenData = { ...rawToken.data, token: rawToken.token, ...decoded };

	return {
		errorMessage,
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
