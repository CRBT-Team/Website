// TODO: make this endpoint return something
import { json, type RequestHandler } from '@sveltejs/kit';
import { validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async ({ params: { guildId }, request }) => {
	let { errorMessage } = await validateAccess(request, { guildId: guildId });

	if (errorMessage) return errorMessage;

	const serverData = await prisma.economy.findFirst({
		where: { id: guildId },
		include: { categories: true, items: true }
	});

	return json(serverData);
};
