import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import { validateAccess } from '$lib/api';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const serverData = await prisma.servers.findFirst({
		where: { id: params.guildId },
		select: {
			id: true,
			accentColor: true,
			flags: true,
			automaticTheming: true,
			iconHash: true,
			joinChannel: true,
			leaveChannel: true,
			modLogsChannel: true,
			modReportsChannel: true,
			modules: true
		}
	});

	return json(serverData);
};
