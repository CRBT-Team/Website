import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import { errors, validateAccess } from '$lib/api';
import { z, ZodError } from 'zod';
import { MessageContentStructure, MessageEmbedStructure } from '$lib/api/structures/message';
import { SnowflakeStructure } from '$lib/api/structures/misc';
import { formatError } from '$lib/api/genericErrors';

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (!isAuthorized) return error;

	const serverData = await prisma.servers.findFirst({
		where: { id: params.guildId },
		select: { joinMessage: true, joinChannel: true }
	});

	return json({
		joinMessage: serverData?.joinMessage,
		joinChannel: serverData?.joinChannel
	});
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (!isAuthorized) return error;

	const body = await request.json();
	const { joinMessage, joinChannel } = body;

	if (!joinMessage && !joinChannel) return errors.invalidBody(['joinMessage', 'joinChannel']);

	const server = z.object({
		joinMessage: z
			.object({
				type: z.literal('JOIN_MESSAGE'),
				content: MessageContentStructure.optional(),
				embed: MessageEmbedStructure.optional(),
				script: z.string().min(20).max(8000).optional()
			})
			.optional(),
		joinChannel: SnowflakeStructure.optional()
	});

	try {
		const data = server.parse(body);

		const serverData = await prisma.servers.upsert({
			create: {
				id: params.guildId,
				...data
			},
			update: data,
			where: { id: params.guildId }
		});

		return json(data);
	} catch (e) {
		return formatError(e);
	}
};
