import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { unauthorized, validateAccess } from '$lib/api';

export const get: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, tokenData } = await validateAccess(request);

	if (tokenData?.guildId !== params.guildId) isAuthorized = false;

	if (!isAuthorized) return unauthorized;

	const serverData = await db.servers.findFirst({
		where: { id: params.guildId },
		select: { joinMessage: true, joinChannel: true }
	});

	return {
		body: {
			joinMessage: serverData?.joinMessage,
			joinChannel: serverData?.joinChannel
		}
	};
};
