import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';
import { errors, validateAccess } from '$lib/api';
import { GuildStructure } from '$lib/api/structures/guild/guild';
import { fetchWithCache } from '$lib/cache';
import {
	type FullGuildSettings,
	getGuildSettings,
	prismaGuildInclude
} from '$lib/api/guild-settings';
import { formatError } from '$lib/api/genericErrors';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const serverData = await getGuildSettings(params.guildId, false, {
		id: true,
		accent_color: true,
		flags: true,
		auto_theming_enabled: true,
		icon: true,
		join_channel_id: true,
		leave_channel_id: true,
		notifications_channel_id: true,
		reports_channel_id: true,
		modules: true
	});

	return json({
		id: params.guildId,
		...serverData
	});
};

export const PATCH: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const body = await request.json();

	if (!body) return errors.badRequest();

	try {
		const parsedData = GuildStructure.parse(body);

		const serverData = await fetchWithCache<FullGuildSettings>(
			`settings:${params.guildId}`,
			() =>
				prisma.servers.upsert({
					where: { id: params.guildId },
					create: {
						id: params.guildId,
						...parsedData
					},
					update: parsedData,
					include: prismaGuildInclude
				}),
			true
		);

		return json(serverData);
	} catch (e) {
		return formatError(e);
	}
};
