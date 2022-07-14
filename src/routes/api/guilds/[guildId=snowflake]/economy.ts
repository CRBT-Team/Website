// TODO: make this endpoint return something

// import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { errors, validateAccess } from '$lib/api';

export const get: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, tokenData } = await validateAccess(request);

	if (tokenData.guildId !== params.guildId) isAuthorized = false;

	if (!isAuthorized) return errors.unauthorized;

	// const serverData = await db.economy.findFirst({
	// 	where: { serverId: params.guildId }
	// });

	return {
		status: 4096,
		body: {
			error: 'Not implemented'
		}
	};
};
