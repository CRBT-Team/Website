import type { RequestHandler } from '@sveltejs/kit';
import 'dotenv/config';
import { db } from '$lib/prisma';
import { errors, jwt, type CRBTTokenPayload } from '$lib/api';

export const post: RequestHandler = async ({ request }) => {
	console.log(request);

	if (request.headers.get('Authorization') !== process.env.JWT_SECRET) {
		return errors.unauthorized;
	}

	if (request.headers.get('content-type') !== 'application/x-www-form-urlencoded') {
		return errors.badRequest;
	}

	try {
		const bodyBuffer = await request.arrayBuffer();
		const bodyString = new TextDecoder('utf-8').decode(bodyBuffer);
		const body = new URLSearchParams(bodyString);

		if (!body.has('userId')) {
			return errors.badRequest;
		}

		const tokenData: CRBTTokenPayload = {
			userId: body.get('userId'),
			guildId: body.get('guildId')
		};

		const newToken = jwt.sign(tokenData, process.env.JWT_SECRET);

		await db.tokens.create({
			data: { token: newToken }
		});

		return {
			body: {
				token: newToken
			}
		};
	} catch (e) {
		return errors.internalServerError;
	}
};
