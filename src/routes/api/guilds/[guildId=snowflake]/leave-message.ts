import { errors, validateAccess } from '$lib/api';
import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request, params }) => {
	let { isAuthorized, tokenData } = await validateAccess(request);

	if (tokenData?.guildId !== params.guildId) isAuthorized = false;

	if (!isAuthorized) return errors.unauthorized;

	const serverData = await db.servers.findFirst({
		where: { id: params.guildId },
		select: { leaveMessage: true, leaveChannel: true }
	});

	return {
		body: {
			leaveMessage: serverData?.leaveMessage,
			leaveChannel: serverData?.leaveChannel
		}
	};
};
