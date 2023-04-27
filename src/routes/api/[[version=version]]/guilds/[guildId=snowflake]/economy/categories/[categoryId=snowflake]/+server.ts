import { errors, validateAccess } from '$lib/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getGuildSettings } from '$lib/api/guild-settings';
import { validateEconomy } from '$lib/api/validateEconomy';
import { CategoryStructure } from '$lib/api/structures/guild/economy/category';
import { prisma } from '$lib/prisma';
import { formatError } from '$lib/api/genericErrors';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const { economy } = await getGuildSettings(params.guildId);
	const economyValidationError = await validateEconomy(economy, params);

	if (economyValidationError) return economyValidationError;

	const category = economy.categories.find(({ id }) => id === params.categoryId);

	return json(category);
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
	const economyValidationError = await validateEconomy(economy, params);

	if (economyValidationError) return economyValidationError;

	try {
		const parsedData = CategoryStructure.partial().parse(body);

		const newCategory = await prisma.category.update({
			where: { id: params.categoryId },
			data: parsedData
		});

		await getGuildSettings(params.guildId, true);

		return json(newCategory);
	} catch (e) {
		return formatError(e);
	}
};

export const DELETE: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const { economy } = await getGuildSettings(params.guildId);
	const economyValidationError = await validateEconomy(economy, params);

	if (economyValidationError) return economyValidationError;

	try {
		await prisma.category.delete({
			where: { id: params.categoryId }
		});

		await getGuildSettings(params.guildId, true);

		return new Response(undefined, { status: 204 });
	} catch (e) {
		return formatError(e);
	}
};
