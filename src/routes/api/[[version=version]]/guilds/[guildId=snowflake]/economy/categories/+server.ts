import { validateAccess } from '$lib/api';
import { badRequest, formatError } from '$lib/api/genericErrors';
import { CategoryStructure } from '$lib/api/structures/guild/economy/category';
import { prisma } from '$lib/prisma';
import { generateSnowflake } from '$lib/snowflake';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getGuildSettings } from '$lib/api/guild-settings';
import { economyNotSetupError } from '../_errors';

export const POST: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const body = await request.json();

	if (!body) return badRequest();

	try {
		const parsedData = CategoryStructure.parse(body);

		const { economy } = await getGuildSettings(params.guildId);

		if (!economy) {
			return economyNotSetupError(params.guildId);
		}

		const newCategory = await prisma.category.create({
			data: {
				id: generateSnowflake().toString(),
				label: parsedData.label,
				guild_id: params.guildId,
				emoji: parsedData.emoji
			},
			include: { items: true }
		});

		await getGuildSettings(params.guildId, true);

		return json(newCategory);
	} catch (e) {
		return formatError(e);
	}
};
