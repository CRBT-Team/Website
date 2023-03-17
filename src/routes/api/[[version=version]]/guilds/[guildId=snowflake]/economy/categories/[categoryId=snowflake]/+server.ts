import { validateAccess } from '$lib/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getGuildSettings } from '$lib/api/guild-settings';

export const GET: RequestHandler = async ({ params, request }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);

	if (errorMessage) return errorMessage;

	const {
		economy: { categories }
	} = await getGuildSettings(params.guildId, false);
	const category = categories.find(({ id }) => id === params.categoryId);

	return json(category);
};
