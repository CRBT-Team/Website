import { validateAccess } from '$lib/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getGuildSettings } from '$lib/api/guild-settings';
import { economyNotSetupError, formatError } from '$lib/api/genericErrors';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const { economy } = await getGuildSettings(params.guildId);

	if (!economy) return economyNotSetupError(params.guildId);

	const category = economy.categories.find(({ id }) => id === params.categoryId);

	if (!category) return formatError(`Category not found.`, 404);

	return json(category);
};
