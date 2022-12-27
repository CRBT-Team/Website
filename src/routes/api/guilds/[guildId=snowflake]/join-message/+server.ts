import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import { errors, validateAccess } from '$lib/api';
import { z } from 'zod';
import { SnowflakeRegex } from '@purplet/utils';

export const GET: RequestHandler = async ({ params, request }) => {
	let { isAuthorized, error } = await validateAccess(request, {
		guildId: params.guildId
	});

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
	let { isAuthorized, error } = await validateAccess(request, {
		guildId: params.guildId
	});

	if (!isAuthorized) return error;

	const body = await request.json();
	const { joinMessage, joinChannel } = body;

	if (!joinMessage && !joinChannel) return errors.invalidBody(['joinMessage', 'joinChannel']);

	const server = z.object({
		joinMessage: z
			.object({
				content: z.string().max(4096).optional(),
				embed: z
					.object({
						title: z.string().max(256),
						description: z.string().max(4096),
						fields: z
							.array(
								z.object({
									name: z.string().max(256),
									value: z.string().max(1024),
									inline: z.boolean().optional()
								})
							)
							.max(25),
						footer: z.object({
							icon_url: z.string().url(),
							text: z.string().max(2048)
						}),
						author: z.object({
							icon_url: z.string().url(),
							url: z.string().url(),
							name: z.string().max(256)
						}),
						color: z.number().int()
					})
					.optional(),
				script: z.string().min(20).max(8000).optional()
			})
			.optional(),
		joinChannel: z.string().regex(SnowflakeRegex).optional()
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
	} catch (e) {}
};
