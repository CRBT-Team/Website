import { validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ request, params, url }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	await prisma.poll.delete({
		where: { id: params.id }
	});

	return json({
		message: 'success'
	});
};
