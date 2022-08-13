import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { validateAccess } from '$lib/api';

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error } = await validateAccess(request, {
		guildId: params.guildId
	});

	if (!isAuthorized) return error;

	const serverData = await db.servers.findFirst({
		where: { id: params.guildId },
		select: { accentColor: true }
	});

	return {
		body: {
			accentColor: serverData?.accentColor
		}
	};
};
