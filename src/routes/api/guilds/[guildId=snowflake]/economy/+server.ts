// TODO: make this endpoint return something
import { json, type RequestHandler } from '@sveltejs/kit';
import { validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async ({ params: { guildId }, request }) => {
	let { isAuthorized, error } = await validateAccess(request, { guildId: guildId });

	if (!isAuthorized) return error;

	const serverData = await prisma.economy.findFirst({
		where: { serverId: guildId },
		include: { categories: true, commands: true, items: true }
	});

	return json(serverData);
};
