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
			accent_color: true,
			flags: true,
			auto_theming_enabled: true,
			icon: true,
			join_channel_id: true,
			leave_channel_id: true,
			notifications_channel_id: true,
			reports_channel_id: true,
			modules: true
		}
	});

	return json({
		id: params.guildId,
		...serverData
	});
};
