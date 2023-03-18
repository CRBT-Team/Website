import { errors, validateAccess } from '$lib/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getGuildSettings } from '$lib/api/guild-settings';
import { prisma } from '$lib/prisma';
import { formatError, economyNotSetupError } from '$lib/api/genericErrors';
import { ItemStructure } from '$lib/api/structures/guild/economy/item';
import { validateItemValue } from '$lib/api/validateItemValue';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const {
		economy: { items }
	} = await getGuildSettings(params.guildId);
	const item = items.find(({ id }) => id === params.itemId);

	return json(item);
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const body = await request.json();

	if (!body) return errors.badRequest();

	const { economy } = await getGuildSettings(params.guildId);

	if (!economy) return economyNotSetupError(params.guildId);

	const category = economy.categories.find(({ id }) => id === params.categoryId);

	if (!category) return formatError(`Category not found.`, 404);

	const item = economy.items.find(({ id }) => id === params.itemId);

	if (!item) return formatError('Item not found.', 404);

	try {
		const parsedData = ItemStructure.omit({ type: true }).partial().parse(body);

		if (parsedData.value) {
			const itemValueError = await validateItemValue(parsedData, params.guildId);

			if (itemValueError) return itemValueError;
		}

		const newItem = await prisma.item.update({
			where: { id: params.itemId },
			data: parsedData
		});

		await getGuildSettings(params.guildId, true);

		return json(newItem);
	} catch (e) {
		return formatError(e);
	}
};
