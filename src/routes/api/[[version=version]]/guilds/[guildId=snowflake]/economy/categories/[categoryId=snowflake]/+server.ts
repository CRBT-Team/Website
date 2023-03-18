import { validateAccess } from '$lib/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getGuildSettings } from '$lib/api/guild-settings';
import { validateEconomy } from '$lib/api/validateEconomy';

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
