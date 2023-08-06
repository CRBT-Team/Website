import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import { errors, validateAccess } from '$lib/api';
import { z } from 'zod';
import { MessageContentStructure, MessageEmbedStructure } from '$lib/api/structures/message';
import { SnowflakeStructure } from '$lib/api/structures/misc';
import { formatError } from '$lib/api/genericErrors';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const serverData = await prisma.guild.findFirst({
		where: { id: params.guildId },
		select: { join_message: true, join_channel_id: true }
	});

	return json({
		id: params.guildId,
		...serverData
	});
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const body = await request.json();
	const { join_message, join_channel_id } = body;

	if (!join_message && !join_channel_id)
		return errors.invalidBody(['join_message', 'join_channel_id']);

	const server = z.object({
		join_message: z
			.object({
				content: MessageContentStructure.optional(),
				embed: MessageEmbedStructure.optional(),
				script: z.string().min(20).max(8000).optional()
			})
			.optional(),
		join_channel_id: SnowflakeStructure.optional()
	});

	try {
		const data = server.parse(body);

		const serverData = await prisma.guild.upsert({
			create: {
				id: params.guildId,
				join_message: {
					...data.join_message,
					type: 'JOIN_MESSAGE'
				},
				join_channel_id: data.join_channel_id
			},
			update: data,
			where: { id: params.guildId },
			select: { join_channel_id: true, join_message: true }
		});

		return json(serverData);
	} catch (e) {
		return formatError(e);
	}
};
