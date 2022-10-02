// TODO: make this endpoint return something

// import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { errors, validateAccess } from '$lib/api';

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error } = await validateAccess(request, { guildId: params.guildId });

	//TODO: make this endpoint return something
	if (!isAuthorized) return error;

	// const serverData = await db.economy.findFirst({
	// 	where: { serverId: params.guildId }
	// });

	return errors.unauthorized;
};
