import { errors, validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, params }) => {
	let { isAuthorized, error } = await validateAccess(request, {
		guildId: params.guildId
	});

	if (!isAuthorized) return error;

	const serverData = await prisma.servers.findFirst({
		where: { id: params.guildId },
		select: { leaveMessage: true, leaveChannel: true }
	});

	return json({
		leaveMessage: serverData?.leaveMessage,
		leaveChannel: serverData?.leaveChannel
	});
};
