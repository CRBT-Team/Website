import { errors, validateAccess } from '$lib/api';
import { formatError } from '$lib/api/genericErrors';
import { MessageContentStructure, MessageEmbedStructure } from '$lib/api/structures/message';
import { SnowflakeStructure } from '$lib/api/structures/misc';
import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

export const GET: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const serverData = await prisma.servers.findFirst({
		where: { id: params.guildId },
		select: { leaveMessage: true, leaveChannel: true }
	});

	return json({
		leaveMessage: serverData?.leaveMessage,
		leaveChannel: serverData?.leaveChannel
	});
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const body = await request.json();
	const { leaveMessage, leaveChannel } = body;

	if (!leaveMessage && !leaveChannel) return errors.invalidBody(['leaveMessage', 'leaveChannel']);

	const server = z.object({
		leaveMessage: z
			.object({
				type: z.literal('LEAVE_MESSAGE'),
				content: MessageContentStructure.optional(),
				embed: MessageEmbedStructure.optional(),
				script: z.string().min(20).max(8000).optional()
			})
			.optional(),
		leaveChannel: SnowflakeStructure.optional()
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
