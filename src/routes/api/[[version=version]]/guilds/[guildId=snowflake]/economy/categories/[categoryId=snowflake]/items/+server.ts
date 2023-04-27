import { errors, validateAccess } from '$lib/api';
import { getGuildSettings } from '$lib/api/guild-settings';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { formatError } from '$lib/api/genericErrors';
import { ItemStructure } from '$lib/api/structures/guild/economy/item';
import { prisma } from '$lib/prisma';
import { generateSnowflake } from '$lib/snowflake';
import type { Prisma } from '@prisma/client';
import { validateItemValue } from '$lib/api/validateItemValue';
import { validateEconomy } from '$lib/api/validateEconomy';

export const POST: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const body = await request.json();

	if (!body) return errors.badRequest();

	const { economy } = await getGuildSettings(params.guildId);
	const economyValidationError = await validateEconomy(economy, params, {
		items: true
	});

	if (economyValidationError) return economyValidationError;

	try {
		const parsedData = ItemStructure.parse(body);

		const itemValueError = await validateItemValue(parsedData, params.guildId);

		if (itemValueError) return itemValueError;

		const newItem = await prisma.item.create({
			data: {
				id: generateSnowflake().toString(),
				category_id: params.categoryId,
				guild_id: params.guildId,
				...(parsedData as Prisma.ItemUncheckedCreateInput)
			}
		});

		await getGuildSettings(params.guildId, true);

		return json(newItem);
	} catch (e) {
		return formatError(e);
	}
};
