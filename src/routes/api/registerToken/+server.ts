import { randomBytes } from 'crypto';
import { prisma } from '$lib/prisma';
import { errors, type APITokenData } from '$lib/api';
import { TokenTypes } from '@prisma/client';
import { CLIENT_SECRET } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	if (request.headers.get('Authorization') !== CLIENT_SECRET) {
		return errors.unauthorized;
	}

	if (request.headers.get('content-type') !== 'application/x-www-form-urlencoded') {
		return errors.badRequest;
	}

	const bodyBuffer = await request.arrayBuffer();
	const bodyString = new TextDecoder('utf-8').decode(bodyBuffer);
	const body = new URLSearchParams(bodyString);

	if (!body.has('userId')) {
		return errors.badRequest;
	}

	const tokenData: APITokenData['data'] = {
		userId: body.get('userId'),
		guildId: body.get('guildId')
	};

	const userId = Buffer.from(tokenData.userId).toString('base64url');
	const now = Buffer.from(Math.round(Date.now() / 1000).toString()).toString('base64url');
	const password = randomBytes(11)
		.toString('base64url')
		.replace(
			// replace all -, _, . with a random character
			/[-_.]/g,
			() => randomBytes(1).toString('base64url').charAt(0)
		);

	const tokenString = `${userId}.${now}.${password}`;

	const token = await prisma.token.create({
		data: { token: tokenString, data: tokenData, type: TokenTypes.API }
	});

	return json({
		token
	});
};
