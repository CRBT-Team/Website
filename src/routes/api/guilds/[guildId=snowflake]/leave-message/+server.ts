import { errors, validateAccess } from '$lib/api';
import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, params }) => {
	let { isAuthorized, error } = await validateAccess(request, {
		guildId: params.guildId
	});

	if (!isAuthorized) return error;

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
