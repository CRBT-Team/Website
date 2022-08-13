import { db } from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { errors, validateAccess } from '$lib/api';
import { validate, type ValidateOption } from 'validate.js';

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error } = await validateAccess(request, {
		guildId: params.guildId
	});

	if (!isAuthorized) return error;

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

export const PATCH: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error } = await validateAccess(request, {
		guildId: params.guildId
	});

	if (!isAuthorized) return error;

	const { body } = await request.json();
	const { joinMessage, joinChannel } = body;

	if (!joinMessage) return errors.invalidBody('joinMessage');
	if (!joinChannel) return errors.invalidBody('joinChannel');

	//todo: finish this

	// const serverData = await db.servers.findFirst({
	// 	where: { id: params.guildId },
	// 	select: { joinMessage: true, joinChannel: true }
	// });

	return {
		body: {
			message: 'Not implemented'
		}
	};
};
