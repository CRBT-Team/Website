import { errors, validateAccess } from '$lib/api';
import { formatError } from '$lib/api/genericErrors';
import { MessageContentStructure, MessageEmbedStructure } from '$lib/api/structures/message';
import { SnowflakeStructure } from '$lib/api/structures/misc';
import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

export const GET: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const serverData = await prisma.guild.findFirst({
		where: { id: params.guildId },
		select: { leave_message: true, leave_channel_id: true }
	});

	return json({
		leave_message: serverData?.leave_message,
		leave_channel_id: serverData?.leave_channel_id
	});
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const body = await request.json();
	const { leave_message, leave_channel_id } = body;

	if (!leave_message && !leave_channel_id)
		return errors.invalidBody(['leave_message', 'leave_channel_id']);

	const server = z.object({
		leave_message: z
			.object({
				content: MessageContentStructure.optional(),
				embed: MessageEmbedStructure.optional(),
				script: z.string().min(20).max(8000).optional()
			})
			.optional(),
		leave_channel_id: SnowflakeStructure.optional()
	});

	try {
		const data = server.parse(body);

		const serverData = await prisma.guild.upsert({
			create: {
				id: params.guildId,
				leave_message: {
					...data.leave_message,
					type: 'LEAVE_MESSAGE'
				},
				leave_channel_id: data.leave_channel_id
			},
			update: data,
			where: { id: params.guildId },
			select: { leave_channel_id: true, leave_message: true }
		});

		return json(serverData);
	} catch (e) {
		return formatError(e);
	}
};
