import { validateAccess } from '$lib/api';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './$types';
import { formatError } from '$lib/api/genericErrors';
import { json } from '@sveltejs/kit';
import { _formatPoll } from '../+server';
import { cache, fetchWithCache } from '$lib/cache';

export const GET: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	try {
		params.id = params.id.replace(/_/g, '/');

		const poll = await fetchWithCache(`poll:${params.id}`, () =>
			prisma.poll.findFirst({
				where: { id: params.id }
			})
		);

		if (!poll) {
			return formatError('Poll not found.', 404);
		}

		return json(_formatPoll(poll));
	} catch (e) {
		return formatError(e);
	}
};

export const DELETE: RequestHandler = async ({ request, params }) => {
	let { errorMessage } = await validateAccess(
		request,
		{ guildId: params.guildId },
		{ guild: true }
	);
	if (errorMessage) return errorMessage;

	try {
		params.id = params.id.replace(/_/g, '/');

		await prisma.poll.delete({
			where: { id: params.id }
		});
		cache.del(`poll:${params.id}`);

		return new Response(undefined, { status: 204 });
	} catch (e) {
		return formatError(e);
	}
};
