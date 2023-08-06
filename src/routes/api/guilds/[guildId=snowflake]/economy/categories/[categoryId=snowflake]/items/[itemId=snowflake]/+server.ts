import { errors, validateAccess } from '$lib/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getGuildSettings } from '$lib/api/guild-settings';
import { prisma } from '$lib/prisma';
import { formatError } from '$lib/api/genericErrors';
import { ItemStructure } from '$lib/api/structures/guild/economy/item';
import { validateItemValue } from '$lib/api/validateItemValue';
import { validateEconomy } from '$lib/api/validateEconomy';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const { economy } = await getGuildSettings(params.guildId);
	const economyValidationError = await validateEconomy(economy, params);

	if (economyValidationError) return economyValidationError;

	const item = economy.items.find(({ id }) => id === params.itemId);

	return json(item);
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const body = await request.json();

	if (!body) return errors.badRequest();

	const { economy } = await getGuildSettings(params.guildId);
	const economyValidationError = await validateEconomy(economy, params);

	if (economyValidationError) return economyValidationError;

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

export const DELETE: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(request);

	if (errorMessage) return errorMessage;

	const { economy } = await getGuildSettings(params.guildId);
	const economyValidationError = await validateEconomy(economy, params);

	if (economyValidationError) return economyValidationError;

	try {
		await prisma.item.delete({
			where: { id: params.itemId }
		});

		await getGuildSettings(params.guildId, true);

		return new Response(undefined, { status: 204 });
	} catch (e) {
		return formatError(e);
	}
};
