import { validateAccess } from '$lib/api';
import { badRequest, formatError } from '$lib/api/genericErrors';
import { CategoryStructure } from '$lib/api/structures/guild/economy/category';
import { prisma } from '$lib/prisma';
import { generateSnowflake } from '$lib/snowflake';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getGuildSettings } from '$lib/api/guild-settings';
import { validateEconomy } from '$lib/api/validateEconomy';

export const POST: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const body = await request.json();

	if (!body) return badRequest();

	const { economy } = await getGuildSettings(params.guildId);
	const economyValidationError = await validateEconomy(economy, params, {
		categories: true
	});

	if (economyValidationError) return economyValidationError;

	try {
		const parsedData = CategoryStructure.parse(body);

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
